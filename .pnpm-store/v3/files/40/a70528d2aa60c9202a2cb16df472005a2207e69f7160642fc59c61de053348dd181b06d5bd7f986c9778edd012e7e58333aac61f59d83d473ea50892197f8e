"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ConfigurationParsingException extends Error {
  constructor(filePath, error) {
    super(`Error reading configuration file ${filePath}: ${error}`);
    this.filePath = filePath;
    Error.captureStackTrace(this, ConfigurationParsingException);
  }

}

exports.default = ConfigurationParsingException;
module.exports = exports.default;