"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parsePrettier;

var _path = _interopRequireDefault(require("path"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parsePrettier(filename) {
  if (_path.default.basename(filename) === 'package.json') {
    const config = (0, _utils.readJSON)(filename);

    if (config && config.prettier && typeof config.prettier === 'string') {
      return [config.prettier];
    }
  }

  return [];
}

module.exports = exports.default;