import { Test } from '@vitest/runner';
export { afterAll, afterEach, beforeAll, beforeEach, describe, it, onTestFailed, suite, test } from '@vitest/runner';
import { B as BenchmarkAPI, F as FakeTimerInstallOpts, M as MockFactoryWithHelper, R as RuntimeConfig, a as ResolvedConfig, b as ModuleGraphData, S as SnapshotResult, c as Reporter } from './types-c800444e.js';
export { u as AfterSuiteRunMeta, A as ApiConfig, z as ArgumentsType, y as Arrayable, x as Awaitable, a2 as BaseCoverageOptions, a8 as BenchFunction, a6 as Benchmark, B as BenchmarkAPI, a7 as BenchmarkResult, a5 as BenchmarkUserOptions, h as BuiltinEnvironment, i as CSSModuleScopeStrategy, C as CollectLineNumbers, e as CollectLines, K as Constructable, g as Context, a4 as CoverageC8Options, a3 as CoverageIstanbulOptions, a0 as CoverageOptions, Y as CoverageProvider, _ as CoverageProviderModule, $ as CoverageReporter, G as DeepMerge, P as Environment, E as EnvironmentOptions, O as EnvironmentReturn, I as InlineConfig, J as JSDOMOptions, D as MergeInsertions, L as ModuleCache, b as ModuleGraphData, H as MutableArray, N as Nullable, X as OnServerRestartHandler, d as RawErrsMap, Z as ReportContext, c as Reporter, t as ResolveIdFunction, a as ResolvedConfig, a1 as ResolvedCoverageOptions, f as RootAndTarget, R as RuntimeConfig, j as SequenceHooks, n as SnapshotData, q as SnapshotMatchOptions, S as SnapshotResult, p as SnapshotStateOptions, s as SnapshotSummary, o as SnapshotUpdateState, T as TscErrorInfo, l as TypecheckConfig, r as UncheckedSnapshot, U as UserConfig, Q as UserConsoleLog, m as Vitest, V as VitestEnvironment, k as VitestRunMode, W as WorkerContext, w as WorkerGlobalState, v as WorkerRPC } from './types-c800444e.js';
import { spyOn, fn, MaybeMockedDeep, MaybeMocked, MaybePartiallyMocked, MaybePartiallyMockedDeep, EnhancedSpy } from '@vitest/spy';
export { EnhancedSpy, Mock, MockContext, MockInstance, Mocked, MockedClass, MockedFunction, MockedObject, SpyInstance } from '@vitest/spy';
export { S as SnapshotEnvironment } from './env-afee91f0.js';
import { File, TaskResultPack } from '@vitest/runner/types';
export { DoneCallback, File, HookCleanupCallback, HookListener, OnTestFailedHandler, RunMode, RuntimeContext, Suite, SuiteAPI, SuiteCollector, SuiteFactory, SuiteHooks, Task, TaskBase, TaskResult, TaskResultPack, TaskState, Test, TestAPI, TestContext, TestFunction, TestOptions } from '@vitest/runner/types';
import { TransformResult } from 'vite';
import * as chai from 'chai';
export { chai };
export { assert, should } from 'chai';
export { ErrorWithDiff, ParsedStack } from '@vitest/runner/utils';
export { Bench as BenchFactory, Options as BenchOptions, Task as BenchTask, TaskResult as BenchTaskResult } from 'tinybench';
import '@vitest/expect';
import '@vitest/utils';
import 'vite-node/client';
import 'vite-node/server';
import 'node:worker_threads';
import 'vite-node';
import 'node:fs';

declare type Not<T extends boolean> = T extends true ? false : true;
declare type And<Types extends boolean[]> = Types[number] extends true ? true : false;
declare type Eq<Left extends boolean, Right extends boolean> = Left extends true ? Right : Not<Right>;
declare const secret: unique symbol;
declare type Secret = typeof secret;
declare type IsNever<T> = [T] extends [never] ? true : false;
declare type IsAny<T> = [T] extends [Secret] ? Not<IsNever<T>> : false;
declare type IsUnknown<T> = [unknown] extends [T] ? Not<IsAny<T>> : false;
/**
 * Recursively walk a type and replace it with a branded type related to the original. This is useful for
 * equality-checking stricter than `A extends B ? B extends A ? true : false : false`, because it detects
 * the difference between a few edge-case types that vanilla typescript doesn't by default:
 * - `any` vs `unknown`
 * - `{ readonly a: string }` vs `{ a: string }`
 * - `{ a?: string }` vs `{ a: string | undefined }`
 */
declare type DeepBrand<T> = IsNever<T> extends true ? {
    type: 'never';
} : IsAny<T> extends true ? {
    type: 'any';
} : IsUnknown<T> extends true ? {
    type: 'unknown';
} : T extends string | number | boolean | symbol | bigint | null | undefined | void ? {
    type: 'primitive';
    value: T;
} : T extends new (...args: any[]) => any ? {
    type: 'constructor';
    params: ConstructorParams<T>;
    instance: DeepBrand<InstanceType<Extract<T, new (...args: any) => any>>>;
} : T extends (...args: infer P) => infer R ? {
    type: 'function';
    params: DeepBrand<P>;
    return: DeepBrand<R>;
} : T extends any[] ? {
    type: 'array';
    items: {
        [K in keyof T]: T[K];
    };
} : {
    type: 'object';
    properties: {
        [K in keyof T]: DeepBrand<T[K]>;
    };
    readonly: ReadonlyKeys<T>;
    required: RequiredKeys<T>;
    optional: OptionalKeys<T>;
    constructorParams: DeepBrand<ConstructorParams<T>>;
};
declare type RequiredKeys<T> = Extract<{
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T], keyof T>;
declare type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
declare type ReadonlyKeys<T> = Extract<{
    [K in keyof T]-?: ReadonlyEquivalent<{
        [_K in K]: T[K];
    }, {
        -readonly [_K in K]: T[K];
    }> extends true ? never : K;
}[keyof T], keyof T>;
declare type ReadonlyEquivalent<X, Y> = Extends<(<T>() => T extends X ? true : false), (<T>() => T extends Y ? true : false)>;
declare type Extends<L, R> = IsNever<L> extends true ? IsNever<R> : [L] extends [R] ? true : false;
declare type StrictExtends<L, R> = Extends<DeepBrand<L>, DeepBrand<R>>;
declare type Equal<Left, Right> = And<[StrictExtends<Left, Right>, StrictExtends<Right, Left>]>;
declare type Params<Actual> = Actual extends (...args: infer P) => any ? P : never;
declare type ConstructorParams<Actual> = Actual extends new (...args: infer P) => any ? Actual extends new () => any ? P | [] : P : never;
declare type MismatchArgs<B extends boolean, C extends boolean> = Eq<B, C> extends true ? [] : [never];
interface ExpectTypeOf<Actual, B extends boolean> {
    toBeAny: (...MISMATCH: MismatchArgs<IsAny<Actual>, B>) => true;
    toBeUnknown: (...MISMATCH: MismatchArgs<IsUnknown<Actual>, B>) => true;
    toBeNever: (...MISMATCH: MismatchArgs<IsNever<Actual>, B>) => true;
    toBeFunction: (...MISMATCH: MismatchArgs<Extends<Actual, (...args: any[]) => any>, B>) => true;
    toBeObject: (...MISMATCH: MismatchArgs<Extends<Actual, object>, B>) => true;
    toBeArray: (...MISMATCH: MismatchArgs<Extends<Actual, any[]>, B>) => true;
    toBeNumber: (...MISMATCH: MismatchArgs<Extends<Actual, number>, B>) => true;
    toBeString: (...MISMATCH: MismatchArgs<Extends<Actual, string>, B>) => true;
    toBeBoolean: (...MISMATCH: MismatchArgs<Extends<Actual, boolean>, B>) => true;
    toBeVoid: (...MISMATCH: MismatchArgs<Extends<Actual, void>, B>) => true;
    toBeSymbol: (...MISMATCH: MismatchArgs<Extends<Actual, symbol>, B>) => true;
    toBeNull: (...MISMATCH: MismatchArgs<Extends<Actual, null>, B>) => true;
    toBeUndefined: (...MISMATCH: MismatchArgs<Extends<Actual, undefined>, B>) => true;
    toBeNullable: (...MISMATCH: MismatchArgs<Not<Equal<Actual, NonNullable<Actual>>>, B>) => true;
    toMatchTypeOf: {
        <Expected>(...MISMATCH: MismatchArgs<Extends<Actual, Expected>, B>): true;
        <Expected>(expected: Expected, ...MISMATCH: MismatchArgs<Extends<Actual, Expected>, B>): true;
    };
    toEqualTypeOf: {
        <Expected>(...MISMATCH: MismatchArgs<Equal<Actual, Expected>, B>): true;
        <Expected>(expected: Expected, ...MISMATCH: MismatchArgs<Equal<Actual, Expected>, B>): true;
    };
    toBeCallableWith: B extends true ? (...args: Params<Actual>) => true : never;
    toBeConstructibleWith: B extends true ? (...args: ConstructorParams<Actual>) => true : never;
    toHaveProperty: <K extends string>(key: K, ...MISMATCH: MismatchArgs<Extends<K, keyof Actual>, B>) => K extends keyof Actual ? ExpectTypeOf<Actual[K], B> : true;
    extract: <V>(v?: V) => ExpectTypeOf<Extract<Actual, V>, B>;
    exclude: <V>(v?: V) => ExpectTypeOf<Exclude<Actual, V>, B>;
    parameter: <K extends keyof Params<Actual>>(number: K) => ExpectTypeOf<Params<Actual>[K], B>;
    parameters: ExpectTypeOf<Params<Actual>, B>;
    constructorParameters: ExpectTypeOf<ConstructorParams<Actual>, B>;
    instance: Actual extends new (...args: any[]) => infer I ? ExpectTypeOf<I, B> : never;
    returns: Actual extends (...args: any[]) => infer R ? ExpectTypeOf<R, B> : never;
    resolves: Actual extends PromiseLike<infer R> ? ExpectTypeOf<R, B> : never;
    items: Actual extends ArrayLike<infer R> ? ExpectTypeOf<R, B> : never;
    guards: Actual extends (v: any, ...args: any[]) => v is infer T ? ExpectTypeOf<T, B> : never;
    asserts: Actual extends (v: any, ...args: any[]) => asserts v is infer T ? unknown extends T ? never : ExpectTypeOf<T, B> : never;
    not: ExpectTypeOf<Actual, Not<B>>;
}
declare type _ExpectTypeOf = {
    <Actual>(actual: Actual): ExpectTypeOf<Actual, true>;
    <Actual>(): ExpectTypeOf<Actual, true>;
};
/**
 * Similar to Jest's `expect`, but with type-awareness.
 * Gives you access to a number of type-matchers that let you make assertions about the
 * form of a reference or generic type parameter.
 *
 * @example
 * import {foo, bar} from '../foo'
 * import {expectTypeOf} from 'expect-type'
 *
 * test('foo types', () => {
 *   // make sure `foo` has type {a: number}
 *   expectTypeOf(foo).toMatchTypeOf({a: 1})
 *   expectTypeOf(foo).toHaveProperty('a').toBeNumber()
 *
 *   // make sure `bar` is a function taking a string:
 *   expectTypeOf(bar).parameter(0).toBeString()
 *   expectTypeOf(bar).returns.not.toBeAny()
 * })
 *
 * @description
 * See the [full docs](https://npmjs.com/package/expect-type#documentation) for lots more examples.
 */
declare const expectTypeOf: _ExpectTypeOf;

interface AssertType {
    <T>(value: T): void;
}
declare const assertType: AssertType;

declare const bench: BenchmarkAPI;

/**
 * This utils allows computational intensive tasks to only be ran once
 * across test reruns to improve the watch mode performance.
 *
 * Currently only works with `isolate: false`
 *
 * @experimental
 */
declare function runOnce<T>(fn: (() => T), key?: string): T;
/**
 * Get a boolean indicates whether the task is running in the first time.
 * Could only be `false` in watch mode.
 *
 * Currently only works with `isolate: false`
 *
 * @experimental
 */
declare function isFirstRun(): boolean;

declare function createExpect(test?: Test): Vi.ExpectStatic;
declare const globalExpect: Vi.ExpectStatic;

declare class VitestUtils {
    private _timers;
    private _mockedDate;
    private _mocker;
    constructor();
    useFakeTimers(config?: FakeTimerInstallOpts): this;
    useRealTimers(): this;
    runOnlyPendingTimers(): this;
    runOnlyPendingTimersAsync(): Promise<this>;
    runAllTimers(): this;
    runAllTimersAsync(): Promise<this>;
    runAllTicks(): this;
    advanceTimersByTime(ms: number): this;
    advanceTimersByTimeAsync(ms: number): Promise<this>;
    advanceTimersToNextTimer(): this;
    advanceTimersToNextTimerAsync(): Promise<this>;
    getTimerCount(): number;
    setSystemTime(time: number | string | Date): this;
    getMockedSystemTime(): string | number | Date | null;
    getRealSystemTime(): number;
    clearAllTimers(): this;
    spyOn: typeof spyOn;
    fn: typeof fn;
    private getImporter;
    /**
     * Makes all `imports` to passed module to be mocked.
     * - If there is a factory, will return it's result. The call to `vi.mock` is hoisted to the top of the file,
     * so you don't have access to variables declared in the global file scope, if you didn't put them before imports!
     * - If `__mocks__` folder with file of the same name exist, all imports will
     * return it.
     * - If there is no `__mocks__` folder or a file with the same name inside, will call original
     * module and mock it.
     * @param path Path to the module. Can be aliased, if your config supports it
     * @param factory Factory for the mocked module. Has the highest priority.
     */
    mock(path: string, factory?: MockFactoryWithHelper): void;
    /**
     * Removes module from mocked registry. All subsequent calls to import will
     * return original module even if it was mocked.
     * @param path Path to the module. Can be aliased, if your config supports it
     */
    unmock(path: string): void;
    doMock(path: string, factory?: () => any): void;
    doUnmock(path: string): void;
    /**
     * Imports module, bypassing all checks if it should be mocked.
     * Can be useful if you want to mock module partially.
     * @example
     * vi.mock('./example', async () => {
     *  const axios = await vi.importActual('./example')
     *
     *  return { ...axios, get: vi.fn() }
     * })
     * @param path Path to the module. Can be aliased, if your config supports it
     * @returns Actual module without spies
     */
    importActual<T = unknown>(path: string): Promise<T>;
    /**
     * Imports a module with all of its properties and nested properties mocked.
     * For the rules applied, see docs.
     * @param path Path to the module. Can be aliased, if your config supports it
     * @returns Fully mocked module
     */
    importMock<T>(path: string): Promise<MaybeMockedDeep<T>>;
    /**
     * Type helpers for TypeScript. In reality just returns the object that was passed.
     *
     * When `partial` is `true` it will expect a `Partial<T>` as a return value.
     * @example
     * import example from './example'
     * vi.mock('./example')
     *
     * test('1+1 equals 2' async () => {
     *  vi.mocked(example.calc).mockRestore()
     *
     *  const res = example.calc(1, '+', 1)
     *
     *  expect(res).toBe(2)
     * })
     * @param item Anything that can be mocked
     * @param deep If the object is deeply mocked
     * @param options If the object is partially or deeply mocked
     */
    mocked<T>(item: T, deep?: false): MaybeMocked<T>;
    mocked<T>(item: T, deep: true): MaybeMockedDeep<T>;
    mocked<T>(item: T, options: {
        partial?: false;
        deep?: false;
    }): MaybeMocked<T>;
    mocked<T>(item: T, options: {
        partial?: false;
        deep: true;
    }): MaybeMockedDeep<T>;
    mocked<T>(item: T, options: {
        partial: true;
        deep?: false;
    }): MaybePartiallyMocked<T>;
    mocked<T>(item: T, options: {
        partial: true;
        deep: true;
    }): MaybePartiallyMockedDeep<T>;
    isMockFunction(fn: any): fn is EnhancedSpy;
    clearAllMocks(): this;
    resetAllMocks(): this;
    restoreAllMocks(): this;
    private _stubsGlobal;
    private _stubsEnv;
    /**
     * Makes value available on global namespace.
     * Useful, if you want to have global variables available, like `IntersectionObserver`.
     * You can return it back to original value with `vi.unstubGlobals`, or by enabling `unstubGlobals` config option.
     */
    stubGlobal(name: string | symbol | number, value: any): this;
    /**
     * Changes the value of `import.meta.env` and `process.env`.
     * You can return it back to original value with `vi.unstubEnvs`, or by enabling `unstubEnvs` config option.
     */
    stubEnv(name: string, value: string): this;
    /**
     * Reset the value to original value that was available before first `vi.stubGlobal` was called.
     */
    unstubAllGlobals(): this;
    /**
     * Reset enviromental variables to the ones that were available before first `vi.stubEnv` was called.
     */
    unstubAllEnvs(): this;
    resetModules(): this;
    /**
     * Wait for all imports to load. Useful, if you have a synchronous call that starts
     * importing a module that you cannot await otherwise.
     * Will also wait for new imports, started during the wait.
     */
    dynamicImportSettled(): Promise<void>;
    private _config;
    /**
     * Updates runtime config. You can only change values that are used when executing tests.
     */
    setConfig(config: RuntimeConfig): void;
    /**
     * If config was changed with `vi.setConfig`, this will reset it to the original state.
     */
    resetConfig(): void;
}
declare const vitest: VitestUtils;
declare const vi: VitestUtils;

declare function getRunningMode(): "run" | "watch";
declare function isWatchMode(): boolean;

interface TransformResultWithSource extends TransformResult {
    source?: string;
}
interface WebSocketHandlers {
    onWatcherStart: () => Promise<void>;
    onFinished(files?: File[]): Promise<void>;
    onCollected(files?: File[]): Promise<void>;
    onTaskUpdate(packs: TaskResultPack[]): void;
    getFiles(): File[];
    getPaths(): string[];
    getConfig(): ResolvedConfig;
    resolveSnapshotPath(testPath: string): string;
    getModuleGraph(id: string): Promise<ModuleGraphData>;
    getTransformResult(id: string): Promise<TransformResultWithSource | undefined>;
    readFile(id: string): Promise<string | null>;
    writeFile(id: string, content: string): Promise<void>;
    removeFile(id: string): Promise<void>;
    createDirectory(id: string): Promise<string | undefined>;
    snapshotSaved(snapshot: SnapshotResult): void;
    rerun(files: string[]): Promise<void>;
    updateSnapshot(file?: File): Promise<void>;
}
interface WebSocketEvents extends Pick<Reporter, 'onCollected' | 'onFinished' | 'onTaskUpdate' | 'onUserConsoleLog' | 'onPathsCollected'> {
}

export { AssertType, ExpectTypeOf, TransformResultWithSource, WebSocketEvents, WebSocketHandlers, assertType, bench, createExpect, globalExpect as expect, expectTypeOf, getRunningMode, isFirstRun, isWatchMode, runOnce, vi, vitest };
