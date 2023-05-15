import * as Chunk from "@effect/data/Chunk";
import type * as Context from "@effect/data/Context";
import type * as Option from "@effect/data/Option";
import type * as Effect from "@effect/io/Effect";
import type * as Exit from "@effect/io/Exit";
import type * as Fiber from "@effect/io/Fiber";
import type * as Supervisor from "@effect/io/Supervisor";
export declare class Track implements Supervisor.Supervisor<Chunk.Chunk<Fiber.RuntimeFiber<any, any>>> {
    readonly [SupervisorTypeId]: {
        _T: (_: never) => never;
    };
    readonly fibers: Set<Fiber.RuntimeFiber<any, any>>;
    value(): Effect.Effect<never, never, Chunk.Chunk<Fiber.RuntimeFiber<any, any>>>;
    onStart<R, E, A>(_context: Context.Context<R>, _effect: Effect.Effect<R, E, A>, _parent: Option.Option<Fiber.RuntimeFiber<any, any>>, fiber: Fiber.RuntimeFiber<E, A>): void;
    onEnd<E, A>(_value: Exit.Exit<E, A>, fiber: Fiber.RuntimeFiber<E, A>): void;
    onEffect<E, A>(_fiber: Fiber.RuntimeFiber<E, A>, _effect: Effect.Effect<any, any, any>): void;
    onSuspend<E, A>(_fiber: Fiber.RuntimeFiber<E, A>): void;
    onResume<E, A>(_fiber: Fiber.RuntimeFiber<E, A>): void;
    map<B>(f: (a: Chunk.Chunk<Fiber.RuntimeFiber<any, any>>) => B): Supervisor.Supervisor<B>;
    zip<A>(right: Supervisor.Supervisor<A>): Supervisor.Supervisor<readonly [Chunk.Chunk<Fiber.RuntimeFiber<any, any>>, A]>;
}
export declare class Const<T> implements Supervisor.Supervisor<T> {
    readonly effect: Effect.Effect<never, never, T>;
    readonly [SupervisorTypeId]: {
        _T: (_: never) => never;
    };
    constructor(effect: Effect.Effect<never, never, T>);
    value(): Effect.Effect<never, never, T>;
    onStart<R, E, A>(_context: Context.Context<R>, _effect: Effect.Effect<R, E, A>, _parent: Option.Option<Fiber.RuntimeFiber<any, any>>, _fiber: Fiber.RuntimeFiber<E, A>): void;
    onEnd<E, A>(_value: Exit.Exit<E, A>, _fiber: Fiber.RuntimeFiber<E, A>): void;
    onEffect<E, A>(_fiber: Fiber.RuntimeFiber<E, A>, _effect: Effect.Effect<any, any, any>): void;
    onSuspend<E, A>(_fiber: Fiber.RuntimeFiber<E, A>): void;
    onResume<E, A>(_fiber: Fiber.RuntimeFiber<E, A>): void;
    map<B>(f: (a: T) => B): Supervisor.Supervisor<B>;
    zip<A>(right: Supervisor.Supervisor<A>): Supervisor.Supervisor<readonly [T, A]>;
}
//# sourceMappingURL=supervisor.d.ts.map