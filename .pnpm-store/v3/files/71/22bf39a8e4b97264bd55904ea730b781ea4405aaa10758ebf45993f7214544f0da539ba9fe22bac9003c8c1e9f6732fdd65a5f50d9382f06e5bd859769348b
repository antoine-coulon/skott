"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
function sign(n) {
    return n <= -1 ? -1 : n >= 1 ? 1 : 0;
}
exports.sign = sign;
/**
 * @since 2.0.0
 */
exports.eqOrdering = {
    equals: function (x, y) { return x === y; }
};
/**
 * Use `monoidOrdering` instead
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupOrdering = {
    concat: function (x, y) { return (x !== 0 ? x : y); }
};
/**
 * @since 2.4.0
 */
exports.monoidOrdering = {
    // tslint:disable-next-line: deprecation
    concat: exports.semigroupOrdering.concat,
    empty: 0
};
/**
 * @since 2.0.0
 */
function invert(O) {
    switch (O) {
        case -1:
            return 1;
        case 1:
            return -1;
        default:
            return 0;
    }
}
exports.invert = invert;
