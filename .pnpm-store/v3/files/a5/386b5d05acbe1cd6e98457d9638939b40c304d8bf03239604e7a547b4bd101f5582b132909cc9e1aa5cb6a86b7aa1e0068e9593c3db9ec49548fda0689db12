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
/**
 * @since 2.0.0
 */
import { getApplicativeComposition } from './Applicative';
import { either, fold, isLeft, left, right, swap } from './Either';
export function getEitherM(M) {
    var A = getApplicativeComposition(M, either);
    return __assign(__assign({}, A), { chain: function (ma, f) { return M.chain(ma, function (e) { return (isLeft(e) ? M.of(left(e.left)) : f(e.right)); }); }, alt: function (fx, f) { return M.chain(fx, function (e) { return (isLeft(e) ? f() : A.of(e.right)); }); }, bimap: function (ma, f, g) { return M.map(ma, function (e) { return either.bimap(e, f, g); }); }, mapLeft: function (ma, f) { return M.map(ma, function (e) { return either.mapLeft(e, f); }); }, fold: function (ma, onLeft, onRight) { return M.chain(ma, fold(onLeft, onRight)); }, getOrElse: function (ma, onLeft) { return M.chain(ma, fold(onLeft, M.of)); }, orElse: function (ma, f) {
            return M.chain(ma, fold(f, function (a) { return A.of(a); }));
        }, swap: function (ma) { return M.map(ma, swap); }, rightM: function (ma) { return M.map(ma, right); }, leftM: function (ml) { return M.map(ml, left); }, left: function (e) { return M.of(left(e)); } });
}
