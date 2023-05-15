export { assertTypes, clone, createDefer, deepClone, getOwnProperties, getType, isObject, noop, objectAttr, slash, toArray } from './helpers.js';
import { format as format$1, plugins } from 'pretty-format';
import util from 'util';
import loupeImport from 'loupe';

const {
  AsymmetricMatcher,
  DOMCollection,
  DOMElement,
  Immutable,
  ReactElement,
  ReactTestComponent
} = plugins;
const PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher
];
function stringify(object, maxDepth = 10, { maxLength, ...options } = {}) {
  const MAX_LENGTH = maxLength ?? 1e4;
  let result;
  try {
    result = format$1(object, {
      maxDepth,
      escapeString: false,
      plugins: PLUGINS,
      ...options
    });
  } catch {
    result = format$1(object, {
      callToJSON: false,
      maxDepth,
      escapeString: false,
      plugins: PLUGINS,
      ...options
    });
  }
  return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify(object, Math.floor(maxDepth / 2)) : result;
}

const SAFE_TIMERS_SYMBOL = Symbol("vitest:SAFE_TIMERS");
const SAFE_COLORS_SYMBOL = Symbol("vitest:SAFE_COLORS");

function getSafeTimers() {
  const {
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout
  } = globalThis[SAFE_TIMERS_SYMBOL] || globalThis;
  return {
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout
  };
}
function setSafeTimers() {
  const {
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout
  } = globalThis;
  const timers = {
    setTimeout: safeSetTimeout,
    setInterval: safeSetInterval,
    clearInterval: safeClearInterval,
    clearTimeout: safeClearTimeout
  };
  globalThis[SAFE_TIMERS_SYMBOL] = timers;
}

const RealDate = Date;
function random(seed) {
  const x = Math.sin(seed++) * 1e4;
  return x - Math.floor(x);
}
function shuffle(array, seed = RealDate.now()) {
  let length = array.length;
  while (length) {
    const index = Math.floor(random(seed) * length--);
    const previous = array[length];
    array[length] = array[index];
    array[index] = previous;
    ++seed;
  }
  return array;
}

const loupe = typeof loupeImport.default === "function" ? loupeImport.default : loupeImport;
function format(...args) {
  return util.format(...args);
}
function inspect(obj) {
  return loupe(obj, {
    depth: 2,
    truncate: 40
  });
}
function objDisplay(obj) {
  const truncateThreshold = 40;
  const str = inspect(obj);
  const type = Object.prototype.toString.call(obj);
  if (str.length >= truncateThreshold) {
    if (type === "[object Function]") {
      const fn = obj;
      return !fn.name || fn.name === "" ? "[Function]" : `[Function: ${fn.name}]`;
    } else if (type === "[object Array]") {
      return `[ Array(${obj.length}) ]`;
    } else if (type === "[object Object]") {
      const keys = Object.keys(obj);
      const kstr = keys.length > 2 ? `${keys.splice(0, 2).join(", ")}, ...` : keys.join(", ");
      return `{ Object (${kstr}) }`;
    } else {
      return str;
    }
  }
  return str;
}

const colors = [
  "reset",
  "bold",
  "dim",
  "italic",
  "underline",
  "inverse",
  "hidden",
  "strikethrough",
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
  "bgBlack",
  "bgRed",
  "bgGreen",
  "bgYellow",
  "bgBlue",
  "bgMagenta",
  "bgCyan",
  "bgWhite"
];
const formatter = (str) => String(str);
const defaultColors = colors.reduce((acc, key) => {
  acc[key] = formatter;
  return acc;
}, { isColorSupported: false });
function getColors() {
  return globalThis[SAFE_COLORS_SYMBOL] || defaultColors;
}
function setColors(colors2) {
  globalThis[SAFE_COLORS_SYMBOL] = colors2;
}

export { SAFE_COLORS_SYMBOL, SAFE_TIMERS_SYMBOL, format, getColors, getSafeTimers, inspect, objDisplay, setColors, setSafeTimers, shuffle, stringify };
