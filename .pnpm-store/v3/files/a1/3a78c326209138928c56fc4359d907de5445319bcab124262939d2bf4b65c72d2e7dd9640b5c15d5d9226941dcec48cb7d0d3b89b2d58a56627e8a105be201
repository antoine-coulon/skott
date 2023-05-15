"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeGet = exports.pick = exports.merge = exports.make = exports.isTag = exports.isContext = exports.getOption = exports.get = exports.empty = exports.add = exports.Tag = void 0;
var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/internal/Context"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const TagTypeId = C.TagTypeId;
/**
 * Creates a new `Tag` instance with an optional key parameter.
 *
 * Specifying the `key` will make the `Tag` global, meaning two tags with the same
 * key will map to the same instance.
 *
 * Note: this is useful for cases where live reload can happen and it is
 * desireable to preserve the instance across reloads.
 *
 * @param key - An optional key that makes the `Tag` global.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 *
 * assert.strictEqual(Context.Tag() === Context.Tag(), false)
 * assert.strictEqual(Context.Tag("PORT") === Context.Tag("PORT"), true)
 *
 * @since 1.0.0
 * @category constructors
 */
const Tag = key => new C.TagImpl(key);
exports.Tag = Tag;
const TypeId = C.ContextTypeId;
/**
 * Checks if the provided argument is a `Context`.
 *
 * @param input - The value to be checked if it is a `Context`.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 *
 * assert.strictEqual(Context.isContext(Context.empty()), true)
 *
 * @since 1.0.0
 * @category guards
 */
const isContext = C.isContext;
/**
 * Checks if the provided argument is a `Tag`.
 *
 * @param input - The value to be checked if it is a `Tag`.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 *
 * assert.strictEqual(Context.isTag(Context.Tag()), true)
 *
 * @since 1.0.0
 * @category guards
 */
exports.isContext = isContext;
const isTag = C.isTag;
/**
 * Returns an empty `Context`.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 *
 * assert.strictEqual(Context.isContext(Context.empty()), true)
 *
 * @since 1.0.0
 * @category constructors
 */
exports.isTag = isTag;
const empty = C.empty;
/**
 * Creates a new `Context` with a single service associated to the tag.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 *
 * const Port = Context.Tag<{ PORT: number }>()
 *
 * const Services = Context.make(Port, { PORT: 8080 })
 *
 * assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
 *
 * @since 1.0.0
 * @category constructors
 */
exports.empty = empty;
const make = C.make;
/**
 * Adds a service to a given `Context`.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 * import { pipe } from "@effect/data/Function"
 *
 * const Port = Context.Tag<{ PORT: number }>()
 * const Timeout = Context.Tag<{ TIMEOUT: number }>()
 *
 * const someContext = Context.make(Port, { PORT: 8080 })
 *
 * const Services = pipe(
 *   someContext,
 *   Context.add(Timeout, { TIMEOUT: 5000 })
 * )
 *
 * assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
 * assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
 *
 * @since 1.0.0
 * @category mutations
 */
exports.make = make;
const add = C.add;
/**
 * Get a service from the context that corresponds to the given tag.
 *
 * @param self - The `Context` to search for the service.
 * @param tag - The `Tag` of the service to retrieve.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 * import { pipe } from "@effect/data/Function"
 *
 * const Port = Context.Tag<{ PORT: number }>()
 * const Timeout = Context.Tag<{ TIMEOUT: number }>()
 *
 * const Services = pipe(
 *   Context.make(Port, { PORT: 8080 }),
 *   Context.add(Timeout, { TIMEOUT: 5000 })
 * )
 *
 * assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
 *
 * @since 1.0.0
 * @category getters
 */
exports.add = add;
const get = C.get;
/**
 * Get a service from the context that corresponds to the given tag.
 * This function is unsafe because if the tag is not present in the context, a runtime error will be thrown.
 *
 * For a safer version see {@link getOption}.
 *
 * @param self - The `Context` to search for the service.
 * @param tag - The `Tag` of the service to retrieve.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 *
 * const Port = Context.Tag<{ PORT: number }>()
 * const Timeout = Context.Tag<{ TIMEOUT: number }>()
 *
 * const Services = Context.make(Port, { PORT: 8080 })
 *
 * assert.deepStrictEqual(Context.unsafeGet(Services, Port), { PORT: 8080 })
 * assert.throws(() => Context.unsafeGet(Services, Timeout))
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.get = get;
const unsafeGet = C.unsafeGet;
/**
 * Get the value associated with the specified tag from the context wrapped in an `Option` object. If the tag is not
 * found, the `Option` object will be `None`.
 *
 * @param self - The `Context` to search for the service.
 * @param tag - The `Tag` of the service to retrieve.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 * import * as O from "@effect/data/Option"
 *
 * const Port = Context.Tag<{ PORT: number }>()
 * const Timeout = Context.Tag<{ TIMEOUT: number }>()
 *
 * const Services = Context.make(Port, { PORT: 8080 })
 *
 * assert.deepStrictEqual(Context.getOption(Services, Port), O.some({ PORT: 8080 }))
 * assert.deepStrictEqual(Context.getOption(Services, Timeout), O.none())
 *
 * @since 1.0.0
 * @category getters
 */
exports.unsafeGet = unsafeGet;
const getOption = C.getOption;
/**
 * Merges two `Context`s, returning a new `Context` containing the services of both.
 *
 * @param self - The first `Context` to merge.
 * @param that - The second `Context` to merge.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 *
 * const Port = Context.Tag<{ PORT: number }>()
 * const Timeout = Context.Tag<{ TIMEOUT: number }>()
 *
 * const firstContext = Context.make(Port, { PORT: 8080 })
 * const secondContext = Context.make(Timeout, { TIMEOUT: 5000 })
 *
 * const Services = Context.merge(firstContext, secondContext)
 *
 * assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
 * assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
 *
 * @since 1.0.0
 * @category mutations
 */
exports.getOption = getOption;
const merge = C.merge;
/**
 * Returns a new `Context` that contains only the specified services.
 *
 * @param self - The `Context` to prune services from.
 * @param tags - The list of `Tag`s to be included in the new `Context`.
 *
 * @example
 * import * as Context from "@effect/data/Context"
 * import { pipe } from "@effect/data/Function"
 * import * as O from "@effect/data/Option"
 *
 * const Port = Context.Tag<{ PORT: number }>()
 * const Timeout = Context.Tag<{ TIMEOUT: number }>()
 *
 * const someContext = pipe(
 *   Context.make(Port, { PORT: 8080 }),
 *   Context.add(Timeout, { TIMEOUT: 5000 })
 * )
 *
 * const Services = pipe(someContext, Context.pick(Port))
 *
 * assert.deepStrictEqual(Context.getOption(Services, Port), O.some({ PORT: 8080 }))
 * assert.deepStrictEqual(Context.getOption(Services, Timeout), O.none())
 *
 * @since 1.0.0
 * @category mutations
 */
exports.merge = merge;
const pick = C.pick;
exports.pick = pick;
//# sourceMappingURL=Context.js.map