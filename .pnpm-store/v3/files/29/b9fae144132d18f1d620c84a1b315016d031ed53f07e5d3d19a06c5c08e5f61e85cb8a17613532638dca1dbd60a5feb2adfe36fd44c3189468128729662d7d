/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@effect/data/HKT";
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface FunctionTypeLambda extends TypeLambda {
    readonly type: (a: this["In"]) => this["Target"];
}
/**
 * Tests if a value is a `function`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isFunction } from '@effect/data/Predicate'
 *
 * assert.deepStrictEqual(isFunction(isFunction), true)
 * assert.deepStrictEqual(isFunction("function"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export declare const isFunction: (input: unknown) => input is Function;
/**
 * Creates a function that can be used in a data-last (aka `pipe`able) or
 * data-first style.
 *
 * The first parameter to `dual` is either the arity of the uncurried function
 * or a predicate that determines if the function is being used in a data-first
 * or data-last style.
 *
 * Using the arity is the most common use case, but there are some cases where
 * you may want to use a predicate. For example, if you have a function that
 * takes an optional argument, you can use a predicate to determine if the
 * function is being used in a data-first or data-last style.
 *
 * @param arity - Either the arity of the uncurried function or a predicate
 *                which determines if the function is being used in a data-first
 *                or data-last style.
 * @param body - The definition of the uncurried function.
 *
 * @example
 * import { dual, pipe } from "@effect/data/Function"
 *
 * // Exampe using arity to determine data-first or data-last style
 * export const sum: {
 *   (that: number): (self: number) => number
 *   (self: number, that: number): number
 * } = dual(2, (self: number, that: number): number => self + that)
 *
 * assert.deepStrictEqual(sum(2, 3), 5)
 * assert.deepStrictEqual(pipe(2, sum(3)), 5)
 *
 * // Example using a predicate to determine data-first or data-last style
 * export const sum2: {
 *   (that: number): (self: number) => number
 *   (self: number, that: number): number
 * } = dual((args) => args.length === 1, (self: number, that: number): number => self + that)
 *
 * assert.deepStrictEqual(sum(2, 3), 5)
 * assert.deepStrictEqual(pipe(2, sum(3)), 5)
 *
 * @since 1.0.0
 */
export declare const dual: {
    <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(arity: Parameters<DataFirst>["length"], body: DataFirst): DataLast & DataFirst;
    <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(isDataFirst: (args: IArguments) => boolean, body: DataFirst): DataLast & DataFirst;
};
/**
 * Apply a function to a given value.
 *
 * @param a - The value that the function will be applied to.
 * @param self - The function to be applied to a value.
 *
 * @example
 * import { pipe, apply } from "@effect/data/Function"
 * import { length } from '@effect/data/String'
 *
 * assert.deepStrictEqual(pipe(length, apply("hello")), 5)
 *
 * @since 1.0.0
 */
export declare const apply: <A>(a: A) => <B>(self: (a: A) => B) => B;
/**
 * A lazy argument.
 *
 * @example
 * import { LazyArg, constant } from "@effect/data/Function"
 *
 * export const constNull: LazyArg<null> = constant(null)
 *
 * @since 1.0.0
 */
export interface LazyArg<A> {
    (): A;
}
/**
 * @example
 * import { FunctionN } from "@effect/data/Function"
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 1.0.0
 */
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
    (...args: A): B;
}
/**
 * The identity function, i.e. A function that returns its input argument.
 *
 * @param a - The input argument.
 *
 * @example
 * import { identity } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(identity(5), 5)
 *
 * @since 1.0.0
 */
export declare const identity: <A>(a: A) => A;
/**
 * Casts the result to the specified type.
 *
 * @param a - The value to be casted to the target type.
 *
 * @example
 * import { unsafeCoerce, identity } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(unsafeCoerce, identity)
 *
 * @since 1.0.0
 */
export declare const unsafeCoerce: <A, B>(a: A) => B;
/**
 * Creates a constant value that never changes.
 *
 * This is useful when you want to pass a value to a higher-order function (a function that takes another function as its argument)
 * and want that inner function to always use the same value, no matter how many times it is called.
 *
 * @param value - The constant value to be returned.
 *
 * @example
 * import { constant } from "@effect/data/Function"
 *
 * const constNull = constant(null)
 *
 * assert.deepStrictEqual(constNull(), null)
 * assert.deepStrictEqual(constNull(), null)
 *
 * @since 1.0.0
 */
export declare const constant: <A>(value: A) => LazyArg<A>;
/**
 * A thunk that returns always `true`.
 *
 * @example
 * import { constTrue } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(constTrue(), true)
 *
 * @since 1.0.0
 */
export declare const constTrue: LazyArg<boolean>;
/**
 * A thunk that returns always `false`.
 *
 * @example
 * import { constFalse } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(constFalse(), false)
 *
 * @since 1.0.0
 */
export declare const constFalse: LazyArg<boolean>;
/**
 * A thunk that returns always `null`.
 *
 * @example
 * import { constNull } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(constNull(), null)
 *
 * @since 1.0.0
 */
export declare const constNull: LazyArg<null>;
/**
 * A thunk that returns always `undefined`.
 *
 * @example
 * import { constUndefined } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(constUndefined(), undefined)
 *
 * @since 1.0.0
 */
export declare const constUndefined: LazyArg<undefined>;
/**
 * A thunk that returns always `void`.
 *
 * @example
 * import { constVoid } from "@effect/data/Function"
 *
 * assert.deepStrictEqual(constVoid(), undefined)
 *
 * @since 1.0.0
 */
export declare const constVoid: LazyArg<void>;
/**
 * Reverses the order of arguments for a curried function.
 *
 * @param f - A curried function that takes multiple arguments.
 *
 * @example
 * import { flip } from "@effect/data/Function"
 *
 * const f = (a: number) => (b: string) => a - b.length
 *
 * assert.deepStrictEqual(flip(f)('aaa')(2), -1)
 *
 * @since 1.0.0
 */
export declare const flip: <A extends unknown[], B extends unknown[], C>(f: (...a: A) => (...b: B) => C) => (...b: B) => (...a: A) => C;
/**
 * Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.
 *
 * See also {@link pipe}.
 *
 * @example
 * import { flow } from "@effect/data/Function"
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * const f = flow(len, double)
 *
 * assert.deepStrictEqual(f('aaa'), 6)
 *
 * @since 1.0.0
 */
export declare function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B;
export declare function flow<A extends ReadonlyArray<unknown>, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (...a: A) => D;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (...a: A) => E;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): (...a: A) => F;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): (...a: A) => G;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): (...a: A) => H;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): (...a: A) => I;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): (...a: A) => J;
/**
 * Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
 * The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.
 *
 * @param ab - A function that maps from `A` to `B`.
 * @param bc - A function that maps from `B` to `C`.
 *
 * @example
 * import { compose } from "@effect/data/Function"
 *
 * const increment = (n: number) => n + 1;
 * const square = (n: number) => n * n;
 *
 * assert.strictEqual(compose(increment, square)(2), 9);
 *
 * @since 1.0.0
 */
export declare const compose: {
    <B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C;
    <A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C;
};
/**
 * The `absurd` function is a stub for cases where a value of type `never` is encountered in your code,
 * meaning that it should be impossible for this code to be executed.
 *
 * This function is particularly when it's necessary to specify that certain cases are impossible.
 *
 * @since 1.0.0
 */
export declare const absurd: <A>(_: never) => A;
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from "@effect/data/Function"
 *
 * const sumTupled = tupled((x: number, y: number): number => x + y)
 *
 * assert.deepStrictEqual(sumTupled([1, 2]), 3)
 *
 * @since 1.0.0
 */
export declare const tupled: <A extends readonly unknown[], B>(f: (...a: A) => B) => (a: A) => B;
/**
 * Inverse function of `tupled`
 *
 * @example
 * import { untupled } from "@effect/data/Function"
 *
 * const getFirst = untupled(<A, B>(tuple: [A, B]): A => tuple[0])
 *
 * assert.deepStrictEqual(getFirst(1, 2), 1)
 *
 * @since 1.0.0
 */
export declare const untupled: <A extends readonly unknown[], B>(f: (a: A) => B) => (...a: A) => B;
/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * This is useful in combination with data-last functions as a simulation of methods:
 *
 * ```
 * as.map(f).filter(g) -> pipe(as, map(f), filter(g))
 * ```
 *
 * See also {@link flow}.
 *
 * @example
 * import { pipe } from "@effect/data/Function"
 *
 * const length = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 * const decrement = (n: number): number => n - 1
 *
 * assert.deepStrictEqual(pipe(length("hello"), double, decrement), 9)
 *
 * @since 1.0.0
 */
export declare function pipe<A>(a: A): A;
export declare function pipe<A, B>(a: A, ab: (a: A) => B): B;
export declare function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export declare function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
export declare function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
export declare function pipe<A, B, C, D, E, F>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): F;
export declare function pipe<A, B, C, D, E, F, G>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): G;
export declare function pipe<A, B, C, D, E, F, G, H>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): H;
export declare function pipe<A, B, C, D, E, F, G, H, I>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): I;
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): J;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K): K;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L): L;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M): M;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N): N;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O): O;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P): P;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q): Q;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R): R;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S): S;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T): T;
/**
 * Type hole simulation.
 *
 * @since 1.0.0
 */
export declare const hole: <T>() => T;
/**
 * The SK combinator, also known as the "S-K combinator" or "S-combinator", is a fundamental combinator in the
 * lambda calculus and the SKI combinator calculus.
 *
 * This function is useful for discarding the first argument passed to it and returning the second argument.
 *
 * @param _ - The first argument to be discarded.
 * @param b - The second argument to be returned.
 *
 * @example
 * import { SK } from "@effect/data/Function";
 *
 * assert.deepStrictEqual(SK(0, "hello"), "hello")
 *
 * @since 1.0.0
 */
export declare const SK: <A, B>(_: A, b: B) => B;
//# sourceMappingURL=Function.d.ts.map