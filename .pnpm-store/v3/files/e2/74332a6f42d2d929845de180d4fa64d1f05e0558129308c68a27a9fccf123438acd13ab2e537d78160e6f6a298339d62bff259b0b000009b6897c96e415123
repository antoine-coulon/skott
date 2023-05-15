import { getNames, getTests } from '@vitest/runner/utils';
import { resolve } from 'pathe';
import { n as notNullish } from './chunk-utils-base.977ae74f.js';

function hasFailedSnapshot(suite) {
  return getTests(suite).some((s) => {
    var _a, _b;
    return (_b = (_a = s.result) == null ? void 0 : _a.errors) == null ? void 0 : _b.some((e) => e.message.match(/Snapshot .* mismatched/));
  });
}
function getFullName(task, separator = " > ") {
  return getNames(task).join(separator);
}

const lineSplitRE = /\r?\n/;
const stackIgnorePatterns = [
  "node:internal",
  /\/packages\/\w+\/dist\//,
  /\/@vitest\/\w+\/dist\//,
  "/vitest/dist/",
  "/vitest/src/",
  "/vite-node/dist/",
  "/vite-node/src/",
  "/node_modules/chai/",
  "/node_modules/tinypool/",
  "/node_modules/tinyspy/"
];
function extractLocation(urlLike) {
  if (!urlLike.includes(":"))
    return [urlLike];
  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  const parts = regExp.exec(urlLike.replace(/[()]/g, ""));
  if (!parts)
    return [urlLike];
  return [parts[1], parts[2] || void 0, parts[3] || void 0];
}
function parseSingleStack(raw) {
  let line = raw.trim();
  if (line.includes("(eval "))
    line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
  let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
  const location = sanitizedLine.match(/ (\(.+\)$)/);
  sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
  const [url, lineNumber, columnNumber] = extractLocation(location ? location[1] : sanitizedLine);
  let method = location && sanitizedLine || "";
  let file = url && ["eval", "<anonymous>"].includes(url) ? void 0 : url;
  if (!file || !lineNumber || !columnNumber)
    return null;
  if (method.startsWith("async "))
    method = method.slice(6);
  if (file.startsWith("file://"))
    file = file.slice(7);
  file = resolve(file);
  return {
    method,
    file,
    line: parseInt(lineNumber),
    column: parseInt(columnNumber)
  };
}
function parseStacktrace(e, full = false) {
  if (!e)
    return [];
  if (e.stacks)
    return e.stacks;
  const stackStr = e.stack || e.stackStr || "";
  const stackFrames = stackStr.split("\n").map((raw) => {
    const stack = parseSingleStack(raw);
    if (!stack || !full && stackIgnorePatterns.some((p) => stack.file.match(p)))
      return null;
    return stack;
  }).filter(notNullish);
  e.stacks = stackFrames;
  return stackFrames;
}
function positionToOffset(source, lineNumber, columnNumber) {
  const lines = source.split(lineSplitRE);
  let start = 0;
  if (lineNumber > lines.length)
    return source.length;
  for (let i = 0; i < lineNumber - 1; i++)
    start += lines[i].length + 1;
  return start + columnNumber;
}
function offsetToLineNumber(source, offset) {
  if (offset > source.length) {
    throw new Error(
      `offset is longer than source length! offset ${offset} > length ${source.length}`
    );
  }
  const lines = source.split(lineSplitRE);
  let counted = 0;
  let line = 0;
  for (; line < lines.length; line++) {
    const lineLength = lines[line].length + 1;
    if (counted + lineLength >= offset)
      break;
    counted += lineLength;
  }
  return line + 1;
}

export { parseStacktrace as a, parseSingleStack as b, getFullName as g, hasFailedSnapshot as h, lineSplitRE as l, offsetToLineNumber as o, positionToOffset as p };
