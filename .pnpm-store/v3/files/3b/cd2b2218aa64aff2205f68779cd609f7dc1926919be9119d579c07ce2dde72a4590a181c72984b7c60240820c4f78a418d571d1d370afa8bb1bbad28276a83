import * as Chunk from "@effect/data/Chunk";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as circular from "@effect/io/internal_effect_untraced/effect/circular";
import * as metric from "@effect/io/internal_effect_untraced/metric";
import * as schedule from "@effect/io/internal_effect_untraced/schedule";
/** @internal */
const PollingMetricSymbolKey = "@effect/io/Metric/Polling";
/** @internal */
export const PollingMetricTypeId = /*#__PURE__*/Symbol.for(PollingMetricSymbolKey);
/** @internal */
export const make = (metric, poll) => {
  return {
    [PollingMetricTypeId]: PollingMetricTypeId,
    metric,
    poll: Debug.methodWithTrace(trace => () => poll.traced(trace))
  };
};
/** @internal */
export const collectAll = iterable => {
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
export const launch = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, schedule) => circular.scheduleForked(schedule)(core.zipRight(metric.value(self.metric))(pollAndUpdate(self))).traced(trace));
/** @internal */
export const poll = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.poll().traced(trace));
/** @internal */
export const pollAndUpdate = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(self.poll(), value => metric.update(value)(self.metric)).traced(trace));
/** @internal */
export const retry = /*#__PURE__*/Debug.untracedDual(2, () => (self, policy) => ({
  [PollingMetricTypeId]: PollingMetricTypeId,
  metric: self.metric,
  poll: Debug.methodWithTrace(trace => () => schedule.retry_Effect(policy)(self.poll()).traced(trace))
}));
/** @internal */
export const zip = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => ({
  [PollingMetricTypeId]: PollingMetricTypeId,
  metric: metric.zip(that.metric)(self.metric),
  poll: Debug.methodWithTrace(trace => () => core.zip(self.poll(), that.poll()).traced(trace))
}));
//# sourceMappingURL=polling.mjs.map