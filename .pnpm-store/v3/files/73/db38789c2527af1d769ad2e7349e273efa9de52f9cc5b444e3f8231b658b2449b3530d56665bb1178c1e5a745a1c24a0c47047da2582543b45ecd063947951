/**
 * @since 1.0.0
 */
import * as Data from "@effect/data/Data";
import { dual } from "@effect/data/Function";
import * as option from "@effect/data/internal/Option";
/** @internal */
export const isLeft = ma => ma._tag === "Left";
/** @internal */
export const isRight = ma => ma._tag === "Right";
/** @internal */
export const left = e => Data.struct({
  _tag: "Left",
  left: e
});
/** @internal */
export const right = a => Data.struct({
  _tag: "Right",
  right: a
});
/** @internal */
export const getLeft = self => isRight(self) ? option.none : option.some(self.left);
/** @internal */
export const getRight = self => isLeft(self) ? option.none : option.some(self.right);
/** @internal */
export const fromOption = /*#__PURE__*/dual(2, (self, onNone) => option.isNone(self) ? left(onNone()) : right(self.value));
//# sourceMappingURL=Either.mjs.map