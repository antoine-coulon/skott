import { performance } from "perf_hooks";

import { Context, Effect } from "effect";
import kleur from "kleur";

interface LogMessage<T = void> {
  (message: string): T;
}

export interface Logger {
  info: LogMessage;
  startInfo: LogMessage<LogMessage>;
  success: LogMessage;
  failure: LogMessage;
}

function logMessage(message: string) {
  return `\n ${message} \n`;
}

export function highlight(message: string) {
  return kleur.bold().yellow(message);
}

export function lowlight(message: string) {
  return kleur.bold().grey(message);
}

// eslint-disable-next-line no-redeclare
export const Logger = Context.GenericTag<SkottLogger>("Logger");

export class SkottLogger implements SkottLogger {
  info(message: string) {
    process.stdout.write(logMessage(message));
  }

  startInfo(message: string) {
    const time = performance.now();
    process.stdout.write(logMessage(message));

    return function endInfo(message: string) {
      const elapsed = performance.now() - time;
      process.stdout.write(
        logMessage(
          kleur
            .bold(`✨ `)
            .concat(`${message} (${kleur.magenta(`${elapsed.toFixed(3)} ms`)})`)
        )
      );
    };
  }

  success(message: string) {
    process.stdout.write(logMessage(kleur.green("✓ ").concat(message)));
  }

  failure(message: string) {
    process.stderr.write(logMessage(kleur.red().bold("✖ ").concat(message)));
  }
}

export function logFailureM(message: string) {
  // eslint-disable-next-line func-names
  return Effect.gen(function* (_) {
    const logger = yield* _(Logger);

    return Effect.sync(() => logger.failure(message));
  });
}

export function logSuccessM(message: string) {
  // eslint-disable-next-line func-names
  return Effect.gen(function* (_) {
    const logger = yield* _(Logger);

    return Effect.sync(() => logger.success(message));
  });
}

export class FakeLogger implements Logger {
  info() {}
  startInfo() {
    return () => {};
  }
  success() {}
  failure() {}
}
