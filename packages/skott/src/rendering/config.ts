import kleur from "kleur";

import type { InputConfig, RuntimeConfig } from "../config.js";
import { createRuntimeConfig } from "../instance.js";

export function toRuntimeConfigOrDie<T>(input: InputConfig<T>): RuntimeConfig {
  try {
    return createRuntimeConfig(input);
  } catch (error) {
    // @ts-expect-error
    console.log(`\n ${kleur.bold().red(error.message)}`);

    return process.exit(1);
  }
}
