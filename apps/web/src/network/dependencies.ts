import { Node } from "vis-network";

import { SkottStructureWithMetadata } from "../skott";
import { defaultNodeOptions } from "./configuration";

export const circularNodeOptions = {
  color: {
    border: "#000000",
    background: "#FF5656",
    highlight: {
      border: "#000000",
      background: "#FF5656",
    },
  },
};

export const circularEdgeOptions = {
  color: "#FF0000",
  highlight: "#DF0000",
  hover: "#DF0000",
  inherit: false,
};

export const deepDependencyNodeOptions = {
  color: {
    border: "#000000",
    background: "#73e6ac",
    highlight: {
      border: "#000000",
      background: "#73e6ac",
    },
  },
};

export const deepDependencyEdgeOptions = {
  color: "#73e6ac",
  highlight: "#DF0000",
  hover: "#DF0000",
  inherit: false,
};

export const builtinNodeOptions = {
  color: {
    border: "#000000",
    background: "#74b859",
    highlight: {
      border: "#337718",
      background: "#5AA33C",
    },
  },
};

export const builtinEdgeOptions = {
  color: "#5F9C47",
  highlight: "#4C8834",
  hover: "#000000",
  inherit: false,
};

export function computeBuiltinDependencies(data: SkottStructureWithMetadata) {
  function makeBuiltinDependencyNode(
    builtinDependencyId: string,
    builtinId: string
  ) {
    return {
      id: builtinDependencyId,
      label: builtinId,
      ...defaultNodeOptions,
      ...builtinNodeOptions,
    };
  }

  function makeBuiltinDependencyEdge(
    builtinDependencyId: string,
    nodeId: string
  ) {
    return {
      id: builtinDependencyId,
      from: nodeId,
      to: builtinDependencyId,
      ...builtinEdgeOptions,
    };
  }

  const nodesWithEdges: Node[] = [];

  for (const skottNode of Object.values(data.graph)) {
    for (const builtin of skottNode.body.builtinDependencies) {
      const builtinDependencyId = `${skottNode.id}-${builtin}`;

      nodesWithEdges.push(
        makeBuiltinDependencyNode(builtinDependencyId, builtin),
        makeBuiltinDependencyEdge(builtinDependencyId, skottNode.id)
      );
    }
  }

  return nodesWithEdges;
}

const thirdPartyNodeOptions = {
  color: {
    border: "#000000",
    background: "#FF60FB",
    highlight: {
      border: "#A600A2",
      background: "#FF56FA",
    },
  },
};

const thirdPartyEdgeOptions = {
  color: "#B300AE",
  highlight: "#FF56FA",
  hover: "#000000",
  inherit: false,
};

export function computeThirdPartyDependencies(
  data: SkottStructureWithMetadata
) {
  function makeThirdPartyNode(
    thirdPartyId: string,
    thirdPartyDependencyId: string
  ) {
    return {
      id: thirdPartyDependencyId,
      label: thirdPartyId,
      ...defaultNodeOptions,
      ...thirdPartyNodeOptions,
    };
  }

  function makeThirdPartyEdge(nodeId: string, thirdPartyDependencyId: string) {
    return {
      id: thirdPartyDependencyId,
      from: nodeId,
      to: thirdPartyDependencyId,
      ...thirdPartyEdgeOptions,
    };
  }

  const nodesWithEdges: Node[] = [];

  for (const skottNode of Object.values(data.graph)) {
    for (const thirdParty of skottNode.body.thirdPartyDependencies) {
      const thirdPartyDependencyId = `${skottNode.id}-${thirdParty}`;

      nodesWithEdges.push(
        makeThirdPartyNode(thirdParty, thirdPartyDependencyId),
        makeThirdPartyEdge(skottNode.id, thirdPartyDependencyId)
      );
    }
  }

  return nodesWithEdges;
}
