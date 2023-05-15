/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 */
export const tuple = F => (...elements) => F.productAll(elements);
/**
 * @since 1.0.0
 */
export const struct = F => fields => {
  const keys = Object.keys(fields);
  return F.imap(F.productAll(keys.map(k => fields[k])), values => {
    const out = {};
    for (let i = 0; i < values.length; i++) {
      out[keys[i]] = values[i];
    }
    return out;
  }, r => keys.map(k => r[k]));
};
//# sourceMappingURL=Product.mjs.map