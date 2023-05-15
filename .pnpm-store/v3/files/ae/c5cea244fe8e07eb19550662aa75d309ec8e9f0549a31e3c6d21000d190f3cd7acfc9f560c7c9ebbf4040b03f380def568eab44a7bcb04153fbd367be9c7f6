/**
 * This module provides utility functions and type class instances for working with the `string` type in TypeScript.
 * It includes functions for basic string manipulation, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */
import type { Refinement } from "@effect/data/Predicate";
import type { NonEmptyArray } from "@effect/data/ReadonlyArray";
import * as equivalence from "@effect/data/typeclass/Equivalence";
import * as monoid from "@effect/data/typeclass/Monoid";
import * as order from "@effect/data/typeclass/Order";
import * as semigroup from "@effect/data/typeclass/Semigroup";
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
export declare const isString: Refinement<unknown, string>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Equivalence: equivalence.Equivalence<string>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Order: order.Order<string>;
/**
 * `string` semigroup under concatenation.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const Semigroup: semigroup.Semigroup<string>;
/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @category instances
 * @since 1.0.0
 */
export declare const Monoid: monoid.Monoid<string>;
/**
 * The empty string `""`.
 *
 * @since 1.0.0
 */
export declare const empty: "";
/**
 * @since 1.0.0
 */
export declare const concat: {
    (that: string): (self: string) => string;
    (self: string, that: string): string;
};
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @since 1.0.0
 */
export declare const toUpperCase: (self: string) => string;
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @since 1.0.0
 */
export declare const toLowerCase: (self: string) => string;
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @since 1.0.0
 */
export declare const replace: {
    (searchValue: string | RegExp, replaceValue: string): (self: string) => string;
    (self: string, searchValue: string | RegExp, replaceValue: string): string;
};
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trim(' a '), 'a')
 *
 * @since 1.0.0
 */
export declare const trim: (self: string) => string;
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trimStart(' a '), 'a ')
 *
 * @since 1.0.0
 */
export declare const trimStart: (self: string) => string;
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.trimEnd(' a '), ' a')
 *
 * @since 1.0.0
 */
export declare const trimEnd: (self: string) => string;
/**
 * @example
 * import * as S from '@effect/data/String'
 * import { pipe } from '@effect/data/Function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @since 1.0.0
 */
export declare const slice: {
    (start: number, end: number): (self: string) => string;
    (self: string, start: number, end: number): string;
};
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
export declare const isEmpty: (self: string) => self is "";
/**
 * Test whether a `string` is non empty.
 *
 * @since 1.0.0
 */
export declare const isNonEmpty: (self: string) => boolean;
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
export declare const length: (self: string) => number;
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
export declare const split: {
    (separator: string | RegExp): (self: string) => NonEmptyArray<string>;
    (self: string, separator: string | RegExp): NonEmptyArray<string>;
};
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
export declare const includes: {
    (searchString: string): (self: string) => boolean;
    (self: string, searchString: string): boolean;
};
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
export declare const includesWithPosition: {
    (searchString: string, position: number): (self: string) => boolean;
    (self: string, searchString: string, position: number): boolean;
};
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
export declare const startsWith: {
    (searchString: string): (self: string) => boolean;
    (self: string, searchString: string): boolean;
};
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.startsWithPosition("abc", "b", 1), true)
 * assert.deepStrictEqual(S.startsWithPosition("bc", "a", 1), false)
 *
 * @since 1.0.0
 */
export declare const startsWithPosition: {
    (searchString: string, position: number): (self: string) => boolean;
    (self: string, searchString: string, position: number): boolean;
};
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.endsWith("abc", "c"), true)
 * assert.deepStrictEqual(S.endsWith("ab", "c"), false)
 *
 * @since 1.0.0
 */
export declare const endsWith: {
    (searchString: string): (self: string) => boolean;
    (self: string, searchString: string): boolean;
};
/**
 * @example
 * import * as S from '@effect/data/String'
 *
 * assert.deepStrictEqual(S.endsWithPosition("abc", "b", 2), true)
 * assert.deepStrictEqual(S.endsWithPosition("abc", "c", 2), false)
 *
 * @since 1.0.0
 */
export declare const endsWithPosition: {
    (searchString: string, position: number): (self: string) => boolean;
    (self: string, searchString: string, position: number): boolean;
};
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
export declare const takeLeft: {
    (n: number): (self: string) => string;
    (self: string, n: number): string;
};
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
export declare const takeRight: {
    (n: number): (self: string) => string;
    (self: string, n: number): string;
};
/**
 * Returns an `IterableIterator` which yields each line contained within the
 * string, trimming off the trailing newline character.
 *
 * @since 1.0.0
 */
/**
 * Returns an `IterableIterator` which yields each line contained within the
 * string as well as the trailing newline character.
 *
 * @since 1.0.0
 */
export declare const linesWithSeparators: (s: string) => LinesIterator;
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the character specified by `marginChar`
 * from the line.
 *
 * @since 1.0.0
 */
export declare const stripMarginWith: ((marginChar: string) => (self: string) => string) & ((self: string, marginChar: string) => string);
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 *
 * @since 1.0.0
 */
export declare const stripMargin: (self: string) => string;
declare class LinesIterator implements IterableIterator<string> {
    readonly s: string;
    readonly stripped: boolean;
    private index;
    private readonly length;
    constructor(s: string, stripped?: boolean);
    next(): IteratorResult<string>;
    [Symbol.iterator](): IterableIterator<string>;
    private get done();
}
export {};
//# sourceMappingURL=String.d.ts.map