"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodes;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fix for node.js <= 3, it throws TypeError when value type invalid in weak set
function hasVisited(ast, visited) {
  try {
    return visited.has(ast);
  } catch (e) {
    return false;
  }
}

function recursive(ast, visited) {
  if (!ast || hasVisited(ast, visited)) {
    return [];
  }

  if (Array.isArray(ast)) {
    return (0, _lodash.default)(ast).map(node => recursive(node, visited)).flatten().value();
  }

  if (ast.type) {
    visited.add(ast);
    return (0, _lodash.default)(ast).keys().filter(key => key !== 'tokens' && key !== 'comments').map(key => recursive(ast[key], visited)).flatten().concat(ast).value();
  }

  return [];
}

function getNodes(ast) {
  const visited = new WeakSet();
  return recursive(ast, visited);
}

module.exports = exports.default;