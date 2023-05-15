import * as internal from "@effect/io/internal_effect_untraced/layer";
/**
 * @since 1.0.0
 * @category symbols
 */
export const LayerTypeId = internal.LayerTypeId;
/**
 * Returns `true` if the specified value is a `Layer`, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isLayer = internal.isLayer;
/**
 * Returns `true` if the specified `Layer` is a fresh version that will not be
 * shared, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isFresh = internal.isFresh;
/**
 * Builds a layer into a scoped value.
 *
 * @since 1.0.0
 * @category destructors
 */
export const build = internal.build;
/**
 * Builds a layer into an `Effect` value. Any resources associated with this
 * layer will be released when the specified scope is closed unless their scope
 * has been extended. This allows building layers where the lifetime of some of
 * the services output by the layer exceed the lifetime of the effect the
 * layer is provided to.
 *
 * @since 1.0.0
 * @category destructors
 */
export const buildWithScope = internal.buildWithScope;
/**
 * Recovers from all errors.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchAll = internal.catchAll;
/**
 * Recovers from all errors.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchAllCause = internal.catchAllCause;
/**
 * Constructs a `Layer` that passes along the specified context as an
 * output.
 *
 * @since 1.0.0
 * @category constructors
 */
export const context = internal.context;
/**
 * Constructs a layer that dies with the specified defect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const die = internal.die;
/**
 * Constructs a layer that dies with the specified defect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const dieSync = internal.dieSync;
/**
 * Replaces the layer's output with `void` and includes the layer only for its
 * side-effects.
 *
 * @since 1.0.0
 * @category mapping
 */
export const discard = internal.discard;
/**
 * Constructs a layer from the specified effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const effect = internal.fromEffect;
/**
 * Constructs a layer from the specified effect discarding it's output.
 *
 * @since 1.0.0
 * @category constructors
 */
export const effectDiscard = internal.fromEffectDiscard;
/**
 * Constructs a layer from the specified effect, which must return one or more
 * services.
 *
 * @since 1.0.0
 * @category constructors
 */
export const effectContext = internal.fromEffectContext;
/**
 * Extends the scope of this layer, returning a new layer that when provided
 * to an effect will not immediately release its associated resources when
 * that effect completes execution but instead when the scope the resulting
 * effect depends on is closed.
 *
 * @since 1.0.0
 * @category mutations
 */
export const extendScope = internal.extendScope;
/**
 * Constructs a layer that fails with the specified error.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fail = internal.fail;
/**
 * Constructs a layer that fails with the specified error.
 *
 * @since 1.0.0
 * @category constructors
 */
export const failSync = internal.failSync;
/**
 * Constructs a layer that fails with the specified cause.
 *
 * @since 1.0.0
 * @category constructors
 */
export const failCause = internal.failCause;
/**
 * Constructs a layer that fails with the specified cause.
 *
 * @since 1.0.0
 * @category constructors
 */
export const failCauseSync = internal.failCauseSync;
/**
 * Constructs a layer dynamically based on the output of this layer.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flatMap = internal.flatMap;
/**
 * Flattens layers nested in the context of an effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flatten = internal.flatten;
/**
 * Creates a fresh version of this layer that will not be shared.
 *
 * @since 1.0.0
 * @category mutations
 */
export const fresh = internal.fresh;
const fromFunction = internal.fromFunction;
export {
/**
 * Constructs a layer from the context using the specified function.
 *
 * @since 1.0.0
 * @category constructors
 */
fromFunction as function };
/**
 * Builds this layer and uses it until it is interrupted. This is useful when
 * your entire application is a layer, such as an HTTP server.
 *
 * @since 1.0.0
 * @category conversions
 */
export const launch = internal.launch;
/**
 * Returns a new layer whose output is mapped by the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const map = internal.map;
/**
 * Returns a layer with its error channel mapped using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapError = internal.mapError;
/**
 * Feeds the error or output services of this layer into the input of either
 * the specified `failure` or `success` layers, resulting in a new layer with
 * the inputs of this layer, and the error or outputs of the specified layer.
 *
 * @since 1.0.0
 * @category folding
 */
export const matchLayer = internal.matchLayer;
/**
 * Feeds the error or output services of this layer into the input of either
 * the specified `failure` or `success` layers, resulting in a new layer with
 * the inputs of this layer, and the error or outputs of the specified layer.
 *
 * @since 1.0.0
 * @category folding
 */
export const matchCauseLayer = internal.matchCauseLayer;
/**
 * Returns a scoped effect that, if evaluated, will return the lazily computed
 * result of this layer.
 *
 * @since 1.0.0
 * @category mutations
 */
export const memoize = internal.memoize;
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs and outputs of both.
 *
 * @since 1.0.0
 * @category mutations
 */
export const merge = internal.merge;
/**
 * Merges all the layers together in parallel.
 *
 * @since 1.0.0
 * @category zipping
 */
export const mergeAll = internal.mergeAll;
/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the layer.
 *
 * @since 1.0.0
 * @category error handling
 */
export const orDie = internal.orDie;
/**
 * Executes this layer and returns its output, if it succeeds, but otherwise
 * executes the specified layer.
 *
 * @since 1.0.0
 * @category error handling
 */
export const orElse = internal.orElse;
/**
 * Returns a new layer that produces the outputs of this layer but also
 * passes through the inputs.
 *
 * @since 1.0.0
 * @category mutations
 */
export const passthrough = internal.passthrough;
/**
 * Projects out part of one of the services output by this layer using the
 * specified function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const project = internal.project;
/**
 * Feeds the output services of this builder into the input of the specified
 * builder, resulting in a new builder with the inputs of this builder as
 * well as any leftover inputs, and the outputs of the specified builder.
 *
 * @since 1.0.0
 * @category mutations
 */
export const provide = internal.provide;
/**
 * Feeds the output services of this layer into the input of the specified
 * layer, resulting in a new layer with the inputs of this layer, and the
 * outputs of both layers.
 *
 * @since 1.0.0
 * @category mutations
 */
export const provideMerge = internal.provideMerge;
/**
 * Retries constructing this layer according to the specified schedule.
 *
 * @since 1.0.0
 * @category retrying
 */
export const retry = internal.retry;
/**
 * A layer that constructs a scope and closes it when the workflow the layer
 * is provided to completes execution, whether by success, failure, or
 * interruption. This can be used to close a scope when providing a layer to a
 * workflow.
 *
 * @since 1.0.0
 * @category constructors
 */
export const scope = internal.scope;
/**
 * Constructs a layer from the specified scoped effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const scoped = internal.scoped;
/**
 * Constructs a layer from the specified scoped effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const scopedDiscard = internal.scopedDiscard;
/**
 * Constructs a layer from the specified scoped effect, which must return one
 * or more services.
 *
 * @since 1.0.0
 * @category constructors
 */
export const scopedContext = internal.scopedContext;
/**
 * Constructs a layer that accesses and returns the specified service from the
 * context.
 *
 * @since 1.0.0
 * @category constructors
 */
export const service = internal.service;
/**
 * Constructs a layer from the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeed = internal.succeed;
/**
 * Constructs a layer from the specified value, which must return one or more
 * services.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedContext = internal.succeedContext;
/**
 * Lazily constructs a layer. This is useful to avoid infinite recursion when
 * creating layers that refer to themselves.
 *
 * @since 1.0.0
 * @category constructors
 */
export const suspend = internal.suspend;
/**
 * Lazily constructs a layer from the specified value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const sync = internal.sync;
/**
 * Lazily constructs a layer from the specified value, which must return one or more
 * services.
 *
 * @since 1.0.0
 * @category constructors
 */
export const syncContext = internal.syncContext;
/**
 * Performs the specified effect if this layer succeeds.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tap = internal.tap;
/**
 * Performs the specified effect if this layer fails.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapError = internal.tapError;
/**
 * Performs the specified effect if this layer fails.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapErrorCause = internal.tapErrorCause;
/**
 * Converts a layer that requires no services into a scoped runtime, which can
 * be used to execute effects.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toRuntime = internal.toRuntime;
/**
 * Feeds the output services of this builder into the input of the specified
 * builder, resulting in a new builder with the inputs of this builder as
 * well as any leftover inputs, and the outputs of the specified builder.
 *
 * @since 1.0.0
 * @category mutations
 */
export const use = internal.use;
/**
 * Feeds the output services of this layer into the input of the specified
 * layer, resulting in a new layer with the inputs of this layer, and the
 * outputs of both layers.
 *
 * @since 1.0.0
 * @category mutations
 */
export const useMerge = internal.useMerge;
/**
 * Combines this layer the specified layer, producing a new layer that has the
 * inputs of both, and the outputs of both combined using the specified
 * function.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipWithPar = internal.zipWithPar;
//# sourceMappingURL=Layer.mjs.map