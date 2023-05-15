import { globalValue } from "@effect/data/Global"
import * as FiberId from "@effect/io/Fiber/Id"
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags"
import * as FiberMessage from "@effect/io/internal_effect_untraced/fiberMessage"
import type * as FiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime"
import * as _runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags"

/** @internal */
const FiberScopeSymbolKey = "@effect/io/Fiber/Scope"

/** @internal */
export const FiberScopeTypeId = Symbol.for(FiberScopeSymbolKey)

export type FiberScopeTypeId = typeof FiberScopeTypeId

/**
 * A `FiberScope` represents the scope of a fiber lifetime. The scope of a
 * fiber can be retrieved using `Effect.descriptor`, and when forking fibers,
 * you can specify a custom scope to fork them on by using the `forkIn`.
 *
 * @since 1.0.0
 * @category models
 */
export interface FiberScope {
  readonly [FiberScopeTypeId]: FiberScopeTypeId
  get fiberId(): FiberId.FiberId
  add(runtimeFlags: RuntimeFlags.RuntimeFlags, child: FiberRuntime.FiberRuntime<any, any>): void
}

/** @internal */
class Global implements FiberScope {
  readonly [FiberScopeTypeId]: FiberScopeTypeId = FiberScopeTypeId
  readonly fiberId = FiberId.none
  readonly roots = new Set<FiberRuntime.FiberRuntime<any, any>>()
  add(_runtimeFlags: RuntimeFlags.RuntimeFlags, child: FiberRuntime.FiberRuntime<any, any>): void {
    this.roots.add(child)
    child.unsafeAddObserver(() => {
      this.roots.delete(child)
    })
  }
}

/** @internal */
class Local implements FiberScope {
  readonly [FiberScopeTypeId]: FiberScopeTypeId = FiberScopeTypeId
  constructor(
    readonly fiberId: FiberId.FiberId,
    readonly parent: FiberRuntime.FiberRuntime<any, any>
  ) {
  }
  add(_runtimeFlags: RuntimeFlags.RuntimeFlags, child: FiberRuntime.FiberRuntime<any, any>): void {
    this.parent.tell(
      FiberMessage.stateful((parentFiber) => {
        parentFiber.addChild(child)
        child.unsafeAddObserver(() => {
          parentFiber.removeChild(child)
        })
      })
    )
  }
}

/** @internal */
export const unsafeMake = (fiber: FiberRuntime.FiberRuntime<any, any>): FiberScope => {
  return new Local(fiber.id(), fiber)
}

/** @internal */
export const globalScope = globalValue(
  Symbol.for("@effect/io/FiberScope/Global"),
  () => new Global()
)
