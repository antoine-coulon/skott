"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseReact17;

var _path = _interopRequireDefault(require("path"));

var _semver = _interopRequireDefault(require("semver"));

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function parseReact17(filename) {
  if (_path.default.basename(filename) === 'package.json') {
    const content = await (0, _file.getContent)(filename);
    const metadata = JSON.parse(content);

    try {
      var _metadata$dependencie;

      if (_semver.default.gte(_semver.default.coerce((_metadata$dependencie = metadata.dependencies) === null || _metadata$dependencie === void 0 ? void 0 : _metadata$dependencie.react), '17.0.0')) {
        return ['react'];
      }
    } catch {
      return [];
    }
  }

  return [];
}

module.exports = exports.default;