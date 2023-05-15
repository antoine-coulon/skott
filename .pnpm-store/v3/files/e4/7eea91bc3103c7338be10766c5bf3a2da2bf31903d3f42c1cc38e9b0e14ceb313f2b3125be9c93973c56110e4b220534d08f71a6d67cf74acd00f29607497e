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
import { fold, none, option, some } from './Option';
export function getOptionM(M) {
    var A = getApplicativeComposition(M, option);
    var fnone = M.of(none);
    return __assign(__assign({}, A), { chain: function (ma, f) {
            return M.chain(ma, fold(function () { return fnone; }, f));
        }, alt: function (fx, fy) {
            return M.chain(fx, fold(fy, function (a) { return M.of(some(a)); }));
        }, fold: function (ma, onNone, onSome) { return M.chain(ma, fold(onNone, onSome)); }, getOrElse: function (ma, onNone) { return M.chain(ma, fold(onNone, M.of)); }, fromM: function (ma) { return M.map(ma, some); }, none: function () { return fnone; } });
}
