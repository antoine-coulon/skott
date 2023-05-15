"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleShot = exports.makeGenKind = exports.adapter = exports.SingleShotGen = exports.GenKindTypeId = exports.GenKindImpl = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var _a;
/**
 * @since 1.0.0
 */

/**
 * @category symbols
 * @since 1.0.0
 */
const GenKindTypeId = /*#__PURE__*/Symbol.for("@effect/data/Gen/GenKind");
/**
 * @category constructors
 * @since 1.0.0
 */
exports.GenKindTypeId = GenKindTypeId;
class GenKindImpl {
  constructor(
  /**
   * @since 1.0.0
   */
  value) {
    this.value = value;
    /**
     * @since 1.0.0
     */
    this[_a] = GenKindTypeId;
  }
  /**
   * @since 1.0.0
   */
  get _F() {
    return _Function.identity;
  }
  /**
   * @since 1.0.0
   */
  get _R() {
    return _ => _;
  }
  /**
   * @since 1.0.0
   */
  get _O() {
    return _ => _;
  }
  /**
   * @since 1.0.0
   */
  get _E() {
    return _ => _;
  }
  /**
   * @since 1.0.0
   */
  [(_a = GenKindTypeId, Symbol.iterator)]() {
    return new SingleShotGen(this);
  }
}
/**
 * @category constructors
 * @since 1.0.0
 */
exports.GenKindImpl = GenKindImpl;
class SingleShotGen {
  constructor(self) {
    this.self = self;
    this.called = false;
  }
  /**
   * @since 1.0.0
   */
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  /**
   * @since 1.0.0
   */
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  /**
   * @since 1.0.0
   */
  throw(e) {
    throw e;
  }
  /**
   * @since 1.0.0
   */
  [Symbol.iterator]() {
    return new SingleShotGen(this.self);
  }
}
/**
 * @category constructors
 * @since 1.0.0
 */
exports.SingleShotGen = SingleShotGen;
const makeGenKind = kind => new GenKindImpl(kind);
/**
 * @category adapters
 * @since 1.0.0
 */
exports.makeGenKind = makeGenKind;
const adapter = () => kind => new GenKindImpl(kind);
exports.adapter = adapter;
function runGen(F, state, iterator) {
  if (state.done) {
    return F.of(state.value);
  }
  return F.flatMap(val => {
    const next = iterator.next(val);
    return runGen(F, next, iterator);
  })(state.value.value);
}
/**
 * @category constructors
 * @since 1.0.0
 */
const singleShot = F => adapter => body => F.flatMap(() => {
  const iterator = body(adapter);
  const state = iterator.next();
  // @ts-expect-error
  return runGen(F, state, iterator);
})(F.of(void 0));
exports.singleShot = singleShot;
//# sourceMappingURL=Gen.js.map