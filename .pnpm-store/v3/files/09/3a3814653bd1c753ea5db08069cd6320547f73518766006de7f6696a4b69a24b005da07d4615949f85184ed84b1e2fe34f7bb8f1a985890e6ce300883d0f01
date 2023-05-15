"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseTTypeScript;

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Search in all files looking like a TypeScript configuration file.
const tsconfigPattern = /tsconfig(?:\.[^.]+)*\.json/;

function parseTTypeScript(filename, deps) {
  const basename = _path.default.basename(filename);

  if (tsconfigPattern.test(basename)) {
    const content = (0, _utils.readJSON)(filename) || {};

    if (content.compilerOptions && content.compilerOptions.plugins) {
      return (0, _lodash.default)(content.compilerOptions.plugins).filter(plugin => plugin.transform).map(plugin => plugin.transform).intersection(deps).uniq().value();
    }
  }

  return [];
}

module.exports = exports.default;