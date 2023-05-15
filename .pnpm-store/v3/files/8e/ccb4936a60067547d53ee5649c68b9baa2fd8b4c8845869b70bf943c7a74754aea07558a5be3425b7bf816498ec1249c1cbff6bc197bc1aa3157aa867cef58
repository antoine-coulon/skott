/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context";
import type * as Effect from "@effect/io/Effect";
import type * as Layer from "@effect/io/Layer";
import type * as Schedule from "@effect/io/Schedule";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const ReloadableTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type ReloadableTypeId = typeof ReloadableTypeId;
/**
 * A `Reloadable` is an implementation of some service that can be dynamically
 * reloaded, or swapped out for another implementation on-the-fly.
 *
 * @since 1.0.0
 * @category models
 */
export interface Reloadable<A> extends Reloadable.Variance<A> {
}
/**
 * @since 1.0.0
 */
export declare namespace Reloadable {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<A> {
        readonly [ReloadableTypeId]: {
            readonly _A: (_: never) => A;
        };
    }
}
/**
 * Makes a new reloadable service from a layer that describes the construction
 * of a static service. The service is automatically reloaded according to the
 * provided schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const auto: <Out extends Context.Tag<any>, In, E, R, Out2>(tag: Out, layer: Layer.Layer<In, E, Context.Tag.Service<Out>>, policy: Schedule.Schedule<R, In, Out2>) => Layer.Layer<In | R, E, Reloadable<Context.Tag.Service<Out>>>;
/**
 * Makes a new reloadable service from a layer that describes the construction
 * of a static service. The service is automatically reloaded according to a
 * schedule, which is extracted from the input to the layer.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const autoFromConfig: <Out extends Context.Tag<any>, In, E, R, Out2>(tag: Out, layer: Layer.Layer<In, E, Context.Tag.Service<Out>>, scheduleFromConfig: (context: Context.Context<In>) => Schedule.Schedule<R, In, Out2>) => Layer.Layer<In | R, E, Reloadable<Context.Tag.Service<Out>>>;
/**
 * Retrieves the current version of the reloadable service.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const get: <A>(tag: Context.Tag<A>) => Effect.Effect<Reloadable<A>, never, A>;
/**
 * Makes a new reloadable service from a layer that describes the construction
 * of a static service.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const manual: <Out extends Context.Tag<any>, In, E>(tag: Out, layer: Layer.Layer<In, E, Context.Tag.Service<Out>>) => Layer.Layer<In, E, Reloadable<Context.Tag.Service<Out>>>;
/**
 * Reloads the specified service.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const reload: <A>(tag: Context.Tag<A>) => Effect.Effect<Reloadable<A>, unknown, void>;
/**
 * @since 1.0.0
 * @category context
 */
export declare const tag: <A>(tag: Context.Tag<A>) => Context.Tag<Reloadable<A>>;
/**
 * Forks the reload of the service in the background, ignoring any errors.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const reloadFork: <A>(tag: Context.Tag<A>) => Effect.Effect<Reloadable<A>, unknown, void>;
//# sourceMappingURL=Reloadable.d.ts.map