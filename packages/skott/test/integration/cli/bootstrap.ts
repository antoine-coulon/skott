import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

import { Either } from "effect";

const tempDistFolderName = "test_dist";

export const skottTestBinaryPath = path.join(
  process.cwd(),
  tempDistFolderName,
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

    const childProcess = child_process.fork(skottTestBinaryPath, args, {
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
  return child_process.fork(skottTestBinaryPath, args, {
    signal,
    stdio: "pipe"
  });
}

export function transpileCliExecutable() {
  const exec = promisify(child_process.exec);

  return exec(`npm run build:test`, { cwd: process.cwd() }).catch(
    console.error
  );
}

export function deleteTranspiledFiles() {
  fs.rmSync(path.join(process.cwd(), tempDistFolderName), {
    recursive: true,
    force: true
  });
}
