import { Cyclops, CyclopsConfig, CyclopsStructure } from "./cyclops/main.js";

export default async function cyclops(
  config: CyclopsConfig
): Promise<CyclopsStructure> {
  const cyclosGraph = new Cyclops(config);

  return cyclosGraph.buildProjectStructure();
}
