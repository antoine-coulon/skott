"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = clearCache;
exports.default = getScripts;

var _path = _interopRequireDefault(require("path"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _lodash = _interopRequireDefault(require("lodash"));

var _file = require("./file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const scriptCache = {};

function clearCache() {
  Object.keys(scriptCache).forEach(key => {
    scriptCache[key] = undefined;
  });
}

async function getCacheOrFile(key, fn) {
  if (scriptCache[key]) {
    return scriptCache[key];
  }

  const value = await fn();
  scriptCache[key] = value;
  return value;
}

const travisCommands = [// Reference: https://docs.travis-ci.com/user/job-lifecycle
'before_install', 'install', 'before_script', 'script', 'before_cache', 'after_success', 'after_failure', 'before_deploy', // 'deploy', // currently ignored
'after_deploy', 'after_script'];

async function getScripts(filename) {
  return getCacheOrFile(filename, async () => {
    const basename = _path.default.basename(filename);

    if (basename === 'package.json') {
      const content = await (0, _file.getContent)(filename);
      return _lodash.default.values(JSON.parse(content).scripts || {});
    }

    if (basename === '.travis.yml') {
      const content = await (0, _file.getContent)(filename);
      const metadata = _jsYaml.default.safeLoad(content) || {};
      return (0, _lodash.default)(travisCommands).map(cmd => metadata[cmd] || []).flatten().value();
    }

    return [];
  });
}