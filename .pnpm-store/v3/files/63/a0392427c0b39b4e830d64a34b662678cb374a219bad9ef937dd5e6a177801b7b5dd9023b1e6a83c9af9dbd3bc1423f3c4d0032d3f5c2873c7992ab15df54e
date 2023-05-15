"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectImportDeclaration;

var _extract = require("./extract");

function detectImportDeclaration(node, deps) {
  if (node.type !== 'ImportDeclaration' || !node.source || !node.source.value) {
    return [];
  } // Typescript "import type X from 'foo'" - doesn't need to depend on the
  // actual module, instead it can rely on `@types/<module>` instead.


  if (node.importKind === 'type' && deps.includes(`@types/${node.source.value}`)) {
    return [`@types/${node.source.value}`];
  }

  return (0, _extract.extractInlineWebpack)(node.source.value);
}

module.exports = exports.default;