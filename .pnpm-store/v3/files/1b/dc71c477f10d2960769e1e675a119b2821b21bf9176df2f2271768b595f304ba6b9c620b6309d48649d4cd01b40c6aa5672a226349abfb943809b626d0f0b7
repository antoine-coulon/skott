/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Context from "@effect/data/Context";
import type * as Duration from "@effect/data/Duration";
import type * as Either from "@effect/data/Either";
import type { LazyArg } from "@effect/data/Function";
import type * as Option from "@effect/data/Option";
import type { Predicate } from "@effect/data/Predicate";
import type * as Cause from "@effect/io/Cause";
import type * as Effect from "@effect/io/Effect";
import type * as Random from "@effect/io/Random";
import type * as ScheduleDecision from "@effect/io/Schedule/Decision";
import type * as Interval from "@effect/io/Schedule/Interval";
import type * as Intervals from "@effect/io/Schedule/Intervals";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const ScheduleTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type ScheduleTypeId = typeof ScheduleTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const ScheduleDriverTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type ScheduleDriverTypeId = typeof ScheduleDriverTypeId;
/**
 * A `Schedule<Env, In, Out>` defines a recurring schedule, which consumes
 * values of type `In`, and which returns values of type `Out`.
 *
 * Schedules are defined as a possibly infinite set of intervals spread out over
 * time. Each interval defines a window in which recurrence is possible.
 *
 * When schedules are used to repeat or retry effects, the starting boundary of
 * each interval produced by a schedule is used as the moment when the effect
 * will be executed again.
 *
 * Schedules compose in the following primary ways:
 *
 * - Union: performs the union of the intervals of two schedules
 * - Intersection: performs the intersection of the intervals of two schedules
 * - Sequence: concatenates the intervals of one schedule onto another
 *
 * In addition, schedule inputs and outputs can be transformed, filtered (to
 * terminate a schedule early in response to some input or output), and so
 * forth.
 *
 * A variety of other operators exist for transforming and combining schedules,
 * and the companion object for `Schedule` contains all common types of
 * schedules, both for performing retrying, as well as performing repetition.
 *
 * @category model
 * @since 1.0.0
 */
export interface Schedule<Env, In, Out> extends Schedule.Variance<Env, In, Out> {
    /**
     * Initial State
     */
    readonly initial: any;
    /**
     * Schedule Step
     */
    readonly step: (now: number, input: In, state: any) => Effect.Effect<Env, never, readonly [any, Out, ScheduleDecision.ScheduleDecision]>;
}
/**
 * @since 1.0.0
 */
export declare namespace Schedule {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Variance<Env, In, Out> {
        readonly [ScheduleTypeId]: {
            readonly _Env: (_: never) => Env;
            readonly _In: (_: In) => void;
            readonly _Out: (_: never) => Out;
        };
    }
    interface DriverVariance<Env, In, Out> {
        readonly [ScheduleDriverTypeId]: {
            readonly _Env: (_: never) => Env;
            readonly _In: (_: In) => void;
            readonly _Out: (_: never) => Out;
        };
    }
}
/**
 * @since 1.0.0
 * @category models
 */
export interface ScheduleDriver<Env, In, Out> extends Schedule.DriverVariance<Env, In, Out> {
    state(): Effect.Effect<never, never, unknown>;
    last(): Effect.Effect<never, Cause.NoSuchElementException, Out>;
    reset(): Effect.Effect<never, never, void>;
    next(input: In): Effect.Effect<Env, Option.Option<never>, Out>;
}
/**
 * Constructs a new `Schedule` with the specified `initial` state and the
 * specified `step` function.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeWithState: <S, Env, In, Out>(initial: S, step: (now: number, input: In, state: S) => Effect.Effect<Env, never, readonly [S, Out, ScheduleDecision.ScheduleDecision]>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule with the given delay added to every interval defined
 * by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const addDelay: {
    <Out>(f: (out: Out) => Duration.Duration): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: (out: Out) => Duration.Duration): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule with the given effectfully computed delay added to
 * every interval defined by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const addDelayEffect: {
    <Out, Env2>(f: (out: Out) => Effect.Effect<Env2, never, Duration.Duration>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2>(self: Schedule<Env, In, Out>, f: (out: Out) => Effect.Effect<Env2, never, Duration.Duration>): Schedule<Env | Env2, In, Out>;
};
/**
 * The same as `andThenEither`, but merges the output.
 *
 * @since 1.0.0
 * @category sequencing
 */
export declare const andThen: {
    <Env1, In1, Out2>(that: Schedule<Env1, In1, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env1 | Env, In & In1, Out2 | Out>;
    <Env, In, Out, Env1, In1, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out2>): Schedule<Env | Env1, In & In1, Out | Out2>;
};
/**
 * Returns a new schedule that first executes this schedule to completion, and
 * then executes the specified schedule to completion.
 *
 * @since 1.0.0
 * @category sequencing
 */
export declare const andThenEither: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, Either.Either<Out, Out2>>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, In & In2, Either.Either<Out, Out2>>;
};
/**
 * Returns a new schedule that maps this schedule to a constant output.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const as: {
    <Out2>(out: Out2): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out2>;
    <Env, In, Out, Out2>(self: Schedule<Env, In, Out>, out: Out2): Schedule<Env, In, Out2>;
};
/**
 * Returns a new schedule that maps the output of this schedule to unit.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const asUnit: <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, void>;
/**
 * Returns a new schedule that has both the inputs and outputs of this and the
 * specified schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const bothInOut: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, readonly [In, In2], readonly [Out, Out2]>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, readonly [In, In2], readonly [Out, Out2]>;
};
/**
 * Returns a new schedule that passes each input and output of this schedule
 * to the specified function, and then determines whether or not to continue
 * based on the return value of the function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const check: {
    <In, Out>(test: (input: In, output: Out) => boolean): <Env>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, test: (input: In, output: Out) => boolean): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that passes each input and output of this schedule
 * to the specified function, and then determines whether or not to continue
 * based on the return value of the function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const checkEffect: {
    <In, Out, Env2>(test: (input: In, output: Out) => Effect.Effect<Env2, never, boolean>): <Env>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2>(self: Schedule<Env, In, Out>, test: (input: In, output: Out) => Effect.Effect<Env2, never, boolean>): Schedule<Env | Env2, In, Out>;
};
/**
 * Returns a new schedule that allows choosing between feeding inputs to this
 * schedule, or feeding inputs to the specified schedule.
 *
 * @since 1.0.0
 * @category alternatives
 */
export declare const choose: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, Either.Either<In, In2>, Either.Either<Out, Out2>>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, Either.Either<In, In2>, Either.Either<Out, Out2>>;
};
/**
 * Returns a new schedule that chooses between two schedules with a common
 * output.
 *
 * @since 1.0.0
 * @category alternatives
 */
export declare const chooseMerge: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, Either.Either<In, In2>, Out2 | Out>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, Either.Either<In, In2>, Out | Out2>;
};
/**
 * A schedule that recurs anywhere, collecting all inputs into a `Chunk`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const collectAllInputs: <A>() => Schedule<never, A, Chunk.Chunk<A>>;
/**
 * Returns a new schedule that collects the outputs of this one into a chunk.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const collectAllOutputs: <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Chunk.Chunk<Out>>;
/**
 * A schedule that recurs until the condition f fails, collecting all inputs
 * into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const collectUntil: <A>(f: Predicate<A>) => Schedule<never, A, Chunk.Chunk<A>>;
/**
 * A schedule that recurs until the effectful condition f fails, collecting
 * all inputs into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const collectUntilEffect: <Env, A>(f: (a: A) => Effect.Effect<Env, never, boolean>) => Schedule<Env, A, Chunk.Chunk<A>>;
/**
 * A schedule that recurs as long as the condition f holds, collecting all
 * inputs into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const collectWhile: <A>(f: Predicate<A>) => Schedule<never, A, Chunk.Chunk<A>>;
/**
 * A schedule that recurs as long as the effectful condition holds, collecting
 * all inputs into a list.
 *
 * @category mutations
 * @since 1.0.0
 */
export declare const collectWhileEffect: <Env, A>(f: (a: A) => Effect.Effect<Env, never, boolean>) => Schedule<Env, A, Chunk.Chunk<A>>;
/**
 * Returns the composition of this schedule and the specified schedule, by
 * piping the output of this one into the input of the other. Effects
 * described by this schedule will always be executed before the effects
 * described by the second schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const compose: {
    <Env2, Out, Out2>(that: Schedule<Env2, Out, Out2>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out2>;
    <Env, In, Out, Env2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, Out, Out2>): Schedule<Env | Env2, In, Out2>;
};
/**
 * Returns a new schedule that deals with a narrower class of inputs than this
 * schedule.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const contramap: {
    <In, In2>(f: (in2: In2) => In): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In2, Out>;
    <Env, In, Out, In2>(self: Schedule<Env, In, Out>, f: (in2: In2) => In): Schedule<Env, In2, Out>;
};
/**
 * Transforms the context being provided to this schedule with the
 * specified function.
 *
 * @since 1.0.0
 * @category context
 */
export declare const contramapContext: {
    <Env0, Env>(f: (env0: Context.Context<Env0>) => Context.Context<Env>): <In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env0, In, Out>;
    <Env0, Env, In, Out>(self: Schedule<Env, In, Out>, f: (env0: Context.Context<Env0>) => Context.Context<Env>): Schedule<Env0, In, Out>;
};
/**
 * Returns a new schedule that deals with a narrower class of inputs than this
 * schedule.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const contramapEffect: {
    <In, Env2, In2>(f: (in2: In2) => Effect.Effect<Env2, never, In>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In2, Out>;
    <Env, In, Out, Env2, In2>(self: Schedule<Env, In, Out>, f: (in2: In2) => Effect.Effect<Env2, never, In>): Schedule<Env | Env2, In2, Out>;
};
/**
 * A schedule that always recurs, which counts the number of recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const count: (_: void) => Schedule<never, unknown, number>;
/**
 * Cron-like schedule that recurs every specified `day` of month. Won't recur
 * on months containing less days than specified in `day` param.
 *
 * It triggers at zero hour of the day. Producing a count of repeats: 0, 1, 2.
 *
 * NOTE: `day` parameter is validated lazily. Must be in range 1...31.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const dayOfMonth: (day: number) => Schedule<never, unknown, number>;
/**
 * Cron-like schedule that recurs every specified `day` of each week. It
 * triggers at zero hour of the week. Producing a count of repeats: 0, 1, 2.
 *
 * NOTE: `day` parameter is validated lazily. Must be in range 1 (Monday)...7
 * (Sunday).
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const dayOfWeek: (day: number) => Schedule<never, unknown, number>;
/**
 * Returns a new schedule with the specified effectfully computed delay added
 * before the start of each interval produced by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const delayed: {
    (f: (duration: Duration.Duration) => Duration.Duration): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: (duration: Duration.Duration) => Duration.Duration): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule with the specified effectfully computed delay added
 * before the start of each interval produced by this schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const delayedEffect: {
    <Env2>(f: (duration: Duration.Duration) => Effect.Effect<Env2, never, Duration.Duration>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2>(self: Schedule<Env, In, Out>, f: (duration: Duration.Duration) => Effect.Effect<Env2, never, Duration.Duration>): Schedule<Env | Env2, In, Out>;
};
/**
 * Takes a schedule that produces a delay, and returns a new schedule that
 * uses this delay to further delay intervals in the resulting schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const delayedSchedule: <Env, In>(schedule: Schedule<Env, In, Duration.Duration>) => Schedule<Env, In, Duration.Duration>;
/**
 * Returns a new schedule that outputs the delay between each occurence.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const delays: <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Duration.Duration>;
/**
 * Returns a new schedule that contramaps the input and maps the output.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const dimap: {
    <In, Out, In2, Out2>(f: (in2: In2) => In, g: (out: Out) => Out2): <Env>(self: Schedule<Env, In, Out>) => Schedule<Env, In2, Out2>;
    <Env, In, Out, In2, Out2>(self: Schedule<Env, In, Out>, f: (in2: In2) => In, g: (out: Out) => Out2): Schedule<Env, In2, Out2>;
};
/**
 * Returns a new schedule that contramaps the input and maps the output.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const dimapEffect: {
    <In2, Env2, In, Out, Env3, Out2>(f: (input: In2) => Effect.Effect<Env2, never, In>, g: (out: Out) => Effect.Effect<Env3, never, Out2>): <Env>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env3 | Env, In2, Out2>;
    <Env, In, Out, In2, Env2, Env3, Out2>(self: Schedule<Env, In, Out>, f: (input: In2) => Effect.Effect<Env2, never, In>, g: (out: Out) => Effect.Effect<Env3, never, Out2>): Schedule<Env | Env2 | Env3, In2, Out2>;
};
/**
 * Returns a driver that can be used to step the schedule, appropriately
 * handling sleeping.
 *
 * @since 1.0.0
 * @category getter
 */
export declare const driver: <Env, In, Out>(self: Schedule<Env, In, Out>) => Effect.Effect<never, never, ScheduleDriver<Env, In, Out>>;
/**
 * A schedule that can recur one time, the specified amount of time into the
 * future.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const duration: (duration: Duration.Duration) => Schedule<never, unknown, Duration.Duration>;
/**
 * Returns a new schedule that performs a geometric union on the intervals
 * defined by both schedules.
 *
 * @since 1.0.0
 * @category alternatives
 */
export declare const either: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, readonly [Out, Out2]>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, In & In2, readonly [Out, Out2]>;
};
/**
 * The same as `either` followed by `map`.
 *
 * @since 1.0.0
 * @category alternatives
 */
export declare const eitherWith: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>, f: (x: Intervals.Intervals, y: Intervals.Intervals) => Intervals.Intervals): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, readonly [Out, Out2]>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>, f: (x: Intervals.Intervals, y: Intervals.Intervals) => Intervals.Intervals): Schedule<Env | Env2, In & In2, readonly [Out, Out2]>;
};
/**
 * A schedule that occurs everywhere, which returns the total elapsed duration
 * since the first step.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const elapsed: (_: void) => Schedule<never, unknown, Duration.Duration>;
/**
 * Returns a new schedule that will run the specified finalizer as soon as the
 * schedule is complete. Note that unlike `Effect.ensuring`, this method does not
 * guarantee the finalizer will be run. The `Schedule` may not initialize or
 * the driver of the schedule may not run to completion. However, if the
 * `Schedule` ever decides not to continue, then the finalizer will be run.
 *
 * @since 1.0.0
 * @category finalization
 */
export declare const ensuring: {
    <X>(finalizer: Effect.Effect<never, never, X>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out, X>(self: Schedule<Env, In, Out>, finalizer: Effect.Effect<never, never, X>): Schedule<Env, In, Out>;
};
/**
 * A schedule that always recurs, but will wait a certain amount between
 * repetitions, given by `base * factor.pow(n)`, where `n` is the number of
 * repetitions so far. Returns the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const exponential: (base: Duration.Duration, factor?: number) => Schedule<never, unknown, Duration.Duration>;
/**
 * A schedule that always recurs, increasing delays by summing the preceding
 * two delays (similar to the fibonacci sequence). Returns the current
 * duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fibonacci: (one: Duration.Duration) => Schedule<never, unknown, Duration.Duration>;
/**
 * A schedule that recurs on a fixed interval. Returns the number of
 * repetitions of the schedule so far.
 *
 * If the action run between updates takes longer than the interval, then the
 * action will be run immediately, but re-runs will not "pile up".
 *
 * ```
 * |-----interval-----|-----interval-----|-----interval-----|
 * |---------action--------||action|-----|action|-----------|
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fixed: (interval: Duration.Duration) => Schedule<never, unknown, number>;
/**
 * A schedule that always recurs, producing a count of repeats: 0, 1, 2.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const forever: (_: void) => Schedule<never, unknown, number>;
/**
 * A schedule that recurs once with the specified delay.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromDelay: (delay: Duration.Duration) => Schedule<never, unknown, Duration.Duration>;
/**
 * A schedule that recurs once for each of the specified durations, delaying
 * each time for the length of the specified duration. Returns the length of
 * the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromDelays: (delay: Duration.Duration, ...delays: Array<Duration.Duration>) => Schedule<never, unknown, Duration.Duration>;
/**
 * A schedule that always recurs, mapping input values through the specified
 * function.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromFunction: <A, B>(f: (a: A) => B) => Schedule<never, A, B>;
/**
 * Cron-like schedule that recurs every specified `hour` of each day. It
 * triggers at zero minute of the hour. Producing a count of repeats: 0, 1, 2.
 *
 * NOTE: `hour` parameter is validated lazily. Must be in range 0...23.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const hourOfDay: (hour: number) => Schedule<never, unknown, number>;
/**
 * A schedule that always recurs, which returns inputs as outputs.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const identity: <A>() => Schedule<never, A, A>;
/**
 * Returns a new schedule that performs a geometric intersection on the
 * intervals defined by both schedules.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const intersect: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, readonly [Out, Out2]>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, In & In2, readonly [Out, Out2]>;
};
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as both schedules want to continue and merging
 * the next intervals according to the specified merge function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const intersectWith: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>, f: (x: Intervals.Intervals, y: Intervals.Intervals) => Intervals.Intervals): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, readonly [Out, Out2]>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>, f: (x: Intervals.Intervals, y: Intervals.Intervals) => Intervals.Intervals): Schedule<Env | Env2, In & In2, readonly [Out, Out2]>;
};
/**
 * Returns a new schedule that randomly modifies the size of the intervals of
 * this schedule.
 *
 * Defaults `min` to `0.8` and `max` to `1.2`.
 *
 * The new interval size is between `min * old interval size` and `max * old
 * interval size`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const jittered: <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env | Random.Random, In, Out>;
/**
 * Returns a new schedule that randomly modifies the size of the intervals of
 * this schedule.
 *
 * The new interval size is between `min * old interval size` and `max * old
 * interval size`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const jitteredWith: {
    (options: {
        min?: number;
        max?: number;
    }): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Random.Random | Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, options: {
        min?: number;
        max?: number;
    }): Schedule<Random.Random | Env, In, Out>;
};
/**
 * Returns a new schedule that makes this schedule available on the `Left`
 * side of an `Either` input, allowing propagating some type `X` through this
 * channel on demand.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const left: <Env, In, Out, X>(self: Schedule<Env, In, Out>) => Schedule<Env, Either.Either<In, X>, Either.Either<Out, X>>;
/**
 * A schedule that always recurs, but will repeat on a linear time interval,
 * given by `base * n` where `n` is the number of repetitions so far. Returns
 * the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const linear: (base: Duration.Duration) => Schedule<never, unknown, Duration.Duration>;
/**
 * Returns a new schedule that maps the output of this schedule through the
 * specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const map: {
    <Out, Out2>(f: (out: Out) => Out2): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out2>;
    <Env, In, Out, Out2>(self: Schedule<Env, In, Out>, f: (out: Out) => Out2): Schedule<Env, In, Out2>;
};
/**
 * Returns a new schedule that maps the output of this schedule through the
 * specified effectful function.
 *
 * @since 1.0.0
 * @category mapping
 */
export declare const mapEffect: {
    <Out, Env2, Out2>(f: (out: Out) => Effect.Effect<Env2, never, Out2>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out2>;
    <Env, In, Out, Env2, Out2>(self: Schedule<Env, In, Out>, f: (out: Out) => Effect.Effect<Env2, never, Out2>): Schedule<Env | Env2, In, Out2>;
};
/**
 * Cron-like schedule that recurs every specified `minute` of each hour. It
 * triggers at zero second of the minute. Producing a count of repeats: 0, 1,
 * 2.
 *
 * NOTE: `minute` parameter is validated lazily. Must be in range 0...59.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const minuteOfHour: (minute: number) => Schedule<never, unknown, number>;
/**
 * Returns a new schedule that modifies the delay using the specified
 * function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const modifyDelay: {
    <Out>(f: (out: Out, duration: Duration.Duration) => Duration.Duration): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: (out: Out, duration: Duration.Duration) => Duration.Duration): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that modifies the delay using the specified
 * effectual function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const modifyDelayEffect: {
    <Out, Env2>(f: (out: Out, duration: Duration.Duration) => Effect.Effect<Env2, never, Duration.Duration>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2>(self: Schedule<Env, In, Out>, f: (out: Out, duration: Duration.Duration) => Effect.Effect<Env2, never, Duration.Duration>): Schedule<Env | Env2, In, Out>;
};
/**
 * Returns a new schedule that applies the current one but runs the specified
 * effect for every decision of this schedule. This can be used to create
 * schedules that log failures, decisions, or computed values.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const onDecision: {
    <Out, Env2, X>(f: (out: Out, decision: ScheduleDecision.ScheduleDecision) => Effect.Effect<Env2, never, X>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2, X>(self: Schedule<Env, In, Out>, f: (out: Out, decision: ScheduleDecision.ScheduleDecision) => Effect.Effect<Env2, never, X>): Schedule<Env | Env2, In, Out>;
};
/**
 * A schedule that recurs one time.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const once: (_: void) => Schedule<never, unknown, void>;
/**
 * Returns a new schedule that passes through the inputs of this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const passthrough: <Env, Input, Output>(self: Schedule<Env, Input, Output>) => Schedule<Env, Input, Input>;
/**
 * Returns a new schedule with its context provided to it, so the
 * resulting schedule does not require any context.
 *
 * @since 1.0.0
 * @category context
 */
export declare const provideContext: {
    <Env>(context: Context.Context<Env>): <In, Out>(self: Schedule<Env, In, Out>) => Schedule<never, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, context: Context.Context<Env>): Schedule<never, In, Out>;
};
/**
 * Returns a new schedule with the single service it requires provided to it.
 * If the schedule requires multiple services use `provideContext`
 * instead.
 *
 * @since 1.0.0
 * @category context
 */
export declare const provideService: {
    <T, T1 extends T>(tag: Context.Tag<T>, service: T1): <Env, In, Out>(self: Schedule<T | Env, In, Out>) => Schedule<Exclude<Env, T>, In, Out>;
    <Env, T, In, Out, T1 extends T>(self: Schedule<Env | T, In, Out>, tag: Context.Tag<T>, service: T1): Schedule<Exclude<Env, T>, In, Out>;
};
/**
 * Returns a new schedule that reconsiders every decision made by this
 * schedule, possibly modifying the next interval and the output type in the
 * process.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const reconsider: {
    <Out, Out2>(f: (out: Out, decision: ScheduleDecision.ScheduleDecision) => Either.Either<Out2, readonly [Out2, Interval.Interval]>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out2>;
    <Env, In, Out, Out2>(self: Schedule<Env, In, Out>, f: (out: Out, decision: ScheduleDecision.ScheduleDecision) => Either.Either<Out2, readonly [Out2, Interval.Interval]>): Schedule<Env, In, Out2>;
};
/**
 * Returns a new schedule that effectfully reconsiders every decision made by
 * this schedule, possibly modifying the next interval and the output type in
 * the process.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const reconsiderEffect: {
    <Out, Env2, Out2>(f: (out: Out, decision: ScheduleDecision.ScheduleDecision) => Effect.Effect<Env2, never, Either.Either<Out2, readonly [Out2, Interval.Interval]>>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out2>;
    <Env, In, Out, Env2, Out2>(self: Schedule<Env, In, Out>, f: (out: Out, decision: ScheduleDecision.ScheduleDecision) => Effect.Effect<Env2, never, Either.Either<Out2, readonly [Out2, Interval.Interval]>>): Schedule<Env | Env2, In, Out2>;
};
/**
 * A schedule that recurs for until the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurUntil: <A>(f: Predicate<A>) => Schedule<never, A, A>;
/**
 * A schedule that recurs for until the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurUntilEffect: <Env, A>(f: (a: A) => Effect.Effect<Env, never, boolean>) => Schedule<Env, A, A>;
/**
 * A schedule that recurs for until the predicate is equal.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurUntilEquals: <A>(value: A) => Schedule<never, A, A>;
/**
 * A schedule that recurs for until the input value becomes applicable to
 * partial function and then map that value with given function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurUntilOption: <A, B>(pf: (a: A) => Option.Option<B>) => Schedule<never, A, Option.Option<B>>;
/**
 * A schedule that recurs during the given duration.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurUpTo: (duration: Duration.Duration) => Schedule<never, unknown, Duration.Duration>;
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurWhile: <A>(f: Predicate<A>) => Schedule<never, A, A>;
/**
 * A schedule that recurs for as long as the effectful predicate evaluates to
 * true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurWhileEffect: <Env, A>(f: (a: A) => Effect.Effect<Env, never, boolean>) => Schedule<Env, A, A>;
/**
 * A schedule that recurs for as long as the predicate is equal to the
 * specified value.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const recurWhileEquals: <A>(value: A) => Schedule<never, A, A>;
/**
 * A schedule spanning all time, which can be stepped only the specified
 * number of times before it terminates.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const recurs: (n: number) => Schedule<never, unknown, number>;
/**
 * Returns a new schedule that folds over the outputs of this one.
 *
 * @since 1.0.0
 * @category folding
 */
export declare const reduce: {
    <Out, Z>(zero: Z, f: (z: Z, out: Out) => Z): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Z>;
    <Env, In, Out, Z>(self: Schedule<Env, In, Out>, zero: Z, f: (z: Z, out: Out) => Z): Schedule<Env, In, Z>;
};
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 *
 * @since 1.0.0
 * @category folding
 */
export declare const reduceEffect: {
    <Out, Env1, Z>(zero: Z, f: (z: Z, out: Out) => Effect.Effect<Env1, never, Z>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env1 | Env, In, Z>;
    <Env, In, Out, Env1, Z>(self: Schedule<Env, In, Out>, zero: Z, f: (z: Z, out: Out) => Effect.Effect<Env1, never, Z>): Schedule<Env | Env1, In, Z>;
};
/**
 * Returns a new schedule that loops this one continuously, resetting the
 * state when this schedule is done.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const repeatForever: (_: void) => Schedule<never, unknown, number>;
/**
 * Returns a new schedule that outputs the number of repetitions of this one.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const repetitions: <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, number>;
/**
 * Return a new schedule that automatically resets the schedule to its initial
 * state after some time of inactivity defined by `duration`.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const resetAfter: {
    (duration: Duration.Duration): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, duration: Duration.Duration): Schedule<Env, In, Out>;
};
/**
 * Resets the schedule when the specified predicate on the schedule output
 * evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const resetWhen: {
    <Out>(f: Predicate<Out>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: Predicate<Out>): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that makes this schedule available on the `Right`
 * side of an `Either` input, allowing propagating some type `X` through this
 * channel on demand.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const right: <Env, In, Out, X>(self: Schedule<Env, In, Out>) => Schedule<Env, Either.Either<X, In>, Either.Either<X, Out>>;
/**
 * Runs a schedule using the provided inputs, and collects all outputs.
 *
 * @since 1.0.0
 * @category destructors
 */
export declare const run: {
    <In>(now: number, input: Iterable<In>): <Env, Out>(self: Schedule<Env, In, Out>) => Effect.Effect<Env, never, Chunk.Chunk<Out>>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, now: number, input: Iterable<In>): Effect.Effect<Env, never, Chunk.Chunk<Out>>;
};
/**
 * Cron-like schedule that recurs every specified `second` of each minute. It
 * triggers at zero nanosecond of the second. Producing a count of repeats: 0,
 * 1, 2.
 *
 * NOTE: `second` parameter is validated lazily. Must be in range 0...59.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const secondOfMinute: (second: number) => Schedule<never, unknown, number>;
/**
 * Returns a schedule that recurs continuously, each repetition spaced the
 * specified duration from the last run.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const spaced: (duration: Duration.Duration) => Schedule<never, unknown, number>;
/**
 * A schedule that does not recur, it just stops.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const stop: (_: void) => Schedule<never, unknown, void>;
/**
 * Returns a schedule that repeats one time, producing the specified constant
 * value.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const succeed: <A>(value: A) => Schedule<never, unknown, A>;
/**
 * Returns a schedule that repeats one time, producing the specified constant
 * value.
 *
 * @category constructors
 * @since 1.0.0
 */
export declare const sync: <A>(evaluate: LazyArg<A>) => Schedule<never, unknown, A>;
/**
 * Returns a new schedule that effectfully processes every input to this
 * schedule.
 *
 * @since 1.0.0
 * @category sequencing
 */
export declare const tapInput: {
    <Env2, In2, X>(f: (input: In2) => Effect.Effect<Env2, never, X>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, Out>;
    <Env, In, Out, Env2, In2, X>(self: Schedule<Env, In, Out>, f: (input: In2) => Effect.Effect<Env2, never, X>): Schedule<Env | Env2, In & In2, Out>;
};
/**
 * Returns a new schedule that effectfully processes every output from this
 * schedule.
 *
 * @since 1.0.0
 * @category sequencing
 */
export declare const tapOutput: {
    <Out, Env2, X>(f: (out: Out) => Effect.Effect<Env2, never, X>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2, X>(self: Schedule<Env, In, Out>, f: (out: Out) => Effect.Effect<Env2, never, X>): Schedule<Env | Env2, In, Out>;
};
/**
 * Unfolds a schedule that repeats one time from the specified state and
 * iterator.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const unfold: <A>(initial: A, f: (a: A) => A) => Schedule<never, unknown, A>;
/**
 * Returns a new schedule that performs a geometric union on the intervals
 * defined by both schedules.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const union: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, readonly [Out, Out2]>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, In & In2, readonly [Out, Out2]>;
};
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const unionWith: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>, f: (x: Intervals.Intervals, y: Intervals.Intervals) => Intervals.Intervals): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, readonly [Out, Out2]>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>, f: (x: Intervals.Intervals, y: Intervals.Intervals) => Intervals.Intervals): Schedule<Env | Env2, In & In2, readonly [Out, Out2]>;
};
/**
 * Returns a new schedule that continues until the specified predicate on the
 * input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const untilInput: {
    <In>(f: Predicate<In>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: Predicate<In>): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that continues until the specified effectful
 * predicate on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const untilInputEffect: {
    <In, Env2>(f: (input: In) => Effect.Effect<Env2, never, boolean>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2>(self: Schedule<Env, In, Out>, f: (input: In) => Effect.Effect<Env2, never, boolean>): Schedule<Env | Env2, In, Out>;
};
/**
 * Returns a new schedule that continues until the specified predicate on the
 * output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const untilOutput: {
    <Out>(f: Predicate<Out>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: Predicate<Out>): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that continues until the specified effectful
 * predicate on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const untilOutputEffect: {
    <Out, Env2>(f: (out: Out) => Effect.Effect<Env2, never, boolean>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2>(self: Schedule<Env, In, Out>, f: (out: Out) => Effect.Effect<Env2, never, boolean>): Schedule<Env | Env2, In, Out>;
};
/**
 * A schedule that recurs during the given duration.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const upTo: {
    (duration: Duration.Duration): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, duration: Duration.Duration): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that continues for as long the specified predicate
 * on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const whileInput: {
    <In>(f: Predicate<In>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: Predicate<In>): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that continues for as long the specified effectful
 * predicate on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const whileInputEffect: {
    <In, Env2>(f: (input: In) => Effect.Effect<Env2, never, boolean>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In, Out>;
    <Env, In, Out, Env2>(self: Schedule<Env, In, Out>, f: (input: In) => Effect.Effect<Env2, never, boolean>): Schedule<Env | Env2, In, Out>;
};
/**
 * Returns a new schedule that continues for as long the specified predicate
 * on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const whileOutput: {
    <Out>(f: Predicate<Out>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
    <Env, In, Out>(self: Schedule<Env, In, Out>, f: Predicate<Out>): Schedule<Env, In, Out>;
};
/**
 * Returns a new schedule that continues for as long the specified effectful
 * predicate on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const whileOutputEffect: {
    <Out, Env1>(f: (out: Out) => Effect.Effect<Env1, never, boolean>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env1 | Env, In, Out>;
    <Env, In, Out, Env1>(self: Schedule<Env, In, Out>, f: (out: Out) => Effect.Effect<Env1, never, boolean>): Schedule<Env | Env1, In, Out>;
};
/**
 * A schedule that divides the timeline to `interval`-long windows, and sleeps
 * until the nearest window boundary every time it recurs.
 *
 * For example, `windowed(Duration.seconds(10))` would produce a schedule as
 * follows:
 *
 * ```
 *      10s        10s        10s       10s
 * |----------|----------|----------|----------|
 * |action------|sleep---|act|-sleep|action----|
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const windowed: (interval: Duration.Duration) => Schedule<never, unknown, number>;
/**
 * The same as `intersect` but ignores the right output.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipLeft: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, Out>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, In & In2, Out>;
};
/**
 * The same as `intersect` but ignores the left output.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipRight: {
    <Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, Out2>;
    <Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env | Env2, In & In2, Out2>;
};
/**
 * Equivalent to `intersect` followed by `map`.
 *
 * @since 1.0.0
 * @category zipping
 */
export declare const zipWith: {
    <Env2, In2, Out2, Out, Out3>(that: Schedule<Env2, In2, Out2>, f: (out: Out, out2: Out2) => Out3): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env2 | Env, In & In2, Out3>;
    <Env, In, Out, Env2, In2, Out2, Out3>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>, f: (out: Out, out2: Out2) => Out3): Schedule<Env | Env2, In & In2, Out3>;
};
//# sourceMappingURL=Schedule.d.ts.map