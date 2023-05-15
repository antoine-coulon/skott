"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStateM(M) {
    return {
        map: function (fa, f) { return function (s) { return M.map(fa(s), function (_a) {
            var a = _a[0], s1 = _a[1];
            return [f(a), s1];
        }); }; },
        of: function (a) { return function (s) { return M.of([a, s]); }; },
        ap: function (fab, fa) { return function (s) { return M.chain(fab(s), function (_a) {
            var f = _a[0], s = _a[1];
            return M.map(fa(s), function (_a) {
                var a = _a[0], s = _a[1];
                return [f(a), s];
            });
        }); }; },
        chain: function (fa, f) { return function (s) { return M.chain(fa(s), function (_a) {
            var a = _a[0], s1 = _a[1];
            return f(a)(s1);
        }); }; },
        get: function () { return function (s) { return M.of([s, s]); }; },
        put: function (s) { return function () { return M.of([undefined, s]); }; },
        modify: function (f) { return function (s) { return M.of([undefined, f(s)]); }; },
        gets: function (f) { return function (s) { return M.of([f(s), s]); }; },
        fromState: function (sa) { return function (s) { return M.of(sa(s)); }; },
        fromM: function (ma) { return function (s) { return M.map(ma, function (a) { return [a, s]; }); }; },
        evalState: function (ma, s) { return M.map(ma(s), function (_a) {
            var a = _a[0];
            return a;
        }); },
        execState: function (ma, s) { return M.map(ma(s), function (_a) {
            var _ = _a[0], s = _a[1];
            return s;
        }); }
    };
}
exports.getStateM = getStateM;
