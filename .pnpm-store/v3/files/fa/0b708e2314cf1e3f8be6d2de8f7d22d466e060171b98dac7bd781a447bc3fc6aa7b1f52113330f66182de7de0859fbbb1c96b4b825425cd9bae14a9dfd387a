import type { Kind, TypeLambda } from "@effect/data/HKT";
import type { Monad } from "@effect/data/typeclass/Monad";
/**
 * @category symbols
 * @since 1.0.0
 */
export declare const GenKindTypeId: unique symbol;
/**
 * @category symbols
 * @since 1.0.0
 */
export type GenKindTypeId = typeof GenKindTypeId;
/**
 * @category models
 * @since 1.0.0
 */
export interface GenKind<F extends TypeLambda, R, O, E, A> extends Variance<F, R, O, E> {
    readonly value: Kind<F, R, O, E, A>;
    [Symbol.iterator](): Generator<GenKind<F, R, O, E, A>, A>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare class GenKindImpl<F extends TypeLambda, R, O, E, A> implements GenKind<F, R, O, E, A> {
    /**
     * @since 1.0.0
     */
    readonly value: Kind<F, R, O, E, A>;
    constructor(
    /**
     * @since 1.0.0
     */
    value: Kind<F, R, O, E, A>);
    /**
     * @since 1.0.0
     */
    get _F(): <A_1>(a: A_1) => A_1;
    /**
     * @since 1.0.0
     */
    get _R(): (_: R) => R;
    /**
     * @since 1.0.0
     */
    get _O(): (_: never) => O;
    /**
     * @since 1.0.0
     */
    get _E(): (_: never) => E;
    /**
     * @since 1.0.0
     */
    readonly [GenKindTypeId]: typeof GenKindTypeId;
    /**
     * @since 1.0.0
     */
    [Symbol.iterator](): Generator<GenKind<F, R, O, E, A>, A>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare class SingleShotGen<T, A> implements Generator<T, A> {
    readonly self: T;
    private called;
    constructor(self: T);
    /**
     * @since 1.0.0
     */
    next(a: A): IteratorResult<T, A>;
    /**
     * @since 1.0.0
     */
    return(a: A): IteratorResult<T, A>;
    /**
     * @since 1.0.0
     */
    throw(e: unknown): IteratorResult<T, A>;
    /**
     * @since 1.0.0
     */
    [Symbol.iterator](): Generator<T, A>;
}
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const makeGenKind: <F extends TypeLambda, R, O, E, A>(kind: Kind<F, R, O, E, A>) => GenKind<F, R, O, E, A>;
/**
 * @category models
 * @since 1.0.0
 */
export interface Variance<F extends TypeLambda, R, O, E> {
    readonly [GenKindTypeId]: GenKindTypeId;
    readonly _F: (_: F) => F;
    readonly _R: (_: R) => unknown;
    readonly _O: (_: never) => O;
    readonly _E: (_: never) => E;
}
/**
 * @category models
 * @since 1.0.0
 */
export interface Gen<F extends TypeLambda, Z> {
    <K extends Variance<F, any, any, any>, A>(body: (resume: Z) => Generator<K, A>): Kind<F, [
        K
    ] extends [Variance<F, infer R, any, any>] ? R : never, [
        K
    ] extends [Variance<F, any, infer O, any>] ? O : never, [
        K
    ] extends [Variance<F, any, any, infer E>] ? E : never, A>;
}
/**
 * @category models
 * @since 1.0.0
 */
export interface Adapter<F extends TypeLambda> {
    <R, O, E, A>(self: Kind<F, R, O, E, A>): GenKind<F, R, O, E, A>;
}
/**
 * @category adapters
 * @since 1.0.0
 */
export declare const adapter: <F extends TypeLambda>() => Adapter<F>;
/**
 * @category constructors
 * @since 1.0.0
 */
export declare const singleShot: <F extends TypeLambda>(F: Monad<F>) => <Z extends Adapter<F>>(adapter: Z) => Gen<F, Z>;
//# sourceMappingURL=Gen.d.ts.map