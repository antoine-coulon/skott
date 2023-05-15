import { constant } from './function';
export function getFoldableComposition(F, G) {
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
export function foldM(M, F) {
    return function (fa, b, f) { return F.reduce(fa, M.of(b), function (mb, a) { return M.chain(mb, function (b) { return f(b, a); }); }); };
}
export function intercalate(M, F) {
    return function (sep, fm) {
        var go = function (_a, x) {
            var init = _a.init, acc = _a.acc;
            return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) };
        };
        return F.reduce(fm, { init: true, acc: M.empty }, go).acc;
    };
}
export function traverse_(M, F) {
    var applyFirst = function (mu, mb) { return M.ap(M.map(mu, constant), mb); };
    var mu = M.of(undefined);
    return function (fa, f) { return F.reduce(fa, mu, function (mu, a) { return applyFirst(mu, f(a)); }); };
}
