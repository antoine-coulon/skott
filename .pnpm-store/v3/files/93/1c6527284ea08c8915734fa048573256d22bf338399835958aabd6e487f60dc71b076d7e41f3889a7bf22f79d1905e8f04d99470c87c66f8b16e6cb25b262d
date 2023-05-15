"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.availableSpecials = exports.availableDetectors = exports.availableParsers = void 0;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _component = _interopRequireDefault(require("./component.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function constructComponent(source, name) {
  return (0, _lodash.default)(source[name]).map(file => [file, require(_path.default.resolve(__dirname, name, file)) // eslint-disable-line global-require
  ]).fromPairs().value();
}

const availableParsers = constructComponent(_component.default, 'parser');
exports.availableParsers = availableParsers;
const availableDetectors = constructComponent(_component.default, 'detector');
exports.availableDetectors = availableDetectors;
const availableSpecials = constructComponent(_component.default, 'special');
exports.availableSpecials = availableSpecials;
const defaultOptions = {
  ignoreBinPackage: false,
  ignoreMatches: [],
  ignorePatterns: ['.git', '.svn', '.hg', '.idea', 'node_modules', 'bower_components', // Images
  '*.png', '*.gif', '*.jpg', '*.jpeg', '*.svg', // Fonts
  '*.woff', '*.woff2', '*.eot', '*.ttf', // Archives
  '*.zip', '*.gz', // Videos
  '*.mp4'],
  skipMissing: false,
  parsers: {
    '**/*.js': availableParsers.jsx,
    '**/*.jsx': availableParsers.jsx,
    '**/*.coffee': availableParsers.coffee,
    '**/*.litcoffee': availableParsers.coffee,
    '**/*.coffee.md': availableParsers.coffee,
    '**/*.ts': availableParsers.typescript,
    '**/*.tsx': availableParsers.typescript,
    '**/*.sass': availableParsers.sass,
    '**/*.scss': availableParsers.sass,
    '**/*.vue': availableParsers.vue,
    '**/*.svelte': availableParsers.svelte
  },
  detectors: [availableDetectors.importDeclaration, availableDetectors.exportDeclaration, availableDetectors.requireCallExpression, availableDetectors.requireResolveCallExpression, availableDetectors.typescriptImportEqualsDeclaration, availableDetectors.importCallExpression, availableDetectors.gruntLoadTaskCallExpression],
  specials: _lodash.default.values(availableSpecials)
};
exports.defaultOptions = defaultOptions;