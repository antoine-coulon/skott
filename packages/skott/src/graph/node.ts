import { VertexDefinition } from "digraph-js";

export type SkottNodeBody = {
  size: number;
  thirdPartyDependencies: string[];
  builtinDependencies: string[];
};

export type SkottNode<T = unknown> = VertexDefinition<SkottNodeBody & T>;
