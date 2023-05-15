import { P as Environment } from './types-c800444e.js';
import '@vitest/expect';
import 'vite';
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

declare const environments: {
    node: Environment;
    jsdom: Environment;
    'happy-dom': Environment;
    'edge-runtime': Environment;
};

interface PopulateOptions {
    bindFunctions?: boolean;
}
declare function populateGlobal(global: any, win: any, options?: PopulateOptions): {
    keys: Set<string>;
    skipKeys: string[];
    originals: Map<string | symbol, any>;
};

export { environments as builtinEnvironments, populateGlobal };
