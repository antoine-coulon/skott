"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseCoffeeScript;

var _depsRegex = _interopRequireDefault(require("deps-regex"));

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const re = new _depsRegex.default({
  matchES6: false
});

async function parseCoffeeScript(filename) {
  const content = await (0, _file.getContent)(filename);
  return re.getDependencies(content);
}

module.exports = exports.default;