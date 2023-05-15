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
import { getValidation, isLeft, isRight, left } from './Either';
export function getValidationM(S, M) {
    var A = getApplicativeComposition(M, getValidation(S));
    return __assign(__assign({}, A), { chain: function (ma, f) { return M.chain(ma, function (e) { return (isLeft(e) ? M.of(left(e.left)) : f(e.right)); }); }, alt: function (fx, f) {
            return M.chain(fx, function (e1) {
                return isRight(e1) ? A.of(e1.right) : M.map(f(), function (e2) { return (isLeft(e2) ? left(S.concat(e1.left, e2.left)) : e2); });
            });
        } });
}
