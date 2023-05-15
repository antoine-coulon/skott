import type * as MetricKey from "@effect/io/Metric/Key"
import type * as MetricKeyType from "@effect/io/Metric/KeyType"
import type * as MetricPair from "@effect/io/Metric/Pair"
import type * as MetricState from "@effect/io/Metric/State"

/** @internal */
const MetricPairSymbolKey = "@effect/io/Metric/Pair"

/** @internal */
export const MetricPairTypeId: MetricPair.MetricPairTypeId = Symbol.for(
  MetricPairSymbolKey
) as MetricPair.MetricPairTypeId

/** @internal */
const metricPairVariance = {
  _Type: (_: never) => _
}

/** @internal */
export const make = <Type extends MetricKeyType.MetricKeyType<any, any>>(
  metricKey: MetricKey.MetricKey<Type>,
  metricState: MetricState.MetricState<MetricKeyType.MetricKeyType.OutType<Type>>
): MetricPair.MetricPair.Untyped => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState
  }
}

/** @internal */
export const unsafeMake = <Type extends MetricKeyType.MetricKeyType<any, any>>(
  metricKey: MetricKey.MetricKey<Type>,
  metricState: MetricState.MetricState.Untyped
): MetricPair.MetricPair.Untyped => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState
  }
}
