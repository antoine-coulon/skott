"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectTypescriptImportType;

function detectTypescriptImportType(node) {
  return node.type === 'TSImportType' && node.argument && node.argument.value ? [node.argument.value] : [];
}

module.exports = exports.default;