import type { EventEmitter } from "stream";

interface Reredenrable {
  rerender(): void | Promise<void>;
}

export class CliComponent implements Reredenrable {
  constructor(private readonly renderFunction: () => void) {
    this.renderFunction();
  }

  rerender() {
    return this.renderFunction();
  }
}

export class RenderManager {
  asyncComponents: Array<() => Promise<void>> = [];

  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly components: Reredenrable[] = []
  ) {
    this.eventEmitter.on("change", () => {
      for (const component of this.components) {
        const componentRender = component.rerender();

        if (componentRender instanceof Promise) {
          this.asyncComponents.push(
            () => new Promise((resolve) => componentRender.then(resolve))
          );
        }
      }
    });
  }

  async afterRenderingPhase(done: () => void) {
    await Promise.all(this.asyncComponents.map((f) => f()));
    done();
  }

  renderOnChanges(displayMode: Reredenrable) {
    this.components.push(displayMode);
  }
}
