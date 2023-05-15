import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
declare module './HKT' {
  interface URItoKind<A> {
    readonly Tree: Tree<A>
  }
}
/**
 * @since 2.0.0
 */
export declare const URI = 'Tree'
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI
/**
 * @since 2.0.0
 */
export declare type Forest<A> = Array<Tree<A>>
/**
 * @since 2.0.0
 */
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}
/**
 * @since 2.0.0
 */
export declare function make<A>(value: A, forest?: Forest<A>): Tree<A>
/**
 * @since 2.0.0
 */
export declare function getShow<A>(S: Show<A>): Show<Tree<A>>
/**
 * @since 2.0.0
 */
export declare function getEq<A>(E: Eq<A>): Eq<Tree<A>>
/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 2.0.0
 */
export declare function drawForest(forest: Forest<string>): string
/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree, tree } from 'fp-ts/lib/Tree'
 *
 * const fa = make('a', [
 *   tree.of('b'),
 *   tree.of('c'),
 *   make('d', [tree.of('e'), tree.of('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 2.0.0
 */
export declare function drawTree(tree: Tree<string>): string
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
export declare function unfoldTree<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A>
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
export declare function unfoldForest<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A>
/**
 * Monadic tree builder, in depth-first order
 *
 * @since 2.0.0
 */
export declare function unfoldTreeM<M extends URIS3>(
  M: Monad3<M>
): <R, E, A, B>(b: B, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A, B>(b: B, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2>(
  M: Monad2<M>
): <E, A, B>(b: B, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(b: B, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS>(
  M: Monad1<M>
): <A, B>(b: B, f: (b: B) => Kind<M, [A, Array<B>]>) => Kind<M, Tree<A>>
export declare function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>
/**
 * Monadic forest builder, in depth-first order
 *
 * @since 2.0.0
 */
export declare function unfoldForestM<M extends URIS3>(
  M: Monad3<M>
): <R, E, A, B>(bs: Array<B>, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A, B>(bs: Array<B>, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS2>(
  M: Monad2<M>
): <R, E, B>(bs: Array<B>, f: (b: B) => Kind2<M, R, [E, Array<B>]>) => Kind2<M, R, Forest<E>>
export declare function unfoldForestM<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(bs: Array<B>, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Forest<A>>
export declare function unfoldForestM<M extends URIS>(
  M: Monad1<M>
): <A, B>(bs: Array<B>, f: (b: B) => Kind<M, [A, Array<B>]>) => Kind<M, Forest<A>>
export declare function unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>
/**
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, fa: Tree<A>) => boolean
/**
 * @since 2.0.0
 */
export declare const tree: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI>
declare const ap: <A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B>,
  apFirst: <B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<A>,
  apSecond: <B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<B>,
  chain: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B>,
  chainFirst: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<A>,
  duplicate: <A>(ma: Tree<A>) => Tree<Tree<A>>,
  extend: <A, B>(f: (fa: Tree<A>) => B) => (ma: Tree<A>) => Tree<B>,
  flatten: <A>(mma: Tree<Tree<A>>) => Tree<A>,
  foldMap: <M>(M: import('./Monoid').Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M,
  map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B>,
  reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B,
  reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B
export {
  /**
   * @since 2.0.0
   */
  ap,
  /**
   * @since 2.0.0
   */
  apFirst,
  /**
   * @since 2.0.0
   */
  apSecond,
  /**
   * @since 2.0.0
   */
  chain,
  /**
   * @since 2.0.0
   */
  chainFirst,
  /**
   * @since 2.0.0
   */
  duplicate,
  /**
   * @since 2.0.0
   */
  extend,
  /**
   * @since 2.0.0
   */
  flatten,
  /**
   * @since 2.0.0
   */
  foldMap,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  reduce,
  /**
   * @since 2.0.0
   */
  reduceRight
}
