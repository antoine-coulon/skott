/**
 * This module provides types and utility functions to create and work with branded types,
 * which are TypeScript types with an added type tag to prevent accidental usage of a value in the wrong context.
 *
 * The `refined` and `nominal` functions are both used to create branded types in TypeScript.
 * The main difference between them is that `refined` allows for validation of the data, while `nominal` does not.
 *
 * The `nominal` function is used to create a new branded type that has the same underlying type as the input, but with a different name.
 * This is useful when you want to distinguish between two values of the same type that have different meanings.
 * The `nominal` function does not perform any validation of the input data.
 *
 * On the other hand, the `refined` function is used to create a new branded type that has the same underlying type as the input,
 * but with a different name, and it also allows for validation of the input data.
 * The `refined` function takes a predicate that is used to validate the input data.
 * If the input data fails the validation, a `BrandErrors` is returned, which provides information about the specific validation failure.
 *
 * @since 1.0.0
 */
import * as Either from "@effect/data/Either";
import { identity } from "@effect/data/Function";
import * as Option from "@effect/data/Option";
import * as ReadonlyArray from "@effect/data/ReadonlyArray";
/**
 * @since 1.0.0
 * @category symbols
 */
export const BrandTypeId = /*#__PURE__*/Symbol.for("@effect/data/Brand");
/**
 * @since 1.0.0
 * @category symbols
 */
export const RefinedConstructorsTypeId = /*#__PURE__*/Symbol.for("@effect/data/Brand/Refined");
/**
 * Returns a `BrandErrors` that contains a single `RefinementError`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const error = (message, meta) => [{
  message,
  meta
}];
/**
 * Takes a variable number of `BrandErrors` and returns a single `BrandErrors` that contains all refinement errors.
 *
 * @since 1.0.0
 * @category constructors
 */
export const errors = (...errors) => ReadonlyArray.flatten(errors);
/**
 * Returns a `Brand.Constructor` that can construct a branded type from an unbranded value using the provided `refinement`
 * predicate as validation of the input data.
 *
 * If you don't want to perform any validation but only distinguish between two values of the same type but with different meanings,
 * see {@link nominal}.
 *
 * @param refinement - The refinement predicate to apply to the unbranded value.
 * @param onFailure - Takes the unbranded value that did not pass the `refinement` predicate and returns a `BrandErrors`.
 *
 * @example
 * import * as Brand from "@effect/data/Brand"
 *
 * type Int = number & Brand.Brand<"Int">
 *
 * const Int = Brand.refined<Int>(
 *   (n) => Number.isInteger(n),
 *   (n) => Brand.error(`Expected ${n} to be an integer`)
 * )
 *
 * assert.strictEqual(Int(1), 1)
 * assert.throws(() => Int(1.1))
 *
 * @since 1.0.0
 * @category constructors
 */
export const refined = (refinement, onFailure) => {
  const either = args => refinement(args) ? Either.right(args) : Either.left(onFailure(args));
  // @ts-expect-error
  return Object.assign(args => Either.match(e => {
    throw e;
  }, identity)(either(args)), {
    [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
    option: args => Option.fromEither(either(args)),
    either,
    refine: args => Either.isRight(either(args))
  });
};
/**
 * This function returns a `Brand.Constructor` that **does not apply any runtime checks**, it just returns the provided value.
 * It can be used to create nominal types that allow distinguishing between two values of the same type but with different meanings.
 *
 * If you also want to perform some validation, see {@link refined}.
 *
 * @example
 * import * as Brand from "@effect/data/Brand"
 *
 * type UserId = number & Brand.Brand<"UserId">
 *
 * const UserId = Brand.nominal<UserId>()
 *
 * assert.strictEqual(UserId(1), 1)
 *
 * @since 1.0.0
 * @category constructors
 */
export const nominal = () => {
  // @ts-expect-error
  return Object.assign(args => args, {
    [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
    option: args => Option.some(args),
    either: args => Either.right(args),
    refine: _args => true
  });
};
/**
 * Combines two or more brands together to form a single branded type.
 * This API is useful when you want to validate that the input data passes multiple brand validators.
 *
 * @example
 * import * as Brand from "@effect/data/Brand"
 *
 * type Int = number & Brand.Brand<"Int">
 * const Int = Brand.refined<Int>(
 *   (n) => Number.isInteger(n),
 *   (n) => Brand.error(`Expected ${n} to be an integer`)
 * )
 * type Positive = number & Brand.Brand<"Positive">
 * const Positive = Brand.refined<Positive>(
 *   (n) => n > 0,
 *   (n) => Brand.error(`Expected ${n} to be positive`)
 * )
 *
 * const PositiveInt = Brand.all(Int, Positive)
 *
 * assert.strictEqual(PositiveInt(1), 1)
 * assert.throws(() => PositiveInt(1.1))
 *
 * @since 1.0.0
 * @category combining
 */
export const all = (...brands) => {
  const either = args => {
    let result = Either.right(args);
    for (const brand of brands) {
      const nextResult = brand.either(args);
      if (Either.isLeft(result) && Either.isLeft(nextResult)) {
        result = Either.left([...result.left, ...nextResult.left]);
      } else {
        result = Either.isLeft(result) ? result : nextResult;
      }
    }
    return result;
  };
  // @ts-expect-error
  return Object.assign(args => Either.match(e => {
    throw e;
  }, identity)(either(args)), {
    [RefinedConstructorsTypeId]: RefinedConstructorsTypeId,
    option: args => Option.fromEither(either(args)),
    either,
    refine: args => Either.isRight(either(args))
  });
};
//# sourceMappingURL=Brand.mjs.map