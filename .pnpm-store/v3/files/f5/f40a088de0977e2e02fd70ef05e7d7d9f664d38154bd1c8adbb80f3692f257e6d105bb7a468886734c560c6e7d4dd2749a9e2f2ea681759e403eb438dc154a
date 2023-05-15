import * as Chunk from "@effect/data/Chunk"
import { pipe } from "@effect/data/Function"
import * as Debug from "@effect/io/Debug"
import type * as Effect from "@effect/io/Effect"
import type * as Fiber from "@effect/io/Fiber"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as circular from "@effect/io/internal_effect_untraced/effect/circular"
import * as metric from "@effect/io/internal_effect_untraced/metric"
import * as schedule from "@effect/io/internal_effect_untraced/schedule"
import type * as Metric from "@effect/io/Metric"
import type * as PollingMetric from "@effect/io/Metric/Polling"
import type * as Schedule from "@effect/io/Schedule"
import type * as Scope from "@effect/io/Scope"

/** @internal */
const PollingMetricSymbolKey = "@effect/io/Metric/Polling"

/** @internal */
export const PollingMetricTypeId: PollingMetric.PollingMetricTypeId = Symbol.for(
  PollingMetricSymbolKey
) as PollingMetric.PollingMetricTypeId

/** @internal */
export const make = <Type, In, Out, R, E>(
  metric: Metric.Metric<Type, In, Out>,
  poll: Effect.Effect<R, E, In>
): PollingMetric.PollingMetric<Type, In, R, E, Out> => {
  return {
    [PollingMetricTypeId]: PollingMetricTypeId,
    metric,
    poll: Debug.methodWithTrace((trace) => () => poll.traced(trace))
  }
}

/** @internal */
export const collectAll = <R, E, Out>(
  iterable: Iterable<PollingMetric.PollingMetric<any, any, R, E, Out>>
): PollingMetric.PollingMetric<Chunk.Chunk<any>, Chunk.Chunk<any>, R, E, Chunk.Chunk<Out>> => {
  const metrics = Array.from(iterable)
  return {
    [PollingMetricTypeId]: PollingMetricTypeId,
    metric: metric.make(
      Chunk.of<any>(void 0) as Chunk.Chunk<any>,
      (inputs: Chunk.Chunk<any>, extraTags) => {
        for (let i = 0; i < inputs.length; i++) {
          const pollingMetric = metrics[i]!
          const input = pipe(inputs, Chunk.unsafeGet(i))
          pollingMetric.metric.unsafeUpdate(input, extraTags)
        }
      },
      (extraTags) =>
        Chunk.unsafeFromArray(
          metrics.map((pollingMetric) => pollingMetric.metric.unsafeValue(extraTags))
        )
    ),
    poll: Debug.methodWithTrace((trace) =>
      () =>
        core.forEach(
          metrics,
          (metric) => metric.poll()
        ).traced(trace)
    )
  }
}

/** @internal */
export const launch = Debug.dualWithTrace<
  <R2, A2>(
    schedule: Schedule.Schedule<R2, unknown, A2>
  ) => <Type, In, R, E, Out>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>
  ) => Effect.Effect<R | R2 | Scope.Scope, never, Fiber.Fiber<E, A2>>,
  <Type, In, R, E, Out, R2, A2>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>,
    schedule: Schedule.Schedule<R2, unknown, A2>
  ) => Effect.Effect<R | R2 | Scope.Scope, never, Fiber.Fiber<E, A2>>
>(2, (trace) =>
  (self, schedule) =>
    pipe(
      pollAndUpdate(self),
      core.zipRight(metric.value(self.metric)),
      circular.scheduleForked(schedule)
    ).traced(trace))

/** @internal */
export const poll = Debug.methodWithTrace((trace) =>
  <Type, In, R, E, Out>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>
  ): Effect.Effect<R, E, In> => self.poll().traced(trace)
)

/** @internal */
export const pollAndUpdate = Debug.methodWithTrace((trace) =>
  <Type, In, R, E, Out>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>
  ): Effect.Effect<R, E, void> =>
    core.flatMap(
      self.poll(),
      (value) => pipe(self.metric, metric.update(value))
    ).traced(trace)
)

/** @internal */
export const retry = Debug.untracedDual<
  <R2, E, _>(
    policy: Schedule.Schedule<R2, E, _>
  ) => <Type, In, R, Out>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>
  ) => PollingMetric.PollingMetric<Type, In, R | R2, E, Out>,
  <Type, In, R, Out, R2, E, _>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>,
    policy: Schedule.Schedule<R2, E, _>
  ) => PollingMetric.PollingMetric<Type, In, R | R2, E, Out>
>(2, () =>
  (self, policy) => ({
    [PollingMetricTypeId]: PollingMetricTypeId,
    metric: self.metric,
    poll: Debug.methodWithTrace((trace) =>
      () =>
        pipe(
          self.poll(),
          schedule.retry_Effect(policy)
        ).traced(trace)
    )
  }))

/** @internal */
export const zip = Debug.untracedDual<
  <Type2, In2, R2, E2, Out2>(
    that: PollingMetric.PollingMetric<Type2, In2, R2, E2, Out2>
  ) => <Type, In, R, E, Out>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>
  ) => PollingMetric.PollingMetric<
    readonly [Type, Type2],
    readonly [In, In2],
    R | R2,
    E | E2,
    readonly [Out, Out2]
  >,
  <Type, In, R, E, Out, Type2, In2, R2, E2, Out2>(
    self: PollingMetric.PollingMetric<Type, In, R, E, Out>,
    that: PollingMetric.PollingMetric<Type2, In2, R2, E2, Out2>
  ) => PollingMetric.PollingMetric<
    readonly [Type, Type2],
    readonly [In, In2],
    R | R2,
    E | E2,
    readonly [Out, Out2]
  >
>(2, () =>
  (self, that) => ({
    [PollingMetricTypeId]: PollingMetricTypeId,
    metric: pipe(self.metric, metric.zip(that.metric)),
    poll: Debug.methodWithTrace((trace) =>
      () =>
        core.zip(
          self.poll(),
          that.poll()
        ).traced(trace)
    )
  }))
