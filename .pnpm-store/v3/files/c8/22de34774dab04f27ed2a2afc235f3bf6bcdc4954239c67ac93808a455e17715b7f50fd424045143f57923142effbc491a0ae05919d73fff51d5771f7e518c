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
export const isFunction = input => typeof input === "function";
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
export const dual = (arity, body) => {
  const isDataFirst = typeof arity === "number" ? args => args.length >= arity : arity;
  return function () {
    if (isDataFirst(arguments)) {
      // @ts-expect-error
      return body.apply(this, arguments);
    }
    return self => body(self, ...arguments);
  };
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
export const apply = a => self => self(a);
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
export const identity = a => a;
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
export const unsafeCoerce = identity;
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
export const constant = value => () => value;
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
export const constTrue = /*#__PURE__*/constant(true);
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
export const constFalse = /*#__PURE__*/constant(false);
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
export const constNull = /*#__PURE__*/constant(null);
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
export const constUndefined = /*#__PURE__*/constant(undefined);
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
export const constVoid = constUndefined;
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
export const flip = f => (...b) => (...a) => f(...a)(...b);
export function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
  switch (arguments.length) {
    case 1:
      return ab;
    case 2:
      return function () {
        return bc(ab.apply(this, arguments));
      };
    case 3:
      return function () {
        return cd(bc(ab.apply(this, arguments)));
      };
    case 4:
      return function () {
        return de(cd(bc(ab.apply(this, arguments))));
      };
    case 5:
      return function () {
        return ef(de(cd(bc(ab.apply(this, arguments)))));
      };
    case 6:
      return function () {
        return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
      };
    case 7:
      return function () {
        return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
      };
    case 8:
      return function () {
        return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
      };
    case 9:
      return function () {
        return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
      };
  }
  return;
}
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
export const compose = /*#__PURE__*/dual(2, (ab, bc) => flow(ab, bc));
/**
 * The `absurd` function is a stub for cases where a value of type `never` is encountered in your code,
 * meaning that it should be impossible for this code to be executed.
 *
 * This function is particularly when it's necessary to specify that certain cases are impossible.
 *
 * @since 1.0.0
 */
export const absurd = _ => {
  throw new Error("Called `absurd` function which should be uncallable");
};
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
export const tupled = f => a => f(...a);
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
export const untupled = f => (...a) => f(a);
export function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default:
      {
        let ret = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
          ret = arguments[i](ret);
        }
        return ret;
      }
  }
}
/**
 * Type hole simulation.
 *
 * @since 1.0.0
 */
export const hole = /*#__PURE__*/unsafeCoerce(absurd);
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
export const SK = (_, b) => b;
//# sourceMappingURL=Function.mjs.map