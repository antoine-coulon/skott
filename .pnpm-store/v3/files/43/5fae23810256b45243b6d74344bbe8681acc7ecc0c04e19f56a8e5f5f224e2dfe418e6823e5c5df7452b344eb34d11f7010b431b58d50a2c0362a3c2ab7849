"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseIstanbul;

var _path = _interopRequireDefault(require("path"));

var _cliTools = require("../utils/cli-tools");

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configNameRegex = /^(\.nycrc(\.(json|yml|yaml))?|nyc.config.js)$/;

function getExtendsDependencies(extendConfig, deps) {
  const dependencies = [];

  if (Array.isArray(extendConfig)) {
    extendConfig.forEach(extend => dependencies.push(...getExtendsDependencies(extend, deps)));
  } else if (!_path.default.isAbsolute(extendConfig)) {
    const extendParts = extendConfig.split('/');
    let depName = extendParts.shift();

    if (depName.startsWith('@')) {
      depName += `/${extendParts.shift()}`;
    }

    if (deps.includes(depName)) {
      dependencies.push(depName);
    }
  }

  return dependencies;
}

async function parseIstanbul(filename, deps) {
  const basename = _path.default.basename(filename);

  let config;

  if (configNameRegex.test(basename)) {
    const content = await (0, _file.getContent)(filename);
    config = (0, _cliTools.parse)(content);
  } else if (basename === 'package.json') {
    const content = await (0, _file.getContent)(filename);
    config = JSON.parse(content).nyc;
  }

  const requires = [];

  if (config && config.extends) {
    requires.push(...getExtendsDependencies(config.extends, deps));
  }

  return requires;
}

module.exports = exports.default;