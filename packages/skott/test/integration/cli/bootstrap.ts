import child_process from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import * as Either from "@effect/data/Either";

export const skottBinaryPath = path.join(
  process.cwd(),
  "dist",
  "bin",
  "cli.js"
);

export const fixturesPath = path.join(
  process.cwd(),
  "test",
  "integration",
  "__fixtures__"
);

export function runOneShotSkottCli(
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

export function runKeepAliveSkottCli(
  args: string[],
  signal: AbortSignal
): child_process.ChildProcess {
  return child_process.fork(skottBinaryPath, args, {
    signal,
    stdio: "pipe"
  });
}

export function transpileCliExecutable() {
  const execP = promisify(child_process.exec);

  return execP("npm run build", { cwd: process.cwd() }).catch(console.error);
}
