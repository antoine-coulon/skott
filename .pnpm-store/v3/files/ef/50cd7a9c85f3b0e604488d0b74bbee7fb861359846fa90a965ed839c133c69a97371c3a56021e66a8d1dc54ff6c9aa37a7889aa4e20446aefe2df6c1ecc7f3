"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseES6;

var _parser = require("@babel/parser");

var _file = require("../utils/file");

async function parseES6(filename) {
  const content = await (0, _file.getContent)(filename);
  return (0, _parser.parse)(content, {
    sourceType: 'module'
  });
}

module.exports = exports.default;