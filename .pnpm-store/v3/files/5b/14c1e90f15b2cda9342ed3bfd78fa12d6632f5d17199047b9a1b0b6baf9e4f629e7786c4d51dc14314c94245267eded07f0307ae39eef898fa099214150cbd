import * as Context from "@effect/data/Context"
import { pipe } from "@effect/data/Function"
import type * as SortedSet from "@effect/data/SortedSet"
import * as Debug from "@effect/io/Debug"
import type * as DefaultServices from "@effect/io/DefaultServices"
import * as Effect from "@effect/io/Effect"
import type * as Fiber from "@effect/io/Fiber"
import type * as FiberRef from "@effect/io/FiberRef"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as layer from "@effect/io/internal_effect_untraced/layer"
import * as ref from "@effect/io/internal_effect_untraced/ref"
import * as Annotations from "@effect/io/internal_effect_untraced/testing/annotations"
import * as Live from "@effect/io/internal_effect_untraced/testing/live"
import * as Sized from "@effect/io/internal_effect_untraced/testing/sized"
import type * as TestAnnotation from "@effect/io/internal_effect_untraced/testing/testAnnotation"
import * as TestAnnotationMap from "@effect/io/internal_effect_untraced/testing/testAnnotationMap"
import * as TestConfig from "@effect/io/internal_effect_untraced/testing/testConfig"
import type * as Layer from "@effect/io/Layer"
import type * as Scope from "@effect/io/Scope"

/** @internal */
export type TestServices =
  | Annotations.Annotations
  | Live.Live
  | Sized.Sized
  | TestConfig.TestConfig

/**
 * The default Effect test services.
 *
 * @internal
 */
export const liveServices: Context.Context<TestServices> = pipe(
  Context.make(Annotations.Tag, Annotations.make(ref.unsafeMake(TestAnnotationMap.empty()))),
  Context.add(Live.Tag, Live.make(defaultServices.liveServices)),
  Context.add(Sized.Tag, Sized.make(100)),
  Context.add(TestConfig.Tag, TestConfig.make({ repeats: 100, retries: 100, samples: 200, shrinks: 1000 }))
)

/** @internal */
export const currentServices: FiberRef.FiberRef<Context.Context<TestServices>> = core.fiberRefUnsafeMakeContext(
  liveServices
)

/**
 * Retrieves the `Annotations` service for this test.
 *
 * @internal
 */
export const annotations = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Annotations.Annotations> => annotationsWith(core.succeed).traced(trace)
)

/**
 * Retrieves the `Annotations` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
export const annotationsWith = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    f: (annotations: Annotations.Annotations) => Effect.Effect<R, E, A>
  ): Effect.Effect<R, E, A> =>
    core.fiberRefGetWith(
      currentServices,
      (services) => f(pipe(services, Context.get(Annotations.Tag)))
    ).traced(trace)
)

/**
 * Executes the specified workflow with the specified implementation of the
 * annotations service.
 *
 * @internal
 */
export const withAnnotations = Debug.dualWithTrace<
  (annotations: Annotations.Annotations) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, annotations: Annotations.Annotations) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (effect, annotations) =>
    core.fiberRefLocallyWith(
      currentServices,
      Context.add(Annotations.Tag, annotations)
    )(effect).traced(trace))

/**
 * Sets the implementation of the annotations service to the specified value
 * and restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withAnnotationsScoped = Debug.methodWithTrace((trace) =>
  (annotations: Annotations.Annotations): Effect.Effect<Scope.Scope, never, void> =>
    fiberRuntime.fiberRefLocallyScopedWith(
      currentServices,
      Context.add(Annotations.Tag, annotations)
    ).traced(trace)
)

/**
 * Constructs a new `Annotations` service wrapped in a layer.
 *
 * @internal
 */
export const annotationsLayer = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, Annotations.Annotations> =>
    layer.scoped(
      Annotations.Tag,
      pipe(
        core.sync(() => ref.unsafeMake(TestAnnotationMap.empty())),
        core.map(Annotations.make),
        core.tap(withAnnotationsScoped)
      )
    )
)

/**
 * Accesses an `Annotations` instance in the context and retrieves the
 * annotation of the specified type, or its default value if there is none.
 *
 * @internal
 */
export const get = Debug.methodWithTrace((trace) =>
  <A>(key: TestAnnotation.TestAnnotation<A>): Effect.Effect<never, never, A> =>
    annotationsWith((annotations) => annotations.get(key)).traced(trace)
)

/**
 * Accesses an `Annotations` instance in the context and appends the
 * specified annotation to the annotation map.
 *
 * @internal
 */
export const annotate = Debug.methodWithTrace((trace) =>
  <A>(key: TestAnnotation.TestAnnotation<A>, value: A): Effect.Effect<never, never, void> =>
    annotationsWith((annotations) => annotations.annotate(key, value)).traced(trace)
)

/**
 * Returns the set of all fibers in this test.
 *
 * @internal
 */
export const supervisedFibers = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<
    never,
    never,
    SortedSet.SortedSet<Fiber.RuntimeFiber<unknown, unknown>>
  > => annotationsWith((annotations) => annotations.supervisedFibers()).traced(trace)
)

/**
 * Retrieves the `Live` service for this test.
 *
 * @internal
 */
export const live = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Live.Live> => liveWith(core.succeed).traced(trace)
)

/**
 * Retrieves the `Live` service for this test and uses it to run the specified
 * workflow.
 *
 * @internal
 */
export const liveWith = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(f: (live: Live.Live) => Effect.Effect<R, E, A>): Effect.Effect<R, E, A> =>
    core.fiberRefGetWith(
      currentServices,
      (services) => restore(f)(pipe(services, Context.get(Live.Tag)))
    ).traced(trace)
)

/**
 * Executes the specified workflow with the specified implementation of the
 * live service.
 *
 * @internal
 */
export const withLive = Debug.dualWithTrace<
  (live: Live.Live) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, live: Live.Live) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (effect, live) =>
    core.fiberRefLocallyWith(
      currentServices,
      Context.add(Live.Tag, live)
    )(effect).traced(trace))

/**
 * Sets the implementation of the live service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withLiveScoped = Debug.methodWithTrace((trace) =>
  (live: Live.Live): Effect.Effect<Scope.Scope, never, void> =>
    fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Live.Tag, live)).traced(trace)
)

/**
 * Constructs a new `Live` service wrapped in a layer.
 *
 * @internal
 */
export const liveLayer = Debug.untracedMethod(() =>
  (): Layer.Layer<DefaultServices.DefaultServices, never, Live.Live> =>
    layer.scoped(
      Live.Tag,
      pipe(
        core.context<DefaultServices.DefaultServices>(),
        core.map(Live.make),
        core.tap(withLiveScoped)
      )
    )
)

/**
 * Provides a workflow with the "live" default Effect services.
 *
 * @internal
 */
export const provideLive = Debug.methodWithTrace((trace) =>
  <R, E, A>(effect: Effect.Effect<R, E, A>): Effect.Effect<R, E, A> =>
    liveWith((live) => live.provide(effect)).traced(trace)
)

/**
 * Runs a transformation function with the live default Effect services while
 * ensuring that the workflow itself is run with the test services.
 *
 * @internal
 */
export const provideWithLive = Debug.dualWithTrace<
  <R, E, A, R2, E2, A2>(
    f: (effect: Effect.Effect<R, E, A>) => Effect.Effect<R2, E2, A2>
  ) => (self: Effect.Effect<R, E, A>) => Effect.Effect<R | R2, E | E2, A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R, E, A>,
    f: (effect: Effect.Effect<R, E, A>) => Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R | R2, E | E2, A2>
>(2, (trace, restore) =>
  (self, f) =>
    core.fiberRefGetWith(
      defaultServices.currentServices,
      (services) => provideLive(restore(f)(core.fiberRefLocally(defaultServices.currentServices, services)(self)))
    ).traced(trace))

/**
 * Retrieves the `Sized` service for this test.
 *
 * @internal
 */
export const sized = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, Sized.Sized> => sizedWith(core.succeed).traced(trace)
)

/**
 * Retrieves the `Sized` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
export const sizedWith = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(f: (sized: Sized.Sized) => Effect.Effect<R, E, A>): Effect.Effect<R, E, A> =>
    core.fiberRefGetWith(
      currentServices,
      (services) => restore(f)(pipe(services, Context.get(Sized.Tag)))
    ).traced(trace)
)

/**
 * Executes the specified workflow with the specified implementation of the
 * sized service.
 *
 * @internal
 */
export const withSized = Debug.dualWithTrace<
  (sized: Sized.Sized) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, sized: Sized.Sized) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (effect, sized) =>
    core.fiberRefLocallyWith(
      currentServices,
      Context.add(Sized.Tag, sized)
    )(effect).traced(trace))

/**
 * Sets the implementation of the sized service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withSizedScoped = Debug.methodWithTrace((trace) =>
  (sized: Sized.Sized): Effect.Effect<Scope.Scope, never, void> =>
    fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Sized.Tag, sized)).traced(trace)
)

/** @internal */
export const sizedLayer = Debug.untracedMethod(() =>
  (size: number): Layer.Layer<never, never, Sized.Sized> =>
    layer.scoped(
      Sized.Tag,
      pipe(
        fiberRuntime.fiberRefMake(size),
        core.map(Sized.fromFiberRef),
        core.tap(withSizedScoped)
      )
    )
)

/** @internal */
export const size = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, number> => sizedWith((sized) => sized.size()).traced(trace)
)

/** @internal */
export const withSize = Debug.dualWithTrace<
  (size: number) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, size: number) => Effect.Effect<R, E, A>
>(2, (trace) => (effect, size) => sizedWith((sized) => sized.withSize(size)(effect)).traced(trace))

/**
 * Retrieves the `TestConfig` service for this test.
 *
 * @internal
 */
export const testConfig = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, TestConfig.TestConfig> => testConfigWith(core.succeed).traced(trace)
)

/**
 * Retrieves the `TestConfig` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
export const testConfigWith = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(f: (config: TestConfig.TestConfig) => Effect.Effect<R, E, A>): Effect.Effect<R, E, A> =>
    core.fiberRefGetWith(
      currentServices,
      (services) => restore(f)(pipe(services, Context.get(TestConfig.Tag)))
    ).traced(trace)
)

/**
 * Executes the specified workflow with the specified implementation of the
 * config service.
 *
 * @internal
 */
export const withTestConfig = Debug.dualWithTrace<
  (config: TestConfig.TestConfig) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, config: TestConfig.TestConfig) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (effect, config) =>
    core.fiberRefLocallyWith(
      currentServices,
      Context.add(TestConfig.Tag, config)
    )(effect).traced(trace))

/**
 * Sets the implementation of the config service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withTestConfigScoped = Debug.methodWithTrace((trace) =>
  (config: TestConfig.TestConfig): Effect.Effect<Scope.Scope, never, void> =>
    fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(TestConfig.Tag, config)).traced(trace)
)

/**
 * Constructs a new `TestConfig` service with the specified settings.
 *
 * @internal
 */
export const testConfigLayer = Debug.untracedMethod(() =>
  (params: {
    readonly repeats: number
    readonly retries: number
    readonly samples: number
    readonly shrinks: number
  }): Layer.Layer<never, never, TestConfig.TestConfig> =>
    layer.scoped(
      TestConfig.Tag,
      Effect.suspendSucceed(() => {
        const testConfig = TestConfig.make(params)
        return pipe(
          withTestConfigScoped(testConfig),
          core.as(testConfig)
        )
      })
    )
)

/**
 * The number of times to repeat tests to ensure they are stable.
 *
 * @internal
 */
export const repeats = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, number> => testConfigWith((config) => core.succeed(config.repeats)).traced(trace)
)

/**
 * The number of times to retry flaky tests.
 *
 * @internal
 */
export const retries = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, number> => testConfigWith((config) => core.succeed(config.retries)).traced(trace)
)

/**
 * The number of sufficient samples to check for a random variable.
 *
 * @internal
 */
export const samples = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, number> => testConfigWith((config) => core.succeed(config.samples)).traced(trace)
)

/**
 * The maximum number of shrinkings to minimize large failures.
 *
 * @internal
 */
export const shrinks = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<never, never, number> => testConfigWith((config) => core.succeed(config.shrinks)).traced(trace)
)
