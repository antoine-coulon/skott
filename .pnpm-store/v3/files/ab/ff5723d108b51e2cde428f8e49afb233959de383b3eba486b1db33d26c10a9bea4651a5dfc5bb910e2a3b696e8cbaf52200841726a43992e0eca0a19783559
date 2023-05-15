/**
 * Mutable references in the `IO` monad
 *
 * @since 2.0.0
 */
import { IO } from './IO'
/**
 * @example
 * import { io } from 'fp-ts/lib/IO'
 * import { newIORef } from 'fp-ts/lib/IORef'
 *
 * assert.strictEqual(io.chain(newIORef(1), ref => io.chain(ref.write(2), () => ref.read))(), 2)
 *
 * @since 2.0.0
 */
export declare class IORef<A> {
  private value
  readonly read: IO<A>
  constructor(value: A)
  /**
   * @since 2.0.0
   */
  write(a: A): IO<void>
  /**
   * @since 2.0.0
   */
  modify(f: (a: A) => A): IO<void>
}
/**
 * @since 2.0.0
 */
export declare function newIORef<A>(a: A): IO<IORef<A>>
