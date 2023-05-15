"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = exports.remove = exports.make = exports.has = exports.fromIterable = exports.empty = exports.add = void 0;
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var MutableHashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableHashMap"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = /*#__PURE__*/Symbol.for("@effect/data/MutableHashSet");
/** @internal */
class MutableHashSetImpl {
  constructor(keyMap) {
    this.keyMap = keyMap;
    this._id = TypeId;
    this._V = _ => _;
  }
  [Symbol.iterator]() {
    return Array.from(this.keyMap).map(([_]) => _)[Symbol.iterator]();
  }
  toString() {
    return `MutableHashSet(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableHashSet",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
}
/**
 * @since 1.0.0
 * @category constructors
 */
const empty = () => new MutableHashSetImpl(MutableHashMap.empty());
/**
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const fromIterable = keys => new MutableHashSetImpl(MutableHashMap.fromIterable(Array.from(keys).map(k => [k, true])));
/**
 * @since 1.0.0
 * @category constructors
 */
exports.fromIterable = fromIterable;
const make = (...keys) => fromIterable(keys);
/**
 * @since 1.0.0
 * @category elements
 */
exports.make = make;
const add = /*#__PURE__*/Dual.dual(2, (self, key) => (MutableHashMap.set(self.keyMap, key, true), self));
/**
 * @since 1.0.0
 * @category elements
 */
exports.add = add;
const has = /*#__PURE__*/Dual.dual(2, (self, key) => MutableHashMap.has(self.keyMap, key));
/**
 * @since 1.0.0
 * @category elements
 */
exports.has = has;
const remove = /*#__PURE__*/Dual.dual(2, (self, key) => (MutableHashMap.remove(self.keyMap, key), self));
/**
 * @since 1.0.0
 * @category elements
 */
exports.remove = remove;
const size = self => MutableHashMap.size(self.keyMap);
exports.size = size;
//# sourceMappingURL=MutableHashSet.js.map