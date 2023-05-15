function isFinalObj(obj) {
  return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function collectOwnProperties(obj, collector) {
  const collect = typeof collector === "function" ? collector : (key) => collector.add(key);
  Object.getOwnPropertyNames(obj).forEach(collect);
  Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getAllMockableProperties(obj, isModule) {
  const allProps = /* @__PURE__ */ new Map();
  let curr = obj;
  do {
    if (isFinalObj(curr))
      break;
    collectOwnProperties(curr, (key) => {
      const descriptor = Object.getOwnPropertyDescriptor(curr, key);
      if (descriptor)
        allProps.set(key, { key, descriptor });
    });
  } while (curr = Object.getPrototypeOf(curr));
  if (isModule && !allProps.has("default") && "default" in obj) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, "default");
    if (descriptor)
      allProps.set("default", { key: "default", descriptor });
  }
  return Array.from(allProps.values());
}
function notNullish(v) {
  return v != null;
}
function slash(str) {
  return str.replace(/\\/g, "/");
}
const noop = () => {
};
function getType(value) {
  return Object.prototype.toString.apply(value).slice(8, -1);
}
function toArray(array) {
  if (array === null || array === void 0)
    array = [];
  if (Array.isArray(array))
    return array;
  return [array];
}
const toString = (v) => Object.prototype.toString.call(v);
const isPlainObject = (val) => toString(val) === "[object Object]" && (!val.constructor || val.constructor.name === "Object");
function isObject(item) {
  return item != null && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, ...sources) {
  if (!sources.length)
    return target;
  const source = sources.shift();
  if (source === void 0)
    return target;
  if (isMergeableObject(target) && isMergeableObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isMergeableObject(source[key])) {
        if (!target[key])
          target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
  }
  return deepMerge(target, ...sources);
}
function isMergeableObject(item) {
  return isPlainObject(item) && !Array.isArray(item);
}
function stdout() {
  return console._stdout || process.stdout;
}

export { noop as a, stdout as b, getAllMockableProperties as c, deepMerge as d, getType as g, isObject as i, notNullish as n, slash as s, toArray as t };
