import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

import * as Either from "@effect/data/Either";
import { expect, test, describe, beforeAll } from "vitest";

const skottBinaryPath = path.join(process.cwd(), "dist", "bin", "cli.js");
const fixturesPath = path.join(
  process.cwd(),
  "test",
  "integration",
  "__fixtures__"
);

function runOneShotSkottCli(
  args: string[],
  signal: AbortSignal
): Promise<Either.Either<string, string>> {
  return new Promise((resolve) => {
    signal.addEventListener(
      "abort",
      () => {
        resolve(Either.left("Aborted"));
      },
      { once: true }
    );

    let stdout = "";
    let stderr = "";

    const childProcess = child_process.fork(skottBinaryPath, args, {
      signal,
      stdio: "pipe"
    });

    childProcess.stdout?.on("data", (message) => {
      stdout += message;
    });

    childProcess.stderr?.on("data", (message) => {
      stderr += message;
    });

    childProcess.on("error", (e) => {
      stderr += e.message;
    });

    childProcess.on("exit", (code) => {
      if (code === 0) {
        return resolve(Either.right(stdout));
      }

      return resolve(Either.left(stderr));
    });
  });
}

const useTimeout = (time_ms: number) => AbortSignal.timeout(time_ms);

function runKeepAliveSkottCli(
  args: string[],
  signal: AbortSignal
): child_process.ChildProcess {
  return child_process.fork(skottBinaryPath, args, {
    signal,
    stdio: "pipe"
  });
}

function transpileCliExecutable() {
  const execP = promisify(child_process.exec);

  return execP("npm run build", { cwd: process.cwd() }).catch(console.error);
}

function runFinalizer(entryPath: string) {
  return (done: () => void) => {
    fs.rm(entryPath, { recursive: true, force: true }, done);
  };
}

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

            const childProcess = runKeepAliveSkottCli(
              [
                "--watch",
                "--displayMode=raw",
                "--exitCodeOnCircularDependencies=0",
                `--cwd=${fixturesPath}`
              ],
              useTimeout(2_500)
            );

            childProcess.stdout?.on("data", (cliBuffer) => {
              const cliOutput = cliBuffer.toString();
              if (cliOutput.includes("Watching for graph changes")) {
                // trigger action when watch mode is active
                fs.unlinkSync(fixtureFilePath);
              }

              if (cliOutput.includes("Changes detected")) {
                doneSuccess(undefined);
                childProcess.kill();
              }
            });

            childProcess.on("error", doneFailure);

            childProcess.on("exit", (code) => {
              if (code !== 0) {
                doneFailure(new Error(`Process exited with code ${code}`));
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
            const finalizeTest = runFinalizer(
              path.join(fixturesPath, "some-dir")
            );

            const fixtureFilePath = path.join(fixtureFolderPath, "index.js");
            fs.mkdirSync(fixtureFolderPath, { recursive: true });
            fs.writeFileSync(fixtureFilePath, "console.log(1);");

            const childProcess = runKeepAliveSkottCli(
              [
                "--watch",
                "--displayMode=raw",
                "--exitCodeOnCircularDependencies=0",
                `--cwd=${fixturesPath}`
              ],
              useTimeout(2_500)
            );

            childProcess.stdout?.on("data", (cliBuffer) => {
              const cliOutput = cliBuffer.toString();
              if (cliOutput.includes("Watching for graph changes")) {
                // trigger action when watch mode is active
                fs.unlinkSync(fixtureFilePath);
              }

              if (cliOutput.includes("Changes detected")) {
                finalizeTest(() => {
                  doneSuccess(undefined);
                  childProcess.kill();
                });
              }
            });

            childProcess.on("error", (e) => {
              finalizeTest(() => doneFailure(e));
            });

            childProcess.on("exit", (code) => {
              if (code !== 0) {
                finalizeTest(() =>
                  doneFailure(new Error(`Process exited with code ${code}`))
                );
              }
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

            const childProcess = runKeepAliveSkottCli(
              [
                "--watch",
                "--displayMode=raw",
                "--exitCodeOnCircularDependencies=0",
                `--cwd=${fixtureSubDirectoryPath}`
              ],
              useTimeout(1_000)
            );

            childProcess.stdout?.on("data", (cliBuffer) => {
              const cliOutput = cliBuffer.toString();
              if (cliOutput.includes("Watching for graph changes")) {
                // trigger action when watch mode is active
                fs.unlinkSync(fixtureFilePath);
              }

              if (cliOutput.includes("Changes detected")) {
                doneFailure(
                  new Error("A change was caught when it should not")
                );
                childProcess.kill();
              }
            });

            childProcess.on("error", (e) => {
              // @ts-expect-error
              if (e.code.includes("ABORT_ERR")) {
                doneSuccess(undefined);
              } else {
                doneFailure(e);
              }
            });

            childProcess.on("exit", (code) => {
              if (code !== 0) {
                doneFailure(new Error(`Process exited with code ${code}`));
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

              const childProcess = runKeepAliveSkottCli(
                [
                  "--watch",
                  "--displayMode=raw",
                  "--exitCodeOnCircularDependencies=0",
                  `--cwd=${fixturesPath}`
                ],
                useTimeout(2_500)
              );

              childProcess.stdout?.on("data", (cliBuffer) => {
                const cliOutput = cliBuffer.toString();
                if (cliOutput.includes("Watching for graph changes")) {
                  // trigger action when watch mode is active
                  fs.unlinkSync(fixtureFilePath);
                }

                if (cliOutput.includes("Changes detected")) {
                  doneFailure(
                    new Error("A change was caught when it should not")
                  );
                  childProcess.kill();
                }
              });

              childProcess.on("error", (e) => {
                // @ts-expect-error
                if (e.code.includes("ABORT_ERR")) {
                  doneSuccess(undefined);
                } else {
                  doneFailure(e);
                }
              });

              childProcess.on("exit", (code) => {
                if (code !== 0) {
                  doneFailure(new Error(`Process exited with code ${code}`));
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

                const childProcess = runKeepAliveSkottCli(
                  [
                    "--watch",
                    "--displayMode=raw",
                    "--exitCodeOnCircularDependencies=0",
                    `--cwd=${fixturesPath}`
                  ],
                  useTimeout(2_500)
                );

                childProcess.stdout?.on("data", (cliBuffer) => {
                  const cliOutput = cliBuffer.toString();

                  if (cliOutput.includes("Watching for graph changes")) {
                    console.log("fire action");
                    // trigger action when watch mode is active
                    fs.unlinkSync(fixtureFilePath);
                  }

                  if (cliOutput.includes("Changes detected")) {
                    finalizeTest(() => {
                      doneFailure(
                        new Error("A change was caught when it should not")
                      );
                      childProcess.kill();
                    });
                  }
                });

                childProcess.on("error", (e) => {
                  // @ts-expect-error
                  if (e.code.includes("ABORT_ERR")) {
                    finalizeTest(() => doneSuccess(undefined));
                  } else {
                    finalizeTest(() => doneFailure(e));
                  }
                });

                childProcess.on("exit", (code) => {
                  if (code !== 0) {
                    finalizeTest(() =>
                      doneFailure(new Error(`Process exited with code ${code}`))
                    );
                  }
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

                const childProcess = runKeepAliveSkottCli(
                  [
                    "--watch",
                    "--displayMode=raw",
                    "--exitCodeOnCircularDependencies=0",
                    `--cwd=${fixturesPath}`,
                    "--ignorePattern=voluntarily-ignored/**/*"
                  ],
                  useTimeout(2_500)
                );

                childProcess.stdout?.on("data", (cliBuffer) => {
                  const cliOutput = cliBuffer.toString();

                  if (cliOutput.includes("Watching for graph changes")) {
                    // trigger action when watch mode is active
                    fs.unlinkSync(fixtureFilePath);
                  }

                  if (cliOutput.includes("Changes detected")) {
                    finalizeTest(() => {
                      doneFailure(
                        new Error("A change was caught when it should not")
                      );
                      childProcess.kill();
                    });
                  }
                });

                childProcess.on("error", (e) => {
                  // @ts-expect-error
                  if (e.code.includes("ABORT_ERR")) {
                    finalizeTest(() => doneSuccess(undefined));
                  } else {
                    finalizeTest(() => doneFailure(e));
                  }
                });

                childProcess.on("exit", (code) => {
                  if (code !== 0) {
                    finalizeTest(() =>
                      doneFailure(new Error(`Process exited with code ${code}`))
                    );
                  }
                });
              }));
          });
        });
      });
    });
  });
});
