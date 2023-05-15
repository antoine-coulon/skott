"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expressViewEngine;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expressViewEngine(node) {
  return node.type === 'CallExpression' && node.callee && node.callee.property && node.callee.property.name === 'set' && node.arguments[0] && node.arguments[0].value === 'view engine' && node.arguments[1] && _lodash.default.isString(node.arguments[1].value) ? [node.arguments[1].value] : [];
}

module.exports = exports.default;