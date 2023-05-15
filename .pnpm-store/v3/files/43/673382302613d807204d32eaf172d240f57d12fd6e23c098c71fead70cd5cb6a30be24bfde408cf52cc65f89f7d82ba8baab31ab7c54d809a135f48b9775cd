/**
 * @since 2.0.0
 */
import { ReadonlyRecord } from './ReadonlyRecord'
/**
 * The `Show` type class represents those types which can be converted into
 * a human-readable `string` representation.
 *
 * While not required, it is recommended that for any expression `x`, the
 * string `show(x)` be executable TypeScript code which evaluates to the same
 * value as the expression `x`.
 *
 * @since 2.0.0
 */
export interface Show<A> {
  readonly show: (a: A) => string
}
/**
 * @since 2.0.0
 */
export declare const showString: Show<string>
/**
 * @since 2.0.0
 */
export declare const showNumber: Show<number>
/**
 * @since 2.0.0
 */
export declare const showBoolean: Show<boolean>
/**
 * @since 2.0.0
 */
export declare function getStructShow<O extends ReadonlyRecord<string, any>>(
  shows: {
    [K in keyof O]: Show<O[K]>
  }
): Show<O>
/**
 * @since 2.0.0
 */
export declare function getTupleShow<T extends ReadonlyArray<Show<any>>>(
  ...shows: T
): Show<
  {
    [K in keyof T]: T[K] extends Show<infer A> ? A : never
  }
>
