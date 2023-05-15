export function getFunctorComposition(F, G) {
    return {
        map: function (fa, f) { return F.map(fa, function (ga) { return G.map(ga, f); }); }
    };
}
