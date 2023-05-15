/**
 * @since 1.0.0
 */

import * as Data from "@effect/data/Data"
import type { None, Option, Some } from "@effect/data/Option"

/** @internal */
export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === "None"

/** @internal */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === "Some"

/** @internal */
export const none: Option<never> = Data.struct({ _tag: "None" })

/** @internal */
export const some = <A>(a: A): Option<A> => Data.struct({ _tag: "Some", value: a })
