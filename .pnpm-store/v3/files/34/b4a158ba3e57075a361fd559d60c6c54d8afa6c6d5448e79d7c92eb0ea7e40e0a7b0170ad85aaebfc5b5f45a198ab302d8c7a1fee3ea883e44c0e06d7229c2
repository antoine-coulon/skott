import { promises, existsSync } from 'node:fs';
import { m as micromatch_1, t as takeCoverageInsideWorker } from './chunk-integrations-coverage.48e6286b.js';
import { startTests } from '@vitest/runner';
import { g as getWorkerState, r as resetModules } from './chunk-utils-global.442d1d33.js';
import { R as RealDate, g as globalExpect, a as vi } from './chunk-utils-import.9911c99d.js';
import { e as environments, a as envs } from './chunk-env-node.ffd1183b.js';
import { createRequire } from 'node:module';
import c from 'picocolors';
import { installSourcemapsSupport } from 'vite-node/source-map';
import { setColors, getSafeTimers } from '@vitest/utils';
import { i as index } from './chunk-integrations-utils.d6d30a11.js';
import { s as setupSnapshotEnvironment } from './chunk-snapshot-env.6457638e.js';
import { r as rpc } from './chunk-runtime-rpc.9c0386cc.js';
import { s as setupCommonEnv } from './chunk-runtime-setup.28d2d580.js';
import { V as VitestTestRunner, N as NodeBenchmarkRunner } from './runners-chunk.js';
import 'local-pkg';
import 'util';
import 'path';
import 'pathe';
import './chunk-utils-env.860d90c2.js';
import 'std-env';
import '@vitest/runner/utils';
import 'chai';
import './vendor-_commonjsHelpers.addc3445.js';
import '@vitest/expect';
import './chunk-utils-base.977ae74f.js';
import './chunk-utils-tasks.1b603032.js';
import '@vitest/spy';
import 'node:console';
import './chunk-integrations-run-once.38756e30.js';

class NodeSnapshotEnvironment {
  resolvePath(filepath) {
    return rpc().resolveSnapshotPath(filepath);
  }
  async prepareDirectory(filepath) {
    await promises.mkdir(filepath, { recursive: true });
  }
  async saveSnapshotFile(filepath, snapshot) {
    await promises.writeFile(filepath, snapshot, "utf-8");
  }
  async readSnapshotFile(filepath) {
    if (!existsSync(filepath))
      return null;
    return promises.readFile(filepath, "utf-8");
  }
  async removeSnapshotFile(filepath) {
    if (existsSync(filepath))
      await promises.unlink(filepath);
  }
}

let globalSetup = false;
async function setupGlobalEnv(config) {
  await setupCommonEnv(config);
  Object.defineProperty(globalThis, "__vitest_index__", {
    value: index,
    enumerable: false
  });
  if (globalSetup)
    return;
  globalSetup = true;
  setupSnapshotEnvironment(new NodeSnapshotEnvironment());
  setColors(c);
  const require = createRequire(import.meta.url);
  require.extensions[".css"] = () => ({});
  require.extensions[".scss"] = () => ({});
  require.extensions[".sass"] = () => ({});
  const state = getWorkerState();
  installSourcemapsSupport({
    getSourceMap: (source) => state.moduleCache.getSourceMap(source)
  });
  await setupConsoleLogSpy();
}
async function setupConsoleLogSpy() {
  const stdoutBuffer = /* @__PURE__ */ new Map();
  const stderrBuffer = /* @__PURE__ */ new Map();
  const timers = /* @__PURE__ */ new Map();
  const unknownTestId = "__vitest__unknown_test__";
  const { Writable } = await import('node:stream');
  const { Console } = await import('node:console');
  const { setTimeout, clearTimeout } = getSafeTimers();
  function schedule(taskId) {
    const timer = timers.get(taskId);
    const { stdoutTime, stderrTime } = timer;
    clearTimeout(timer.timer);
    timer.timer = setTimeout(() => {
      if (stderrTime < stdoutTime) {
        sendStderr(taskId);
        sendStdout(taskId);
      } else {
        sendStdout(taskId);
        sendStderr(taskId);
      }
    });
  }
  function sendStdout(taskId) {
    const buffer = stdoutBuffer.get(taskId);
    if (!buffer)
      return;
    const content = buffer.map((i) => String(i)).join("");
    const timer = timers.get(taskId);
    rpc().onUserConsoleLog({
      type: "stdout",
      content: content || "<empty line>",
      taskId,
      time: timer.stdoutTime || RealDate.now(),
      size: buffer.length
    });
    stdoutBuffer.set(taskId, []);
    timer.stdoutTime = 0;
  }
  function sendStderr(taskId) {
    const buffer = stderrBuffer.get(taskId);
    if (!buffer)
      return;
    const content = buffer.map((i) => String(i)).join("");
    const timer = timers.get(taskId);
    rpc().onUserConsoleLog({
      type: "stderr",
      content: content || "<empty line>",
      taskId,
      time: timer.stderrTime || RealDate.now(),
      size: buffer.length
    });
    stderrBuffer.set(taskId, []);
    timer.stderrTime = 0;
  }
  const stdout = new Writable({
    write(data, encoding, callback) {
      var _a, _b;
      const id = ((_b = (_a = getWorkerState()) == null ? void 0 : _a.current) == null ? void 0 : _b.id) ?? unknownTestId;
      let timer = timers.get(id);
      if (timer) {
        timer.stdoutTime = timer.stdoutTime || RealDate.now();
      } else {
        timer = { stdoutTime: RealDate.now(), stderrTime: RealDate.now(), timer: 0 };
        timers.set(id, timer);
      }
      let buffer = stdoutBuffer.get(id);
      if (!buffer) {
        buffer = [];
        stdoutBuffer.set(id, buffer);
      }
      buffer.push(data);
      schedule(id);
      callback();
    }
  });
  const stderr = new Writable({
    write(data, encoding, callback) {
      var _a, _b;
      const id = ((_b = (_a = getWorkerState()) == null ? void 0 : _a.current) == null ? void 0 : _b.id) ?? unknownTestId;
      let timer = timers.get(id);
      if (timer) {
        timer.stderrTime = timer.stderrTime || RealDate.now();
      } else {
        timer = { stderrTime: RealDate.now(), stdoutTime: RealDate.now(), timer: 0 };
        timers.set(id, timer);
      }
      let buffer = stderrBuffer.get(id);
      if (!buffer) {
        buffer = [];
        stderrBuffer.set(id, buffer);
      }
      buffer.push(data);
      schedule(id);
      callback();
    }
  });
  globalThis.console = new Console({
    stdout,
    stderr,
    colorMode: true,
    groupIndentation: 2
  });
}
async function loadEnvironment(name) {
  const pkg = await import(`vitest-environment-${name}`);
  if (!pkg || !pkg.default || typeof pkg.default !== "object" || typeof pkg.default.setup !== "function") {
    throw new Error(
      `Environment "${name}" is not a valid environment. Package "vitest-environment-${name}" should have default export with "setup" method.`
    );
  }
  return pkg.default;
}
async function withEnv(name, options, fn) {
  const config = environments[name] || await loadEnvironment(name);
  globalThis.__vitest_environment__ = config.name || name;
  globalExpect.setState({
    environment: config.name || name || "node"
  });
  const env = await config.setup(globalThis, options);
  try {
    await fn();
  } finally {
    await env.teardown(globalThis);
  }
}

function groupBy(collection, iteratee) {
  return collection.reduce((acc, item) => {
    const key = iteratee(item);
    acc[key] || (acc[key] = []);
    acc[key].push(item);
    return acc;
  }, {});
}
async function getTestRunnerConstructor(config) {
  if (!config.runner)
    return config.mode === "test" ? VitestTestRunner : NodeBenchmarkRunner;
  const mod = await import(config.runner);
  if (!mod.default && typeof mod.default !== "function")
    throw new Error(`Runner must export a default function, but got ${typeof mod.default} imported from ${config.runner}`);
  return mod.default;
}
async function getTestRunner(config) {
  const TestRunner = await getTestRunnerConstructor(config);
  const testRunner = new TestRunner(config);
  if (!testRunner.config)
    testRunner.config = config;
  if (!testRunner.importFile)
    throw new Error('Runner must implement "importFile" method.');
  const originalOnTaskUpdate = testRunner.onTaskUpdate;
  testRunner.onTaskUpdate = async (task) => {
    const p = rpc().onTaskUpdate(task);
    await (originalOnTaskUpdate == null ? void 0 : originalOnTaskUpdate.call(testRunner, task));
    return p;
  };
  const originalOnCollected = testRunner.onCollected;
  testRunner.onCollected = async (files) => {
    rpc().onCollected(files);
    await (originalOnCollected == null ? void 0 : originalOnCollected.call(testRunner, files));
  };
  const originalOnAfterRun = testRunner.onAfterRun;
  testRunner.onAfterRun = async (files) => {
    const coverage = await takeCoverageInsideWorker(config.coverage);
    rpc().onAfterSuiteRun({ coverage });
    await (originalOnAfterRun == null ? void 0 : originalOnAfterRun.call(testRunner, files));
  };
  return testRunner;
}
async function run(files, config) {
  await setupGlobalEnv(config);
  const workerState = getWorkerState();
  const runner = await getTestRunner(config);
  const filesWithEnv = await Promise.all(files.map(async (file) => {
    var _a, _b;
    const code = await promises.readFile(file, "utf-8");
    let env = (_a = code.match(/@(?:vitest|jest)-environment\s+?([\w-]+)\b/)) == null ? void 0 : _a[1];
    if (!env) {
      for (const [glob, target] of config.environmentMatchGlobs || []) {
        if (micromatch_1.isMatch(file, glob)) {
          env = target;
          break;
        }
      }
    }
    env || (env = config.environment || "node");
    const envOptions = JSON.parse(((_b = code.match(/@(?:vitest|jest)-environment-options\s+?(.+)/)) == null ? void 0 : _b[1]) || "null");
    return {
      file,
      env,
      envOptions: envOptions ? { [env]: envOptions } : null
    };
  }));
  const filesByEnv = groupBy(filesWithEnv, ({ env }) => env);
  const orderedEnvs = envs.concat(
    Object.keys(filesByEnv).filter((env) => !envs.includes(env))
  );
  for (const env of orderedEnvs) {
    const environment = env;
    const files2 = filesByEnv[environment];
    if (!files2 || !files2.length)
      continue;
    globalThis.__vitest_environment__ = environment;
    const filesByOptions = groupBy(files2, ({ envOptions }) => JSON.stringify(envOptions));
    for (const options of Object.keys(filesByOptions)) {
      const files3 = filesByOptions[options];
      if (!files3 || !files3.length)
        continue;
      await withEnv(environment, files3[0].envOptions || config.environmentOptions || {}, async () => {
        for (const { file } of files3) {
          if (config.isolate) {
            workerState.mockMap.clear();
            resetModules(workerState.moduleCache, true);
          }
          workerState.filepath = file;
          await startTests([file], runner);
          workerState.filepath = void 0;
          vi.resetConfig();
        }
      });
    }
  }
}

export { run };
