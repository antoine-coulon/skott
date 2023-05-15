import * as FiberId from "@effect/io/Fiber/Id";
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags";
import type * as FiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
export type FiberScopeTypeId = typeof FiberScopeTypeId;
/**
 * A `FiberScope` represents the scope of a fiber lifetime. The scope of a
 * fiber can be retrieved using `Effect.descriptor`, and when forking fibers,
 * you can specify a custom scope to fork them on by using the `forkIn`.
 *
 * @since 1.0.0
 * @category models
 */
export interface FiberScope {
    readonly [FiberScopeTypeId]: FiberScopeTypeId;
    get fiberId(): FiberId.FiberId;
    add(runtimeFlags: RuntimeFlags.RuntimeFlags, child: FiberRuntime.FiberRuntime<any, any>): void;
}
//# sourceMappingURL=fiberScope.d.ts.map