import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import * as Either from "@effect/data/Either";
import { expect, test, describe } from "vitest";

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

describe("When running skott cli", () => {
  test("Should display help", async () => {
    const result = await runOneShotSkottCli(["--help"], useTimeout(2000));

    expect(Either.isRight(result)).toBeTruthy();

    const right = Either.getOrThrow(result);

    expect(right.includes("Usage: cli")).toBeTruthy();
  });

  describe("When watching for changes", () => {
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
              doneFailure(new Error("A change was caught when it should not"));
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
      describe("When an ignored file is added/removed/updated in the watched scope", () => {
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

      // TODO
      describe.skip("When an entry from an ignored directory is updated in the watched scope", () => {
        test("Should not re-run analysis", () =>
          new Promise((doneSuccess) => {
            const fixtureFilePath = path.join(fixturesPath, "index.rs");
            fs.writeFileSync(fixtureFilePath, "fn main() {}");

            doneSuccess(undefined);
          }));
      });
    });
  });
});
