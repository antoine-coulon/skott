"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.diff = exports.combine = exports.OP_UPDATE = exports.OP_REMOVE = exports.OP_EMPTY = exports.OP_AND_THEN = exports.OP_ADD = void 0;
var _Equal = /*#__PURE__*/require("@effect/data/Equal");
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Arr = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/ReadonlyArray"));
var _fiberRefs = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRefs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const OP_EMPTY = "Empty";
/** @internal */
exports.OP_EMPTY = OP_EMPTY;
const OP_ADD = "Add";
/** @internal */
exports.OP_ADD = OP_ADD;
const OP_REMOVE = "Remove";
/** @internal */
exports.OP_REMOVE = OP_REMOVE;
const OP_UPDATE = "Update";
/** @internal */
exports.OP_UPDATE = OP_UPDATE;
const OP_AND_THEN = "AndThen";
/** @internal */
exports.OP_AND_THEN = OP_AND_THEN;
const empty = () => ({
  _tag: OP_EMPTY
});
/** @internal */
exports.empty = empty;
const diff = (oldValue, newValue) => {
  const missingLocals = new Map(oldValue.locals);
  let patch = empty();
  for (const [fiberRef, pairs] of newValue.locals.entries()) {
    const newValue = Arr.headNonEmpty(pairs)[1];
    const old = missingLocals.get(fiberRef);
    if (old !== undefined) {
      const oldValue = Arr.headNonEmpty(old)[1];
      if (!(0, _Equal.equals)(oldValue, newValue)) {
        patch = combine({
          _tag: OP_UPDATE,
          fiberRef,
          patch: fiberRef.diff(oldValue, newValue)
        })(patch);
      }
    } else {
      patch = combine({
        _tag: OP_ADD,
        fiberRef,
        value: newValue
      })(patch);
    }
    missingLocals.delete(fiberRef);
  }
  for (const [fiberRef] of missingLocals.entries()) {
    patch = combine({
      _tag: OP_REMOVE,
      fiberRef
    })(patch);
  }
  return patch;
};
/** @internal */
exports.diff = diff;
const combine = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => ({
  _tag: OP_AND_THEN,
  first: self,
  second: that
}));
/** @internal */
exports.combine = combine;
const patch = /*#__PURE__*/(0, _Function.dual)(3, (self, fiberId, oldValue) => {
  let fiberRefs = oldValue;
  let patches = Arr.of(self);
  while (Arr.isNonEmptyReadonlyArray(patches)) {
    const head = Arr.headNonEmpty(patches);
    const tail = Arr.tailNonEmpty(patches);
    switch (head._tag) {
      case OP_EMPTY:
        {
          patches = tail;
          break;
        }
      case OP_ADD:
        {
          fiberRefs = _fiberRefs.updatedAs(fiberRefs, fiberId, head.fiberRef, head.value);
          patches = tail;
          break;
        }
      case OP_REMOVE:
        {
          fiberRefs = _fiberRefs.delete_(fiberRefs, head.fiberRef);
          patches = tail;
          break;
        }
      case OP_UPDATE:
        {
          const value = _fiberRefs.getOrDefault(fiberRefs, head.fiberRef);
          fiberRefs = _fiberRefs.updatedAs(fiberRefs, fiberId, head.fiberRef, head.fiberRef.patch(head.patch)(value));
          patches = tail;
          break;
        }
      case OP_AND_THEN:
        {
          patches = Arr.prepend(head.first)(Arr.prepend(head.second)(tail));
          break;
        }
    }
  }
  return fiberRefs;
});
exports.patch = patch;
//# sourceMappingURL=patch.js.map