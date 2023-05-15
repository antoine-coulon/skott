/**
 * @since 2.0.0
 */
import { Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Predicate, Refinement } from './function'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
/**
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<Set<A>>
/**
 * @since 2.0.0
 */
export declare const empty: Set<never>
/**
 * @since 2.0.0
 */
export declare const toArray: <A>(O: Ord<A>) => (set: Set<A>) => Array<A>
/**
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<Set<A>>
/**
 * @since 2.0.0
 */
export declare const some: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean
/**
 * Projects a Set through a function
 *
 * @since 2.0.0
 */
export declare const map: <B>(E: Eq<B>) => <A>(f: (x: A) => B) => (set: Set<A>) => Set<B>
/**
 * @since 2.0.0
 */
export declare const every: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean
/**
 * @since 2.0.0
 */
export declare const chain: <B>(E: Eq<B>) => <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B>
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
export declare const subset: <A>(E: Eq<A>) => (x: Set<A>, y: Set<A>) => boolean
/**
 * @since 2.0.0
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>
export declare function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>
/**
 * @since 2.0.0
 */
export declare function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (set: Set<A>) => Separated<Set<A>, Set<B>>
export declare function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>>
/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
export declare const elem: <A>(E: Eq<A>) => (a: A, set: Set<A>) => boolean
/**
 * Form the union of two sets
 *
 * @since 2.0.0
 */
export declare const union: <A>(E: Eq<A>) => (set: Set<A>, y: Set<A>) => Set<A>
/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.0.0
 */
export declare const intersection: <A>(E: Eq<A>) => (set: Set<A>, y: Set<A>) => Set<A>
/**
 * @since 2.0.0
 */
export declare const partitionMap: <B, C>(
  EB: Eq<B>,
  EC: Eq<C>
) => <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Separated<Set<B>, Set<C>>
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/lib/Set'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 2.0.0
 */
export declare const difference: <A>(E: Eq<A>) => (x: Set<A>, y: Set<A>) => Set<A>
/**
 * @since 2.0.0
 */
export declare const getUnionMonoid: <A>(E: Eq<A>) => Monoid<Set<A>>
/**
 * @since 2.0.0
 */
export declare const getIntersectionSemigroup: <A>(E: Eq<A>) => Semigroup<Set<A>>
/**
 * @since 2.0.0
 */
export declare const reduce: <A>(O: Ord<A>) => <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B
/**
 * @since 2.0.0
 */
export declare const foldMap: <A, M>(O: Ord<A>, M: Monoid<M>) => (f: (a: A) => M) => (fa: Set<A>) => M
/**
 * Create a set with one element
 *
 * @since 2.0.0
 */
export declare const singleton: <A>(a: A) => Set<A>
/**
 * Insert a value into a set
 *
 * @since 2.0.0
 */
export declare const insert: <A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
/**
 * Delete a value from a set
 *
 * @since 2.0.0
 */
export declare const remove: <A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @since 2.5.0
 */
export declare function toggle<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A>
/**
 * Create a set from an array
 *
 * @since 2.0.0
 */
export declare const fromArray: <A>(E: Eq<A>) => (as: Array<A>) => Set<A>
/**
 * @since 2.0.0
 */
export declare const compact: <A>(E: Eq<A>) => (fa: Set<Option<A>>) => Set<A>
/**
 * @since 2.0.0
 */
export declare const separate: <E, A>(EE: Eq<E>, EA: Eq<A>) => (fa: Set<Either<E, A>>) => Separated<Set<E>, Set<A>>
/**
 * @since 2.0.0
 */
export declare const filterMap: <B>(E: Eq<B>) => <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B>
