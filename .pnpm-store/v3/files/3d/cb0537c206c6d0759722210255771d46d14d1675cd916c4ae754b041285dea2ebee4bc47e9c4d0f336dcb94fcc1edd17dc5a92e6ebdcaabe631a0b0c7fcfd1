"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseHusky;

var path = _interopRequireWildcard(require("path"));

var _file = require("../utils/file");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function parseHusky(filename) {
  const basename = path.basename(filename);

  if (basename === 'package.json') {
    const content = await (0, _file.getContent)(filename);
    const pkg = JSON.parse(content);
    return pkg.husky ? ['husky'] : [];
  }

  return [];
}

module.exports = exports.default;