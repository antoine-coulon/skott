import { pipeable } from './pipeable';
/**
 * @since 2.0.0
 */
export var URI = 'Store';
/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
export function seek(s) {
    return function (wa) { return ({ peek: wa.peek, pos: s }); };
}
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
export function seeks(f) {
    return function (wa) { return ({ peek: wa.peek, pos: f(wa.pos) }); };
}
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
export function peeks(f) {
    return function (wa) { return wa.peek(f(wa.pos)); };
}
export function experiment(F) {
    return function (f) { return function (wa) { return F.map(f(wa.pos), function (s) { return wa.peek(s); }); }; };
}
/**
 * @since 2.0.0
 */
export var store = {
    URI: URI,
    map: function (wa, f) { return ({
        peek: function (s) { return f(wa.peek(s)); },
        pos: wa.pos
    }); },
    extract: function (wa) { return wa.peek(wa.pos); },
    extend: function (wa, f) { return ({
        peek: function (s) { return f({ peek: wa.peek, pos: s }); },
        pos: wa.pos
    }); }
};
var _a = pipeable(store), duplicate = _a.duplicate, extend = _a.extend, map = _a.map;
export { 
/**
 * @since 2.0.0
 */
duplicate, 
/**
 * @since 2.0.0
 */
extend, 
/**
 * @since 2.0.0
 */
map };
