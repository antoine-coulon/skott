"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requireCallExpression;

var _extract = require("./extract");

function requireCallExpression(node) {
  if (node.type === 'CallExpression' && node.callee && node.callee.type === 'Identifier' && node.callee.name === 'require' && node.arguments.length === 1) {
    if (node.arguments[0].type === 'Literal' || node.arguments[0].type === 'StringLiteral') {
      return typeof node.arguments[0].value === 'string' ? (0, _extract.extractInlineWebpack)(node.arguments[0].value) : [];
    }

    if (node.arguments[0].type === 'TemplateLiteral' && node.arguments[0].quasis.length === 1 && node.arguments[0].expressions.length === 0) {
      return (0, _extract.extractInlineWebpack)(node.arguments[0].quasis[0].value.raw);
    }
  }

  return [];
}

module.exports = exports.default;