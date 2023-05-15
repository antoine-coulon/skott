"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eq_1 = require("./Eq");
var function_1 = require("./function");
/**
 * @since 2.5.0
 */
function fromSet(s) {
    return new Set(s);
}
exports.fromSet = fromSet;
/**
 * @since 2.5.0
 */
function toSet(s) {
    return new Set(s);
}
exports.toSet = toSet;
/**
 * @since 2.5.0
 */
function getShow(S) {
    return {
        show: function (s) {
            var elements = '';
            s.forEach(function (a) {
                elements += S.show(a) + ', ';
            });
            if (elements !== '') {
                elements = elements.substring(0, elements.length - 2);
            }
            return "new Set([" + elements + "])";
        }
    };
}
exports.getShow = getShow;
/**
 * @since 2.5.0
 */
exports.empty = new Set();
/**
 * @since 2.5.0
 */
function toReadonlyArray(O) {
    return function (x) {
        // tslint:disable-next-line: readonly-array
        var r = [];
        x.forEach(function (e) { return r.push(e); });
        return r.sort(O.compare);
    };
}
exports.toReadonlyArray = toReadonlyArray;
/**
 * @since 2.5.0
 */
function getEq(E) {
    var subsetE = isSubset(E);
    return Eq_1.fromEquals(function (x, y) { return subsetE(x, y) && subsetE(y, x); });
}
exports.getEq = getEq;
/**
 * @since 2.5.0
 */
function some(predicate) {
    return function (set) {
        var values = set.values();
        var e;
        var found = false;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!found && !(e = values.next()).done) {
            found = predicate(e.value);
        }
        return found;
    };
}
exports.some = some;
/**
 * Projects a Set through a function
 *
 * @since 2.5.0
 */
function map(E) {
    var elemE = elem(E);
    return function (f) { return function (set) {
        var r = new Set();
        set.forEach(function (e) {
            var v = f(e);
            if (!elemE(v, r)) {
                r.add(v);
            }
        });
        return r;
    }; };
}
exports.map = map;
/**
 * @since 2.5.0
 */
function every(predicate) {
    return function_1.not(some(function_1.not(predicate)));
}
exports.every = every;
/**
 * @since 2.5.0
 */
function chain(E) {
    var elemE = elem(E);
    return function (f) { return function (set) {
        var r = new Set();
        set.forEach(function (e) {
            f(e).forEach(function (e) {
                if (!elemE(e, r)) {
                    r.add(e);
                }
            });
        });
        return r;
    }; };
}
exports.chain = chain;
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.5.0
 */
function isSubset(E) {
    var elemE = elem(E);
    return function (x, y) { return every(function (a) { return elemE(a, y); })(x); };
}
exports.isSubset = isSubset;
function filter(predicate) {
    return function (set) {
        var values = set.values();
        var e;
        var r = new Set();
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var value = e.value;
            if (predicate(value)) {
                r.add(value);
            }
        }
        return r;
    };
}
exports.filter = filter;
function partition(predicate) {
    return function (set) {
        var values = set.values();
        var e;
        var right = new Set();
        var left = new Set();
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var value = e.value;
            if (predicate(value)) {
                right.add(value);
            }
            else {
                left.add(value);
            }
        }
        return { left: left, right: right };
    };
}
exports.partition = partition;
/**
 * Test if a value is a member of a set
 *
 * @since 2.5.0
 */
function elem(E) {
    return function (a, set) {
        var values = set.values();
        var e;
        var found = false;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!found && !(e = values.next()).done) {
            found = E.equals(a, e.value);
        }
        return found;
    };
}
exports.elem = elem;
/**
 * Form the union of two sets
 *
 * @since 2.5.0
 */
function union(E) {
    var elemE = elem(E);
    return function (x, y) {
        if (x === exports.empty) {
            return y;
        }
        if (y === exports.empty) {
            return x;
        }
        var r = new Set(x);
        y.forEach(function (e) {
            if (!elemE(e, r)) {
                r.add(e);
            }
        });
        return r;
    };
}
exports.union = union;
/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.5.0
 */
function intersection(E) {
    var elemE = elem(E);
    return function (x, y) {
        if (x === exports.empty || y === exports.empty) {
            return exports.empty;
        }
        var r = new Set();
        x.forEach(function (e) {
            if (elemE(e, y)) {
                r.add(e);
            }
        });
        return r;
    };
}
exports.intersection = intersection;
/**
 * @since 2.5.0
 */
function partitionMap(EB, EC) {
    return function (f) { return function (set) {
        var values = set.values();
        var e;
        var left = new Set();
        var right = new Set();
        var hasB = elem(EB);
        var hasC = elem(EC);
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var v = f(e.value);
            switch (v._tag) {
                case 'Left':
                    if (!hasB(v.left, left)) {
                        left.add(v.left);
                    }
                    break;
                case 'Right':
                    if (!hasC(v.right, right)) {
                        right.add(v.right);
                    }
                    break;
            }
        }
        return { left: left, right: right };
    }; };
}
exports.partitionMap = partitionMap;
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/lib/ReadonlySet'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 2.5.0
 */
function difference(E) {
    var elemE = elem(E);
    return function (x, y) { return filter(function (a) { return !elemE(a, y); })(x); };
}
exports.difference = difference;
/**
 * @since 2.5.0
 */
function getUnionMonoid(E) {
    return {
        concat: union(E),
        empty: exports.empty
    };
}
exports.getUnionMonoid = getUnionMonoid;
/**
 * @since 2.5.0
 */
function getIntersectionSemigroup(E) {
    return {
        concat: intersection(E)
    };
}
exports.getIntersectionSemigroup = getIntersectionSemigroup;
/**
 * @since 2.5.0
 */
function reduce(O) {
    var toArrayO = toReadonlyArray(O);
    return function (b, f) { return function (fa) { return toArrayO(fa).reduce(f, b); }; };
}
exports.reduce = reduce;
/**
 * @since 2.5.0
 */
function foldMap(O, M) {
    var toArrayO = toReadonlyArray(O);
    return function (f) { return function (fa) { return toArrayO(fa).reduce(function (b, a) { return M.concat(b, f(a)); }, M.empty); }; };
}
exports.foldMap = foldMap;
/**
 * Create a set with one element
 *
 * @since 2.5.0
 */
function singleton(a) {
    return new Set([a]);
}
exports.singleton = singleton;
/**
 * Insert a value into a set
 *
 * @since 2.5.0
 */
function insert(E) {
    var elemE = elem(E);
    return function (a) { return function (set) {
        if (!elemE(a, set)) {
            var r = new Set(set);
            r.add(a);
            return r;
        }
        else {
            return set;
        }
    }; };
}
exports.insert = insert;
/**
 * Delete a value from a set
 *
 * @since 2.5.0
 */
function remove(E) {
    return function (a) { return function (set) { return filter(function (ax) { return !E.equals(a, ax); })(set); }; };
}
exports.remove = remove;
/**
 * Create a set from an array
 *
 * @since 2.5.0
 */
function fromArray(E) {
    return function (as) {
        var len = as.length;
        var r = new Set();
        var has = elem(E);
        for (var i = 0; i < len; i++) {
            var a = as[i];
            if (!has(a, r)) {
                r.add(a);
            }
        }
        return r;
    };
}
exports.fromArray = fromArray;
/**
 * @since 2.5.0
 */
function compact(E) {
    return filterMap(E)(function_1.identity);
}
exports.compact = compact;
/**
 * @since 2.5.0
 */
function separate(EE, EA) {
    return function (fa) {
        var elemEE = elem(EE);
        var elemEA = elem(EA);
        var left = new Set();
        var right = new Set();
        fa.forEach(function (e) {
            switch (e._tag) {
                case 'Left':
                    if (!elemEE(e.left, left)) {
                        left.add(e.left);
                    }
                    break;
                case 'Right':
                    if (!elemEA(e.right, right)) {
                        right.add(e.right);
                    }
                    break;
            }
        });
        return { left: left, right: right };
    };
}
exports.separate = separate;
/**
 * @since 2.5.0
 */
function filterMap(E) {
    var elemE = elem(E);
    return function (f) { return function (fa) {
        var r = new Set();
        fa.forEach(function (a) {
            var ob = f(a);
            if (ob._tag === 'Some' && !elemE(ob.value, r)) {
                r.add(ob.value);
            }
        });
        return r;
    }; };
}
exports.filterMap = filterMap;
