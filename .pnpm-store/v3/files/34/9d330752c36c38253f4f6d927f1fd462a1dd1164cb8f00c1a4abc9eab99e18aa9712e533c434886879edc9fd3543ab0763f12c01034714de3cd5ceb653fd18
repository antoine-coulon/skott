import { pipe } from "@effect/data/Function"
import * as HashSet from "@effect/data/HashSet"
import * as MutableHashMap from "@effect/data/MutableHashMap"
import * as Option from "@effect/data/Option"
import * as metricHook from "@effect/io/internal_effect_untraced/metric/hook"
import * as metricKeyType from "@effect/io/internal_effect_untraced/metric/keyType"
import * as metricPair from "@effect/io/internal_effect_untraced/metric/pair"
import type * as MetricHook from "@effect/io/Metric/Hook"
import type * as MetricKey from "@effect/io/Metric/Key"
import type * as MetricKeyType from "@effect/io/Metric/KeyType"
import type * as MetricPair from "@effect/io/Metric/Pair"
import type * as MetricRegistry from "@effect/io/Metric/Registry"

/** @internal */
const MetricRegistrySymbolKey = "@effect/io/Metric/Registry"

/** @internal */
export const MetricRegistryTypeId: MetricRegistry.MetricRegistryTypeId = Symbol.for(
  MetricRegistrySymbolKey
) as MetricRegistry.MetricRegistryTypeId

/** @internal */
class MetricRegistryImpl implements MetricRegistry.MetricRegistry {
  readonly [MetricRegistryTypeId]: MetricRegistry.MetricRegistryTypeId = MetricRegistryTypeId

  private map = MutableHashMap.empty<
    MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>,
    MetricHook.MetricHook.Root
  >()

  snapshot(): HashSet.HashSet<MetricPair.MetricPair.Untyped> {
    const result: Array<MetricPair.MetricPair.Untyped> = []
    for (const [key, hook] of this.map) {
      result.push(metricPair.unsafeMake(key, hook.get()))
    }
    return HashSet.fromIterable(result)
  }

  get<Type extends MetricKeyType.MetricKeyType<any, any>>(
    key: MetricKey.MetricKey<Type>
  ): MetricHook.MetricHook<
    MetricKeyType.MetricKeyType.InType<typeof key["keyType"]>,
    MetricKeyType.MetricKeyType.OutType<typeof key["keyType"]>
  > {
    const hook = pipe(
      this.map,
      MutableHashMap.get(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>),
      Option.getOrUndefined
    )
    if (hook == null) {
      if (metricKeyType.isCounterKey(key.keyType)) {
        return this.getCounter(key as unknown as MetricKey.MetricKey.Counter) as any
      }
      if (metricKeyType.isGaugeKey(key.keyType)) {
        return this.getGauge(key as unknown as MetricKey.MetricKey.Gauge) as any
      }
      if (metricKeyType.isFrequencyKey(key.keyType)) {
        return this.getFrequency(key as unknown as MetricKey.MetricKey.Frequency) as any
      }
      if (metricKeyType.isHistogramKey(key.keyType)) {
        return this.getHistogram(key as unknown as MetricKey.MetricKey.Histogram) as any
      }
      if (metricKeyType.isSummaryKey(key.keyType)) {
        return this.getSummary(key as unknown as MetricKey.MetricKey.Summary) as any
      }
      throw new Error(
        "BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/io/issues"
      )
    } else {
      return hook as any
    }
  }

  getCounter(key: MetricKey.MetricKey.Counter): MetricHook.MetricHook.Counter {
    let value = pipe(
      this.map,
      MutableHashMap.get(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>),
      Option.getOrUndefined
    )
    if (value == null) {
      const counter = metricHook.counter(key)
      if (!pipe(this.map, MutableHashMap.has(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>))) {
        pipe(
          this.map,
          MutableHashMap.set(
            key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>,
            counter as MetricHook.MetricHook.Root
          )
        )
      }
      value = counter
    }
    return value as MetricHook.MetricHook.Counter
  }

  getFrequency(key: MetricKey.MetricKey.Frequency): MetricHook.MetricHook.Frequency {
    let value = pipe(
      this.map,
      MutableHashMap.get(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>),
      Option.getOrUndefined
    )
    if (value == null) {
      const frequency = metricHook.frequency(key)
      if (!pipe(this.map, MutableHashMap.has(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>))) {
        pipe(
          this.map,
          MutableHashMap.set(
            key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>,
            frequency as MetricHook.MetricHook.Root
          )
        )
      }
      value = frequency
    }
    return value as MetricHook.MetricHook.Frequency
  }

  getGauge(key: MetricKey.MetricKey.Gauge): MetricHook.MetricHook.Gauge {
    let value = pipe(
      this.map,
      MutableHashMap.get(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>),
      Option.getOrUndefined
    )
    if (value == null) {
      const gauge = metricHook.gauge(key, 0)
      if (!pipe(this.map, MutableHashMap.has(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>))) {
        pipe(
          this.map,
          MutableHashMap.set(
            key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>,
            gauge as MetricHook.MetricHook.Root
          )
        )
      }
      value = gauge
    }
    return value as MetricHook.MetricHook.Gauge
  }

  getHistogram(key: MetricKey.MetricKey.Histogram): MetricHook.MetricHook.Histogram {
    let value = pipe(
      this.map,
      MutableHashMap.get(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>),
      Option.getOrUndefined
    )
    if (value == null) {
      const histogram = metricHook.histogram(key)
      if (!pipe(this.map, MutableHashMap.has(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>))) {
        pipe(
          this.map,
          MutableHashMap.set(
            key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>,
            histogram as MetricHook.MetricHook.Root
          )
        )
      }
      value = histogram
    }
    return value as MetricHook.MetricHook.Histogram
  }

  getSummary(key: MetricKey.MetricKey.Summary): MetricHook.MetricHook.Summary {
    let value = pipe(
      this.map,
      MutableHashMap.get(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>),
      Option.getOrUndefined
    )
    if (value == null) {
      const summary = metricHook.summary(key)
      if (!pipe(this.map, MutableHashMap.has(key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>))) {
        pipe(
          this.map,
          MutableHashMap.set(
            key as MetricKey.MetricKey<MetricKeyType.MetricKeyType.Untyped>,
            summary as MetricHook.MetricHook.Root
          )
        )
      }
      value = summary
    }
    return value as MetricHook.MetricHook.Summary
  }
}

/** @internal */
export const make = (): MetricRegistry.MetricRegistry => {
  return new MetricRegistryImpl()
}
