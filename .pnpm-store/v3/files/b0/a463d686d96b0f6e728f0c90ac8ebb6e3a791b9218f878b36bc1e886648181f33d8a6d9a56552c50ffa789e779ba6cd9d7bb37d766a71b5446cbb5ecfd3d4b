import * as Chunk from "@effect/data/Chunk";
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
/** @internal */
const ConfigSecretSymbolKey = "@effect/io/Config/Secret";
/** @internal */
export const ConfigSecretTypeId = /*#__PURE__*/Symbol.for(ConfigSecretSymbolKey);
/** @internal */
export const proto = {
  [ConfigSecretTypeId]: ConfigSecretTypeId,
  [Hash.symbol]() {
    return Hash.combine(Hash.array(this.raw))(Hash.hash(ConfigSecretSymbolKey));
  },
  [Equal.symbol](that) {
    return isConfigSecret(that) && this.raw.length === that.raw.length && this.raw.every((v, i) => Equal.equals(v, that.raw[i]));
  }
};
/** @internal */
export const isConfigSecret = u => {
  return typeof u === "object" && u != null && ConfigSecretTypeId in u;
};
/** @internal */
export const make = bytes => {
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
export const fromChunk = chunk => {
  return make(Chunk.toReadonlyArray(chunk).map(char => char.charCodeAt(0)));
};
/** @internal */
export const fromString = text => {
  return make(text.split("").map(char => char.charCodeAt(0)));
};
/** @internal */
export const value = self => {
  return self.raw.map(byte => String.fromCharCode(byte)).join("");
};
/** @internal */
export const unsafeWipe = self => {
  for (let i = 0; i < self.raw.length; i++) {
    self.raw[i] = 0;
  }
};
//# sourceMappingURL=configSecret.mjs.map