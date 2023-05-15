"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testContext = exports.liveContext = exports.live = void 0;
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var defaultServices = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/defaultServices"));
var layer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer"));
var TestClock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/testClock"));
var TestServices = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/testServices"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const live = /*#__PURE__*/layer.merge(TestServices.testConfigLayer({
  repeats: 100,
  retries: 100,
  samples: 200,
  shrinks: 1000
}))( /*#__PURE__*/layer.merge(layer.provideMerge(TestClock.defaultTestClock)(layer.merge(TestServices.annotationsLayer())(TestServices.liveLayer())))( /*#__PURE__*/layer.merge(TestServices.sizedLayer(100))( /*#__PURE__*/layer.merge(TestServices.liveLayer())( /*#__PURE__*/TestServices.annotationsLayer()))));
/** @internal */
exports.live = live;
const liveContext = /*#__PURE__*/Debug.untracedMethod(() => () => layer.syncContext(() => defaultServices.liveServices));
/** @internal */
exports.liveContext = liveContext;
const testContext = /*#__PURE__*/Debug.untracedMethod(() => () => layer.provideMerge(live)(liveContext()));
exports.testContext = testContext;
//# sourceMappingURL=testEnvironment.js.map