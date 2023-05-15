"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSASS;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _requirePackageName = _interopRequireDefault(require("require-package-name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  parse
} = require('scss-parser');

const createQueryWrapper = require('query-ast');

const sass = require('sass');

const IMPORT_RULE_TYPE = 'atrule';
const IMPORT_KEYWORDS = ['import', 'use', 'forward'];

function unixSlashes(packagePath) {
  return packagePath.replace(/\\/g, '/');
} // TODO::remove stuff after ':'


function removeNodeModulesOrTildaFromPath(packagePath) {
  let suspectedFileName = packagePath; // remove ':'

  const colonsIndex = packagePath.indexOf(':');

  if (colonsIndex > 1) {
    suspectedFileName = suspectedFileName.substring(0, colonsIndex);
  } // remove 'node_modules/'


  const nodeModulesIndex = suspectedFileName.indexOf('node_modules/');

  if (nodeModulesIndex > -1) {
    return suspectedFileName.substring(nodeModulesIndex + 'node_modules/'.length);
  } // remove '~'


  if (suspectedFileName.indexOf(`~`) === 0) {
    return suspectedFileName.substring(1);
  }

  return suspectedFileName;
}

function isLocalFile(filePath, folderName) {
  if (filePath[0] === '_') {
    return true;
  }

  if (filePath[0] === '@') {
    return false;
  }

  return _fs.default.existsSync(_path.default.join(folderName, `${filePath}.scss`));
}

function parseSCSS(filename) {
  const folderName = _path.default.dirname(filename);

  const fileContents = _fs.default.readFileSync(filename).toString();

  const ast = parse(fileContents);
  const queryWrapper = createQueryWrapper(ast);
  const imports = queryWrapper(IMPORT_RULE_TYPE).nodes.filter(node => IMPORT_KEYWORDS.includes(node.children[0].node.value)).map(node => node.children[2].node.value);
  const result = (0, _lodash.default)(imports).filter(packagePath => packagePath !== filename).map(unixSlashes).map(removeNodeModulesOrTildaFromPath).map(_requirePackageName.default).uniq().filter(filePath => !isLocalFile(filePath, folderName)).filter(x => x).value();
  return result;
}

async function parseSASS(filename) {
  const isScss = _path.default.extname(filename) === '.scss';

  if (isScss) {
    return parseSCSS(filename);
  }

  const includedFiles = [];
  let sassDetails = {};

  try {
    // sass processor does not respect the custom importer
    sassDetails = sass.renderSync({
      file: filename,
      includePaths: [_path.default.dirname(filename)],
      importer: [function importer(url) {
        includedFiles.push(url);
        return {
          contents: `
              h1 {
                font-size: 40px;
              }`
        };
      }]
    });
  } catch (e) {
    sassDetails.stats = {
      includedFiles
    };
  }

  const result = (0, _lodash.default)(sassDetails.stats.includedFiles).filter(packagePath => packagePath !== filename).map(unixSlashes).map(removeNodeModulesOrTildaFromPath).map(_requirePackageName.default).uniq().filter(x => x).value();
  return result;
}

module.exports = exports.default;