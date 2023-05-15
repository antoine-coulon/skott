"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withConfigProvider = exports.withClock = exports.sleep = exports.shuffle = exports.randomWith = exports.nextRange = exports.nextIntBetween = exports.nextInt = exports.nextBoolean = exports.next = exports.liveServices = exports.currentTimeMillis = exports.currentServices = exports.configProviderWith = exports.configOrDie = exports.config = exports.clockWith = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/clock"));
var configProvider = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/configProvider"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var random = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/random"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const liveServices = /*#__PURE__*/Context.add(configProvider.configProviderTag, configProvider.fromEnv())( /*#__PURE__*/Context.add(random.randomTag, random.make(Math.random() * 4294967296 >>> 0))( /*#__PURE__*/Context.add(clock.clockTag, clock.make())( /*#__PURE__*/Context.empty())));
/**
 * The `FiberRef` holding the default `Effect` services.
 *
 * @since 1.0.0
 * @category fiberRefs
 */
exports.liveServices = liveServices;
const currentServices = /*#__PURE__*/core.fiberRefUnsafeMakeContext(liveServices);
// circular with Clock
/** @internal */
exports.currentServices = currentServices;
const currentTimeMillis = /*#__PURE__*/Debug.methodWithTrace(trace => () => clockWith(clock => clock.currentTimeMillis()).traced(trace));
/** @internal */
exports.currentTimeMillis = currentTimeMillis;
const sleep = /*#__PURE__*/Debug.methodWithTrace(trace => duration => clockWith(clock => clock.sleep(duration)).traced(trace));
/** @internal */
exports.sleep = sleep;
const clockWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(clock.clockTag)(services))).traced(trace));
/** @internal */
exports.clockWith = clockWith;
const withClock = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, value) => core.fiberRefLocallyWith(currentServices, Context.add(clock.clockTag, value))(effect).traced(trace));
// circular with ConfigProvider
/** @internal */
exports.withClock = withClock;
const withConfigProvider = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, value) => core.fiberRefLocallyWith(currentServices, Context.add(configProvider.configProviderTag, value))(effect).traced(trace));
/** @internal */
exports.withConfigProvider = withConfigProvider;
const configProviderWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(configProvider.configProviderTag)(services))).traced(trace));
/** @internal */
exports.configProviderWith = configProviderWith;
const config = /*#__PURE__*/Debug.methodWithTrace(trace => config => configProviderWith(_ => _.load(config)).traced(trace));
/** @internal */
exports.config = config;
const configOrDie = /*#__PURE__*/Debug.methodWithTrace(trace => config => core.orDie(configProviderWith(_ => _.load(config))).traced(trace));
// circular with Random
/** @internal */
exports.configOrDie = configOrDie;
const randomWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(random.randomTag)(services))).traced(trace));
/** @internal */
exports.randomWith = randomWith;
const next = /*#__PURE__*/Debug.methodWithTrace(trace => () => randomWith(random => random.next()).traced(trace));
/** @internal */
exports.next = next;
const nextInt = /*#__PURE__*/Debug.methodWithTrace(trace => () => randomWith(random => random.nextInt()).traced(trace));
/** @internal */
exports.nextInt = nextInt;
const nextBoolean = /*#__PURE__*/Debug.methodWithTrace(trace => () => randomWith(random => random.nextBoolean()).traced(trace));
/** @internal */
exports.nextBoolean = nextBoolean;
const nextRange = /*#__PURE__*/Debug.methodWithTrace(trace => (min, max) => randomWith(random => random.nextRange(min, max)).traced(trace));
/** @internal */
exports.nextRange = nextRange;
const nextIntBetween = /*#__PURE__*/Debug.methodWithTrace(trace => (min, max) => randomWith(random => random.nextIntBetween(min, max)).traced(trace));
/** @internal */
exports.nextIntBetween = nextIntBetween;
const shuffle = /*#__PURE__*/Debug.methodWithTrace(trace => elements => randomWith(random => random.shuffle(elements)).traced(trace));
exports.shuffle = shuffle;
//# sourceMappingURL=defaultServices.js.map