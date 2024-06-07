import fs from "node:fs";
import path from "node:path";

import { Either } from "effect";
import { expect, test, describe, beforeAll, afterAll } from "vitest";

import {
  deleteTranspiledFiles,
  fixturesPath,
  runKeepAliveSkottCli,
  runOneShotSkottCli,
  transpileCliExecutable
} from "./bootstrap.js";
import {
  expectChangesNotToBeDetected,
  expectChangesToBeDetected,
  prepareFinalizer
} from "./watch-expect.js";

const useTimeout = (time_ms: number) => AbortSignal.timeout(time_ms);

const increaseTimeoutFactor = process.env.CI ? 3 : 1;

describe.sequential("When running skott cli", () => {
  beforeAll(async () => {
    await transpileCliExecutable();
  });

  afterAll(deleteTranspiledFiles);

  test("Should display help", async () => {
    const result = await runOneShotSkottCli(
      ["--help"],
      useTimeout(2_000 * increaseTimeoutFactor)
    );

    expect(Either.isRight(result)).toBeTruthy();

    const right = Either.getOrThrow(result);

    expect(right.includes("Usage: cli")).toBeTruthy();
  });

  describe.sequential(
    "When using watch mode",
    () => {
      describe("When expecting changes to be detected", () => {
        describe("When a matching file under the provided cwd is added/removed/updated", () => {
          test("Should re-run analysis", () =>
            new Promise((doneSuccess, doneFailure) => {
              const fixtureFilePath = path.join(fixturesPath, "index.js");
              const cleanUpTest = prepareFinalizer(fixtureFilePath);

              expectChangesToBeDetected({
                skottCliProcess: runKeepAliveSkottCli(
                  [
                    "--watch",
                    "--displayMode=raw",
                    "--exitCodeOnCircularDependencies=0",
                    `--cwd=${fixturesPath}`
                  ],
                  useTimeout(1_500 * increaseTimeoutFactor)
                ),
                doneSuccess,
                doneFailure,
                actionThatShouldTriggerChanges: () => {
                  fs.writeFileSync(fixtureFilePath, "console.log(1);");
                },
                finalizer: cleanUpTest
              });
            }));
        });

        describe("When a matching file nested under the provided cwd is added/removed/updated", () => {
          test("Should re-run analysis", () =>
            new Promise((doneSuccess, doneFailure) => {
              const fixtureFolderPath = path.join(fixturesPath, "some-dir");
              const cleanupTest = prepareFinalizer(
                path.join(fixturesPath, "some-dir")
              );
              fs.mkdirSync(fixtureFolderPath, { recursive: true });

              expectChangesToBeDetected({
                skottCliProcess: runKeepAliveSkottCli(
                  [
                    "--watch",
                    "--displayMode=raw",
                    "--exitCodeOnCircularDependencies=0",
                    `--cwd=${fixturesPath}`
                  ],
                  useTimeout(1_500 * increaseTimeoutFactor)
                ),
                doneSuccess,
                doneFailure,
                actionThatShouldTriggerChanges: () => {
                  fs.writeFileSync(
                    path.join(fixtureFolderPath, "index.js"),
                    "_"
                  );
                },
                finalizer: cleanupTest
              });
            }));
        });
      });

      describe("When expecting changes not to be tracked", () => {
        describe("When a matching file outside of the provided cwd is added/removed/updated", () => {
          test("Should not re-run analysis", () =>
            new Promise((doneSuccess, doneFailure) => {
              const fixtureSubDirectoryPath = path.join(
                fixturesPath,
                "sub_directory"
              );
              const fixtureFilePath = path.join(fixturesPath, "index.js");
              const cleanupTest = prepareFinalizer(fixtureFilePath);

              expectChangesNotToBeDetected({
                skottCliProcess: runKeepAliveSkottCli(
                  [
                    "--watch",
                    "--displayMode=raw",
                    "--exitCodeOnCircularDependencies=0",
                    `--cwd=${fixtureSubDirectoryPath}`
                  ],
                  useTimeout(1_500 * increaseTimeoutFactor)
                ),
                doneSuccess,
                doneFailure,
                actionThatShouldTriggerChanges: () => {
                  fs.writeFileSync(fixtureFilePath, "console.log(1);");
                },
                finalizer: cleanupTest
              });
            }));
        });

        describe("When dealing with ignored entries", () => {
          describe("When an ignored file is added/removed/updated within the watched scope", () => {
            test("Should not re-run analysis", () =>
              new Promise((doneSuccess, doneFailure) => {
                const fixtureFilePath = path.join(fixturesPath, "index.rs");
                const cleanupTest = prepareFinalizer(fixtureFilePath);

                expectChangesNotToBeDetected({
                  skottCliProcess: runKeepAliveSkottCli(
                    [
                      "--watch",
                      "--displayMode=raw",
                      "--exitCodeOnCircularDependencies=0",
                      `--cwd=${fixturesPath}`
                    ],
                    useTimeout(1_500 * increaseTimeoutFactor)
                  ),
                  doneSuccess,
                  doneFailure,
                  finalizer: cleanupTest,
                  actionThatShouldTriggerChanges: () => {
                    fs.writeFileSync(fixtureFilePath, "fn main() {}");
                  }
                });
              }));
          });

          describe("When an entry from an ignored directory is updated within the watched scope", () => {
            describe("When the directory is part of the ones ignored by default", () => {
              test("Should not re-run analysis", () =>
                new Promise((doneSuccess, doneFailure) => {
                  const nodeModulesPath = path.join(
                    fixturesPath,
                    "node_modules",
                    "@skott"
                  );
                  const finalizeTest = prepareFinalizer(
                    path.join(fixturesPath, "node_modules")
                  );
                  fs.mkdirSync(nodeModulesPath, { recursive: true });

                  expectChangesNotToBeDetected({
                    skottCliProcess: runKeepAliveSkottCli(
                      [
                        "--watch",
                        "--displayMode=raw",
                        "--exitCodeOnCircularDependencies=0",
                        `--cwd=${fixturesPath}`
                      ],
                      useTimeout(1_500 * increaseTimeoutFactor)
                    ),
                    doneSuccess,
                    doneFailure,
                    actionThatShouldTriggerChanges: () => {
                      fs.writeFileSync(
                        path.join(nodeModulesPath, "index.js"),
                        "_"
                      );
                    },
                    finalizer: finalizeTest
                  });
                }));
            });

            describe("When the entry is git-ignored", () => {
              test("Should not re-run analysis", () =>
                new Promise((doneSuccess, doneFailure) => {
                  const gitIgnoreSandbox = path.join(
                    fixturesPath,
                    "git-ignore-sandbox",
                    "with-gitignore"
                  );
                  const fixtureFilePath = path.join(
                    gitIgnoreSandbox,
                    "index.js"
                  );
                  const finalizeTest = prepareFinalizer(gitIgnoreSandbox);

                  fs.mkdirSync(gitIgnoreSandbox, {
                    recursive: true
                  });

                  expectChangesNotToBeDetected({
                    skottCliProcess: runKeepAliveSkottCli(
                      [
                        "--watch",
                        "--displayMode=raw",
                        "--exitCodeOnCircularDependencies=0",
                        `--cwd=${path.join(fixturesPath, "git-ignore-sandbox")}`
                      ],
                      useTimeout(1_500 * increaseTimeoutFactor)
                    ),
                    doneSuccess,
                    doneFailure,
                    actionThatShouldTriggerChanges: () => {
                      fs.writeFileSync(fixtureFilePath, "function main() {}");
                    },
                    finalizer: finalizeTest
                  });
                }));
            });

            describe("When the entry is part of the ones ignored by the ignorePattern provided", () => {
              test("Should not re-run analysis", () =>
                new Promise((doneSuccess, doneFailure) => {
                  const ignorePatternPath = path.join(
                    fixturesPath,
                    "voluntarily-ignored"
                  );
                  const fixtureFilePath = path.join(
                    ignorePatternPath,
                    "index.js"
                  );
                  const finalizeTest = prepareFinalizer(ignorePatternPath);

                  fs.mkdirSync(ignorePatternPath, { recursive: true });
                  fs.writeFileSync(fixtureFilePath, "function main() {}");

                  expectChangesNotToBeDetected({
                    skottCliProcess: runKeepAliveSkottCli(
                      [
                        "--watch",
                        "--displayMode=raw",
                        "--exitCodeOnCircularDependencies=0",
                        `--cwd=${fixturesPath}`,
                        "--ignorePattern=voluntarily-ignored/**/*"
                      ],
                      useTimeout(1_500 * increaseTimeoutFactor)
                    ),
                    doneSuccess,
                    doneFailure,
                    actionThatShouldTriggerChanges: () => {
                      fs.unlinkSync(fixtureFilePath);
                    },
                    finalizer: finalizeTest
                  });
                }));
            });
          });
        });
      });
    },
    30_000
  );
});
