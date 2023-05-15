import { VitestRunner, VitestRunnerImportSource, Suite, Test, TestContext } from '@vitest/runner';
import { a as ResolvedConfig } from './types-c800444e.js';
import '@vitest/expect';
import 'vite';
import '@vitest/runner/types';
import '@vitest/runner/utils';
import '@vitest/utils';
import 'tinybench';
import 'vite-node/client';
import 'vite-node/server';
import 'node:worker_threads';
import 'vite-node';
import 'node:fs';

declare class VitestTestRunner implements VitestRunner {
    config: ResolvedConfig;
    private snapshotClient;
    private workerState;
    constructor(config: ResolvedConfig);
    importFile(filepath: string, source: VitestRunnerImportSource): unknown;
    onBeforeRun(): void;
    onAfterRun(): Promise<void>;
    onAfterRunSuite(suite: Suite): void;
    onAfterRunTest(test: Test): void;
    onBeforeRunTest(test: Test): Promise<void>;
    onBeforeTryTest(test: Test): void;
    onAfterTryTest(test: Test): void;
    extendTestContext(context: TestContext): TestContext;
}

declare class NodeBenchmarkRunner implements VitestRunner {
    config: ResolvedConfig;
    constructor(config: ResolvedConfig);
    importFile(filepath: string, source: VitestRunnerImportSource): unknown;
    runSuite(suite: Suite): Promise<void>;
    runTest(): Promise<void>;
}

export { NodeBenchmarkRunner, VitestTestRunner };
