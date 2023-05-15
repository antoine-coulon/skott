/**
 * @since 1.0.0
 */

import type { NonEmptyArray } from "@effect/data/ReadonlyArray"

/** @internal */
export const isNonEmptyArray = <A>(self: ReadonlyArray<A>): self is NonEmptyArray<A> => self.length > 0

/** @internal */
export const fromIterable = <A>(collection: Iterable<A>): Array<A> =>
  Array.isArray(collection) ? collection : Array.from(collection)
