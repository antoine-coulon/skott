"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = check;

var _path = _interopRequireDefault(require("path"));

var _debug = _interopRequireDefault(require("debug"));

var _isCoreModule = _interopRequireDefault(require("is-core-module"));

var _lodash = _interopRequireDefault(require("lodash"));

var _readdirp = _interopRequireDefault(require("readdirp"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _requirePackageName = _interopRequireDefault(require("require-package-name"));

var _utils = require("./utils");

var _parser = _interopRequireDefault(require("./utils/parser"));

var _typescript = require("./utils/typescript");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function isModule(dir) {
  try {
    (0, _utils.readJSON)(_path.default.resolve(dir, 'package.json'));
    return true;
  } catch (error) {
    return false;
  }
}

function mergeBuckets(object1, object2) {
  return _lodash.default.mergeWith(object1, object2, (value1, value2) => {
    const array1 = value1 || [];
    const array2 = value2 || [];
    return array1.concat(array2);
  });
}

function detect(detectors, node, deps) {
  return (0, _lodash.default)(detectors).map(detector => {
    try {
      return detector(node, deps);
    } catch (error) {
      return [];
    }
  }).flatten().value();
}

function discoverPropertyDep(rootDir, deps, property, depName) {
  const {
    metadata
  } = (0, _utils.loadModuleData)(depName, rootDir);
  if (!metadata) return [];
  const propertyDeps = Object.keys(metadata[property] || {});
  return _lodash.default.intersection(deps, propertyDeps);
}

async function getDependencies(dir, filename, deps, parser, detectors) {
  const result = await parser(filename, deps, dir); // when parser returns string array, skip detector step and treat them as dependencies.

  const dependencies = _lodash.default.isArray(result) && result.every(_lodash.default.isString) ? result : (0, _lodash.default)((0, _parser.default)(result)).map(node => detect(detectors, node, deps)).flatten().uniq().map(_requirePackageName.default).thru(_dependencies => parser === _constants.availableParsers.typescript ? // If this is a typescript file, importing foo would also use @types/foo, but
  // only if @types/foo is already a specified dependency.
  (0, _lodash.default)(_dependencies).map(dependency => {
    const atTypesName = (0, _typescript.getAtTypesName)(dependency);
    return deps.includes(atTypesName) ? [dependency, atTypesName] : [dependency];
  }).flatten().value() : _dependencies).value();

  const discover = _lodash.default.partial(discoverPropertyDep, dir, deps);

  const discoverPeerDeps = _lodash.default.partial(discover, 'peerDependencies');

  const discoverOptionalDeps = _lodash.default.partial(discover, 'optionalDependencies');

  const peerDeps = (0, _lodash.default)(dependencies).map(discoverPeerDeps).flatten().value();
  const optionalDeps = (0, _lodash.default)(dependencies).map(discoverOptionalDeps).flatten().value();
  return (0, _lodash.default)(dependencies).concat(peerDeps).concat(optionalDeps).filter(dep => dep && dep !== '.' && dep !== '..') // TODO why need check?
  .filter(dep => !(0, _isCoreModule.default)(dep)).uniq().value();
}

function checkFile(dir, filename, deps, parsers, detectors) {
  (0, _debug.default)('depcheck:checkFile')(filename);
  const targets = (0, _lodash.default)(parsers).keys().filter(glob => (0, _minimatch.default)(filename, glob, {
    dot: true
  })).map(key => parsers[key]).flatten().value();
  return targets.map(parser => getDependencies(dir, filename, deps, parser, detectors).then(using => {
    if (using.length) {
      (0, _debug.default)('depcheck:checkFile:using')(filename, parser, using);
    }

    return {
      using: {
        [filename]: using
      }
    };
  }, error => {
    (0, _debug.default)('depcheck:checkFile:error')(filename, parser, error);
    return {
      invalidFiles: {
        [filename]: error
      }
    };
  }));
}

function checkDirectory(dir, rootDir, ignorer, deps, parsers, detectors) {
  (0, _debug.default)('depcheck:checkDirectory')(dir);
  return new Promise(resolve => {
    const promises = [];
    const finder = (0, _readdirp.default)(dir, {
      fileFilter: entry => !ignorer.ignores(entry.path),
      directoryFilter: entry => !ignorer.ignores(entry.path) && !isModule(entry.fullPath)
    });
    finder.on('data', entry => {
      promises.push(...checkFile(rootDir, entry.fullPath, deps, parsers, detectors));
    });
    finder.on('warn', error => {
      (0, _debug.default)('depcheck:checkDirectory:error')(dir, error);
      promises.push(Promise.resolve({
        invalidDirs: {
          [error.path]: error
        }
      }));
    });
    finder.on('end', () => {
      resolve(Promise.all(promises).then(results => results.reduce((obj, current) => ({
        using: mergeBuckets(obj.using, current.using || {}),
        invalidFiles: _extends(obj.invalidFiles, current.invalidFiles),
        invalidDirs: _extends(obj.invalidDirs, current.invalidDirs)
      }), {
        using: {},
        invalidFiles: {},
        invalidDirs: {}
      })));
    });
  });
}

function buildResult(result, deps, devDeps, peerDeps, optionalDeps, skipMissing) {
  const usingDepsLookup = (0, _lodash.default)(result.using) // { f1:[d1,d2,d3], f2:[d2,d3,d4] }
  .toPairs() // [ [f1,[d1,d2,d3]], [f2,[d2,d3,d4]] ]
  .map(([file, dep]) => [dep, _lodash.default.times(dep.length, () => file)]) // [ [ [d1,d2,d3],[f1,f1,f1] ], [ [d2,d3,d4],[f2,f2,f2] ] ]
  .map(pairs => _lodash.default.zip(...pairs)) // [ [ [d1,f1],[d2,f1],[d3,f1] ], [ [d2,f2],[d3,f2],[d4,f2]] ]
  .flatten() // [ [d1,f1], [d2,f1], [d3,f1], [d2,f2], [d3,f2], [d4,f2] ]
  .groupBy(([dep]) => dep) // { d1:[ [d1,f1] ], d2:[ [d2,f1],[d2,f2] ], d3:[ [d3,f1],[d3,f2] ], d4:[ [d4,f2] ] }
  .mapValues(pairs => pairs.map(_lodash.default.last)) // { d1:[ f1 ], d2:[ f1,f2 ], d3:[ f1,f2 ], d4:[ f2 ] }
  .value();
  const usingDeps = Object.keys(usingDepsLookup);
  const missingDepsLookup = skipMissing ? [] : (() => {
    const allDeps = deps.concat(devDeps).concat(peerDeps).concat(optionalDeps);

    const missingDeps = _lodash.default.difference(usingDeps, allDeps);

    return (0, _lodash.default)(missingDeps).map(missingDep => [missingDep, usingDepsLookup[missingDep]]).fromPairs().value();
  })();
  return {
    dependencies: _lodash.default.difference(deps, usingDeps),
    devDependencies: _lodash.default.difference(devDeps, usingDeps),
    missing: missingDepsLookup,
    using: usingDepsLookup,
    invalidFiles: result.invalidFiles,
    invalidDirs: result.invalidDirs
  };
}

function check({
  rootDir,
  ignorer,
  skipMissing,
  deps,
  devDeps,
  peerDeps,
  optionalDeps,
  parsers,
  detectors
}) {
  const allDeps = _lodash.default.union(deps, devDeps);

  return checkDirectory(rootDir, rootDir, ignorer, allDeps, parsers, detectors).then(result => buildResult(result, deps, devDeps, peerDeps, optionalDeps, skipMissing));
}

module.exports = exports.default;