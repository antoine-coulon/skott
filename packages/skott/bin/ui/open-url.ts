import { ChildProcess, spawn } from "node:child_process";
import { platform } from "node:process";

import isWsl from "is-wsl";

const supportedPlatforms = ["darwin", "win32", "linux"] as const;

function selectPlatformBinary() {
  let binary: string | undefined;

  switch (platform) {
    case "darwin":
      binary = "open";
      break;
    case "win32":
      binary = "explorer.exe";
      break;
    case "linux":
      binary = "xdg-open";
      break;
    default:
      throw new Error(
        `Unsupported platform: ${
          process.platform
        }. Supported platforms are: ${supportedPlatforms.join(", ")}`
      );
  }

  return binary;
}

export function open(url: string, callback: (error: Error) => void): void {
  try {
    let child: ChildProcess;

    if (isWsl) {
      child = spawn("cmd.exe", ["/c", "start", url]);
    } else {
      const binary = selectPlatformBinary();
      child = spawn(binary, [url]);
    }

    child.on("error", callback);
  } catch (error) {
    callback(error as Error);
  }
}
