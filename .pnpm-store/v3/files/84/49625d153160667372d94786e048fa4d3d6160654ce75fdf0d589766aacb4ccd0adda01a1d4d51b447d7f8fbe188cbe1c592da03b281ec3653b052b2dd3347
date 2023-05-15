/**
 * @since 1.0.0
 */
import * as Equal from "@effect/data/Equal";
import * as Dual from "@effect/data/Function";
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
export const make = value => new MutableRefImpl(value);
/**
 * @since 1.0.0
 * @category general
 */
export const compareAndSet = /*#__PURE__*/Dual.dual(3, (self, oldValue, newValue) => {
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
export const decrement = self => update(self, n => n - 1);
/**
 * @since 1.0.0
 * @category numeric
 */
export const decrementAndGet = self => updateAndGet(self, n => n - 1);
/**
 * @since 1.0.0
 * @category general
 */
export const get = self => self.current;
/**
 * @since 1.0.0
 * @category numeric
 */
export const getAndDecrement = self => getAndUpdate(self, n => n - 1);
/**
 * @since 1.0.0
 * @category numeric
 */
export const getAndIncrement = self => getAndUpdate(self, n => n + 1);
/**
 * @since 1.0.0
 * @category general
 */
export const getAndSet = /*#__PURE__*/Dual.dual(2, (self, value) => {
  const ret = self.current;
  self.current = value;
  return ret;
});
/**
 * @since 1.0.0
 * @category general
 */
export const getAndUpdate = /*#__PURE__*/Dual.dual(2, (self, f) => getAndSet(self, f(get(self))));
/**
 * @since 1.0.0
 * @category numeric
 */
export const increment = self => update(self, n => n + 1);
/**
 * @since 1.0.0
 * @category numeric
 */
export const incrementAndGet = self => updateAndGet(self, n => n + 1);
/**
 * @since 1.0.0
 * @category general
 */
export const set = /*#__PURE__*/Dual.dual(2, (self, value) => {
  self.current = value;
  return self;
});
/**
 * @since 1.0.0
 * @category general
 */
export const setAndGet = /*#__PURE__*/Dual.dual(2, (self, value) => {
  self.current = value;
  return self.current;
});
/**
 * @since 1.0.0
 * @category general
 */
export const update = /*#__PURE__*/Dual.dual(2, (self, f) => set(self, f(get(self))));
/**
 * @since 1.0.0
 * @category general
 */
export const updateAndGet = /*#__PURE__*/Dual.dual(2, (self, f) => setAndGet(self, f(get(self))));
/**
 * @since 1.0.0
 * @category boolean
 */
export const toggle = self => update(self, _ => !_);
//# sourceMappingURL=MutableRef.mjs.map