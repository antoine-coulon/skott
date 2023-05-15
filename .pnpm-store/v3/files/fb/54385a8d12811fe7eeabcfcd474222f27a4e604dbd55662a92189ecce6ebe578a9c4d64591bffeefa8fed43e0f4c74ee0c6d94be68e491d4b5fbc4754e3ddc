function assertTypes(value, name, types) {
  const receivedType = typeof value;
  const pass = types.includes(receivedType);
  if (!pass)
    throw new TypeError(`${name} value must be ${types.join(" or ")}, received "${receivedType}"`);
}
function slash(path) {
  return path.replace(/\\/g, "/");
}
function toArray(array) {
  if (array === null || array === void 0)
    array = [];
  if (Array.isArray(array))
    return array;
  return [array];
}
function isObject(item) {
  return item != null && typeof item === "object" && !Array.isArray(item);
}
function isFinalObj(obj) {
  return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function getType(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}
function collectOwnProperties(obj, collector) {
  const collect = typeof collector === "function" ? collector : (key) => collector.add(key);
  Object.getOwnPropertyNames(obj).forEach(collect);
  Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getOwnProperties(obj) {
  const ownProps = /* @__PURE__ */ new Set();
  if (isFinalObj(obj))
    return [];
  collectOwnProperties(obj, ownProps);
  return Array.from(ownProps);
}
function deepClone(val) {
  const seen = /* @__PURE__ */ new WeakMap();
  return clone(val, seen);
}
function clone(val, seen) {
  let k, out;
  if (seen.has(val))
    return seen.get(val);
  if (Array.isArray(val)) {
    out = Array(k = val.length);
    seen.set(val, out);
    while (k--)
      out[k] = clone(val[k], seen);
    return out;
  }
  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = Object.create(Object.getPrototypeOf(val));
    seen.set(val, out);
    const props = getOwnProperties(val);
    for (const k2 of props)
      out[k2] = clone(val[k2], seen);
    return out;
  }
  return val;
}
function noop() {
}
function objectAttr(source, path, defaultValue = void 0) {
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let result = source;
  for (const p of paths) {
    result = Object(result)[p];
    if (result === void 0)
      return defaultValue;
  }
  return result;
}
function createDefer() {
  let resolve = null;
  let reject = null;
  const p = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  p.resolve = resolve;
  p.reject = reject;
  return p;
}

export { assertTypes, clone, createDefer, deepClone, getOwnProperties, getType, isObject, noop, objectAttr, slash, toArray };
