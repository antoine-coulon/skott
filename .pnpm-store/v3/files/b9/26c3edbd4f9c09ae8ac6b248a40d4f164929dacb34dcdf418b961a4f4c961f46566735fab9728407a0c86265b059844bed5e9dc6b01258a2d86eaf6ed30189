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
import * as Option from "@effect/data/Option";
import type { Predicate, Refinement } from "@effect/data/Predicate";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const BrandTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type BrandTypeId = typeof BrandTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const RefinedConstructorsTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type RefinedConstructorsTypeId = typeof RefinedConstructorsTypeId;
/**
 * A generic interface that defines a branded type. It contains a `unique symbol` property `[BrandTypeId]` with a `string` property,
 * which represents the brand.
 *
 * @since 1.0.0
 * @category models
 */
export interface Brand<in out K extends string> {
    readonly [BrandTypeId]: {
        readonly [k in K]: K;
    };
}
/**
 * @since 1.0.0
 */
export declare namespace Brand {
    /**
     * Represents a list of refinement errors.
     *
     * @since 1.0.0
     * @category models
     */
    interface BrandErrors extends ReadonlyArray<RefinementError> {
    }
    /**
     * Represents an error that occurs when the provided value of the branded type does not pass the refinement predicate.
     *
     * @since 1.0.0
     * @category models
     */
    interface RefinementError {
        readonly meta: unknown;
        readonly message: string;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface Constructor<in out A extends Brand<any>> {
        readonly [RefinedConstructorsTypeId]: RefinedConstructorsTypeId;
        /**
         * Constructs a branded type from a value of type `A`, throwing an error if
         * the provided `A` is not valid.
         */
        (args: Brand.Unbranded<A>): A;
        /**
         * Constructs a branded type from a value of type `A`, returning `Some<A>`
         * if the provided `A` is valid, `None` otherwise.
         */
        option: (args: Brand.Unbranded<A>) => Option.Option<A>;
        /**
         * Constructs a branded type from a value of type `A`, returning `Right<A>`
         * if the provided `A` is valid, `Left<BrandError>` otherwise.
         */
        either: (args: Brand.Unbranded<A>) => Either.Either<Brand.BrandErrors, A>;
        /**
         * Attempts to refine the provided value of type `A`, returning `true` if
         * the provided `A` is valid, `false` otherwise.
         */
        refine: Refinement<Brand.Unbranded<A>, Brand.Unbranded<A> & A>;
    }
    /**
     * A utility type to extract a branded type from a `Brand.Constructor`.
     *
     * @since 1.0.0
     * @category models
     */
    type FromConstructor<A> = A extends Brand.Constructor<infer B> ? B : never;
    /**
     * A utility type to extract the value type from a brand.
     *
     * @since 1.0.0
     * @category models
     */
    type Unbranded<P> = P extends infer Q & Brands<P> ? Q : P;
    /**
     * A utility type to extract the brands from a branded type.
     *
     * @since 1.0.0
     * @category models
     */
    type Brands<P> = P extends Brand<any> ? Brand.UnionToIntersection<{
        [k in keyof P[BrandTypeId]]: k extends string ? Brand<k> : never;
    }[keyof P[BrandTypeId]]> : never;
    /**
     * A utility type that checks that all brands have the same base type.
     *
     * @since 1.0.0
     * @category models
     */
    type EnsureCommonBase<Brands extends readonly [Brand.Constructor<any>, ...Array<Brand.Constructor<any>>]> = {
        [B in keyof Brands]: Brand.Unbranded<Brand.FromConstructor<Brands[0]>> extends Brand.Unbranded<Brand.FromConstructor<Brands[B]>> ? Brand.Unbranded<Brand.FromConstructor<Brands[B]>> extends Brand.Unbranded<Brand.FromConstructor<Brands[0]>> ? Brands[B] : Brands[B] : "ERROR: All brands should have the same base type";
    };
    /**
     * A utility type that transforms a union type `T` into an intersection type.
     *
     * @since 1.0.0
     * @category models
     */
    type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
}
/**
 * Returns a `BrandErrors` that contains a single `RefinementError`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const error: (message: string, meta?: unknown) => Brand.BrandErrors;
/**
 * Takes a variable number of `BrandErrors` and returns a single `BrandErrors` that contains all refinement errors.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const errors: (...errors: Array<Brand.BrandErrors>) => Brand.BrandErrors;
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
export declare const refined: <A extends Brand<any>>(refinement: Predicate<Brand.Unbranded<A>>, onFailure: (a: Brand.Unbranded<A>) => Brand.BrandErrors) => Brand.Constructor<A>;
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
export declare const nominal: <A extends Brand<any>>() => Brand.Constructor<A>;
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
export declare const all: <Brands extends readonly [Brand.Constructor<any>, ...Array<Brand.Constructor<any>>]>(...brands: Brand.EnsureCommonBase<Brands>) => Brand.Constructor<Brand.UnionToIntersection<{
    [B in keyof Brands]: Brand.FromConstructor<Brands[B]>;
}[number]> extends infer X extends Brand<any> ? X : Brand<any>>;
//# sourceMappingURL=Brand.d.ts.map