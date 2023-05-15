"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = exports.isEnabled = exports.isEmpty = exports.isDisabled = exports.isActive = exports.invert = exports.inverse = exports.exclude = exports.enabled = exports.enable = exports.empty = exports.either = exports.disable = exports.both = exports.andThen = exports.active = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
/** @internal */
const BIT_MASK = 0xff;
/** @internal */
const BIT_SHIFT = 0x08;
/** @internal */
const active = patch => patch & BIT_MASK;
/** @internal */
exports.active = active;
const enabled = patch => patch >> BIT_SHIFT & BIT_MASK;
/** @internal */
exports.enabled = enabled;
const make = (active, enabled) => (active & BIT_MASK) + ((enabled & active & BIT_MASK) << BIT_SHIFT);
/** @internal */
exports.make = make;
const empty = /*#__PURE__*/make(0, 0);
/** @internal */
exports.empty = empty;
const enable = flag => make(flag, flag);
/** @internal */
exports.enable = enable;
const disable = flag => make(flag, 0);
/** @internal */
exports.disable = disable;
const isEmpty = patch => patch === 0;
/** @internal */
exports.isEmpty = isEmpty;
const isActive = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => (active(self) & flag) !== 0);
/** @internal */
exports.isActive = isActive;
const isEnabled = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => (enabled(self) & flag) !== 0);
/** @internal */
exports.isEnabled = isEnabled;
const isDisabled = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => (active(self) & flag) !== 0 && (enabled(self) & flag) === 0);
/** @internal */
exports.isDisabled = isDisabled;
const exclude = /*#__PURE__*/(0, _Function.dual)(2, (self, flag) => make(active(self) & ~flag, enabled(self)));
/** @internal */
exports.exclude = exclude;
const both = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => make(active(self) | active(that), enabled(self) & enabled(that)));
/** @internal */
exports.both = both;
const either = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => make(active(self) | active(that), enabled(self) | enabled(that)));
/** @internal */
exports.either = either;
const andThen = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => self | that);
/** @internal */
exports.andThen = andThen;
const inverse = patch => make(enabled(patch), invert(active(patch)));
/** @internal */
exports.inverse = inverse;
const invert = n => ~n >>> 0 & BIT_MASK;
exports.invert = invert;
//# sourceMappingURL=runtimeFlagsPatch.js.map