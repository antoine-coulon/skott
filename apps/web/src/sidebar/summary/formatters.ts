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

export function formatForm(quantity: number, word: string) {
  const base = `${quantity} ${word}`;
  return quantity <= 1 ? base : `${base}s`;
}

export function formatOccurrences(quantity: number): string {
  if (quantity <= 9) {
    return `${quantity}`;
  }
  return `9+`;
}
