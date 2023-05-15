'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node_url = require('node:url');
var fs = require('fs');
var pathe = require('pathe');

const isWindows = process.platform === "win32";
function slash(str) {
  return str.replace(/\\/g, "/");
}
const VALID_ID_PREFIX = "/@id/";
function normalizeRequestId(id, base) {
  if (base && id.startsWith(base))
    id = `/${id.slice(base.length)}`;
  return id.replace(/^\/@id\/__x00__/, "\0").replace(/^\/@id\//, "").replace(/^__vite-browser-external:/, "").replace(/^file:/, "").replace(/^\/+/, "/").replace(/\?v=\w+/, "?").replace(/&v=\w+/, "").replace(/\?t=\w+/, "?").replace(/&t=\w+/, "").replace(/\?import/, "?").replace(/&import/, "").replace(/\?&/, "?").replace(/\?+$/, "");
}
const queryRE = /\?.*$/s;
const hashRE = /#.*$/s;
const cleanUrl = (url) => url.replace(hashRE, "").replace(queryRE, "");
const internalRequests = [
  "@vite/client",
  "@vite/env"
];
const internalRequestRegexp = new RegExp(`^/?(${internalRequests.join("|")})$`);
const isInternalRequest = (id) => {
  return internalRequestRegexp.test(id);
};
function normalizeModuleId(id) {
  return id.replace(/\\/g, "/").replace(/^\/@fs\//, isWindows ? "" : "/").replace(/^file:\//, "/").replace(/^node:/, "").replace(/^\/+/, "/");
}
function isPrimitive(v) {
  return v !== Object(v);
}
function toFilePath(id, root) {
  let { absolute, exists } = (() => {
    if (id.startsWith("/@fs/"))
      return { absolute: id.slice(4), exists: true };
    if (!id.startsWith(root) && id.startsWith("/")) {
      const resolved = pathe.resolve(root, id.slice(1));
      if (fs.existsSync(cleanUrl(resolved)))
        return { absolute: resolved, exists: true };
    } else if (id.startsWith(root) && fs.existsSync(cleanUrl(id))) {
      return { absolute: id, exists: true };
    }
    return { absolute: id, exists: false };
  })();
  if (absolute.startsWith("//"))
    absolute = absolute.slice(1);
  return {
    path: isWindows && absolute.startsWith("/") ? slash(node_url.fileURLToPath(node_url.pathToFileURL(absolute.slice(1)).href)) : absolute,
    exists
  };
}
function toArray(array) {
  if (array === null || array === void 0)
    array = [];
  if (Array.isArray(array))
    return array;
  return [array];
}

exports.VALID_ID_PREFIX = VALID_ID_PREFIX;
exports.cleanUrl = cleanUrl;
exports.hashRE = hashRE;
exports.isInternalRequest = isInternalRequest;
exports.isPrimitive = isPrimitive;
exports.isWindows = isWindows;
exports.normalizeModuleId = normalizeModuleId;
exports.normalizeRequestId = normalizeRequestId;
exports.queryRE = queryRE;
exports.slash = slash;
exports.toArray = toArray;
exports.toFilePath = toFilePath;
