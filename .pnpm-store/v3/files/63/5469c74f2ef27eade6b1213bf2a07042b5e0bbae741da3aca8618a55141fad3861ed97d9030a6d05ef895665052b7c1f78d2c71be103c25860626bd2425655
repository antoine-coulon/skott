"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = depcheck;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _multimatch = _interopRequireDefault(require("multimatch"));

var _ignore = _interopRequireDefault(require("ignore"));

var _debug = _interopRequireDefault(require("debug"));

var _check = _interopRequireDefault(require("./check"));

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function registerTs(rootDir) {
  if (!require.extensions['.ts']) {
    const ts = (0, _utils.tryRequire)('typescript', [rootDir, process.cwd(), __dirname]);

    if (ts) {
      require.extensions['.ts'] = (module, filename) => {
        const content = _fs.default.readFileSync(filename, 'utf8');

        const options = (0, _utils.tryRequire)(_path.default.join(rootDir, 'package.json')) || {};
        options.fileName = filename;
        const transpiled = ts.transpileModule(content.charCodeAt(0) === 0xfeff ? content.slice(1) : content, options); // eslint-disable-next-line no-underscore-dangle

        module._compile(transpiled.outputText, filename);
      };
    }
  }
}

function isIgnored(ignoreMatches, dependency) {
  return Boolean((0, _multimatch.default)(dependency, ignoreMatches).length);
}

function hasBin(rootDir, dependency) {
  const {
    metadata
  } = (0, _utils.loadModuleData)(dependency, rootDir);
  return !!metadata && {}.hasOwnProperty.call(metadata, 'bin');
}

function filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, dependencies) {
  return (0, _lodash.default)(dependencies).keys().reject(dep => isIgnored(ignoreMatches, dep) || ignoreBinPackage && hasBin(rootDir, dep)).value();
}

function getIgnorer({
  rootDir,
  ignorePath,
  ignorePatterns
}) {
  const ignorer = (0, _ignore.default)();
  ignorer.add(ignorePatterns); // If an .*ignore file is configured

  if (ignorePath) {
    const ignorePathFile = _path.default.resolve(rootDir, ignorePath);

    if (_fs.default.existsSync(ignorePathFile)) {
      (0, _debug.default)('depcheck:ignorer')(`Using ${ignorePathFile} as ignore file.`);

      const ignorePathFileContent = _fs.default.readFileSync(ignorePathFile, 'utf8');

      ignorer.add(ignorePathFileContent);
    }

    return ignorer;
  } // Fallback on .depcheckignore or .gitignore


  const ignoreFile = ['.depcheckignore', '.gitignore'].map(file => _path.default.resolve(rootDir, file)).find(file => _fs.default.existsSync(file));

  if (ignoreFile) {
    (0, _debug.default)('depcheck:ignorer')(`Using ${ignoreFile} as ignore file.`);

    const ignoreContent = _fs.default.readFileSync(ignoreFile, 'utf8');

    ignorer.add(ignoreContent);
  }

  return ignorer;
}

function depcheck(rootDir, options, callback) {
  registerTs(rootDir);

  const getOption = key => _lodash.default.isUndefined(options[key]) ? _constants.defaultOptions[key] : options[key];

  const ignoreBinPackage = getOption('ignoreBinPackage');
  const ignoreMatches = getOption('ignoreMatches');
  const ignorePath = getOption('ignorePath');
  const skipMissing = getOption('skipMissing'); // Support for ignoreDirs and ignorePatterns
  // - potential BREAKING CHANGE with previous implementation
  // - ignoreDirs was previously matching the exact name of a given directory
  // - ignorePatterns now use glob style syntax provided by the `ignore` package
  // - given the previous usage, should be mostly retro-compatible

  const ignorePatterns = _lodash.default.union(_constants.defaultOptions.ignorePatterns, options.ignoreDirs, options.ignorePatterns);

  const detectors = getOption('detectors');
  const parsers = (0, _lodash.default)(getOption('parsers')).mapValues(value => _lodash.default.isArray(value) ? value : [value]).merge({
    '**/*': getOption('specials')
  }).value();
  const metadata = options.package || (0, _utils.readJSON)(_path.default.join(rootDir, 'package.json'));
  const dependencies = metadata.dependencies || {};
  const devDependencies = metadata.devDependencies ? metadata.devDependencies : {};
  const peerDeps = Object.keys(metadata.peerDependencies || {});
  const optionalDeps = Object.keys(metadata.optionalDependencies || {});
  const deps = filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, dependencies);
  const devDeps = filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, devDependencies);
  const ignorer = getIgnorer({
    rootDir,
    ignorePath,
    ignorePatterns
  });
  return (0, _check.default)({
    rootDir,
    ignorer,
    skipMissing,
    deps,
    devDeps,
    peerDeps,
    optionalDeps,
    parsers,
    detectors
  }).then(results => _extends(results, {
    missing: _lodash.default.pick(results.missing, filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, results.missing))
  })).then(callback);
}

depcheck.parser = _constants.availableParsers;
depcheck.detector = _constants.availableDetectors;
depcheck.special = _constants.availableSpecials;
module.exports = exports.default;