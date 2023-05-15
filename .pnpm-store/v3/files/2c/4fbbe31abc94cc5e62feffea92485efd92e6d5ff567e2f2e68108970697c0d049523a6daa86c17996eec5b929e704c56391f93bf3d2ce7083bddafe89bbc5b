"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getReaderM(M) {
    return {
        map: function (ma, f) { return function (r) { return M.map(ma(r), f); }; },
        of: function (a) { return function () { return M.of(a); }; },
        ap: function (mab, ma) { return function (r) { return M.ap(mab(r), ma(r)); }; },
        chain: function (ma, f) { return function (r) { return M.chain(ma(r), function (a) { return f(a)(r); }); }; },
        ask: function () { return M.of; },
        asks: function (f) { return function (r) { return M.map(M.of(r), f); }; },
        local: function (ma, f) { return function (q) { return ma(f(q)); }; },
        fromReader: function (ma) { return function (r) { return M.of(ma(r)); }; },
        fromM: function (ma) { return function () { return ma; }; }
    };
}
exports.getReaderM = getReaderM;
