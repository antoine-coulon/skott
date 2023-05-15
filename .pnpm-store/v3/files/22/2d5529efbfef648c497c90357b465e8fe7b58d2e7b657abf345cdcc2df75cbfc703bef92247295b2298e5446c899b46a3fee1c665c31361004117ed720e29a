"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeTail = exports.unsafeLast = exports.unsafeHead = exports.toReadonlyArray = exports.toChunk = exports.take = exports.tail = exports.splitAt = exports.some = exports.reverse = exports.reduceRight = exports.reduce = exports.prependAllReversed = exports.prependAll = exports.prepend = exports.partitionMap = exports.partition = exports.of = exports.nil = exports.map = exports.make = exports.length = exports.last = exports.isNil = exports.isList = exports.isCons = exports.head = exports.fromIterable = exports.forEach = exports.flatMap = exports.findFirst = exports.filterMap = exports.filter = exports.every = exports.equalsWith = exports.empty = exports.drop = exports.cons = exports.concat = exports.compact = exports.ListTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Dual = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Function"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */
var _a, _b;
/**
 * This file is ported from
 *
 * Scala (https://www.scala-lang.org)
 *
 * Copyright EPFL and Lightbend, Inc.
 *
 * Licensed under Apache License 2.0
 * (http://www.apache.org/licenses/LICENSE-2.0).
 */

const ListSymbolKey = "@effect/data/List";
/**
 * @since 1.0.0
 * @category symbol
 */
const ListTypeId = /*#__PURE__*/Symbol.for(ListSymbolKey);
exports.ListTypeId = ListTypeId;
const listVariance = {
  _A: _ => _
};
class ConsImpl {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
    this._tag = "Cons";
    this[_a] = listVariance;
  }
  toString() {
    return `List.Cons(${toReadonlyArray(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "List.Cons",
      values: toReadonlyArray(this)
    };
  }
  [(_a = ListTypeId, Symbol.for("nodejs.util.inspect.custom"))]() {
    return this.toJSON();
  }
  [Equal.symbol](that) {
    return isList(that) && this._tag === that._tag && equalsWith(this, that, Equal.equals);
  }
  [Hash.symbol]() {
    return Hash.string(ListSymbolKey);
  }
  [Symbol.iterator]() {
    let done = false;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;
    return {
      next() {
        if (done) {
          return this.return();
        }
        if (self._tag === "Nil") {
          done = true;
          return this.return();
        }
        const value = self.head;
        self = self.tail;
        return {
          done,
          value
        };
      },
      return(value) {
        if (!done) {
          done = true;
        }
        return {
          done: true,
          value
        };
      }
    };
  }
}
class NilImpl {
  constructor() {
    this._tag = "Nil";
    this[_b] = listVariance;
  }
  toString() {
    return `List.Nil`;
  }
  toJSON() {
    return {
      _tag: "List.Nil"
    };
  }
  [(_b = ListTypeId, Symbol.for("nodejs.util.inspect.custom"))]() {
    return this.toJSON();
  }
  [Hash.symbol]() {
    return Hash.array(Array.from(this));
  }
  [Equal.symbol](that) {
    return isList(that) && this._tag === that._tag;
  }
  [Symbol.iterator]() {
    return {
      next() {
        return {
          done: true,
          value: undefined
        };
      }
    };
  }
}
/**
 * Returns `true` if the specified value is a `List`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
const isList = u => typeof u === "object" && u != null && ListTypeId in u;
/**
 * Returns `true` if the specified value is a `List.Nil<A>`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isList = isList;
const isNil = self => self._tag === "Nil";
/**
 * Returns `true` if the specified value is a `List.Cons<A>`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.isNil = isNil;
const isCons = self => self._tag === "Cons";
/**
 * Returns the number of elements contained in the specified `List`
 *
 * @since 1.0.0
 * @category getters
 */
exports.isCons = isCons;
const length = self => {
  let these = self;
  let len = 0;
  while (!isNil(these)) {
    len += 1;
    these = these.tail;
  }
  return len;
};
/**
 * Returns `true` if the two lists are equal according to the provided function,
 * `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.length = length;
const equalsWith = /*#__PURE__*/Dual.dual(3, (self, that, f) => {
  if (self === that) {
    return true;
  }
  if (length(self) !== length(that)) {
    return false;
  }
  const selfIterator = self[Symbol.iterator]();
  const thatIterator = that[Symbol.iterator]();
  let nextSelf;
  let nextThat;
  while (!(nextSelf = selfIterator.next()).done && !(nextThat = thatIterator.next()).done) {
    if (!f(nextSelf.value, nextThat.value)) {
      return false;
    }
  }
  return true;
});
exports.equalsWith = equalsWith;
const _Nil = /*#__PURE__*/new NilImpl();
/**
 * Constructs a new `List.Nil<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
const nil = () => _Nil;
/**
 * Constructs a new `List.Cons<A>` from the specified `head` and `tail` values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.nil = nil;
const cons = (head, tail) => new ConsImpl(head, tail);
/**
 * Constructs a new empty `List<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.cons = cons;
const empty = () => _Nil;
/**
 * Constructs a new `List<A>` from the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const of = value => new ConsImpl(value, _Nil);
/**
 * Constructs a new `List<A>` from the specified `Iterable<A>`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.of = of;
const fromIterable = prefix => {
  const iterator = prefix[Symbol.iterator]();
  let next;
  if ((next = iterator.next()) && !next.done) {
    const result = new ConsImpl(next.value, _Nil);
    let curr = result;
    while ((next = iterator.next()) && !next.done) {
      const temp = new ConsImpl(next.value, _Nil);
      curr.tail = temp;
      curr = temp;
    }
    return result;
  } else {
    return _Nil;
  }
};
/**
 * Constructs a new `List<A>` from the specified values.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromIterable = fromIterable;
const make = (...elements) => fromIterable(elements);
/**
 * Removes all `None` values from the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.make = make;
const compact = self => filterMap(self, Dual.identity);
/**
 * Concatentates the specified lists together.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.compact = compact;
const concat = /*#__PURE__*/Dual.dual(2, (self, that) => prependAll(that, self));
/**
 * Drops the first `n` elements from the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.concat = concat;
const drop = /*#__PURE__*/Dual.dual(2, (self, n) => {
  if (n <= 0) {
    return self;
  }
  if (n >= length(self)) {
    return _Nil;
  }
  let these = self;
  let i = 0;
  while (!isNil(these) && i < n) {
    these = these.tail;
    i += 1;
  }
  return these;
});
/**
 * Returns `true` if all elements of the specified list satisfy the specified
 * predicate, `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.drop = drop;
const every = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  for (const a of self) {
    if (!predicate(a)) {
      return false;
    }
  }
  return true;
});
/**
 * Filters a list using the specified predicate.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.every = every;
const filter = /*#__PURE__*/Dual.dual(2, (self, predicate) => noneIn(self, predicate, false));
/**
 * Filters and maps a list using the specified partial function. The resulting
 * list may be smaller than the input list due to the possibility of the partial
 * function not being defined for some elements.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.filter = filter;
const filterMap = /*#__PURE__*/Dual.dual(2, (self, pf) => {
  const bs = [];
  for (const a of self) {
    const oa = pf(a);
    if (Option.isSome(oa)) {
      bs.push(oa.value);
    }
  }
  return fromIterable(bs);
});
/**
 * Returns the first element of the specified list that satisfies the specified
 * predicate, or `None` if no such element exists.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.filterMap = filterMap;
const findFirst = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  let these = self;
  while (!isNil(these)) {
    if (predicate(these.head)) {
      return Option.some(these.head);
    }
    these = these.tail;
  }
  return Option.none();
});
/**
 * Flat maps a list using the specified function.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.findFirst = findFirst;
const flatMap = /*#__PURE__*/Dual.dual(2, (self, f) => {
  let rest = self;
  let head = undefined;
  let tail = undefined;
  while (!isNil(rest)) {
    let bs = f(rest.head);
    while (!isNil(bs)) {
      const next = new ConsImpl(bs.head, _Nil);
      if (tail === undefined) {
        head = next;
      } else {
        tail.tail = next;
      }
      tail = next;
      bs = bs.tail;
    }
    rest = rest.tail;
  }
  if (head === undefined) {
    return _Nil;
  }
  return head;
});
/**
 * Applies the specified function to each element of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.flatMap = flatMap;
const forEach = /*#__PURE__*/Dual.dual(2, (self, f) => {
  let these = self;
  while (!isNil(these)) {
    f(these.head);
    these = these.tail;
  }
});
/**
 * Returns the first element of the specified list, or `None` if the list is
 * empty.
 *
 * @since 1.0.0
 * @category getters
 */
exports.forEach = forEach;
const head = self => isNil(self) ? Option.none() : Option.some(self.head);
/**
 * Returns the last element of the specified list, or `None` if the list is
 * empty.
 *
 * @since 1.0.0
 * @category getters
 */
exports.head = head;
const last = self => isNil(self) ? Option.none() : Option.some(unsafeLast(self));
/**
 * Applies the specified mapping function to each element of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.last = last;
const map = /*#__PURE__*/Dual.dual(2, (self, f) => {
  if (isNil(self)) {
    return self;
  } else {
    const head = new ConsImpl(f(self.head), _Nil);
    let nextHead = head;
    let rest = self.tail;
    while (!isNil(rest)) {
      const next = new ConsImpl(f(rest.head), _Nil);
      nextHead.tail = next;
      nextHead = next;
      rest = rest.tail;
    }
    return head;
  }
});
/**
 * Partition a list into two lists, where the first list contains all elements
 * that did not satisfy the specified predicate, and the second list contains
 * all elements that did satisfy the specified predicate.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.map = map;
const partition = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  const left = [];
  const right = [];
  for (const a of self) {
    if (predicate(a)) {
      right.push(a);
    } else {
      left.push(a);
    }
  }
  return [fromIterable(left), fromIterable(right)];
});
/**
 * Partition a list into two lists, where the first list contains all elements
 * for which the specified function returned a `Left`, and the second list
 * contains all elements for which the specified function returned a `Right`.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.partition = partition;
const partitionMap = /*#__PURE__*/Dual.dual(2, (self, f) => {
  const left = [];
  const right = [];
  for (const a of self) {
    const e = f(a);
    if (Either.isLeft(e)) {
      left.push(e.left);
    } else {
      right.push(e.right);
    }
  }
  return [fromIterable(left), fromIterable(right)];
});
/**
 * Prepends the specified element to the beginning of the list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.partitionMap = partitionMap;
const prepend = /*#__PURE__*/Dual.dual(2, (self, element) => cons(element, self));
/**
 * Prepends the specified prefix list to the beginning of the specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.prepend = prepend;
const prependAll = /*#__PURE__*/Dual.dual(2, (self, prefix) => {
  if (isNil(self)) {
    return prefix;
  } else if (isNil(prefix)) {
    return self;
  } else {
    const result = new ConsImpl(prefix.head, self);
    let curr = result;
    let that = prefix.tail;
    while (!isNil(that)) {
      const temp = new ConsImpl(that.head, self);
      curr.tail = temp;
      curr = temp;
      that = that.tail;
    }
    return result;
  }
});
/**
 * Prepends the specified prefix list (in reverse order) to the beginning of the
 * specified list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.prependAll = prependAll;
const prependAllReversed = /*#__PURE__*/Dual.dual(2, (self, prefix) => {
  let these = self;
  let pres = prefix;
  while (isCons(pres)) {
    these = new ConsImpl(pres.head, these);
    pres = pres.tail;
  }
  return these;
});
/**
 * Folds over the elements of the list using the specified function, using the
 * specified initial value.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.prependAllReversed = prependAllReversed;
const reduce = /*#__PURE__*/Dual.dual(3, (self, zero, f) => {
  let acc = zero;
  let these = self;
  while (!isNil(these)) {
    acc = f(acc, these.head);
    these = these.tail;
  }
  return acc;
});
/**
 * Folds over the elements of the list using the specified function, beginning
 * with the last element of the list, using the specified initial value.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.reduce = reduce;
const reduceRight = /*#__PURE__*/Dual.dual(3, (self, zero, f) => {
  let acc = zero;
  let these = reverse(self);
  while (!isNil(these)) {
    acc = f(acc, these.head);
    these = these.tail;
  }
  return acc;
});
/**
 * Returns a new list with the elements of the specified list in reverse order.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.reduceRight = reduceRight;
const reverse = self => {
  let result = empty();
  let these = self;
  while (!isNil(these)) {
    result = prepend(result, these.head);
    these = these.tail;
  }
  return result;
};
/**
 * Returns `true` if any element of the specified list satisfies the specified
 * predicate, `false` otherwise.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.reverse = reverse;
const some = /*#__PURE__*/Dual.dual(2, (self, predicate) => {
  let these = self;
  while (!isNil(these)) {
    if (predicate(these.head)) {
      return true;
    }
    these = these.tail;
  }
  return false;
});
/**
 * Splits the specified list into two lists at the specified index.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.some = some;
const splitAt = /*#__PURE__*/Dual.dual(2, (self, n) => [take(self, n), drop(self, n)]);
/**
 * Returns the tail of the specified list, or `None` if the list is empty.
 *
 * @since 1.0.0
 * @category getters
 */
exports.splitAt = splitAt;
const tail = self => isNil(self) ? Option.none() : Option.some(self.tail);
/**
 * Takes the specified number of elements from the beginning of the specified
 * list.
 *
 * @since 1.0.0
 * @category combinators
 */
exports.tail = tail;
const take = /*#__PURE__*/Dual.dual(2, (self, n) => {
  if (n <= 0) {
    return _Nil;
  }
  if (n >= length(self)) {
    return self;
  }
  let these = make(unsafeHead(self));
  let current = unsafeTail(self);
  for (let i = 1; i < n; i++) {
    these = new ConsImpl(unsafeHead(current), these);
    current = unsafeTail(current);
  }
  return reverse(these);
});
/**
 * Converts the specified list to a `Chunk`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.take = take;
const toChunk = self => Chunk.fromIterable(self);
/**
 * Converts the specified list to a `ReadonlyArray`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.toChunk = toChunk;
const toReadonlyArray = self => Array.from(self);
/**
 * Unsafely returns the first element of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.toReadonlyArray = toReadonlyArray;
const unsafeHead = self => {
  if (isNil(self)) {
    throw new Error("Error: Expected List to be non-empty");
  }
  return self.head;
};
/**
 * Unsafely returns the last element of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.unsafeHead = unsafeHead;
const unsafeLast = self => {
  if (isNil(self)) {
    throw new Error("Error: Expected List to be non-empty");
  }
  let these = self;
  let scout = self.tail;
  while (!isNil(scout)) {
    these = scout;
    scout = scout.tail;
  }
  return these.head;
};
/**
 * Unsafely returns the tail of the specified `List`.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.unsafeLast = unsafeLast;
const unsafeTail = self => {
  if (isNil(self)) {
    throw new Error("Error: Expected List to be non-empty");
  }
  return self.tail;
};
exports.unsafeTail = unsafeTail;
const noneIn = (self, predicate, isFlipped) => {
  /* eslint-disable no-constant-condition */
  while (true) {
    if (isNil(self)) {
      return _Nil;
    } else {
      if (predicate(self.head) !== isFlipped) {
        return allIn(self, self.tail, predicate, isFlipped);
      } else {
        self = self.tail;
      }
    }
  }
};
const allIn = (self, remaining, predicate, isFlipped) => {
  /* eslint-disable no-constant-condition */
  while (true) {
    if (isNil(remaining)) {
      return self;
    } else {
      if (predicate(remaining.head) !== isFlipped) {
        remaining = remaining.tail;
      } else {
        return partialFill(self, remaining, predicate, isFlipped);
      }
    }
  }
};
const partialFill = (self, firstMiss, predicate, isFlipped) => {
  const newHead = new ConsImpl(unsafeHead(self), _Nil);
  let toProcess = unsafeTail(self);
  let currentLast = newHead;
  while (!(toProcess === firstMiss)) {
    const newElem = new ConsImpl(unsafeHead(toProcess), _Nil);
    currentLast.tail = newElem;
    currentLast = (0, Dual.unsafeCoerce)(newElem);
    toProcess = (0, Dual.unsafeCoerce)(toProcess.tail);
  }
  let next = firstMiss.tail;
  let nextToCopy = (0, Dual.unsafeCoerce)(next);
  while (!isNil(next)) {
    const head = unsafeHead(next);
    if (predicate(head) !== isFlipped) {
      next = next.tail;
    } else {
      while (!(nextToCopy === next)) {
        const newElem = new ConsImpl(unsafeHead(nextToCopy), _Nil);
        currentLast.tail = newElem;
        currentLast = newElem;
        nextToCopy = (0, Dual.unsafeCoerce)(nextToCopy.tail);
      }
      nextToCopy = (0, Dual.unsafeCoerce)(next.tail);
      next = next.tail;
    }
  }
  if (!isNil(nextToCopy)) {
    currentLast.tail = nextToCopy;
  }
  return newHead;
};
//# sourceMappingURL=List.js.map