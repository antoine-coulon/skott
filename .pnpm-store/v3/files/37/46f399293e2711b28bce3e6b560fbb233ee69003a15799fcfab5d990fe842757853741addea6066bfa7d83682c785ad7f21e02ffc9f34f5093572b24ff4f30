/**
 * This module provides utility functions and type class instances for working with the `string` type in TypeScript.
 * It includes functions for basic string manipulation, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */

import { dual } from "@effect/data/Function"
import * as readonlyArray from "@effect/data/internal/ReadonlyArray"
import type { Refinement } from "@effect/data/Predicate"
import * as predicate from "@effect/data/Predicate"
import type { NonEmptyArray } from "@effect/data/ReadonlyArray"
import * as equivalence from "@effect/data/typeclass/Equivalence"
import * as monoid from "@effect/data/typeclass/Monoid"
import * as order from "@effect/data/typeclass/Order"
import * as semigroup from "@effect/data/typeclass/Semigroup"

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
export const isString: Refinement<unknown, string> = predicate.isString

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<string> = equivalence.string

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<string> = order.string

/**
 * `string` semigroup under concatenation.
 *
 * @category instances
 * @since 1.0.0
 */
export const Semigroup: semigroup.Semigroup<string> = semigroup.string

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @category instances
 * @since 1.0.0
 */
export const Monoid: monoid.Monoid<string> = monoid.string

/**
 * The empty string `""`.
 *
 * @since 1.0.0
 */
export const empty: "" = "" as const

/**
 * @since 1.0.0
 */
export const concat: {
  (that: string): (self: string) => string
  (self: string, that: string): string
} = dual(2, Semigroup.combine)

/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @since 1.0.0
 */
export const toUpperCase = (self: string): string => self.toUpperCase()

/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @since 1.0.0
 */
export const toLowerCase = (self: string): string => self.toLowerCase()

/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @since 1.0.0
 */
export const replace: {
  (searchValue: string | RegExp, replaceValue: string): (self: string) => string
  (self: string, searchValue: string | RegExp, replaceValue: string): string
} = dual(
  3,
  (self: string, searchValue: string | RegExp, replaceValue: string): string => self.replace(searchValue, replaceValue)
)

/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trim(' a '), 'a')
 *
 * @since 1.0.0
 */
export const trim = (self: string): string => self.trim()

/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trimStart(' a '), 'a ')
 *
 * @since 1.0.0
 */
export const trimStart = (self: string): string => self.trimStart()

/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trimEnd(' a '), ' a')
 *
 * @since 1.0.0
 */
export const trimEnd = (self: string): string => self.trimEnd()

/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @since 1.0.0
 */
export const slice: {
  (start: number, end: number): (self: string) => string
  (self: string, start: number, end: number): string
} = dual(3, (self: string, start: number, end: number): string => self.slice(start, end))

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
export const isEmpty = (self: string): self is "" => self.length === 0

/**
 * Test whether a `string` is non empty.
 *
 * @since 1.0.0
 */
export const isNonEmpty = (self: string): boolean => self.length > 0

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
export const length = (self: string): number => self.length

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
export const split: {
  (separator: string | RegExp): (self: string) => NonEmptyArray<string>
  (self: string, separator: string | RegExp): NonEmptyArray<string>
} = dual(2, (self: string, separator: string | RegExp): NonEmptyArray<string> => {
  const out = self.split(separator)
  return readonlyArray.isNonEmptyArray(out) ? out : [self]
})

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
export const includes: {
  (searchString: string): (self: string) => boolean
  (self: string, searchString: string): boolean
} = dual(2, (self: string, searchString: string): boolean => self.includes(searchString))

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
export const includesWithPosition: {
  (searchString: string, position: number): (self: string) => boolean
  (self: string, searchString: string, position: number): boolean
} = dual(
  3,
  (self: string, searchString: string, position: number): boolean => self.includes(searchString, position)
)

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
export const startsWith: {
  (searchString: string): (self: string) => boolean
  (self: string, searchString: string): boolean
} = dual(
  2,
  (self: string, searchString: string): boolean => self.startsWith(searchString)
)

/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.startsWithPosition("abc", "b", 1), true)
 * assert.deepStrictEqual(S.startsWithPosition("bc", "a", 1), false)
 *
 * @since 1.0.0
 */
export const startsWithPosition: {
  (searchString: string, position: number): (self: string) => boolean
  (self: string, searchString: string, position: number): boolean
} = dual(
  3,
  (self: string, searchString: string, position: number): boolean => self.startsWith(searchString, position)
)

/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.endsWith("abc", "c"), true)
 * assert.deepStrictEqual(S.endsWith("ab", "c"), false)
 *
 * @since 1.0.0
 */
export const endsWith: {
  (searchString: string): (self: string) => boolean
  (self: string, searchString: string): boolean
} = dual(2, (self: string, searchString: string): boolean => self.endsWith(searchString))

/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.endsWithPosition("abc", "b", 2), true)
 * assert.deepStrictEqual(S.endsWithPosition("abc", "c", 2), false)
 *
 * @since 1.0.0
 */
export const endsWithPosition: {
  (searchString: string, position: number): (self: string) => boolean
  (self: string, searchString: string, position: number): boolean
} = dual(
  3,
  (self: string, searchString: string, position: number): boolean => self.endsWith(searchString, position)
)

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
export const takeLeft: {
  (n: number): (self: string) => string
  (self: string, n: number): string
} = dual(2, (self: string, n: number): string => self.slice(0, Math.max(n, 0)))

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
export const takeRight: {
  (n: number): (self: string) => string
  (self: string, n: number): string
} = dual(
  2,
  (self: string, n: number): string => self.slice(Math.max(0, self.length - Math.floor(n)), Infinity)
)

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

const CR = 0x0d
const LF = 0x0a

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
export const linesWithSeparators = (s: string): LinesIterator => linesSeparated(s, false)

/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the character specified by `marginChar`
 * from the line.
 *
 * @since 1.0.0
 */
export const stripMarginWith = dual<
  (marginChar: string) => (self: string) => string,
  (self: string, marginChar: string) => string
>(2, (self, marginChar) => {
  let out = ""

  for (const line of linesWithSeparators(self)) {
    let index = 0

    while (index < line.length && line.charAt(index) <= " ") {
      index = index + 1
    }

    const stripped = index < line.length && line.charAt(index) === marginChar
      ? line.substring(index + 1)
      : line

    out = out + stripped
  }

  return out
})

/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 *
 * @since 1.0.0
 */
export const stripMargin = (self: string): string => stripMarginWith("|")(self)

class LinesIterator implements IterableIterator<string> {
  private index: number
  private readonly length: number

  constructor(readonly s: string, readonly stripped: boolean = false) {
    this.index = 0
    this.length = s.length
  }

  next(): IteratorResult<string> {
    if (this.done) {
      return { done: true, value: undefined }
    }
    const start = this.index
    while (!this.done && !isLineBreak(this.s[this.index]!)) {
      this.index = this.index + 1
    }
    let end = this.index
    if (!this.done) {
      const char = this.s[this.index]!
      this.index = this.index + 1
      if (!this.done && isLineBreak2(char, this.s[this.index]!)) {
        this.index = this.index + 1
      }
      if (!this.stripped) {
        end = this.index
      }
    }
    return { done: false, value: this.s.substring(start, end) }
  }

  [Symbol.iterator](): IterableIterator<string> {
    return new LinesIterator(this.s, this.stripped)
  }

  private get done(): boolean {
    return this.index >= this.length
  }
}

/**
 * Test if the provided character is a line break character (i.e. either `"\r"`
 * or `"\n"`).
 */
const isLineBreak = (char: string): boolean => {
  const code = char.charCodeAt(0)
  return code === CR || code === LF
}

/**
 * Test if the provided characters combine to form a carriage return/line-feed
 * (i.e. `"\r\n"`).
 */
const isLineBreak2 = (char0: string, char1: string): boolean => char0.charCodeAt(0) === CR && char1.charCodeAt(0) === LF

const linesSeparated = (self: string, stripped: boolean): LinesIterator => new LinesIterator(self, stripped)
