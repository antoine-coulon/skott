import { dual } from "@effect/data/Function"
import * as HashSet from "@effect/data/HashSet"
import type * as ConfigProvider from "@effect/io/Config/Provider"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as layer from "@effect/io/internal_effect_untraced/layer"
import * as runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags"
import * as runtimeFlagsPatch from "@effect/io/internal_effect_untraced/runtimeFlagsPatch"
import * as _supervisor from "@effect/io/internal_effect_untraced/supervisor"
import type * as Layer from "@effect/io/Layer"
import type * as Logger from "@effect/io/Logger"
import type * as LogLevel from "@effect/io/Logger/Level"
import type * as Supervisor from "@effect/io/Supervisor"

// circular with Logger

/** @internal */
export const minimumLogLevel = Debug.untracedMethod(() =>
  (level: LogLevel.LogLevel): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.fiberRefLocallyScoped(
        fiberRuntime.currentMinimumLogLevel,
        level
      )
    )
)

/** @internal */
export const withMinimumLogLevel = Debug.dualWithTrace<
  (level: LogLevel.LogLevel) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, level: LogLevel.LogLevel) => Effect.Effect<R, E, A>
>(2, (trace) =>
  (self, level) =>
    core.fiberRefLocally(
      fiberRuntime.currentMinimumLogLevel,
      level
    )(self).traced(trace))

/** @internal */
export const addLogger = Debug.methodWithTrace((trace) =>
  <A>(logger: Logger.Logger<string, A>): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.fiberRefLocallyScopedWith(
        fiberRuntime.currentLoggers,
        HashSet.add(logger)
      ).traced(trace)
    )
)

/** @internal */
export const removeLogger = Debug.untracedMethod(() =>
  <A>(logger: Logger.Logger<string, A>): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.fiberRefLocallyScopedWith(
        fiberRuntime.currentLoggers,
        HashSet.remove(logger)
      )
    )
)

/** @internal */
export const replaceLogger = dual<
  <B>(that: Logger.Logger<string, B>) => <A>(self: Logger.Logger<string, A>) => Layer.Layer<never, never, never>,
  <A, B>(self: Logger.Logger<string, A>, that: Logger.Logger<string, B>) => Layer.Layer<never, never, never>
>(2, (self, that) => layer.flatMap(removeLogger(self), () => addLogger(that)))

/** @internal */
export const addSupervisor = Debug.untracedMethod(() =>
  <A>(supervisor: Supervisor.Supervisor<A>): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.fiberRefLocallyScopedWith(
        fiberRuntime.currentSupervisor,
        (current) => new _supervisor.Zip(current, supervisor)
      )
    )
)

/** @internal */
export const enableCooperativeYielding = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.enable(runtimeFlags.CooperativeYielding)
      )
    )
)

/** @internal */
export const enableInterruption = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.enable(runtimeFlags.Interruption)
      )
    )
)

/** @internal */
export const enableOpSupervision = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.enable(runtimeFlags.OpSupervision)
      )
    )
)

/** @internal */
export const enableRuntimeMetrics = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.enable(runtimeFlags.RuntimeMetrics)
      )
    )
)

/** @internal */
export const enableWindDown = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.enable(runtimeFlags.WindDown)
      )
    )
)

/** @internal */
export const disableCooperativeYielding = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.disable(runtimeFlags.CooperativeYielding)
      )
    )
)

/** @internal */
export const disableInterruption = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.disable(runtimeFlags.Interruption)
      )
    )
)

/** @internal */
export const disableOpSupervision = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.disable(runtimeFlags.OpSupervision)
      )
    )
)

/** @internal */
export const disableRuntimeMetrics = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.disable(runtimeFlags.RuntimeMetrics)
      )
    )
)

/** @internal */
export const disableWindDown = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withRuntimeFlagsScoped(
        runtimeFlagsPatch.disable(runtimeFlags.WindDown)
      )
    )
)

/** @internal */
export const setConfigProvider = Debug.untracedMethod(() =>
  (configProvider: ConfigProvider.ConfigProvider): Layer.Layer<never, never, never> =>
    layer.scopedDiscard(
      fiberRuntime.withConfigProviderScoped(configProvider)
    )
)
