"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readJSON = readJSON;
exports.evaluate = evaluate;
exports.loadModuleData = loadModuleData;
exports.tryRequire = tryRequire;
exports.wrapToArray = wrapToArray;
exports.wrapToMap = wrapToMap;
Object.defineProperty(exports, "getScripts", {
  enumerable: true,
  get: function () {
    return _getScripts.default;
  }
});

var _path = _interopRequireDefault(require("path"));

var _vm = _interopRequireDefault(require("vm"));

var _getScripts = _interopRequireDefault(require("./get-scripts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readJSON(filePath) {
  return require(filePath); // eslint-disable-line global-require
}

function evaluate(code) {
  const exports = {};
  const sandbox = {
    exports,
    module: {
      exports
    }
  };

  _vm.default.runInNewContext(code, sandbox);

  return sandbox.module.exports;
}

function loadModuleData(moduleName, rootDir) {
  try {
    const file = require.resolve(`${moduleName}/package.json`, {
      paths: [rootDir]
    });

    return {
      path: _path.default.dirname(file),
      metadata: readJSON(file)
    };
  } catch (error) {
    return {
      path: null,
      metadata: null
    };
  }
}

function tryRequire(module, paths = []) {
  try {
    let moduleName = module;
    if (paths.length > 0) moduleName = require.resolve(moduleName, {
      paths
    });
    return require(moduleName); // eslint-disable-line global-require
  } catch (e) {
    return null;
  }
}

function wrapToArray(obj) {
  if (!obj) {
    return [];
  }

  if (Array.isArray(obj)) {
    return obj;
  }

  return [obj];
}

function wrapToMap(obj) {
  if (!obj) {
    return {};
  }

  return obj;
}