/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type * as Equal from "@effect/data/Equal"
import * as internal from "@effect/io/internal_effect_untraced/configSecret"

/**
 * @since 1.0.0
 * @category symbols
 */
export const ConfigSecretTypeId: unique symbol = internal.ConfigSecretTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type ConfigSecretTypeId = typeof ConfigSecretTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface ConfigSecret extends ConfigSecret.Proto, Equal.Equal {
  /** @internal */
  readonly raw: Array<number>
}

/**
 * @since 1.0.0
 */
export declare namespace ConfigSecret {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Proto {
    readonly [ConfigSecretTypeId]: ConfigSecretTypeId
  }
}

/**
 * @since 1.0.0
 * @category refinements
 */
export const isConfigSecret: (u: unknown) => u is ConfigSecret = internal.isConfigSecret

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: (bytes: Array<number>) => ConfigSecret = internal.make

/**
 * @since 1.0.0
 * @category constructors
 */
export const fromChunk: (chunk: Chunk.Chunk<string>) => ConfigSecret = internal.fromChunk

/**
 * @since 1.0.0
 * @category constructors
 */
export const fromString: (text: string) => ConfigSecret = internal.fromString

/**
 * @since 1.0.0
 * @category getters
 */
export const value: (self: ConfigSecret) => string = internal.value

/**
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeWipe: (self: ConfigSecret) => void = internal.unsafeWipe
