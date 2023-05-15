/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category models
 */
export type Task = () => void;
/**
 * @since 1.0.0
 * @category models
 */
export interface Scheduler {
    get executionMode(): "PreferSync" | "PreferAsync" | "Sync";
    scheduleTask(task: Task): void;
}
/**
 * @since 1.0.0
 * @category schedulers
 */
export declare const defaultScheduler: Scheduler;
/**
 * @since 1.0.0
 * @category schedulers
 */
export declare class SyncScheduler implements Scheduler {
    /**
     * @since 1.0.0
     */
    readonly initialMode: "PreferSync" | "PreferAsync" | "Sync";
    /**
     * @since 1.0.0
     */
    tasks: Array<Task>;
    /**
     * @since 1.0.0
     */
    deferred: boolean;
    constructor(
    /**
     * @since 1.0.0
     */
    initialMode: "PreferSync" | "PreferAsync" | "Sync");
    /**
     * @since 1.0.0
     */
    scheduleTask(task: Task): void;
    /**
     * @since 1.0.0
     */
    get executionMode(): "PreferSync" | "PreferAsync" | "Sync";
    /**
     * @since 1.0.0
     */
    flush(): void;
}
/**
 * @since 1.0.0
 * @category schedulers
 */
export declare class ControlledScheduler implements Scheduler {
    /**
     * @since 1.0.0
     */
    readonly currentMode: () => "PreferSync" | "PreferAsync" | "Sync";
    /**
     * @since 1.0.0
     */
    tasks: Array<Task>;
    /**
     * @since 1.0.0
     */
    deferred: boolean;
    constructor(
    /**
     * @since 1.0.0
     */
    currentMode: () => "PreferSync" | "PreferAsync" | "Sync");
    /**
     * @since 1.0.0
     */
    scheduleTask(task: Task): void;
    /**
     * @since 1.0.0
     */
    get executionMode(): "PreferSync" | "PreferAsync" | "Sync";
    /**
     * @since 1.0.0
     */
    step(): void;
}
//# sourceMappingURL=Scheduler.d.ts.map