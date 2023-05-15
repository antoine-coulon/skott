"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whileInputEffect = exports.whileInput = exports.upTo = exports.untilOutputEffect = exports.untilOutput = exports.untilInputEffect = exports.untilInput = exports.unionWith = exports.union = exports.unfold = exports.tapOutput = exports.tapInput = exports.sync = exports.succeed = exports.stop = exports.spaced = exports.secondOfMinute = exports.run = exports.right = exports.resetWhen = exports.resetAfter = exports.repetitions = exports.repeatForever = exports.reduceEffect = exports.reduce = exports.recurs = exports.recurWhileEquals = exports.recurWhileEffect = exports.recurWhile = exports.recurUpTo = exports.recurUntilOption = exports.recurUntilEquals = exports.recurUntilEffect = exports.recurUntil = exports.reconsiderEffect = exports.reconsider = exports.provideService = exports.provideContext = exports.passthrough = exports.once = exports.onDecision = exports.modifyDelayEffect = exports.modifyDelay = exports.minuteOfHour = exports.mapEffect = exports.map = exports.makeWithState = exports.linear = exports.left = exports.jitteredWith = exports.jittered = exports.intersectWith = exports.intersect = exports.identity = exports.hourOfDay = exports.fromFunction = exports.fromDelays = exports.fromDelay = exports.forever = exports.fixed = exports.fibonacci = exports.exponential = exports.ensuring = exports.elapsed = exports.eitherWith = exports.either = exports.duration = exports.driver = exports.dimapEffect = exports.dimap = exports.delays = exports.delayedSchedule = exports.delayedEffect = exports.delayed = exports.dayOfWeek = exports.dayOfMonth = exports.count = exports.contramapEffect = exports.contramapContext = exports.contramap = exports.compose = exports.collectWhileEffect = exports.collectWhile = exports.collectUntilEffect = exports.collectUntil = exports.collectAllOutputs = exports.collectAllInputs = exports.chooseMerge = exports.choose = exports.checkEffect = exports.check = exports.bothInOut = exports.asUnit = exports.as = exports.andThenEither = exports.andThen = exports.addDelayEffect = exports.addDelay = exports.ScheduleTypeId = exports.ScheduleDriverTypeId = void 0;
exports.zipWith = exports.zipRight = exports.zipLeft = exports.windowed = exports.whileOutputEffect = exports.whileOutput = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const ScheduleTypeId = internal.ScheduleTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
exports.ScheduleTypeId = ScheduleTypeId;
const ScheduleDriverTypeId = internal.ScheduleDriverTypeId;
/**
 * Constructs a new `Schedule` with the specified `initial` state and the
 * specified `step` function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.ScheduleDriverTypeId = ScheduleDriverTypeId;
const makeWithState = internal.makeWithState;
/**
 * Returns a new schedule with the given delay added to every interval defined
 * by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.makeWithState = makeWithState;
const addDelay = internal.addDelay;
/**
 * Returns a new schedule with the given effectfully computed delay added to
 * every interval defined by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.addDelay = addDelay;
const addDelayEffect = internal.addDelayEffect;
/**
 * The same as `andThenEither`, but merges the output.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.addDelayEffect = addDelayEffect;
const andThen = internal.andThen;
/**
 * Returns a new schedule that first executes this schedule to completion, and
 * then executes the specified schedule to completion.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.andThen = andThen;
const andThenEither = internal.andThenEither;
/**
 * Returns a new schedule that maps this schedule to a constant output.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.andThenEither = andThenEither;
const as = internal.as;
/**
 * Returns a new schedule that maps the output of this schedule to unit.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.as = as;
const asUnit = internal.asUnit;
/**
 * Returns a new schedule that has both the inputs and outputs of this and the
 * specified schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.asUnit = asUnit;
const bothInOut = internal.bothInOut;
/**
 * Returns a new schedule that passes each input and output of this schedule
 * to the specified function, and then determines whether or not to continue
 * based on the return value of the function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.bothInOut = bothInOut;
const check = internal.check;
/**
 * Returns a new schedule that passes each input and output of this schedule
 * to the specified function, and then determines whether or not to continue
 * based on the return value of the function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.check = check;
const checkEffect = internal.checkEffect;
/**
 * Returns a new schedule that allows choosing between feeding inputs to this
 * schedule, or feeding inputs to the specified schedule.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.checkEffect = checkEffect;
const choose = internal.choose;
/**
 * Returns a new schedule that chooses between two schedules with a common
 * output.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.choose = choose;
const chooseMerge = internal.chooseMerge;
/**
 * A schedule that recurs anywhere, collecting all inputs into a `Chunk`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.chooseMerge = chooseMerge;
const collectAllInputs = internal.collectAllInputs;
/**
 * Returns a new schedule that collects the outputs of this one into a chunk.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.collectAllInputs = collectAllInputs;
const collectAllOutputs = internal.collectAllOutputs;
/**
 * A schedule that recurs until the condition f fails, collecting all inputs
 * into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.collectAllOutputs = collectAllOutputs;
const collectUntil = internal.collectUntil;
/**
 * A schedule that recurs until the effectful condition f fails, collecting
 * all inputs into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.collectUntil = collectUntil;
const collectUntilEffect = internal.collectUntilEffect;
/**
 * A schedule that recurs as long as the condition f holds, collecting all
 * inputs into a list.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.collectUntilEffect = collectUntilEffect;
const collectWhile = internal.collectWhile;
/**
 * A schedule that recurs as long as the effectful condition holds, collecting
 * all inputs into a list.
 *
 * @category mutations
 * @since 1.0.0
 */
exports.collectWhile = collectWhile;
const collectWhileEffect = internal.collectWhileEffect;
/**
 * Returns the composition of this schedule and the specified schedule, by
 * piping the output of this one into the input of the other. Effects
 * described by this schedule will always be executed before the effects
 * described by the second schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.collectWhileEffect = collectWhileEffect;
const compose = internal.compose;
/**
 * Returns a new schedule that deals with a narrower class of inputs than this
 * schedule.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.compose = compose;
const contramap = internal.contramap;
/**
 * Transforms the context being provided to this schedule with the
 * specified function.
 *
 * @since 1.0.0
 * @category context
 */
exports.contramap = contramap;
const contramapContext = internal.contramapContext;
/**
 * Returns a new schedule that deals with a narrower class of inputs than this
 * schedule.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.contramapContext = contramapContext;
const contramapEffect = internal.contramapEffect;
/**
 * A schedule that always recurs, which counts the number of recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.contramapEffect = contramapEffect;
const count = internal.count;
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
exports.count = count;
const dayOfMonth = internal.dayOfMonth;
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
exports.dayOfMonth = dayOfMonth;
const dayOfWeek = internal.dayOfWeek;
/**
 * Returns a new schedule with the specified effectfully computed delay added
 * before the start of each interval produced by this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.dayOfWeek = dayOfWeek;
const delayed = internal.delayed;
/**
 * Returns a new schedule with the specified effectfully computed delay added
 * before the start of each interval produced by this schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.delayed = delayed;
const delayedEffect = internal.delayedEffect;
/**
 * Takes a schedule that produces a delay, and returns a new schedule that
 * uses this delay to further delay intervals in the resulting schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.delayedEffect = delayedEffect;
const delayedSchedule = internal.delayedSchedule;
/**
 * Returns a new schedule that outputs the delay between each occurence.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.delayedSchedule = delayedSchedule;
const delays = internal.delays;
/**
 * Returns a new schedule that contramaps the input and maps the output.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.delays = delays;
const dimap = internal.dimap;
/**
 * Returns a new schedule that contramaps the input and maps the output.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.dimap = dimap;
const dimapEffect = internal.dimapEffect;
/**
 * Returns a driver that can be used to step the schedule, appropriately
 * handling sleeping.
 *
 * @since 1.0.0
 * @category getter
 */
exports.dimapEffect = dimapEffect;
const driver = internal.driver;
/**
 * A schedule that can recur one time, the specified amount of time into the
 * future.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.driver = driver;
const duration = internal.duration;
/**
 * Returns a new schedule that performs a geometric union on the intervals
 * defined by both schedules.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.duration = duration;
const either = internal.either;
/**
 * The same as `either` followed by `map`.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.either = either;
const eitherWith = internal.eitherWith;
/**
 * A schedule that occurs everywhere, which returns the total elapsed duration
 * since the first step.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.eitherWith = eitherWith;
const elapsed = internal.elapsed;
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
exports.elapsed = elapsed;
const ensuring = internal.ensuring;
/**
 * A schedule that always recurs, but will wait a certain amount between
 * repetitions, given by `base * factor.pow(n)`, where `n` is the number of
 * repetitions so far. Returns the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.ensuring = ensuring;
const exponential = internal.exponential;
/**
 * A schedule that always recurs, increasing delays by summing the preceding
 * two delays (similar to the fibonacci sequence). Returns the current
 * duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.exponential = exponential;
const fibonacci = internal.fibonacci;
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
exports.fibonacci = fibonacci;
const fixed = internal.fixed;
/**
 * A schedule that always recurs, producing a count of repeats: 0, 1, 2.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fixed = fixed;
const forever = internal.forever;
/**
 * A schedule that recurs once with the specified delay.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.forever = forever;
const fromDelay = internal.fromDelay;
/**
 * A schedule that recurs once for each of the specified durations, delaying
 * each time for the length of the specified duration. Returns the length of
 * the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromDelay = fromDelay;
const fromDelays = internal.fromDelays;
/**
 * A schedule that always recurs, mapping input values through the specified
 * function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromDelays = fromDelays;
const fromFunction = internal.fromFunction;
/**
 * Cron-like schedule that recurs every specified `hour` of each day. It
 * triggers at zero minute of the hour. Producing a count of repeats: 0, 1, 2.
 *
 * NOTE: `hour` parameter is validated lazily. Must be in range 0...23.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromFunction = fromFunction;
const hourOfDay = internal.hourOfDay;
/**
 * A schedule that always recurs, which returns inputs as outputs.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.hourOfDay = hourOfDay;
const identity = internal.identity;
/**
 * Returns a new schedule that performs a geometric intersection on the
 * intervals defined by both schedules.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.identity = identity;
const intersect = internal.intersect;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as both schedules want to continue and merging
 * the next intervals according to the specified merge function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.intersect = intersect;
const intersectWith = internal.intersectWith;
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
exports.intersectWith = intersectWith;
const jittered = internal.jittered;
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
exports.jittered = jittered;
const jitteredWith = internal.jitteredWith;
/**
 * Returns a new schedule that makes this schedule available on the `Left`
 * side of an `Either` input, allowing propagating some type `X` through this
 * channel on demand.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.jitteredWith = jitteredWith;
const left = internal.left;
/**
 * A schedule that always recurs, but will repeat on a linear time interval,
 * given by `base * n` where `n` is the number of repetitions so far. Returns
 * the current duration between recurrences.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.left = left;
const linear = internal.linear;
/**
 * Returns a new schedule that maps the output of this schedule through the
 * specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.linear = linear;
const map = internal.map;
/**
 * Returns a new schedule that maps the output of this schedule through the
 * specified effectful function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.map = map;
const mapEffect = internal.mapEffect;
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
exports.mapEffect = mapEffect;
const minuteOfHour = internal.minuteOfHour;
/**
 * Returns a new schedule that modifies the delay using the specified
 * function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.minuteOfHour = minuteOfHour;
const modifyDelay = internal.modifyDelay;
/**
 * Returns a new schedule that modifies the delay using the specified
 * effectual function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.modifyDelay = modifyDelay;
const modifyDelayEffect = internal.modifyDelayEffect;
/**
 * Returns a new schedule that applies the current one but runs the specified
 * effect for every decision of this schedule. This can be used to create
 * schedules that log failures, decisions, or computed values.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.modifyDelayEffect = modifyDelayEffect;
const onDecision = internal.onDecision;
/**
 * A schedule that recurs one time.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.onDecision = onDecision;
const once = internal.once;
/**
 * Returns a new schedule that passes through the inputs of this schedule.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.once = once;
const passthrough = internal.passthrough;
/**
 * Returns a new schedule with its context provided to it, so the
 * resulting schedule does not require any context.
 *
 * @since 1.0.0
 * @category context
 */
exports.passthrough = passthrough;
const provideContext = internal.provideContext;
/**
 * Returns a new schedule with the single service it requires provided to it.
 * If the schedule requires multiple services use `provideContext`
 * instead.
 *
 * @since 1.0.0
 * @category context
 */
exports.provideContext = provideContext;
const provideService = internal.provideService;
/**
 * Returns a new schedule that reconsiders every decision made by this
 * schedule, possibly modifying the next interval and the output type in the
 * process.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.provideService = provideService;
const reconsider = internal.reconsider;
/**
 * Returns a new schedule that effectfully reconsiders every decision made by
 * this schedule, possibly modifying the next interval and the output type in
 * the process.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.reconsider = reconsider;
const reconsiderEffect = internal.reconsiderEffect;
/**
 * A schedule that recurs for until the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.reconsiderEffect = reconsiderEffect;
const recurUntil = internal.recurUntil;
/**
 * A schedule that recurs for until the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.recurUntil = recurUntil;
const recurUntilEffect = internal.recurUntilEffect;
/**
 * A schedule that recurs for until the predicate is equal.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.recurUntilEffect = recurUntilEffect;
const recurUntilEquals = internal.recurUntilEquals;
/**
 * A schedule that recurs for until the input value becomes applicable to
 * partial function and then map that value with given function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.recurUntilEquals = recurUntilEquals;
const recurUntilOption = internal.recurUntilOption;
/**
 * A schedule that recurs during the given duration.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.recurUntilOption = recurUntilOption;
const recurUpTo = internal.recurUpTo;
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.recurUpTo = recurUpTo;
const recurWhile = internal.recurWhile;
/**
 * A schedule that recurs for as long as the effectful predicate evaluates to
 * true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.recurWhile = recurWhile;
const recurWhileEffect = internal.recurWhileEffect;
/**
 * A schedule that recurs for as long as the predicate is equal to the
 * specified value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.recurWhileEffect = recurWhileEffect;
const recurWhileEquals = internal.recurWhileEquals;
/**
 * A schedule spanning all time, which can be stepped only the specified
 * number of times before it terminates.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.recurWhileEquals = recurWhileEquals;
const recurs = internal.recurs;
/**
 * Returns a new schedule that folds over the outputs of this one.
 *
 * @since 1.0.0
 * @category folding
 */
exports.recurs = recurs;
const reduce = internal.reduce;
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduce = reduce;
const reduceEffect = internal.reduceEffect;
/**
 * Returns a new schedule that loops this one continuously, resetting the
 * state when this schedule is done.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.reduceEffect = reduceEffect;
const repeatForever = internal.forever;
/**
 * Returns a new schedule that outputs the number of repetitions of this one.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatForever = repeatForever;
const repetitions = internal.repetitions;
/**
 * Return a new schedule that automatically resets the schedule to its initial
 * state after some time of inactivity defined by `duration`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repetitions = repetitions;
const resetAfter = internal.resetAfter;
/**
 * Resets the schedule when the specified predicate on the schedule output
 * evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.resetAfter = resetAfter;
const resetWhen = internal.resetWhen;
/**
 * Returns a new schedule that makes this schedule available on the `Right`
 * side of an `Either` input, allowing propagating some type `X` through this
 * channel on demand.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.resetWhen = resetWhen;
const right = internal.right;
/**
 * Runs a schedule using the provided inputs, and collects all outputs.
 *
 * @since 1.0.0
 * @category destructors
 */
exports.right = right;
const run = internal.run;
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
exports.run = run;
const secondOfMinute = internal.secondOfMinute;
/**
 * Returns a schedule that recurs continuously, each repetition spaced the
 * specified duration from the last run.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.secondOfMinute = secondOfMinute;
const spaced = internal.spaced;
/**
 * A schedule that does not recur, it just stops.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.spaced = spaced;
const stop = internal.stop;
/**
 * Returns a schedule that repeats one time, producing the specified constant
 * value.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.stop = stop;
const succeed = internal.succeed;
/**
 * Returns a schedule that repeats one time, producing the specified constant
 * value.
 *
 * @category constructors
 * @since 1.0.0
 */
exports.succeed = succeed;
const sync = internal.sync;
/**
 * Returns a new schedule that effectfully processes every input to this
 * schedule.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.sync = sync;
const tapInput = internal.tapInput;
/**
 * Returns a new schedule that effectfully processes every output from this
 * schedule.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.tapInput = tapInput;
const tapOutput = internal.tapOutput;
/**
 * Unfolds a schedule that repeats one time from the specified state and
 * iterator.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.tapOutput = tapOutput;
const unfold = internal.unfold;
/**
 * Returns a new schedule that performs a geometric union on the intervals
 * defined by both schedules.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unfold = unfold;
const union = internal.union;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.union = union;
const unionWith = internal.unionWith;
/**
 * Returns a new schedule that continues until the specified predicate on the
 * input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unionWith = unionWith;
const untilInput = internal.untilInput;
/**
 * Returns a new schedule that continues until the specified effectful
 * predicate on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.untilInput = untilInput;
const untilInputEffect = internal.untilInputEffect;
/**
 * Returns a new schedule that continues until the specified predicate on the
 * output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.untilInputEffect = untilInputEffect;
const untilOutput = internal.untilOutput;
/**
 * Returns a new schedule that continues until the specified effectful
 * predicate on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.untilOutput = untilOutput;
const untilOutputEffect = internal.untilOutputEffect;
/**
 * A schedule that recurs during the given duration.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.untilOutputEffect = untilOutputEffect;
const upTo = internal.upTo;
/**
 * Returns a new schedule that continues for as long the specified predicate
 * on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.upTo = upTo;
const whileInput = internal.whileInput;
/**
 * Returns a new schedule that continues for as long the specified effectful
 * predicate on the input evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whileInput = whileInput;
const whileInputEffect = internal.whileInputEffect;
/**
 * Returns a new schedule that continues for as long the specified predicate
 * on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whileInputEffect = whileInputEffect;
const whileOutput = internal.whileOutput;
/**
 * Returns a new schedule that continues for as long the specified effectful
 * predicate on the output evaluates to true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whileOutput = whileOutput;
const whileOutputEffect = internal.whileOutputEffect;
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
exports.whileOutputEffect = whileOutputEffect;
const windowed = internal.windowed;
/**
 * The same as `intersect` but ignores the right output.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.windowed = windowed;
const zipLeft = internal.zipLeft;
/**
 * The same as `intersect` but ignores the left output.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipLeft = zipLeft;
const zipRight = internal.zipRight;
/**
 * Equivalent to `intersect` followed by `map`.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipRight = zipRight;
const zipWith = internal.zipWith;
exports.zipWith = zipWith;
//# sourceMappingURL=Schedule.js.map