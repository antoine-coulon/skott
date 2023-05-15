"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseGulpPlugins;

var _path = require("path");

var _lodash = _interopRequireDefault(require("lodash"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _es = require("../parser/es7");

var _importDeclaration = _interopRequireDefault(require("../detector/importDeclaration"));

var _requireCallExpression = _interopRequireDefault(require("../detector/requireCallExpression"));

var _file = require("../utils/file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPluginLookup(deps) {
  const patterns = ['gulp-*', 'gulp.*', '@*/gulp{-,.}*'];
  const lookup = (0, _lodash.default)(deps).filter(dep => patterns.some(pattern => (0, _minimatch.default)(dep, pattern))).map(dep => {
    const isScoped = dep[0] === '@';
    const scopedParts = dep.substring(1).split('/');
    const scope = isScoped ? scopedParts[0] : '';
    const plugin = isScoped ? scopedParts[1] : dep;

    const variableName = _lodash.default.camelCase(plugin.substring('gulp-'.length));

    const memberName = isScoped ? `.${scope}.${variableName}` : `.${variableName}`;
    return [memberName, dep];
  }).fromPairs().value();
  return lookup;
}
/**
 * Get the references to the variable in the path scope.
 * @example Within the path scope, returns references to `loadPlugins` variable.
 */


function getReferences(path, variableName) {
  const bindings = path.scope.getBinding(variableName);
  const references = bindings.referencePaths;
  return references;
}
/**
 * Get the variable name from the variable assigned declaration.
 * @example With code `$ = loadPlugins()` and `loadPlugins` as path, returns the string `$`.
 */


function getIdentifierVariableName(path) {
  if (path.isIdentifier() && path.parentPath.isCallExpression() && path.parentPath.parentPath.isVariableDeclarator()) {
    const variableName = path.parentPath.parentPath.node.id.name;
    return variableName;
  }

  return '';
}
/**
 * Get the identifier references from imported/required load-plugin variable name.
 * @example With code `a = plugins(), b = plugins()`, returns uasge references to `a` and `b`.
 */


function getIdentifierReferences(path, loadPluginsVariableName) {
  const requireReferences = getReferences(path, loadPluginsVariableName);
  const identifierReferences = (0, _lodash.default)(requireReferences).map(getIdentifierVariableName).filter().map(identifierVariableName => getReferences(path, identifierVariableName)).flatten().value();
  return identifierReferences;
}
/**
 * Get the package name from the identifier call path.
 * @example With code `$.jshint()` and `$` as path, returns `gulp-jshint` string.
 */


function getPackageName(content, pluginLookup, identifierPath) {
  let memberPath = identifierPath.parentPath;

  while (memberPath.isMemberExpression()) {
    const code = content.slice(identifierPath.node.end, memberPath.node.end);
    const pluginName = pluginLookup[code];

    if (pluginName) {
      return pluginName;
    }

    memberPath = memberPath.parentPath;
  }

  return '';
}
/**
 * Get the gulp packages found from the path. This is the entry for traverse.
 */


function check(content, deps, path) {
  if ( // Pattern: import plugins from 'gulp-load-plugins', $ = plugins(), $.jshint()
  (0, _importDeclaration.default)(path.node)[0] === 'gulp-load-plugins' && path.isImportDeclaration() && path.get('specifiers')[0] && path.get('specifiers')[0].isImportDefaultSpecifier() && path.get('specifiers')[0].get('local').isIdentifier()) {
    const importVariableName = path.get('specifiers')[0].get('local').node.name;
    const identifierReferences = getIdentifierReferences(path, importVariableName);
    const packageNames = identifierReferences.map(r => getPackageName(content, deps, r));
    return packageNames;
  }

  if ( // Pattern: plugins = require('gulp-load-plugins'), $ = plugins(), $.jshint()
  (0, _requireCallExpression.default)(path.node)[0] === 'gulp-load-plugins' && path.isCallExpression() && path.parentPath.isVariableDeclarator() && path.parentPath.get('id').isIdentifier()) {
    const requireVariableName = path.parentPath.get('id').node.name;
    const identifierReferences = getIdentifierReferences(path, requireVariableName);
    const packageNames = identifierReferences.map(r => getPackageName(content, deps, r));
    return packageNames;
  }

  if ( // Pattern: $ = require('gulp-load-plugins')(), $.jshint()
  (0, _requireCallExpression.default)(path.node)[0] === 'gulp-load-plugins' && path.isCallExpression() && path.parentPath.isCallExpression() && path.parentPath.parentPath.isVariableDeclarator() && path.parentPath.parentPath.get('id').isIdentifier()) {
    const requireVariableName = path.parentPath.parentPath.get('id').node.name;
    const identifierReferences = getReferences(path, requireVariableName);
    const packageNames = identifierReferences.map(r => getPackageName(content, deps, r));
    return packageNames;
  }

  if ( // Pattern: require('gulp-load-plugins')().thisPlugin()
  (0, _requireCallExpression.default)(path.node)[0] === 'gulp-load-plugins' && path.isCallExpression() && path.parentPath.isCallExpression() && path.parentPath.parentPath.isMemberExpression()) {
    const packageName = getPackageName(content, deps, path.parentPath);
    return [packageName];
  }

  return [];
}

async function parseGulpPlugins(filename, deps, rootDir) {
  const resolvedPath = (0, _path.resolve)(filename);

  if (resolvedPath !== (0, _path.resolve)(rootDir, 'gulpfile.js') && resolvedPath !== (0, _path.resolve)(rootDir, 'gulpfile.babel.js')) {
    return [];
  }

  const pluginLookup = getPluginLookup(deps);
  const content = await (0, _file.getContent)(filename);
  const ast = await (0, _es.parseES7Content)(content);
  const results = [];
  (0, _traverse.default)(ast, {
    enter(path) {
      results.push(...check(content, pluginLookup, path));
    }

  });
  return (0, _lodash.default)(results).filter().uniq().value();
}

module.exports = exports.default;