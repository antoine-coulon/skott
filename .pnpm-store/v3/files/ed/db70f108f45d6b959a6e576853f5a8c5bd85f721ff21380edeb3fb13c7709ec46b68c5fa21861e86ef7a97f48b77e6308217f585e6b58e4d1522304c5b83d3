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
/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
import { getCompactableComposition } from './Compactable';
import { getLeft, getRight } from './Option';
export function getFilterableComposition(F, G) {
    var FC = __assign(__assign({}, getCompactableComposition(F, G)), { partitionMap: function (fga, f) {
            var left = FC.filterMap(fga, function (a) { return getLeft(f(a)); });
            var right = FC.filterMap(fga, function (a) { return getRight(f(a)); });
            return { left: left, right: right };
        }, partition: function (fga, p) {
            var left = FC.filter(fga, function (a) { return !p(a); });
            var right = FC.filter(fga, p);
            return { left: left, right: right };
        }, filterMap: function (fga, f) { return F.map(fga, function (ga) { return G.filterMap(ga, f); }); }, filter: function (fga, f) { return F.map(fga, function (ga) { return G.filter(ga, f); }); } });
    return FC;
}
