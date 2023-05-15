"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseServerless;

var path = _interopRequireWildcard(require("path"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Get plugin names from a yaml object.
 * @param {*} yml parsed serverless configuration
 */
function getPlugins(serverlessConfig) {
  return serverlessConfig.plugins;
}
/**
 * Get the dependency names of the given plugins.
 * @param {*} plugins array of plugin names as strings
 */


function getDependencies(plugins) {
  return plugins;
}

async function parseServerless(filename) {
  const basename = path.basename(filename);

  if (basename === 'serverless.yml') {
    const content = await (0, _file.getContent)(filename);

    const config = _jsYaml.default.safeLoad(content); // TODO This detects plugins from the main serverless.yml, but you could have plugins in included files like this: "plugins: ${file(./serverless.plugins.yml)}"


    return ['serverless', ...getDependencies(getPlugins(config))];
  }

  return [];
}

module.exports = exports.default;