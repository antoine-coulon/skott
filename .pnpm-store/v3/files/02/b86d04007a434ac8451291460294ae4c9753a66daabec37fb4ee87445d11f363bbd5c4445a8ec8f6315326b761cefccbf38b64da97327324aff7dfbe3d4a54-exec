"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _index = _interopRequireDefault(require("./index"));

var _package = require("../package.json");

var _configurationReader = require("./utils/configuration-reader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkPathExist(dir, errorMessage) {
  return new Promise((resolve, reject) => _fs.default.exists(dir, result => result ? resolve() : reject(errorMessage)));
}

function getParsers(parsers) {
  if (!parsers) {
    return undefined;
  }

  const parserTuples = Object.entries(parsers).map(([extension, parserNames]) => {
    // parserNames might not be an array due to user error when creating a configuration file.
    // Example of a configuration file where this might happen:
    // {
    //   parsers: {
    //     "*.js" : "es6",
    //     "*.jsx": ["jsx"]
    //   }
    // }
    const sanitizedParserNames = Array.isArray(parserNames) ? parserNames : [parserNames];
    const parserLambdas = sanitizedParserNames.map(parserName => _index.default.parser[parserName]);
    return [extension, parserLambdas];
  });
  return _lodash.default.fromPairs(parserTuples);
}

function getDetectors(detectors) {
  return _lodash.default.isUndefined(detectors) ? undefined : detectors.map(detectorName => _index.default.detector[detectorName]);
}

function getSpecials(specials) {
  return _lodash.default.isUndefined(specials) ? undefined : specials.map(specialName => _index.default.special[specialName]);
}

function noIssue(result) {
  return _lodash.default.isEmpty(result.dependencies) && _lodash.default.isEmpty(result.devDependencies) && _lodash.default.isEmpty(result.missing);
}

function prettify(caption, deps, oneline) {
  if (oneline) {
    return deps.length ? [caption, deps.join(' ')] : [];
  }

  const list = deps.map(dep => `* ${dep}`);
  return list.length ? [caption].concat(list) : [];
}

function mapMissing(missing, rootDir, oneline) {
  if (oneline) {
    return _lodash.default.keys(missing);
  }

  return _lodash.default.map(missing, (foundInFiles, key) => `${key}: ${_lodash.default.replace(_lodash.default.first(foundInFiles), rootDir, '.')}`);
}

function print(result, log, opt, rootDir) {
  if (opt.json) {
    log(JSON.stringify(result, (key, value) => _lodash.default.isError(value) ? value.stack : value));
  } else if (noIssue(result)) {
    log('No depcheck issue');
  } else {
    const deps = prettify('Unused dependencies', result.dependencies, opt.oneline);
    const devDeps = prettify('Unused devDependencies', result.devDependencies, opt.oneline);
    const missing = prettify('Missing dependencies', mapMissing(result.missing, rootDir, opt.oneline), opt.oneline);
    const content = deps.concat(devDeps, missing).join('\n');
    log(content);
  }

  return result;
}

async function cli(args, log, error, exit) {
  try {
    const opt = await (0, _configurationReader.getConfiguration)(args, _package.name, _package.version);
    const dir = opt._[0] || '.';

    const rootDir = _path.default.resolve(dir);

    await checkPathExist(rootDir, `Path ${dir} does not exist`);
    await checkPathExist(_path.default.resolve(rootDir, 'package.json'), `Path ${dir} does not contain a package.json file`);
    const depcheckResult = await (0, _index.default)(rootDir, {
      ignoreBinPackage: opt.ignoreBinPackage,
      ignorePath: opt.ignorePath,
      ignoreMatches: opt.ignores || [],
      ignoreDirs: opt.ignoreDirs || [],
      ignorePatterns: opt.ignorePatterns || [],
      parsers: getParsers(opt.parsers),
      detectors: getDetectors(opt.detectors),
      specials: getSpecials(opt.specials),
      skipMissing: opt.skipMissing
    });
    print(depcheckResult, log, opt, rootDir);
    exit(noIssue(depcheckResult) ? 0 : -1);
  } catch (err) {
    error(err);
    exit(-1);
  }
}

module.exports = exports.default;