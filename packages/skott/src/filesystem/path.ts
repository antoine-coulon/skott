import { platform } from "node:os";

export function toUnixPathLike(nodePath: string): string {
  if (platform() === "win32") {
    return nodePath.replace(/\\/g, "/");
  }

  return nodePath;
}
