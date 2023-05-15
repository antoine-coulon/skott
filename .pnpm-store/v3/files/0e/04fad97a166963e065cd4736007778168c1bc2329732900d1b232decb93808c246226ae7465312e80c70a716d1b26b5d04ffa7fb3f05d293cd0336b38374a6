import * as internal from "@effect/io/internal_effect_untraced/schedule";
/**
 * @since 1.0.0
 * @category symbols
 */
export const ScheduleTypeId = internal.ScheduleTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export const ScheduleDriverTypeId = internal.ScheduleDriverTypeId;
/**
 * Constructs a new `Schedule` with the specified `initial` state and the
 * specified `step` function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const makeWithState = internal.makeWithState;
/**
 * Returns a new schedule with the given delay added to every interval defined
 * by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export const addDelay = internal.addDelay;
/**
 * Returns a new schedule with the given effectfully computed delay added to
 * every interval defined by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export const addDelayEffect = internal.addDelayEffect;
/**
 * The same as `andThenEither`, but merges the output.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const andThen = internal.andThen;
/**
 * Returns a new schedule that first executes this schedule to completion, and
 * then executes the specified schedule to completion.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const andThenEither = internal.andThenEither;
/**
 * Returns a new schedule that maps this schedule to a constant output.
 *
 * @since 1.0.0
 * @category mapping
 */
export const as = internal.as;
/**
 * Returns a new schedule that maps the output of this schedule to unit.
 *
 * @since 1.0.0
 * @category constructors
 */
export const asUnit = internal.asUnit;
/**
 * Returns a new schedule that has both the inputs and outputs of this and the
 * specified schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export const bothInOut = internal.bothInOut;
/**
 * Returns a new schedule that passes each input and output of this schedule
 * to the specified function, and then determines whether or not to continue
 * based on the return value of the function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const check = internal.check;
/**
 * Returns a new schedule that passes each input and output of this schedule
 * to the specified function, and then determines whether or not to continue
 * based on the return value of the function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const checkEffect = internal.checkEffect;
/**
 * Returns a new schedule that allows choosing between feeding inputs to this
 * schedule, or feeding inputs to the specified schedule.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const choose = internal.choose;
/**
 * Returns a new schedule that chooses between two schedules with a common
 * output.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const chooseMerge = internal.chooseMerge;
/**
 * A schedule that recurs anywhere, collecting all inputs into a `Chunk`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllInputs = internal.collectAllInputs;
/**
 * Returns a new schedule that collects the outputs of this one into a chunk.
 *
 * @since 1.0.0
 * @category mutations
 */
export const collectAllOutputs = internal.collectAllOutputs;
/**
 * A schedule that recurs until the condition f fails, collecting all inputs
 * into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
export const collectUntil = internal.collectUntil;
/**
 * A schedule that recurs until the effectful condition f fails, collecting
 * all inputs into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
export const collectUntilEffect = internal.collectUntilEffect;
/**
 * A schedule that recurs as long as the condition f holds, collecting all
 * inputs into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
export const collectWhile = internal.collectWhile;
/**
 * A schedule that recurs as long as the effectful condition holds, collecting
 * all inputs into a list.
 *
 * @category mutations
 * @since 1.0.0
 */
export const collectWhileEffect = internal.collectWhileEffect;
/**
 * Returns the composition of this schedule and the specified schedule, by
 * piping the output of this one into the input of the other. Effects
 * described by this schedule will always be executed before the effects
 * described by the second schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export const compose = internal.compose;
/**
 * Returns a new schedule that deals with a narrower class of inputs than this
 * schedule.
 *
 * @since 1.0.0
 * @category mapping
 */
export const contramap = internal.contramap;
/**
 * Transforms the context being provided to this schedule with the
 * specified function.
 *
 * @since 1.0.0
 * @category context
 */
export const contramapContext = internal.contramapContext;
/**
 * Returns a new schedule that deals with a narrower class of inputs than this
 * schedule.
 *
 * @since 1.0.0
 * @category mapping
 */
export const contramapEffect = internal.contramapEffect;
/**
 * A schedule that always recurs, which counts the number of recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export const count = internal.count;
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
export const dayOfMonth = internal.dayOfMonth;
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
export const dayOfWeek = internal.dayOfWeek;
/**
 * Returns a new schedule with the specified effectfully computed delay added
 * before the start of each interval produced by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export const delayed = internal.delayed;
/**
 * Returns a new schedule with the specified effectfully computed delay added
 * before the start of each interval produced by this schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
export const delayedEffect = internal.delayedEffect;
/**
 * Takes a schedule that produces a delay, and returns a new schedule that
 * uses this delay to further delay intervals in the resulting schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
export const delayedSchedule = internal.delayedSchedule;
/**
 * Returns a new schedule that outputs the delay between each occurence.
 *
 * @since 1.0.0
 * @category constructors
 */
export const delays = internal.delays;
/**
 * Returns a new schedule that contramaps the input and maps the output.
 *
 * @since 1.0.0
 * @category mapping
 */
export const dimap = internal.dimap;
/**
 * Returns a new schedule that contramaps the input and maps the output.
 *
 * @since 1.0.0
 * @category mapping
 */
export const dimapEffect = internal.dimapEffect;
/**
 * Returns a driver that can be used to step the schedule, appropriately
 * handling sleeping.
 *
 * @since 1.0.0
 * @category getter
 */
export const driver = internal.driver;
/**
 * A schedule that can recur one time, the specified amount of time into the
 * future.
 *
 * @since 1.0.0
 * @category constructors
 */
export const duration = internal.duration;
/**
 * Returns a new schedule that performs a geometric union on the intervals
 * defined by both schedules.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const either = internal.either;
/**
 * The same as `either` followed by `map`.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const eitherWith = internal.eitherWith;
/**
 * A schedule that occurs everywhere, which returns the total elapsed duration
 * since the first step.
 *
 * @since 1.0.0
 * @category constructors
 */
export const elapsed = internal.elapsed;
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
export const ensuring = internal.ensuring;
/**
 * A schedule that always recurs, but will wait a certain amount between
 * repetitions, given by `base * factor.pow(n)`, where `n` is the number of
 * repetitions so far. Returns the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export const exponential = internal.exponential;
/**
 * A schedule that always recurs, increasing delays by summing the preceding
 * two delays (similar to the fibonacci sequence). Returns the current
 * duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fibonacci = internal.fibonacci;
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
export const fixed = internal.fixed;
/**
 * A schedule that always recurs, producing a count of repeats: 0, 1, 2.
 *
 * @since 1.0.0
 * @category constructors
 */
export const forever = internal.forever;
/**
 * A schedule that recurs once with the specified delay.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fromDelay = internal.fromDelay;
/**
 * A schedule that recurs once for each of the specified durations, delaying
 * each time for the length of the specified duration. Returns the length of
 * the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fromDelays = internal.fromDelays;
/**
 * A schedule that always recurs, mapping input values through the specified
 * function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fromFunction = internal.fromFunction;
/**
 * Cron-like schedule that recurs every specified `hour` of each day. It
 * triggers at zero minute of the hour. Producing a count of repeats: 0, 1, 2.
 *
 * NOTE: `hour` parameter is validated lazily. Must be in range 0...23.
 *
 * @since 1.0.0
 * @category constructors
 */
export const hourOfDay = internal.hourOfDay;
/**
 * A schedule that always recurs, which returns inputs as outputs.
 *
 * @since 1.0.0
 * @category constructors
 */
export const identity = internal.identity;
/**
 * Returns a new schedule that performs a geometric intersection on the
 * intervals defined by both schedules.
 *
 * @since 1.0.0
 * @category mutations
 */
export const intersect = internal.intersect;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as both schedules want to continue and merging
 * the next intervals according to the specified merge function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const intersectWith = internal.intersectWith;
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
export const jittered = internal.jittered;
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
export const jitteredWith = internal.jitteredWith;
/**
 * Returns a new schedule that makes this schedule available on the `Left`
 * side of an `Either` input, allowing propagating some type `X` through this
 * channel on demand.
 *
 * @since 1.0.0
 * @category mutations
 */
export const left = internal.left;
/**
 * A schedule that always recurs, but will repeat on a linear time interval,
 * given by `base * n` where `n` is the number of repetitions so far. Returns
 * the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
export const linear = internal.linear;
/**
 * Returns a new schedule that maps the output of this schedule through the
 * specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const map = internal.map;
/**
 * Returns a new schedule that maps the output of this schedule through the
 * specified effectful function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapEffect = internal.mapEffect;
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
export const minuteOfHour = internal.minuteOfHour;
/**
 * Returns a new schedule that modifies the delay using the specified
 * function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const modifyDelay = internal.modifyDelay;
/**
 * Returns a new schedule that modifies the delay using the specified
 * effectual function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const modifyDelayEffect = internal.modifyDelayEffect;
/**
 * Returns a new schedule that applies the current one but runs the specified
 * effect for every decision of this schedule. This can be used to create
 * schedules that log failures, decisions, or computed values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const onDecision = internal.onDecision;
/**
 * A schedule that recurs one time.
 *
 * @since 1.0.0
 * @category constructors
 */
export const once = internal.once;
/**
 * Returns a new schedule that passes through the inputs of this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
export const passthrough = internal.passthrough;
/**
 * Returns a new schedule with its context provided to it, so the
 * resulting schedule does not require any context.
 *
 * @since 1.0.0
 * @category context
 */
export const provideContext = internal.provideContext;
/**
 * Returns a new schedule with the single service it requires provided to it.
 * If the schedule requires multiple services use `provideContext`
 * instead.
 *
 * @since 1.0.0
 * @category context
 */
export const provideService = internal.provideService;
/**
 * Returns a new schedule that reconsiders every decision made by this
 * schedule, possibly modifying the next interval and the output type in the
 * process.
 *
 * @since 1.0.0
 * @category mutations
 */
export const reconsider = internal.reconsider;
/**
 * Returns a new schedule that effectfully reconsiders every decision made by
 * this schedule, possibly modifying the next interval and the output type in
 * the process.
 *
 * @since 1.0.0
 * @category mutations
 */
export const reconsiderEffect = internal.reconsiderEffect;
/**
 * A schedule that recurs for until the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurUntil = internal.recurUntil;
/**
 * A schedule that recurs for until the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurUntilEffect = internal.recurUntilEffect;
/**
 * A schedule that recurs for until the predicate is equal.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurUntilEquals = internal.recurUntilEquals;
/**
 * A schedule that recurs for until the input value becomes applicable to
 * partial function and then map that value with given function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurUntilOption = internal.recurUntilOption;
/**
 * A schedule that recurs during the given duration.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurUpTo = internal.recurUpTo;
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurWhile = internal.recurWhile;
/**
 * A schedule that recurs for as long as the effectful predicate evaluates to
 * true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurWhileEffect = internal.recurWhileEffect;
/**
 * A schedule that recurs for as long as the predicate is equal to the
 * specified value.
 *
 * @since 1.0.0
 * @category mutations
 */
export const recurWhileEquals = internal.recurWhileEquals;
/**
 * A schedule spanning all time, which can be stepped only the specified
 * number of times before it terminates.
 *
 * @category constructors
 * @since 1.0.0
 */
export const recurs = internal.recurs;
/**
 * Returns a new schedule that folds over the outputs of this one.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduce = internal.reduce;
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceEffect = internal.reduceEffect;
/**
 * Returns a new schedule that loops this one continuously, resetting the
 * state when this schedule is done.
 *
 * @since 1.0.0
 * @category constructors
 */
export const repeatForever = internal.forever;
/**
 * Returns a new schedule that outputs the number of repetitions of this one.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repetitions = internal.repetitions;
/**
 * Return a new schedule that automatically resets the schedule to its initial
 * state after some time of inactivity defined by `duration`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const resetAfter = internal.resetAfter;
/**
 * Resets the schedule when the specified predicate on the schedule output
 * evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const resetWhen = internal.resetWhen;
/**
 * Returns a new schedule that makes this schedule available on the `Right`
 * side of an `Either` input, allowing propagating some type `X` through this
 * channel on demand.
 *
 * @since 1.0.0
 * @category mutations
 */
export const right = internal.right;
/**
 * Runs a schedule using the provided inputs, and collects all outputs.
 *
 * @since 1.0.0
 * @category destructors
 */
export const run = internal.run;
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
export const secondOfMinute = internal.secondOfMinute;
/**
 * Returns a schedule that recurs continuously, each repetition spaced the
 * specified duration from the last run.
 *
 * @since 1.0.0
 * @category constructors
 */
export const spaced = internal.spaced;
/**
 * A schedule that does not recur, it just stops.
 *
 * @since 1.0.0
 * @category constructors
 */
export const stop = internal.stop;
/**
 * Returns a schedule that repeats one time, producing the specified constant
 * value.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeed = internal.succeed;
/**
 * Returns a schedule that repeats one time, producing the specified constant
 * value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const sync = internal.sync;
/**
 * Returns a new schedule that effectfully processes every input to this
 * schedule.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapInput = internal.tapInput;
/**
 * Returns a new schedule that effectfully processes every output from this
 * schedule.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapOutput = internal.tapOutput;
/**
 * Unfolds a schedule that repeats one time from the specified state and
 * iterator.
 *
 * @since 1.0.0
 * @category constructors
 */
export const unfold = internal.unfold;
/**
 * Returns a new schedule that performs a geometric union on the intervals
 * defined by both schedules.
 *
 * @since 1.0.0
 * @category mutations
 */
export const union = internal.union;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unionWith = internal.unionWith;
/**
 * Returns a new schedule that continues until the specified predicate on the
 * input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const untilInput = internal.untilInput;
/**
 * Returns a new schedule that continues until the specified effectful
 * predicate on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const untilInputEffect = internal.untilInputEffect;
/**
 * Returns a new schedule that continues until the specified predicate on the
 * output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const untilOutput = internal.untilOutput;
/**
 * Returns a new schedule that continues until the specified effectful
 * predicate on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const untilOutputEffect = internal.untilOutputEffect;
/**
 * A schedule that recurs during the given duration.
 *
 * @since 1.0.0
 * @category mutations
 */
export const upTo = internal.upTo;
/**
 * Returns a new schedule that continues for as long the specified predicate
 * on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whileInput = internal.whileInput;
/**
 * Returns a new schedule that continues for as long the specified effectful
 * predicate on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whileInputEffect = internal.whileInputEffect;
/**
 * Returns a new schedule that continues for as long the specified predicate
 * on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whileOutput = internal.whileOutput;
/**
 * Returns a new schedule that continues for as long the specified effectful
 * predicate on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whileOutputEffect = internal.whileOutputEffect;
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
export const windowed = internal.windowed;
/**
 * The same as `intersect` but ignores the right output.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipLeft = internal.zipLeft;
/**
 * The same as `intersect` but ignores the left output.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipRight = internal.zipRight;
/**
 * Equivalent to `intersect` followed by `map`.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipWith = internal.zipWith;
//# sourceMappingURL=Schedule.mjs.map