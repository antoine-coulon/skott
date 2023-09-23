import { spawn } from "node:child_process";
import { platform } from "node:process";

import isWsl from "is-wsl";

const supportedPlatforms = ["darwin", "win32", "linux"] as const;

function selectLinuxBinary(): string {
  if (isWsl) {
    return "wslview";
  }

  return "xdg-open";
}

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
      binary = selectLinuxBinary();
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
    const binary = selectPlatformBinary();
    const child = spawn(binary, [url]);

    child.on("error", callback);
  } catch (error) {
    callback(error as Error);
  }
}
