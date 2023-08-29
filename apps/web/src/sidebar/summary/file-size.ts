export function convertBytesToUserFriendlyUnit(bytes: number) {
  switch (true) {
    case bytes < 1000:
      return `${bytes} B`;
    case bytes < 1000 * 1000:
      return `${(bytes / 1000).toFixed(2)} KB`;
    case bytes < 1000 * 1000 * 1000:
      return `${(bytes / (1000 * 1000)).toFixed(2)} MB`;
    default:
      return `${(bytes / (1000 * 1000 * 1000)).toFixed(2)} GB`;
  }
}
