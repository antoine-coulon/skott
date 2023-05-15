"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSvelte;

var _parser = require("@babel/parser");

var _file = require("../utils/file");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function parseSvelte(filename) {
  const {
    compile
  } = await Promise.resolve().then(() => _interopRequireWildcard(require('svelte/compiler')));
  const content = await (0, _file.getContent)(filename);
  const {
    js
  } = compile(content);
  return (0, _parser.parse)(js.code, {
    sourceType: 'module'
  });
}

module.exports = exports.default;