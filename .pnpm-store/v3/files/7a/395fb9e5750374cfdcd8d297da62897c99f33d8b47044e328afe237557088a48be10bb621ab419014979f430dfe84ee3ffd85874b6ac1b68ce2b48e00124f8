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
var Eq_1 = require("./Eq");
var function_1 = require("./function");
var Option_1 = require("./Option");
var pipeable_1 = require("./pipeable");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyRecord';
/**
 * @since 2.5.0
 */
function fromRecord(r) {
    return Object.assign({}, r);
}
exports.fromRecord = fromRecord;
/**
 * @since 2.5.0
 */
function toRecord(r) {
    return Object.assign({}, r);
}
exports.toRecord = toRecord;
/**
 * @since 2.5.0
 */
function getShow(S) {
    return {
        show: function (r) {
            var elements = collect(function (k, a) { return JSON.stringify(k) + ": " + S.show(a); })(r).join(', ');
            return elements === '' ? '{}' : "{ " + elements + " }";
        }
    };
}
exports.getShow = getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.5.0
 */
function size(r) {
    return Object.keys(r).length;
}
exports.size = size;
/**
 * Test whether a record is empty
 *
 * @since 2.5.0
 */
function isEmpty(r) {
    return Object.keys(r).length === 0;
}
exports.isEmpty = isEmpty;
/**
 * @since 2.5.0
 */
function keys(r) {
    return Object.keys(r).sort();
}
exports.keys = keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/ReadonlyRecord'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.5.0
 */
function collect(f) {
    return function (r) {
        // tslint:disable-next-line: readonly-array
        var out = [];
        for (var _i = 0, _a = keys(r); _i < _a.length; _i++) {
            var key = _a[_i];
            out.push(f(key, r[key]));
        }
        return out;
    };
}
exports.collect = collect;
/**
 * @since 2.5.0
 */
exports.toReadonlyArray = collect(function (k, a) { return [k, a]; });
function toUnfoldable(U) {
    return function (r) {
        var arr = exports.toReadonlyArray(r);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? Option_1.some([arr[b], b + 1]) : Option_1.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
function insertAt(k, a) {
    return function (r) {
        if (r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
}
exports.insertAt = insertAt;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @since 2.5.0
 */
function hasOwnProperty(k, r) {
    return _hasOwnProperty.call(r, k);
}
exports.hasOwnProperty = hasOwnProperty;
function deleteAt(k) {
    return function (r) {
        if (!_hasOwnProperty.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
exports.deleteAt = deleteAt;
/**
 * @since 2.5.0
 */
function updateAt(k, a) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return Option_1.none;
        }
        if (r[k] === a) {
            return Option_1.some(r);
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return Option_1.some(out);
    };
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(k, f) {
    return function (r) {
        if (!hasOwnProperty(k, r)) {
            return Option_1.none;
        }
        var out = Object.assign({}, r);
        out[k] = f(r[k]);
        return Option_1.some(out);
    };
}
exports.modifyAt = modifyAt;
function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return Option_1.isNone(oa) ? Option_1.none : Option_1.some([oa.value, deleteAtk(r)]);
    };
}
exports.pop = pop;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.5.0
 */
function isSubrecord(E) {
    return function (x, y) {
        for (var k in x) {
            if (!_hasOwnProperty.call(y, k) || !E.equals(x[k], y[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.isSubrecord = isSubrecord;
function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return Eq_1.fromEquals(function (x, y) { return isSubrecordE(x, y) && isSubrecordE(y, x); });
}
exports.getEq = getEq;
function getMonoid(S) {
    return {
        concat: function (x, y) {
            if (x === exports.empty) {
                return y;
            }
            if (y === exports.empty) {
                return x;
            }
            var keys = Object.keys(y);
            var len = keys.length;
            if (len === 0) {
                return x;
            }
            var r = __assign({}, x);
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                r[k] = _hasOwnProperty.call(x, k) ? S.concat(x[k], y[k]) : y[k];
            }
            return r;
        },
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * Lookup the value for a key in a record
 *
 * @since 2.5.0
 */
function lookup(k, r) {
    return _hasOwnProperty.call(r, k) ? Option_1.some(r[k]) : Option_1.none;
}
exports.lookup = lookup;
/**
 * @since 2.5.0
 */
exports.empty = {};
function mapWithIndex(f) {
    return function (fa) { return exports.readonlyRecord.mapWithIndex(fa, f); };
}
exports.mapWithIndex = mapWithIndex;
function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
exports.map = map;
function reduceWithIndex(b, f) {
    return function (fa) { return exports.readonlyRecord.reduceWithIndex(fa, b, f); };
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(M) {
    var foldMapWithIndexM = exports.readonlyRecord.foldMapWithIndex(M);
    return function (f) { return function (fa) { return foldMapWithIndexM(fa, f); }; };
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(b, f) {
    return function (fa) { return exports.readonlyRecord.reduceRightWithIndex(fa, b, f); };
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a record with one key/value pair
 *
 * @since 2.5.0
 */
function singleton(k, a) {
    var _a;
    return _a = {}, _a[k] = a, _a;
}
exports.singleton = singleton;
function traverseWithIndex(F) {
    var traverseWithIndexF = exports.readonlyRecord.traverseWithIndex(F);
    return function (f) { return function (ta) { return traverseWithIndexF(ta, f); }; };
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
}
exports.traverse = traverse;
function sequence(F) {
    return traverseWithIndex(F)(function (_, a) { return a; });
}
exports.sequence = sequence;
function partitionMapWithIndex(f) {
    return function (fa) { return exports.readonlyRecord.partitionMapWithIndex(fa, f); };
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return function (fa) { return exports.readonlyRecord.partitionWithIndex(fa, predicateWithIndex); };
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(f) {
    return function (fa) { return exports.readonlyRecord.filterMapWithIndex(fa, f); };
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return function (fa) { return exports.readonlyRecord.filterWithIndex(fa, predicateWithIndex); };
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, function_1.identity); };
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = _hasOwnProperty.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.5.0
 */
function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
exports.every = every;
/**
 * @since 2.5.0
 */
function some(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
exports.some = some;
/**
 * @since 2.5.0
 */
function elem(E) {
    return function (a, fa) {
        for (var k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * @since 2.5.0
 */
exports.readonlyRecord = {
    URI: exports.URI,
    map: function (fa, f) { return exports.readonlyRecord.mapWithIndex(fa, function (_, a) { return f(a); }); },
    reduce: function (fa, b, f) { return exports.readonlyRecord.reduceWithIndex(fa, b, function (_, b, a) { return f(b, a); }); },
    foldMap: function (M) {
        var foldMapWithIndexM = exports.readonlyRecord.foldMapWithIndex(M);
        return function (fa, f) { return foldMapWithIndexM(fa, function (_, a) { return f(a); }); };
    },
    reduceRight: function (fa, b, f) { return exports.readonlyRecord.reduceRightWithIndex(fa, b, function (_, a, b) { return f(a, b); }); },
    traverse: function (F) {
        var traverseWithIndexF = exports.readonlyRecord.traverseWithIndex(F);
        return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
    },
    sequence: sequence,
    compact: function (fa) {
        var r = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var optionA = fa[key];
            if (Option_1.isSome(optionA)) {
                r[key] = optionA.value;
            }
        }
        return r;
    },
    separate: function (fa) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            var e = fa[key];
            switch (e._tag) {
                case 'Left':
                    left[key] = e.left;
                    break;
                case 'Right':
                    right[key] = e.right;
                    break;
            }
        }
        return {
            left: left,
            right: right
        };
    },
    filter: function (fa, predicate) {
        return exports.readonlyRecord.filterWithIndex(fa, function (_, a) { return predicate(a); });
    },
    filterMap: function (fa, f) { return exports.readonlyRecord.filterMapWithIndex(fa, function (_, a) { return f(a); }); },
    partition: function (fa, predicate) {
        return exports.readonlyRecord.partitionWithIndex(fa, function (_, a) { return predicate(a); });
    },
    partitionMap: function (fa, f) { return exports.readonlyRecord.partitionMapWithIndex(fa, function (_, a) { return f(a); }); },
    wither: function (F) {
        var traverseF = exports.readonlyRecord.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), exports.readonlyRecord.compact); };
    },
    wilt: function (F) {
        var traverseF = exports.readonlyRecord.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), exports.readonlyRecord.separate); };
    },
    mapWithIndex: function (fa, f) {
        var out = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
            var key = keys_3[_i];
            out[key] = f(key, fa[key]);
        }
        return out;
    },
    reduceWithIndex: function (fa, b, f) {
        var out = b;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            out = f(k, out, fa[k]);
        }
        return out;
    },
    foldMapWithIndex: function (M) { return function (fa, f) {
        var out = M.empty;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            out = M.concat(out, f(k, fa[k]));
        }
        return out;
    }; },
    reduceRightWithIndex: function (fa, b, f) {
        var out = b;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = keys[i];
            out = f(k, fa[k], out);
        }
        return out;
    },
    traverseWithIndex: function (F) { return function (ta, f) {
        var keys = Object.keys(ta);
        if (keys.length === 0) {
            return F.of(exports.empty);
        }
        var fr = F.of({});
        var _loop_1 = function (key) {
            fr = F.ap(F.map(fr, function (r) { return function (b) {
                r[key] = b;
                return r;
            }; }), f(key, ta[key]));
        };
        for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
            var key = keys_4[_i];
            _loop_1(key);
        }
        return fr;
    }; },
    partitionMapWithIndex: function (fa, f) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
            var key = keys_5[_i];
            var e = f(key, fa[key]);
            switch (e._tag) {
                case 'Left':
                    left[key] = e.left;
                    break;
                case 'Right':
                    right[key] = e.right;
                    break;
            }
        }
        return {
            left: left,
            right: right
        };
    },
    partitionWithIndex: function (fa, predicateWithIndex) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
            var key = keys_6[_i];
            var a = fa[key];
            if (predicateWithIndex(key, a)) {
                right[key] = a;
            }
            else {
                left[key] = a;
            }
        }
        return {
            left: left,
            right: right
        };
    },
    filterMapWithIndex: function (fa, f) {
        var r = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_7 = keys; _i < keys_7.length; _i++) {
            var key = keys_7[_i];
            var optionB = f(key, fa[key]);
            if (Option_1.isSome(optionB)) {
                r[key] = optionB.value;
            }
        }
        return r;
    },
    filterWithIndex: function (fa, predicateWithIndex) {
        var out = {};
        var changed = false;
        for (var key in fa) {
            if (_hasOwnProperty.call(fa, key)) {
                var a = fa[key];
                if (predicateWithIndex(key, a)) {
                    out[key] = a;
                }
                else {
                    changed = true;
                }
            }
        }
        return changed ? out : fa;
    }
};
var _a = pipeable_1.pipeable(exports.readonlyRecord), filter = _a.filter, filterMap = _a.filterMap, foldMap = _a.foldMap, partition = _a.partition, partitionMap = _a.partitionMap, reduce = _a.reduce, reduceRight = _a.reduceRight, compact = _a.compact, separate = _a.separate;
exports.filter = filter;
exports.filterMap = filterMap;
exports.foldMap = foldMap;
exports.partition = partition;
exports.partitionMap = partitionMap;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.compact = compact;
exports.separate = separate;
