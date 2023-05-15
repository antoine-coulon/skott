"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @since 2.0.0
 */
var Applicative_1 = require("./Applicative");
var Option_1 = require("./Option");
function getOptionM(M) {
    var A = Applicative_1.getApplicativeComposition(M, Option_1.option);
    var fnone = M.of(Option_1.none);
    return __assign(__assign({}, A), { chain: function (ma, f) {
            return M.chain(ma, Option_1.fold(function () { return fnone; }, f));
        }, alt: function (fx, fy) {
            return M.chain(fx, Option_1.fold(fy, function (a) { return M.of(Option_1.some(a)); }));
        }, fold: function (ma, onNone, onSome) { return M.chain(ma, Option_1.fold(onNone, onSome)); }, getOrElse: function (ma, onNone) { return M.chain(ma, Option_1.fold(onNone, M.of)); }, fromM: function (ma) { return M.map(ma, Option_1.some); }, none: function () { return fnone; } });
}
exports.getOptionM = getOptionM;
