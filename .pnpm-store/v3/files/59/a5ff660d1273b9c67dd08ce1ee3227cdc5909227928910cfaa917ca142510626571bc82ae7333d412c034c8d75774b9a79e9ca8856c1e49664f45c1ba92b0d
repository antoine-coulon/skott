"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractInlineWebpack = extractInlineWebpack;

// Not fond of default exports, disable here */

/* eslint import/prefer-default-export: off */
function extractInlineWebpack(value) {
  const parts = value.split('!');

  if (parts.length === 1) {
    return [value]; // ['module-name'] or ['path/to/file']
  }

  if (parts[0] === '') {
    // ['', 'something-loader', 'path/to/file']
    // ignore first item
    const loaderParts = parts[1].split('?');

    if (loaderParts.length === 1) {
      return parts;
    }

    return loaderParts[0];
  } // ['something-loader', 'another-loader', 'path/to/file']


  return parts;
}