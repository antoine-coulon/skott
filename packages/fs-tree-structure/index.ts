import path from "node:path";

import set from "lodash.set";

export type TreeStructure = { [key: string]: TreeStructure };

// @TODO: should be mutualized with the one in skott
const fileExtensions = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];

function isNodeJSRuntime(): boolean {
  return typeof process !== "undefined";
}

function isFile(filePath: string): boolean {
  return fileExtensions.some((extension) => filePath.endsWith(extension));
}

function sortByResourceType(record: TreeStructure) {
  const sortedTree: TreeStructure = {};
  const sortedKeys = Object.keys(record).sort((a, b) => {
    if (isFile(a)) {
      if (isFile(b)) {
        return a.localeCompare(b);
      } else {
        return 1;
      }
    }

    return -1;
  });

  for (const sortedKey of sortedKeys) {
    const value = record[sortedKey];

    sortedTree[sortedKey] = value;
  }

  return sortedTree;
}

function sortTree(root: TreeStructure) {
  const newTree: TreeStructure = {};

  for (const [key, value] of Object.entries(root)) {
    newTree[key] = sortTree(value);
  }

  return sortByResourceType(newTree);
}

export function makeTreeStructure(
  filePaths: string[],
  options = {
    sort: false
  }
): TreeStructure {
  const fileTree = filePaths.reduce((tree, filePath) => {
    set(
      tree,
      filePath
        .split(isNodeJSRuntime() ? path.sep : "/")
        .filter((pathSegment) => pathSegment !== "."),
      {}
    );

    return tree;
  }, {});

  if (options.sort) {
    return sortTree(fileTree);
  }

  return fileTree;
}
