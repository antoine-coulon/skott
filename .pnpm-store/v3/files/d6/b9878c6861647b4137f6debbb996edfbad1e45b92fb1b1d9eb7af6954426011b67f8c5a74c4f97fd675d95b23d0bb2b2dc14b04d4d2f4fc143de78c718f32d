"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = exports.zip = exports.withDescription = exports.withDefault = exports.validate = exports.unwrap = exports.table = exports.sync = exports.succeed = exports.string = exports.setOf = exports.secret = exports.repeat = exports.primitive = exports.orElseIf = exports.orElse = exports.optional = exports.nested = exports.missingError = exports.mapOrFail = exports.mapAttempt = exports.map = exports.isConfig = exports.integer = exports.float = exports.fail = exports.defer = exports.date = exports.chunkOf = exports.bool = exports.arrayOf = exports.all = exports.ConfigTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var ConfigError = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Config/Error"));
var configError = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/configError"));
var configSecret = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/configSecret"));
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/config"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ConfigSymbolKey = "@effect/io/Config";
/** @internal */
const ConfigTypeId = /*#__PURE__*/Symbol.for(ConfigSymbolKey);
/** @internal */
exports.ConfigTypeId = ConfigTypeId;
const configVariance = {
  _A: _ => _
};
/** @internal */
const proto = {
  [ConfigTypeId]: configVariance
};
/** @internal */
const bool = name => {
  const config = primitive("a boolean property", text => {
    switch (text) {
      case "true":
      case "yes":
      case "on":
      case "1":
        {
          return Either.right(true);
        }
      case "false":
      case "no":
      case "off":
      case "0":
        {
          return Either.right(false);
        }
      default:
        {
          const error = configError.InvalidData(Chunk.empty(), `Expected a boolean value, but received ${text}`);
          return Either.left(error);
        }
    }
  });
  return name === undefined ? config : nested(name)(config);
};
/** @internal */
exports.bool = bool;
const arrayOf = (config, name) => {
  return map(Chunk.toReadonlyArray)(chunkOf(config, name));
};
/** @internal */
exports.arrayOf = arrayOf;
const chunkOf = (config, name) => {
  return name === undefined ? repeat(config) : nested(name)(repeat(config));
};
/** @internal */
exports.chunkOf = chunkOf;
const date = name => {
  const config = primitive("a date property", text => {
    const result = Date.parse(text);
    if (Number.isNaN(result)) {
      return Either.left(configError.InvalidData(Chunk.empty(), `Expected a date value but received ${text}`));
    }
    return Either.right(new Date(result));
  });
  return name === undefined ? config : nested(name)(config);
};
/** @internal */
exports.date = date;
const defer = config => {
  const lazy = Object.create(proto);
  lazy._tag = OpCodes.OP_LAZY;
  lazy.config = config;
  return lazy;
};
/** @internal */
exports.defer = defer;
const fail = message => {
  const fail = Object.create(proto);
  fail._tag = OpCodes.OP_FAIL;
  fail.message = message;
  fail.parse = () => Either.left(configError.Unsupported(Chunk.empty(), message));
  return fail;
};
/** @internal */
exports.fail = fail;
const float = name => {
  const config = primitive("a float property", text => {
    const result = Number.parseFloat(text);
    if (Number.isNaN(result)) {
      return Either.left(configError.InvalidData(Chunk.empty(), `Expected an float value but received ${text}`));
    }
    return Either.right(result);
  });
  return name === undefined ? config : nested(name)(config);
};
/** @internal */
exports.float = float;
const integer = name => {
  const config = primitive("an integer property", text => {
    const result = Number.parseInt(text, 10);
    if (Number.isNaN(result)) {
      return Either.left(configError.InvalidData(Chunk.empty(), `Expected an integer value but received ${text}`));
    }
    return Either.right(result);
  });
  return name === undefined ? config : nested(name)(config);
};
/** @internal */
exports.integer = integer;
const map = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => mapOrFail(self, a => Either.right(f(a))));
/** @internal */
exports.map = map;
const mapAttempt = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => mapOrFail(self, a => {
  try {
    return Either.right(f(a));
  } catch (error) {
    return Either.left(configError.InvalidData(Chunk.empty(), error instanceof Error ? error.message : `${error}`));
  }
}));
/** @internal */
exports.mapAttempt = mapAttempt;
const mapOrFail = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
  const mapOrFail = Object.create(proto);
  mapOrFail._tag = OpCodes.OP_MAP_OR_FAIL;
  mapOrFail.original = self;
  mapOrFail.mapOrFail = f;
  return mapOrFail;
});
/** @internal */
exports.mapOrFail = mapOrFail;
const missingError = name => {
  return self => {
    return configError.MissingData(Chunk.empty(), `Expected ${self.description} with name ${name}`);
  };
};
/** @internal */
exports.missingError = missingError;
const nested = /*#__PURE__*/(0, _Function.dual)(2, (self, name) => {
  const nested = Object.create(proto);
  nested._tag = OpCodes.OP_NESTED;
  nested.name = name;
  nested.config = self;
  return nested;
});
/** @internal */
exports.nested = nested;
const orElse = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => {
  const fallback = Object.create(proto);
  fallback._tag = OpCodes.OP_FALLBACK;
  fallback.first = self;
  fallback.second = defer(that);
  fallback.condition = _Function.constTrue;
  return fallback;
});
/** @internal */
exports.orElse = orElse;
const orElseIf = /*#__PURE__*/(0, _Function.dual)(3, (self, that, condition) => {
  const fallback = Object.create(proto);
  fallback._tag = OpCodes.OP_FALLBACK;
  fallback.first = self;
  fallback.second = defer(that);
  fallback.condition = condition;
  return fallback;
});
/** @internal */
exports.orElseIf = orElseIf;
const optional = self => {
  return orElseIf(() => succeed(Option.none()), ConfigError.isMissingDataOnly)(map(Option.some)(self));
};
/** @internal */
exports.optional = optional;
const primitive = (description, parse) => {
  const primitive = Object.create(proto);
  primitive._tag = OpCodes.OP_PRIMITIVE;
  primitive.description = description;
  primitive.parse = parse;
  return primitive;
};
/** @internal */
exports.primitive = primitive;
const repeat = self => {
  const repeat = Object.create(proto);
  repeat._tag = OpCodes.OP_SEQUENCE;
  repeat.config = self;
  return repeat;
};
/** @internal */
exports.repeat = repeat;
const secret = name => {
  const config = primitive("a secret property", text => Either.right(configSecret.fromString(text)));
  return name === undefined ? config : nested(name)(config);
};
/** @internal */
exports.secret = secret;
const setOf = (config, name) => {
  const newConfig = map(chunkOf(config), HashSet.fromIterable);
  return name === undefined ? newConfig : nested(name)(newConfig);
};
/** @internal */
exports.setOf = setOf;
const string = name => {
  const config = primitive("a text property", Either.right);
  return name === undefined ? config : nested(name)(config);
};
exports.string = string;
const all = function () {
  if (arguments.length === 1) {
    if (typeof arguments[0] === "object" && arguments[0] !== null && isConfig(arguments[0])) {
      return map(arguments[0], x => [x]);
    } else if (Array.isArray(arguments[0])) {
      return tuple(arguments);
    } else {
      return struct(arguments[0]);
    }
  }
  return tuple(arguments);
};
exports.all = all;
const struct = r => {
  const entries = Object.entries(r);
  let result = map(value => ({
    [entries[0][0]]: value
  }))(entries[0][1]);
  if (entries.length === 1) {
    return result;
  }
  const rest = entries.slice(1);
  for (const [key, config] of rest) {
    result = zipWith(config, (record, value) => ({
      ...record,
      [key]: value
    }))(result);
  }
  return result;
};
/** @internal */
const succeed = value => {
  const constant = Object.create(proto);
  constant._tag = OpCodes.OP_CONSTANT;
  constant.value = value;
  constant.parse = () => Either.right(value);
  return constant;
};
/** @internal */
exports.succeed = succeed;
const sync = value => {
  return defer(() => succeed(value()));
};
/** @internal */
exports.sync = sync;
const table = (config, name) => {
  const table = Object.create(proto);
  table._tag = OpCodes.OP_TABLE;
  table.valueConfig = config;
  return name === undefined ? table : nested(name)(table);
};
/** @internal */
exports.table = table;
const isConfig = u => typeof u === "object" && u != null && ConfigTypeId in u;
/** @internal */
exports.isConfig = isConfig;
const tuple = tuple => {
  if (tuple.length === 0) {
    return succeed([]);
  }
  if (tuple.length === 1) {
    return map(tuple[0], x => [x]);
  }
  let result = map(tuple[0], x => [x]);
  for (let i = 1; i < tuple.length; i++) {
    const config = tuple[i];
    result = zipWith(config, (tuple, value) => [...tuple, value])(result);
  }
  return result;
};
/**
 * @internal
 */
const unwrap = wrapped => {
  if (isConfig(wrapped)) {
    return wrapped;
  }
  return struct(Object.fromEntries(Object.entries(wrapped).map(([k, a]) => [k, unwrap(a)])));
};
/** @internal */
exports.unwrap = unwrap;
const validate = /*#__PURE__*/(0, _Function.dual)(3, (self, message, f) => mapOrFail(self, a => {
  if (f(a)) {
    return Either.right(a);
  }
  return Either.left(configError.InvalidData(Chunk.empty(), message));
}));
/** @internal */
exports.validate = validate;
const withDefault = /*#__PURE__*/(0, _Function.dual)(2, (self, def) => orElseIf(self, () => succeed(def), ConfigError.isMissingDataOnly));
/** @internal */
exports.withDefault = withDefault;
const withDescription = /*#__PURE__*/(0, _Function.dual)(2, (self, description) => {
  const described = Object.create(proto);
  described._tag = OpCodes.OP_DESCRIBED;
  described.config = self;
  described.description = description;
  return described;
});
/** @internal */
exports.withDescription = withDescription;
const zip = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => zipWith(self, that, (a, b) => [a, b]));
/** @internal */
exports.zip = zip;
const zipWith = /*#__PURE__*/(0, _Function.dual)(3, (self, that, f) => {
  const zipWith = Object.create(proto);
  zipWith._tag = OpCodes.OP_ZIP_WITH;
  zipWith.left = self;
  zipWith.right = that;
  zipWith.zip = f;
  return zipWith;
});
exports.zipWith = zipWith;
//# sourceMappingURL=config.js.map