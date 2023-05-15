"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContent = getContent;
exports.setContent = setContent;

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: this can later be refactored once support for node 10 is dropped
const readFileAsync = _util.default.promisify(_fs.default.readFile);

const promises = {}; // eslint-disable-next-line import/prefer-default-export

function getContent(filename) {
  if (!promises[filename]) {
    promises[filename] = readFileAsync(filename, 'utf8');
  }

  return promises[filename];
}

function setContent(filename, content) {
  promises[filename] = Promise.resolve(content);
}