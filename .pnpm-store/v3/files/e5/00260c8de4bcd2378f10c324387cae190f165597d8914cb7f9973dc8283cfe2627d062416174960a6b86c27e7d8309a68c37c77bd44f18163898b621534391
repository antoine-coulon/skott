/**
 * @since 1.0.0
 */
import { identity, pipe } from "@effect/data/Function"
import type { Kind, TypeLambda } from "@effect/data/HKT"
import type { Monad } from "@effect/data/typeclass/Monad"

/**
 * @category symbols
 * @since 1.0.0
 */
export const GenKindTypeId = Symbol.for("@effect/data/Gen/GenKind")

/**
 * @category symbols
 * @since 1.0.0
 */
export type GenKindTypeId = typeof GenKindTypeId

/**
 * @category models
 * @since 1.0.0
 */
export interface GenKind<F extends TypeLambda, R, O, E, A> extends Variance<F, R, O, E> {
  readonly value: Kind<F, R, O, E, A>

  [Symbol.iterator](): Generator<GenKind<F, R, O, E, A>, A>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export class GenKindImpl<F extends TypeLambda, R, O, E, A> implements GenKind<F, R, O, E, A> {
  constructor(
    /**
     * @since 1.0.0
     */
    readonly value: Kind<F, R, O, E, A>
  ) {}

  /**
   * @since 1.0.0
   */
  get _F() {
    return identity
  }

  /**
   * @since 1.0.0
   */
  get _R() {
    return (_: R) => _
  }

  /**
   * @since 1.0.0
   */
  get _O() {
    return (_: never): O => _
  }

  /**
   * @since 1.0.0
   */
  get _E() {
    return (_: never): E => _
  }

  /**
   * @since 1.0.0
   */
  readonly [GenKindTypeId]: typeof GenKindTypeId = GenKindTypeId;

  /**
   * @since 1.0.0
   */
  [Symbol.iterator](): Generator<GenKind<F, R, O, E, A>, A> {
    return new SingleShotGen<GenKind<F, R, O, E, A>, A>(this as any)
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export class SingleShotGen<T, A> implements Generator<T, A> {
  private called = false

  constructor(readonly self: T) {}

  /**
   * @since 1.0.0
   */
  next(a: A): IteratorResult<T, A> {
    return this.called ?
      ({
        value: a,
        done: true
      }) :
      (this.called = true,
        ({
          value: this.self,
          done: false
        }))
  }

  /**
   * @since 1.0.0
   */
  return(a: A): IteratorResult<T, A> {
    return ({
      value: a,
      done: true
    })
  }

  /**
   * @since 1.0.0
   */
  throw(e: unknown): IteratorResult<T, A> {
    throw e
  }

  /**
   * @since 1.0.0
   */
  [Symbol.iterator](): Generator<T, A> {
    return new SingleShotGen<T, A>(this.self)
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const makeGenKind = <F extends TypeLambda, R, O, E, A>(
  kind: Kind<F, R, O, E, A>
): GenKind<F, R, O, E, A> => new GenKindImpl(kind)

/**
 * @category models
 * @since 1.0.0
 */
export interface Variance<F extends TypeLambda, R, O, E> {
  readonly [GenKindTypeId]: GenKindTypeId
  readonly _F: (_: F) => F
  readonly _R: (_: R) => unknown
  readonly _O: (_: never) => O
  readonly _E: (_: never) => E
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Gen<F extends TypeLambda, Z> {
  <K extends Variance<F, any, any, any>, A>(
    body: (resume: Z) => Generator<K, A>
  ): Kind<
    F,
    [K] extends [Variance<F, infer R, any, any>] ? R : never,
    [K] extends [Variance<F, any, infer O, any>] ? O : never,
    [K] extends [Variance<F, any, any, infer E>] ? E : never,
    A
  >
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Adapter<F extends TypeLambda> {
  <R, O, E, A>(
    self: Kind<F, R, O, E, A>
  ): GenKind<F, R, O, E, A>
}

/**
 * @category adapters
 * @since 1.0.0
 */
export const adapter: <F extends TypeLambda>() => Adapter<F> = () => (kind) => new GenKindImpl(kind)

function runGen<F extends TypeLambda, K extends GenKind<F, any, any, any, any>, AEff>(
  F: Monad<F>,
  state: IteratorYieldResult<K> | IteratorReturnResult<AEff>,
  iterator: Generator<K, AEff, any>
): Kind<F, any, any, any, any> {
  if (state.done) {
    return F.of(state.value)
  }
  return F.flatMap((val) => {
    const next = iterator.next(val)
    return runGen(F, next, iterator)
  })(state.value.value)
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const singleShot: <F extends TypeLambda>(
  F: Monad<F>
) => <Z extends Adapter<F>>(adapter: Z) => Gen<F, Z> = (F) =>
  (adapter) =>
    (body) =>
      pipe(
        F.of(void 0),
        F.flatMap(() => {
          const iterator = body(adapter)
          const state = iterator.next()
          // @ts-expect-error
          return runGen(F, state, iterator)
        })
      )
