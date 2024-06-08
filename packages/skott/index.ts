import type { InputConfig } from "./src/config.js";
import { run } from "./src/instance.js";
import type { SkottInstance } from "./src/skott.js";

export default function skott<T>(
  inputConfig: InputConfig<T> | null = Object.create(null)
): Promise<SkottInstance<T>> {
  return run(inputConfig);
}

export * from "./src/skott.js";
