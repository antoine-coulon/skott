"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tuple = exports.struct = void 0;
/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 */
const tuple = F => (...elements) => F.productAll(elements);
/**
 * @since 1.0.0
 */
exports.tuple = tuple;
const struct = F => fields => {
  const keys = Object.keys(fields);
  return F.imap(F.productAll(keys.map(k => fields[k])), values => {
    const out = {};
    for (let i = 0; i < values.length; i++) {
      out[keys[i]] = values[i];
    }
    return out;
  }, r => keys.map(k => r[k]));
};
exports.struct = struct;
//# sourceMappingURL=Product.js.map