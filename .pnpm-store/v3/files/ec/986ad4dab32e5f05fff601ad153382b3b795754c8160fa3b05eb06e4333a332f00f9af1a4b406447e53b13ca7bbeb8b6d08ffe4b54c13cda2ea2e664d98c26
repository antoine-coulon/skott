"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAndGet = exports.update = exports.toggle = exports.setAndGet = exports.set = exports.make = exports.incrementAndGet = exports.increment = exports.getAndUpdate = exports.getAndSet = exports.getAndIncrement = exports.getAndDecrement = exports.get = exports.decrementAndGet = exports.decrement = exports.compareAndSet = void 0;
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

const TypeId = /*#__PURE__*/Symbol.for("@effect/data/MutableRef");
class MutableRefImpl {
  constructor(current) {
    this.current = current;
    this._T = _ => _;
    this._id = TypeId;
  }
  toString() {
    return `MutableRef(${String(this.current)})`;
  }
  toJSON() {
    return {
      _tag: "MutableRef",
      current: this.current
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
const make = value => new MutableRefImpl(value);
/**
 * @since 1.0.0
 * @category general
 */
exports.make = make;
const compareAndSet = /*#__PURE__*/Dual.dual(3, (self, oldValue, newValue) => {
  if (Equal.equals(oldValue, self.current)) {
    self.current = newValue;
    return true;
  }
  return false;
});
/**
 * @since 1.0.0
 * @category numeric
 */
exports.compareAndSet = compareAndSet;
const decrement = self => update(self, n => n - 1);
/**
 * @since 1.0.0
 * @category numeric
 */
exports.decrement = decrement;
const decrementAndGet = self => updateAndGet(self, n => n - 1);
/**
 * @since 1.0.0
 * @category general
 */
exports.decrementAndGet = decrementAndGet;
const get = self => self.current;
/**
 * @since 1.0.0
 * @category numeric
 */
exports.get = get;
const getAndDecrement = self => getAndUpdate(self, n => n - 1);
/**
 * @since 1.0.0
 * @category numeric
 */
exports.getAndDecrement = getAndDecrement;
const getAndIncrement = self => getAndUpdate(self, n => n + 1);
/**
 * @since 1.0.0
 * @category general
 */
exports.getAndIncrement = getAndIncrement;
const getAndSet = /*#__PURE__*/Dual.dual(2, (self, value) => {
  const ret = self.current;
  self.current = value;
  return ret;
});
/**
 * @since 1.0.0
 * @category general
 */
exports.getAndSet = getAndSet;
const getAndUpdate = /*#__PURE__*/Dual.dual(2, (self, f) => getAndSet(self, f(get(self))));
/**
 * @since 1.0.0
 * @category numeric
 */
exports.getAndUpdate = getAndUpdate;
const increment = self => update(self, n => n + 1);
/**
 * @since 1.0.0
 * @category numeric
 */
exports.increment = increment;
const incrementAndGet = self => updateAndGet(self, n => n + 1);
/**
 * @since 1.0.0
 * @category general
 */
exports.incrementAndGet = incrementAndGet;
const set = /*#__PURE__*/Dual.dual(2, (self, value) => {
  self.current = value;
  return self;
});
/**
 * @since 1.0.0
 * @category general
 */
exports.set = set;
const setAndGet = /*#__PURE__*/Dual.dual(2, (self, value) => {
  self.current = value;
  return self.current;
});
/**
 * @since 1.0.0
 * @category general
 */
exports.setAndGet = setAndGet;
const update = /*#__PURE__*/Dual.dual(2, (self, f) => set(self, f(get(self))));
/**
 * @since 1.0.0
 * @category general
 */
exports.update = update;
const updateAndGet = /*#__PURE__*/Dual.dual(2, (self, f) => setAndGet(self, f(get(self))));
/**
 * @since 1.0.0
 * @category boolean
 */
exports.updateAndGet = updateAndGet;
const toggle = self => update(self, _ => !_);
exports.toggle = toggle;
//# sourceMappingURL=MutableRef.js.map