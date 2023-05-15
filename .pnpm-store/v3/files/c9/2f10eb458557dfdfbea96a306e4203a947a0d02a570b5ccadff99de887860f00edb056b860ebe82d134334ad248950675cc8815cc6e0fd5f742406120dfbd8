"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = exports.start = exports.max = exports.make = exports.lessThan = exports.isNonEmpty = exports.intersect = exports.fromIterable = exports.end = exports.empty = exports.IntervalsTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Interval = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Schedule/Interval"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const IntervalsSymbolKey = "@effect/io/Schedule/Intervals";
/** @internal */
const IntervalsTypeId = /*#__PURE__*/Symbol.for(IntervalsSymbolKey);
/** @internal */
exports.IntervalsTypeId = IntervalsTypeId;
const make = intervals => {
  return {
    [IntervalsTypeId]: IntervalsTypeId,
    intervals
  };
};
/** @internal */
exports.make = make;
const empty = /*#__PURE__*/make( /*#__PURE__*/Chunk.empty());
/** @internal */
exports.empty = empty;
const fromIterable = intervals => Array.from(intervals).reduce((intervals, interval) => union(make(Chunk.of(interval)))(intervals), empty);
/** @internal */
exports.fromIterable = fromIterable;
const union = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
  if (!Chunk.isNonEmpty(that.intervals)) {
    return self;
  }
  if (!Chunk.isNonEmpty(self.intervals)) {
    return that;
  }
  if (Chunk.headNonEmpty(self.intervals).startMillis < Chunk.headNonEmpty(that.intervals).startMillis) {
    return unionLoop(Chunk.tailNonEmpty(self.intervals), that.intervals, Chunk.headNonEmpty(self.intervals), Chunk.empty());
  }
  return unionLoop(self.intervals, Chunk.tailNonEmpty(that.intervals), Chunk.headNonEmpty(that.intervals), Chunk.empty());
});
/** @internal */
exports.union = union;
const unionLoop = (_self, _that, _interval, _acc) => {
  let self = _self;
  let that = _that;
  let interval = _interval;
  let acc = _acc;
  while (Chunk.isNonEmpty(self) || Chunk.isNonEmpty(that)) {
    if (!Chunk.isNonEmpty(self) && Chunk.isNonEmpty(that)) {
      if (interval.endMillis < Chunk.headNonEmpty(that).startMillis) {
        acc = Chunk.prepend(interval)(acc);
        interval = Chunk.headNonEmpty(that);
        that = Chunk.tailNonEmpty(that);
        self = Chunk.empty();
      } else {
        interval = Interval.make(interval.startMillis, Chunk.headNonEmpty(that).endMillis);
        that = Chunk.tailNonEmpty(that);
        self = Chunk.empty();
      }
    } else if (Chunk.isNonEmpty(self) && Chunk.isEmpty(that)) {
      if (interval.endMillis < Chunk.headNonEmpty(self).startMillis) {
        acc = Chunk.prepend(interval)(acc);
        interval = Chunk.headNonEmpty(self);
        that = Chunk.empty();
        self = Chunk.tailNonEmpty(self);
      } else {
        interval = Interval.make(interval.startMillis, Chunk.headNonEmpty(self).endMillis);
        that = Chunk.empty();
        self = Chunk.tailNonEmpty(self);
      }
    } else if (Chunk.isNonEmpty(self) && Chunk.isNonEmpty(that)) {
      if (Chunk.headNonEmpty(self).startMillis < Chunk.headNonEmpty(that).startMillis) {
        if (interval.endMillis < Chunk.headNonEmpty(self).startMillis) {
          acc = Chunk.prepend(interval)(acc);
          interval = Chunk.headNonEmpty(self);
          self = Chunk.tailNonEmpty(self);
        } else {
          interval = Interval.make(interval.startMillis, Chunk.headNonEmpty(self).endMillis);
          self = Chunk.tailNonEmpty(self);
        }
      } else if (interval.endMillis < Chunk.headNonEmpty(that).startMillis) {
        acc = Chunk.prepend(interval)(acc);
        interval = Chunk.headNonEmpty(that);
        that = Chunk.tailNonEmpty(that);
      } else {
        interval = Interval.make(interval.startMillis, Chunk.headNonEmpty(that).endMillis);
        that = Chunk.tailNonEmpty(that);
      }
    } else {
      throw new Error("BUG: Intervals.unionLoop - please report an issue at https://github.com/Effect-TS/io/issues");
    }
  }
  return make(Chunk.reverse(Chunk.prepend(interval)(acc)));
};
/** @internal */
const intersect = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => intersectLoop(self.intervals, that.intervals, Chunk.empty()));
/** @internal */
exports.intersect = intersect;
const intersectLoop = (_left, _right, _acc) => {
  let left = _left;
  let right = _right;
  let acc = _acc;
  while (Chunk.isNonEmpty(left) && Chunk.isNonEmpty(right)) {
    const interval = Interval.intersect(Chunk.headNonEmpty(right))(Chunk.headNonEmpty(left));
    const intervals = Interval.isEmpty(interval) ? acc : Chunk.prepend(interval)(acc);
    if (Interval.lessThan(Chunk.headNonEmpty(right))(Chunk.headNonEmpty(left))) {
      left = Chunk.tailNonEmpty(left);
    } else {
      right = Chunk.tailNonEmpty(right);
    }
    acc = intervals;
  }
  return make(Chunk.reverse(acc));
};
/** @internal */
const start = self => {
  return Option.getOrElse(() => Interval.empty)(Chunk.head(self.intervals)).startMillis;
};
/** @internal */
exports.start = start;
const end = self => {
  return Option.getOrElse(() => Interval.empty)(Chunk.head(self.intervals)).endMillis;
};
/** @internal */
exports.end = end;
const lessThan = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => start(self) < start(that));
/** @internal */
exports.lessThan = lessThan;
const isNonEmpty = self => {
  return Chunk.isNonEmpty(self.intervals);
};
/** @internal */
exports.isNonEmpty = isNonEmpty;
const max = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => lessThan(self, that) ? that : self);
exports.max = max;
//# sourceMappingURL=intervals.js.map