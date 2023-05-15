"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseMocha;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _requirePackageName = _interopRequireDefault(require("require-package-name"));

var _cliTools = require("../utils/cli-tools");

var _utils = require("../utils");

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const knownReporters = ['dot', 'doc', 'tap', 'json', 'html', 'list', 'min', 'spec', 'nyan', 'xunit', 'markdown', 'progress', 'landing', 'json-stream'];
const mochaTypescript = '@types/mocha';

function getOptsConfig(root, config, param) {
  const argvs = config.split(/\s+/);
  const optsIndex = argvs.indexOf(param);

  if (optsIndex === -1) {
    return null;
  }

  const optsPath = argvs[optsIndex + 1];

  if (!optsPath) {
    return null;
  }

  return _fs.default.readFileSync(_path.default.resolve(root, '..', optsPath), 'utf-8');
}

function getCliDependencies(content, deps) {
  const lines = content.split(/\s+/);
  const result = [];
  lines.forEach((line, idx) => {
    if (line === '--require') {
      const val = lines[idx + 1];

      if (val && !val.startsWith('--')) {
        result.push(val);
      }
    }

    if (line === '--reporter') {
      const val = lines[idx + 1];

      if (val && !val.startsWith('--') && !knownReporters.includes(val)) {
        result.push(val);
      }
    }
  });
  return result.map(_requirePackageName.default).filter((v, k, arr) => arr.indexOf(v) === k).filter(name => deps.includes(name));
}

function getParamDependencies(content, deps) {
  const result = [];

  if (content.require) {
    result.push(...(0, _utils.wrapToArray)(content.require));
  }

  if (content.reporter) {
    result.push(...(0, _utils.wrapToArray)(content.reporter).filter(r => !knownReporters.includes(r)));
  }

  return result.map(_requirePackageName.default).filter((v, k, arr) => arr.indexOf(v) === k).filter(name => deps.includes(name));
}

const configNameRegex = /^\.mocharc\.(json|jsonc|js|yml|yaml)$/;

async function parseMocha(filename, deps, rootDir) {
  const defaultOptPath = _path.default.resolve(rootDir, 'test/mocha.opts');

  const basename = _path.default.basename(filename);

  let cliConfig;
  let paramConfig;

  if (filename === defaultOptPath) {
    cliConfig = await (0, _file.getContent)(filename);
  } else if (configNameRegex.test(basename)) {
    const content = await (0, _file.getContent)(filename);
    paramConfig = (0, _cliTools.parse)(content);
  } else {
    const scripts = await (0, _utils.getScripts)(filename);
    const mochaScript = scripts.find(s => s.indexOf('mocha') !== -1);

    if (mochaScript) {
      cliConfig = mochaScript.slice(mochaScript.indexOf('mocha'));
    }

    if (basename === 'package.json') {
      const content = await (0, _file.getContent)(filename);
      paramConfig = JSON.parse(content).mocha;
    }
  }

  const requires = [];

  if (cliConfig) {
    let optsConfig;
    optsConfig = getOptsConfig(filename, cliConfig, '--opts');

    if (optsConfig) {
      requires.push(...getCliDependencies(optsConfig, deps));
    }

    optsConfig = getOptsConfig(filename, cliConfig, '--config');

    if (optsConfig) {
      requires.push(...getParamDependencies((0, _cliTools.parse)(optsConfig), deps));
    }

    requires.push(...getCliDependencies(cliConfig, deps));
  }

  if (paramConfig) {
    requires.push(...getParamDependencies(paramConfig, deps));
  }

  if ((cliConfig || paramConfig) && deps.includes(mochaTypescript)) {
    requires.push(mochaTypescript);
  }

  return requires;
}

module.exports = exports.default;