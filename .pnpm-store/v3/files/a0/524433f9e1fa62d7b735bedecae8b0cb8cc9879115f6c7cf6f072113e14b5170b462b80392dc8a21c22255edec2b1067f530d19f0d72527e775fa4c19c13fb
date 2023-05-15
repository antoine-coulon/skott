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
var Functor_1 = require("./Functor");
function getApplicativeComposition(F, G) {
    return __assign(__assign({}, Functor_1.getFunctorComposition(F, G)), { of: function (a) { return F.of(G.of(a)); }, ap: function (fgab, fga) {
            return F.ap(F.map(fgab, function (h) { return function (ga) { return G.ap(h, ga); }; }), fga);
        } });
}
exports.getApplicativeComposition = getApplicativeComposition;
