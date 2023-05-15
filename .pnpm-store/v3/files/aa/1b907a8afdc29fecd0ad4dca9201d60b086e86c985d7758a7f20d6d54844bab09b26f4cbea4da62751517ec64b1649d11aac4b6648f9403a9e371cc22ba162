/**
 * @since 1.0.0
 */

import { globalValue } from "@effect/data/Global"

/**
 * @since 1.0.0
 * @category models
 */
export type Task = () => void

/**
 * @since 1.0.0
 * @category models
 */
export interface Scheduler {
  get executionMode(): "PreferSync" | "PreferAsync" | "Sync"
  scheduleTask(task: Task): void
}

class DefaultScheduler implements Scheduler {
  running = false
  tasks: Array<Task> = []

  get executionMode(): "PreferSync" | "PreferAsync" | "Sync" {
    return "PreferAsync"
  }

  starveInternal(depth: number) {
    const toRun = this.tasks
    this.tasks = []
    for (let i = 0; i < toRun.length; i++) {
      toRun[i]()
    }
    if (this.tasks.length === 0) {
      this.running = false
    } else {
      this.starve(depth)
    }
  }

  starve(depth = 0) {
    if (depth >= 2048) {
      setTimeout(() => this.starveInternal(0), 0)
    } else {
      Promise.resolve(void 0).then(() => this.starveInternal(depth + 1))
    }
  }

  scheduleTask(task: Task) {
    this.tasks.push(task)
    if (!this.running) {
      this.running = true
      this.starve()
    }
  }
}

/**
 * @since 1.0.0
 * @category schedulers
 */
export const defaultScheduler: Scheduler = globalValue(
  Symbol.for("@effect/io/Scheduler/defaultScheduler"),
  () => new DefaultScheduler()
)

/**
 * @since 1.0.0
 * @category schedulers
 */
export class SyncScheduler implements Scheduler {
  /**
   * @since 1.0.0
   */
  tasks: Array<Task> = []

  /**
   * @since 1.0.0
   */
  deferred = false

  constructor(
    /**
     * @since 1.0.0
     */
    readonly initialMode: "PreferSync" | "PreferAsync" | "Sync"
  ) {}

  /**
   * @since 1.0.0
   */
  scheduleTask(task: Task) {
    if (this.deferred) {
      defaultScheduler.scheduleTask(task)
    } else {
      this.tasks.push(task)
    }
  }

  /**
   * @since 1.0.0
   */
  get executionMode(): "PreferSync" | "PreferAsync" | "Sync" {
    if (this.deferred) {
      return defaultScheduler.executionMode
    }
    return this.initialMode
  }

  /**
   * @since 1.0.0
   */
  flush() {
    while (this.tasks.length > 0) {
      const toRun = this.tasks
      this.tasks = []
      for (let i = 0; i < toRun.length; i++) {
        toRun[i]()
      }
    }
    this.deferred = true
  }
}

/**
 * @since 1.0.0
 * @category schedulers
 */
export class ControlledScheduler implements Scheduler {
  /**
   * @since 1.0.0
   */
  tasks: Array<Task> = []

  /**
   * @since 1.0.0
   */
  deferred = false

  constructor(
    /**
     * @since 1.0.0
     */
    readonly currentMode: () => "PreferSync" | "PreferAsync" | "Sync"
  ) {}

  /**
   * @since 1.0.0
   */
  scheduleTask(task: Task) {
    if (this.deferred) {
      defaultScheduler.scheduleTask(task)
    } else {
      this.tasks.push(task)
    }
  }

  /**
   * @since 1.0.0
   */
  get executionMode(): "PreferSync" | "PreferAsync" | "Sync" {
    return this.currentMode()
  }

  /**
   * @since 1.0.0
   */
  step() {
    const toRun = this.tasks
    this.tasks = []
    for (let i = 0; i < toRun.length; i++) {
      toRun[i]()
    }
  }
}
