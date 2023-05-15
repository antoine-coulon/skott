export class Logger {
  log(message: string) {
    process.stdout.write(message);
  }
}

export class FakeLogger {
  log() {}
}
