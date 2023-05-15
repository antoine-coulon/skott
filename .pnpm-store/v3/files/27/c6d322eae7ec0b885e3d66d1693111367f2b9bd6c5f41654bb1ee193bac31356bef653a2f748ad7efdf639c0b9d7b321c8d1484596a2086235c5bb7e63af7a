"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = exports.size = exports.min = exports.max = exports.make = exports.lessThan = exports.isNonEmpty = exports.isEmpty = exports.intersect = exports.empty = exports.before = exports.after = exports.IntervalTypeId = void 0;
var Duration = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Duration"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const IntervalSymbolKey = "@effect/io/Schedule/Interval";
/** @internal */
const IntervalTypeId = /*#__PURE__*/Symbol.for(IntervalSymbolKey);
/** @internal */
exports.IntervalTypeId = IntervalTypeId;
const empty = {
  [IntervalTypeId]: IntervalTypeId,
  startMillis: 0,
  endMillis: 0
};
/** @internal */
exports.empty = empty;
const make = (startMillis, endMillis) => {
  if (startMillis > endMillis) {
    return empty;
  }
  return {
    [IntervalTypeId]: IntervalTypeId,
    startMillis,
    endMillis
  };
};
/** @internal */
exports.make = make;
const lessThan = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => min(self, that) === self);
/** @internal */
exports.lessThan = lessThan;
const min = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
  if (self.endMillis <= that.startMillis) return self;
  if (that.endMillis <= self.startMillis) return that;
  if (self.startMillis < that.startMillis) return self;
  if (that.startMillis < self.startMillis) return that;
  if (self.endMillis <= that.endMillis) return self;
  return that;
});
/** @internal */
exports.min = min;
const max = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => min(self, that) === self ? that : self);
/** @internal */
exports.max = max;
const isEmpty = self => {
  return self.startMillis >= self.endMillis;
};
/** @internal */
exports.isEmpty = isEmpty;
const isNonEmpty = self => {
  return !isEmpty(self);
};
/** @internal */
exports.isNonEmpty = isNonEmpty;
const intersect = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
  const start = Math.max(self.startMillis, that.startMillis);
  const end = Math.min(self.endMillis, that.endMillis);
  return make(start, end);
});
/** @internal */
exports.intersect = intersect;
const size = self => {
  return Duration.millis(self.endMillis - self.startMillis);
};
/** @internal */
exports.size = size;
const union = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
  const start = Math.max(self.startMillis, that.startMillis);
  const end = Math.min(self.endMillis, that.endMillis);
  return start < end ? Option.none() : Option.some(make(start, end));
});
/** @internal */
exports.union = union;
const after = startMilliseconds => {
  return make(startMilliseconds, Number.POSITIVE_INFINITY);
};
/** @internal */
exports.after = after;
const before = endMilliseconds => {
  return make(Number.NEGATIVE_INFINITY, endMilliseconds);
};
exports.before = before;
//# sourceMappingURL=interval.js.map