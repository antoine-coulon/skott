"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tag = exports.reloadFork = exports.reload = exports.manual = exports.get = exports.autoFromConfig = exports.auto = exports.ReloadableTypeId = void 0;
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/reloadable"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const ReloadableTypeId = internal.ReloadableTypeId;
/**
 * Makes a new reloadable service from a layer that describes the construction
 * of a static service. The service is automatically reloaded according to the
 * provided schedule.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.ReloadableTypeId = ReloadableTypeId;
const auto = internal.auto;
/**
 * Makes a new reloadable service from a layer that describes the construction
 * of a static service. The service is automatically reloaded according to a
 * schedule, which is extracted from the input to the layer.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.auto = auto;
const autoFromConfig = internal.autoFromConfig;
/**
 * Retrieves the current version of the reloadable service.
 *
 * @since 1.0.0
 * @category getters
 */
exports.autoFromConfig = autoFromConfig;
const get = internal.get;
/**
 * Makes a new reloadable service from a layer that describes the construction
 * of a static service.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.get = get;
const manual = internal.manual;
/**
 * Reloads the specified service.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.manual = manual;
const reload = internal.reload;
/**
 * @since 1.0.0
 * @category context
 */
exports.reload = reload;
const tag = internal.reloadableTag;
/**
 * Forks the reload of the service in the background, ignoring any errors.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.tag = tag;
const reloadFork = internal.reloadFork;
exports.reloadFork = reloadFork;
//# sourceMappingURL=Reloadable.js.map