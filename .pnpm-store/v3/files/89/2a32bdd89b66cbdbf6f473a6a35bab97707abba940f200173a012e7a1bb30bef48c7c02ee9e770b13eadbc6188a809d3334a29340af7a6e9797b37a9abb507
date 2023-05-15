var _a;
import * as Chunk from "@effect/data/Chunk";
import * as Either from "@effect/data/Either";
import * as Equal from "@effect/data/Equal";
import { constFalse, constTrue, dual, identity } from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import * as HashSet from "@effect/data/HashSet";
import * as Option from "@effect/data/Option";
import * as FiberId from "@effect/io/Fiber/Id";
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/cause";
import * as MRef from "@effect/data/MutableRef";
// -----------------------------------------------------------------------------
// Models
// -----------------------------------------------------------------------------
/** @internal */
const CauseSymbolKey = "@effect/io/Cause";
/** @internal */
export const CauseTypeId = /*#__PURE__*/Symbol.for(CauseSymbolKey);
/** @internal */
const variance = {
  _E: _ => _
};
/** @internal */
const proto = {
  [CauseTypeId]: variance,
  [Hash.symbol]() {
    return Hash.combine(Hash.hash(flattenCause(this)))(Hash.hash(CauseSymbolKey));
  },
  [Equal.symbol](that) {
    return isCause(that) && causeEquals(this, that);
  }
};
// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------
/** @internal */
export const empty = /*#__PURE__*/(() => {
  const o = /*#__PURE__*/Object.create(proto);
  o._tag = OpCodes.OP_EMPTY;
  return o;
})();
/** @internal */
export const fail = error => {
  const o = Object.create(proto);
  o._tag = OpCodes.OP_FAIL;
  o.error = error;
  return o;
};
/** @internal */
export const die = defect => {
  const o = Object.create(proto);
  o._tag = OpCodes.OP_DIE;
  o.defect = defect;
  return o;
};
/** @internal */
export const interrupt = fiberId => {
  const o = Object.create(proto);
  o._tag = OpCodes.OP_INTERRUPT;
  o.fiberId = fiberId;
  return o;
};
/** @internal */
export const annotated = (cause, annotation) => {
  const o = Object.create(proto);
  o._tag = OpCodes.OP_ANNOTATED;
  o.cause = cause;
  o.annotation = annotation;
  return o;
};
/** @internal */
export const parallel = (left, right) => {
  const o = Object.create(proto);
  o._tag = OpCodes.OP_PARALLEL;
  o.left = left;
  o.right = right;
  return o;
};
/** @internal */
export const sequential = (left, right) => {
  const o = Object.create(proto);
  o._tag = OpCodes.OP_SEQUENTIAL;
  o.left = left;
  o.right = right;
  return o;
};
// -----------------------------------------------------------------------------
// Refinements
// -----------------------------------------------------------------------------
/** @internal */
export const isCause = u => typeof u === "object" && u != null && CauseTypeId in u;
/** @internal */
export const isEmptyType = self => self._tag === OpCodes.OP_EMPTY;
/** @internal */
export const isFailType = self => self._tag === OpCodes.OP_FAIL;
/** @internal */
export const isDieType = self => self._tag === OpCodes.OP_DIE;
/** @internal */
export const isInterruptType = self => self._tag === OpCodes.OP_INTERRUPT;
/** @internal */
export const isAnnotatedType = self => self._tag === OpCodes.OP_ANNOTATED;
/** @internal */
export const isSequentialType = self => self._tag === OpCodes.OP_SEQUENTIAL;
/** @internal */
export const isParallelType = self => self._tag === OpCodes.OP_PARALLEL;
// -----------------------------------------------------------------------------
// Getters
// -----------------------------------------------------------------------------
/** @internal */
export const size = self => reduceWithContext(self, void 0, SizeCauseReducer);
/** @internal */
export const isEmpty = self => {
  if (self._tag === OpCodes.OP_EMPTY) {
    return true;
  }
  return reduce(self, true, (acc, cause) => {
    switch (cause._tag) {
      case OpCodes.OP_EMPTY:
        {
          return Option.some(acc);
        }
      case OpCodes.OP_DIE:
      case OpCodes.OP_FAIL:
      case OpCodes.OP_INTERRUPT:
        {
          return Option.some(false);
        }
      default:
        {
          return Option.none();
        }
    }
  });
};
/** @internal */
export const isFailure = self => Option.isSome(failureOption(self));
/** @internal */
export const isDie = self => Option.isSome(dieOption(self));
/** @internal */
export const isInterrupted = self => Option.isSome(interruptOption(self));
/** @internal */
export const isInterruptedOnly = self => reduceWithContext(undefined, IsInterruptedOnlyCauseReducer)(self);
/** @internal */
export const failures = self => Chunk.reverse(reduce(self, Chunk.empty(), (list, cause) => cause._tag === OpCodes.OP_FAIL ? Option.some(Chunk.prepend(cause.error)(list)) : Option.none()));
/** @internal */
export const defects = self => Chunk.reverse(reduce(self, Chunk.empty(), (list, cause) => cause._tag === OpCodes.OP_DIE ? Option.some(Chunk.prepend(cause.defect)(list)) : Option.none()));
/** @internal */
export const interruptors = self => reduce(self, HashSet.empty(), (set, cause) => cause._tag === OpCodes.OP_INTERRUPT ? Option.some(HashSet.add(cause.fiberId)(set)) : Option.none());
/** @internal */
export const failureOption = self => find(self, cause => cause._tag === OpCodes.OP_FAIL ? Option.some(cause.error) : Option.none());
/** @internal */
export const failureOrCause = self => {
  const option = failureOption(self);
  switch (option._tag) {
    case "None":
      {
        // no `E` inside this `Cause`, so it can be safely cast to `never`
        return Either.right(self);
      }
    case "Some":
      {
        return Either.left(option.value);
      }
  }
};
/** @internal */
export const dieOption = self => find(self, cause => cause._tag === OpCodes.OP_DIE ? Option.some(cause.defect) : Option.none());
/** @internal */
export const flipCauseOption = self => match(self, Option.some(empty), failureOption => Option.map(fail)(failureOption), defect => Option.some(die(defect)), fiberId => Option.some(interrupt(fiberId)), (causeOption, annotation) => Option.map(cause => annotated(cause, annotation))(causeOption), (left, right) => {
  if (Option.isSome(left) && Option.isSome(right)) {
    return Option.some(sequential(left.value, right.value));
  }
  if (Option.isNone(left) && Option.isSome(right)) {
    return Option.some(right.value);
  }
  if (Option.isSome(left) && Option.isNone(right)) {
    return Option.some(left.value);
  }
  return Option.none();
}, (left, right) => {
  if (Option.isSome(left) && Option.isSome(right)) {
    return Option.some(parallel(left.value, right.value));
  }
  if (Option.isNone(left) && Option.isSome(right)) {
    return Option.some(right.value);
  }
  if (Option.isSome(left) && Option.isNone(right)) {
    return Option.some(left.value);
  }
  return Option.none();
});
/** @internal */
export const interruptOption = self => find(self, cause => cause._tag === OpCodes.OP_INTERRUPT ? Option.some(cause.fiberId) : Option.none());
/** @internal */
export const keepDefects = self => match(self, Option.none(), () => Option.none(), defect => Option.some(die(defect)), () => Option.none(), (option, annotation) => Option.map(cause => annotated(cause, annotation))(option), (left, right) => {
  if (Option.isSome(left) && Option.isSome(right)) {
    return Option.some(sequential(left.value, right.value));
  }
  if (Option.isSome(left) && Option.isNone(right)) {
    return Option.some(left.value);
  }
  if (Option.isNone(left) && Option.isSome(right)) {
    return Option.some(right.value);
  }
  return Option.none();
}, (left, right) => {
  if (Option.isSome(left) && Option.isSome(right)) {
    return Option.some(parallel(left.value, right.value));
  }
  if (Option.isSome(left) && Option.isNone(right)) {
    return Option.some(left.value);
  }
  if (Option.isNone(left) && Option.isSome(right)) {
    return Option.some(right.value);
  }
  return Option.none();
});
/** @internal */
export const keepDefectsAndElectFailures = self => match(self, Option.none(), failure => Option.some(die(failure)), defect => Option.some(die(defect)), () => Option.none(), (option, annotation) => Option.map(cause => annotated(cause, annotation))(option), (left, right) => {
  if (Option.isSome(left) && Option.isSome(right)) {
    return Option.some(sequential(left.value, right.value));
  }
  if (Option.isSome(left) && Option.isNone(right)) {
    return Option.some(left.value);
  }
  if (Option.isNone(left) && Option.isSome(right)) {
    return Option.some(right.value);
  }
  return Option.none();
}, (left, right) => {
  if (Option.isSome(left) && Option.isSome(right)) {
    return Option.some(parallel(left.value, right.value));
  }
  if (Option.isSome(left) && Option.isNone(right)) {
    return Option.some(left.value);
  }
  if (Option.isNone(left) && Option.isSome(right)) {
    return Option.some(right.value);
  }
  return Option.none();
});
/** @internal */
export const linearize = self => match(self, HashSet.empty(), error => HashSet.make(fail(error)), defect => HashSet.make(die(defect)), fiberId => HashSet.make(interrupt(fiberId)), (set, annotation) => HashSet.map(cause => annotated(cause, annotation))(set), (leftSet, rightSet) => HashSet.flatMap(leftCause => HashSet.map(rightCause => sequential(leftCause, rightCause))(rightSet))(leftSet), (leftSet, rightSet) => HashSet.flatMap(leftCause => HashSet.map(rightCause => parallel(leftCause, rightCause))(rightSet))(leftSet));
/** @internal */
export const stripFailures = self => match(self, empty, () => empty, defect => die(defect), fiberId => interrupt(fiberId), (cause, annotation) => isEmptyType(cause) ? cause : annotated(cause, annotation), (left, right) => sequential(left, right), (left, right) => parallel(left, right));
/** @internal */
export const electFailures = self => match(self, empty, failure => die(failure), defect => die(defect), fiberId => interrupt(fiberId), (cause, annotation) => isEmptyType(cause) ? cause : annotated(cause, annotation), (left, right) => sequential(left, right), (left, right) => parallel(left, right));
/** @internal */
export const stripSomeDefects = /*#__PURE__*/dual(2, (self, pf) => {
  return match(self, Option.some(empty), error => Option.some(fail(error)), defect => {
    const option = pf(defect);
    return Option.isSome(option) ? Option.none() : Option.some(die(defect));
  }, fiberId => Option.some(interrupt(fiberId)), (option, annotation) => Option.map(cause => annotated(cause, annotation))(option), (left, right) => {
    if (Option.isSome(left) && Option.isSome(right)) {
      return Option.some(sequential(left.value, right.value));
    }
    if (Option.isSome(left) && Option.isNone(right)) {
      return Option.some(left.value);
    }
    if (Option.isNone(left) && Option.isSome(right)) {
      return Option.some(right.value);
    }
    return Option.none();
  }, (left, right) => {
    if (Option.isSome(left) && Option.isSome(right)) {
      return Option.some(parallel(left.value, right.value));
    }
    if (Option.isSome(left) && Option.isNone(right)) {
      return Option.some(left.value);
    }
    if (Option.isNone(left) && Option.isSome(right)) {
      return Option.some(right.value);
    }
    return Option.none();
  });
});
// -----------------------------------------------------------------------------
// Mapping
// -----------------------------------------------------------------------------
/** @internal */
export const as = /*#__PURE__*/dual(2, (self, error) => map(self, () => error));
/** @internal */
export const map = /*#__PURE__*/dual(2, (self, f) => flatMap(self, e => fail(f(e))));
// -----------------------------------------------------------------------------
// Sequencing
// -----------------------------------------------------------------------------
/** @internal */
export const flatMap = /*#__PURE__*/dual(2, (self, f) => match(self, empty, error => f(error), defect => die(defect), fiberId => interrupt(fiberId), (cause, annotation) => annotated(cause, annotation), (left, right) => sequential(left, right), (left, right) => parallel(left, right)));
/** @internal */
export const flatten = self => flatMap(self, identity);
// -----------------------------------------------------------------------------
// Equality
// -----------------------------------------------------------------------------
/** @internal */
export const contains = /*#__PURE__*/dual(2, (self, that) => {
  if (that._tag === OpCodes.OP_EMPTY || self === that) {
    return true;
  }
  return reduce(self, false, (accumulator, cause) => {
    return Option.some(accumulator || causeEquals(cause, that));
  });
});
/** @internal */
const causeEquals = (left, right) => {
  let leftStack = Chunk.of(left);
  let rightStack = Chunk.of(right);
  while (Chunk.isNonEmpty(leftStack) && Chunk.isNonEmpty(rightStack)) {
    const [leftParallel, leftSequential] = reduce([HashSet.empty(), Chunk.empty()], ([parallel, sequential], cause) => {
      const [par, seq] = evaluateCause(cause);
      return Option.some([HashSet.union(par)(parallel), Chunk.concat(seq)(sequential)]);
    })(Chunk.headNonEmpty(leftStack));
    const [rightParallel, rightSequential] = reduce([HashSet.empty(), Chunk.empty()], ([parallel, sequential], cause) => {
      const [par, seq] = evaluateCause(cause);
      return Option.some([HashSet.union(par)(parallel), Chunk.concat(seq)(sequential)]);
    })(Chunk.headNonEmpty(rightStack));
    if (!Equal.equals(leftParallel, rightParallel)) {
      return false;
    }
    leftStack = leftSequential;
    rightStack = rightSequential;
  }
  return true;
};
// -----------------------------------------------------------------------------
// Flattening
// -----------------------------------------------------------------------------
/**
 * Flattens a cause to a sequence of sets of causes, where each set represents
 * causes that fail in parallel and sequential sets represent causes that fail
 * after each other.
 *
 * @internal
 */
const flattenCause = cause => {
  return flattenCauseLoop(Chunk.of(cause), Chunk.empty());
};
/** @internal */
const flattenCauseLoop = (causes, flattened) => {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    const [parallel, sequential] = Chunk.reduce([HashSet.empty(), Chunk.empty()], ([parallel, sequential], cause) => {
      const [par, seq] = evaluateCause(cause);
      return [HashSet.union(par)(parallel), Chunk.concat(seq)(sequential)];
    })(causes);
    const updated = HashSet.size(parallel) > 0 ? Chunk.prepend(parallel)(flattened) : flattened;
    if (Chunk.isEmpty(sequential)) {
      return Chunk.reverse(updated);
    }
    causes = sequential;
    flattened = updated;
  }
  throw new Error("BUG: Cause.flattenCauseLoop - please report an issue at https://github.com/Effect-TS/io/issues");
};
// -----------------------------------------------------------------------------
// Squashing
// -----------------------------------------------------------------------------
/** @internal */
export const squash = self => {
  return squashWith(identity)(self);
};
/** @internal */
export const squashWith = /*#__PURE__*/dual(2, (self, f) => {
  const option = Option.map(f)(failureOption(self));
  switch (option._tag) {
    case "None":
      {
        return Option.match(() => {
          const interrupts = Array.from(interruptors(self)).flatMap(fiberId => Array.from(FiberId.ids(fiberId)).map(id => `#${id}`));
          return InterruptedException(interrupts ? `Interrupted by fibers: ${interrupts.join(", ")}` : void 0);
        }, identity)(Chunk.head(defects(self)));
      }
    case "Some":
      {
        return option.value;
      }
  }
});
// -----------------------------------------------------------------------------
// Finding
// -----------------------------------------------------------------------------
/** @internal */
export const find = /*#__PURE__*/dual(2, (self, pf) => {
  const stack = [self];
  while (stack.length > 0) {
    const item = stack.pop();
    const option = pf(item);
    switch (option._tag) {
      case "None":
        {
          switch (item._tag) {
            case OpCodes.OP_SEQUENTIAL:
            case OpCodes.OP_PARALLEL:
              {
                stack.push(item.right);
                stack.push(item.left);
                break;
              }
            case OpCodes.OP_ANNOTATED:
              {
                stack.push(item.cause);
                break;
              }
          }
          break;
        }
      case "Some":
        {
          return option;
        }
    }
  }
  return Option.none();
});
// -----------------------------------------------------------------------------
// Filtering
// -----------------------------------------------------------------------------
/** @internal */
export const filter = /*#__PURE__*/dual(2, (self, predicate) => reduceWithContext(self, void 0, FilterCauseReducer(predicate)));
// -----------------------------------------------------------------------------
// Evaluation
// -----------------------------------------------------------------------------
/**
 * Takes one step in evaluating a cause, returning a set of causes that fail
 * in parallel and a list of causes that fail sequentially after those causes.
 *
 * @internal
 */
const evaluateCause = self => {
  let cause = self;
  const stack = [];
  let _parallel = HashSet.empty();
  let _sequential = Chunk.empty();
  while (cause !== undefined) {
    switch (cause._tag) {
      case OpCodes.OP_EMPTY:
        {
          if (stack.length === 0) {
            return [_parallel, _sequential];
          }
          cause = stack.pop();
          break;
        }
      case OpCodes.OP_FAIL:
        {
          if (stack.length === 0) {
            return [HashSet.add(cause.error)(_parallel), _sequential];
          }
          _parallel = HashSet.add(cause.error)(_parallel);
          cause = stack.pop();
          break;
        }
      case OpCodes.OP_DIE:
        {
          if (stack.length === 0) {
            return [HashSet.add(cause.defect)(_parallel), _sequential];
          }
          _parallel = HashSet.add(cause.defect)(_parallel);
          cause = stack.pop();
          break;
        }
      case OpCodes.OP_INTERRUPT:
        {
          if (stack.length === 0) {
            return [HashSet.add(cause.fiberId)(_parallel), _sequential];
          }
          _parallel = HashSet.add(cause.fiberId)(_parallel);
          cause = stack.pop();
          break;
        }
      case OpCodes.OP_ANNOTATED:
        {
          cause = cause.cause;
          break;
        }
      case OpCodes.OP_SEQUENTIAL:
        {
          switch (cause.left._tag) {
            case OpCodes.OP_EMPTY:
              {
                cause = cause.right;
                break;
              }
            case OpCodes.OP_SEQUENTIAL:
              {
                cause = sequential(cause.left.left, sequential(cause.left.right, cause.right));
                break;
              }
            case OpCodes.OP_PARALLEL:
              {
                cause = parallel(sequential(cause.left.left, cause.right), sequential(cause.left.right, cause.right));
                break;
              }
            case OpCodes.OP_ANNOTATED:
              {
                cause = sequential(cause.left.cause, cause.right);
                break;
              }
            default:
              {
                _sequential = Chunk.prepend(cause.right)(_sequential);
                cause = cause.left;
                break;
              }
          }
          break;
        }
      case OpCodes.OP_PARALLEL:
        {
          stack.push(cause.right);
          cause = cause.left;
          break;
        }
    }
  }
  throw new Error("BUG: Cause.evaluateCauseLoop - please report an issue at https://github.com/Effect-TS/io/issues");
};
// -----------------------------------------------------------------------------
// Reducing
// -----------------------------------------------------------------------------
/** @internal */
const SizeCauseReducer = {
  emptyCase: () => 0,
  failCase: () => 1,
  dieCase: () => 1,
  interruptCase: () => 1,
  annotatedCase: (_, value) => value,
  sequentialCase: (_, left, right) => left + right,
  parallelCase: (_, left, right) => left + right
};
/** @internal */
const IsInterruptedOnlyCauseReducer = {
  emptyCase: constTrue,
  failCase: constFalse,
  dieCase: constFalse,
  interruptCase: constTrue,
  annotatedCase: (_, value) => value,
  sequentialCase: (_, left, right) => left && right,
  parallelCase: (_, left, right) => left && right
};
/** @internal */
const FilterCauseReducer = predicate => ({
  emptyCase: () => empty,
  failCase: (_, error) => fail(error),
  dieCase: (_, defect) => die(defect),
  interruptCase: (_, fiberId) => interrupt(fiberId),
  annotatedCase: (_, cause, annotation) => annotated(cause, annotation),
  sequentialCase: (_, left, right) => {
    if (predicate(left)) {
      if (predicate(right)) {
        return sequential(left, right);
      }
      return left;
    }
    if (predicate(right)) {
      return right;
    }
    return empty;
  },
  parallelCase: (_, left, right) => {
    if (predicate(left)) {
      if (predicate(right)) {
        return parallel(left, right);
      }
      return left;
    }
    if (predicate(right)) {
      return right;
    }
    return empty;
  }
});
const OP_SEQUENTIAL_CASE = "SequentialCase";
const OP_PARALLEL_CASE = "ParallelCase";
const OP_ANNOTATED_CASE = "AnnotatedCase";
/** @internal */
export const match = /*#__PURE__*/dual(8, (self, emptyCase, failCase, dieCase, interruptCase, annotatedCase, sequentialCase, parallelCase) => {
  return reduceWithContext(self, void 0, {
    emptyCase: () => emptyCase,
    failCase: (_, error) => failCase(error),
    dieCase: (_, defect) => dieCase(defect),
    interruptCase: (_, fiberId) => interruptCase(fiberId),
    annotatedCase: (_, value, annotation) => annotatedCase(value, annotation),
    sequentialCase: (_, left, right) => sequentialCase(left, right),
    parallelCase: (_, left, right) => parallelCase(left, right)
  });
});
/** @internal */
export const reduce = /*#__PURE__*/dual(3, (self, zero, pf) => {
  let accumulator = zero;
  let cause = self;
  const causes = [];
  while (cause !== undefined) {
    const option = pf(accumulator, cause);
    accumulator = Option.isSome(option) ? option.value : accumulator;
    switch (cause._tag) {
      case OpCodes.OP_SEQUENTIAL:
        {
          causes.push(cause.right);
          cause = cause.left;
          break;
        }
      case OpCodes.OP_PARALLEL:
        {
          causes.push(cause.right);
          cause = cause.left;
          break;
        }
      case OpCodes.OP_ANNOTATED:
        {
          cause = cause.cause;
          break;
        }
      default:
        {
          cause = undefined;
          break;
        }
    }
    if (cause === undefined && causes.length > 0) {
      cause = causes.pop();
    }
  }
  return accumulator;
});
/** @internal */
export const reduceWithContext = /*#__PURE__*/dual(3, (self, context, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const cause = input.pop();
    switch (cause._tag) {
      case OpCodes.OP_EMPTY:
        {
          output.push(Either.right(reducer.emptyCase(context)));
          break;
        }
      case OpCodes.OP_FAIL:
        {
          output.push(Either.right(reducer.failCase(context, cause.error)));
          break;
        }
      case OpCodes.OP_DIE:
        {
          output.push(Either.right(reducer.dieCase(context, cause.defect)));
          break;
        }
      case OpCodes.OP_INTERRUPT:
        {
          output.push(Either.right(reducer.interruptCase(context, cause.fiberId)));
          break;
        }
      case OpCodes.OP_ANNOTATED:
        {
          input.push(cause.cause);
          output.push(Either.left({
            _tag: OP_ANNOTATED_CASE,
            annotation: cause.annotation
          }));
          break;
        }
      case OpCodes.OP_SEQUENTIAL:
        {
          input.push(cause.right);
          input.push(cause.left);
          output.push(Either.left({
            _tag: OP_SEQUENTIAL_CASE
          }));
          break;
        }
      case OpCodes.OP_PARALLEL:
        {
          input.push(cause.right);
          input.push(cause.left);
          output.push(Either.left({
            _tag: OP_PARALLEL_CASE
          }));
          break;
        }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either = output.pop();
    switch (either._tag) {
      case "Left":
        {
          switch (either.left._tag) {
            case OP_SEQUENTIAL_CASE:
              {
                const left = accumulator.pop();
                const right = accumulator.pop();
                const value = reducer.sequentialCase(context, left, right);
                accumulator.push(value);
                break;
              }
            case OP_PARALLEL_CASE:
              {
                const left = accumulator.pop();
                const right = accumulator.pop();
                const value = reducer.parallelCase(context, left, right);
                accumulator.push(value);
                break;
              }
            case OP_ANNOTATED_CASE:
              {
                const cause = accumulator.pop();
                const value = reducer.annotatedCase(context, cause, either.left.annotation);
                accumulator.push(value);
                break;
              }
          }
          break;
        }
      case "Right":
        {
          accumulator.push(either.right);
          break;
        }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/io/issues");
  }
  return accumulator.pop();
});
// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------
const makeException = (proto, tag) => {
  const _tag = {
    value: tag,
    enumerable: true
  };
  const protoWithToString = {
    ...proto,
    toString() {
      return `${this._tag}: ${this.message}`;
    }
  };
  return message => Object.create(protoWithToString, {
    _tag,
    message: {
      value: message,
      enumerable: true
    }
  });
};
/** @internal */
export const RuntimeExceptionTypeId = /*#__PURE__*/Symbol.for("@effect/io/Cause/errors/RuntimeException");
/** @internal */
export const RuntimeException = /*#__PURE__*/makeException({
  [RuntimeExceptionTypeId]: RuntimeExceptionTypeId
}, "RuntimeException");
/** @internal */
export const isRuntimeException = u => {
  return typeof u === "object" && u != null && RuntimeExceptionTypeId in u;
};
/** @internal */
export const InterruptedExceptionTypeId = /*#__PURE__*/Symbol.for("@effect/io/Cause/errors/InterruptedException");
/** @internal */
export const InterruptedException = /*#__PURE__*/makeException({
  [InterruptedExceptionTypeId]: InterruptedExceptionTypeId
}, "InterruptedException");
/** @internal */
export const isInterruptedException = u => {
  return typeof u === "object" && u != null && InterruptedExceptionTypeId in u;
};
/** @internal */
export const IllegalArgumentExceptionTypeId = /*#__PURE__*/Symbol.for("@effect/io/Cause/errors/IllegalArgument");
/** @internal */
export const IllegalArgumentException = /*#__PURE__*/makeException({
  [IllegalArgumentExceptionTypeId]: IllegalArgumentExceptionTypeId
}, "IllegalArgumentException");
/** @internal */
export const isIllegalArgumentException = u => {
  return typeof u === "object" && u != null && IllegalArgumentExceptionTypeId in u;
};
/** @internal */
export const NoSuchElementExceptionTypeId = /*#__PURE__*/Symbol.for("@effect/io/Cause/errors/NoSuchElement");
/** @internal */
export const NoSuchElementException = /*#__PURE__*/makeException({
  [NoSuchElementExceptionTypeId]: NoSuchElementExceptionTypeId
}, "NoSuchElementException");
/** @internal */
export const isNoSuchElementException = u => {
  return typeof u === "object" && u != null && NoSuchElementExceptionTypeId in u;
};
/** @internal */
export const InvalidHubCapacityExceptionTypeId = /*#__PURE__*/Symbol.for("@effect/io/Cause/errors/InvalidHubCapacityException");
/** @internal */
export const InvalidHubCapacityException = /*#__PURE__*/makeException({
  [InvalidHubCapacityExceptionTypeId]: InvalidHubCapacityExceptionTypeId
}, "InvalidHubCapacityException");
/** @internal */
export const isInvalidCapacityError = u => {
  return typeof u === "object" && u != null && InvalidHubCapacityExceptionTypeId in u;
};
// -----------------------------------------------------------------------------
// Stack Annotations
// -----------------------------------------------------------------------------
/** @internal */
export const StackAnnotationTypeId = /*#__PURE__*/Symbol.for("@effect/io/Cause/StackAnnotation");
/** @internal */
export class StackAnnotation {
  constructor(stack, seq) {
    this.stack = stack;
    this.seq = seq;
    this[_a] = StackAnnotationTypeId;
  }
}
_a = StackAnnotationTypeId;
/** @internal */
export const globalErrorSeq = /*#__PURE__*/MRef.make(0);
/** @internal */
export const isStackAnnotation = u => {
  return typeof u === "object" && u != null && StackAnnotationTypeId in u;
};
/** @internal */
const UnAnnotateCauseReducer = () => ({
  emptyCase: () => empty,
  failCase: (_, error) => fail(error),
  dieCase: (_, defect) => die(defect),
  interruptCase: (_, fiberId) => interrupt(fiberId),
  annotatedCase: (_, cause, __) => cause,
  sequentialCase: (_, left, right) => sequential(left, right),
  parallelCase: (_, left, right) => parallel(left, right)
});
/** @internal */
export const unannotate = self => reduceWithContext(self, void 0, UnAnnotateCauseReducer());
//# sourceMappingURL=cause.mjs.map