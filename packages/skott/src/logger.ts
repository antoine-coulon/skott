import { performance } from "perf_hooks";

import * as Context from "@effect/data/Context";
import * as Effect from "@effect/io/Effect";
import kleur from "kleur";

interface LogMessage<T = void> {
  (message: string): T;
}

export interface SkottLogger {
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

export const LoggerTag = Context.Tag<SkottLogger>();

export class Logger implements SkottLogger {
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
  return Effect.serviceWithEffect(LoggerTag, ({ failure }) =>
    Effect.sync(() => failure(message))
  );
}

export function logSuccessM(message: string) {
  return Effect.serviceWithEffect(LoggerTag, ({ success }) =>
    Effect.sync(() => success(message))
  );
}

export class FakeLogger implements SkottLogger {
  info() {}
  startInfo() {
    return () => {};
  }
  success() {}
  failure() {}
}
