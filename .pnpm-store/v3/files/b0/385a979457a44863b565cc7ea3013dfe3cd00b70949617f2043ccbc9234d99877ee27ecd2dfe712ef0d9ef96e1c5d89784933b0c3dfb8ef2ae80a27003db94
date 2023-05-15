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
var Either_1 = require("./Either");
function getEitherM(M) {
    var A = Applicative_1.getApplicativeComposition(M, Either_1.either);
    return __assign(__assign({}, A), { chain: function (ma, f) { return M.chain(ma, function (e) { return (Either_1.isLeft(e) ? M.of(Either_1.left(e.left)) : f(e.right)); }); }, alt: function (fx, f) { return M.chain(fx, function (e) { return (Either_1.isLeft(e) ? f() : A.of(e.right)); }); }, bimap: function (ma, f, g) { return M.map(ma, function (e) { return Either_1.either.bimap(e, f, g); }); }, mapLeft: function (ma, f) { return M.map(ma, function (e) { return Either_1.either.mapLeft(e, f); }); }, fold: function (ma, onLeft, onRight) { return M.chain(ma, Either_1.fold(onLeft, onRight)); }, getOrElse: function (ma, onLeft) { return M.chain(ma, Either_1.fold(onLeft, M.of)); }, orElse: function (ma, f) {
            return M.chain(ma, Either_1.fold(f, function (a) { return A.of(a); }));
        }, swap: function (ma) { return M.map(ma, Either_1.swap); }, rightM: function (ma) { return M.map(ma, Either_1.right); }, leftM: function (ml) { return M.map(ml, Either_1.left); }, left: function (e) { return M.of(Either_1.left(e)); } });
}
exports.getEitherM = getEitherM;
