"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.value = exports.unsafeWipe = exports.proto = exports.make = exports.isConfigSecret = exports.fromString = exports.fromChunk = exports.ConfigSecretTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ConfigSecretSymbolKey = "@effect/io/Config/Secret";
/** @internal */
const ConfigSecretTypeId = /*#__PURE__*/Symbol.for(ConfigSecretSymbolKey);
/** @internal */
exports.ConfigSecretTypeId = ConfigSecretTypeId;
const proto = {
  [ConfigSecretTypeId]: ConfigSecretTypeId,
  [Hash.symbol]() {
    return Hash.combine(Hash.array(this.raw))(Hash.hash(ConfigSecretSymbolKey));
  },
  [Equal.symbol](that) {
    return isConfigSecret(that) && this.raw.length === that.raw.length && this.raw.every((v, i) => Equal.equals(v, that.raw[i]));
  }
};
/** @internal */
exports.proto = proto;
const isConfigSecret = u => {
  return typeof u === "object" && u != null && ConfigSecretTypeId in u;
};
/** @internal */
exports.isConfigSecret = isConfigSecret;
const make = bytes => {
  const secret = Object.create(proto);
  Object.defineProperty(secret, "toString", {
    enumerable: false,
    value() {
      return "ConfigSecret(<redacted>)";
    }
  });
  Object.defineProperty(secret, "raw", {
    enumerable: false,
    value: bytes
  });
  return secret;
};
/** @internal */
exports.make = make;
const fromChunk = chunk => {
  return make(Chunk.toReadonlyArray(chunk).map(char => char.charCodeAt(0)));
};
/** @internal */
exports.fromChunk = fromChunk;
const fromString = text => {
  return make(text.split("").map(char => char.charCodeAt(0)));
};
/** @internal */
exports.fromString = fromString;
const value = self => {
  return self.raw.map(byte => String.fromCharCode(byte)).join("");
};
/** @internal */
exports.value = value;
const unsafeWipe = self => {
  for (let i = 0; i < self.raw.length; i++) {
    self.raw[i] = 0;
  }
};
exports.unsafeWipe = unsafeWipe;
//# sourceMappingURL=configSecret.js.map