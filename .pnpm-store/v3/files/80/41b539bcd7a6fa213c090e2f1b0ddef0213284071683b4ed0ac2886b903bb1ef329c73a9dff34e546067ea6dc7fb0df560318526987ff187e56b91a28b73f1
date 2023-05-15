/**
 * @since 2.0.0
 */
export var showString = {
    show: function (a) { return JSON.stringify(a); }
};
/**
 * @since 2.0.0
 */
export var showNumber = {
    show: function (a) { return JSON.stringify(a); }
};
/**
 * @since 2.0.0
 */
export var showBoolean = {
    show: function (a) { return JSON.stringify(a); }
};
/**
 * @since 2.0.0
 */
export function getStructShow(shows) {
    return {
        show: function (s) {
            return "{ " + Object.keys(shows)
                .map(function (k) { return k + ": " + shows[k].show(s[k]); })
                .join(', ') + " }";
        }
    };
}
/**
 * @since 2.0.0
 */
export function getTupleShow() {
    var shows = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        shows[_i] = arguments[_i];
    }
    return {
        show: function (t) { return "[" + t.map(function (a, i) { return shows[i].show(a); }).join(', ') + "]"; }
    };
}
