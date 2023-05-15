import * as Context from "@effect/data/Context";
import * as Debug from "@effect/io/Debug";
import * as clock from "@effect/io/internal_effect_untraced/clock";
import * as configProvider from "@effect/io/internal_effect_untraced/configProvider";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as random from "@effect/io/internal_effect_untraced/random";
/** @internal */
export const liveServices = /*#__PURE__*/Context.add(configProvider.configProviderTag, configProvider.fromEnv())( /*#__PURE__*/Context.add(random.randomTag, random.make(Math.random() * 4294967296 >>> 0))( /*#__PURE__*/Context.add(clock.clockTag, clock.make())( /*#__PURE__*/Context.empty())));
/**
 * The `FiberRef` holding the default `Effect` services.
 *
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentServices = /*#__PURE__*/core.fiberRefUnsafeMakeContext(liveServices);
// circular with Clock
/** @internal */
export const currentTimeMillis = /*#__PURE__*/Debug.methodWithTrace(trace => () => clockWith(clock => clock.currentTimeMillis()).traced(trace));
/** @internal */
export const sleep = /*#__PURE__*/Debug.methodWithTrace(trace => duration => clockWith(clock => clock.sleep(duration)).traced(trace));
/** @internal */
export const clockWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(clock.clockTag)(services))).traced(trace));
/** @internal */
export const withClock = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, value) => core.fiberRefLocallyWith(currentServices, Context.add(clock.clockTag, value))(effect).traced(trace));
// circular with ConfigProvider
/** @internal */
export const withConfigProvider = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, value) => core.fiberRefLocallyWith(currentServices, Context.add(configProvider.configProviderTag, value))(effect).traced(trace));
/** @internal */
export const configProviderWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(configProvider.configProviderTag)(services))).traced(trace));
/** @internal */
export const config = /*#__PURE__*/Debug.methodWithTrace(trace => config => configProviderWith(_ => _.load(config)).traced(trace));
/** @internal */
export const configOrDie = /*#__PURE__*/Debug.methodWithTrace(trace => config => core.orDie(configProviderWith(_ => _.load(config))).traced(trace));
// circular with Random
/** @internal */
export const randomWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(random.randomTag)(services))).traced(trace));
/** @internal */
export const next = /*#__PURE__*/Debug.methodWithTrace(trace => () => randomWith(random => random.next()).traced(trace));
/** @internal */
export const nextInt = /*#__PURE__*/Debug.methodWithTrace(trace => () => randomWith(random => random.nextInt()).traced(trace));
/** @internal */
export const nextBoolean = /*#__PURE__*/Debug.methodWithTrace(trace => () => randomWith(random => random.nextBoolean()).traced(trace));
/** @internal */
export const nextRange = /*#__PURE__*/Debug.methodWithTrace(trace => (min, max) => randomWith(random => random.nextRange(min, max)).traced(trace));
/** @internal */
export const nextIntBetween = /*#__PURE__*/Debug.methodWithTrace(trace => (min, max) => randomWith(random => random.nextIntBetween(min, max)).traced(trace));
/** @internal */
export const shuffle = /*#__PURE__*/Debug.methodWithTrace(trace => elements => randomWith(random => random.shuffle(elements)).traced(trace));
//# sourceMappingURL=defaultServices.mjs.map