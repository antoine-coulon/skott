"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symbol = exports.structure = exports.string = exports.random = exports.optimize = exports.number = exports.isHash = exports.hash = exports.combine = exports.array = void 0;
var _Global = /*#__PURE__*/require("@effect/data/Global");
var _Random = /*#__PURE__*/require("@effect/data/Random");
/**
 * @since 1.0.0
 */

/** @internal */
const randomHashCache = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/data/Hash/randomHashCache"), () => new WeakMap());
/** @internal */
const pcgr = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/data/Hash/pcgr"), () => new _Random.PCGRandom());
/**
 * @since 1.0.0
 * @category symbols
 */
const symbol = /*#__PURE__*/Symbol.for("@effect/data/Hash");
/**
 * @since 1.0.0
 * @category hashing
 */
exports.symbol = symbol;
const hash = self => {
  switch (typeof self) {
    case "number":
      {
        return number(self);
      }
    case "bigint":
      {
        return string(self.toString(10));
      }
    case "boolean":
      {
        return string(String(self));
      }
    case "symbol":
      {
        return string(String(self));
      }
    case "string":
      {
        return string(self);
      }
    case "undefined":
      {
        return string("undefined");
      }
    case "function":
    case "object":
      {
        if (self === null) {
          return string("null");
        }
        if (isHash(self)) {
          return self[symbol]();
        } else {
          return random(self);
        }
      }
    default:
      {
        throw new Error("Bug in Equal.hashGeneric");
      }
  }
};
/**
 * @since 1.0.0
 * @category hashing
 */
exports.hash = hash;
const random = self => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(self, number(pcgr.integer(Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self);
};
/**
 * @since 1.0.0
 * @category hashing
 */
exports.random = random;
const combine = b => self => self * 53 ^ b;
/**
 * @since 1.0.0
 * @category hashing
 */
exports.combine = combine;
const optimize = n => n & 0xbfffffff | n >>> 1 & 0x40000000;
/**
 * @since 1.0.0
 * @category guards
 */
exports.optimize = optimize;
const isHash = u => typeof u === "object" && u !== null && symbol in u;
/**
 * @since 1.0.0
 * @category hashing
 */
exports.isHash = isHash;
const number = n => {
  if (n !== n || n === Infinity) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 0xffffffff;
  }
  while (n > 0xffffffff) {
    h ^= n /= 0xffffffff;
  }
  return optimize(n);
};
/**
 * @since 1.0.0
 * @category hashing
 */
exports.number = number;
const string = str => {
  let h = 5381,
    i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
/**
 * @since 1.0.0
 * @category hashing
 */
exports.string = string;
const structure = o => {
  const keys = Object.keys(o);
  let h = 12289;
  for (let i = 0; i < keys.length; i++) {
    h ^= combine(hash(o[keys[i]]))(string(keys[i]));
  }
  return optimize(h);
};
/**
 * @since 1.0.0
 * @category hashing
 */
exports.structure = structure;
const array = arr => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = combine(hash(arr[i]))(h);
  }
  return optimize(h);
};
exports.array = array;
//# sourceMappingURL=Hash.js.map