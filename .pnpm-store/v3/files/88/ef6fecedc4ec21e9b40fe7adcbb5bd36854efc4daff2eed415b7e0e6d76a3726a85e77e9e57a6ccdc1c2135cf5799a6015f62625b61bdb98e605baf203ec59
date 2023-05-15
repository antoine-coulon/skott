"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.getCustomConfig = getCustomConfig;
exports.loadConfig = loadConfig;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var JSON5 = _interopRequireWildcard(require("json5"));

var _ = require(".");

var _getScripts = _interopRequireDefault(require("./get-scripts"));

var _file = require("./file");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const optionKeysForConfig = {
  babel: ['--config-file'],
  eslint: ['--config', '-c'],
  tslint: ['--config', '-c']
};

function parse(content) {
  try {
    return JSON.parse(content);
  } catch (error) {// not JSON format
  }

  try {
    return JSON5.parse(content);
  } catch (error) {// not JSON5 format
  }

  try {
    return _jsYaml.default.safeLoad(content);
  } catch (error) {// not YAML format
  }

  try {
    return (0, _.evaluate)(`module.exports = ${content}`);
  } catch (error) {// not valid JavaScript code
  }

  try {
    return (0, _.evaluate)(content);
  } catch (error) {// not valid JavaScript code
  } // parse fail, return nothing


  return null;
}

async function getCustomConfig(binName, filename, rootDir) {
  const scripts = await (0, _getScripts.default)(filename);

  if (scripts.length === 0) {
    return null;
  }

  const script = scripts.find(s => s.split(/\s+/).includes(binName));

  if (script) {
    const commands = script.split('&&');
    const command = commands.find(c => c.startsWith(binName));
    const optionsKeys = optionKeysForConfig[binName];

    if (command && optionsKeys) {
      const args = command.split(/\s+/);
      const configIdx = args.findIndex(arg => optionsKeys.includes(arg));

      if (configIdx !== -1 && args[configIdx + 1]) {
        const configFile = args[configIdx + 1];
        const configPath = path.resolve(rootDir, configFile);
        const configContent = fs.readFileSync(configPath);
        return parse(configContent);
      }
    }
  }

  return null;
}

async function loadConfig(binName, filenameRegex, filename, rootDir) {
  const basename = path.basename(filename);

  if (filenameRegex.test(basename)) {
    const requireConfig = (0, _.tryRequire)(filename);

    if (requireConfig) {
      return requireConfig;
    }

    const content = await (0, _file.getContent)(filename);
    const config = parse(content);
    return config;
  }

  const custom = await getCustomConfig(binName, filename, rootDir);

  if (custom) {
    return custom;
  }

  return null;
}