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
var function_1 = require("./function");
var pipeable_1 = require("./pipeable");
/**
 * @since 2.0.0
 */
exports.URI = 'Const';
/**
 * @since 2.0.0
 */
exports.make = function_1.unsafeCoerce;
/**
 * @since 2.0.0
 */
function getShow(S) {
    return {
        show: function (c) { return "make(" + S.show(c) + ")"; }
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
exports.getEq = function_1.identity;
/**
 * @since 2.0.0
 */
function getApply(S) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.const_.map,
        ap: function (fab, fa) { return exports.make(S.concat(fab, fa)); }
    };
}
exports.getApply = getApply;
/**
 * @since 2.0.0
 */
function getApplicative(M) {
    return __assign(__assign({}, getApply(M)), { of: function () { return exports.make(M.empty); } });
}
exports.getApplicative = getApplicative;
/**
 * @since 2.0.0
 */
exports.const_ = {
    URI: exports.URI,
    map: function_1.unsafeCoerce,
    contramap: function_1.unsafeCoerce
};
var _a = pipeable_1.pipeable(exports.const_), contramap = _a.contramap, map = _a.map;
exports.contramap = contramap;
exports.map = map;
