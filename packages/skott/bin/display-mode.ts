import type EventEmitter from "events";

export class DisplayMode {
  constructor(
    private readonly identifier: string,
    private readonly displayFunction: () => void
  ) {}

  registerWatchMode(watchEmitter: EventEmitter) {
    watchEmitter.on("change", () => {
      this.displayFunction();
    });
  }
}
