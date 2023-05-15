import { relative } from 'pathe';
import { i as isNode } from './chunk-utils-env.860d90c2.js';
import '@vitest/runner/utils';
import '@vitest/utils';

function getWorkerState() {
  return globalThis.__vitest_worker__;
}
function getCurrentEnvironment() {
  return globalThis.__vitest_environment__;
}

const isWindows = isNode && process.platform === "win32";
const getRunMode = () => getWorkerState().config.mode;
const isRunningInBenchmark = () => getRunMode() === "benchmark";
const relativePath = relative;
function resetModules(modules, resetMocks = false) {
  const skipPaths = [
    /\/vitest\/dist\//,
    /\/vite-node\/dist\//,
    /vitest-virtual-\w+\/dist/,
    /@vitest\/dist/,
    ...!resetMocks ? [/^mock:/] : []
  ];
  modules.forEach((_, path) => {
    if (skipPaths.some((re) => re.test(path)))
      return;
    modules.delete(path);
  });
}
function removeUndefinedValues(obj) {
  for (const key in Object.keys(obj)) {
    if (obj[key] === void 0)
      delete obj[key];
  }
  return obj;
}
function getCallLastIndex(code) {
  let charIndex = -1;
  let inString = null;
  let startedBracers = 0;
  let endedBracers = 0;
  let beforeChar = null;
  while (charIndex <= code.length) {
    beforeChar = code[charIndex];
    charIndex++;
    const char = code[charIndex];
    const isCharString = char === '"' || char === "'" || char === "`";
    if (isCharString && beforeChar !== "\\") {
      if (inString === char)
        inString = null;
      else if (!inString)
        inString = char;
    }
    if (!inString) {
      if (char === "(")
        startedBracers++;
      if (char === ")")
        endedBracers++;
    }
    if (startedBracers && endedBracers && startedBracers === endedBracers)
      return charIndex;
  }
  return null;
}
class AggregateErrorPonyfill extends Error {
  constructor(errors, message = "") {
    super(message);
    this.errors = [...errors];
  }
}

export { AggregateErrorPonyfill as A, getCallLastIndex as a, getCurrentEnvironment as b, relativePath as c, removeUndefinedValues as d, isWindows as e, getWorkerState as g, isRunningInBenchmark as i, resetModules as r };
