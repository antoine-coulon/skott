"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimStart = exports.trimEnd = exports.trim = exports.toUpperCase = exports.toLowerCase = exports.takeRight = exports.takeLeft = exports.stripMarginWith = exports.stripMargin = exports.startsWithPosition = exports.startsWith = exports.split = exports.slice = exports.replace = exports.linesWithSeparators = exports.length = exports.isString = exports.isNonEmpty = exports.isEmpty = exports.includesWithPosition = exports.includes = exports.endsWithPosition = exports.endsWith = exports.empty = exports.concat = exports.Semigroup = exports.Order = exports.Monoid = exports.Equivalence = void 0;
var _Function = /*#__PURE__*/require("@effect/data/Function");
var readonlyArray = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/ReadonlyArray"));
var predicate = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Predicate"));
var equivalence = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Equivalence"));
var monoid = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Monoid"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var semigroup = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Semigroup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * This module provides utility functions and type class instances for working with the `string` type in TypeScript.
 * It includes functions for basic string manipulation, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */

/**
 * Tests if a value is a `string`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isString } from '@effect/data/String'
 *
 * assert.deepStrictEqual(isString("a"), true)
 * assert.deepStrictEqual(isString(1), false)
 *
 * @category guards
 * @since 1.0.0
 */
const isString = predicate.isString;
/**
 * @category instances
 * @since 1.0.0
 */
exports.isString = isString;
const Equivalence = equivalence.string;
/**
 * @category instances
 * @since 1.0.0
 */
exports.Equivalence = Equivalence;
const Order = order.string;
/**
 * `string` semigroup under concatenation.
 *
 * @category instances
 * @since 1.0.0
 */
exports.Order = Order;
const Semigroup = semigroup.string;
/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @category instances
 * @since 1.0.0
 */
exports.Semigroup = Semigroup;
const Monoid = monoid.string;
/**
 * The empty string `""`.
 *
 * @since 1.0.0
 */
exports.Monoid = Monoid;
const empty = "";
/**
 * @since 1.0.0
 */
exports.empty = empty;
const concat = /*#__PURE__*/(0, _Function.dual)(2, Semigroup.combine);
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @since 1.0.0
 */
exports.concat = concat;
const toUpperCase = self => self.toUpperCase();
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @since 1.0.0
 */
exports.toUpperCase = toUpperCase;
const toLowerCase = self => self.toLowerCase();
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @since 1.0.0
 */
exports.toLowerCase = toLowerCase;
const replace = /*#__PURE__*/(0, _Function.dual)(3, (self, searchValue, replaceValue) => self.replace(searchValue, replaceValue));
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trim(' a '), 'a')
 *
 * @since 1.0.0
 */
exports.replace = replace;
const trim = self => self.trim();
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trimStart(' a '), 'a ')
 *
 * @since 1.0.0
 */
exports.trim = trim;
const trimStart = self => self.trimStart();
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trimEnd(' a '), ' a')
 *
 * @since 1.0.0
 */
exports.trimStart = trimStart;
const trimEnd = self => self.trimEnd();
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @since 1.0.0
 */
exports.trimEnd = trimEnd;
const slice = /*#__PURE__*/(0, _Function.dual)(3, (self, start, end) => self.slice(start, end));
/**
 * Test whether a `string` is empty.
 *
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.isEmpty(''), true)
 * assert.deepStrictEqual(S.isEmpty('a'), false)
 *
 * @since 1.0.0
 */
exports.slice = slice;
const isEmpty = self => self.length === 0;
/**
 * Test whether a `string` is non empty.
 *
 * @since 1.0.0
 */
exports.isEmpty = isEmpty;
const isNonEmpty = self => self.length > 0;
/**
 * Calculate the number of characters in a `string`.
 *
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.length('abc'), 3)
 *
 * @since 1.0.0
 */
exports.isNonEmpty = isNonEmpty;
const length = self => self.length;
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
 * assert.deepStrictEqual(pipe('', S.split('')), [''])
 *
 * @since 1.0.0
 */
exports.length = length;
const split = /*#__PURE__*/(0, _Function.dual)(2, (self, separator) => {
  const out = self.split(separator);
  return readonlyArray.isNonEmptyArray(out) ? out : [self];
});
/**
 * Returns `true` if `searchString` appears as a substring of `self`, at one or more positions that are
 * greater than or equal to `0`; otherwise, returns `false`.
 *
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.includes("abc", "b"), true)
 * assert.deepStrictEqual(S.includes("abc", "d"), false)
 *
 * @since 1.0.0
 */
exports.split = split;
const includes = /*#__PURE__*/(0, _Function.dual)(2, (self, searchString) => self.includes(searchString));
/**
 * Returns `true` if `searchString` appears as a substring of `self`, at one or more positions that are
 * greater than or equal to `position`; otherwise, returns `false`.
 *
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.includesWithPosition("abc", "b", 1), true)
 * assert.deepStrictEqual(S.includesWithPosition("abc", "a", 1), false)
 *
 * @since 1.0.0
 */
exports.includes = includes;
const includesWithPosition = /*#__PURE__*/(0, _Function.dual)(3, (self, searchString, position) => self.includes(searchString, position));
/**
 * Returns `true` if the sequence of elements of `searchString` is the
 * same as the corresponding elements of `s` starting at
 * position. Otherwise returns false.
 *
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.startsWith("abc", "a"), true)
 * assert.deepStrictEqual(S.startsWith("bc", "a"), false)
 *
 * @since 1.0.0
 */
exports.includesWithPosition = includesWithPosition;
const startsWith = /*#__PURE__*/(0, _Function.dual)(2, (self, searchString) => self.startsWith(searchString));
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.startsWithPosition("abc", "b", 1), true)
 * assert.deepStrictEqual(S.startsWithPosition("bc", "a", 1), false)
 *
 * @since 1.0.0
 */
exports.startsWith = startsWith;
const startsWithPosition = /*#__PURE__*/(0, _Function.dual)(3, (self, searchString, position) => self.startsWith(searchString, position));
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.endsWith("abc", "c"), true)
 * assert.deepStrictEqual(S.endsWith("ab", "c"), false)
 *
 * @since 1.0.0
 */
exports.startsWithPosition = startsWithPosition;
const endsWith = /*#__PURE__*/(0, _Function.dual)(2, (self, searchString) => self.endsWith(searchString));
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.endsWithPosition("abc", "b", 2), true)
 * assert.deepStrictEqual(S.endsWithPosition("abc", "c", 2), false)
 *
 * @since 1.0.0
 */
exports.endsWith = endsWith;
const endsWithPosition = /*#__PURE__*/(0, _Function.dual)(3, (self, searchString, position) => self.endsWith(searchString, position));
/**
 * Keep the specified number of characters from the start of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.takeLeft("Hello World", 5), "Hello")
 *
 * @since 1.0.0
 */
exports.endsWithPosition = endsWithPosition;
const takeLeft = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => self.slice(0, Math.max(n, 0)));
/**
 * Keep the specified number of characters from the end of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.takeRight("Hello World", 5), "World")
 *
 * @since 1.0.0
 */
exports.takeLeft = takeLeft;
const takeRight = /*#__PURE__*/(0, _Function.dual)(2, (self, n) => self.slice(Math.max(0, self.length - Math.floor(n)), Infinity));
/*

  Missing:

  - charCodeAt
  - substring
  - at
  - charAt
  - codePointAt
  - indexOf
  - lastIndexOf
  - localeCompare
  - match
  - matchAll
  - normalize
  - padEnd
  - padStart
  - repeat
  - replaceAll
  - search
  - toLocaleLowerCase
  - toLocaleUpperCase
*/
exports.takeRight = takeRight;
const CR = 0x0d;
const LF = 0x0a;
/**
 * Returns an `IterableIterator` which yields each line contained within the
 * string, trimming off the trailing newline character.
 *
 * @since 1.0.0
 */
// export const linesIterator = (self: string): LinesIterator => linesSeparated(self, true)
/**
 * Returns an `IterableIterator` which yields each line contained within the
 * string as well as the trailing newline character.
 *
 * @since 1.0.0
 */
const linesWithSeparators = s => linesSeparated(s, false);
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the character specified by `marginChar`
 * from the line.
 *
 * @since 1.0.0
 */
exports.linesWithSeparators = linesWithSeparators;
const stripMarginWith = /*#__PURE__*/(0, _Function.dual)(2, (self, marginChar) => {
  let out = "";
  for (const line of linesWithSeparators(self)) {
    let index = 0;
    while (index < line.length && line.charAt(index) <= " ") {
      index = index + 1;
    }
    const stripped = index < line.length && line.charAt(index) === marginChar ? line.substring(index + 1) : line;
    out = out + stripped;
  }
  return out;
});
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 *
 * @since 1.0.0
 */
exports.stripMarginWith = stripMarginWith;
const stripMargin = self => stripMarginWith("|")(self);
exports.stripMargin = stripMargin;
class LinesIterator {
  constructor(s, stripped = false) {
    this.s = s;
    this.stripped = stripped;
    this.index = 0;
    this.length = s.length;
  }
  next() {
    if (this.done) {
      return {
        done: true,
        value: undefined
      };
    }
    const start = this.index;
    while (!this.done && !isLineBreak(this.s[this.index])) {
      this.index = this.index + 1;
    }
    let end = this.index;
    if (!this.done) {
      const char = this.s[this.index];
      this.index = this.index + 1;
      if (!this.done && isLineBreak2(char, this.s[this.index])) {
        this.index = this.index + 1;
      }
      if (!this.stripped) {
        end = this.index;
      }
    }
    return {
      done: false,
      value: this.s.substring(start, end)
    };
  }
  [Symbol.iterator]() {
    return new LinesIterator(this.s, this.stripped);
  }
  get done() {
    return this.index >= this.length;
  }
}
/**
 * Test if the provided character is a line break character (i.e. either `"\r"`
 * or `"\n"`).
 */
const isLineBreak = char => {
  const code = char.charCodeAt(0);
  return code === CR || code === LF;
};
/**
 * Test if the provided characters combine to form a carriage return/line-feed
 * (i.e. `"\r\n"`).
 */
const isLineBreak2 = (char0, char1) => char0.charCodeAt(0) === CR && char1.charCodeAt(0) === LF;
const linesSeparated = (self, stripped) => new LinesIterator(self, stripped);
//# sourceMappingURL=String.js.map