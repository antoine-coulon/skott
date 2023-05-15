"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeTrack = exports.track = exports.none = exports.fromEffect = exports.fibersIn = exports.addSupervisor = exports.SupervisorTypeId = void 0;
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer/circular"));
var internal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/supervisor"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const SupervisorTypeId = internal.SupervisorTypeId;
/**
 * @since 1.0.0
 * @category context
 */
exports.SupervisorTypeId = SupervisorTypeId;
const addSupervisor = circular.addSupervisor;
/**
 * Creates a new supervisor that tracks children in a set.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.addSupervisor = addSupervisor;
const fibersIn = internal.fibersIn;
/**
 * Creates a new supervisor that constantly yields effect when polled
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fibersIn = fibersIn;
const fromEffect = internal.fromEffect;
/**
 * A supervisor that doesn't do anything in response to supervision events.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.fromEffect = fromEffect;
const none = internal.none;
/**
 * Creates a new supervisor that tracks children in a set.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.none = none;
const track = internal.track;
/**
 * Unsafely creates a new supervisor that tracks children in a set.
 *
 * @since 1.0.0
 * @category unsafe
 */
exports.track = track;
const unsafeTrack = internal.unsafeTrack;
exports.unsafeTrack = unsafeTrack;
//# sourceMappingURL=Supervisor.js.map