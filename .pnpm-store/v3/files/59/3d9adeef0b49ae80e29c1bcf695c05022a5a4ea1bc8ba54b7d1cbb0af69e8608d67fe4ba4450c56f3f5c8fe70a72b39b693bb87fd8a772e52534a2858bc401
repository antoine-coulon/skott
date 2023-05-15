/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context"
import type * as Clock from "@effect/io/Clock"
import type * as ConfigProvider from "@effect/io/Config/Provider"
import type * as FiberRef from "@effect/io/FiberRef"
import * as internal from "@effect/io/internal_effect_untraced/defaultServices"
import type * as Random from "@effect/io/Random"

/**
 * @since 1.0.0
 * @category models
 */
export type DefaultServices = Clock.Clock | Random.Random | ConfigProvider.ConfigProvider

/**
 * @since 1.0.0
 * @category constructors
 */
export const liveServices: Context.Context<DefaultServices> = internal.liveServices

/**
 * @since 1.0.0
 * @category fiberRefs
 */
export const currentServices: FiberRef.FiberRef<Context.Context<DefaultServices>> = internal.currentServices
