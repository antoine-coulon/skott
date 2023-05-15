import * as Chunk from "@effect/data/Chunk";
import * as Differ from "@effect/data/Differ";
import * as Equal from "@effect/data/Equal";
import * as HashSet from "@effect/data/HashSet";
import * as supervisor from "@effect/io/internal_effect_untraced/supervisor";
/** @internal */
export const OP_EMPTY = "Empty";
/** @internal */
export const OP_ADD_SUPERVISOR = "AddSupervisor";
/** @internal */
export const OP_REMOVE_SUPERVISOR = "RemoveSupervisor";
/** @internal */
export const OP_AND_THEN = "AndThen";
/**
 * The empty `SupervisorPatch`.
 *
 * @internal
 */
export const empty = {
  _tag: OP_EMPTY
};
/**
 * Combines two patches to produce a new patch that describes applying the
 * updates from this patch and then the updates from the specified patch.
 *
 * @internal
 */
export const combine = (self, that) => {
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
export const patch = (self, supervisor) => {
  return patchLoop(supervisor, Chunk.of(self));
};
/** @internal */
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
export const diff = (oldValue, newValue) => {
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
export const differ = /*#__PURE__*/Differ.make({
  empty,
  patch,
  combine,
  diff
});
//# sourceMappingURL=patch.mjs.map