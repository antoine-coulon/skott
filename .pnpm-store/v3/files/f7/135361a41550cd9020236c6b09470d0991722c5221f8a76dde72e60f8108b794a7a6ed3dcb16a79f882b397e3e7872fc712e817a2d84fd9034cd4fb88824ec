"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.empty = exports.differ = exports.diff = exports.combine = exports.OP_REMOVE_SUPERVISOR = exports.OP_EMPTY = exports.OP_AND_THEN = exports.OP_ADD_SUPERVISOR = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Differ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var supervisor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/supervisor"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const OP_EMPTY = "Empty";
/** @internal */
exports.OP_EMPTY = OP_EMPTY;
const OP_ADD_SUPERVISOR = "AddSupervisor";
/** @internal */
exports.OP_ADD_SUPERVISOR = OP_ADD_SUPERVISOR;
const OP_REMOVE_SUPERVISOR = "RemoveSupervisor";
/** @internal */
exports.OP_REMOVE_SUPERVISOR = OP_REMOVE_SUPERVISOR;
const OP_AND_THEN = "AndThen";
/**
 * The empty `SupervisorPatch`.
 *
 * @internal
 */
exports.OP_AND_THEN = OP_AND_THEN;
const empty = {
  _tag: OP_EMPTY
};
/**
 * Combines two patches to produce a new patch that describes applying the
 * updates from this patch and then the updates from the specified patch.
 *
 * @internal
 */
exports.empty = empty;
const combine = (self, that) => {
  return {
    _tag: OP_AND_THEN,
    first: self,
    second: that
  };
};
/**
 * Applies a `SupervisorPatch` to a `Supervisor` to produce a new `Supervisor`.
 *
 * @internal
 */
exports.combine = combine;
const patch = (self, supervisor) => {
  return patchLoop(supervisor, Chunk.of(self));
};
/** @internal */
exports.patch = patch;
const patchLoop = (_supervisor, _patches) => {
  let supervisor = _supervisor;
  let patches = _patches;
  while (Chunk.isNonEmpty(patches)) {
    const head = Chunk.headNonEmpty(patches);
    switch (head._tag) {
      case OP_EMPTY:
        {
          patches = Chunk.tailNonEmpty(patches);
          break;
        }
      case OP_ADD_SUPERVISOR:
        {
          supervisor = supervisor.zip(head.supervisor);
          patches = Chunk.tailNonEmpty(patches);
          break;
        }
      case OP_REMOVE_SUPERVISOR:
        {
          supervisor = removeSupervisor(supervisor, head.supervisor);
          patches = Chunk.tailNonEmpty(patches);
          break;
        }
      case OP_AND_THEN:
        {
          patches = Chunk.prepend(head.first)(Chunk.prepend(head.second)(Chunk.tailNonEmpty(patches)));
          break;
        }
    }
  }
  return supervisor;
};
/** @internal */
const removeSupervisor = (self, that) => {
  if (Equal.equals(self, that)) {
    return supervisor.none;
  } else {
    if (self instanceof supervisor.Zip) {
      return removeSupervisor(self.left, that).zip(removeSupervisor(self.right, that));
    } else {
      return self;
    }
  }
};
/** @internal */
const toSet = self => {
  if (Equal.equals(self, supervisor.none)) {
    return HashSet.empty();
  } else {
    if (self instanceof supervisor.Zip) {
      return HashSet.union(toSet(self.right))(toSet(self.left));
    } else {
      return HashSet.make(self);
    }
  }
};
/** @internal */
const diff = (oldValue, newValue) => {
  if (Equal.equals(oldValue, newValue)) {
    return empty;
  }
  const oldSupervisors = toSet(oldValue);
  const newSupervisors = toSet(newValue);
  const added = HashSet.reduce(empty, (patch, supervisor) => combine(patch, {
    _tag: OP_ADD_SUPERVISOR,
    supervisor
  }))(HashSet.difference(oldSupervisors)(newSupervisors));
  const removed = HashSet.reduce(empty, (patch, supervisor) => combine(patch, {
    _tag: OP_REMOVE_SUPERVISOR,
    supervisor
  }))(HashSet.difference(newSupervisors)(oldSupervisors));
  return combine(added, removed);
};
/** @internal */
exports.diff = diff;
const differ = /*#__PURE__*/Differ.make({
  empty,
  patch,
  combine,
  diff
});
exports.differ = differ;
//# sourceMappingURL=patch.js.map