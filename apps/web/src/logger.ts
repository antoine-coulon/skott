const skottLoggerPrefix = `[skott] -> `;

export function logInfo(message: string) {
  return console.log(`${skottLoggerPrefix}${message}`);
}

export function logError(message: string) {
  return console.error(`${skottLoggerPrefix}${message}`);
}
