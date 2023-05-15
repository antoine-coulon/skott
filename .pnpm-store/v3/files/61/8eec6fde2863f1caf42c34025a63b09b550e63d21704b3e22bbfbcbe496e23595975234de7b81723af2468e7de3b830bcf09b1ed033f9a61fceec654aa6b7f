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
function getValidationM(S, M) {
    var A = Applicative_1.getApplicativeComposition(M, Either_1.getValidation(S));
    return __assign(__assign({}, A), { chain: function (ma, f) { return M.chain(ma, function (e) { return (Either_1.isLeft(e) ? M.of(Either_1.left(e.left)) : f(e.right)); }); }, alt: function (fx, f) {
            return M.chain(fx, function (e1) {
                return Either_1.isRight(e1) ? A.of(e1.right) : M.map(f(), function (e2) { return (Either_1.isLeft(e2) ? Either_1.left(S.concat(e1.left, e2.left)) : e2); });
            });
        } });
}
exports.getValidationM = getValidationM;
