"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseES7Content = parseES7Content;
exports.default = parseES7;

var _parser = require("@babel/parser");

var _file = require("../utils/file");

function parseES7Content(content) {
  return (0, _parser.parse)(content, {
    sourceType: 'module',
    // Enable all known compatible @babel/parser plugins at the time of writing.
    // Because we only parse them, not evaluate any code, it is safe to do so.
    // note that babel/parser 7+ does not support *, due to plugin incompatibilities
    plugins: ['asyncGenerators', 'bigInt', 'classProperties', 'classPrivateProperties', 'classPrivateMethods', // ['decorators', { decoratorsBeforeExport: true }],
    'decorators-legacy', 'doExpressions', 'dynamicImport', 'exportDefaultFrom', 'exportNamespaceFrom', 'flow', 'flowComments', 'functionBind', 'functionSent', 'importMeta', 'logicalAssignment', 'nullishCoalescingOperator', 'numericSeparator', 'objectRestSpread', 'optionalCatchBinding', 'optionalChaining', ['pipelineOperator', {
      proposal: 'minimal'
    }], 'throwExpressions']
  });
}

async function parseES7(filename) {
  const content = await (0, _file.getContent)(filename);
  return parseES7Content(content);
}