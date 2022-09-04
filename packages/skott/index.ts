import { Skott, SkottConfig, SkottInstance } from "./src/skott.js";

export default async function skott(
  config: SkottConfig
): Promise<SkottInstance> {
  const skottInstance = await new Skott(config).initialize();

  return skottInstance;
}
