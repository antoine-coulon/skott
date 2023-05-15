"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.retry = exports.pollAndUpdate = exports.poll = exports.make = exports.launch = exports.collectAll = exports.PollingMetricTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect/circular"));
var metric = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric"));
var schedule = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const PollingMetricSymbolKey = "@effect/io/Metric/Polling";
/** @internal */
const PollingMetricTypeId = /*#__PURE__*/Symbol.for(PollingMetricSymbolKey);
/** @internal */
exports.PollingMetricTypeId = PollingMetricTypeId;
const make = (metric, poll) => {
  return {
    [PollingMetricTypeId]: PollingMetricTypeId,
    metric,
    poll: Debug.methodWithTrace(trace => () => poll.traced(trace))
  };
};
/** @internal */
exports.make = make;
const collectAll = iterable => {
  const metrics = Array.from(iterable);
  return {
    [PollingMetricTypeId]: PollingMetricTypeId,
    metric: metric.make(Chunk.of(void 0), (inputs, extraTags) => {
      for (let i = 0; i < inputs.length; i++) {
        const pollingMetric = metrics[i];
        const input = Chunk.unsafeGet(i)(inputs);
        pollingMetric.metric.unsafeUpdate(input, extraTags);
      }
    }, extraTags => Chunk.unsafeFromArray(metrics.map(pollingMetric => pollingMetric.metric.unsafeValue(extraTags)))),
    poll: Debug.methodWithTrace(trace => () => core.forEach(metrics, metric => metric.poll()).traced(trace))
  };
};
/** @internal */
exports.collectAll = collectAll;
const launch = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, schedule) => circular.scheduleForked(schedule)(core.zipRight(metric.value(self.metric))(pollAndUpdate(self))).traced(trace));
/** @internal */
exports.launch = launch;
const poll = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.poll().traced(trace));
/** @internal */
exports.poll = poll;
const pollAndUpdate = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(self.poll(), value => metric.update(value)(self.metric)).traced(trace));
/** @internal */
exports.pollAndUpdate = pollAndUpdate;
const retry = /*#__PURE__*/Debug.untracedDual(2, () => (self, policy) => ({
  [PollingMetricTypeId]: PollingMetricTypeId,
  metric: self.metric,
  poll: Debug.methodWithTrace(trace => () => schedule.retry_Effect(policy)(self.poll()).traced(trace))
}));
/** @internal */
exports.retry = retry;
const zip = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => ({
  [PollingMetricTypeId]: PollingMetricTypeId,
  metric: metric.zip(that.metric)(self.metric),
  poll: Debug.methodWithTrace(trace => () => core.zip(self.poll(), that.poll()).traced(trace))
}));
exports.zip = zip;
//# sourceMappingURL=polling.js.map