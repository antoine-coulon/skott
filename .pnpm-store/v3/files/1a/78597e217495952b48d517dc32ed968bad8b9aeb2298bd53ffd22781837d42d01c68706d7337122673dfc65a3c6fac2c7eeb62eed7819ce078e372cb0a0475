import * as Debug from "@effect/io/Debug";
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices";
import * as layer from "@effect/io/internal_effect_untraced/layer";
import * as TestClock from "@effect/io/internal_effect_untraced/testing/testClock";
import * as TestServices from "@effect/io/internal_effect_untraced/testing/testServices";
/** @internal */
export const live = /*#__PURE__*/layer.merge(TestServices.testConfigLayer({
  repeats: 100,
  retries: 100,
  samples: 200,
  shrinks: 1000
}))( /*#__PURE__*/layer.merge(layer.provideMerge(TestClock.defaultTestClock)(layer.merge(TestServices.annotationsLayer())(TestServices.liveLayer())))( /*#__PURE__*/layer.merge(TestServices.sizedLayer(100))( /*#__PURE__*/layer.merge(TestServices.liveLayer())( /*#__PURE__*/TestServices.annotationsLayer()))));
/** @internal */
export const liveContext = /*#__PURE__*/Debug.untracedMethod(() => () => layer.syncContext(() => defaultServices.liveServices));
/** @internal */
export const testContext = /*#__PURE__*/Debug.untracedMethod(() => () => layer.provideMerge(live)(liveContext()));
//# sourceMappingURL=testEnvironment.mjs.map