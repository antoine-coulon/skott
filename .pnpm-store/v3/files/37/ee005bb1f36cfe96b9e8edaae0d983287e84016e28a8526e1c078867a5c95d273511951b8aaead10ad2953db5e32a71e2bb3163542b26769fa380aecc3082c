/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@effect/data/HKT";
/**
 * @category type class
 * @since 1.0.0
 */
export interface Of<F extends TypeLambda> extends TypeClass<F> {
    readonly of: <A>(a: A) => Kind<F, unknown, never, never, A>;
}
/**
 * Returns a default `of` composition.
 *
 * @since 1.0.0
 */
export declare const ofComposition: <F extends TypeLambda, G extends TypeLambda>(F: Of<F>, G: Of<G>) => <A>(a: A) => Kind<F, unknown, never, never, Kind<G, unknown, never, never, A>>;
/**
 * @since 1.0.0
 */
export declare const unit: <F extends TypeLambda>(F: Of<F>) => Kind<F, unknown, never, never, void>;
/**
 * @category do notation
 * @since 1.0.0
 */
export declare const Do: <F extends TypeLambda>(F: Of<F>) => Kind<F, unknown, never, never, {}>;
//# sourceMappingURL=Of.d.ts.map