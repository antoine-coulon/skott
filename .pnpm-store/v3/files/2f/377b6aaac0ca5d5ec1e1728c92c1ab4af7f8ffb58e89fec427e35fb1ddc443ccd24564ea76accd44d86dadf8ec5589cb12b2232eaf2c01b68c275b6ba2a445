"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectTypescriptImportEqualsDeclaration;

var _extract = require("./extract");

function detectTypescriptImportEqualsDeclaration(node) {
  return node.type === 'TSImportEqualsDeclaration' && node.moduleReference && node.moduleReference.expression ? (0, _extract.extractInlineWebpack)(node.moduleReference.expression.value) : [];
}

module.exports = exports.default;