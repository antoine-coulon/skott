import { SkottStructure } from "skott";
import { SkottNode as _SkottNode } from "skott/graph/node";

export type SkottStructureWithMetadata = SkottStructure & SkottMetadata;

export interface SkottCycles {
  cycles: string[][];
}

export interface SkottStructureWithCycles
  extends SkottStructureWithMetadata,
    SkottCycles {}

export interface SkottMetadata {
  entrypoint?: string;
}

export type SkottNode = _SkottNode;
