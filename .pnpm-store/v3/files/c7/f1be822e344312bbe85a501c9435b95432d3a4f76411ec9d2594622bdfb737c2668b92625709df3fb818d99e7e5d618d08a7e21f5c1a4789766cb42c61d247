import { UserConfig as UserConfig$2, ConfigEnv } from 'vite';
export { ConfigEnv } from 'vite';
import { a1 as ResolvedCoverageOptions, U as UserConfig$1, a4 as CoverageC8Options, _ as CoverageProviderModule, a2 as BaseCoverageOptions, a3 as CoverageIstanbulOptions, $ as CoverageReporter, F as FakeTimerInstallOpts } from './types-c800444e.js';
import '@vitest/expect';
import '@vitest/runner/types';
import '@vitest/runner';
import '@vitest/runner/utils';
import '@vitest/utils';
import 'tinybench';
import 'vite-node/client';
import 'vite-node/server';
import 'node:worker_threads';
import 'vite-node';
import 'node:fs';

declare const defaultInclude: string[];
declare const defaultExclude: string[];
declare const coverageConfigDefaults: ResolvedCoverageOptions;
declare const config: {
    allowOnly: boolean;
    watch: boolean;
    globals: boolean;
    environment: "node";
    threads: boolean;
    clearMocks: boolean;
    restoreMocks: boolean;
    mockReset: boolean;
    include: string[];
    exclude: string[];
    testTimeout: number;
    hookTimeout: number;
    teardownTimeout: number;
    isolate: boolean;
    watchExclude: string[];
    forceRerunTriggers: string[];
    update: boolean;
    reporters: never[];
    silent: boolean;
    api: boolean;
    ui: boolean;
    uiBase: string;
    open: boolean;
    css: {
        include: never[];
    };
    coverage: {
        provider?: "c8" | undefined;
    } & CoverageC8Options & Required<Pick<({
        provider?: undefined;
    } & CoverageC8Options) | ({
        provider: CoverageProviderModule;
    } & BaseCoverageOptions) | ({
        provider?: "c8" | undefined;
    } & CoverageC8Options) | ({
        provider: "istanbul";
    } & CoverageIstanbulOptions), "exclude" | "enabled" | "clean" | "cleanOnRerun" | "reportsDirectory" | "extension" | "reporter">> & {
        reporter: CoverageReporter[];
    };
    fakeTimers: FakeTimerInstallOpts;
    maxConcurrency: number;
    dangerouslyIgnoreUnhandledErrors: boolean;
    typecheck: {
        checker: "tsc";
        include: string[];
        exclude: string[];
    };
    slowTestThreshold: number;
};
declare const configDefaults: Required<Pick<UserConfig$1, keyof typeof config>>;

interface UserConfig extends UserConfig$2 {
    test?: UserConfig$2['test'];
}

type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;
type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFn;
declare function defineConfig(config: UserConfigExport): UserConfigExport;

export { UserConfig, UserConfigExport, UserConfigFn, configDefaults, coverageConfigDefaults, defaultExclude, defaultInclude, defineConfig };
