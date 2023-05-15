"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectExportDeclaration;

function detectExportDeclaration(node) {
  return (node.type === 'ExportNamedDeclaration' || node.type === 'ExportAllDeclaration') && node.source && node.source.value ? [node.source.value] : [];
}

module.exports = exports.default;