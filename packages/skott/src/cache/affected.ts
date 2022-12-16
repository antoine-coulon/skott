import crypto from "node:crypto";

export function createNodeHash(content: string): string {
  return crypto.createHash("sha1").update(content).digest("hex");
}

export function isConfigurationAffected(
  currentConfigHash: string,
  cachedConfigHash: string
): boolean {
  return currentConfigHash !== cachedConfigHash;
}

export function isFileAffected(fileContent: string, fileHash: string): boolean {
  return createNodeHash(fileContent) !== fileHash;
}
