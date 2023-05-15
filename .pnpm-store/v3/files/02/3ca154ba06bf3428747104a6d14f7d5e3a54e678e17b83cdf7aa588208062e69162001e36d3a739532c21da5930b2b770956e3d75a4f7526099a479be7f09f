"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceWithContext = exports.proto = exports.prefixed = exports.isUnsupported = exports.isSourceUnavailable = exports.isOr = exports.isMissingDataOnly = exports.isMissingData = exports.isInvalidData = exports.isConfigError = exports.isAnd = exports.Unsupported = exports.SourceUnavailable = exports.Or = exports.MissingData = exports.InvalidData = exports.ConfigErrorTypeId = exports.And = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/configError"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ConfigErrorSymbolKey = "@effect/io/Config/Error";
/** @internal */
const ConfigErrorTypeId = /*#__PURE__*/Symbol.for(ConfigErrorSymbolKey);
/** @internal */
exports.ConfigErrorTypeId = ConfigErrorTypeId;
const proto = {
  [ConfigErrorTypeId]: ConfigErrorTypeId
};
/** @internal */
exports.proto = proto;
const And = (self, that) => {
  const error = Object.create(proto);
  error._tag = OpCodes.OP_AND;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} and ${this.right}`;
    }
  });
  return error;
};
/** @internal */
exports.And = And;
const Or = (self, that) => {
  const error = Object.create(proto);
  error._tag = OpCodes.OP_OR;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} or ${this.right}`;
    }
  });
  return error;
};
/** @internal */
exports.Or = Or;
const InvalidData = (path, message) => {
  const error = Object.create(proto);
  error._tag = OpCodes.OP_INVALID_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path = Chunk.join(".")(this.path);
      return `(Invalid data at ${path}: "${this.message}")`;
    }
  });
  return error;
};
/** @internal */
exports.InvalidData = InvalidData;
const MissingData = (path, message) => {
  const error = Object.create(proto);
  error._tag = OpCodes.OP_MISSING_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path = Chunk.join(".")(this.path);
      return `(Missing data at ${path}: "${this.message}")`;
    }
  });
  return error;
};
/** @internal */
exports.MissingData = MissingData;
const SourceUnavailable = (path, message, cause) => {
  const error = Object.create(proto);
  error._tag = OpCodes.OP_SOURCE_UNAVAILABLE;
  error.path = path;
  error.message = message;
  error.cause = cause;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path = Chunk.join(".")(this.path);
      return `(Source unavailable at ${path}: "${this.message}")`;
    }
  });
  return error;
};
/** @internal */
exports.SourceUnavailable = SourceUnavailable;
const Unsupported = (path, message) => {
  const error = Object.create(proto);
  error._tag = OpCodes.OP_UNSUPPORTED;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path = Chunk.join(".")(this.path);
      return `(Unsupported operation at ${path}: "${this.message}")`;
    }
  });
  return error;
};
/** @internal */
exports.Unsupported = Unsupported;
const isConfigError = u => typeof u === "object" && u != null && ConfigErrorTypeId in u;
/** @internal */
exports.isConfigError = isConfigError;
const isAnd = self => self._tag === OpCodes.OP_AND;
/** @internal */
exports.isAnd = isAnd;
const isOr = self => self._tag === OpCodes.OP_OR;
/** @internal */
exports.isOr = isOr;
const isInvalidData = self => self._tag === OpCodes.OP_INVALID_DATA;
/** @internal */
exports.isInvalidData = isInvalidData;
const isMissingData = self => self._tag === OpCodes.OP_MISSING_DATA;
/** @internal */
exports.isMissingData = isMissingData;
const isSourceUnavailable = self => self._tag === OpCodes.OP_SOURCE_UNAVAILABLE;
/** @internal */
exports.isSourceUnavailable = isSourceUnavailable;
const isUnsupported = self => self._tag === OpCodes.OP_UNSUPPORTED;
/** @internal */
exports.isUnsupported = isUnsupported;
const prefixed = /*#__PURE__*/(0, _Function.dual)(2, (self, prefix) => {
  switch (self._tag) {
    case OpCodes.OP_AND:
      {
        return And(prefixed(prefix)(self.left), prefixed(prefix)(self.right));
      }
    case OpCodes.OP_OR:
      {
        return Or(prefixed(prefix)(self.left), prefixed(prefix)(self.right));
      }
    case OpCodes.OP_INVALID_DATA:
      {
        return InvalidData(Chunk.concat(self.path)(prefix), self.message);
      }
    case OpCodes.OP_MISSING_DATA:
      {
        return MissingData(Chunk.concat(self.path)(prefix), self.message);
      }
    case OpCodes.OP_SOURCE_UNAVAILABLE:
      {
        return SourceUnavailable(Chunk.concat(self.path)(prefix), self.message, self.cause);
      }
    case OpCodes.OP_UNSUPPORTED:
      {
        return Unsupported(Chunk.concat(self.path)(prefix), self.message);
      }
  }
});
/** @internal */
exports.prefixed = prefixed;
const IsMissingDataOnlyReducer = {
  andCase: (_, left, right) => left && right,
  orCase: (_, left, right) => left || right,
  invalidDataCase: _Function.constFalse,
  missingDataCase: _Function.constTrue,
  sourceUnavailableCase: _Function.constFalse,
  unsupportedCase: _Function.constFalse
};
/** @internal */
const reduceWithContext = /*#__PURE__*/(0, _Function.dual)(3, (self, context, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const error = input.pop();
    switch (error._tag) {
      case OpCodes.OP_AND:
        {
          input.push(error.right);
          input.push(error.left);
          output.push(Either.left({
            _tag: "AndCase"
          }));
          break;
        }
      case OpCodes.OP_OR:
        {
          input.push(error.right);
          input.push(error.left);
          output.push(Either.left({
            _tag: "OrCase"
          }));
          break;
        }
      case OpCodes.OP_INVALID_DATA:
        {
          output.push(Either.right(reducer.invalidDataCase(context, error.path, error.message)));
          break;
        }
      case OpCodes.OP_MISSING_DATA:
        {
          output.push(Either.right(reducer.missingDataCase(context, error.path, error.message)));
          break;
        }
      case OpCodes.OP_SOURCE_UNAVAILABLE:
        {
          output.push(Either.right(reducer.sourceUnavailableCase(context, error.path, error.message, error.cause)));
          break;
        }
      case OpCodes.OP_UNSUPPORTED:
        {
          output.push(Either.right(reducer.unsupportedCase(context, error.path, error.message)));
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
            case "AndCase":
              {
                const left = accumulator.pop();
                const right = accumulator.pop();
                const value = reducer.andCase(context, left, right);
                accumulator.push(value);
                break;
              }
            case "OrCase":
              {
                const left = accumulator.pop();
                const right = accumulator.pop();
                const value = reducer.orCase(context, left, right);
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
    throw new Error("BUG: ConfigError.reduceWithContext - please report an issue at https://github.com/Effect-TS/io/issues");
  }
  return accumulator.pop();
});
/** @internal */
exports.reduceWithContext = reduceWithContext;
const isMissingDataOnly = self => reduceWithContext(self, void 0, IsMissingDataOnlyReducer);
exports.isMissingDataOnly = isMissingDataOnly;
//# sourceMappingURL=configError.js.map