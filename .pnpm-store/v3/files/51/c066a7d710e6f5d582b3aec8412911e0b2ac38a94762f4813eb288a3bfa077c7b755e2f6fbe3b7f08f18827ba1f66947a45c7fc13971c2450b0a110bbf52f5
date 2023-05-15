"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseTypescript;

var _parser = require("@babel/parser");

var _file = require("../utils/file");

async function parseTypescript(filename) {
  const content = await (0, _file.getContent)(filename); // Enable all known compatible @babel/parser plugins at the time of writing.
  // Because we only parse them, not evaluate any code, it is safe to do so.
  // note that babel/parser 7+ does not support *, due to plugin incompatibilities

  return (0, _parser.parse)(content, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx', 'asyncGenerators', 'bigInt', 'classProperties', 'classPrivateProperties', 'classPrivateMethods', // { decorators: { decoratorsBeforeExport: true } },
    'decorators-legacy', 'doExpressions', 'dynamicImport', 'exportDefaultFrom', 'exportNamespaceFrom', 'functionBind', 'functionSent', 'importMeta', 'logicalAssignment', 'nullishCoalescingOperator', 'numericSeparator', 'objectRestSpread', 'optionalCatchBinding', 'optionalChaining', {
      pipelineOperator: {
        proposal: 'minimal'
      }
    }, 'throwExpressions']
  });
}

module.exports = exports.default;