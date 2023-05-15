import { bimap, both, fold, left, map, mapLeft, right, swap, toTuple } from './These';
export function getTheseM(M) {
    function mapT(fa, f) {
        return M.map(fa, map(f));
    }
    function of(a) {
        return M.of(right(a));
    }
    function leftT(e) {
        return M.of(left(e));
    }
    return {
        map: mapT,
        bimap: function (fa, f, g) { return M.map(fa, bimap(f, g)); },
        mapLeft: function (fa, f) { return M.map(fa, mapLeft(f)); },
        fold: function (fa, onLeft, onRight, onBoth) { return M.chain(fa, fold(onLeft, onRight, onBoth)); },
        swap: function (fa) { return M.map(fa, swap); },
        rightM: function (ma) { return M.map(ma, right); },
        leftM: function (me) { return M.map(me, left); },
        left: leftT,
        right: of,
        both: function (e, a) { return M.of(both(e, a)); },
        toTuple: function (fa, e, a) { return M.map(fa, toTuple(e, a)); },
        getMonad: function (E) {
            function chain(fa, f) {
                return M.chain(fa, fold(leftT, f, function (e1, a) {
                    return M.map(f(a), fold(function (e2) { return left(E.concat(e1, e2)); }, right, function (e2, b) { return both(E.concat(e1, e2), b); }));
                }));
            }
            return {
                _E: undefined,
                map: mapT,
                of: of,
                ap: function (mab, ma) {
                    return chain(mab, function (f) { return mapT(ma, f); });
                },
                chain: chain
            };
        }
    };
}
