import { V as VitestRunner } from './runner-93cc9c0d.js';
export { V as VitestRunner, a as VitestRunnerConfig, c as VitestRunnerConstructor, b as VitestRunnerImportSource } from './runner-93cc9c0d.js';
import { T as Task, F as File, S as SuiteAPI, a as TestAPI, b as SuiteCollector, c as SuiteHooks, H as HookListener, d as TestContext, e as Suite, f as HookCleanupCallback, O as OnTestFailedHandler, g as Test } from './tasks-e1fc71d1.js';
export { D as DoneCallback, F as File, f as HookCleanupCallback, H as HookListener, O as OnTestFailedHandler, R as RunMode, p as RuntimeContext, q as SequenceHooks, e as Suite, S as SuiteAPI, b as SuiteCollector, o as SuiteFactory, c as SuiteHooks, T as Task, i as TaskBase, j as TaskCustom, k as TaskResult, l as TaskResultPack, h as TaskState, g as Test, a as TestAPI, d as TestContext, m as TestFunction, n as TestOptions } from './tasks-e1fc71d1.js';
import { Awaitable } from '@vitest/utils';

declare function updateTask(task: Task, runner: VitestRunner): void;
declare function startTests(paths: string[], runner: VitestRunner): Promise<File[]>;

declare const suite: SuiteAPI<{}>;
declare const test: TestAPI<{}>;
declare const describe: SuiteAPI<{}>;
declare const it: TestAPI<{}>;
declare function getCurrentSuite<ExtraContext = {}>(): SuiteCollector<ExtraContext>;

declare const beforeAll: (fn: SuiteHooks['beforeAll'][0], timeout?: number) => void;
declare const afterAll: (fn: SuiteHooks['afterAll'][0], timeout?: number) => void;
declare const beforeEach: <ExtraContext = {}>(fn: HookListener<[TestContext & ExtraContext, Suite], HookCleanupCallback>, timeout?: number) => void;
declare const afterEach: <ExtraContext = {}>(fn: HookListener<[TestContext & ExtraContext, Suite], void>, timeout?: number) => void;
declare const onTestFailed: (fn: OnTestFailedHandler) => void;

declare function setFn(key: Test, fn: (() => Awaitable<void>)): void;
declare function getFn<Task = Test>(key: Task): (() => Awaitable<void>);

export { afterAll, afterEach, beforeAll, beforeEach, describe, getCurrentSuite, getFn, it, onTestFailed, setFn, startTests, suite, test, updateTask };
