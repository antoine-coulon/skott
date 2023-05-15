"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var These_1 = require("./These");
function getTheseM(M) {
    function mapT(fa, f) {
        return M.map(fa, These_1.map(f));
    }
    function of(a) {
        return M.of(These_1.right(a));
    }
    function leftT(e) {
        return M.of(These_1.left(e));
    }
    return {
        map: mapT,
        bimap: function (fa, f, g) { return M.map(fa, These_1.bimap(f, g)); },
        mapLeft: function (fa, f) { return M.map(fa, These_1.mapLeft(f)); },
        fold: function (fa, onLeft, onRight, onBoth) { return M.chain(fa, These_1.fold(onLeft, onRight, onBoth)); },
        swap: function (fa) { return M.map(fa, These_1.swap); },
        rightM: function (ma) { return M.map(ma, These_1.right); },
        leftM: function (me) { return M.map(me, These_1.left); },
        left: leftT,
        right: of,
        both: function (e, a) { return M.of(These_1.both(e, a)); },
        toTuple: function (fa, e, a) { return M.map(fa, These_1.toTuple(e, a)); },
        getMonad: function (E) {
            function chain(fa, f) {
                return M.chain(fa, These_1.fold(leftT, f, function (e1, a) {
                    return M.map(f(a), These_1.fold(function (e2) { return These_1.left(E.concat(e1, e2)); }, These_1.right, function (e2, b) { return These_1.both(E.concat(e1, e2), b); }));
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
exports.getTheseM = getTheseM;
