import * as Chunk from "@effect/data/Chunk"
import * as Context from "@effect/data/Context"
import type { LazyArg } from "@effect/data/Function"
import { identity, pipe } from "@effect/data/Function"
import * as HashSet from "@effect/data/HashSet"
import * as MutableQueue from "@effect/data/MutableQueue"
import * as MRef from "@effect/data/MutableRef"
import * as Option from "@effect/data/Option"
import type * as Cause from "@effect/io/Cause"
import type * as Clock from "@effect/io/Clock"
import type { ConfigProvider } from "@effect/io/Config/Provider"
import * as Debug from "@effect/io/Debug"
import * as Deferred from "@effect/io/Deferred"
import type * as Effect from "@effect/io/Effect"
import * as ExecutionStrategy from "@effect/io/ExecutionStrategy"
import type * as Exit from "@effect/io/Exit"
import type * as Fiber from "@effect/io/Fiber"
import * as FiberId from "@effect/io/Fiber/Id"
import type * as RuntimeFlags from "@effect/io/Fiber/Runtime/Flags"
import * as RuntimeFlagsPatch from "@effect/io/Fiber/Runtime/Flags/Patch"
import * as FiberStatus from "@effect/io/Fiber/Status"
import type * as FiberRef from "@effect/io/FiberRef"
import type * as FiberRefs from "@effect/io/FiberRefs"
import * as internalCause from "@effect/io/internal_effect_untraced/cause"
import { StackAnnotation } from "@effect/io/internal_effect_untraced/cause"
import * as clock from "@effect/io/internal_effect_untraced/clock"
import { configProviderTag } from "@effect/io/internal_effect_untraced/configProvider"
import * as core from "@effect/io/internal_effect_untraced/core"
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices"
import * as internalFiber from "@effect/io/internal_effect_untraced/fiber"
import * as FiberMessage from "@effect/io/internal_effect_untraced/fiberMessage"
import * as fiberRefs from "@effect/io/internal_effect_untraced/fiberRefs"
import * as fiberScope from "@effect/io/internal_effect_untraced/fiberScope"
import * as internalLogger from "@effect/io/internal_effect_untraced/logger"
import * as metric from "@effect/io/internal_effect_untraced/metric"
import * as metricBoundaries from "@effect/io/internal_effect_untraced/metric/boundaries"
import * as metricLabel from "@effect/io/internal_effect_untraced/metric/label"
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/effect"
import * as _runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags"
import * as supervisor from "@effect/io/internal_effect_untraced/supervisor"
import * as SupervisorPatch from "@effect/io/internal_effect_untraced/supervisor/patch"
import type { Logger } from "@effect/io/Logger"
import * as LogLevel from "@effect/io/Logger/Level"
import type * as MetricLabel from "@effect/io/Metric/Label"
import * as Ref from "@effect/io/Ref"
import type * as Scope from "@effect/io/Scope"
import type * as Supervisor from "@effect/io/Supervisor"

const fibersStarted = metric.counter("effect_fiber_started")
const fiberSuccesses = metric.counter("effect_fiber_successes")
const fiberFailures = metric.counter("effect_fiber_failures")
const fiberLifetimes = metric.histogram("effect_fiber_lifetimes", metricBoundaries.exponential(1.0, 2.0, 100))

/** @internal */
type EvaluationSignal =
  | EvaluationSignalContinue
  | EvaluationSignalDone
  | EvaluationSignalYieldNow

/** @internal */
const EvaluationSignalContinue = "Continue" as const

/** @internal */
type EvaluationSignalContinue = typeof EvaluationSignalContinue

/** @internal */
const EvaluationSignalDone = "Done" as const

/** @internal */
type EvaluationSignalDone = typeof EvaluationSignalDone

/** @internal */
const EvaluationSignalYieldNow = "Yield" as const

/** @internal */
type EvaluationSignalYieldNow = typeof EvaluationSignalYieldNow

/** @internal */
export const runtimeFiberVariance = {
  _E: (_: never) => _,
  _A: (_: never) => _
}

const absurd = (_: never): never => {
  throw new Error(
    `BUG: FiberRuntime - ${JSON.stringify(_)} - please report an issue at https://github.com/Effect-TS/io/issues`
  )
}

const contOpSuccess = {
  [OpCodes.OP_ON_SUCCESS]: (
    _: FiberRuntime<any, any>,
    cont: core.OnSuccess,
    value: unknown
  ) => {
    return cont.i1(value)
  },
  [OpCodes.OP_ON_SUCCESS_AND_FAILURE]: (
    _: FiberRuntime<any, any>,
    cont: core.OnSuccessAndFailure,
    value: unknown
  ) => {
    return cont.i2(value)
  },
  [OpCodes.OP_REVERT_FLAGS]: (
    self: FiberRuntime<any, any>,
    cont: core.RevertFlags,
    value: unknown
  ) => {
    self.patchRuntimeFlags(self._runtimeFlags, cont.patch)
    if (_runtimeFlags.interruptible(self._runtimeFlags) && self.isInterrupted()) {
      return core.exitFailCause(self.getInterruptedCause())
    } else {
      return core.exitSucceed(value)
    }
  },
  [OpCodes.OP_WHILE]: (
    self: FiberRuntime<any, any>,
    cont: core.While,
    value: unknown
  ) => {
    cont.i2(value)
    if (cont.i0()) {
      self.pushStack(cont)
      return cont.i1()
    } else {
      return core.unit()
    }
  }
}

const drainQueueWhileRunningTable = {
  [FiberMessage.OP_INTERRUPT_SIGNAL]: (
    self: FiberRuntime<any, any>,
    runtimeFlags: RuntimeFlags.RuntimeFlags,
    cur: Effect.Effect<any, any, any>,
    message: FiberMessage.FiberMessage & { _tag: FiberMessage.OP_INTERRUPT_SIGNAL }
  ) => {
    self.processNewInterruptSignal(message.cause)
    return _runtimeFlags.interruptible(runtimeFlags) ? core.exitFailCause(message.cause) : cur
  },
  [FiberMessage.OP_RESUME]: (
    _self: FiberRuntime<any, any>,
    _runtimeFlags: RuntimeFlags.RuntimeFlags,
    _cur: Effect.Effect<any, any, any>,
    _message: FiberMessage.FiberMessage
  ) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber")
  },
  [FiberMessage.OP_STATEFUL]: (
    self: FiberRuntime<any, any>,
    runtimeFlags: RuntimeFlags.RuntimeFlags,
    cur: Effect.Effect<any, any, any>,
    message: FiberMessage.FiberMessage & { _tag: FiberMessage.OP_STATEFUL }
  ) => {
    message.onFiber(self, FiberStatus.running(runtimeFlags))
    return cur
  },
  [FiberMessage.OP_YIELD_NOW]: (
    _self: FiberRuntime<any, any>,
    _runtimeFlags: RuntimeFlags.RuntimeFlags,
    cur: Effect.Effect<any, any, any>,
    _message: FiberMessage.FiberMessage & { _tag: FiberMessage.OP_YIELD_NOW }
  ) => {
    return pipe(core.yieldNow(), core.flatMap(() => cur))
  }
}

/** @internal */
export class FiberRuntime<E, A> implements Fiber.RuntimeFiber<E, A> {
  readonly [internalFiber.FiberTypeId] = internalFiber.fiberVariance

  readonly [internalFiber.RuntimeFiberTypeId] = runtimeFiberVariance

  private _fiberRefs: FiberRefs.FiberRefs
  private _fiberId: FiberId.Runtime
  public _runtimeFlags: RuntimeFlags.RuntimeFlags
  constructor(
    fiberId: FiberId.Runtime,
    fiberRefs0: FiberRefs.FiberRefs,
    runtimeFlags0: RuntimeFlags.RuntimeFlags
  ) {
    this._runtimeFlags = runtimeFlags0
    this._fiberId = fiberId
    this._fiberRefs = fiberRefs0
    if (_runtimeFlags.runtimeMetrics(runtimeFlags0)) {
      const tags = this.getFiberRef(core.currentTags)
      fibersStarted.unsafeUpdate(1, tags)
    }
  }
  private _queue = MutableQueue.unbounded<FiberMessage.FiberMessage>()
  private _children: Set<FiberRuntime<any, any>> | null = null
  private _observers = new Array<(exit: Exit.Exit<E, A>) => void>()
  private _running = false
  private _stack: Array<core.Continuation> = []
  private _asyncInterruptor: ((effect: Effect.Effect<any, any, any>) => any) | null = null
  private _asyncBlockingOn: FiberId.FiberId | null = null
  private _exitValue: Exit.Exit<E, A> | null = null
  private _traceStack: Array<NonNullable<Debug.Trace>> = []

  /**
   * The identity of the fiber.
   */
  id(): FiberId.Runtime {
    return this._fiberId
  }

  /**
   * Begins execution of the effect associated with this fiber on in the
   * background. This can be called to "kick off" execution of a fiber after
   * it has been created.
   */
  resume<E, A>(effect: Effect.Effect<any, E, A>): void {
    this.tell(FiberMessage.resume(effect))
  }

  /**
   * The status of the fiber.
   */
  status(): Effect.Effect<never, never, FiberStatus.FiberStatus> {
    return this.ask((_, status) => status)
  }

  /**
   * Gets the fiber runtime flags.
   */
  runtimeFlags(): Effect.Effect<never, never, RuntimeFlags.RuntimeFlags> {
    return this.ask((state, status) => {
      if (FiberStatus.isDone(status)) {
        return state._runtimeFlags
      }
      return status.runtimeFlags
    })
  }

  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope(): fiberScope.FiberScope {
    return fiberScope.unsafeMake(this)
  }

  /**
   * Retrieves the immediate children of the fiber.
   */
  children(): Effect.Effect<never, never, Chunk.Chunk<Fiber.RuntimeFiber<any, any>>> {
    return this.ask((fiber) => Chunk.fromIterable(fiber.getChildren()))
  }

  /**
   * Gets the fiber's set of children.
   */
  getChildren(): Set<FiberRuntime<any, any>> {
    if (this._children === null) {
      this._children = new Set()
    }
    return this._children
  }

  /**
   * Retrieves the current supervisor the fiber uses for supervising effects.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getSupervisor() {
    return this.getFiberRef(currentSupervisor)
  }

  /**
   * Retrieves the interrupted cause of the fiber, which will be `Cause.empty`
   * if the fiber has not been interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getInterruptedCause() {
    return this.getFiberRef(core.interruptedCause)
  }

  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs(): Effect.Effect<never, never, FiberRefs.FiberRefs> {
    return this.ask((fiber) => fiber.unsafeGetFiberRefs())
  }

  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask<Z>(
    f: (runtime: FiberRuntime<any, any>, status: FiberStatus.FiberStatus) => Z
  ): Effect.Effect<never, never, Z> {
    return Debug.untraced(() =>
      core.suspendSucceed(() => {
        const deferred = core.deferredUnsafeMake<never, Z>(this._fiberId)
        this.tell(
          FiberMessage.stateful((fiber, status) => {
            core.deferredUnsafeDone(deferred, core.sync(() => f(fiber, status)))
          })
        )
        return core.deferredAwait(deferred)
      })
    )
  }

  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(message: FiberMessage.FiberMessage): void {
    pipe(
      this._queue,
      MutableQueue.offer(message)
    )
    if (!this._running) {
      this._running = true
      this.drainQueueLaterOnExecutor()
    }
  }

  await(): Effect.Effect<never, never, Exit.Exit<E, A>> {
    return Debug.untraced(() =>
      core.asyncInterrupt<never, never, Exit.Exit<E, A>>((resume) => {
        const cb = (exit: Exit.Exit<E, A>) => resume(core.succeed(exit))
        this.tell(
          FiberMessage.stateful((fiber, _) => {
            if (fiber._exitValue !== null) {
              cb(this._exitValue!)
            } else {
              fiber.unsafeAddObserver(cb)
            }
          })
        )
        return core.sync(() =>
          this.tell(
            FiberMessage.stateful((fiber, _) => {
              fiber.unsafeRemoveObserver(cb)
            })
          )
        )
      }, this.id())
    )
  }

  inheritAll(): Effect.Effect<never, never, void> {
    return Debug.untraced(() =>
      core.withFiberRuntime<never, never, void>((parentFiber, parentStatus) => {
        const parentFiberId = parentFiber.id()
        const parentFiberRefs = parentFiber.unsafeGetFiberRefs()
        const parentRuntimeFlags = parentStatus.runtimeFlags
        const childFiberRefs = this.unsafeGetFiberRefs()
        const updatedFiberRefs = fiberRefs.joinAs(parentFiberRefs, parentFiberId, childFiberRefs)

        parentFiber.setFiberRefs(updatedFiberRefs)

        const updatedRuntimeFlags = parentFiber.getFiberRef(currentRuntimeFlags)

        const patch = pipe(
          _runtimeFlags.diff(parentRuntimeFlags, updatedRuntimeFlags),
          // Do not inherit WindDown or Interruption!
          RuntimeFlagsPatch.exclude(_runtimeFlags.Interruption),
          RuntimeFlagsPatch.exclude(_runtimeFlags.WindDown)
        )

        return core.updateRuntimeFlags(patch)
      })
    )
  }

  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  poll(): Effect.Effect<never, never, Option.Option<Exit.Exit<E, A>>> {
    return Debug.untraced(() => core.sync(() => Option.fromNullable(this._exitValue)))
  }

  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll(): Exit.Exit<E, A> | null {
    return this._exitValue
  }

  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  interruptAsFork(fiberId: FiberId.FiberId): Effect.Effect<never, never, void> {
    return Debug.untraced(() =>
      core.sync(() => this.tell(FiberMessage.interruptSignal(internalCause.interrupt(fiberId))))
    )
  }

  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeAddObserver(observer: (exit: Exit.Exit<E, A>) => void): void {
    if (this._exitValue !== null) {
      observer(this._exitValue!)
    } else {
      this._observers.push(observer)
    }
  }

  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeRemoveObserver(observer: (exit: Exit.Exit<E, A>) => void): void {
    this._observers = this._observers.filter((o) => o !== observer)
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  unsafeGetFiberRefs(): FiberRefs.FiberRefs {
    this.setFiberRef(currentRuntimeFlags, this._runtimeFlags)
    return this._fiberRefs
  }

  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef<X>(fiberRef: FiberRef.FiberRef<X>): void {
    this._fiberRefs = fiberRefs.delete_(this._fiberRefs, fiberRef)
  }

  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef<X>(fiberRef: FiberRef.FiberRef<X>): X {
    return fiberRefs.getOrDefault(this._fiberRefs, fiberRef)
  }

  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef<X>(fiberRef: FiberRef.FiberRef<X>, value: X): void {
    this._fiberRefs = fiberRefs.updatedAs(this._fiberRefs, this._fiberId, fiberRef, value)
  }

  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(fiberRefs: FiberRefs.FiberRefs): void {
    this._fiberRefs = fiberRefs
  }

  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(child: FiberRuntime<any, any>) {
    this.getChildren().add(child)
  }

  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(child: FiberRuntime<any, any>) {
    this.getChildren().delete(child)
  }

  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let recurse = true
    while (recurse) {
      let evaluationSignal: EvaluationSignal = EvaluationSignalContinue
      const prev = globalThis[internalFiber.currentFiberURI]
      globalThis[internalFiber.currentFiberURI] = this
      try {
        while (evaluationSignal === EvaluationSignalContinue) {
          evaluationSignal = MutableQueue.isEmpty(this._queue) ?
            EvaluationSignalDone :
            this.evaluateMessageWhileSuspended(pipe(this._queue, MutableQueue.poll(null))!)
        }
      } finally {
        this._running = false
        globalThis[internalFiber.currentFiberURI] = prev
      }
      // Maybe someone added something to the queue between us checking, and us
      // giving up the drain. If so, we need to restart the draining, but only
      // if we beat everyone else to the restart:
      if (!MutableQueue.isEmpty(this._queue) && !this._running) {
        this._running = true
        if (evaluationSignal === EvaluationSignalYieldNow) {
          this.drainQueueLaterOnExecutor()
          recurse = false
        } else {
          recurse = true
        }
      } else {
        recurse = false
      }
    }
  }

  /**
   * Schedules the execution of all messages in the fiber's inbox.
   *
   * This method will return immediately after the scheduling
   * operation is completed, but potentially before such messages have been
   * executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueLaterOnExecutor() {
    this.getFiberRef(core.currentScheduler).scheduleTask(this.run)
  }

  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(
    runtimeFlags: RuntimeFlags.RuntimeFlags,
    cur0: Effect.Effect<any, any, any>
  ) {
    let cur = cur0
    while (!MutableQueue.isEmpty(this._queue)) {
      const message = pipe(this._queue, MutableQueue.poll(void 0))!
      // @ts-expect-error
      cur = drainQueueWhileRunningTable[message._tag](this, runtimeFlags, cur, message)
    }
    return cur
  }

  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted(): boolean {
    return !internalCause.isEmpty(this.getFiberRef(core.interruptedCause))
  }

  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(cause: Cause.Cause<never>) {
    const oldSC = this.getFiberRef(core.interruptedCause)
    this.setFiberRef(core.interruptedCause, internalCause.sequential(oldSC, cause))
  }

  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(cause: Cause.Cause<never>): void {
    this.addInterruptedCause(cause)
    this.sendInterruptSignalToAllChildren()
  }

  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren(): boolean {
    if (this._children === null || this._children.size === 0) {
      return false
    }
    let told = false
    for (const child of this._children) {
      child.tell(FiberMessage.interruptSignal(internalCause.interrupt(this.id())))
      told = true
    }
    return told
  }

  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  interruptAllChildren() {
    if (this.sendInterruptSignalToAllChildren()) {
      const it = this._children!.values()
      this._children = null
      let isDone = false
      const body = () => {
        const next = it.next()
        if (!next.done) {
          return core.asUnit(next.value.await())
        } else {
          return core.sync(() => {
            isDone = true
          })
        }
      }
      return core.whileLoop(
        () => !isDone,
        () => body(),
        () => {
          //
        }
      )
    }
    return null
  }

  reportExitValue(exit: Exit.Exit<E, A>) {
    if (_runtimeFlags.runtimeMetrics(this._runtimeFlags)) {
      const tags = this.getFiberRef(core.currentTags)
      switch (exit._tag) {
        case OpCodes.OP_SUCCESS: {
          fiberSuccesses.unsafeUpdate(1, tags)
          break
        }
        case OpCodes.OP_FAILURE: {
          fiberFailures.unsafeUpdate(1, tags)
          break
        }
      }
    }
  }

  setExitValue(exit: Exit.Exit<E, A>) {
    this._exitValue = exit

    if (_runtimeFlags.runtimeMetrics(this._runtimeFlags)) {
      const tags = this.getFiberRef(core.currentTags)
      const startTimeMillis = this.id().startTimeMillis
      const endTimeMillis = new Date().getTime()
      fiberLifetimes.unsafeUpdate((endTimeMillis - startTimeMillis) / 1000.0, tags)
    }

    this.reportExitValue(exit)

    for (let i = this._observers.length - 1; i >= 0; i--) {
      this._observers[i](exit)
    }
  }

  getLoggers() {
    return this.getFiberRef(currentLoggers)
  }

  log(
    message: string,
    cause: Cause.Cause<any>,
    overrideLogLevel: Option.Option<LogLevel.LogLevel>
  ): void {
    const logLevel = Option.isSome(overrideLogLevel) ?
      overrideLogLevel.value :
      this.getFiberRef(core.currentLogLevel)
    const spans = this.getFiberRef(core.currentLogSpan)
    const annotations = this.getFiberRef(core.currentLogAnnotations)
    const loggers = this.getLoggers()
    const contextMap = this.unsafeGetFiberRefs()
    pipe(
      loggers,
      HashSet.forEach((logger) => {
        logger.log(this.id(), logLevel, message, cause, contextMap, spans, annotations)
      })
    )
  }

  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(message: FiberMessage.FiberMessage): EvaluationSignal {
    switch (message._tag) {
      case FiberMessage.OP_YIELD_NOW: {
        return EvaluationSignalYieldNow
      }
      case FiberMessage.OP_INTERRUPT_SIGNAL: {
        this.processNewInterruptSignal(message.cause)
        if (this._asyncInterruptor !== null) {
          this._asyncInterruptor(core.exitFailCause(message.cause))
          this._asyncInterruptor = null
        }
        return EvaluationSignalContinue
      }
      case FiberMessage.OP_RESUME: {
        this._asyncInterruptor = null
        this._asyncBlockingOn = null
        this.evaluateEffect(message.effect)
        return EvaluationSignalContinue
      }
      case FiberMessage.OP_STATEFUL: {
        message.onFiber(
          this,
          this._exitValue !== null ?
            FiberStatus.done :
            FiberStatus.suspended(this._runtimeFlags, this._asyncBlockingOn!)
        )
        return EvaluationSignalContinue
      }
      default: {
        return absurd(message)
      }
    }
  }

  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(effect0: Effect.Effect<any, any, any>) {
    this.getSupervisor().onResume(this)
    try {
      let effect: Effect.Effect<any, any, any> | null =
        _runtimeFlags.interruptible(this._runtimeFlags) && this.isInterrupted() ?
          core.exitFailCause(this.getInterruptedCause()) :
          effect0
      while (effect !== null) {
        try {
          const exit = this.runLoop(effect)
          this._runtimeFlags = pipe(this._runtimeFlags, _runtimeFlags.enable(_runtimeFlags.WindDown))
          const interruption = this.interruptAllChildren()
          if (interruption !== null) {
            effect = Debug.untraced(() => core.flatMap(interruption, () => exit))
          } else {
            if (MutableQueue.isEmpty(this._queue)) {
              // No more messages to process, so we will allow the fiber to end life:
              this.setExitValue(exit)
            } else {
              // There are messages, possibly added by the final op executed by
              // the fiber. To be safe, we should execute those now before we
              // allow the fiber to end life:
              this.tell(FiberMessage.resume(exit))
            }
            effect = null
          }
        } catch (e) {
          if (core.isEffect(e)) {
            if ((e as core.Primitive)._tag === OpCodes.OP_YIELD) {
              if (_runtimeFlags.cooperativeYielding(this._runtimeFlags)) {
                this.tell(FiberMessage.yieldNow())
                this.tell(FiberMessage.resume(core.exitUnit()))
                effect = null
              } else {
                effect = core.exitUnit()
              }
            } else if ((e as core.Primitive)._tag === OpCodes.OP_ASYNC) {
              // Terminate this evaluation, async resumption will continue evaluation:
              effect = null
            }
          } else {
            throw e
          }
        }
      }
    } finally {
      this.getSupervisor().onSuspend(this)
    }
  }

  /**
   * Begins execution of the effect associated with this fiber on the current
   * thread. This can be called to "kick off" execution of a fiber after it has
   * been created, in hopes that the effect can be executed synchronously.
   *
   * This is not the normal way of starting a fiber, but it is useful when the
   * express goal of executing the fiber is to synchronously produce its exit.
   */
  start<R>(effect: Effect.Effect<R, E, A>): void {
    if (!this._running) {
      this._running = true
      const prev = globalThis[internalFiber.currentFiberURI]
      globalThis[internalFiber.currentFiberURI] = this
      try {
        this.evaluateEffect(effect)
      } finally {
        this._running = false
        globalThis[internalFiber.currentFiberURI] = prev
        // Because we're special casing `start`, we have to be responsible
        // for spinning up the fiber if there were new messages added to
        // the queue between the completion of the effect and the transition
        // to the not running state.
        if (!MutableQueue.isEmpty(this._queue)) {
          this.drainQueueLaterOnExecutor()
        }
      }
    } else {
      this.tell(FiberMessage.resume(effect))
    }
  }

  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork<R>(effect: Effect.Effect<R, E, A>): void {
    this.tell(FiberMessage.resume(effect))
  }

  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(oldRuntimeFlags: RuntimeFlags.RuntimeFlags, patch: RuntimeFlagsPatch.RuntimeFlagsPatch) {
    const newRuntimeFlags = _runtimeFlags.patch(oldRuntimeFlags, patch)
    globalThis[internalFiber.currentFiberURI] = this
    this._runtimeFlags = newRuntimeFlags
    return newRuntimeFlags
  }

  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(
    runtimeFlags: RuntimeFlags.RuntimeFlags,
    asyncRegister: (resume: (effect: Effect.Effect<any, any, any>) => void) => void
  ) {
    let alreadyCalled = false
    const callback = (effect: Effect.Effect<any, any, any>) => {
      if (!alreadyCalled) {
        alreadyCalled = true
        this.tell(FiberMessage.resume(effect))
      }
    }
    if (_runtimeFlags.interruptible(runtimeFlags)) {
      this._asyncInterruptor = callback
    }
    try {
      asyncRegister(callback)
    } catch (e) {
      callback(core.failCause(internalCause.die(e)))
    }
  }

  pushStack(cont: core.Continuation) {
    this._stack.push(cont)
    if ("trace" in cont && cont.trace) {
      this._traceStack.push(cont.trace)
    }
  }

  popStack() {
    const item = this._stack.pop()
    if (item) {
      if ("trace" in item && item.trace) {
        this._traceStack.pop()
      }
      return item
    }
    return
  }

  getNextSuccessCont() {
    let frame = this.popStack()
    while (frame) {
      if (frame._tag !== OpCodes.OP_ON_FAILURE && frame._tag !== OpCodes.OP_TRACED) {
        return frame
      }
      frame = this.popStack()
    }
  }

  getNextFailCont() {
    let frame = this.popStack()
    while (frame) {
      if (frame._tag !== OpCodes.OP_ON_SUCCESS && frame._tag !== OpCodes.OP_WHILE && frame._tag !== OpCodes.OP_TRACED) {
        return frame
      }
      frame = this.popStack()
    }
  }

  [OpCodes.OP_SYNC](op: core.Primitive & { _tag: OpCodes.OP_SYNC }) {
    const value = op.i0()
    const cont = this.getNextSuccessCont()
    if (cont !== undefined) {
      if (!(cont._tag in contOpSuccess)) {
        // @ts-expect-error
        absurd(cont)
      }
      // @ts-expect-error
      return contOpSuccess[cont._tag](this, cont, value)
    } else {
      throw core.exitSucceed(value)
    }
  }

  [OpCodes.OP_SUCCESS](op: core.Primitive & { _tag: OpCodes.OP_SUCCESS }) {
    const oldCur = op
    const cont = this.getNextSuccessCont()
    if (cont !== undefined) {
      if (!(cont._tag in contOpSuccess)) {
        // @ts-expect-error
        absurd(cont)
      }
      // @ts-expect-error
      return contOpSuccess[cont._tag](this, cont, oldCur.i0)
    } else {
      throw oldCur
    }
  }

  [OpCodes.OP_FAILURE](op: core.Primitive & { _tag: OpCodes.OP_FAILURE }) {
    let cause = op.i0
    if (internalCause.isAnnotatedType(cause) && internalCause.isStackAnnotation(cause.annotation)) {
      const stack = cause.annotation.stack
      const currentStack = this.stackToLines()
      cause = internalCause.annotated(
        cause.cause,
        new StackAnnotation(
          pipe(
            stack.length === 0 ?
              currentStack :
              currentStack.length === 0 ?
              stack :
              Chunk.unsafeLast(stack) === Chunk.unsafeLast(currentStack) ?
              stack :
              pipe(
                stack,
                Chunk.concat(currentStack)
              ),
            Chunk.dedupeAdjacent,
            Chunk.take(Debug.runtimeDebug.traceStackLimit)
          ),
          cause.annotation.seq
        )
      )
    } else {
      cause = internalCause.annotated(
        op.i0,
        new StackAnnotation(this.stackToLines(), MRef.getAndIncrement(internalCause.globalErrorSeq))
      )
    }
    const cont = this.getNextFailCont()
    if (cont !== undefined) {
      switch (cont._tag) {
        case OpCodes.OP_ON_FAILURE:
        case OpCodes.OP_ON_SUCCESS_AND_FAILURE: {
          if (!(_runtimeFlags.interruptible(this._runtimeFlags) && this.isInterrupted())) {
            return cont.i1(cause)
          } else {
            return core.exitFailCause(internalCause.stripFailures(cause))
          }
        }
        case OpCodes.OP_REVERT_FLAGS: {
          this.patchRuntimeFlags(this._runtimeFlags, cont.patch)
          if (_runtimeFlags.interruptible(this._runtimeFlags) && this.isInterrupted()) {
            return core.exitFailCause(internalCause.sequential(cause, this.getInterruptedCause()))
          } else {
            return core.exitFailCause(cause)
          }
        }
        default: {
          absurd(cont)
        }
      }
    } else {
      throw core.exitFailCause(cause)
    }
  }

  [OpCodes.OP_WITH_RUNTIME](op: core.Primitive & { _tag: OpCodes.OP_WITH_RUNTIME }) {
    return op.i0(
      this as FiberRuntime<unknown, unknown>,
      FiberStatus.running(this._runtimeFlags) as FiberStatus.Running
    )
  }

  [OpCodes.OP_UPDATE_RUNTIME_FLAGS](op: core.Primitive & { _tag: OpCodes.OP_UPDATE_RUNTIME_FLAGS }) {
    if (op.i1 === undefined) {
      this.patchRuntimeFlags(this._runtimeFlags, op.i0)
      return core.exitUnit()
    } else {
      const updateFlags = op.i0
      const oldRuntimeFlags = this._runtimeFlags
      const newRuntimeFlags = _runtimeFlags.patch(oldRuntimeFlags, updateFlags)
      if (newRuntimeFlags === oldRuntimeFlags) {
        // No change, short circuit
        return op.i1(oldRuntimeFlags)
      } else {
        // One more chance to short circuit: if we're immediately going
        // to interrupt. Interruption will cause immediate reversion of
        // the flag, so as long as we "peek ahead", there's no need to
        // set them to begin with.
        if (_runtimeFlags.interruptible(newRuntimeFlags) && this.isInterrupted()) {
          return core.exitFailCause(this.getInterruptedCause())
        } else {
          // Impossible to short circuit, so record the changes
          this.patchRuntimeFlags(this._runtimeFlags, updateFlags)
          // Since we updated the flags, we need to revert them
          const revertFlags = _runtimeFlags.diff(newRuntimeFlags, oldRuntimeFlags)
          this.pushStack(new core.RevertFlags(revertFlags))
          return op.i1(oldRuntimeFlags)
        }
      }
    }
  }

  [OpCodes.OP_ON_SUCCESS](op: core.Primitive & { _tag: OpCodes.OP_ON_SUCCESS }) {
    this.pushStack(op)
    return op.i0
  }

  [OpCodes.OP_TRACED](op: core.Primitive & { _tag: OpCodes.OP_TRACED }) {
    this.pushStack(op)
    return op.i0
  }

  [OpCodes.OP_ON_FAILURE](op: core.Primitive & { _tag: OpCodes.OP_ON_FAILURE }) {
    this.pushStack(op)
    return op.i0
  }

  [OpCodes.OP_ON_SUCCESS_AND_FAILURE](op: core.Primitive & { _tag: OpCodes.OP_ON_SUCCESS_AND_FAILURE }) {
    this.pushStack(op)
    return op.i0
  }

  [OpCodes.OP_ASYNC](op: core.Primitive & { _tag: OpCodes.OP_ASYNC }) {
    this._asyncBlockingOn = op.i1
    this.initiateAsync(this._runtimeFlags, op.i0)
    throw op
  }

  [OpCodes.OP_YIELD](op: core.Primitive & { op: OpCodes.OP_YIELD }) {
    throw op
  }

  [OpCodes.OP_WHILE](op: core.Primitive & { _tag: OpCodes.OP_WHILE }) {
    const check = op.i0
    const body = op.i1
    if (check()) {
      this.pushStack(op)
      return body()
    } else {
      return core.exitUnit()
    }
  }

  [OpCodes.OP_COMMIT](op: core.Primitive & { _tag: OpCodes.OP_COMMIT }) {
    return op.commit()
  }

  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(effect0: Effect.Effect<any, any, any>): Exit.Exit<any, any> {
    let cur = effect0
    let ops = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (_runtimeFlags.opSupervision(this._runtimeFlags)) {
        this.getSupervisor().onEffect(this, cur)
      }
      cur = this.drainQueueWhileRunning(this._runtimeFlags, cur)
      ops += 1
      if (ops >= 2048) {
        ops = 0
        const oldCur = cur
        cur = pipe(core.yieldNow(), core.flatMap(() => oldCur))
      }
      try {
        if (!((cur as core.Primitive)._tag in this)) {
          // @ts-expect-error
          absurd(cur)
        }
        // @ts-expect-error
        cur = this[(cur as core.Primitive)._tag](cur as core.Primitive)
      } catch (e) {
        if (core.isEffect(e)) {
          if (
            (e as core.Primitive)._tag === OpCodes.OP_YIELD ||
            (e as core.Primitive)._tag === OpCodes.OP_ASYNC
          ) {
            throw e
          }
          if (
            (e as core.Primitive)._tag === OpCodes.OP_SUCCESS ||
            (e as core.Primitive)._tag === OpCodes.OP_FAILURE
          ) {
            return e as Exit.Exit<E, A>
          }
        } else {
          if (core.isEffectError(e)) {
            cur = core.exitFailCause(e.cause)
          } else if (internalCause.isInterruptedException(e)) {
            cur = core.exitFailCause(
              internalCause.sequential(internalCause.die(e), internalCause.interrupt(FiberId.none))
            )
          } else {
            cur = core.exitFailCause(internalCause.die(e))
          }
        }
      }
    }
  }

  stackToLines(): Chunk.Chunk<Debug.SourceLocation> {
    if (this._traceStack.length === 0) {
      return Chunk.empty()
    }
    const lines: Array<Debug.SourceLocation> = []
    let current = this._traceStack.length - 1
    while (current >= 0 && lines.length < Debug.runtimeDebug.traceStackLimit) {
      const value = this._traceStack[current]!
      lines.push(value)
      current = current - 1
    }
    return Chunk.unsafeFromArray(lines)
  }

  run = () => {
    this.drainQueueOnCurrentThread()
  }
}

// circular with Logger

/** @internal */
export const currentMinimumLogLevel: FiberRef.FiberRef<LogLevel.LogLevel> = core.fiberRefUnsafeMake<LogLevel.LogLevel>(
  LogLevel.fromLiteral(Debug.runtimeDebug.minumumLogLevel)
)

/** @internal */
export const defaultLogger: Logger<string, void> = internalLogger.makeLogger(
  (fiberId, logLevel, message, cause, context, spans, annotations) => {
    const formatted = internalLogger.stringLogger.log(
      fiberId,
      logLevel,
      message,
      cause,
      context,
      spans,
      annotations
    )
    const filter = fiberRefs.getOrDefault(context, currentMinimumLogLevel)
    if (LogLevel.greaterThanEqual(filter)(logLevel)) {
      globalThis.console.log(formatted)
    }
  }
)

/** @internal */
export const logFmtLogger: Logger<string, void> = internalLogger.makeLogger(
  (fiberId, logLevel, message, cause, context, spans, annotations) => {
    const formatted = internalLogger.logfmtLogger.log(
      fiberId,
      logLevel,
      message,
      cause,
      context,
      spans,
      annotations
    )
    const filter = fiberRefs.getOrDefault(context, currentMinimumLogLevel)
    if (LogLevel.greaterThanEqual(filter)(logLevel)) {
      globalThis.console.log(formatted)
    }
  }
)

/** @internal */
export const currentLoggers: FiberRef.FiberRef<
  HashSet.HashSet<Logger<string, any>>
> = core.fiberRefUnsafeMakeHashSet(HashSet.make(defaultLogger))

// circular with Effect

/* @internal */
export const acquireRelease = Debug.methodWithTrace((trace, restore) =>
  <R, E, A, R2, X>(
    acquire: Effect.Effect<R, E, A>,
    release: (a: A, exit: Exit.Exit<unknown, unknown>) => Effect.Effect<R2, never, X>
  ): Effect.Effect<R | R2 | Scope.Scope, E, A> =>
    pipe(
      core.tap(acquire, (a) => addFinalizer((exit) => restore(release)(a, exit))),
      core.uninterruptible
    ).traced(trace)
)

/* @internal */
export const addFinalizer = Debug.methodWithTrace((trace, restore) =>
  <R, X>(
    finalizer: (exit: Exit.Exit<unknown, unknown>) => Effect.Effect<R, never, X>
  ): Effect.Effect<R | Scope.Scope, never, void> =>
    core.flatMap(core.context<R | Scope.Scope>(), (context) =>
      core.flatMap(scope(), (scope) =>
        core.scopeAddFinalizerExit(scope, (exit) =>
          pipe(
            restore(finalizer)(exit),
            core.provideContext(context),
            core.asUnit
          )))).traced(trace)
)

/* @internal */
export const collect = Debug.dualWithTrace<
  <A, R, E, B>(
    f: (a: A) => Effect.Effect<R, Option.Option<E>, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <A, R, E, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, Option.Option<E>, B>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  (elements, f) =>
    pipe(
      core.forEach(elements, (a) => unsome(restore(f)(a))),
      core.map(Chunk.compact)
    ).traced(trace))

/* @internal */
export const collectPar = Debug.dualWithTrace<
  <A, R, E, B>(
    f: (a: A) => Effect.Effect<R, Option.Option<E>, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <A, R, E, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, Option.Option<E>, B>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  (elements, f) =>
    pipe(
      forEachPar(elements, (a) => unsome(restore(f)(a))),
      core.map(Chunk.compact)
    ).traced(trace))

/* @internal */
export const collectAllPar = Debug.methodWithTrace((trace) =>
  <R, E, A>(effects: Iterable<Effect.Effect<R, E, A>>): Effect.Effect<R, E, Chunk.Chunk<A>> =>
    forEachPar(effects, identity).traced(trace)
)

/* @internal */
export const collectAllParDiscard = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    effects: Iterable<Effect.Effect<R, E, A>>
  ): Effect.Effect<R, E, void> => forEachParDiscard(effects, identity).traced(trace)
)

/* @internal */
export const collectAllSuccessesPar = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    elements: Iterable<Effect.Effect<R, E, A>>
  ): Effect.Effect<R, never, Chunk.Chunk<A>> =>
    collectAllWithPar(
      Array.from(elements).map(core.exit),
      (exit) => (core.exitIsSuccess(exit) ? Option.some(exit.i0) : Option.none())
    ).traced(trace)
)

/* @internal */
export const collectAllWithPar = Debug.dualWithTrace<
  <A, B>(
    pf: (a: A) => Option.Option<B>
  ) => <R, E>(elements: Iterable<Effect.Effect<R, E, A>>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <R, E, A, B>(
    elements: Iterable<Effect.Effect<R, E, A>>,
    pf: (a: A) => Option.Option<B>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  (elements, pf) =>
    core.map(
      collectAllPar(elements),
      Chunk.filterMap(restore(pf))
    ).traced(trace))

/* @internal */
export const daemonChildren = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, E, A> => {
    const forkScope = core.fiberRefLocally(core.forkScopeOverride, Option.some(fiberScope.globalScope))
    return forkScope(self).traced(trace)
  }
)

/** @internal */
const _existsParFound = Symbol("@effect/io/Effect/existsPar/found")

/* @internal */
export const existsPar = Debug.dualWithTrace<
  <R, E, A>(f: (a: A) => Effect.Effect<R, E, boolean>) => (elements: Iterable<A>) => Effect.Effect<R, E, boolean>,
  <R, E, A>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, boolean>
>(2, (trace, restore) =>
  (elements, f) =>
    core.matchEffect(
      forEachPar(elements, (a) =>
        core.ifEffect(
          restore(f)(a),
          core.fail(_existsParFound),
          core.unit()
        )),
      (e) => e === _existsParFound ? core.succeed(true) : core.fail(e),
      () => core.succeed(false)
    ).traced(trace))

/* @internal */
export const filterPar = Debug.dualWithTrace<
  <A, R, E>(
    f: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(2, (trace, restore) =>
  (elements, f) =>
    pipe(
      forEachPar(elements, (a) => core.map(restore(f)(a), (b) => (b ? Option.some(a) : Option.none()))),
      core.map(Chunk.compact)
    ).traced(trace))

/* @internal */
export const filterNotPar = Debug.dualWithTrace<
  <A, R, E>(
    f: (a: A) => Effect.Effect<R, E, boolean>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<A>>,
  <A, R, E>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, boolean>) => Effect.Effect<R, E, Chunk.Chunk<A>>
>(2, (trace, restore) =>
  (elements, f) =>
    filterPar(
      elements,
      (a) => core.map(restore(f)(a), (b) => !b)
    ).traced(trace))

/* @internal */
export const forEachExec = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, B>,
    strategy: ExecutionStrategy.ExecutionStrategy
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, E, B>,
    strategy: ExecutionStrategy.ExecutionStrategy
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(3, (trace, restore) =>
  (elements, f, strategy) =>
    core.suspendSucceed(() =>
      pipe(
        strategy,
        ExecutionStrategy.match(
          () => pipe(elements, core.forEach(restore(f))),
          () => pipe(elements, forEachPar(restore(f)), core.withParallelismUnbounded),
          (parallelism) => pipe(elements, forEachPar(restore(f)), core.withParallelism(parallelism))
        )
      )
    ).traced(trace))

/* @internal */
export const forEachPar = Debug.dualWithTrace<
  <A, R, E, B>(f: (a: A) => Effect.Effect<R, E, B>) => (self: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <A, R, E, B>(self: Iterable<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  (self, f) =>
    core.fiberRefGetWith(
      core.currentParallelism,
      (o) =>
        o._tag === "None" ?
          forEachParUnbounded(self, restore(f)) :
          forEachParN(self, o.value, f)
    ).traced(trace))

/* @internal */
export const forEachParDiscard = Debug.dualWithTrace<
  <A, R, E, _>(f: (a: A) => Effect.Effect<R, E, _>) => (self: Iterable<A>) => Effect.Effect<R, E, void>,
  <A, R, E, _>(self: Iterable<A>, f: (a: A) => Effect.Effect<R, E, _>) => Effect.Effect<R, E, void>
>(2, (trace, restore) =>
  (self, f) =>
    core.fiberRefGetWith(
      core.currentParallelism,
      (o) =>
        o._tag === "None" ?
          forEachParUnboundedDiscard(self, restore(f)) :
          forEachParNDiscard(self, o.value, f)
    ).traced(trace))

/* @internal */
const forEachParUnbounded = <A, R, E, B>(
  self: Iterable<A>,
  f: (a: A) => Effect.Effect<R, E, B>
): Effect.Effect<R, E, Chunk.Chunk<B>> =>
  core.suspendSucceed(() => {
    const as = Array.from(self).map((v, i) => [v, i] as const)
    const array = new Array<B>(as.length)
    const fn = ([a, i]: readonly [A, number]) => core.flatMap(f(a), (b) => core.sync(() => array[i] = b))
    return core.zipRight(forEachParUnboundedDiscard(as, fn), core.succeed(Chunk.unsafeFromArray(array)))
  })

/* @internal */
const forEachParUnboundedDiscard = <R, E, A, _>(
  self: Iterable<A>,
  f: (a: A) => Effect.Effect<R, E, _>
): Effect.Effect<R, E, void> =>
  core.suspendSucceed(() => {
    const as = Array.from(self)
    const size = as.length
    if (size === 0) {
      return core.unit()
    } else if (size === 1) {
      return core.asUnit(f(as[0]))
    }
    return core.uninterruptibleMask((restore) => {
      const deferred = core.deferredUnsafeMake<void, void>(FiberId.none)
      let ref = 0
      const process = core.transplant((graft) =>
        core.forEach(as, (a) =>
          pipe(
            graft(pipe(
              restore(core.suspendSucceed(() => f(a))),
              core.matchCauseEffect(
                (cause) =>
                  core.zipRight(
                    core.deferredFail(deferred, void 0),
                    core.failCause(cause)
                  ),
                () => {
                  if (ref + 1 === size) {
                    core.deferredUnsafeDone(deferred, core.unit())
                  } else {
                    ref = ref + 1
                  }
                  return core.unit()
                }
              )
            )),
            forkDaemon
          ))
      )
      return core.flatMap(process, (fibers) =>
        core.matchCauseEffect(
          restore(core.deferredAwait(deferred)),
          (cause) =>
            core.flatMap(
              forEachParUnbounded(fibers, core.interruptFiber),
              (exits) => {
                const exit = core.exitCollectAllPar(exits)
                if (exit._tag === "Some" && core.exitIsFailure(exit.value)) {
                  return core.failCause(
                    internalCause.parallel(internalCause.stripFailures(cause), exit.value.i0)
                  )
                } else {
                  return core.failCause(internalCause.stripFailures(cause))
                }
              }
            ),
          () => core.forEachDiscard(fibers, (f) => f.inheritAll())
        ))
    })
  })

/* @internal */
const forEachParN = <A, R, E, B>(
  self: Iterable<A>,
  n: number,
  f: (a: A) => Effect.Effect<R, E, B>
): Effect.Effect<R, E, Chunk.Chunk<B>> =>
  core.suspendSucceed(() => {
    const as = Array.from(self).map((v, i) => [v, i] as const)
    const array = new Array<B>(as.length)
    const fn = ([a, i]: readonly [A, number]) => core.map(f(a), (b) => array[i] = b)
    return core.zipRight(forEachParNDiscard(as, n, fn), core.succeed(Chunk.unsafeFromArray(array)))
  })

/* @internal */
const forEachParNDiscard = <A, R, E, _>(
  self: Iterable<A>,
  n: number,
  f: (a: A) => Effect.Effect<R, E, _>
): Effect.Effect<R, E, void> =>
  core.suspendSucceed(() => {
    const iterator = self[Symbol.iterator]()
    const worker: Effect.Effect<R, E, void> = core.flatMap(
      core.sync(() => iterator.next()),
      (next) => next.done ? core.unit() : core.flatMap(core.asUnit(f(next.value)), () => worker)
    )
    const effects: Array<Effect.Effect<R, E, void>> = []
    for (let i = 0; i < n; i++) {
      effects.push(worker)
    }
    return forEachParUnboundedDiscard(effects, identity)
  })

/* @internal */
export const forEachParWithIndex = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A, i: number) => Effect.Effect<R, E, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, E, Chunk.Chunk<B>>,
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A, i: number) => Effect.Effect<R, E, B>
  ) => Effect.Effect<R, E, Chunk.Chunk<B>>
>(
  2,
  (trace, restore) =>
    <R, E, A, B>(elements: Iterable<A>, f: (a: A, i: number) => Effect.Effect<R, E, B>) =>
      core.suspendSucceed(() =>
        core.flatMap(core.sync<Array<B>>(() => []), (array) =>
          core.map(
            forEachParDiscard(
              Array.from(elements).map((a, i) => [a, i] as [A, number]),
              ([a, i]) =>
                core.flatMap(core.suspendSucceed(() => restore(f)(a, i)), (b) =>
                  core.sync(() => {
                    array[i] = b
                  }))
            ),
            () => Chunk.unsafeFromArray(array)
          ))
      ).traced(trace)
)

/* @internal */
export const fork = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, Fiber.RuntimeFiber<E, A>> =>
    core.withFiberRuntime<R, never, Fiber.RuntimeFiber<E, A>>((state, status) =>
      core.succeed(unsafeFork(self, state, status.runtimeFlags))
    ).traced(trace)
)

/* @internal */
export const forkAllDiscard = Debug.methodWithTrace((trace) =>
  <R, E, A>(effects: Iterable<Effect.Effect<R, E, A>>): Effect.Effect<R, never, void> =>
    core.forEachDiscard(effects, fork).traced(trace)
)

/* @internal */
export const forkDaemon = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R, never, Fiber.RuntimeFiber<E, A>> =>
    forkWithScopeOverride(self, fiberScope.globalScope).traced(trace)
)

/* @internal */
export const forkWithErrorHandler = Debug.dualWithTrace<
  <E, X>(
    handler: (e: E) => Effect.Effect<never, never, X>
  ) => <R, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, never, Fiber.RuntimeFiber<E, A>>,
  <R, E, A, X>(
    self: Effect.Effect<R, E, A>,
    handler: (e: E) => Effect.Effect<never, never, X>
  ) => Effect.Effect<R, never, Fiber.RuntimeFiber<E, A>>
>(2, (trace, restore) =>
  (self, handler) =>
    fork(core.onError(self, (cause) => {
      const either = internalCause.failureOrCause(cause)
      switch (either._tag) {
        case "Left": {
          return restore(handler)(either.left)
        }
        case "Right": {
          return core.failCause(either.right)
        }
      }
    })).traced(trace))

/** @internal */
export const unsafeFork = <R, E, A, E2, B>(
  effect: Effect.Effect<R, E, A>,
  parentFiber: FiberRuntime<E2, B>,
  parentRuntimeFlags: RuntimeFlags.RuntimeFlags,
  overrideScope: fiberScope.FiberScope | null = null
): FiberRuntime<E, A> => {
  const childFiber = unsafeMakeChildFiber(effect, parentFiber, parentRuntimeFlags, overrideScope)
  childFiber.resume(effect)
  return childFiber
}

/** @internal */
export const unsafeMakeChildFiber = <R, E, A, E2, B>(
  effect: Effect.Effect<R, E, A>,
  parentFiber: FiberRuntime<E2, B>,
  parentRuntimeFlags: RuntimeFlags.RuntimeFlags,
  overrideScope: fiberScope.FiberScope | null = null
): FiberRuntime<E, A> => {
  const childId = FiberId.unsafeMake()
  const parentFiberRefs = parentFiber.unsafeGetFiberRefs()
  const childFiberRefs = fiberRefs.forkAs(parentFiberRefs, childId)
  const childFiber = new FiberRuntime<E, A>(childId, childFiberRefs, parentRuntimeFlags)
  const childContext = fiberRefs.getOrDefault(
    childFiberRefs,
    core.currentContext as unknown as FiberRef.FiberRef<Context.Context<R>>
  )
  const supervisor = childFiber.getSupervisor()

  supervisor.onStart(
    childContext,
    effect,
    Option.some(parentFiber),
    childFiber
  )

  childFiber.unsafeAddObserver((exit) => supervisor.onEnd(exit, childFiber))

  const parentScope = overrideScope !== null ? overrideScope : pipe(
    parentFiber.getFiberRef(core.forkScopeOverride),
    Option.getOrElse(() => parentFiber.scope())
  )

  parentScope.add(parentRuntimeFlags, childFiber)

  return childFiber
}

/* @internal */
const forkWithScopeOverride = <R, E, A>(
  self: Effect.Effect<R, E, A>,
  scopeOverride: fiberScope.FiberScope
): Effect.Effect<R, never, Fiber.RuntimeFiber<E, A>> =>
  core.withFiberRuntime<R, never, Fiber.RuntimeFiber<E, A>>((parentFiber, parentStatus) =>
    core.succeed(unsafeFork(self, parentFiber, parentStatus.runtimeFlags, scopeOverride))
  )

/* @internal */
export const mergeAllPar = Debug.dualWithTrace<
  <Z, A>(zero: Z, f: (z: Z, a: A) => Z) => <R, E>(elements: Iterable<Effect.Effect<R, E, A>>) => Effect.Effect<R, E, Z>,
  <R, E, A, Z>(elements: Iterable<Effect.Effect<R, E, A>>, zero: Z, f: (z: Z, a: A) => Z) => Effect.Effect<R, E, Z>
>(3, (trace, restore) =>
  (elements, zero, f) =>
    core.flatMap(Ref.make(zero), (acc) =>
      core.flatMap(
        forEachParDiscard(
          elements,
          core.flatMap((a) => Ref.update(acc, (b) => restore(f)(b, a)))
        ),
        () => Ref.get(acc)
      )).traced(trace))

/* @internal */
export const onDone = Debug.dualWithTrace<
  <E, A, R1, X1, R2, X2>(
    onError: (e: E) => Effect.Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect.Effect<R2, never, X2>
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R1 | R2, never, void>,
  <R, E, A, R1, X1, R2, X2>(
    self: Effect.Effect<R, E, A>,
    onError: (e: E) => Effect.Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect.Effect<R2, never, X2>
  ) => Effect.Effect<R | R1 | R2, never, void>
>(
  3,
  (trace, restoreTrace) =>
    (self, onError, onSuccess) =>
      core.uninterruptibleMask((restore) =>
        core.asUnit(forkDaemon(core.matchEffect(
          restore(self),
          (e) => restore(restoreTrace(onError)(e)),
          (a) => restore(restoreTrace(onSuccess)(a))
        ))).traced(trace)
      )
)

/* @internal */
export const onDoneCause = Debug.dualWithTrace<
  <E, A, R1, X1, R2, X2>(
    onCause: (cause: Cause.Cause<E>) => Effect.Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect.Effect<R2, never, X2>
  ) => <R>(self: Effect.Effect<R, E, A>) => Effect.Effect<R | R1 | R2, never, void>,
  <R, E, A, R1, X1, R2, X2>(
    self: Effect.Effect<R, E, A>,
    onCause: (cause: Cause.Cause<E>) => Effect.Effect<R1, never, X1>,
    onSuccess: (a: A) => Effect.Effect<R2, never, X2>
  ) => Effect.Effect<R | R1 | R2, never, void>
>(
  3,
  (trace, restoreTrace) =>
    (self, onCause, onSuccess) =>
      core.uninterruptibleMask((restore) =>
        core.asUnit(forkDaemon(core.matchCauseEffect(
          restore(self),
          (c) => restore(restoreTrace(onCause)(c)),
          (a) => restore(restoreTrace(onSuccess)(a))
        )))
      ).traced(trace)
)

/* @internal */
export const partitionPar = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>,
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, E, B>
  ) => Effect.Effect<R, never, readonly [Chunk.Chunk<E>, Chunk.Chunk<B>]>
>(2, (trace, restore) =>
  (elements, f) =>
    pipe(
      forEachPar(elements, (a) => core.either(restore(f)(a))),
      core.map((chunk) => core.partitionMap(chunk, identity))
    ).traced(trace))

/* @internal */
export const raceAll = Debug.methodWithTrace((trace) =>
  <R, E, A>(all: Iterable<Effect.Effect<R, E, A>>) => {
    const list = Chunk.fromIterable(all)
    if (!Chunk.isNonEmpty(list)) {
      return core.dieSync(() => internalCause.IllegalArgumentException(`Received an empty collection of effects`))
    }
    const self = Chunk.headNonEmpty(list)
    const effects = Chunk.tailNonEmpty(list)
    const inheritAll = (res: readonly [A, Fiber.Fiber<E, A>]) =>
      pipe(
        internalFiber.inheritAll(res[1]),
        core.as(res[0])
      )
    return pipe(
      core.deferredMake<E, readonly [A, Fiber.Fiber<E, A>]>(),
      core.flatMap((done) =>
        pipe(
          Ref.make(effects.length),
          core.flatMap((fails) =>
            core.uninterruptibleMask<R, E, A>((restore) =>
              pipe(
                fork(core.interruptible(self)),
                core.flatMap((head) =>
                  pipe(
                    effects,
                    core.forEach((effect) => fork(core.interruptible(effect))),
                    core.map((tail) => pipe(tail, Chunk.prepend(head)) as Chunk.Chunk<Fiber.RuntimeFiber<E, A>>),
                    core.tap((fibers) =>
                      pipe(
                        fibers,
                        Chunk.reduce(core.unit(), (effect, fiber) =>
                          pipe(
                            effect,
                            core.zipRight(
                              pipe(
                                internalFiber._await(fiber),
                                core.flatMap(raceAllArbiter(fibers, fiber, done, fails)),
                                fork,
                                core.asUnit
                              )
                            )
                          ))
                      )
                    ),
                    core.flatMap((fibers) =>
                      pipe(
                        restore(pipe(Deferred.await(done), core.flatMap(inheritAll))),
                        core.onInterrupt(() =>
                          pipe(
                            fibers,
                            Chunk.reduce(
                              core.unit(),
                              (effect, fiber) => pipe(effect, core.zipLeft(core.interruptFiber(fiber)))
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    ).traced(trace)
  }
)

/* @internal */
const raceAllArbiter = <E, E1, A, A1>(
  fibers: Chunk.Chunk<Fiber.Fiber<E | E1, A | A1>>,
  winner: Fiber.Fiber<E | E1, A | A1>,
  deferred: Deferred.Deferred<E | E1, readonly [A | A1, Fiber.Fiber<E | E1, A | A1>]>,
  fails: Ref.Ref<number>
) =>
  (exit: Exit.Exit<E | E1, A | A1>): Effect.Effect<never, never, void> =>
    pipe(
      exit,
      core.exitMatchEffect(
        (cause) =>
          pipe(
            Ref.modify(fails, (fails) =>
              [
                fails === 0 ?
                  pipe(core.deferredFailCause(deferred, cause), core.asUnit) :
                  core.unit(),
                fails - 1
              ] as const),
            core.flatten
          ),
        (value): Effect.Effect<never, never, void> =>
          pipe(
            core.deferredSucceed(deferred, [value, winner] as const),
            core.flatMap((set) =>
              set ?
                pipe(
                  fibers,
                  Chunk.reduce(
                    core.unit(),
                    (effect, fiber) =>
                      fiber === winner ?
                        effect :
                        pipe(effect, core.zipLeft(core.interruptFiber(fiber)))
                  )
                ) :
                core.unit()
            )
          )
      )
    )

/* @internal */
export const reduceAllPar = Debug.dualWithTrace<
  <R, E, A>(
    zero: Effect.Effect<R, E, A>,
    f: (acc: A, a: A) => A
  ) => (elements: Iterable<Effect.Effect<R, E, A>>) => Effect.Effect<R, E, A>,
  <R, E, A>(
    elements: Iterable<Effect.Effect<R, E, A>>,
    zero: Effect.Effect<R, E, A>,
    f: (acc: A, a: A) => A
  ) => Effect.Effect<R, E, A>
>(3, (trace, restore) =>
  <R, E, A>(
    elements: Iterable<Effect.Effect<R, E, A>>,
    zero: Effect.Effect<R, E, A>,
    f: (acc: A, a: A) => A
  ) =>
    core.suspendSucceed(() =>
      pipe(
        mergeAllPar(
          [zero, ...Array.from(elements)],
          Option.none() as Option.Option<A>,
          (acc, elem) => {
            switch (acc._tag) {
              case "None": {
                return Option.some(elem)
              }
              case "Some": {
                return Option.some(restore(f)(acc.value, elem))
              }
            }
          }
        ),
        core.map((option) => {
          switch (option._tag) {
            case "None": {
              throw new Error(
                "BUG: Effect.reduceAllPar - please report an issue at https://github.com/Effect-TS/io/issues"
              )
            }
            case "Some": {
              return option.value
            }
          }
        })
      )
    ).traced(trace))

/* @internal */
export const parallelFinalizers = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R | Scope.Scope, E, A> =>
    core.flatMap(scope(), (outerScope) =>
      core.flatMap(scopeMake(ExecutionStrategy.parallel), (innerScope) =>
        pipe(
          outerScope.addFinalizer((exit) => innerScope.close(exit)),
          core.zipRight(pipe(self, scopeExtend(innerScope)))
        ))).traced(trace)
)

/* @internal */
export const scope = Debug.methodWithTrace((trace) =>
  (): Effect.Effect<Scope.Scope, never, Scope.Scope> => core.service(scopeTag).traced(trace)
)

/* @internal */
export const scopeWith = Debug.methodWithTrace((trace, restore) =>
  <R, E, A>(f: (scope: Scope.Scope) => Effect.Effect<R, E, A>): Effect.Effect<R | Scope.Scope, E, A> =>
    core.serviceWithEffect(scopeTag, restore(f)).traced(trace)
)

/* @internal */
export const scopedEffect = Debug.methodWithTrace((trace) =>
  <R, E, A>(effect: Effect.Effect<R, E, A>): Effect.Effect<Exclude<R, Scope.Scope>, E, A> =>
    core.flatMap(scopeMake(), (scope) => scopeUse(scope)(effect)).traced(trace)
)

/* @internal */
export const sequentialFinalizers = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, A>): Effect.Effect<R | Scope.Scope, E, A> =>
    scopeWith((scope) =>
      pipe(
        core.scopeFork(scope, ExecutionStrategy.sequential),
        core.flatMap((scope) => scopeExtend(scope)(self))
      )
    ).traced(trace)
)

/* @internal */
export const some = Debug.methodWithTrace((trace) =>
  <R, E, A>(self: Effect.Effect<R, E, Option.Option<A>>): Effect.Effect<R, Option.Option<E>, A> =>
    core.matchEffect(
      self,
      (e) => core.fail(Option.some(e)),
      (option) => {
        switch (option._tag) {
          case "None": {
            return core.fail(Option.none())
          }
          case "Some": {
            return core.succeed(option.value)
          }
        }
      }
    ).traced(trace)
)

/* @internal */
export const someWith = Debug.dualWithTrace<
  <R, E, A, R1, E1, A1>(
    f: (effect: Effect.Effect<R, Option.Option<E>, A>) => Effect.Effect<R1, Option.Option<E1>, A1>
  ) => (self: Effect.Effect<R, E, Option.Option<A>>) => Effect.Effect<R | R1, E | E1, Option.Option<A1>>,
  <R, E, A, R1, E1, A1>(
    self: Effect.Effect<R, E, Option.Option<A>>,
    f: (effect: Effect.Effect<R, Option.Option<E>, A>) => Effect.Effect<R1, Option.Option<E1>, A1>
  ) => Effect.Effect<R | R1, E | E1, Option.Option<A1>>
>(2, (trace, restore) => (self, f) => core.suspendSucceed(() => unsome(restore(f)(some(self)))).traced(trace))

/* @internal */
export const allPar = Debug.methodWithTrace((trace): {
  <R, E, A, T extends ReadonlyArray<Effect.Effect<any, any, any>>>(
    self: Effect.Effect<R, E, A>,
    ...args: T
  ): Effect.Effect<
    R | T["length"] extends 0 ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    E | T["length"] extends 0 ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    readonly [
      A,
      ...(T["length"] extends 0 ? []
        : Readonly<{ [K in keyof T]: [T[K]] extends [Effect.Effect<any, any, infer A>] ? A : never }>)
    ]
  >
  <T extends ReadonlyArray<Effect.Effect<any, any, any>>>(
    args: [...T]
  ): Effect.Effect<
    T[number] extends never ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    T[number] extends never ? never
      : [T[number]] extends [{ [Effect.EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    T[number] extends never ? []
      : Readonly<{ [K in keyof T]: [T[K]] extends [Effect.Effect<any, any, infer A>] ? A : never }>
  >
  <T extends Readonly<{ [K: string]: Effect.Effect<any, any, any> }>>(
    args: T
  ): Effect.Effect<
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [Effect.EffectTypeId]: { _R: (_: never) => infer R } }] ? R
      : never,
    keyof T extends never ? never
      : [T[keyof T]] extends [{ [Effect.EffectTypeId]: { _E: (_: never) => infer E } }] ? E
      : never,
    Readonly<{ [K in keyof T]: [T[K]] extends [Effect.Effect<any, any, infer A>] ? A : never }>
  >
} =>
  function() {
    if (arguments.length === 1) {
      if (core.isEffect(arguments[0])) {
        return core.map(arguments[0], (x) => [x])
      } else if (Array.isArray(arguments[0])) {
        return core.map(collectAllPar(arguments[0]), Chunk.toReadonlyArray).traced(trace)
      } else {
        return pipe(
          forEachPar(
            Object.entries(arguments[0] as Readonly<{ [K: string]: Effect.Effect<any, any, any> }>),
            ([_, e]) => core.map(e, (a) => [_, a] as const)
          ),
          core.map((values) => {
            const res = {}
            for (const [k, v] of values) {
              res[k] = v
            }
            return res
          })
        ).traced(trace) as any
      }
    }
    return core.map(collectAllPar(arguments), Chunk.toReadonlyArray).traced(trace)
  }
)

/* @internal */
export const taggedScoped = Debug.methodWithTrace((trace) =>
  (key: string, value: string): Effect.Effect<Scope.Scope, never, void> =>
    taggedScopedWithLabels([metricLabel.make(key, value)]).traced(trace)
)

/* @internal */
export const taggedScopedWithLabels = Debug.methodWithTrace((trace) =>
  (labels: ReadonlyArray<MetricLabel.MetricLabel>): Effect.Effect<Scope.Scope, never, void> =>
    taggedScopedWithLabelSet(HashSet.fromIterable(labels)).traced(trace)
)

/* @internal */
export const taggedScopedWithLabelSet = Debug.methodWithTrace((trace) =>
  (labels: HashSet.HashSet<MetricLabel.MetricLabel>): Effect.Effect<Scope.Scope, never, void> =>
    fiberRefLocallyScopedWith(core.currentTags, (set) => pipe(set, HashSet.union(labels))).traced(trace)
)

/* @internal */
export const using = Debug.dualWithTrace<
  <A, R2, E2, A2>(
    use: (a: A) => Effect.Effect<R2, E2, A2>
  ) => <R, E>(self: Effect.Effect<R | Scope.Scope, E, A>) => Effect.Effect<R | R2, E | E2, A2>,
  <R, E, A, R2, E2, A2>(
    self: Effect.Effect<R | Scope.Scope, E, A>,
    use: (a: A) => Effect.Effect<R2, E2, A2>
  ) => Effect.Effect<R | R2, E | E2, A2>
>(2, (trace, restore) =>
  (self, use) =>
    core.acquireUseRelease(
      scopeMake(),
      (scope) => pipe(self, scopeExtend(scope), core.flatMap(restore(use))),
      (scope, exit) => core.scopeClose(scope, exit)
    ).traced(trace))

/* @internal */
export const unsome = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, Option.Option<E>, A>
  ): Effect.Effect<R, E, Option.Option<A>> =>
    core.matchEffect(
      self,
      (option) => {
        switch (option._tag) {
          case "None": {
            return core.succeed(Option.none())
          }
          case "Some": {
            return core.fail(option.value)
          }
        }
      },
      (a) => core.succeed(Option.some(a))
    ).traced(trace)
)

/* @internal */
export const validateAllPar = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>,
  <R, E, A, B>(
    elements: Iterable<A>,
    f: (a: A) => Effect.Effect<R, E, B>
  ) => Effect.Effect<R, Chunk.Chunk<E>, Chunk.Chunk<B>>
>(2, (trace, restore) =>
  (elements, f) =>
    core.flatMap(
      partitionPar(elements, restore(f)),
      ([es, bs]) =>
        Chunk.isEmpty(es)
          ? core.succeed(bs)
          : core.fail(es)
    ).traced(trace))

/* @internal */
export const validateAllParDiscard = Debug.dualWithTrace<
  <R, E, A, B>(
    f: (a: A) => Effect.Effect<R, E, B>
  ) => (elements: Iterable<A>) => Effect.Effect<R, Chunk.Chunk<E>, void>,
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, Chunk.Chunk<E>, void>
>(2, (trace, restore) =>
  (elements, f) =>
    core.flatMap(
      partitionPar(elements, restore(f)),
      ([es, _]) =>
        Chunk.isEmpty(es)
          ? core.unit()
          : core.fail(es)
    ).traced(trace))

/* @internal */
export const validateFirstPar = Debug.dualWithTrace<
  <R, E, A, B>(f: (a: A) => Effect.Effect<R, E, B>) => (elements: Iterable<A>) => Effect.Effect<R, Chunk.Chunk<E>, B>,
  <R, E, A, B>(elements: Iterable<A>, f: (a: A) => Effect.Effect<R, E, B>) => Effect.Effect<R, Chunk.Chunk<E>, B>
>(2, (trace, restore) =>
  (elements, f) =>
    core.flip(
      forEachPar(elements, (a) => core.flip(restore(f)(a)))
    ).traced(trace))

/* @internal */
export const withClockScoped = Debug.methodWithTrace((trace) =>
  <A extends Clock.Clock>(value: A) =>
    fiberRefLocallyScopedWith(defaultServices.currentServices, Context.add(clock.clockTag, value)).traced(trace)
)

/* @internal */
export const withConfigProviderScoped = Debug.methodWithTrace((trace) =>
  (value: ConfigProvider) =>
    fiberRefLocallyScopedWith(defaultServices.currentServices, Context.add(configProviderTag, value)).traced(trace)
)

/* @internal */
export const withEarlyRelease = Debug.methodWithTrace((trace) =>
  <R, E, A>(
    self: Effect.Effect<R, E, A>
  ): Effect.Effect<R | Scope.Scope, E, readonly [Effect.Effect<never, never, void>, A]> =>
    scopeWith((parent) =>
      core.flatMap(core.scopeFork(parent, ExecutionStrategy.sequential), (child) =>
        pipe(
          self,
          scopeExtend(child),
          core.map((value) =>
            [
              core.fiberIdWith((fiberId) => core.scopeClose(child, core.exitInterrupt(fiberId))),
              value
            ] as const
          )
        ))
    ).traced(trace)
)

/* @internal */
export const withRuntimeFlagsScoped = Debug.methodWithTrace((trace) =>
  (update: RuntimeFlagsPatch.RuntimeFlagsPatch): Effect.Effect<Scope.Scope, never, void> => {
    if (update === RuntimeFlagsPatch.empty) {
      return core.unit()
    }
    return pipe(
      core.runtimeFlags(),
      core.flatMap((runtimeFlags) => {
        const updatedRuntimeFlags = _runtimeFlags.patch(runtimeFlags, update)
        const revertRuntimeFlags = _runtimeFlags.diff(updatedRuntimeFlags, runtimeFlags)
        return pipe(
          core.updateRuntimeFlags(update),
          core.zipRight(addFinalizer(() => core.updateRuntimeFlags(revertRuntimeFlags))),
          core.asUnit
        )
      }),
      core.uninterruptible
    ).traced(trace)
  }
)

// circular with ReleaseMap

/* @internal */
export const releaseMapReleaseAll = (
  strategy: ExecutionStrategy.ExecutionStrategy,
  exit: Exit.Exit<unknown, unknown>
) =>
  (self: core.ReleaseMap): Effect.Effect<never, never, void> =>
    core.suspendSucceed(() => {
      switch (self.state._tag) {
        case "Exited": {
          return core.unit()
        }
        case "Running": {
          const finalizersMap = self.state.finalizers
          const update = self.state.update
          const finalizers = Array.from(finalizersMap.keys()).sort((a, b) => b - a).map((key) =>
            finalizersMap.get(key)!
          )
          self.state = { _tag: "Exited", nextKey: self.state.nextKey, exit, update }
          return ExecutionStrategy.isSequential(strategy) ?
            pipe(
              finalizers,
              core.forEach((fin) => core.exit(update(fin)(exit))),
              core.flatMap((results) =>
                pipe(
                  core.exitCollectAll(results),
                  Option.map(core.exitAsUnit),
                  Option.getOrElse(() => core.exitUnit())
                )
              )
            ) :
            ExecutionStrategy.isParallel(strategy) ?
            pipe(
              finalizers,
              forEachPar((fin) => core.exit(update(fin)(exit))),
              core.flatMap((results) =>
                pipe(
                  core.exitCollectAllPar(results),
                  Option.map(core.exitAsUnit),
                  Option.getOrElse(() => core.exitUnit())
                )
              )
            ) :
            pipe(
              finalizers,
              forEachPar((fin) => core.exit(update(fin)(exit))),
              core.flatMap((results) =>
                pipe(
                  core.exitCollectAllPar(results),
                  Option.map(core.exitAsUnit),
                  Option.getOrElse(() => core.exitUnit())
                )
              ),
              core.withParallelism(strategy.parallelism)
            )
        }
      }
    })

// circular with Scope

/** @internal */
export const scopeTag = Context.Tag<Scope.Scope>()

/* @internal */
export const scopeMake = Debug.methodWithTrace((trace) =>
  (
    strategy: ExecutionStrategy.ExecutionStrategy = ExecutionStrategy.sequential
  ): Effect.Effect<never, never, Scope.Scope.Closeable> =>
    core.map(core.releaseMapMake(), (rm): Scope.Scope.Closeable => ({
      [core.ScopeTypeId]: core.ScopeTypeId,
      [core.CloseableScopeTypeId]: core.CloseableScopeTypeId,
      fork: (strategy) =>
        Debug.bodyWithTrace((trace) =>
          core.uninterruptible(
            pipe(
              scopeMake(strategy),
              core.flatMap((scope) =>
                pipe(
                  rm,
                  core.releaseMapAdd((exit) => core.scopeClose(scope, exit)),
                  core.tap((fin) => core.scopeAddFinalizerExit(scope, fin)),
                  core.as(scope)
                )
              )
            )
          ).traced(trace)
        ),
      close: (exit) =>
        Debug.bodyWithTrace((trace) => core.asUnit(releaseMapReleaseAll(strategy, exit)(rm)).traced(trace)),
      addFinalizer: (fin) => Debug.bodyWithTrace((trace) => core.asUnit(core.releaseMapAdd(fin)(rm)).traced(trace))
    })).traced(trace)
)

/* @internal */
export const scopeExtend = Debug.dualWithTrace<
  (scope: Scope.Scope) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<Exclude<R, Scope.Scope>, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, scope: Scope.Scope) => Effect.Effect<Exclude<R, Scope.Scope>, E, A>
>(
  2,
  (trace) =>
    <R, E, A>(effect: Effect.Effect<R, E, A>, scope: Scope.Scope) =>
      core.contramapContext<Exclude<R, Scope.Scope>, R, E, A>(
        effect,
        // @ts-expect-error
        Context.merge(Context.make(scopeTag, scope))
      ).traced(trace)
)

/* @internal */
export const scopeUse = Debug.dualWithTrace<
  (
    scope: Scope.Scope.Closeable
  ) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<Exclude<R, Scope.Scope>, E, A>,
  <R, E, A>(
    effect: Effect.Effect<R, E, A>,
    scope: Scope.Scope.Closeable
  ) => Effect.Effect<Exclude<R, Scope.Scope>, E, A>
>(2, (trace) =>
  (effect, scope) =>
    pipe(
      effect,
      scopeExtend(scope),
      core.onExit((exit) => scope.close(exit))
    ).traced(trace))

// circular with Supervisor

/** @internal */
export const fiberRefUnsafeMakeSupervisor = (
  initial: Supervisor.Supervisor<any>
): FiberRef.FiberRef<Supervisor.Supervisor<any>> =>
  core.fiberRefUnsafeMakePatch(
    initial,
    SupervisorPatch.differ,
    SupervisorPatch.empty
  )

// circular with FiberRef

/* @internal */
export const fiberRefLocallyScoped = Debug.dualWithTrace<
  <A>(value: A) => (self: FiberRef.FiberRef<A>) => Effect.Effect<Scope.Scope, never, void>,
  <A>(self: FiberRef.FiberRef<A>, value: A) => Effect.Effect<Scope.Scope, never, void>
>(2, (trace) =>
  (self, value) =>
    pipe(
      acquireRelease(
        pipe(
          core.fiberRefGet(self),
          core.flatMap((oldValue) => pipe(core.fiberRefSet(self, value), core.as(oldValue)))
        ),
        (oldValue) => core.fiberRefSet(self, oldValue)
      ),
      core.asUnit
    ).traced(trace))

/* @internal */
export const fiberRefLocallyScopedWith = Debug.dualWithTrace<
  <A>(f: (a: A) => A) => (self: FiberRef.FiberRef<A>) => Effect.Effect<Scope.Scope, never, void>,
  <A>(self: FiberRef.FiberRef<A>, f: (a: A) => A) => Effect.Effect<Scope.Scope, never, void>
>(
  2,
  (trace, restore) =>
    (self, f) => core.fiberRefGetWith(self, (a) => fiberRefLocallyScoped(self, restore(f)(a))).traced(trace)
)

/* @internal */
export const fiberRefMake = Debug.methodWithTrace((trace, restore) =>
  <A>(
    initial: A,
    fork: (a: A) => A = identity,
    join: (left: A, right: A) => A = (_, a) => a
  ): Effect.Effect<Scope.Scope, never, FiberRef.FiberRef<A>> =>
    fiberRefMakeWith(() => core.fiberRefUnsafeMake(initial, restore(fork), restore(join))).traced(trace)
)

/* @internal */
export const fiberRefMakeWith = Debug.methodWithTrace((trace, restore) =>
  <Value>(
    ref: LazyArg<FiberRef.FiberRef<Value>>
  ): Effect.Effect<Scope.Scope, never, FiberRef.FiberRef<Value>> =>
    acquireRelease(
      core.tap(
        core.sync(restore(ref)),
        (ref) => core.fiberRefUpdate(ref, identity)
      ),
      (fiberRef) => core.fiberRefDelete(fiberRef)
    ).traced(trace)
)

/* @internal */
export const fiberRefMakeContext = Debug.methodWithTrace((trace) =>
  <A>(
    initial: Context.Context<A>
  ): Effect.Effect<Scope.Scope, never, FiberRef.FiberRef<Context.Context<A>>> =>
    fiberRefMakeWith(() => core.fiberRefUnsafeMakeContext(initial)).traced(trace)
)

/* @internal */
export const fiberRefMakeRuntimeFlags = Debug.methodWithTrace((trace) =>
  (
    initial: RuntimeFlags.RuntimeFlags
  ): Effect.Effect<Scope.Scope, never, FiberRef.FiberRef<RuntimeFlags.RuntimeFlags>> =>
    fiberRefMakeWith(() => core.fiberRefUnsafeMakeRuntimeFlags(initial)).traced(trace)
)

/** @internal */
export const currentRuntimeFlags: FiberRef.FiberRef<RuntimeFlags.RuntimeFlags> = core.fiberRefUnsafeMakeRuntimeFlags(
  _runtimeFlags.none
)

/** @internal */
export const currentSupervisor: FiberRef.FiberRef<Supervisor.Supervisor<any>> = fiberRefUnsafeMakeSupervisor(
  supervisor.none
)

// circular with Fiber

/* @internal */
export const fiberAwaitAll = Debug.methodWithTrace((trace) =>
  (fibers: Iterable<Fiber.Fiber<any, any>>): Effect.Effect<never, never, void> =>
    core.asUnit(internalFiber._await(fiberCollectAll(fibers))).traced(trace)
)

/** @internal */
export const fiberCollectAll = <E, A>(fibers: Iterable<Fiber.Fiber<E, A>>): Fiber.Fiber<E, Chunk.Chunk<A>> => ({
  [internalFiber.FiberTypeId]: internalFiber.fiberVariance,
  id: () => Array.from(fibers).reduce((id, fiber) => FiberId.combine(id, fiber.id()), FiberId.none),
  await: Debug.methodWithTrace((trace) =>
    () => core.exit(forEachPar(fibers, (fiber) => core.flatten(fiber.await()))).traced(trace)
  ),
  children: Debug.methodWithTrace((trace) =>
    () => core.map(forEachPar(fibers, (fiber) => fiber.children()), Chunk.flatten).traced(trace)
  ),
  inheritAll: Debug.methodWithTrace((trace) =>
    () => core.forEachDiscard(fibers, (fiber) => fiber.inheritAll()).traced(trace)
  ),
  poll: Debug.methodWithTrace((trace) =>
    () =>
      core.map(
        core.forEach(fibers, (fiber) => fiber.poll()),
        Chunk.reduceRight(
          Option.some<Exit.Exit<E, Chunk.Chunk<A>>>(core.exitSucceed(Chunk.empty())),
          (optionB, optionA) => {
            switch (optionA._tag) {
              case "None": {
                return Option.none()
              }
              case "Some": {
                switch (optionB._tag) {
                  case "None": {
                    return Option.none()
                  }
                  case "Some": {
                    return Option.some(
                      pipe(
                        optionA.value,
                        core.exitZipWith(
                          optionB.value,
                          (a, chunk) => pipe(chunk, Chunk.prepend(a)),
                          internalCause.parallel
                        )
                      )
                    )
                  }
                }
              }
            }
          }
        )
      ).traced(trace)
  ),
  interruptAsFork: Debug.methodWithTrace((trace) =>
    (fiberId) => core.forEachDiscard(fibers, (fiber) => fiber.interruptAsFork(fiberId)).traced(trace)
  )
})

/* @internal */
export const fiberInterruptFork = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<never, never, void> =>
    pipe(core.interruptFiber(self), forkDaemon, core.asUnit).traced(trace)
)

/* @internal */
export const fiberJoinAll = Debug.methodWithTrace((trace) =>
  <E, A>(fibers: Iterable<Fiber.Fiber<E, A>>): Effect.Effect<never, E, void> =>
    core.asUnit(internalFiber.join(fiberCollectAll(fibers))).traced(trace)
)

/* @internal */
export const fiberScoped = Debug.methodWithTrace((trace) =>
  <E, A>(self: Fiber.Fiber<E, A>): Effect.Effect<Scope.Scope, never, Fiber.Fiber<E, A>> =>
    acquireRelease(core.succeed(self), core.interruptFiber).traced(trace)
)
