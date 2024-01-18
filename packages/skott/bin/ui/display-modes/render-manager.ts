import type { EventEmitter } from "stream";

interface Reredenrable {
  rerender(): void;
}

export class ReRenderableMode implements Reredenrable {
  constructor(private readonly renderFunction: () => void) {
    this.renderFunction();
  }

  rerender() {
    this.renderFunction();
  }
}

export class RenderManager {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly displayModes: Reredenrable[] = []
  ) {
    this.eventEmitter.on("change", () => {
      for (const displayMode of this.displayModes) {
        displayMode.rerender();
      }
    });
  }

  public renderOnChanges(displayMode: Reredenrable) {
    this.displayModes.push(displayMode);
  }
}
