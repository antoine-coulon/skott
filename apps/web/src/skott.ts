import { SkottStructure } from "skott";

export type SkottStructureWithCycles = SkottStructure & {
  cycles: string[][];
  entrypoint: string;
};

export interface SkottMetadata {
  entrypoint: string;
}
