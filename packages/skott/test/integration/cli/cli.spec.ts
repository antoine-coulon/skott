import fs from "node:fs";
import path from "node:path";

import * as Either from "@effect/data/Either";
import { expect, test, describe, beforeAll } from "vitest";

import {
  fixturesPath,
  runKeepAliveSkottCli,
  runOneShotSkottCli,
  transpileCliExecutable
} from "./bootstrap.js";
import {
  expectChangesNotToBeDetected,
  expectChangesToBeDetected,
  runFinalizer
} from "./watch-expect.js";

const useTimeout = (time_ms: number) => AbortSignal.timeout(time_ms);

describe("When running skott cli", () => {
  beforeAll(async () => {
    await transpileCliExecutable();
  });

  test("Should display help", async () => {
    const result = await runOneShotSkottCli(["--help"], useTimeout(2000));

    expect(Either.isRight(result)).toBeTruthy();

    const right = Either.getOrThrow(result);

    expect(right.includes("Usage: cli")).toBeTruthy();
  });

  describe("When using watch mode", () => {
    describe("When expecting changes to be detected", () => {
      describe("When a matching file under the provided cwd is added/removed/updated", () => {
        test("Should re-run analysis", () =>
          new Promise((doneSuccess, doneFailure) => {
            const fixtureFilePath = path.join(fixturesPath, "index.js");
            fs.writeFileSync(fixtureFilePath, "console.log(1);");

            expectChangesToBeDetected({
              skottCliProcess: runKeepAliveSkottCli(
                [
                  "--watch",
                  "--displayMode=raw",
                  "--exitCodeOnCircularDependencies=0",
                  `--cwd=${fixturesPath}`
                ],
                useTimeout(2_500)
              ),
              doneSuccess,
              doneFailure,
              actionThatShouldTriggerChanges: () => {
                fs.unlinkSync(fixtureFilePath);
              }
            });
          }));
      });

      describe("When a matching file nested under the provided cwd is added/removed/updated", () => {
        test("Should re-run analysis", () =>
          new Promise((doneSuccess, doneFailure) => {
            const fixtureFolderPath = path.join(
              fixturesPath,
              "some-dir",
              "some-other-dir"
            );
            const fixtureFilePath = path.join(fixtureFolderPath, "index.js");

            const cleanupTest = runFinalizer(
              path.join(fixturesPath, "some-dir")
            );

            fs.mkdirSync(fixtureFolderPath, { recursive: true });
            fs.writeFileSync(fixtureFilePath, "console.log(1);");

            expectChangesToBeDetected({
              skottCliProcess: runKeepAliveSkottCli(
                [
                  "--watch",
                  "--displayMode=raw",
                  "--exitCodeOnCircularDependencies=0",
                  `--cwd=${fixturesPath}`
                ],
                useTimeout(2_500)
              ),
              doneSuccess,
              doneFailure,
              actionThatShouldTriggerChanges: () => {
                fs.unlinkSync(fixtureFilePath);
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
            fs.writeFileSync(fixtureFilePath, "console.log(1);");

            expectChangesNotToBeDetected({
              skottCliProcess: runKeepAliveSkottCli(
                [
                  "--watch",
                  "--displayMode=raw",
                  "--exitCodeOnCircularDependencies=0",
                  `--cwd=${fixtureSubDirectoryPath}`
                ],
                useTimeout(1_000)
              ),
              doneSuccess,
              doneFailure,
              actionThatShouldTriggerChanges: () => {
                fs.unlinkSync(fixtureFilePath);
              }
            });
          }));
      });

      describe("When dealing with ignored entries", () => {
        describe("When an ignored file is added/removed/updated within the watched scope", () => {
          test("Should not re-run analysis", () =>
            new Promise((doneSuccess, doneFailure) => {
              const fixtureFilePath = path.join(fixturesPath, "index.rs");
              fs.writeFileSync(fixtureFilePath, "fn main() {}");

              expectChangesNotToBeDetected({
                skottCliProcess: runKeepAliveSkottCli(
                  [
                    "--watch",
                    "--displayMode=raw",
                    "--exitCodeOnCircularDependencies=0",
                    `--cwd=${fixturesPath}`
                  ],
                  useTimeout(2_500)
                ),
                doneSuccess,
                doneFailure,
                actionThatShouldTriggerChanges: () => {
                  fs.unlinkSync(fixtureFilePath);
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

                const finalizeTest = runFinalizer(
                  path.join(fixturesPath, "node_modules")
                );

                const fixtureFilePath = path.join(nodeModulesPath, "index.js");
                fs.mkdirSync(nodeModulesPath, { recursive: true });
                fs.writeFileSync(fixtureFilePath, "function main() {}");

                expectChangesNotToBeDetected({
                  skottCliProcess: runKeepAliveSkottCli(
                    [
                      "--watch",
                      "--displayMode=raw",
                      "--exitCodeOnCircularDependencies=0",
                      `--cwd=${fixturesPath}`
                    ],
                    useTimeout(2_500)
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

          describe("When the entry is part of the ones ignored by the ignorePattern provided", () => {
            test("Should not re-run analysis", () =>
              new Promise((doneSuccess, doneFailure) => {
                const ignorePatternPath = path.join(
                  fixturesPath,
                  "voluntarily-ignored"
                );

                const finalizeTest = runFinalizer(ignorePatternPath);

                const fixtureFilePath = path.join(
                  ignorePatternPath,
                  "index.js"
                );
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
                    useTimeout(2_500)
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
  });
});
