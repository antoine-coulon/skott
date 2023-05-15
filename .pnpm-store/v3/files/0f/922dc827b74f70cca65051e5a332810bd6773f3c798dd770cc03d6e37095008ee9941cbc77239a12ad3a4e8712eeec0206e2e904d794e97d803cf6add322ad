"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeable_1 = require("./pipeable");
/**
 * @since 2.0.0
 */
exports.URI = 'Traced';
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
function tracks(M, f) {
    return function (wa) { return wa(f(wa(M.empty))); };
}
exports.tracks = tracks;
// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
function listen(wa) {
    return function (e) { return [wa(e), e]; };
}
exports.listen = listen;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
function listens(f) {
    return function (wa) { return function (e) { return [wa(e), f(e)]; }; };
}
exports.listens = listens;
// tslint:enable:readonly-array
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
function censor(f) {
    return function (wa) { return function (e) { return wa(f(e)); }; };
}
exports.censor = censor;
/**
 * @since 2.0.0
 */
function getComonad(monoid) {
    function extend(wa, f) {
        return function (p1) { return f(function (p2) { return wa(monoid.concat(p1, p2)); }); };
    }
    function extract(wa) {
        return wa(monoid.empty);
    }
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.traced.map,
        extend: extend,
        extract: extract
    };
}
exports.getComonad = getComonad;
/**
 * @since 2.0.0
 */
exports.traced = {
    URI: exports.URI,
    map: function (wa, f) { return function (p) { return f(wa(p)); }; }
};
var map = pipeable_1.pipeable(exports.traced).map;
exports.map = map;
