"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultScheduler = exports.SyncScheduler = exports.ControlledScheduler = void 0;
var _Global = /*#__PURE__*/require("@effect/data/Global");
/**
 * @since 1.0.0
 */

class DefaultScheduler {
  constructor() {
    this.running = false;
    this.tasks = [];
  }
  get executionMode() {
    return "PreferAsync";
  }
  starveInternal(depth) {
    const toRun = this.tasks;
    this.tasks = [];
    for (let i = 0; i < toRun.length; i++) {
      toRun[i]();
    }
    if (this.tasks.length === 0) {
      this.running = false;
    } else {
      this.starve(depth);
    }
  }
  starve(depth = 0) {
    if (depth >= 2048) {
      setTimeout(() => this.starveInternal(0), 0);
    } else {
      Promise.resolve(void 0).then(() => this.starveInternal(depth + 1));
    }
  }
  scheduleTask(task) {
    this.tasks.push(task);
    if (!this.running) {
      this.running = true;
      this.starve();
    }
  }
}
/**
 * @since 1.0.0
 * @category schedulers
 */
const defaultScheduler = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/io/Scheduler/defaultScheduler"), () => new DefaultScheduler());
/**
 * @since 1.0.0
 * @category schedulers
 */
exports.defaultScheduler = defaultScheduler;
class SyncScheduler {
  constructor(
  /**
   * @since 1.0.0
   */
  initialMode) {
    this.initialMode = initialMode;
    /**
     * @since 1.0.0
     */
    this.tasks = [];
    /**
     * @since 1.0.0
     */
    this.deferred = false;
  }
  /**
   * @since 1.0.0
   */
  scheduleTask(task) {
    if (this.deferred) {
      defaultScheduler.scheduleTask(task);
    } else {
      this.tasks.push(task);
    }
  }
  /**
   * @since 1.0.0
   */
  get executionMode() {
    if (this.deferred) {
      return defaultScheduler.executionMode;
    }
    return this.initialMode;
  }
  /**
   * @since 1.0.0
   */
  flush() {
    while (this.tasks.length > 0) {
      const toRun = this.tasks;
      this.tasks = [];
      for (let i = 0; i < toRun.length; i++) {
        toRun[i]();
      }
    }
    this.deferred = true;
  }
}
/**
 * @since 1.0.0
 * @category schedulers
 */
exports.SyncScheduler = SyncScheduler;
class ControlledScheduler {
  constructor(
  /**
   * @since 1.0.0
   */
  currentMode) {
    this.currentMode = currentMode;
    /**
     * @since 1.0.0
     */
    this.tasks = [];
    /**
     * @since 1.0.0
     */
    this.deferred = false;
  }
  /**
   * @since 1.0.0
   */
  scheduleTask(task) {
    if (this.deferred) {
      defaultScheduler.scheduleTask(task);
    } else {
      this.tasks.push(task);
    }
  }
  /**
   * @since 1.0.0
   */
  get executionMode() {
    return this.currentMode();
  }
  /**
   * @since 1.0.0
   */
  step() {
    const toRun = this.tasks;
    this.tasks = [];
    for (let i = 0; i < toRun.length; i++) {
      toRun[i]();
    }
  }
}
exports.ControlledScheduler = ControlledScheduler;
//# sourceMappingURL=Scheduler.js.map