import path from "node:path";

import set from "lodash.set";

export type TreeStructure = { [key: string]: TreeStructure };

function isNodeJSRuntime(): boolean {
  return typeof process !== "undefined";
}

export function makeTreeStructure(filePaths: string[]): TreeStructure {
  return filePaths.reduce((tree, filePath) => {
    set(
      tree,
      filePath
        .split(isNodeJSRuntime() ? path.sep : "/")
        .filter((pathSegment) => pathSegment !== "."),
      {}
    );

    return tree;
  }, {});
}
