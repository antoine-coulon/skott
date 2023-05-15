"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
exports.booleanAlgebraBoolean = {
    meet: function (x, y) { return x && y; },
    join: function (x, y) { return x || y; },
    zero: false,
    one: true,
    implies: function (x, y) { return !x || y; },
    not: function (x) { return !x; }
};
/**
 * @since 2.0.0
 */
exports.booleanAlgebraVoid = {
    meet: function () { return undefined; },
    join: function () { return undefined; },
    zero: undefined,
    one: undefined,
    implies: function () { return undefined; },
    not: function () { return undefined; }
};
/**
 * @since 2.0.0
 */
function getFunctionBooleanAlgebra(B) {
    return function () { return ({
        meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
        join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
        zero: function () { return B.zero; },
        one: function () { return B.one; },
        implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
        not: function (x) { return function (a) { return B.not(x(a)); }; }
    }); };
}
exports.getFunctionBooleanAlgebra = getFunctionBooleanAlgebra;
/**
 * Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.
 *
 * @since 2.0.0
 */
function getDualBooleanAlgebra(B) {
    return {
        meet: function (x, y) { return B.join(x, y); },
        join: function (x, y) { return B.meet(x, y); },
        zero: B.one,
        one: B.zero,
        implies: function (x, y) { return B.join(B.not(x), y); },
        not: B.not
    };
}
exports.getDualBooleanAlgebra = getDualBooleanAlgebra;
