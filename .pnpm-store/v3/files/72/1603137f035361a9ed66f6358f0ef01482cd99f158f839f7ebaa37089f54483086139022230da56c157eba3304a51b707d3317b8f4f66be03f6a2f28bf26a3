"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseVue;

var _parser = require("@babel/parser");

var _compilerSfc = require("@vue/compiler-sfc");

var _file = require("../utils/file");

async function parseVue(filename) {
  const content = await (0, _file.getContent)(filename);
  const parsed = (0, _compilerSfc.parse)(content);

  if (!parsed.descriptor.script) {
    return [];
  }

  return (0, _parser.parse)(parsed.descriptor.script.content, {
    sourceType: 'module',
    // Enable all known compatible @babel/parser plugins at the time of writing.
    // Because we only parse them, not evaluate any code, it is safe to do so.
    // note that babel/parser 7+ does not support *, due to plugin incompatibilities
    // Because the guys using React always want the newest syntax.
    plugins: ['asyncGenerators', 'bigInt', 'classProperties', 'classPrivateProperties', 'classPrivateMethods', // ['decorators', { decoratorsBeforeExport: true }],
    'decorators-legacy', // Vue cannot support both decorators
    'doExpressions', 'dynamicImport', 'exportDefaultFrom', 'exportNamespaceFrom', 'functionBind', 'functionSent', 'importMeta', 'logicalAssignment', 'nullishCoalescingOperator', 'numericSeparator', 'objectRestSpread', 'optionalCatchBinding', 'optionalChaining', ['pipelineOperator', {
      proposal: 'minimal'
    }], 'throwExpressions', // and finally, jsx
    'jsx']
  });
}

module.exports = exports.default;