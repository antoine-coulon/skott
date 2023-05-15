import * as Chunk from "@effect/data/Chunk";
import { dual } from "@effect/data/Function";
import * as Option from "@effect/data/Option";
import * as Interval from "@effect/io/Schedule/Interval";
/** @internal */
const IntervalsSymbolKey = "@effect/io/Schedule/Intervals";
/** @internal */
export const IntervalsTypeId = /*#__PURE__*/Symbol.for(IntervalsSymbolKey);
/** @internal */
export const make = intervals => {
  return {
    [IntervalsTypeId]: IntervalsTypeId,
    intervals
  };
};
/** @internal */
export const empty = /*#__PURE__*/make( /*#__PURE__*/Chunk.empty());
/** @internal */
export const fromIterable = intervals => Array.from(intervals).reduce((intervals, interval) => union(make(Chunk.of(interval)))(intervals), empty);
/** @internal */
export const union = /*#__PURE__*/dual(2, (self, that) => {
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
export const intersect = /*#__PURE__*/dual(2, (self, that) => intersectLoop(self.intervals, that.intervals, Chunk.empty()));
/** @internal */
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
export const start = self => {
  return Option.getOrElse(() => Interval.empty)(Chunk.head(self.intervals)).startMillis;
};
/** @internal */
export const end = self => {
  return Option.getOrElse(() => Interval.empty)(Chunk.head(self.intervals)).endMillis;
};
/** @internal */
export const lessThan = /*#__PURE__*/dual(2, (self, that) => start(self) < start(that));
/** @internal */
export const isNonEmpty = self => {
  return Chunk.isNonEmpty(self.intervals);
};
/** @internal */
export const max = /*#__PURE__*/dual(2, (self, that) => lessThan(self, that) ? that : self);
//# sourceMappingURL=intervals.mjs.map