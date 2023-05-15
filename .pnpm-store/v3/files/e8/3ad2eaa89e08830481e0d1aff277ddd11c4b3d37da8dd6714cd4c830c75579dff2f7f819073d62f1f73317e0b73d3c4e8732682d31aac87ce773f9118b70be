"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalValue = void 0;
/**
 * @since 1.0.0
 */
const globalStoreId = /*#__PURE__*/Symbol.for("@effect/data/Global/globalStoreId");
if (!(globalStoreId in globalThis)) {
  globalThis[globalStoreId] = /*#__PURE__*/new Map();
}
const globalStore = globalThis[globalStoreId];
/**
 * @since 1.0.0
 */
const globalValue = (id, compute) => {
  if (!globalStore.has(id)) {
    globalStore.set(id, compute());
  }
  return globalStore.get(id);
};
exports.globalValue = globalValue;
//# sourceMappingURL=Global.js.map