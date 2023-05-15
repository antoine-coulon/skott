"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Array_1 = require("./Array");
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var pipeable_1 = require("./pipeable");
/**
 * @since 2.0.0
 */
exports.URI = 'Tree';
/**
 * @since 2.0.0
 */
function make(value, forest) {
    if (forest === void 0) { forest = Array_1.empty; }
    return {
        value: value,
        forest: forest
    };
}
exports.make = make;
/**
 * @since 2.0.0
 */
function getShow(S) {
    var show = function (t) {
        return t.forest === Array_1.empty || t.forest.length === 0
            ? "make(" + S.show(t.value) + ")"
            : "make(" + S.show(t.value) + ", [" + t.forest.map(show).join(', ') + "])";
    };
    return {
        show: show
    };
}
exports.getShow = getShow;
/**
 * @since 2.0.0
 */
function getEq(E) {
    var SA;
    var R = Eq_1.fromEquals(function (x, y) { return E.equals(x.value, y.value) && SA.equals(x.forest, y.forest); });
    SA = Array_1.getEq(R);
    return R;
}
exports.getEq = getEq;
var draw = function (indentation, forest) {
    var r = '';
    var len = forest.length;
    var tree;
    for (var i = 0; i < len; i++) {
        tree = forest[i];
        var isLast = i === len - 1;
        r += indentation + (isLast ? '└' : '├') + '─ ' + tree.value;
        r += draw(indentation + (len > 1 && !isLast ? '│  ' : '   '), tree.forest);
    }
    return r;
};
/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 2.0.0
 */
function drawForest(forest) {
    return draw('\n', forest);
}
exports.drawForest = drawForest;
/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree, tree } from 'fp-ts/lib/Tree'
 *
 * const fa = make('a', [
 *   tree.of('b'),
 *   tree.of('c'),
 *   make('d', [tree.of('e'), tree.of('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 2.0.0
 */
function drawTree(tree) {
    return tree.value + drawForest(tree.forest);
}
exports.drawTree = drawTree;
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
function unfoldTree(b, f) {
    var _a = f(b), a = _a[0], bs = _a[1];
    return { value: a, forest: unfoldForest(bs, f) };
}
exports.unfoldTree = unfoldTree;
/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
function unfoldForest(bs, f) {
    return bs.map(function (b) { return unfoldTree(b, f); });
}
exports.unfoldForest = unfoldForest;
function unfoldTreeM(M) {
    var unfoldForestMM = unfoldForestM(M);
    return function (b, f) { return M.chain(f(b), function (_a) {
        var a = _a[0], bs = _a[1];
        return M.chain(unfoldForestMM(bs, f), function (ts) { return M.of({ value: a, forest: ts }); });
    }); };
}
exports.unfoldTreeM = unfoldTreeM;
function unfoldForestM(M) {
    var traverseM = Array_1.array.traverse(M);
    return function (bs, f) { return traverseM(bs, function (b) { return unfoldTreeM(M)(b, f); }); };
}
exports.unfoldForestM = unfoldForestM;
/**
 * @since 2.0.0
 */
function elem(E) {
    var go = function (a, fa) {
        if (E.equals(a, fa.value)) {
            return true;
        }
        return fa.forest.some(function (tree) { return go(a, tree); });
    };
    return go;
}
exports.elem = elem;
/**
 * @since 2.0.0
 */
exports.tree = {
    URI: exports.URI,
    map: function (fa, f) { return ({
        value: f(fa.value),
        forest: fa.forest.map(function (t) { return exports.tree.map(t, f); })
    }); },
    of: function (a) { return ({
        value: a,
        forest: Array_1.empty
    }); },
    ap: function (fab, fa) { return exports.tree.chain(fab, function (f) { return exports.tree.map(fa, f); }); },
    chain: function (fa, f) {
        var _a = f(fa.value), value = _a.value, forest = _a.forest;
        var concat = Array_1.getMonoid().concat;
        return {
            value: value,
            forest: concat(forest, fa.forest.map(function (t) { return exports.tree.chain(t, f); }))
        };
    },
    reduce: function (fa, b, f) {
        var r = f(b, fa.value);
        var len = fa.forest.length;
        for (var i = 0; i < len; i++) {
            r = exports.tree.reduce(fa.forest[i], r, f);
        }
        return r;
    },
    foldMap: function (M) { return function (fa, f) { return exports.tree.reduce(fa, M.empty, function (acc, a) { return M.concat(acc, f(a)); }); }; },
    reduceRight: function (fa, b, f) {
        var r = b;
        var len = fa.forest.length;
        for (var i = len - 1; i >= 0; i--) {
            r = exports.tree.reduceRight(fa.forest[i], r, f);
        }
        return f(fa.value, r);
    },
    traverse: function (F) {
        var traverseF = Array_1.array.traverse(F);
        var r = function (ta, f) {
            return F.ap(F.map(f(ta.value), function (value) { return function (forest) { return ({
                value: value,
                forest: forest
            }); }; }), traverseF(ta.forest, function (t) { return r(t, f); }));
        };
        return r;
    },
    sequence: function (F) {
        var traverseF = exports.tree.traverse(F);
        return function (ta) { return traverseF(ta, function_1.identity); };
    },
    extract: function (wa) { return wa.value; },
    extend: function (wa, f) { return ({
        value: f(wa),
        forest: wa.forest.map(function (t) { return exports.tree.extend(t, f); })
    }); }
};
var _a = pipeable_1.pipeable(exports.tree), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, flatten = _a.flatten, foldMap = _a.foldMap, map = _a.map, reduce = _a.reduce, reduceRight = _a.reduceRight;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.duplicate = duplicate;
exports.extend = extend;
exports.flatten = flatten;
exports.foldMap = foldMap;
exports.map = map;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
