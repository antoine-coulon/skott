import { pipe } from "@effect/data/Function"
import * as Debug from "@effect/io/Debug"
import type * as DefaultServices from "@effect/io/DefaultServices"
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices"
import * as layer from "@effect/io/internal_effect_untraced/layer"
import * as TestClock from "@effect/io/internal_effect_untraced/testing/testClock"
import * as TestServices from "@effect/io/internal_effect_untraced/testing/testServices"
import type * as Layer from "@effect/io/Layer"

/** @internal */
export const live: Layer.Layer<DefaultServices.DefaultServices, never, TestServices.TestServices> = pipe(
  TestServices.annotationsLayer(),
  layer.merge(TestServices.liveLayer()),
  layer.merge(TestServices.sizedLayer(100)),
  layer.merge(pipe(
    TestServices.liveLayer(),
    layer.merge(TestServices.annotationsLayer()),
    layer.provideMerge(TestClock.defaultTestClock)
  )),
  layer.merge(TestServices.testConfigLayer({ repeats: 100, retries: 100, samples: 200, shrinks: 1000 }))
)

/** @internal */
export const liveContext = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, DefaultServices.DefaultServices> =>
    layer.syncContext(() => defaultServices.liveServices)
)

/** @internal */
export const testContext = Debug.untracedMethod(() =>
  (): Layer.Layer<never, never, TestServices.TestServices> =>
    pipe(
      liveContext(),
      layer.provideMerge(live)
    )
)
