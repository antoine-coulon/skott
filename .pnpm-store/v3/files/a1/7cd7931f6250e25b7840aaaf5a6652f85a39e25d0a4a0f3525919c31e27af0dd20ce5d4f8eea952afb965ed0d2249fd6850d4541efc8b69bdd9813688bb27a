"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseBinary;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const binaryCache = {};

function getCacheOrLoad(dep, dir) {
  const index = `${dir}/${dep}`;

  if (!binaryCache[index]) {
    const metadata = (0, _utils.loadModuleData)(dep, dir).metadata || {};
    binaryCache[index] = metadata.bin || {};
  }

  return binaryCache[index];
}

function getBinaries(dep, dir) {
  const binMetadata = getCacheOrLoad(dep, dir);

  if (typeof binMetadata === 'string') {
    return [[dep, binMetadata]];
  }

  return _lodash.default.toPairs(binMetadata);
}

function getBinaryFeatures(dep, [key, value]) {
  const binPath = _path.default.join('node_modules', dep, value).replace(/\\/g, '/');

  const features = [key, `--require ${key}`, `--require ${key}/register`, `-r ${key}`, `-r ${key}/register`, `$(npm bin)/${key}`, `node_modules/.bin/${key}`, `./node_modules/.bin/${key}`, binPath, `./${binPath}`];
  return features;
}

function isBinaryInUse(dep, scripts, dir) {
  const binaries = getBinaries(dep, dir);
  return binaries.some(bin => getBinaryFeatures(dep, bin).some(feature => scripts.some(script => _lodash.default.includes(` ${script} `, ` ${feature} `))));
}

async function parseBinary(filename, deps, dir) {
  const scripts = await (0, _utils.getScripts)(filename);
  return deps.filter(dep => isBinaryInUse(dep, scripts, dir));
}

module.exports = exports.default;