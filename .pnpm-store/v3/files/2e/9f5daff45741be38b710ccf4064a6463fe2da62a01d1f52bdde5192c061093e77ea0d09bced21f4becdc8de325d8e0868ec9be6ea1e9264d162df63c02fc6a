"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseKarma;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _resolve = _interopRequireDefault(require("resolve"));

var _lodash = _interopRequireDefault(require("lodash"));

var _es = _interopRequireWildcard(require("../parser/es7"));

var _parser = _interopRequireDefault(require("../utils/parser"));

var _utils = require("../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const supportedConfNames = ['karma.conf.js', 'karma.conf.ts', '.config/karma.conf.js', '.config/karma.conf.ts'];

function parsePluginModuleExports(node) {
  // node.left must be assigning to module.export and node.right must be an object literal
  if (node && node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' && node.left.object && node.left.object.type === 'Identifier' && node.left.object.name === 'module' && node.left.property && node.left.property.type === 'Identifier' && node.left.property.name === 'exports' && node.right.type === 'ObjectExpression') {
    // only need to return the object keys
    return node.right.properties.map(p => p.key.value);
  }

  return [];
}

function parseConfigModuleExports(node) {
  const supportedConfigProperties = ['frameworks', 'browsers', 'preprocessors', 'reporters', 'plugins']; // node.left must be assigning to module.exports

  if (node && node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' && node.left.object && node.left.object.type === 'Identifier' && node.left.object.name === 'module' && node.left.property && node.left.property.type === 'Identifier' && node.left.property.name === 'exports') {
    // module.exports = function(config) {...};
    if (node.right.type === 'FunctionExpression' && node.right.params.length === 1 && node.right.body && node.right.body.type === 'BlockStatement' && node.right.body.body.length === 1 && node.right.body.body[0].type === 'ExpressionStatement') {
      const functionExprNode = node.right;
      const configParam = functionExprNode.params[0].name;
      const bodyExprNode = functionExprNode.body.body[0].expression; // config.set(...)

      if (bodyExprNode.type === 'CallExpression' && bodyExprNode.callee.type === 'MemberExpression' && bodyExprNode.callee.object.name === configParam && bodyExprNode.callee.property.name === 'set') {
        // assume the call to the function will pass an object literal too
        const arg = bodyExprNode.arguments[0];

        if (arg.type === 'ObjectExpression') {
          // collect literal keys and values for:
          // - frameworks {String[]}
          // - browsers {String[]}
          // - preprocessors {Object} - string (glob expressions) to {string|string[]}
          // - reporters {String[]}
          // - plugins {Object[]} - possible strings or inline plugin definitions
          const config = {};
          arg.properties.filter(prop => supportedConfigProperties.includes(prop.key.name)).forEach(prop => {
            if (prop.value.type === 'ArrayExpression') {
              const vals = [];
              prop.value.elements.filter(e => e.type === 'StringLiteral').forEach(e => vals.push(e.value));
              config[prop.key.name] = vals;
            } else if (prop.value.type === 'ObjectExpression') {
              const map = {};
              prop.value.properties.filter(p => p.value.type === 'StringLiteral').forEach(p => {
                map[p.key.name] = p.value.value;
              });
              config[prop.key.name] = map;
            }
          });
          return config;
        } // TODO handle other expression types

      } // TODO handle CallExpression

    }
  }

  return null;
}

async function parseConfig(filename) {
  const ast = await (0, _es.default)(filename);
  return (0, _lodash.default)((0, _parser.default)(ast)).map(node => parseConfigModuleExports(node)).flatten().filter(val => val != null).uniq().first();
}

function collectInstalledPluginInfo(karmaPluginsInstalled, rootDir) {
  const pluginInfo = {};
  karmaPluginsInstalled.forEach(plugin => {
    const packageMain = _resolve.default.sync(plugin, {
      basedir: rootDir
    });

    const packageContents = _fs.default.readFileSync(packageMain, {
      encoding: 'utf8'
    }); // don't evaluate the contents, since it probably has module requirements we can't load


    const ast = (0, _es.parseES7Content)(packageContents);
    const p = (0, _lodash.default)((0, _parser.default)(ast)).map(node => parsePluginModuleExports(node)).flatten().uniq().value();
    p.forEach(k => {
      pluginInfo[k] = plugin;
    });
  });
  return pluginInfo;
}

function collectInstalledPluginOfType(type, pluginInfo) {
  const pluginMapping = {};
  const prefix = `${type}:`;
  Object.keys(pluginInfo).filter(k => k.startsWith(prefix)).forEach(k => {
    const pluginName = k.replace(prefix, '');
    pluginMapping[pluginName] = pluginInfo[k];
  });
  return pluginMapping;
}

function collectFrameworks(config, pluginInfo) {
  // karma-x plugins define frameworks using the structure { 'framework:<name>': ['factory', f] }
  // generate a lookup map { '<name>': 'karma-x', ... }
  const frameworkMapping = collectInstalledPluginOfType('framework', pluginInfo);
  const installedFrameworks = Object.keys(frameworkMapping); // config defines a property frameworks: ['<name>',...]

  return (0, _utils.wrapToArray)(config.frameworks).filter(name => installedFrameworks.includes(name)).map(name => frameworkMapping[name]);
}

function collectBrowsers(config, pluginInfo) {
  // karma-x-launcher plugins define browsers using the structure
  // { 'launcher:<name>': ['type', f], ... }
  // generate a lookup map { '<name>': 'karma-x-launcher', ... }
  const launcherMapping = collectInstalledPluginOfType('launcher', pluginInfo);
  const installedBrowsers = Object.keys(launcherMapping); // config defines a property browsers: ['<name>',...]

  return [...new Set((0, _utils.wrapToArray)(config.browsers).filter(name => installedBrowsers.includes(name)).map(name => launcherMapping[name]))];
}

function collectReporters(config, pluginInfo) {
  // some reporters are added by frameworks, so don't filter on only '-reporter' plugins
  // generate a lookup map { '<name>': 'karma-x', ... }
  const reporterMapping = collectInstalledPluginOfType('reporter', pluginInfo);
  const installedReporters = Object.keys(reporterMapping); // config defines a property reporters: ['<name>', ...]

  return (0, _utils.wrapToArray)(config.reporters).filter(name => installedReporters.includes(name)).map(name => reporterMapping[name]);
}

function collectPreprocessors(config, pluginInfo) {
  // karma-x plugins define preprocessors using the structure
  // { 'preprocessor:<name>': ['type', f], ... }
  // generate a lookup map { '<name>': 'karma-x', ... }
  const preprocessorMapping = collectInstalledPluginOfType('preprocessor', pluginInfo);
  const installedPreprocessors = Object.keys(preprocessorMapping); // config defines a property preprocessors: {'<file-glob>': '<name>'}, ... }

  const preprocessors = (0, _utils.wrapToMap)(config.preprocessors);
  return [...new Set(Object.keys(preprocessors).map(k => preprocessors[k]).filter(name => installedPreprocessors.includes(name)).map(name => preprocessorMapping[name]))];
}

function collectExplicitPlugins(config) {
  // config defines a property frameworks: [x,...] where x is either
  // a string name, or an inline plugin
  // any inline plugin definitions don't matter here - their require/
  // import statements will be handled through other code
  return (0, _utils.wrapToArray)(config.plugins).filter(pluginDef => typeof pluginDef === 'string');
}

function collectUsages(config, karmaPluginsInstalled, rootDir) {
  const pluginInfo = collectInstalledPluginInfo(karmaPluginsInstalled, rootDir);
  return [].concat(collectFrameworks(config, pluginInfo)).concat(collectBrowsers(config, pluginInfo)) // TODO add support for Express middleware plugins
  // .concat(collectMiddleware(config, pluginInfo))
  .concat(collectPreprocessors(config, pluginInfo)).concat(collectReporters(config, pluginInfo));
}

async function parseKarma(filename, deps, rootDir) {
  const resolvedConfigPaths = supportedConfNames.map(name => _path.default.resolve(rootDir, name));

  if (!resolvedConfigPaths.includes(filename)) {
    return [];
  }

  const config = await parseConfig(filename); // possibly unused plugins

  const karmaPluginsInstalled = deps.filter(dep => dep.startsWith('karma-')).concat(collectExplicitPlugins(config));
  return collectUsages(config, karmaPluginsInstalled, rootDir);
}

module.exports = exports.default;