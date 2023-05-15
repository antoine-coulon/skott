"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseGatsbyConfig;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _es = require("../parser/es7");

var _parser = _interopRequireDefault(require("../utils/parser"));

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findStringPlugins(pluginElementsArray) {
  return pluginElementsArray.filter(e => e.type === 'StringLiteral' || e.type === 'TemplateLiteral').map(e => {
    if (e.type === 'TemplateLiteral') return e.quasis[0].value.cooked;
    return e.value;
  });
}

function findResolvePlugins(pluginElementsArray) {
  return pluginElementsArray.filter(e => e.type === 'ObjectExpression').map(e => e.properties).reduce((acc, props) => acc.concat(props), []).filter(resolvePropCandidate => (resolvePropCandidate.key.name === 'resolve' || resolvePropCandidate.key.value === 'resolve') && resolvePropCandidate.value && (resolvePropCandidate.value.type === 'StringLiteral' || resolvePropCandidate.value.type === 'TemplateLiteral')).map(resolveProp => {
    if (resolveProp.value.type === 'TemplateLiteral') return resolveProp.value.quasis[0].value.cooked;
    return resolveProp.value.value;
  });
}

function findNestedPlugins(pluginElementsArray) {
  return pluginElementsArray.filter(e => e.type === 'ObjectExpression').map(e => e.properties).reduce((acc, props) => acc.concat(props), []).filter(optionsPropCandidate => optionsPropCandidate && optionsPropCandidate.key && (optionsPropCandidate.key.name === 'options' || optionsPropCandidate.key.value === 'options') && optionsPropCandidate.value && optionsPropCandidate.value.type === 'ObjectExpression') // eslint-disable-next-line no-use-before-define
  .map(optionsNode => findPluginsInObjectExpression(optionsNode.value)).reduce((deps, dep) => deps.concat(dep), []);
}

function findPluginsInObjectExpression(node) {
  const dependencies = [];
  node.properties.forEach(prop => {
    if (prop.value.type === 'ArrayExpression' && (prop.key.name === 'plugins' || prop.key.value === 'plugins')) {
      const vals = [];
      vals.push(...findResolvePlugins(prop.value.elements));
      vals.push(...findStringPlugins(prop.value.elements));
      vals.push(...findNestedPlugins(prop.value.elements));
      dependencies.push(...vals);
    }
  });
  return dependencies;
}
/**
 *
 *
 * @param {Object} node Root node of the gatsby.config.js file
 *
 */


function parseConfigModuleExports(node) {
  // node.left must be assigning to module.exports
  if (node && node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' && node.left.object && node.left.object.type === 'Identifier' && node.left.object.name === 'module' && node.left.property && node.left.property.type === 'Identifier' && node.left.property.name === 'exports') {
    const plugins = findPluginsInObjectExpression(node.right);
    return {
      plugins
    };
  }

  return null;
}

async function parseConfig(content) {
  const ast = (0, _es.parseES7Content)(content);
  return (0, _lodash.default)((0, _parser.default)(ast)).map(node => parseConfigModuleExports(node)).flatten().filter(val => val != null).uniq().first();
}

async function parseGatsbyConfig(filename) {
  const basename = _path.default.basename(filename);

  const GatbyConfig = 'gatsby-config.js';

  if (GatbyConfig === basename) {
    const content = await (0, _file.getContent)(filename);
    const config = await parseConfig(content);
    return config.plugins || [];
  }

  return [];
}

module.exports = exports.default;