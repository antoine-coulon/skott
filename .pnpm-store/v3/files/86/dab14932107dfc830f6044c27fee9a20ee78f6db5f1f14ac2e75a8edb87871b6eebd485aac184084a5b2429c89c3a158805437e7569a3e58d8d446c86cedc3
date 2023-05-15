/**
 * @since 2.5.0
 */
import { Either } from './Either'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Eq } from './Eq'
import { Predicate, Refinement } from './function'
import { Separated } from './Compactable'
import { Option } from './Option'
import { Show } from './Show'
/**
 * @since 2.5.0
 */
export declare function fromSet<A>(s: Set<A>): ReadonlySet<A>
/**
 * @since 2.5.0
 */
export declare function toSet<A>(s: ReadonlySet<A>): Set<A>
/**
 * @since 2.5.0
 */
export declare function getShow<A>(S: Show<A>): Show<ReadonlySet<A>>
/**
 * @since 2.5.0
 */
export declare const empty: ReadonlySet<never>
/**
 * @since 2.5.0
 */
export declare function toReadonlyArray<A>(O: Ord<A>): (set: ReadonlySet<A>) => ReadonlyArray<A>
/**
 * @since 2.5.0
 */
export declare function getEq<A>(E: Eq<A>): Eq<ReadonlySet<A>>
/**
 * @since 2.5.0
 */
export declare function some<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => boolean
/**
 * Projects a Set through a function
 *
 * @since 2.5.0
 */
export declare function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: ReadonlySet<A>) => ReadonlySet<B>
/**
 * @since 2.5.0
 */
export declare function every<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => boolean
/**
 * @since 2.5.0
 */
export declare function chain<B>(E: Eq<B>): <A>(f: (x: A) => ReadonlySet<B>) => (set: ReadonlySet<A>) => ReadonlySet<B>
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.5.0
 */
export declare function isSubset<A>(E: Eq<A>): (x: ReadonlySet<A>, y: ReadonlySet<A>) => boolean
/**
 * @since 2.5.0
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: ReadonlySet<A>) => ReadonlySet<B>
export declare function filter<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => ReadonlySet<A>
/**
 * @since 2.5.0
 */
export declare function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<B>>
export declare function partition<A>(
  predicate: Predicate<A>
): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<A>>
/**
 * Test if a value is a member of a set
 *
 * @since 2.5.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, set: ReadonlySet<A>) => boolean
/**
 * Form the union of two sets
 *
 * @since 2.5.0
 */
export declare function union<A>(E: Eq<A>): (set: ReadonlySet<A>, y: ReadonlySet<A>) => ReadonlySet<A>
/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.5.0
 */
export declare function intersection<A>(E: Eq<A>): (set: ReadonlySet<A>, y: ReadonlySet<A>) => ReadonlySet<A>
/**
 * @since 2.5.0
 */
export declare function partitionMap<B, C>(
  EB: Eq<B>,
  EC: Eq<C>
): <A>(f: (a: A) => Either<B, C>) => (set: ReadonlySet<A>) => Separated<ReadonlySet<B>, ReadonlySet<C>>
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/lib/ReadonlySet'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 2.5.0
 */
export declare function difference<A>(E: Eq<A>): (x: ReadonlySet<A>, y: ReadonlySet<A>) => ReadonlySet<A>
/**
 * @since 2.5.0
 */
export declare function getUnionMonoid<A>(E: Eq<A>): Monoid<ReadonlySet<A>>
/**
 * @since 2.5.0
 */
export declare function getIntersectionSemigroup<A>(E: Eq<A>): Semigroup<ReadonlySet<A>>
/**
 * @since 2.5.0
 */
export declare function reduce<A>(O: Ord<A>): <B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlySet<A>) => B
/**
 * @since 2.5.0
 */
export declare function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (f: (a: A) => M) => (fa: ReadonlySet<A>) => M
/**
 * Create a set with one element
 *
 * @since 2.5.0
 */
export declare function singleton<A>(a: A): ReadonlySet<A>
/**
 * Insert a value into a set
 *
 * @since 2.5.0
 */
export declare function insert<A>(E: Eq<A>): (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
/**
 * Delete a value from a set
 *
 * @since 2.5.0
 */
export declare function remove<A>(E: Eq<A>): (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
/**
 * Create a set from an array
 *
 * @since 2.5.0
 */
export declare function fromArray<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlySet<A>
/**
 * @since 2.5.0
 */
export declare function compact<A>(E: Eq<A>): (fa: ReadonlySet<Option<A>>) => ReadonlySet<A>
/**
 * @since 2.5.0
 */
export declare function separate<E, A>(
  EE: Eq<E>,
  EA: Eq<A>
): (fa: ReadonlySet<Either<E, A>>) => Separated<ReadonlySet<E>, ReadonlySet<A>>
/**
 * @since 2.5.0
 */
export declare function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B>
