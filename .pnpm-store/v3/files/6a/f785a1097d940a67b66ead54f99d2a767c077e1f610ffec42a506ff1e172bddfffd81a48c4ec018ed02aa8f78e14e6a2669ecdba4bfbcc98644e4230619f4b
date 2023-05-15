"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
function getFoldableComposition(F, G) {
    return {
        reduce: function (fga, b, f) { return F.reduce(fga, b, function (b, ga) { return G.reduce(ga, b, f); }); },
        foldMap: function (M) {
            var foldMapF = F.foldMap(M);
            var foldMapG = G.foldMap(M);
            return function (fa, f) { return foldMapF(fa, function (ga) { return foldMapG(ga, f); }); };
        },
        reduceRight: function (fa, b, f) { return F.reduceRight(fa, b, function (ga, b) { return G.reduceRight(ga, b, f); }); }
    };
}
exports.getFoldableComposition = getFoldableComposition;
function foldM(M, F) {
    return function (fa, b, f) { return F.reduce(fa, M.of(b), function (mb, a) { return M.chain(mb, function (b) { return f(b, a); }); }); };
}
exports.foldM = foldM;
function intercalate(M, F) {
    return function (sep, fm) {
        var go = function (_a, x) {
            var init = _a.init, acc = _a.acc;
            return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) };
        };
        return F.reduce(fm, { init: true, acc: M.empty }, go).acc;
    };
}
exports.intercalate = intercalate;
function traverse_(M, F) {
    var applyFirst = function (mu, mb) { return M.ap(M.map(mu, function_1.constant), mb); };
    var mu = M.of(undefined);
    return function (fa, f) { return F.reduce(fa, mu, function (mu, a) { return applyFirst(mu, f(a)); }); };
}
exports.traverse_ = traverse_;
