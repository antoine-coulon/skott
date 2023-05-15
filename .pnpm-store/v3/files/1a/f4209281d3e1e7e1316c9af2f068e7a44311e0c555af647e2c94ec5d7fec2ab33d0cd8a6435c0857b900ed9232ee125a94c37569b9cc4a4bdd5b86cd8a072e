"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseCommitizen;

var _path = _interopRequireDefault(require("path"));

var _requirePackageName = _interopRequireDefault(require("require-package-name"));

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function parseCommitizen(filename, deps, rootDir) {
  const packageJsonPath = _path.default.resolve(rootDir, 'package.json');

  const resolvedFilePath = _path.default.resolve(filename);

  if (resolvedFilePath === packageJsonPath) {
    const content = await (0, _file.getContent)(filename);
    const metadata = JSON.parse(content);

    if (metadata.config && metadata.config.commitizen && metadata.config.commitizen.path) {
      const commitizenPath = metadata.config.commitizen.path;

      if (!commitizenPath.startsWith('.')) {
        return [(0, _requirePackageName.default)(commitizenPath)];
      }

      const normalizedPath = _path.default.normalize(commitizenPath).replace(/\\/g, '/');

      if (!normalizedPath.startsWith('node_modules')) {
        // The path is not refering to a file in another module
        return [];
      }

      const packagePath = normalizedPath.substring('node_modules/'.length);
      return [(0, _requirePackageName.default)(packagePath)];
    }
  }

  return [];
}

module.exports = exports.default;