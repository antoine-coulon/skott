import { pipeable } from './pipeable';
/**
 * @since 2.0.0
 */
export var URI = 'Traced';
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export function tracks(M, f) {
    return function (wa) { return wa(f(wa(M.empty))); };
}
// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export function listen(wa) {
    return function (e) { return [wa(e), e]; };
}
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export function listens(f) {
    return function (wa) { return function (e) { return [wa(e), f(e)]; }; };
}
// tslint:enable:readonly-array
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export function censor(f) {
    return function (wa) { return function (e) { return wa(f(e)); }; };
}
/**
 * @since 2.0.0
 */
export function getComonad(monoid) {
    function extend(wa, f) {
        return function (p1) { return f(function (p2) { return wa(monoid.concat(p1, p2)); }); };
    }
    function extract(wa) {
        return wa(monoid.empty);
    }
    return {
        URI: URI,
        _E: undefined,
        map: traced.map,
        extend: extend,
        extract: extract
    };
}
/**
 * @since 2.0.0
 */
export var traced = {
    URI: URI,
    map: function (wa, f) { return function (p) { return f(wa(p)); }; }
};
var map = pipeable(traced).map;
export { 
/**
 * @since 2.0.0
 */
map };
