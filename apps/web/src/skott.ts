import { SkottStructure } from "skott";

export type SkottStructureWithCycles = SkottStructure & { cycles: string[][] };
