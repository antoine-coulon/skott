import * as Chunk from "@effect/data/Chunk";
import * as Either from "@effect/data/Either";
import { constTrue, dual } from "@effect/data/Function";
import * as HashSet from "@effect/data/HashSet";
import * as Option from "@effect/data/Option";
import * as ConfigError from "@effect/io/Config/Error";
import * as configError from "@effect/io/internal_effect_untraced/configError";
import * as configSecret from "@effect/io/internal_effect_untraced/configSecret";
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/config";
/** @internal */
const ConfigSymbolKey = "@effect/io/Config";
/** @internal */
export const ConfigTypeId = /*#__PURE__*/Symbol.for(ConfigSymbolKey);
/** @internal */
const configVariance = {
  _A: _ => _
};
/** @internal */
const proto = {
  [ConfigTypeId]: configVariance
};
/** @internal */
export const bool = name => {
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
export const arrayOf = (config, name) => {
  return map(Chunk.toReadonlyArray)(chunkOf(config, name));
};
/** @internal */
export const chunkOf = (config, name) => {
  return name === undefined ? repeat(config) : nested(name)(repeat(config));
};
/** @internal */
export const date = name => {
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
export const defer = config => {
  const lazy = Object.create(proto);
  lazy._tag = OpCodes.OP_LAZY;
  lazy.config = config;
  return lazy;
};
/** @internal */
export const fail = message => {
  const fail = Object.create(proto);
  fail._tag = OpCodes.OP_FAIL;
  fail.message = message;
  fail.parse = () => Either.left(configError.Unsupported(Chunk.empty(), message));
  return fail;
};
/** @internal */
export const float = name => {
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
export const integer = name => {
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
export const map = /*#__PURE__*/dual(2, (self, f) => mapOrFail(self, a => Either.right(f(a))));
/** @internal */
export const mapAttempt = /*#__PURE__*/dual(2, (self, f) => mapOrFail(self, a => {
  try {
    return Either.right(f(a));
  } catch (error) {
    return Either.left(configError.InvalidData(Chunk.empty(), error instanceof Error ? error.message : `${error}`));
  }
}));
/** @internal */
export const mapOrFail = /*#__PURE__*/dual(2, (self, f) => {
  const mapOrFail = Object.create(proto);
  mapOrFail._tag = OpCodes.OP_MAP_OR_FAIL;
  mapOrFail.original = self;
  mapOrFail.mapOrFail = f;
  return mapOrFail;
});
/** @internal */
export const missingError = name => {
  return self => {
    return configError.MissingData(Chunk.empty(), `Expected ${self.description} with name ${name}`);
  };
};
/** @internal */
export const nested = /*#__PURE__*/dual(2, (self, name) => {
  const nested = Object.create(proto);
  nested._tag = OpCodes.OP_NESTED;
  nested.name = name;
  nested.config = self;
  return nested;
});
/** @internal */
export const orElse = /*#__PURE__*/dual(2, (self, that) => {
  const fallback = Object.create(proto);
  fallback._tag = OpCodes.OP_FALLBACK;
  fallback.first = self;
  fallback.second = defer(that);
  fallback.condition = constTrue;
  return fallback;
});
/** @internal */
export const orElseIf = /*#__PURE__*/dual(3, (self, that, condition) => {
  const fallback = Object.create(proto);
  fallback._tag = OpCodes.OP_FALLBACK;
  fallback.first = self;
  fallback.second = defer(that);
  fallback.condition = condition;
  return fallback;
});
/** @internal */
export const optional = self => {
  return orElseIf(() => succeed(Option.none()), ConfigError.isMissingDataOnly)(map(Option.some)(self));
};
/** @internal */
export const primitive = (description, parse) => {
  const primitive = Object.create(proto);
  primitive._tag = OpCodes.OP_PRIMITIVE;
  primitive.description = description;
  primitive.parse = parse;
  return primitive;
};
/** @internal */
export const repeat = self => {
  const repeat = Object.create(proto);
  repeat._tag = OpCodes.OP_SEQUENCE;
  repeat.config = self;
  return repeat;
};
/** @internal */
export const secret = name => {
  const config = primitive("a secret property", text => Either.right(configSecret.fromString(text)));
  return name === undefined ? config : nested(name)(config);
};
/** @internal */
export const setOf = (config, name) => {
  const newConfig = map(chunkOf(config), HashSet.fromIterable);
  return name === undefined ? newConfig : nested(name)(newConfig);
};
/** @internal */
export const string = name => {
  const config = primitive("a text property", Either.right);
  return name === undefined ? config : nested(name)(config);
};
export const all = function () {
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
export const succeed = value => {
  const constant = Object.create(proto);
  constant._tag = OpCodes.OP_CONSTANT;
  constant.value = value;
  constant.parse = () => Either.right(value);
  return constant;
};
/** @internal */
export const sync = value => {
  return defer(() => succeed(value()));
};
/** @internal */
export const table = (config, name) => {
  const table = Object.create(proto);
  table._tag = OpCodes.OP_TABLE;
  table.valueConfig = config;
  return name === undefined ? table : nested(name)(table);
};
/** @internal */
export const isConfig = u => typeof u === "object" && u != null && ConfigTypeId in u;
/** @internal */
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
export const unwrap = wrapped => {
  if (isConfig(wrapped)) {
    return wrapped;
  }
  return struct(Object.fromEntries(Object.entries(wrapped).map(([k, a]) => [k, unwrap(a)])));
};
/** @internal */
export const validate = /*#__PURE__*/dual(3, (self, message, f) => mapOrFail(self, a => {
  if (f(a)) {
    return Either.right(a);
  }
  return Either.left(configError.InvalidData(Chunk.empty(), message));
}));
/** @internal */
export const withDefault = /*#__PURE__*/dual(2, (self, def) => orElseIf(self, () => succeed(def), ConfigError.isMissingDataOnly));
/** @internal */
export const withDescription = /*#__PURE__*/dual(2, (self, description) => {
  const described = Object.create(proto);
  described._tag = OpCodes.OP_DESCRIBED;
  described.config = self;
  described.description = description;
  return described;
});
/** @internal */
export const zip = /*#__PURE__*/dual(2, (self, that) => zipWith(self, that, (a, b) => [a, b]));
/** @internal */
export const zipWith = /*#__PURE__*/dual(3, (self, that, f) => {
  const zipWith = Object.create(proto);
  zipWith._tag = OpCodes.OP_ZIP_WITH;
  zipWith.left = self;
  zipWith.right = that;
  zipWith.zip = f;
  return zipWith;
});
//# sourceMappingURL=config.mjs.map