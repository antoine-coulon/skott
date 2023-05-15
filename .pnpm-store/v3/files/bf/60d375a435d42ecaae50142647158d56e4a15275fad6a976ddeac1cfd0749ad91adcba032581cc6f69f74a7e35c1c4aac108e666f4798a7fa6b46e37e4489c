import { format, deepClone, stringify, getOwnProperties, getType, toArray } from '@vitest/utils';

function partitionSuiteChildren(suite) {
  let tasksGroup = [];
  const tasksGroups = [];
  for (const c of suite.tasks) {
    if (tasksGroup.length === 0 || c.concurrent === tasksGroup[0].concurrent) {
      tasksGroup.push(c);
    } else {
      tasksGroups.push(tasksGroup);
      tasksGroup = [c];
    }
  }
  if (tasksGroup.length > 0)
    tasksGroups.push(tasksGroup);
  return tasksGroups;
}

function interpretTaskModes(suite, namePattern, onlyMode, parentIsOnly, allowOnly) {
  const suiteIsOnly = parentIsOnly || suite.mode === "only";
  suite.tasks.forEach((t) => {
    const includeTask = suiteIsOnly || t.mode === "only";
    if (onlyMode) {
      if (t.type === "suite" && (includeTask || someTasksAreOnly(t))) {
        if (t.mode === "only") {
          checkAllowOnly(t, allowOnly);
          t.mode = "run";
        }
      } else if (t.mode === "run" && !includeTask) {
        t.mode = "skip";
      } else if (t.mode === "only") {
        checkAllowOnly(t, allowOnly);
        t.mode = "run";
      }
    }
    if (t.type === "test") {
      if (namePattern && !getTaskFullName(t).match(namePattern))
        t.mode = "skip";
    } else if (t.type === "suite") {
      if (t.mode === "skip")
        skipAllTasks(t);
      else
        interpretTaskModes(t, namePattern, onlyMode, includeTask, allowOnly);
    }
  });
  if (suite.mode === "run") {
    if (suite.tasks.length && suite.tasks.every((i) => i.mode !== "run"))
      suite.mode = "skip";
  }
}
function getTaskFullName(task) {
  return `${task.suite ? `${getTaskFullName(task.suite)} ` : ""}${task.name}`;
}
function someTasksAreOnly(suite) {
  return suite.tasks.some((t) => t.mode === "only" || t.type === "suite" && someTasksAreOnly(t));
}
function skipAllTasks(suite) {
  suite.tasks.forEach((t) => {
    if (t.mode === "run") {
      t.mode = "skip";
      if (t.type === "suite")
        skipAllTasks(t);
    }
  });
}
function checkAllowOnly(task, allowOnly) {
  if (allowOnly)
    return;
  const error = new Error("[Vitest] Unexpected .only modifier. Remove it or pass --allowOnly argument to bypass this error");
  task.result = {
    state: "fail",
    error,
    errors: [error]
  };
}
function generateHash(str) {
  let hash = 0;
  if (str.length === 0)
    return `${hash}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `${hash}`;
}
function calculateSuiteHash(parent) {
  parent.tasks.forEach((t, idx) => {
    t.id = `${parent.id}_${idx}`;
    if (t.type === "suite")
      calculateSuiteHash(t);
  });
}

function createChainable(keys, fn) {
  function create(context) {
    const chain2 = function(...args) {
      return fn.apply(context, args);
    };
    Object.assign(chain2, fn);
    chain2.withContext = () => chain2.bind(context);
    for (const key of keys) {
      Object.defineProperty(chain2, key, {
        get() {
          return create({ ...context, [key]: true });
        }
      });
    }
    return chain2;
  }
  const chain = create({});
  chain.fn = fn;
  return chain;
}

const IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
const IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
const isImmutable = (v) => v && (v[IS_COLLECTION_SYMBOL] || v[IS_RECORD_SYMBOL]);
const OBJECT_PROTO = Object.getPrototypeOf({});
function getUnserializableMessage(err) {
  if (err instanceof Error)
    return `<unserializable>: ${err.message}`;
  if (typeof err === "string")
    return `<unserializable>: ${err}`;
  return "<unserializable>";
}
function serializeError(val, seen = /* @__PURE__ */ new WeakMap()) {
  if (!val || typeof val === "string")
    return val;
  if (typeof val === "function")
    return `Function<${val.name || "anonymous"}>`;
  if (typeof val === "symbol")
    return val.toString();
  if (typeof val !== "object")
    return val;
  if (isImmutable(val))
    return serializeError(val.toJSON(), seen);
  if (val instanceof Promise || val.constructor && val.constructor.prototype === "AsyncFunction")
    return "Promise";
  if (typeof Element !== "undefined" && val instanceof Element)
    return val.tagName;
  if (typeof val.asymmetricMatch === "function")
    return `${val.toString()} ${format(val.sample)}`;
  if (seen.has(val))
    return seen.get(val);
  if (Array.isArray(val)) {
    const clone = new Array(val.length);
    seen.set(val, clone);
    val.forEach((e, i) => {
      try {
        clone[i] = serializeError(e, seen);
      } catch (err) {
        clone[i] = getUnserializableMessage(err);
      }
    });
    return clone;
  } else {
    const clone = /* @__PURE__ */ Object.create(null);
    seen.set(val, clone);
    let obj = val;
    while (obj && obj !== OBJECT_PROTO) {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        if (key in clone)
          return;
        try {
          clone[key] = serializeError(val[key], seen);
        } catch (err) {
          delete clone[key];
          clone[key] = getUnserializableMessage(err);
        }
      });
      obj = Object.getPrototypeOf(obj);
    }
    return clone;
  }
}
function normalizeErrorMessage(message) {
  return message.replace(/__vite_ssr_import_\d+__\./g, "");
}
function processError(err, options = {}) {
  if (!err || typeof err !== "object")
    return err;
  if (err.stack)
    err.stackStr = String(err.stack);
  if (err.name)
    err.nameStr = String(err.name);
  const clonedActual = deepClone(err.actual);
  const clonedExpected = deepClone(err.expected);
  const { replacedActual, replacedExpected } = replaceAsymmetricMatcher(clonedActual, clonedExpected);
  err.actual = replacedActual;
  err.expected = replacedExpected;
  const maxDiffSize = options.outputDiffMaxSize ?? 1e4;
  if (typeof err.expected !== "string")
    err.expected = stringify(err.expected, 10, { maxLength: maxDiffSize });
  if (typeof err.actual !== "string")
    err.actual = stringify(err.actual, 10, { maxLength: maxDiffSize });
  try {
    if (typeof err.message === "string")
      err.message = normalizeErrorMessage(err.message);
    if (typeof err.cause === "object" && typeof err.cause.message === "string")
      err.cause.message = normalizeErrorMessage(err.cause.message);
  } catch {
  }
  try {
    return serializeError(err);
  } catch (e) {
    return serializeError(new Error(`Failed to fully serialize error: ${e == null ? void 0 : e.message}
Inner error message: ${err == null ? void 0 : err.message}`));
  }
}
function isAsymmetricMatcher(data) {
  const type = getType(data);
  return type === "Object" && typeof data.asymmetricMatch === "function";
}
function isReplaceable(obj1, obj2) {
  const obj1Type = getType(obj1);
  const obj2Type = getType(obj2);
  return obj1Type === obj2Type && obj1Type === "Object";
}
function replaceAsymmetricMatcher(actual, expected, actualReplaced = /* @__PURE__ */ new WeakSet(), expectedReplaced = /* @__PURE__ */ new WeakSet()) {
  if (!isReplaceable(actual, expected))
    return { replacedActual: actual, replacedExpected: expected };
  if (actualReplaced.has(actual) || expectedReplaced.has(expected))
    return { replacedActual: actual, replacedExpected: expected };
  actualReplaced.add(actual);
  expectedReplaced.add(expected);
  getOwnProperties(expected).forEach((key) => {
    const expectedValue = expected[key];
    const actualValue = actual[key];
    if (isAsymmetricMatcher(expectedValue)) {
      if (expectedValue.asymmetricMatch(actualValue))
        actual[key] = expectedValue;
    } else if (isAsymmetricMatcher(actualValue)) {
      if (actualValue.asymmetricMatch(expectedValue))
        expected[key] = actualValue;
    } else if (isReplaceable(actualValue, expectedValue)) {
      const replaced = replaceAsymmetricMatcher(
        actualValue,
        expectedValue,
        actualReplaced,
        expectedReplaced
      );
      actual[key] = replaced.replacedActual;
      expected[key] = replaced.replacedExpected;
    }
  });
  return {
    replacedActual: actual,
    replacedExpected: expected
  };
}

function isAtomTest(s) {
  return s.type === "test" || s.type === "custom";
}
function getTests(suite) {
  return toArray(suite).flatMap((s) => isAtomTest(s) ? [s] : s.tasks.flatMap((c) => isAtomTest(c) ? [c] : getTests(c)));
}
function getTasks(tasks = []) {
  return toArray(tasks).flatMap((s) => isAtomTest(s) ? [s] : [s, ...getTasks(s.tasks)]);
}
function getSuites(suite) {
  return toArray(suite).flatMap((s) => s.type === "suite" ? [s, ...getSuites(s.tasks)] : []);
}
function hasTests(suite) {
  return toArray(suite).some((s) => s.tasks.some((c) => isAtomTest(c) || hasTests(c)));
}
function hasFailed(suite) {
  return toArray(suite).some((s) => {
    var _a;
    return ((_a = s.result) == null ? void 0 : _a.state) === "fail" || s.type === "suite" && hasFailed(s.tasks);
  });
}
function getNames(task) {
  const names = [task.name];
  let current = task;
  while ((current == null ? void 0 : current.suite) || (current == null ? void 0 : current.file)) {
    current = current.suite || current.file;
    if (current == null ? void 0 : current.name)
      names.unshift(current.name);
  }
  return names;
}

export { calculateSuiteHash as a, partitionSuiteChildren as b, createChainable as c, hasFailed as d, getTests as e, getTasks as f, generateHash as g, hasTests as h, interpretTaskModes as i, getSuites as j, getNames as k, serializeError as l, processError as p, replaceAsymmetricMatcher as r, someTasksAreOnly as s };
