/**
 * @since 1.0.0
 */
import { dual } from "@effect/data/Function"
import type { TypeLambda } from "@effect/data/HKT"
import * as readonlyArray from "@effect/data/internal/ReadonlyArray"
import * as contravariant from "@effect/data/typeclass/Contravariant"
import type * as invariant from "@effect/data/typeclass/Invariant"
import type { Monoid } from "@effect/data/typeclass/Monoid"
import * as monoid from "@effect/data/typeclass/Monoid"
import * as product_ from "@effect/data/typeclass/Product"
import type { Semigroup } from "@effect/data/typeclass/Semigroup"
import * as semigroup from "@effect/data/typeclass/Semigroup"
import type * as semiProduct from "@effect/data/typeclass/SemiProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Order<A> {
  readonly compare: (self: A, that: A) => -1 | 0 | 1
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface OrderTypeLambda extends TypeLambda {
  readonly type: Order<this["Target"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <A>(
  compare: Order<A>["compare"]
): Order<A> => ({
  compare: (self, that) => self === that ? 0 : compare(self, that)
})

/**
 * @category instances
 * @since 1.0.0
 */
export const string: Order<string> = make((self, that) => self < that ? -1 : 1)

/**
 * @category instances
 * @since 1.0.0
 */
export const number: Order<number> = make((self, that) => self < that ? -1 : 1)

/**
 * @category instances
 * @since 1.0.0
 */
export const boolean: Order<boolean> = make((self, that) => self < that ? -1 : 1)

/**
 * @category instances
 * @since 1.0.0
 */
export const bigint: Order<bigint> = make((self, that) => self < that ? -1 : 1)

/**
 * @since 1.0.0
 */
export const reverse = <A>(O: Order<A>): Order<A> => make((self, that) => O.compare(that, self))

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup = <A>(): Semigroup<Order<A>> =>
  semigroup.make(
    (O1, O2) =>
      make((self, that) => {
        const out = O1.compare(self, that)
        if (out !== 0) {
          return out
        }
        return O2.compare(self, that)
      }),
    (self, collection) =>
      make((a1, a2) => {
        let out = self.compare(a1, a2)
        if (out !== 0) {
          return out
        }
        for (const O of collection) {
          out = O.compare(a1, a2)
          if (out !== 0) {
            return out
          }
        }
        return out
      })
  )

const empty: Order<unknown> = make(() => 0)

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid = <A>(): Monoid<Order<A>> => monoid.fromSemigroup(getSemigroup<A>(), empty)

/**
 * @category combinators
 * @since 1.0.0
 */
export const contramap: {
  <B, A>(f: (b: B) => A): (self: Order<A>) => Order<B>
  <A, B>(self: Order<A>, f: (b: B) => A): Order<B>
} = dual(
  2,
  <A, B>(self: Order<A>, f: (b: B) => A): Order<B> => make((b1, b2) => self.compare(f(b1), f(b2)))
)

const imap = contravariant.imap<OrderTypeLambda>(contramap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<OrderTypeLambda> = {
  imap,
  contramap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<OrderTypeLambda> = {
  imap
}

const product = <A, B>(self: Order<A>, that: Order<B>): Order<[A, B]> =>
  make(([xa, xb], [ya, yb]) => {
    const o = self.compare(xa, ya)
    return o !== 0 ? o : that.compare(xb, yb)
  })

const productAll = <A>(collection: Iterable<Order<A>>): Order<Array<A>> => {
  const orders = readonlyArray.fromIterable(collection)
  return make((x, y) => {
    const len = Math.min(x.length, y.length, orders.length)
    for (let i = 0; i < len; i++) {
      const o = orders[i].compare(x[i], y[i])
      if (o !== 0) {
        return o
      }
    }
    return 0
  })
}

const productMany = <A>(
  self: Order<A>,
  collection: Iterable<Order<A>>
): Order<[A, ...Array<A>]> => {
  const order = productAll(collection)
  return make((x, y) => {
    const o = self.compare(x[0], y[0])
    return o !== 0 ? o : order.compare(x.slice(1), y.slice(1))
  })
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<OrderTypeLambda> = {
  imap,
  product,
  productMany
}

const of: <A>(a: A) => Order<A> = () => empty

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<OrderTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll
}

/**
 * Similar to `Promise.all` but operates on `Order`s.
 *
 * ```
 * [Order<A>, Order<B>, ...] -> Order<[A, B, ...]>
 * ```
 *
 * This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
 * The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
 * It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
 * of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Order<any>>>(
  ...elements: T
) => Order<{ [I in keyof T]: [T[I]] extends [Order<infer A>] ? A : never }> = product_.tuple(
  Product
)

/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array = <A>(O: Order<A>): Order<ReadonlyArray<A>> =>
  make((self, that) => {
    const aLen = self.length
    const bLen = that.length
    const len = Math.min(aLen, bLen)
    for (let i = 0; i < len; i++) {
      const o = O.compare(self[i], that[i])
      if (o !== 0) {
        return o
      }
    }
    return number.compare(aLen, bLen)
  })

/**
 * This function creates and returns a new `Order` for a struct of values based on the given `Order`s
 * for each property in the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct: <R extends { readonly [x: string]: Order<any> }>(
  fields: R
) => Order<{ [K in keyof R]: [R[K]] extends [Order<infer A>] ? A : never }> = product_.struct(
  Product
)

/**
 * Test whether one value is _strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThan = <A>(O: Order<A>): {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
} => dual(2, (self: A, that: A) => O.compare(self, that) === -1)

/**
 * Test whether one value is _strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThan = <A>(O: Order<A>): {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
} => dual(2, (self: A, that: A) => O.compare(self, that) === 1)

/**
 * Test whether one value is _non-strictly less than_ another.
 *
 * @since 1.0.0
 */
export const lessThanOrEqualTo = <A>(O: Order<A>): {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
} => dual(2, (self: A, that: A) => O.compare(self, that) !== 1)

/**
 * Test whether one value is _non-strictly greater than_ another.
 *
 * @since 1.0.0
 */
export const greaterThanOrEqualTo = <A>(O: Order<A>): {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
} => dual(2, (self: A, that: A) => O.compare(self, that) !== -1)

/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const min = <A>(O: Order<A>): {
  (that: A): (self: A) => A
  (self: A, that: A): A
} => dual(2, (self: A, that: A) => self === that || O.compare(self, that) < 1 ? self : that)

/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen.
 *
 * @since 1.0.0
 */
export const max = <A>(O: Order<A>): {
  (that: A): (self: A) => A
  (self: A, that: A): A
} => dual(2, (self: A, that: A) => self === that || O.compare(self, that) > -1 ? self : that)

/**
 * Clamp a value between a minimum and a maximum.
 *
 * @since 1.0.0
 */
export const clamp = <A>(O: Order<A>): {
  (minimum: A, maximum: A): (self: A) => A
  (self: A, minimum: A, maximum: A): A
} =>
  dual(
    3,
    (self: A, minimum: A, maximum: A): A => min(O)(maximum, max(O)(minimum, self))
  )

/**
 * Test whether a value is between a minimum and a maximum (inclusive).
 *
 * @since 1.0.0
 */
export const between = <A>(O: Order<A>): {
  (minimum: A, maximum: A): (self: A) => boolean
  (self: A, minimum: A, maximum: A): boolean
} =>
  dual(
    3,
    (self: A, minimum: A, maximum: A): boolean => !lessThan(O)(self, minimum) && !greaterThan(O)(self, maximum)
  )
