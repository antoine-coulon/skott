import { setState, GLOBAL_EXPECT, getState } from '@vitest/expect';
import { d as getSnapshotClient, c as createExpect, a as vi, e as getBenchOptions, f as getBenchFn } from './chunk-utils-import.9911c99d.js';
import { g as getWorkerState } from './chunk-utils-global.442d1d33.js';
import { g as getFullName } from './chunk-utils-tasks.1b603032.js';
import { updateTask } from '@vitest/runner';
import { createDefer, getSafeTimers } from '@vitest/utils';

class VitestTestRunner {
  constructor(config) {
    this.config = config;
    this.snapshotClient = getSnapshotClient();
    this.workerState = getWorkerState();
  }
  importFile(filepath, source) {
    if (source === "setup")
      this.workerState.moduleCache.delete(filepath);
    return import(filepath);
  }
  onBeforeRun() {
    this.snapshotClient.clear();
  }
  async onAfterRun() {
    await this.snapshotClient.saveCurrent();
  }
  onAfterRunSuite(suite) {
    if (this.config.logHeapUsage && typeof process !== "undefined")
      suite.result.heap = process.memoryUsage().heapUsed;
  }
  onAfterRunTest(test) {
    this.snapshotClient.clearTest();
    if (this.config.logHeapUsage && typeof process !== "undefined")
      test.result.heap = process.memoryUsage().heapUsed;
    this.workerState.current = void 0;
  }
  async onBeforeRunTest(test) {
    if (test.mode !== "run") {
      this.snapshotClient.skipTestSnapshots(test);
      return;
    }
    clearModuleMocks(this.config);
    await this.snapshotClient.setTest(test);
    this.workerState.current = test;
  }
  onBeforeTryTest(test) {
    var _a;
    setState({
      assertionCalls: 0,
      isExpectingAssertions: false,
      isExpectingAssertionsError: null,
      expectedAssertionsNumber: null,
      expectedAssertionsNumberErrorGen: null,
      testPath: (_a = test.suite.file) == null ? void 0 : _a.filepath,
      currentTestName: getFullName(test),
      snapshotState: this.snapshotClient.snapshotState
    }, globalThis[GLOBAL_EXPECT]);
  }
  onAfterTryTest(test) {
    const {
      assertionCalls,
      expectedAssertionsNumber,
      expectedAssertionsNumberErrorGen,
      isExpectingAssertions,
      isExpectingAssertionsError
    } = test.context._local ? test.context.expect.getState() : getState(globalThis[GLOBAL_EXPECT]);
    if (expectedAssertionsNumber !== null && assertionCalls !== expectedAssertionsNumber)
      throw expectedAssertionsNumberErrorGen();
    if (isExpectingAssertions === true && assertionCalls === 0)
      throw isExpectingAssertionsError;
  }
  extendTestContext(context) {
    let _expect;
    Object.defineProperty(context, "expect", {
      get() {
        if (!_expect)
          _expect = createExpect(context.meta);
        return _expect;
      }
    });
    Object.defineProperty(context, "_local", {
      get() {
        return _expect != null;
      }
    });
    return context;
  }
}
function clearModuleMocks(config) {
  const { clearMocks, mockReset, restoreMocks, unstubEnvs, unstubGlobals } = config;
  if (restoreMocks)
    vi.restoreAllMocks();
  else if (mockReset)
    vi.resetAllMocks();
  else if (clearMocks)
    vi.clearAllMocks();
  if (unstubEnvs)
    vi.unstubAllEnvs();
  if (unstubGlobals)
    vi.unstubAllGlobals();
}

async function importTinybench() {
  if (!globalThis.EventTarget)
    await import('./vendor-index.534e612c.js').then(function (n) { return n.i; });
  return await import('tinybench');
}
function createBenchmarkResult(name) {
  return {
    name,
    rank: 0,
    rme: 0,
    samples: []
  };
}
async function runBenchmarkSuite(suite, runner) {
  var _a;
  const { Task, Bench } = await importTinybench();
  const start = performance.now();
  const benchmarkGroup = [];
  const benchmarkSuiteGroup = [];
  for (const task of suite.tasks) {
    if (task.mode !== "run")
      continue;
    if ((_a = task.meta) == null ? void 0 : _a.benchmark)
      benchmarkGroup.push(task);
    else if (task.type === "suite")
      benchmarkSuiteGroup.push(task);
  }
  if (benchmarkSuiteGroup.length)
    await Promise.all(benchmarkSuiteGroup.map((subSuite) => runBenchmarkSuite(subSuite, runner)));
  if (benchmarkGroup.length) {
    const defer = createDefer();
    const benchmarkMap = {};
    suite.result = {
      state: "run",
      startTime: start,
      benchmark: createBenchmarkResult(suite.name)
    };
    updateTask$1(suite);
    benchmarkGroup.forEach((benchmark, idx) => {
      const options = getBenchOptions(benchmark);
      const benchmarkInstance = new Bench(options);
      const benchmarkFn = getBenchFn(benchmark);
      benchmark.result = {
        state: "run",
        startTime: start,
        benchmark: createBenchmarkResult(benchmark.name)
      };
      const id = idx.toString();
      benchmarkMap[id] = benchmark;
      const task = new Task(benchmarkInstance, id, benchmarkFn);
      benchmark.meta.task = task;
      updateTask$1(benchmark);
    });
    benchmarkGroup.forEach((benchmark) => {
      benchmark.meta.task.addEventListener("complete", (e) => {
        const task = e.task;
        const _benchmark = benchmarkMap[task.name || ""];
        if (_benchmark) {
          const taskRes = task.result;
          const result = _benchmark.result.benchmark;
          Object.assign(result, taskRes);
          updateTask$1(_benchmark);
        }
      });
      benchmark.meta.task.addEventListener("error", (e) => {
        const task = e.task;
        const _benchmark = benchmarkMap[task.name || ""];
        defer.reject(_benchmark ? task.result.error : e);
      });
    });
    Promise.all(benchmarkGroup.map(async (benchmark) => {
      await benchmark.meta.task.warmup();
      const { setTimeout } = getSafeTimers();
      return await new Promise((resolve) => setTimeout(async () => {
        resolve(await benchmark.meta.task.run());
      }));
    })).then((tasks) => {
      suite.result.duration = performance.now() - start;
      suite.result.state = "pass";
      tasks.sort((a, b) => a.result.mean - b.result.mean).forEach((cycle, idx) => {
        const benchmark = benchmarkMap[cycle.name || ""];
        benchmark.result.state = "pass";
        if (benchmark) {
          const result = benchmark.result.benchmark;
          result.rank = Number(idx) + 1;
          updateTask$1(benchmark);
        }
      });
      updateTask$1(suite);
      defer.resolve(null);
    });
    await defer;
  }
  function updateTask$1(task) {
    updateTask(task, runner);
  }
}
class NodeBenchmarkRunner {
  constructor(config) {
    this.config = config;
  }
  importFile(filepath, source) {
    if (source === "setup")
      getWorkerState().moduleCache.delete(filepath);
    return import(filepath);
  }
  async runSuite(suite) {
    await runBenchmarkSuite(suite, this);
  }
  async runTest() {
    throw new Error("`test()` and `it()` is only available in test mode.");
  }
}

export { NodeBenchmarkRunner as N, VitestTestRunner as V };
