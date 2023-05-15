export class Logger {
  log(message: string) {
    process.stdout.write(`\n ${message} \n`);
  }
}

export class FakeLogger {
  log() {}
}
