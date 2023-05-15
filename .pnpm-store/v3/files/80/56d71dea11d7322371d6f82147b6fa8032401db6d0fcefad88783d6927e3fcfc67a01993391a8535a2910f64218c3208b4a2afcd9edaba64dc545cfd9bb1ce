"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseFerossStandard;

var _path = _interopRequireDefault(require("path"));

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function parseFerossStandard(filename, deps, rootDir) {
  const packageJsonPath = _path.default.resolve(rootDir, 'package.json');

  const resolvedFilePath = _path.default.resolve(filename);

  if (resolvedFilePath === packageJsonPath && deps.indexOf('standard') !== -1) {
    const content = await (0, _file.getContent)(filename);
    const metadata = JSON.parse(content);
    const config = metadata.standard || {};
    const {
      parser
    } = config;
    return parser ? [parser] : [];
  }

  return [];
}

module.exports = exports.default;