import * as Equal from "@effect/data/Equal"
import { pipe } from "@effect/data/Function"
import * as Hash from "@effect/data/Hash"
import type * as MetricLabel from "@effect/io/Metric/Label"

/** @internal */
const MetricLabelSymbolKey = "@effect/io/Metric/Label"

/** @internal */
export const MetricLabelTypeId: MetricLabel.MetricLabelTypeId = Symbol.for(
  MetricLabelSymbolKey
) as MetricLabel.MetricLabelTypeId

/** @internal */
class MetricLabelImpl implements MetricLabel.MetricLabel {
  readonly [MetricLabelTypeId]: MetricLabel.MetricLabelTypeId = MetricLabelTypeId
  constructor(readonly key: string, readonly value: string) {}
  [Hash.symbol](): number {
    return pipe(
      Hash.hash(MetricLabelSymbolKey),
      Hash.combine(Hash.hash(this.key)),
      Hash.combine(Hash.hash(this.value))
    )
  }
  [Equal.symbol](that: unknown): boolean {
    return isMetricLabel(that) &&
      this.key === that.key &&
      this.value === that.value
  }
}

/** @internal */
export const make = (key: string, value: string): MetricLabel.MetricLabel => {
  return new MetricLabelImpl(key, value)
}

/** @internal */
export const isMetricLabel = (u: unknown): u is MetricLabel.MetricLabel => {
  return typeof u === "object" && u != null && MetricLabelTypeId in u
}
