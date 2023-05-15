import limit from 'p-limit';
import { getSafeTimers, format, isObject, objDisplay, objectAttr, noop, toArray, shuffle } from '@vitest/utils';
import { c as createChainable, g as generateHash, p as processError, a as calculateSuiteHash, s as someTasksAreOnly, i as interpretTaskModes, b as partitionSuiteChildren, h as hasTests, d as hasFailed } from './chunk-tasks.js';
import { relative } from 'pathe';

const fnMap = /* @__PURE__ */ new WeakMap();
const hooksMap = /* @__PURE__ */ new WeakMap();
function setFn(key, fn) {
  fnMap.set(key, fn);
}
function getFn(key) {
  return fnMap.get(key);
}
function setHooks(key, hooks) {
  hooksMap.set(key, hooks);
}
function getHooks(key) {
  return hooksMap.get(key);
}

const collectorContext = {
  tasks: [],
  currentSuite: null
};
function collectTask(task) {
  var _a;
  (_a = collectorContext.currentSuite) == null ? void 0 : _a.tasks.push(task);
}
async function runWithSuite(suite, fn) {
  const prev = collectorContext.currentSuite;
  collectorContext.currentSuite = suite;
  await fn();
  collectorContext.currentSuite = prev;
}
function withTimeout(fn, timeout, isHook = false) {
  if (timeout <= 0 || timeout === Infinity)
    return fn;
  const { setTimeout, clearTimeout } = getSafeTimers();
  return (...args) => {
    return Promise.race([fn(...args), new Promise((resolve, reject) => {
      var _a;
      const timer = setTimeout(() => {
        clearTimeout(timer);
        reject(new Error(makeTimeoutMsg(isHook, timeout)));
      }, timeout);
      (_a = timer.unref) == null ? void 0 : _a.call(timer);
    })]);
  };
}
function createTestContext(test, runner) {
  var _a;
  const context = function() {
    throw new Error("done() callback is deprecated, use promise instead");
  };
  context.meta = test;
  context.onTestFailed = (fn) => {
    test.onFailed || (test.onFailed = []);
    test.onFailed.push(fn);
  };
  return ((_a = runner.extendTestContext) == null ? void 0 : _a.call(runner, context)) || context;
}
function makeTimeoutMsg(isHook, timeout) {
  return `${isHook ? "Hook" : "Test"} timed out in ${timeout}ms.
If this is a long-running ${isHook ? "hook" : "test"}, pass a timeout value as the last argument or configure it globally with "${isHook ? "hookTimeout" : "testTimeout"}".`;
}

const suite = createSuite();
const test = createTest(
  function(name, fn, options) {
    getCurrentSuite().test.fn.call(this, name, fn, options);
  }
);
const describe = suite;
const it = test;
let runner;
let defaultSuite;
function getDefaultSuite() {
  return defaultSuite;
}
function getRunner() {
  return runner;
}
function clearCollectorContext(currentRunner) {
  if (!defaultSuite)
    defaultSuite = currentRunner.config.sequence.shuffle ? suite.shuffle("") : suite("");
  runner = currentRunner;
  collectorContext.tasks.length = 0;
  defaultSuite.clear();
  collectorContext.currentSuite = defaultSuite;
}
function getCurrentSuite() {
  return collectorContext.currentSuite || defaultSuite;
}
function createSuiteHooks() {
  return {
    beforeAll: [],
    afterAll: [],
    beforeEach: [],
    afterEach: []
  };
}
function createSuiteCollector(name, factory = () => {
}, mode, concurrent, shuffle, suiteOptions) {
  const tasks = [];
  const factoryQueue = [];
  let suite2;
  initSuite();
  const test2 = createTest(function(name2, fn = noop, options = suiteOptions) {
    const mode2 = this.only ? "only" : this.skip ? "skip" : this.todo ? "todo" : "run";
    if (typeof options === "number")
      options = { timeout: options };
    const test3 = {
      id: "",
      type: "test",
      name: name2,
      mode: mode2,
      suite: void 0,
      fails: this.fails,
      retry: options == null ? void 0 : options.retry
    };
    if (this.concurrent || concurrent)
      test3.concurrent = true;
    if (shuffle)
      test3.shuffle = true;
    const context = createTestContext(test3, runner);
    Object.defineProperty(test3, "context", {
      value: context,
      enumerable: false
    });
    setFn(test3, withTimeout(
      () => fn(context),
      (options == null ? void 0 : options.timeout) ?? runner.config.testTimeout
    ));
    tasks.push(test3);
  });
  const custom = function(name2 = "") {
    const self = this || {};
    const task = {
      id: "",
      name: name2,
      type: "custom",
      mode: self.only ? "only" : self.skip ? "skip" : self.todo ? "todo" : "run"
    };
    tasks.push(task);
    return task;
  };
  const collector = {
    type: "collector",
    name,
    mode,
    test: test2,
    tasks,
    collect,
    custom,
    clear,
    on: addHook
  };
  function addHook(name2, ...fn) {
    getHooks(suite2)[name2].push(...fn);
  }
  function initSuite() {
    suite2 = {
      id: "",
      type: "suite",
      name,
      mode,
      shuffle,
      tasks: []
    };
    setHooks(suite2, createSuiteHooks());
  }
  function clear() {
    tasks.length = 0;
    factoryQueue.length = 0;
    initSuite();
  }
  async function collect(file) {
    factoryQueue.length = 0;
    if (factory)
      await runWithSuite(collector, () => factory(test2));
    const allChildren = [];
    for (const i of [...factoryQueue, ...tasks])
      allChildren.push(i.type === "collector" ? await i.collect(file) : i);
    suite2.file = file;
    suite2.tasks = allChildren;
    allChildren.forEach((task) => {
      task.suite = suite2;
      if (file)
        task.file = file;
    });
    return suite2;
  }
  collectTask(collector);
  return collector;
}
function createSuite() {
  function suiteFn(name, factory, options) {
    const mode = this.only ? "only" : this.skip ? "skip" : this.todo ? "todo" : "run";
    return createSuiteCollector(name, factory, mode, this.concurrent, this.shuffle, options);
  }
  suiteFn.each = function(cases, ...args) {
    const suite2 = this.withContext();
    if (Array.isArray(cases) && args.length)
      cases = formatTemplateString(cases, args);
    return (name, fn, options) => {
      const arrayOnlyCases = cases.every(Array.isArray);
      cases.forEach((i, idx) => {
        const items = Array.isArray(i) ? i : [i];
        arrayOnlyCases ? suite2(formatTitle(name, items, idx), () => fn(...items), options) : suite2(formatTitle(name, items, idx), () => fn(i), options);
      });
    };
  };
  suiteFn.skipIf = (condition) => condition ? suite.skip : suite;
  suiteFn.runIf = (condition) => condition ? suite : suite.skip;
  return createChainable(
    ["concurrent", "shuffle", "skip", "only", "todo"],
    suiteFn
  );
}
function createTest(fn) {
  const testFn = fn;
  testFn.each = function(cases, ...args) {
    const test2 = this.withContext();
    if (Array.isArray(cases) && args.length)
      cases = formatTemplateString(cases, args);
    return (name, fn2, options) => {
      const arrayOnlyCases = cases.every(Array.isArray);
      cases.forEach((i, idx) => {
        const items = Array.isArray(i) ? i : [i];
        arrayOnlyCases ? test2(formatTitle(name, items, idx), () => fn2(...items), options) : test2(formatTitle(name, items, idx), () => fn2(i), options);
      });
    };
  };
  testFn.skipIf = (condition) => condition ? test.skip : test;
  testFn.runIf = (condition) => condition ? test : test.skip;
  return createChainable(
    ["concurrent", "skip", "only", "todo", "fails"],
    testFn
  );
}
function formatTitle(template, items, idx) {
  if (template.includes("%#")) {
    template = template.replace(/%%/g, "__vitest_escaped_%__").replace(/%#/g, `${idx}`).replace(/__vitest_escaped_%__/g, "%%");
  }
  const count = template.split("%").length - 1;
  let formatted = format(template, ...items.slice(0, count));
  if (isObject(items[0])) {
    formatted = formatted.replace(
      /\$([$\w_.]+)/g,
      (_, key) => objDisplay(objectAttr(items[0], key))
    );
  }
  return formatted;
}
function formatTemplateString(cases, args) {
  const header = cases.join("").trim().replace(/ /g, "").split("\n").map((i) => i.split("|"))[0];
  const res = [];
  for (let i = 0; i < Math.floor(args.length / header.length); i++) {
    const oneCase = {};
    for (let j = 0; j < header.length; j++)
      oneCase[header[j]] = args[i * header.length + j];
    res.push(oneCase);
  }
  return res;
}

async function runSetupFiles(config, runner) {
  const files = toArray(config.setupFiles);
  await Promise.all(
    files.map(async (fsPath) => {
      await runner.importFile(fsPath, "setup");
    })
  );
}

const now$1 = Date.now;
async function collectTests(paths, runner) {
  const files = [];
  const config = runner.config;
  for (const filepath of paths) {
    const path = relative(config.root, filepath);
    const file = {
      id: generateHash(path),
      name: path,
      type: "suite",
      mode: "run",
      filepath,
      tasks: [],
      projectName: config.name
    };
    clearCollectorContext(runner);
    try {
      const setupStart = now$1();
      await runSetupFiles(config, runner);
      const collectStart = now$1();
      file.setupDuration = collectStart - setupStart;
      await runner.importFile(filepath, "collect");
      const defaultTasks = await getDefaultSuite().collect(file);
      setHooks(file, getHooks(defaultTasks));
      for (const c of [...defaultTasks.tasks, ...collectorContext.tasks]) {
        if (c.type === "test") {
          file.tasks.push(c);
        } else if (c.type === "custom") {
          file.tasks.push(c);
        } else if (c.type === "suite") {
          file.tasks.push(c);
        } else if (c.type === "collector") {
          const suite = await c.collect(file);
          if (suite.name || suite.tasks.length)
            file.tasks.push(suite);
        }
      }
      file.collectDuration = now$1() - collectStart;
    } catch (e) {
      const error = processError(e);
      file.result = {
        state: "fail",
        error,
        errors: [error]
      };
    }
    calculateSuiteHash(file);
    const hasOnlyTasks = someTasksAreOnly(file);
    interpretTaskModes(file, config.testNamePattern, hasOnlyTasks, false, config.allowOnly);
    files.push(file);
  }
  return files;
}

let _test;
function setCurrentTest(test) {
  _test = test;
}
function getCurrentTest() {
  return _test;
}

const now = Date.now;
function updateSuiteHookState(suite, name, state, runner) {
  var _a;
  if (!suite.result)
    suite.result = { state: "run" };
  if (!((_a = suite.result) == null ? void 0 : _a.hooks))
    suite.result.hooks = {};
  const suiteHooks = suite.result.hooks;
  if (suiteHooks) {
    suiteHooks[name] = state;
    updateTask(suite, runner);
  }
}
function getSuiteHooks(suite, name, sequence) {
  const hooks = getHooks(suite)[name];
  if (sequence === "stack" && (name === "afterAll" || name === "afterEach"))
    return hooks.slice().reverse();
  return hooks;
}
async function callSuiteHook(suite, currentTask, name, runner, args) {
  const sequence = runner.config.sequence.hooks;
  const callbacks = [];
  if (name === "beforeEach" && suite.suite) {
    callbacks.push(
      ...await callSuiteHook(suite.suite, currentTask, name, runner, args)
    );
  }
  updateSuiteHookState(currentTask, name, "run", runner);
  const hooks = getSuiteHooks(suite, name, sequence);
  if (sequence === "parallel") {
    callbacks.push(...await Promise.all(hooks.map((fn) => fn(...args))));
  } else {
    for (const hook of hooks)
      callbacks.push(await hook(...args));
  }
  updateSuiteHookState(currentTask, name, "pass", runner);
  if (name === "afterEach" && suite.suite) {
    callbacks.push(
      ...await callSuiteHook(suite.suite, currentTask, name, runner, args)
    );
  }
  return callbacks;
}
const packs = /* @__PURE__ */ new Map();
let updateTimer;
let previousUpdate;
function updateTask(task, runner) {
  packs.set(task.id, task.result);
  const { clearTimeout, setTimeout } = getSafeTimers();
  clearTimeout(updateTimer);
  updateTimer = setTimeout(() => {
    previousUpdate = sendTasksUpdate(runner);
  }, 10);
}
async function sendTasksUpdate(runner) {
  var _a;
  const { clearTimeout } = getSafeTimers();
  clearTimeout(updateTimer);
  await previousUpdate;
  if (packs.size) {
    const p = (_a = runner.onTaskUpdate) == null ? void 0 : _a.call(runner, Array.from(packs));
    packs.clear();
    return p;
  }
}
const callCleanupHooks = async (cleanups) => {
  await Promise.all(cleanups.map(async (fn) => {
    if (typeof fn !== "function")
      return;
    await fn();
  }));
};
async function runTest(test, runner) {
  var _a, _b, _c, _d, _e, _f;
  await ((_a = runner.onBeforeRunTest) == null ? void 0 : _a.call(runner, test));
  if (test.mode !== "run")
    return;
  if (((_b = test.result) == null ? void 0 : _b.state) === "fail") {
    updateTask(test, runner);
    return;
  }
  const start = now();
  test.result = {
    state: "run",
    startTime: start
  };
  updateTask(test, runner);
  setCurrentTest(test);
  const retry = test.retry || 1;
  for (let retryCount = 0; retryCount < retry; retryCount++) {
    let beforeEachCleanups = [];
    try {
      await ((_c = runner.onBeforeTryTest) == null ? void 0 : _c.call(runner, test, retryCount));
      beforeEachCleanups = await callSuiteHook(test.suite, test, "beforeEach", runner, [test.context, test.suite]);
      test.result.retryCount = retryCount;
      if (runner.runTest) {
        await runner.runTest(test);
      } else {
        const fn = getFn(test);
        if (!fn)
          throw new Error("Test function is not found. Did you add it using `setFn`?");
        await fn();
      }
      await ((_d = runner.onAfterTryTest) == null ? void 0 : _d.call(runner, test, retryCount));
      test.result.state = "pass";
    } catch (e) {
      failTask(test.result, e);
    }
    try {
      await callSuiteHook(test.suite, test, "afterEach", runner, [test.context, test.suite]);
      await callCleanupHooks(beforeEachCleanups);
    } catch (e) {
      failTask(test.result, e);
    }
    if (test.result.state === "pass")
      break;
    updateTask(test, runner);
  }
  if (test.result.state === "fail")
    await Promise.all(((_e = test.onFailed) == null ? void 0 : _e.map((fn) => fn(test.result))) || []);
  if (test.fails) {
    if (test.result.state === "pass") {
      const error = processError(new Error("Expect test to fail"));
      test.result.state = "fail";
      test.result.error = error;
      test.result.errors = [error];
    } else {
      test.result.state = "pass";
      test.result.error = void 0;
      test.result.errors = void 0;
    }
  }
  setCurrentTest(void 0);
  test.result.duration = now() - start;
  await ((_f = runner.onAfterRunTest) == null ? void 0 : _f.call(runner, test));
  updateTask(test, runner);
}
function failTask(result, err) {
  result.state = "fail";
  const error = processError(err);
  result.error = error;
  result.errors ?? (result.errors = []);
  result.errors.push(error);
}
function markTasksAsSkipped(suite, runner) {
  suite.tasks.forEach((t) => {
    t.mode = "skip";
    t.result = { ...t.result, state: "skip" };
    updateTask(t, runner);
    if (t.type === "suite")
      markTasksAsSkipped(t, runner);
  });
}
async function runSuite(suite, runner) {
  var _a, _b, _c;
  await ((_a = runner.onBeforeRunSuite) == null ? void 0 : _a.call(runner, suite));
  if (((_b = suite.result) == null ? void 0 : _b.state) === "fail") {
    markTasksAsSkipped(suite, runner);
    updateTask(suite, runner);
    return;
  }
  const start = now();
  suite.result = {
    state: "run",
    startTime: start
  };
  updateTask(suite, runner);
  let beforeAllCleanups = [];
  if (suite.mode === "skip") {
    suite.result.state = "skip";
  } else if (suite.mode === "todo") {
    suite.result.state = "todo";
  } else {
    try {
      beforeAllCleanups = await callSuiteHook(suite, suite, "beforeAll", runner, [suite]);
      if (runner.runSuite) {
        await runner.runSuite(suite);
      } else {
        for (let tasksGroup of partitionSuiteChildren(suite)) {
          if (tasksGroup[0].concurrent === true) {
            const mutex = limit(runner.config.maxConcurrency);
            await Promise.all(tasksGroup.map((c) => mutex(() => runSuiteChild(c, runner))));
          } else {
            const { sequence } = runner.config;
            if (sequence.shuffle || suite.shuffle) {
              const suites = tasksGroup.filter((group) => group.type === "suite");
              const tests = tasksGroup.filter((group) => group.type === "test");
              const groups = shuffle([suites, tests], sequence.seed);
              tasksGroup = groups.flatMap((group) => shuffle(group, sequence.seed));
            }
            for (const c of tasksGroup)
              await runSuiteChild(c, runner);
          }
        }
      }
    } catch (e) {
      failTask(suite.result, e);
    }
  }
  try {
    await callSuiteHook(suite, suite, "afterAll", runner, [suite]);
    await callCleanupHooks(beforeAllCleanups);
  } catch (e) {
    failTask(suite.result, e);
  }
  suite.result.duration = now() - start;
  if (suite.mode === "run") {
    if (!hasTests(suite)) {
      suite.result.state = "fail";
      if (!suite.result.error) {
        const error = processError(new Error(`No test found in suite ${suite.name}`));
        suite.result.error = error;
        suite.result.errors = [error];
      }
    } else if (hasFailed(suite)) {
      suite.result.state = "fail";
    } else {
      suite.result.state = "pass";
    }
  }
  await ((_c = runner.onAfterRunSuite) == null ? void 0 : _c.call(runner, suite));
  updateTask(suite, runner);
}
async function runSuiteChild(c, runner) {
  if (c.type === "test")
    return runTest(c, runner);
  else if (c.type === "suite")
    return runSuite(c, runner);
}
async function runFiles(files, runner) {
  var _a, _b;
  for (const file of files) {
    if (!file.tasks.length && !runner.config.passWithNoTests) {
      if (!((_b = (_a = file.result) == null ? void 0 : _a.errors) == null ? void 0 : _b.length)) {
        const error = processError(new Error(`No test suite found in file ${file.filepath}`));
        file.result = {
          state: "fail",
          error,
          errors: [error]
        };
      }
    }
    await runSuite(file, runner);
  }
}
async function startTests(paths, runner) {
  var _a, _b, _c, _d;
  await ((_a = runner.onBeforeCollect) == null ? void 0 : _a.call(runner, paths));
  const files = await collectTests(paths, runner);
  (_b = runner.onCollected) == null ? void 0 : _b.call(runner, files);
  await ((_c = runner.onBeforeRun) == null ? void 0 : _c.call(runner, files));
  await runFiles(files, runner);
  await ((_d = runner.onAfterRun) == null ? void 0 : _d.call(runner, files));
  await sendTasksUpdate(runner);
  return files;
}

const getDefaultHookTimeout = () => getRunner().config.hookTimeout;
const beforeAll = (fn, timeout) => getCurrentSuite().on("beforeAll", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));
const afterAll = (fn, timeout) => getCurrentSuite().on("afterAll", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));
const beforeEach = (fn, timeout) => getCurrentSuite().on("beforeEach", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));
const afterEach = (fn, timeout) => getCurrentSuite().on("afterEach", withTimeout(fn, timeout ?? getDefaultHookTimeout(), true));
const onTestFailed = createTestHook("onTestFailed", (test, handler) => {
  test.onFailed || (test.onFailed = []);
  test.onFailed.push(handler);
});
function createTestHook(name, handler) {
  return (fn) => {
    const current = getCurrentTest();
    if (!current)
      throw new Error(`Hook ${name}() can only be called inside a test`);
    handler(current, fn);
  };
}

export { afterAll, afterEach, beforeAll, beforeEach, describe, getCurrentSuite, getFn, it, onTestFailed, setFn, startTests, suite, test, updateTask };
