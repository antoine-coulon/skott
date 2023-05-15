import { k as VitestRunMode, U as UserConfig, m as Vitest, a9 as MockFactory, aa as MockMap, ab as TestSequencer } from './types-c800444e.js';
export { ab as TestSequencer, ad as TestSequencerConstructor, m as Vitest, ac as startVitest } from './types-c800444e.js';
import { UserConfig as UserConfig$1, Plugin } from 'vite';
import { ViteNodeRunner } from 'vite-node/client';
import { ViteNodeRunnerOptions } from 'vite-node';
import '@vitest/expect';
import '@vitest/runner/types';
import '@vitest/runner';
import '@vitest/runner/utils';
import '@vitest/utils';
import 'tinybench';
import 'vite-node/server';
import 'node:worker_threads';
import 'node:fs';

declare function createVitest(mode: VitestRunMode, options: UserConfig, viteOverrides?: UserConfig$1): Promise<Vitest>;

declare function VitestPlugin(options?: UserConfig, ctx?: Vitest): Promise<Plugin[]>;

type Key = string | symbol;
declare class VitestMocker {
    runner: VitestRunner;
    private static pendingIds;
    private static spyModulePath;
    private static spyModule?;
    private resolveCache;
    constructor(runner: VitestRunner);
    private get root();
    private get base();
    private get mockMap();
    private get moduleCache();
    getSuiteFilepath(): string;
    getMocks(): {
        [x: string]: string | MockFactory | null;
    };
    private resolvePath;
    private resolveMocks;
    private callFunctionMock;
    getMockPath(dep: string): string;
    getDependencyMock(id: string): string | MockFactory | null;
    normalizePath(path: string): string;
    resolveMockPath(mockPath: string, external: string | null): string | null;
    mockObject(object: Record<Key, any>, mockExports?: Record<Key, any>): Record<Key, any>;
    unmockPath(path: string): void;
    mockPath(originalId: string, path: string, external: string | null, factory?: MockFactory): void;
    importActual<T>(rawId: string, importee: string): Promise<T>;
    importMock(rawId: string, importee: string): Promise<any>;
    initializeSpyModule(): Promise<void>;
    requestWithMock(url: string, callstack: string[]): Promise<any>;
    queueMock(id: string, importer: string, factory?: MockFactory): void;
    queueUnmock(id: string, importer: string): void;
}

interface ExecuteOptions extends ViteNodeRunnerOptions {
    mockMap: MockMap;
}
declare class VitestRunner extends ViteNodeRunner {
    options: ExecuteOptions;
    mocker: VitestMocker;
    constructor(options: ExecuteOptions);
    shouldResolveId(id: string, _importee?: string | undefined): boolean;
    resolveUrl(id: string, importee?: string): Promise<[url: string, fsPath: string]>;
    dependencyRequest(id: string, fsPath: string, callstack: string[]): Promise<any>;
    prepareContext(context: Record<string, any>): Record<string, any>;
}

declare class BaseSequencer implements TestSequencer {
    protected ctx: Vitest;
    constructor(ctx: Vitest);
    shard(files: string[]): Promise<string[]>;
    sort(files: string[]): Promise<string[]>;
}

export { BaseSequencer, ExecuteOptions, VitestPlugin, VitestRunner, createVitest };
