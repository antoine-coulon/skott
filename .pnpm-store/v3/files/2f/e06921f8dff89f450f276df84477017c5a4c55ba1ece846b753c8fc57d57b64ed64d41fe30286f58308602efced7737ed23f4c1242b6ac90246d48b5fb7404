import type { TypeLambda } from "@effect/data/HKT";
import type * as applicative from "@effect/data/typeclass/Applicative";
import * as chainable from "@effect/data/typeclass/Chainable";
import * as covariant from "@effect/data/typeclass/Covariant";
import type * as flatMap_ from "@effect/data/typeclass/FlatMap";
import type * as foldable from "@effect/data/typeclass/Foldable";
import * as invariant from "@effect/data/typeclass/Invariant";
import type * as monad from "@effect/data/typeclass/Monad";
import * as of_ from "@effect/data/typeclass/Of";
import type * as pointed from "@effect/data/typeclass/Pointed";
import type * as product_ from "@effect/data/typeclass/Product";
import type * as semiAlternative from "@effect/data/typeclass/SemiAlternative";
import type * as semiApplicative from "@effect/data/typeclass/SemiApplicative";
import type * as semiCoproduct from "@effect/data/typeclass/SemiCoproduct";
import type { Semigroup } from "@effect/data/typeclass/Semigroup";
import * as semiProduct from "@effect/data/typeclass/SemiProduct";
import type * as traversable from "@effect/data/typeclass/Traversable";
/**
 * @category models
 * @since 1.0.0
 */
export type Identity<A> = A;
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface IdentityTypeLambda extends TypeLambda {
    readonly type: Identity<this["Target"]>;
}
/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface IdentityTypeLambdaFix<A> extends TypeLambda {
    readonly type: Identity<A>;
}
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Covariant: covariant.Covariant<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Invariant: invariant.Invariant<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Of: of_.Of<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Pointed: pointed.Pointed<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const FlatMap: flatMap_.FlatMap<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Chainable: chainable.Chainable<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Monad: monad.Monad<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiProduct: semiProduct.SemiProduct<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Product: product_.Product<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const SemiApplicative: semiApplicative.SemiApplicative<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Applicative: applicative.Applicative<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemiCoproduct: <A>(S: Semigroup<A>) => semiCoproduct.SemiCoproduct<IdentityTypeLambdaFix<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const getSemiAlternative: <A>(S: Semigroup<A>) => semiAlternative.SemiAlternative<IdentityTypeLambdaFix<A>>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Foldable: foldable.Foldable<IdentityTypeLambda>;
/**
 * @category instances
 * @since 1.0.0
 */
export declare const Traversable: traversable.Traversable<IdentityTypeLambda>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bindTo: {
    <N extends string>(name: N): <A>(self: Identity<A>) => Identity<{
        [K in N]: A;
    }>;
    <A, N extends string>(self: Identity<A>, name: N): Identity<{
        [K in N]: A;
    }>;
};
declare const let_: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): (self: Identity<A>) => Identity<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: Identity<A>, name: Exclude<N, keyof A>, f: (a: A) => B): Identity<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
export { 
/**
 * @category do notation
 * @since 1.0.0
 */
let_ as let };
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const Do: Identity<{}>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const bind: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => Identity<B>): (self: Identity<A>) => Identity<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: Identity<A>, name: Exclude<N, keyof A>, f: (a: A) => Identity<B>): Identity<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export declare const andThenBind: {
    <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: Identity<B>): (self: Identity<A>) => Identity<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
    <A extends object, N extends string, B>(self: Identity<A>, name: Exclude<N, keyof A>, that: Identity<B>): Identity<{
        [K in N | keyof A]: K extends keyof A ? A[K] : B;
    }>;
};
//# sourceMappingURL=Identity.d.ts.map