/**
 * vis-util
 * https://github.com/visjs/vis-util
 *
 * utilitie collection for visjs
 *
 * @version 5.0.3
 * @date    2022-03-04T18:53:16.725Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger$4 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var path$l = {};

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global$f = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var path$k = path$l;
var global$e = global$f;

var aFunction$3 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$6 = function (namespace, method) {
  return arguments.length < 2 ? aFunction$3(path$k[namespace]) || aFunction$3(global$e[namespace]) : path$k[namespace] && path$k[namespace][method] || global$e[namespace] && global$e[namespace][method];
};

var getBuiltIn$5 = getBuiltIn$6;
var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

var global$d = global$f;
var userAgent$1 = engineUserAgent;
var process = global$d.process;
var Deno = global$d.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent$1) {
  match = userAgent$1.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent$1.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var fails$h = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$2 = engineV8Version;
var fails$g = fails$h; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$g(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$2 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$2 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var getBuiltIn$4 = getBuiltIn$6;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var isSymbol$4 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$4('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};

var isSymbol$3 = isSymbol$4;

var toString$8 = function (argument) {
  if (isSymbol$3(argument)) throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};

// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$5 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

var toInteger$3 = toInteger$4;
var toString$7 = toString$8;
var requireObjectCoercible$4 = requireObjectCoercible$5; // `String.prototype.codePointAt` methods implementation

var createMethod$4 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$7(requireObjectCoercible$4($this));
    var position = toInteger$3(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$4(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$4(true)
};

var global$c = global$f;

var setGlobal$1 = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global$c, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$c[key] = value;
  }

  return value;
};

var global$b = global$f;
var setGlobal = setGlobal$1;
var SHARED = '__core-js_shared__';
var store$3 = global$b[SHARED] || setGlobal(SHARED, {});
var sharedStore = store$3;

var store$2 = sharedStore;
var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store$2.inspectSource != 'function') {
  store$2.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$1 = store$2.inspectSource;

var global$a = global$f;
var inspectSource = inspectSource$1;
var WeakMap$1 = global$a.WeakMap;
var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

var isObject$d = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var fails$f = fails$h; // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$f(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

var objectDefineProperty = {};

var global$9 = global$f;
var isObject$c = isObject$d;
var document$1 = global$9.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$c(document$1) && isObject$c(document$1.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var DESCRIPTORS$c = descriptors;
var fails$e = fails$h;
var createElement = documentCreateElement$1; // Thank's IE8 for his funny defineProperty

var ie8DomDefine = !DESCRIPTORS$c && !fails$e(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

var isObject$b = isObject$d;

var anObject$8 = function (it) {
  if (!isObject$b(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var isObject$a = isObject$d; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject$a(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$a(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject$a(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var shared$4 = {exports: {}};

var store$1 = sharedStore;
(shared$4.exports = function (key, value) {
  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.16.2',
  mode: 'pure' ,
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var requireObjectCoercible$3 = requireObjectCoercible$5; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$b = function (argument) {
  return Object(requireObjectCoercible$3(argument));
};

var toObject$a = toObject$b;
var hasOwnProperty = {}.hasOwnProperty;

var has$a = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject$a(it), key);
};

var id = 0;
var postfix = Math.random();

var uid$3 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var global$8 = global$f;
var shared$3 = shared$4.exports;
var has$9 = has$a;
var uid$2 = uid$3;
var NATIVE_SYMBOL$1 = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore$1 = shared$3('wks');
var Symbol$1 = global$8.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

var wellKnownSymbol$i = function (name) {
  if (!has$9(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    if (NATIVE_SYMBOL$1 && has$9(Symbol$1, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore$1[name];
};

var isObject$9 = isObject$d;
var isSymbol$2 = isSymbol$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$h = wellKnownSymbol$i;
var TO_PRIMITIVE$1 = wellKnownSymbol$h('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function (input, pref) {
  if (!isObject$9(input) || isSymbol$2(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE$1];
  var result;

  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject$9(result) || isSymbol$2(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$1 = isSymbol$4; // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$4 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$1(key) ? key : String(key);
};

var DESCRIPTORS$b = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var anObject$7 = anObject$8;
var toPropertyKey$3 = toPropertyKey$4; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$b ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$7(O);
  P = toPropertyKey$3(P);
  anObject$7(Attributes);
  if (IE8_DOM_DEFINE$1) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var DESCRIPTORS$a = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;
var createNonEnumerableProperty$8 = DESCRIPTORS$a ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$4(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var shared$2 = shared$4.exports;
var uid$1 = uid$3;
var keys$3 = shared$2('keys');

var sharedKey$4 = function (key) {
  return keys$3[key] || (keys$3[key] = uid$1(key));
};

var hiddenKeys$5 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$7 = global$f;
var isObject$8 = isObject$d;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
var objectHas = has$a;
var shared$1 = sharedStore;
var sharedKey$3 = sharedKey$4;
var hiddenKeys$4 = hiddenKeys$5;
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$7.WeakMap;
var set, get, has$8;

var enforce = function (it) {
  return has$8(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject$8(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has$8 = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey$3('state');
  hiddenKeys$4[STATE] = true;

  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$7(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has$8 = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$8,
  enforce: enforce,
  getterFor: getterFor
};

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$5 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor$5 && !$propertyIsEnumerable$1.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$5(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

var toString$6 = {}.toString;

var classofRaw$1 = function (it) {
  return toString$6.call(it).slice(8, -1);
};

var fails$d = fails$h;
var classof$7 = classofRaw$1;
var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$d(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$7(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

var IndexedObject$2 = indexedObject;
var requireObjectCoercible$2 = requireObjectCoercible$5;

var toIndexedObject$a = function (it) {
  return IndexedObject$2(requireObjectCoercible$2(it));
};

var DESCRIPTORS$9 = descriptors;
var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;
var toIndexedObject$9 = toIndexedObject$a;
var toPropertyKey$2 = toPropertyKey$4;
var has$7 = has$a;
var IE8_DOM_DEFINE = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$9(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) {
    /* empty */
  }
  if (has$7(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule$2.f.call(O, P), O[P]);
};

var fails$c = fails$h;
var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$c(detection) : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';
var isForced_1 = isForced$1;

var aFunction$2 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

var aFunction$1 = aFunction$2; // optional / simple context binding

var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function () {
    return fn.apply(that, arguments);
  };
};

var global$6 = global$f;
var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
var isForced = isForced_1;
var path$j = path$l;
var bind$7 = functionBindContext;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
var has$6 = has$a;

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();

        case 1:
          return new NativeConstructor(a);

        case 2:
          return new NativeConstructor(a, b);
      }

      return new NativeConstructor(a, b, c);
    }

    return NativeConstructor.apply(this, arguments);
  };

  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;
  var nativeSource = GLOBAL ? global$6 : STATIC ? global$6[TARGET] : (global$6[TARGET] || {}).prototype;
  var target = GLOBAL ? path$j : path$j[TARGET] || (path$j[TARGET] = {});
  var targetPrototype = target.prototype;
  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

    USE_NATIVE = !FORCED && nativeSource && has$6(nativeSource, key);
    targetProperty = target[key];
    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$4(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key]; // export native or implementation

    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

    if (options.bind && USE_NATIVE) resultProperty = bind$7(sourceProperty, global$6); // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind$7(Function.call, sourceProperty); // default case
    else resultProperty = sourceProperty; // add a flag to not completely full polyfills

    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty$6(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

      if (!has$6(path$j, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty$6(path$j, VIRTUAL_PROTOTYPE, {});
      } // export virtual prototype methods


      path$j[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty$6(targetPrototype, key, sourceProperty);
      }
    }
  }
};

var fails$b = fails$h;
var correctPrototypeGetter = !fails$b(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var has$5 = has$a;
var toObject$9 = toObject$b;
var sharedKey$2 = sharedKey$4;
var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;
var IE_PROTO$1 = sharedKey$2('IE_PROTO');
var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe

var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER$1 ? Object.getPrototypeOf : function (O) {
  O = toObject$9(O);
  if (has$5(O, IE_PROTO$1)) return O[IE_PROTO$1];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype$1 : null;
};

var fails$a = fails$h;
var getPrototypeOf$4 = objectGetPrototypeOf;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
var has$4 = has$a;
var wellKnownSymbol$g = wellKnownSymbol$i;
var ITERATOR$4 = wellKnownSymbol$g('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

var returnThis$2 = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
/* eslint-disable es/no-array-prototype-keys -- safe */

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$4(getPrototypeOf$4(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$a(function () {
  var test = {}; // FF44- legacy iterators case

  return IteratorPrototype$2[ITERATOR$4].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

if ((NEW_ITERATOR_PROTOTYPE) && !has$4(IteratorPrototype$2, ITERATOR$4)) {
  createNonEnumerableProperty$5(IteratorPrototype$2, ITERATOR$4, returnThis$2);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var toInteger$2 = toInteger$4;
var min$2 = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$7 = function (argument) {
  return argument > 0 ? min$2(toInteger$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toInteger$1 = toInteger$4;
var max$2 = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$4 = function (index, length) {
  var integer = toInteger$1(index);
  return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
};

var toIndexedObject$8 = toIndexedObject$a;
var toLength$6 = toLength$7;
var toAbsoluteIndex$3 = toAbsoluteIndex$4; // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$3 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$8($this);
    var length = toLength$6(O.length);
    var index = toAbsoluteIndex$3(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes$1 = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$3(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$3(false)
};

var has$3 = has$a;
var toIndexedObject$7 = toIndexedObject$a;
var indexOf$4 = arrayIncludes$1.indexOf;
var hiddenKeys$3 = hiddenKeys$5;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$7(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has$3(hiddenKeys$3, key) && has$3(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has$3(O, key = names[i++])) {
    ~indexOf$4(result, key) || result.push(key);
  }

  return result;
};

var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3; // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys$4 = Object.keys || function keys(O) {
  return internalObjectKeys$1(O, enumBugKeys$2);
};

var DESCRIPTORS$8 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var anObject$6 = anObject$8;
var objectKeys$3 = objectKeys$4; // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = DESCRIPTORS$8 ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$6(O);
  var keys = objectKeys$3(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) definePropertyModule$2.f(O, key = keys[index++], Properties[key]);

  return O;
};

var getBuiltIn$3 = getBuiltIn$6;
var html$1 = getBuiltIn$3('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject$5 = anObject$8;
var defineProperties$5 = objectDefineProperties;
var enumBugKeys$1 = enumBugKeys$3;
var hiddenKeys$2 = hiddenKeys$5;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey$1 = sharedKey$4;
var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys$1.length;

  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];

  return NullProtoObject();
};

hiddenKeys$2[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$5(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : defineProperties$5(result, Properties);
};

var wellKnownSymbol$f = wellKnownSymbol$i;
var TO_STRING_TAG$3 = wellKnownSymbol$f('toStringTag');
var test$1 = {};
test$1[TO_STRING_TAG$3] = 'z';
var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var classofRaw = classofRaw$1;
var wellKnownSymbol$e = wellKnownSymbol$i;
var TO_STRING_TAG$2 = wellKnownSymbol$e('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$5 = classof$6; // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$5(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineProperty$8 = objectDefineProperty.f;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
var has$2 = has$a;
var toString$5 = objectToString;
var wellKnownSymbol$d = wellKnownSymbol$i;
var TO_STRING_TAG$1 = wellKnownSymbol$d('toStringTag');

var setToStringTag$4 = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;

    if (!has$2(target, TO_STRING_TAG$1)) {
      defineProperty$8(target, TO_STRING_TAG$1, {
        configurable: true,
        value: TAG
      });
    }

    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty$4(target, 'toString', toString$5);
    }
  }
};

var iterators = {};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$4 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;
var setToStringTag$3 = setToStringTag$4;
var Iterators$5 = iterators;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$4(IteratorPrototype$1, {
    next: createPropertyDescriptor$2(1, next)
  });
  setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators$5[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isObject$7 = isObject$d;

var aPossiblePrototype$1 = function (it) {
  if (!isObject$7(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

/* eslint-disable no-proto -- safe */
var anObject$4 = anObject$8;
var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe

Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject$4(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;

var redefine$2 = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty$3(target, key, value);
};

var $$u = _export;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf$3 = objectGetPrototypeOf;
var setToStringTag$2 = setToStringTag$4;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;
var redefine$1 = redefine$2;
var wellKnownSymbol$c = wellKnownSymbol$i;
var Iterators$4 = iterators;
var IteratorsCore = iteratorsCore;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$3 = wellKnownSymbol$c('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$3] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf$3(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {


      setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      Iterators$4[TO_STRING_TAG] = returnThis;
    }
  } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if ((FORCED) && IterablePrototype[ITERATOR$3] !== defaultIterator) {
    createNonEnumerableProperty$2(IterablePrototype, ITERATOR$3, defaultIterator);
  }

  Iterators$4[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine$1(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$u({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

var charAt = stringMultibyte.charAt;
var toString$4 = toString$8;
var InternalStateModule$2 = internalState;
var defineIterator$1 = defineIterator$2;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState$2 = InternalStateModule$2.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator

defineIterator$1(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: toString$4(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

var anObject$3 = anObject$8;

var iteratorClose$1 = function (iterator) {
  var returnMethod = iterator['return'];

  if (returnMethod !== undefined) {
    return anObject$3(returnMethod.call(iterator)).value;
  }
};

var anObject$2 = anObject$8;
var iteratorClose = iteratorClose$1; // call something on iterator step with safe closing on error

var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$2(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};

var wellKnownSymbol$b = wellKnownSymbol$i;
var Iterators$3 = iterators;
var ITERATOR$2 = wellKnownSymbol$b('iterator');
var ArrayPrototype$a = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$3.Array === it || ArrayPrototype$a[ITERATOR$2] === it);
};

var toPropertyKey$1 = toPropertyKey$4;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var createProperty$5 = function (object, key, value) {
  var propertyKey = toPropertyKey$1(key);
  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));else object[propertyKey] = value;
};

var classof$4 = classof$6;
var Iterators$2 = iterators;
var wellKnownSymbol$a = wellKnownSymbol$i;
var ITERATOR$1 = wellKnownSymbol$a('iterator');

var getIteratorMethod$5 = function (it) {
  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || Iterators$2[classof$4(it)];
};

var bind$6 = functionBindContext;
var toObject$8 = toObject$b;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var toLength$5 = toLength$7;
var createProperty$4 = createProperty$5;
var getIteratorMethod$4 = getIteratorMethod$5; // `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from

var arrayFrom = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject$8(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$4(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind$6(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty$4(result, index, value);
    }
  } else {
    length = toLength$5(O.length);
    result = new C(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty$4(result, index, value);
    }
  }

  result.length = index;
  return result;
};

var wellKnownSymbol$9 = wellKnownSymbol$i;
var ITERATOR = wellKnownSymbol$9('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR] = function () {
    return this;
  }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

var $$t = _export;
var from$5 = arrayFrom;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.es/ecma262/#sec-array.from

$$t({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: from$5
});

var path$i = path$l;
var from$4 = path$i.Array.from;

var parent$B = from$4;
var from$3 = parent$B;

var from$2 = from$3;

var toIndexedObject$6 = toIndexedObject$a;
var Iterators$1 = iterators;
var InternalStateModule$1 = internalState;
var defineIterator = defineIterator$2;
var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator

defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$6(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject

Iterators$1.Arguments = Iterators$1.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

var getIteratorMethod$3 = getIteratorMethod$5;
var getIteratorMethod_1 = getIteratorMethod$3;

// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var DOMIterables$1 = domIterables;
var global$5 = global$f;
var classof$3 = classof$6;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
var Iterators = iterators;
var wellKnownSymbol$8 = wellKnownSymbol$i;
var TO_STRING_TAG = wellKnownSymbol$8('toStringTag');

for (var COLLECTION_NAME in DOMIterables$1) {
  var Collection = global$5[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype && classof$3(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }

  Iterators[COLLECTION_NAME] = Iterators.Array;
}

var parent$A = getIteratorMethod_1;
var getIteratorMethod$2 = parent$A;

var parent$z = getIteratorMethod$2;
var getIteratorMethod$1 = parent$z;

var getIteratorMethod = getIteratorMethod$1;

var classof$2 = classofRaw$1; // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$b = Array.isArray || function isArray(arg) {
  return classof$2(arg) == 'Array';
};

var isObject$6 = isObject$d;
var isArray$a = isArray$b;
var wellKnownSymbol$7 = wellKnownSymbol$i;
var SPECIES$2 = wellKnownSymbol$7('species'); // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C;

  if (isArray$a(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray$a(C.prototype))) C = undefined;else if (isObject$6(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate$3 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var fails$9 = fails$h;
var wellKnownSymbol$6 = wellKnownSymbol$i;
var V8_VERSION$1 = engineV8Version;
var SPECIES$1 = wellKnownSymbol$6('species');

var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1 >= 51 || !fails$9(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES$1] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$s = _export;
var fails$8 = fails$h;
var isArray$9 = isArray$b;
var isObject$5 = isObject$d;
var toObject$7 = toObject$b;
var toLength$4 = toLength$7;
var createProperty$3 = createProperty$5;
var arraySpeciesCreate$2 = arraySpeciesCreate$3;
var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
var wellKnownSymbol$5 = wellKnownSymbol$i;
var V8_VERSION = engineV8Version;
var IS_CONCAT_SPREADABLE = wellKnownSymbol$5('isConcatSpreadable');
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$8(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$4('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$5(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$9(O);
};

var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$$s({
  target: 'Array',
  proto: true,
  forced: FORCED$3
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$7(this);
    var A = arraySpeciesCreate$2(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength$4(E.length);
        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty$3(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty$3(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

var objectGetOwnPropertyNames = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys$1);
};

var objectGetOwnPropertyNamesExternal = {};

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject$5 = toIndexedObject$a;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var toString$3 = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && toString$3.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$5(it));
};

var objectGetOwnPropertySymbols = {};

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var wellKnownSymbolWrapped = {};

var wellKnownSymbol$4 = wellKnownSymbol$i;
wellKnownSymbolWrapped.f = wellKnownSymbol$4;

var path$h = path$l;
var has$1 = has$a;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$7 = objectDefineProperty.f;

var defineWellKnownSymbol$l = function (NAME) {
  var Symbol = path$h.Symbol || (path$h.Symbol = {});
  if (!has$1(Symbol, NAME)) defineProperty$7(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule$1.f(NAME)
  });
};

var bind$5 = functionBindContext;
var IndexedObject$1 = indexedObject;
var toObject$6 = toObject$b;
var toLength$3 = toLength$7;
var arraySpeciesCreate$1 = arraySpeciesCreate$3;
var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

var createMethod$2 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$6($this);
    var self = IndexedObject$1(O);
    var boundFunction = bind$5(callbackfn, that, 3);
    var length = toLength$3(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate$1;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3:
            return true;
          // some

          case 5:
            return value;
          // find

          case 6:
            return index;
          // findIndex

          case 2:
            push.call(target, value);
          // filter
        } else switch (TYPE) {
          case 4:
            return false;
          // every

          case 7:
            push.call(target, value);
          // filterReject
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$2(7)
};

var $$r = _export;
var global$4 = global$f;
var getBuiltIn$2 = getBuiltIn$6;
var DESCRIPTORS$7 = descriptors;
var NATIVE_SYMBOL = nativeSymbol;
var fails$7 = fails$h;
var has = has$a;
var isArray$8 = isArray$b;
var isObject$4 = isObject$d;
var isSymbol = isSymbol$4;
var anObject$1 = anObject$8;
var toObject$5 = toObject$b;
var toIndexedObject$4 = toIndexedObject$a;
var toPropertyKey = toPropertyKey$4;
var $toString = toString$8;
var createPropertyDescriptor = createPropertyDescriptor$5;
var nativeObjectCreate = objectCreate;
var objectKeys$2 = objectKeys$4;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createNonEnumerableProperty = createNonEnumerableProperty$8;
var redefine = redefine$2;
var shared = shared$4.exports;
var sharedKey = sharedKey$4;
var hiddenKeys = hiddenKeys$5;
var uid = uid$3;
var wellKnownSymbol$3 = wellKnownSymbol$i;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
var setToStringTag$1 = setToStringTag$4;
var InternalStateModule = internalState;
var $forEach$1 = arrayIteration.forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol$3('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global$4.Symbol;
var $stringify$1 = getBuiltIn$2('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global$4.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = DESCRIPTORS$7 && fails$7(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () {
      return nativeDefineProperty(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap$1 = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS$7) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject$1(O);
  var key = toPropertyKey(P);
  anObject$1(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject$1(O);
  var properties = toIndexedObject$4(Properties);
  var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
  $forEach$1(keys, function (key) {
    if (!DESCRIPTORS$7 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject$4(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$4(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$4(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor


if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (DESCRIPTORS$7 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap$1(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap$1(uid(description), description);
  });
  propertyIsEnumerableModule$1.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap$1(wellKnownSymbol$3(name), name);
  };

  if (DESCRIPTORS$7) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
  }
}

$$r({
  global: true,
  wrap: true,
  forced: !NATIVE_SYMBOL,
  sham: !NATIVE_SYMBOL
}, {
  Symbol: $Symbol
});
$forEach$1(objectKeys$2(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol$k(name);
});
$$r({
  target: SYMBOL,
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
$$r({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL,
  sham: !DESCRIPTORS$7
}, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$$r({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

$$r({
  target: 'Object',
  stat: true,
  forced: fails$7(function () {
    getOwnPropertySymbolsModule$2.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule$2.f(toObject$5(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify

if ($stringify$1) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$7(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify$1([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify$1({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify$1(Object(symbol)) != '{}';
  });
  $$r({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject$4(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray$8(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify$1.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag$1($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

var defineWellKnownSymbol$j = defineWellKnownSymbol$l; // `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator

defineWellKnownSymbol$j('asyncIterator');

var defineWellKnownSymbol$i = defineWellKnownSymbol$l; // `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance

defineWellKnownSymbol$i('hasInstance');

var defineWellKnownSymbol$h = defineWellKnownSymbol$l; // `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable

defineWellKnownSymbol$h('isConcatSpreadable');

var defineWellKnownSymbol$g = defineWellKnownSymbol$l; // `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator

defineWellKnownSymbol$g('iterator');

var defineWellKnownSymbol$f = defineWellKnownSymbol$l; // `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match

defineWellKnownSymbol$f('match');

var defineWellKnownSymbol$e = defineWellKnownSymbol$l; // `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall

defineWellKnownSymbol$e('matchAll');

var defineWellKnownSymbol$d = defineWellKnownSymbol$l; // `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace

defineWellKnownSymbol$d('replace');

var defineWellKnownSymbol$c = defineWellKnownSymbol$l; // `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search

defineWellKnownSymbol$c('search');

var defineWellKnownSymbol$b = defineWellKnownSymbol$l; // `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species

defineWellKnownSymbol$b('species');

var defineWellKnownSymbol$a = defineWellKnownSymbol$l; // `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split

defineWellKnownSymbol$a('split');

var defineWellKnownSymbol$9 = defineWellKnownSymbol$l; // `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive

defineWellKnownSymbol$9('toPrimitive');

var defineWellKnownSymbol$8 = defineWellKnownSymbol$l; // `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag

defineWellKnownSymbol$8('toStringTag');

var defineWellKnownSymbol$7 = defineWellKnownSymbol$l; // `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables

defineWellKnownSymbol$7('unscopables');

var global$3 = global$f;
var setToStringTag = setToStringTag$4; // JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag

setToStringTag(global$3.JSON, 'JSON', true);

var path$g = path$l;
var symbol$4 = path$g.Symbol;

var parent$y = symbol$4;
var symbol$3 = parent$y;

var defineWellKnownSymbol$6 = defineWellKnownSymbol$l; // `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol$6('asyncDispose');

var defineWellKnownSymbol$5 = defineWellKnownSymbol$l; // `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol$5('dispose');

var defineWellKnownSymbol$4 = defineWellKnownSymbol$l; // `Symbol.matcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching

defineWellKnownSymbol$4('matcher');

var defineWellKnownSymbol$3 = defineWellKnownSymbol$l; // `Symbol.metadata` well-known symbol
// https://github.com/tc39/proposal-decorators

defineWellKnownSymbol$3('metadata');

var defineWellKnownSymbol$2 = defineWellKnownSymbol$l; // `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable

defineWellKnownSymbol$2('observable');

var defineWellKnownSymbol$1 = defineWellKnownSymbol$l; // `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching

defineWellKnownSymbol$1('patternMatch');

var defineWellKnownSymbol = defineWellKnownSymbol$l;
defineWellKnownSymbol('replaceAll');

var parent$x = symbol$3; // TODO: Remove from `core-js@4`
// TODO: Remove from `core-js@4`

var symbol$2 = parent$x;

var symbol$1 = symbol$2;

var WrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var iterator$3 = WrappedWellKnownSymbolModule.f('iterator');

var parent$w = iterator$3;
var iterator$2 = parent$w;

var parent$v = iterator$2;
var iterator$1 = parent$v;

var iterator = iterator$1;

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof symbol$1 === "function" && typeof iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var $$q = _export;
var isArray$7 = isArray$b; // `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray

$$q({
  target: 'Array',
  stat: true
}, {
  isArray: isArray$7
});

var path$f = path$l;
var isArray$6 = path$f.Array.isArray;

var parent$u = isArray$6;
var isArray$5 = parent$u;

var parent$t = isArray$5;
var isArray$4 = parent$t;

var isArray$3 = isArray$4;

function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (isArray$3(arr)) return _arrayLikeToArray$3(arr);
}

var parent$s = from$3;
var from$1 = parent$s;

var from = from$1;

function _iterableToArray(iter) {
  if (typeof symbol$1 !== "undefined" && getIteratorMethod(iter) != null || iter["@@iterator"] != null) return from(iter);
}

var $$p = _export;
var isObject$3 = isObject$d;
var isArray$2 = isArray$b;
var toAbsoluteIndex$2 = toAbsoluteIndex$4;
var toLength$2 = toLength$7;
var toIndexedObject$3 = toIndexedObject$a;
var createProperty$2 = createProperty$5;
var wellKnownSymbol$2 = wellKnownSymbol$i;
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$3('slice');
var SPECIES = wellKnownSymbol$2('species');
var nativeSlice = [].slice;
var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$$p({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$3
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject$3(this);
    var length = toLength$2(O.length);
    var k = toAbsoluteIndex$2(start, length);
    var fin = toAbsoluteIndex$2(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray$2(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray$2(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$3(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);

    result.length = n;
    return result;
  }
});

var path$e = path$l;

var entryVirtual$d = function (CONSTRUCTOR) {
  return path$e[CONSTRUCTOR + 'Prototype'];
};

var entryVirtual$c = entryVirtual$d;
var slice$7 = entryVirtual$c('Array').slice;

var slice$6 = slice$7;
var ArrayPrototype$9 = Array.prototype;

var slice_1 = function (it) {
  var own = it.slice;
  return it === ArrayPrototype$9 || it instanceof Array && own === ArrayPrototype$9.slice ? slice$6 : own;
};

var parent$r = slice_1;
var slice$5 = parent$r;

var parent$q = slice$5;
var slice$4 = parent$q;

var slice$3 = slice$4;

function _unsupportedIterableToArray$3(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);

  var n = slice$3(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread();
}

var symbol = symbol$3;

var entryVirtual$b = entryVirtual$d;
var concat$3 = entryVirtual$b('Array').concat;

var concat$2 = concat$3;
var ArrayPrototype$8 = Array.prototype;

var concat_1 = function (it) {
  var own = it.concat;
  return it === ArrayPrototype$8 || it instanceof Array && own === ArrayPrototype$8.concat ? concat$2 : own;
};

var parent$p = concat_1;
var concat$1 = parent$p;

var concat = concat$1;

var slice$2 = slice$5;

var getBuiltIn$1 = getBuiltIn$6;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject = anObject$8; // all object keys, includes non-enumerable and symbols

var ownKeys$6 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var $$o = _export;
var ownKeys$5 = ownKeys$6; // `Reflect.ownKeys` method
// https://tc39.es/ecma262/#sec-reflect.ownkeys

$$o({
  target: 'Reflect',
  stat: true
}, {
  ownKeys: ownKeys$5
});

var path$d = path$l;
var ownKeys$4 = path$d.Reflect.ownKeys;

var parent$o = ownKeys$4;
var ownKeys$3 = parent$o;

var ownKeys$2 = ownKeys$3;

var isArray$1 = isArray$5;

var $$n = _export;
var $map = arrayIteration.map;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map'); // `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species

$$n({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$2
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var entryVirtual$a = entryVirtual$d;
var map$3 = entryVirtual$a('Array').map;

var map$2 = map$3;
var ArrayPrototype$7 = Array.prototype;

var map_1 = function (it) {
  var own = it.map;
  return it === ArrayPrototype$7 || it instanceof Array && own === ArrayPrototype$7.map ? map$2 : own;
};

var parent$n = map_1;
var map$1 = parent$n;

var map = map$1;

var $$m = _export;
var toObject$4 = toObject$b;
var nativeKeys = objectKeys$4;
var fails$6 = fails$h;
var FAILS_ON_PRIMITIVES$2 = fails$6(function () {
  nativeKeys(1);
}); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys

$$m({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$2
}, {
  keys: function keys(it) {
    return nativeKeys(toObject$4(it));
  }
});

var path$c = path$l;
var keys$2 = path$c.Object.keys;

var parent$m = keys$2;
var keys$1 = parent$m;

var keys = keys$1;

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof symbol !== "undefined" && getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { var _context3; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = slice$2(_context3 = Object.prototype.toString.call(o)).call(_context3, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Use this symbol to delete properies in deepObjectAssign.
 */
var DELETE = symbol("DELETE");
/**
 * Pure version of deepObjectAssign, it doesn't modify any of it's arguments.
 *
 * @param base - The base object that fullfils the whole interface T.
 * @param updates - Updates that may change or delete props.
 * @returns A brand new instance with all the supplied objects deeply merged.
 */

function pureDeepObjectAssign(base) {
  var _context;

  for (var _len = arguments.length, updates = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    updates[_key - 1] = arguments[_key];
  }

  return deepObjectAssign.apply(void 0, concat(_context = [{}, base]).call(_context, updates));
}
/**
 * Deep version of object assign with additional deleting by the DELETE symbol.
 *
 * @param values - Objects to be deeply merged.
 * @returns The first object from values.
 */

function deepObjectAssign() {
  var merged = deepObjectAssignNonentry.apply(void 0, arguments);
  stripDelete(merged);
  return merged;
}
/**
 * Deep version of object assign with additional deleting by the DELETE symbol.
 *
 * @remarks
 * This doesn't strip the DELETE symbols so they may end up in the final object.
 * @param values - Objects to be deeply merged.
 * @returns The first object from values.
 */

function deepObjectAssignNonentry() {
  for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    values[_key2] = arguments[_key2];
  }

  if (values.length < 2) {
    return values[0];
  } else if (values.length > 2) {
    var _context2;

    return deepObjectAssignNonentry.apply(void 0, concat(_context2 = [deepObjectAssign(values[0], values[1])]).call(_context2, _toConsumableArray(slice$2(values).call(values, 2))));
  }

  var a = values[0];
  var b = values[1];

  var _iterator = _createForOfIteratorHelper$2(ownKeys$2(b)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var prop = _step.value;

      if (!Object.prototype.propertyIsEnumerable.call(b, prop)) {// Ignore nonenumerable props, Object.assign() would do the same.
      } else if (b[prop] === DELETE) {
        delete a[prop];
      } else if (a[prop] !== null && b[prop] !== null && _typeof(a[prop]) === "object" && _typeof(b[prop]) === "object" && !isArray$1(a[prop]) && !isArray$1(b[prop])) {
        a[prop] = deepObjectAssignNonentry(a[prop], b[prop]);
      } else {
        a[prop] = clone(b[prop]);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return a;
}
/**
 * Deep clone given object or array. In case of primitive simply return.
 *
 * @param a - Anything.
 * @returns Deep cloned object/array or unchanged a.
 */


function clone(a) {
  if (isArray$1(a)) {
    return map(a).call(a, function (value) {
      return clone(value);
    });
  } else if (_typeof(a) === "object" && a !== null) {
    return deepObjectAssignNonentry({}, a);
  } else {
    return a;
  }
}
/**
 * Strip DELETE from given object.
 *
 * @param a - Object which may contain DELETE but won't after this is executed.
 */


function stripDelete(a) {
  for (var _i = 0, _Object$keys = keys(a); _i < _Object$keys.length; _i++) {
    var prop = _Object$keys[_i];

    if (a[prop] === DELETE) {
      delete a[prop];
    } else if (_typeof(a[prop]) === "object" && a[prop] !== null) {
      stripDelete(a[prop]);
    }
  }
}

function _arrayWithHoles(arr) {
  if (isArray$3(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof symbol$1 !== "undefined" && getIteratorMethod(arr) || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest();
}

var $$l = _export; // `Date.now` method
// https://tc39.es/ecma262/#sec-date.now

$$l({
  target: 'Date',
  stat: true
}, {
  now: function now() {
    return new Date().getTime();
  }
});

var path$b = path$l;
var now$3 = path$b.Date.now;

var parent$l = now$3;
var now$2 = parent$l;

var now$1 = now$2;

/**
 * Seedable, fast and reasonably good (not crypto but more than okay for our
 * needs) random number generator.
 *
 * @remarks
 * Adapted from {@link https://web.archive.org/web/20110429100736/http://baagoe.com:80/en/RandomMusings/javascript}.
 * Original algorithm created by Johannes Baagøe \<baagoe\@baagoe.com\> in 2010.
 */

/**
 * Create a seeded pseudo random generator based on Alea by Johannes Baagøe.
 *
 * @param seed - All supplied arguments will be used as a seed. In case nothing
 * is supplied the current time will be used to seed the generator.
 * @returns A ready to use seeded generator.
 */
function Alea() {
  for (var _len = arguments.length, seed = new Array(_len), _key = 0; _key < _len; _key++) {
    seed[_key] = arguments[_key];
  }

  return AleaImplementation(seed.length ? seed : [now$1()]);
}
/**
 * An implementation of [[Alea]] without user input validation.
 *
 * @param seed - The data that will be used to seed the generator.
 * @returns A ready to use seeded generator.
 */

function AleaImplementation(seed) {
  var _mashSeed = mashSeed(seed),
      _mashSeed2 = _slicedToArray(_mashSeed, 3),
      s0 = _mashSeed2[0],
      s1 = _mashSeed2[1],
      s2 = _mashSeed2[2];

  var c = 1;

  var random = function random() {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

    s0 = s1;
    s1 = s2;
    return s2 = t - (c = t | 0);
  };

  random.uint32 = function () {
    return random() * 0x100000000;
  }; // 2^32


  random.fract53 = function () {
    return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16;
  }; // 2^-53


  random.algorithm = "Alea";
  random.seed = seed;
  random.version = "0.9";
  return random;
}
/**
 * Turn arbitrary data into values [[AleaImplementation]] can use to generate
 * random numbers.
 *
 * @param seed - Arbitrary data that will be used as the seed.
 * @returns Three numbers to use as initial values for [[AleaImplementation]].
 */


function mashSeed() {
  var mash = Mash();
  var s0 = mash(" ");
  var s1 = mash(" ");
  var s2 = mash(" ");

  for (var i = 0; i < arguments.length; i++) {
    s0 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (s0 < 0) {
      s0 += 1;
    }

    s1 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (s1 < 0) {
      s1 += 1;
    }

    s2 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (s2 < 0) {
      s2 += 1;
    }
  }

  return [s0, s1, s2];
}
/**
 * Create a new mash function.
 *
 * @returns A nonpure function that takes arbitrary [[Mashable]] data and turns
 * them into numbers.
 */


function Mash() {
  var n = 0xefc8249d;
  return function (data) {
    var string = data.toString();

    for (var i = 0; i < string.length; i++) {
      n += string.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
}

var aFunction = aFunction$2;
var isObject$2 = isObject$d;
var slice$1 = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only


    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind


var functionBind = Function.bind || function bind(that
/* , ...args */
) {
  var fn = aFunction(this);
  var partArgs = slice$1.call(arguments, 1);

  var boundFunction = function bound() {
    var args = partArgs.concat(slice$1.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };

  if (isObject$2(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

var $$k = _export;
var bind$4 = functionBind; // `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind

$$k({
  target: 'Function',
  proto: true
}, {
  bind: bind$4
});

var entryVirtual$9 = entryVirtual$d;
var bind$3 = entryVirtual$9('Function').bind;

var bind$2 = bind$3;
var FunctionPrototype = Function.prototype;

var bind_1 = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || it instanceof Function && own === FunctionPrototype.bind ? bind$2 : own;
};

var parent$k = bind_1;
var bind$1 = parent$k;

var bind = bind$1;

var fails$5 = fails$h;

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$5(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var $forEach = arrayIteration.forEach;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;
var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach

var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var $$j = _export;
var forEach$5 = arrayForEach; // `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe

$$j({
  target: 'Array',
  proto: true,
  forced: [].forEach != forEach$5
}, {
  forEach: forEach$5
});

var entryVirtual$8 = entryVirtual$d;
var forEach$4 = entryVirtual$8('Array').forEach;

var parent$j = forEach$4;
var forEach$3 = parent$j;

var forEach$2 = forEach$3;
var classof$1 = classof$6;
var ArrayPrototype$6 = Array.prototype;
var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

var forEach_1 = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype$6 || it instanceof Array && own === ArrayPrototype$6.forEach // eslint-disable-next-line no-prototype-builtins -- safe
  || DOMIterables.hasOwnProperty(classof$1(it)) ? forEach$2 : own;
};

var forEach$1 = forEach_1;

var $$i = _export;
var isArray = isArray$b;
var nativeReverse = [].reverse;
var test = [1, 2]; // `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794

$$i({
  target: 'Array',
  proto: true,
  forced: String(test) === String(test.reverse())
}, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

var entryVirtual$7 = entryVirtual$d;
var reverse$3 = entryVirtual$7('Array').reverse;

var reverse$2 = reverse$3;
var ArrayPrototype$5 = Array.prototype;

var reverse_1 = function (it) {
  var own = it.reverse;
  return it === ArrayPrototype$5 || it instanceof Array && own === ArrayPrototype$5.reverse ? reverse$2 : own;
};

var parent$i = reverse_1;
var reverse$1 = parent$i;

var reverse = reverse$1;

var $$h = _export;
var toAbsoluteIndex$1 = toAbsoluteIndex$4;
var toInteger = toInteger$4;
var toLength$1 = toLength$7;
var toObject$3 = toObject$b;
var arraySpeciesCreate = arraySpeciesCreate$3;
var createProperty$1 = createProperty$5;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('splice');
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$$h({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$1
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject$3(this);
    var len = toLength$1(O.length);
    var actualStart = toAbsoluteIndex$1(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty$1(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var entryVirtual$6 = entryVirtual$d;
var splice$3 = entryVirtual$6('Array').splice;

var splice$2 = splice$3;
var ArrayPrototype$4 = Array.prototype;

var splice_1 = function (it) {
  var own = it.splice;
  return it === ArrayPrototype$4 || it instanceof Array && own === ArrayPrototype$4.splice ? splice$2 : own;
};

var parent$h = splice_1;
var splice$1 = parent$h;

var splice = splice$1;

var componentEmitter = {exports: {}};

(function (module) {
  /**
   * Expose `Emitter`.
   */
  {
    module.exports = Emitter;
  }
  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */


  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }

    return obj;
  }
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
  };
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {}; // all

    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    } // specific event


    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this; // remove all handlers

    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    } // remove specific handler


    var cb;

    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];

      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    } // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.


    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };
  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */


  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1),
        callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);

      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };
  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */


  Emitter.prototype.listeners = function (event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };
  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */


  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };
})(componentEmitter);

var Emitter = componentEmitter.exports;

/*! Hammer.JS - v2.0.17-rc - 2019-12-16
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */


var assign$4;

if (typeof Object.assign !== 'function') {
  assign$4 = function assign(target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];

      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }

    return output;
  };
} else {
  assign$4 = Object.assign;
}

var assign$1$1 = assign$4;
var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = typeof document === "undefined" ? {
  style: {}
} : document.createElement('div');
var TYPE_FUNCTION = 'function';
var round = Math.round,
    abs = Math.abs;
var now = Date.now;
/**
 * @private
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */

function prefixed(obj, property) {
  var prefix;
  var prop;
  var camelProp = property[0].toUpperCase() + property.slice(1);
  var i = 0;

  while (i < VENDOR_PREFIXES.length) {
    prefix = VENDOR_PREFIXES[i];
    prop = prefix ? prefix + camelProp : property;

    if (prop in obj) {
      return prop;
    }

    i++;
  }

  return undefined;
}
/* eslint-disable no-new-func, no-nested-ternary */


var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {};
} else {
  win = window;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

function getTouchActionProps() {
  if (!NATIVE_TOUCH_ACTION) {
    return false;
  }

  var touchMap = {};
  var cssSupports = win.CSS && win.CSS.supports;
  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
    // If css.supports is not supported but there is native touch-action assume it supports
    // all values. This is the case for IE 10 and 11.
    return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
  });
  return touchMap;
}

var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();
var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
var SUPPORT_TOUCH = ('ontouchstart' in win);
var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';
var COMPUTE_INTERVAL = 25;
var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;
var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];
/**
 * @private
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */

function each(obj, iterator, context) {
  var i;

  if (!obj) {
    return;
  }

  if (obj.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;

    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (i in obj) {
      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
    }
  }
}
/**
 * @private
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */


function boolOrFn(val, args) {
  if (typeof val === TYPE_FUNCTION) {
    return val.apply(args ? args[0] || undefined : undefined, args);
  }

  return val;
}
/**
 * @private
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */


function inStr(str, find) {
  return str.indexOf(find) > -1;
}
/**
 * @private
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */


function cleanTouchActions(actions) {
  // none
  if (inStr(actions, TOUCH_ACTION_NONE)) {
    return TOUCH_ACTION_NONE;
  }

  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
  // for different directions, e.g. horizontal pan but vertical swipe?)
  // we need none (as otherwise with pan-x pan-y combined none of these
  // recognizers will work, since the browser would handle all panning

  if (hasPanX && hasPanY) {
    return TOUCH_ACTION_NONE;
  } // pan-x OR pan-y


  if (hasPanX || hasPanY) {
    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
  } // manipulation


  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
    return TOUCH_ACTION_MANIPULATION;
  }

  return TOUCH_ACTION_AUTO;
}
/**
 * @private
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */


var TouchAction = /*#__PURE__*/function () {
  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }
  /**
   * @private
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */


  var _proto = TouchAction.prototype;

  _proto.set = function set(value) {
    // find out the touch-action by the event handlers
    if (value === TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }

    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
    }

    this.actions = value.toLowerCase().trim();
  };
  /**
   * @private
   * just re-set the touchAction value
   */


  _proto.update = function update() {
    this.set(this.manager.options.touchAction);
  };
  /**
   * @private
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */


  _proto.compute = function compute() {
    var actions = [];
    each(this.manager.recognizers, function (recognizer) {
      if (boolOrFn(recognizer.options.enable, [recognizer])) {
        actions = actions.concat(recognizer.getTouchAction());
      }
    });
    return cleanTouchActions(actions.join(' '));
  };
  /**
   * @private
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */


  _proto.preventDefaults = function preventDefaults(input) {
    var srcEvent = input.srcEvent;
    var direction = input.offsetDirection; // if the touch action did prevented once this session

    if (this.manager.session.prevented) {
      srcEvent.preventDefault();
      return;
    }

    var actions = this.actions;
    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

    if (hasNone) {
      // do not prevent defaults if this is a tap gesture
      var isTapPointer = input.pointers.length === 1;
      var isTapMovement = input.distance < 2;
      var isTapTouchTime = input.deltaTime < 250;

      if (isTapPointer && isTapMovement && isTapTouchTime) {
        return;
      }
    }

    if (hasPanX && hasPanY) {
      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
      return;
    }

    if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
      return this.preventSrc(srcEvent);
    }
  };
  /**
   * @private
   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
   * @param {Object} srcEvent
   */


  _proto.preventSrc = function preventSrc(srcEvent) {
    this.manager.session.prevented = true;
    srcEvent.preventDefault();
  };

  return TouchAction;
}();
/**
 * @private
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */


function hasParent$1(node, parent) {
  while (node) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}
/**
 * @private
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */


function getCenter(pointers) {
  var pointersLength = pointers.length; // no need to loop when only one touch

  if (pointersLength === 1) {
    return {
      x: round(pointers[0].clientX),
      y: round(pointers[0].clientY)
    };
  }

  var x = 0;
  var y = 0;
  var i = 0;

  while (i < pointersLength) {
    x += pointers[i].clientX;
    y += pointers[i].clientY;
    i++;
  }

  return {
    x: round(x / pointersLength),
    y: round(y / pointersLength)
  };
}
/**
 * @private
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */


function simpleCloneInputData(input) {
  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = [];
  var i = 0;

  while (i < input.pointers.length) {
    pointers[i] = {
      clientX: round(input.pointers[i].clientX),
      clientY: round(input.pointers[i].clientY)
    };
    i++;
  }

  return {
    timeStamp: now(),
    pointers: pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}
/**
 * @private
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */


function getDistance(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.sqrt(x * x + y * y);
}
/**
 * @private
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */


function getAngle(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.atan2(y, x) * 180 / Math.PI;
}
/**
 * @private
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */


function getDirection(x, y) {
  if (x === y) {
    return DIRECTION_NONE;
  }

  if (abs(x) >= abs(y)) {
    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }

  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

function computeDeltaXY(session, input) {
  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
  // jscs throwing error on defalut destructured values and without defaults tests fail

  var offset = session.offsetDelta || {};
  var prevDelta = session.prevDelta || {};
  var prevInput = session.prevInput || {};

  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
    prevDelta = session.prevDelta = {
      x: prevInput.deltaX || 0,
      y: prevInput.deltaY || 0
    };
    offset = session.offsetDelta = {
      x: center.x,
      y: center.y
    };
  }

  input.deltaX = prevDelta.x + (center.x - offset.x);
  input.deltaY = prevDelta.y + (center.y - offset.y);
}
/**
 * @private
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */


function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
}
/**
 * @private
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */


function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}
/**
 * @private
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */


function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}
/**
 * @private
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */


function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input;
  var deltaTime = input.timeStamp - last.timeStamp;
  var velocity;
  var velocityX;
  var velocityY;
  var direction;

  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = input.deltaX - last.deltaX;
    var deltaY = input.deltaY - last.deltaY;
    var v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
    direction = getDirection(deltaX, deltaY);
    session.lastInterval = input;
  } else {
    // use latest velocity info if it doesn't overtake a minimum period
    velocity = last.velocity;
    velocityX = last.velocityX;
    velocityY = last.velocityY;
    direction = last.direction;
  }

  input.velocity = velocity;
  input.velocityX = velocityX;
  input.velocityY = velocityY;
  input.direction = direction;
}
/**
* @private
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */


function computeInputData(manager, input) {
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

  if (!session.firstInput) {
    session.firstInput = simpleCloneInputData(input);
  } // to compute scale and rotation we need to store the multiple touches


  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput,
      firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  var center = input.center = getCenter(pointers);
  input.timeStamp = now();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getAngle(offsetCenter, center);
  input.distance = getDistance(offsetCenter, center);
  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  computeIntervalInputData(session, input); // find the correct target

  var target = manager.element;
  var srcEvent = input.srcEvent;
  var srcEventTarget;

  if (srcEvent.composedPath) {
    srcEventTarget = srcEvent.composedPath()[0];
  } else if (srcEvent.path) {
    srcEventTarget = srcEvent.path[0];
  } else {
    srcEventTarget = srcEvent.target;
  }

  if (hasParent$1(srcEventTarget, target)) {
    target = srcEventTarget;
  }

  input.target = target;
}
/**
 * @private
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */


function inputHandler(manager, eventType, input) {
  var pointersLen = input.pointers.length;
  var changedPointersLen = input.changedPointers.length;
  var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
  var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
  input.isFirst = !!isFirst;
  input.isFinal = !!isFinal;

  if (isFirst) {
    manager.session = {};
  } // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'


  input.eventType = eventType; // compute scale, rotation etc

  computeInputData(manager, input); // emit secret event

  manager.emit('hammer.input', input);
  manager.recognize(input);
  manager.session.prevInput = input;
}
/**
 * @private
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */


function splitStr(str) {
  return str.trim().split(/\s+/g);
}
/**
 * @private
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */


function addEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.addEventListener(type, handler, false);
  });
}
/**
 * @private
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */


function removeEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.removeEventListener(type, handler, false);
  });
}
/**
 * @private
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */


function getWindowForElement(element) {
  var doc = element.ownerDocument || element;
  return doc.defaultView || doc.parentWindow || window;
}
/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */


var Input = /*#__PURE__*/function () {
  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */


  var _proto = Input.prototype;

  _proto.handler = function handler() {};
  /**
   * @private
   * bind the events
   */


  _proto.init = function init() {
    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };
  /**
   * @private
   * unbind the events
   */


  _proto.destroy = function destroy() {
    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };

  return Input;
}();
/**
 * @private
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */


function inArray(src, find, findByKey) {
  if (src.indexOf && !findByKey) {
    return src.indexOf(find);
  } else {
    var i = 0;

    while (i < src.length) {
      if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
        // do not use === here, test fails
        return i;
      }

      i++;
    }

    return -1;
  }
}

var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
}; // in IE10 the pointer types is defined as an enum

var IE10_POINTER_TYPE_ENUM = {
  2: INPUT_TYPE_TOUCH,
  3: INPUT_TYPE_PEN,
  4: INPUT_TYPE_MOUSE,
  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

};
var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

if (win.MSPointerEvent && !win.PointerEvent) {
  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}
/**
 * @private
 * Pointer events input
 * @constructor
 * @extends Input
 */


var PointerEventInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(PointerEventInput, _Input);

  function PointerEventInput() {
    var _this;

    var proto = PointerEventInput.prototype;
    proto.evEl = POINTER_ELEMENT_EVENTS;
    proto.evWin = POINTER_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.store = _this.manager.session.pointerEvents = [];
    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = PointerEventInput.prototype;

  _proto.handler = function handler(ev) {
    var store = this.store;
    var removePointer = false;
    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

    var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      removePointer = true;
    } // it not found, so the pointer hasn't been down (so it's probably a hover)


    if (storeIndex < 0) {
      return;
    } // update the event in the store


    store[storeIndex] = ev;
    this.callback(this.manager, eventType, {
      pointers: store,
      changedPointers: [ev],
      pointerType: pointerType,
      srcEvent: ev
    });

    if (removePointer) {
      // remove from the store
      store.splice(storeIndex, 1);
    }
  };

  return PointerEventInput;
}(Input);
/**
 * @private
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */


function toArray$1(obj) {
  return Array.prototype.slice.call(obj, 0);
}
/**
 * @private
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */


function uniqueArray(src, key, sort) {
  var results = [];
  var values = [];
  var i = 0;

  while (i < src.length) {
    var val = key ? src[i][key] : src[i];

    if (inArray(values, val) < 0) {
      results.push(src[i]);
    }

    values[i] = val;
    i++;
  }

  if (sort) {
    if (!key) {
      results = results.sort();
    } else {
      results = results.sort(function (a, b) {
        return a[key] > b[key];
      });
    }
  }

  return results;
}

var TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */

var TouchInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(TouchInput, _Input);

  function TouchInput() {
    var _this;

    TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

    return _this;
  }

  var _proto = TouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = getTouches.call(this, ev, type);

    if (!touches) {
      return;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return TouchInput;
}(Input);

function getTouches(ev, type) {
  var allTouches = toArray$1(ev.touches);
  var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
    targetIds[allTouches[0].identifier] = true;
    return [allTouches, allTouches];
  }

  var i;
  var targetTouches;
  var changedTouches = toArray$1(ev.changedTouches);
  var changedTargetTouches = [];
  var target = this.target; // get target touches from touches

  targetTouches = allTouches.filter(function (touch) {
    return hasParent$1(touch.target, target);
  }); // collect touches

  if (type === INPUT_START) {
    i = 0;

    while (i < targetTouches.length) {
      targetIds[targetTouches[i].identifier] = true;
      i++;
    }
  } // filter changed touches to only contain touches that exist in the collected target ids


  i = 0;

  while (i < changedTouches.length) {
    if (targetIds[changedTouches[i].identifier]) {
      changedTargetTouches.push(changedTouches[i]);
    } // cleanup removed touches


    if (type & (INPUT_END | INPUT_CANCEL)) {
      delete targetIds[changedTouches[i].identifier];
    }

    i++;
  }

  if (!changedTargetTouches.length) {
    return;
  }

  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
  uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
}

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
/**
 * @private
 * Mouse events input
 * @constructor
 * @extends Input
 */

var MouseInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(MouseInput, _Input);

  function MouseInput() {
    var _this;

    var proto = MouseInput.prototype;
    proto.evEl = MOUSE_ELEMENT_EVENTS;
    proto.evWin = MOUSE_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.pressed = false; // mousedown state

    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = MouseInput.prototype;

  _proto.handler = function handler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    } // mouse must be down


    if (!this.pressed) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  };

  return MouseInput;
}(Input);
/**
 * @private
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */


var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function setLastTouch(eventData) {
  var _eventData$changedPoi = eventData.changedPointers,
      touch = _eventData$changedPoi[0];

  if (touch.identifier === this.primaryTouch) {
    var lastTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    var lts = this.lastTouches;
    this.lastTouches.push(lastTouch);

    var removeLastTouch = function removeLastTouch() {
      var i = lts.indexOf(lastTouch);

      if (i > -1) {
        lts.splice(i, 1);
      }
    };

    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
  }
}

function recordTouches(eventType, eventData) {
  if (eventType & INPUT_START) {
    this.primaryTouch = eventData.changedPointers[0].identifier;
    setLastTouch.call(this, eventData);
  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
    setLastTouch.call(this, eventData);
  }
}

function isSyntheticEvent(eventData) {
  var x = eventData.srcEvent.clientX;
  var y = eventData.srcEvent.clientY;

  for (var i = 0; i < this.lastTouches.length; i++) {
    var t = this.lastTouches[i];
    var dx = Math.abs(x - t.x);
    var dy = Math.abs(y - t.y);

    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
      return true;
    }
  }

  return false;
}

var TouchMouseInput = /*#__PURE__*/function () {
  var TouchMouseInput = /*#__PURE__*/function (_Input) {
    _inheritsLoose(TouchMouseInput, _Input);

    function TouchMouseInput(_manager, callback) {
      var _this;

      _this = _Input.call(this, _manager, callback) || this;

      _this.handler = function (manager, inputEvent, inputData) {
        var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
        var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
          return;
        } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


        if (isTouch) {
          recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
          return;
        }

        _this.callback(manager, inputEvent, inputData);
      };

      _this.touch = new TouchInput(_this.manager, _this.handler);
      _this.mouse = new MouseInput(_this.manager, _this.handler);
      _this.primaryTouch = null;
      _this.lastTouches = [];
      return _this;
    }
    /**
     * @private
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */


    var _proto = TouchMouseInput.prototype;
    /**
     * @private
     * remove the event listeners
     */

    _proto.destroy = function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    };

    return TouchMouseInput;
  }(Input);

  return TouchMouseInput;
}();
/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */


function createInputInstance(manager) {
  var Type; // let inputClass = manager.options.inputClass;

  var inputClass = manager.options.inputClass;

  if (inputClass) {
    Type = inputClass;
  } else if (SUPPORT_POINTER_EVENTS) {
    Type = PointerEventInput;
  } else if (SUPPORT_ONLY_TOUCH) {
    Type = TouchInput;
  } else if (!SUPPORT_TOUCH) {
    Type = MouseInput;
  } else {
    Type = TouchMouseInput;
  }

  return new Type(manager, inputHandler);
}
/**
 * @private
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */


function invokeArrayArg(arg, fn, context) {
  if (Array.isArray(arg)) {
    each(arg, context[fn], context);
    return true;
  }

  return false;
}

var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;
/**
 * @private
 * get a unique id
 * @returns {number} uniqueId
 */

var _uniqueId = 1;

function uniqueId() {
  return _uniqueId++;
}
/**
 * @private
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */


function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
  var manager = recognizer.manager;

  if (manager) {
    return manager.get(otherRecognizer);
  }

  return otherRecognizer;
}
/**
 * @private
 * get a usable string, used as event postfix
 * @param {constant} state
 * @returns {String} state
 */


function stateStr(state) {
  if (state & STATE_CANCELLED) {
    return 'cancel';
  } else if (state & STATE_ENDED) {
    return 'end';
  } else if (state & STATE_CHANGED) {
    return 'move';
  } else if (state & STATE_BEGAN) {
    return 'start';
  }

  return '';
}
/**
 * @private
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */

/**
 * @private
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */


var Recognizer = /*#__PURE__*/function () {
  function Recognizer(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = _extends({
      enable: true
    }, options);
    this.id = uniqueId();
    this.manager = null; // default is enable true

    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */


  var _proto = Recognizer.prototype;

  _proto.set = function set(options) {
    assign$1$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

    this.manager && this.manager.touchAction.update();
    return this;
  };
  /**
   * @private
   * recognize simultaneous with an other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.recognizeWith = function recognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
      return this;
    }

    var simultaneous = this.simultaneous;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }

    return this;
  };
  /**
   * @private
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    delete this.simultaneous[otherRecognizer.id];
    return this;
  };
  /**
   * @private
   * recognizer can only run when an other is failing
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.requireFailure = function requireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
      return this;
    }

    var requireFail = this.requireFail;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (inArray(requireFail, otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }

    return this;
  };
  /**
   * @private
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    var index = inArray(this.requireFail, otherRecognizer);

    if (index > -1) {
      this.requireFail.splice(index, 1);
    }

    return this;
  };
  /**
   * @private
   * has require failures boolean
   * @returns {boolean}
   */


  _proto.hasRequireFailures = function hasRequireFailures() {
    return this.requireFail.length > 0;
  };
  /**
   * @private
   * if the recognizer can recognize simultaneous with an other recognizer
   * @param {Recognizer} otherRecognizer
   * @returns {Boolean}
   */


  _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
    return !!this.simultaneous[otherRecognizer.id];
  };
  /**
   * @private
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */


  _proto.emit = function emit(input) {
    var self = this;
    var state = this.state;

    function emit(event) {
      self.manager.emit(event, input);
    } // 'panstart' and 'panmove'


    if (state < STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }

    emit(self.options.event); // simple 'eventName' events

    if (input.additionalEvent) {
      // additional event(panleft, panright, pinchin, pinchout...)
      emit(input.additionalEvent);
    } // panend and pancancel


    if (state >= STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }
  };
  /**
   * @private
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */


  _proto.tryEmit = function tryEmit(input) {
    if (this.canEmit()) {
      return this.emit(input);
    } // it's failing anyway


    this.state = STATE_FAILED;
  };
  /**
   * @private
   * can we emit?
   * @returns {boolean}
   */


  _proto.canEmit = function canEmit() {
    var i = 0;

    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
        return false;
      }

      i++;
    }

    return true;
  };
  /**
   * @private
   * update the recognizer
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    var inputDataClone = assign$1$1({}, inputData); // is is enabled and allow recognizing?

    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    } // reset when we've reached the end


    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
    // so trigger an event

    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.tryEmit(inputDataClone);
    }
  };
  /**
   * @private
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {constant} STATE
   */

  /* jshint ignore:start */


  _proto.process = function process(inputData) {};
  /* jshint ignore:end */

  /**
   * @private
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */


  _proto.getTouchAction = function getTouchAction() {};
  /**
   * @private
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */


  _proto.reset = function reset() {};

  return Recognizer;
}();
/**
 * @private
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */


var TapRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(TapRecognizer, _Recognizer);

  function TapRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10
    }, options)) || this; // previous time and center,
    // used for tap counting

    _this.pTime = false;
    _this.pCenter = false;
    _this._timer = null;
    _this._input = null;
    _this.count = 0;
    return _this;
  }

  var _proto = TapRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;
    this.reset();

    if (input.eventType & INPUT_START && this.count === 0) {
      return this.failTimeout();
    } // we only allow little movement
    // and we've reached an end event, so a tap is possible


    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== INPUT_END) {
        return this.failTimeout();
      }

      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input; // if tap count matches we have recognized it,
      // else it has began recognizing...

      var tapCount = this.count % options.taps;

      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = setTimeout(function () {
            _this2.state = STATE_RECOGNIZED;

            _this2.tryEmit();
          }, options.interval);
          return STATE_BEGAN;
        }
      }
    }

    return STATE_FAILED;
  };

  _proto.failTimeout = function failTimeout() {
    var _this3 = this;

    this._timer = setTimeout(function () {
      _this3.state = STATE_FAILED;
    }, this.options.interval);
    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit() {
    if (this.state === STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  };

  return TapRecognizer;
}(Recognizer);
/**
 * @private
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */


var AttrRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(AttrRecognizer, _Recognizer);

  function AttrRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _Recognizer.call(this, _extends({
      pointers: 1
    }, options)) || this;
  }
  /**
   * @private
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */


  var _proto = AttrRecognizer.prototype;

  _proto.attrTest = function attrTest(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  };
  /**
   * @private
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */


  _proto.process = function process(input) {
    var state = this.state;
    var eventType = input.eventType;
    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    } else if (isRecognized || isValid) {
      if (eventType & INPUT_END) {
        return state | STATE_ENDED;
      } else if (!(state & STATE_BEGAN)) {
        return STATE_BEGAN;
      }

      return state | STATE_CHANGED;
    }

    return STATE_FAILED;
  };

  return AttrRecognizer;
}(Recognizer);
/**
 * @private
 * direction cons to string
 * @param {constant} direction
 * @returns {String}
 */


function directionStr(direction) {
  if (direction === DIRECTION_DOWN) {
    return 'down';
  } else if (direction === DIRECTION_UP) {
    return 'up';
  } else if (direction === DIRECTION_LEFT) {
    return 'left';
  } else if (direction === DIRECTION_RIGHT) {
    return 'right';
  }

  return '';
}
/**
 * @private
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */


var PanRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(PanRecognizer, _AttrRecognizer);

  function PanRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _AttrRecognizer.call(this, _extends({
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    }, options)) || this;
    _this.pX = null;
    _this.pY = null;
    return _this;
  }

  var _proto = PanRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    var direction = this.options.direction;
    var actions = [];

    if (direction & DIRECTION_HORIZONTAL) {
      actions.push(TOUCH_ACTION_PAN_Y);
    }

    if (direction & DIRECTION_VERTICAL) {
      actions.push(TOUCH_ACTION_PAN_X);
    }

    return actions;
  };

  _proto.directionTest = function directionTest(input) {
    var options = this.options;
    var hasMoved = true;
    var distance = input.distance;
    var direction = input.direction;
    var x = input.deltaX;
    var y = input.deltaY; // lock to axis?

    if (!(direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = x !== this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = y !== this.pY;
        distance = Math.abs(input.deltaY);
      }
    }

    input.direction = direction;
    return hasMoved && distance > options.threshold && direction & options.direction;
  };

  _proto.attrTest = function attrTest(input) {
    return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
    this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
  };

  _proto.emit = function emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    var direction = directionStr(input.direction);

    if (direction) {
      input.additionalEvent = this.options.event + direction;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PanRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */


var SwipeRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

  function SwipeRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    }, options)) || this;
  }

  var _proto = SwipeRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  };

  _proto.attrTest = function attrTest(input) {
    var direction = this.options.direction;
    var velocity;

    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
      velocity = input.overallVelocity;
    } else if (direction & DIRECTION_HORIZONTAL) {
      velocity = input.overallVelocityX;
    } else if (direction & DIRECTION_VERTICAL) {
      velocity = input.overallVelocityY;
    }

    return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
  };

  _proto.emit = function emit(input) {
    var direction = directionStr(input.offsetDirection);

    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }

    this.manager.emit(this.options.event, input);
  };

  return SwipeRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */


var PinchRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(PinchRecognizer, _AttrRecognizer);

  function PinchRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'pinch',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = PinchRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  };

  _proto.emit = function emit(input) {
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      input.additionalEvent = this.options.event + inOut;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PinchRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */


var RotateRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(RotateRecognizer, _AttrRecognizer);

  function RotateRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'rotate',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = RotateRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
  };

  return RotateRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */


var PressRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(PressRecognizer, _Recognizer);

  function PressRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'press',
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9
    }, options)) || this;
    _this._timer = null;
    _this._input = null;
    return _this;
  }

  var _proto = PressRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTime = input.deltaTime > options.time;
    this._input = input; // we only allow little movement
    // and we've reached an end event, so a tap is possible

    if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
      this.reset();
    } else if (input.eventType & INPUT_START) {
      this.reset();
      this._timer = setTimeout(function () {
        _this2.state = STATE_RECOGNIZED;

        _this2.tryEmit();
      }, options.time);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit(input) {
    if (this.state !== STATE_RECOGNIZED) {
      return;
    }

    if (input && input.eventType & INPUT_END) {
      this.manager.emit(this.options.event + "up", input);
    } else {
      this._input.timeStamp = now();
      this.manager.emit(this.options.event, this._input);
    }
  };

  return PressRecognizer;
}(Recognizer);

var defaults = {
  /**
   * @private
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: false,

  /**
   * @private
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: TOUCH_ACTION_COMPUTE,

  /**
   * @private
   * @type {Boolean}
   * @default true
   */
  enable: true,

  /**
   * @private
   * EXPERIMENTAL FEATURE -- can be removed/changed
   * Change the parent input target element.
   * If Null, then it is being set the to main element.
   * @type {Null|EventTarget}
   * @default null
   */
  inputTarget: null,

  /**
   * @private
   * force an input class
   * @type {Null|Function}
   * @default null
   */
  inputClass: null,

  /**
   * @private
   * Some CSS properties can be used to improve the working of Hammer.
   * Add them to this method and they will be set when creating a new Manager.
   * @namespace
   */
  cssProps: {
    /**
     * @private
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userSelect: "none",

    /**
     * @private
     * Disable the Windows Phone grippers when pressing an element.
     * @type {String}
     * @default 'none'
     */
    touchSelect: "none",

    /**
     * @private
     * Disables the default callout shown when you touch and hold a touch target.
     * On iOS, when you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     * @type {String}
     * @default 'none'
     */
    touchCallout: "none",

    /**
     * @private
     * Specifies whether zooming is enabled. Used by IE10>
     * @type {String}
     * @default 'none'
     */
    contentZooming: "none",

    /**
     * @private
     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userDrag: "none",

    /**
     * @private
     * Overrides the highlight color shown when the user taps a link or a JavaScript
     * clickable element in iOS. This property obeys the alpha value, if specified.
     * @type {String}
     * @default 'rgba(0,0,0,0)'
     */
    tapHighlightColor: "rgba(0,0,0,0)"
  }
};
/**
 * @private
 * Default recognizer setup when calling `Hammer()`
 * When creating a new Manager these will be skipped.
 * This is separated with other defaults because of tree-shaking.
 * @type {Array}
 */

var preset = [[RotateRecognizer, {
  enable: false
}], [PinchRecognizer, {
  enable: false
}, ['rotate']], [SwipeRecognizer, {
  direction: DIRECTION_HORIZONTAL
}], [PanRecognizer, {
  direction: DIRECTION_HORIZONTAL
}, ['swipe']], [TapRecognizer], [TapRecognizer, {
  event: 'doubletap',
  taps: 2
}, ['tap']], [PressRecognizer]];
var STOP = 1;
var FORCED_STOP = 2;
/**
 * @private
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */

function toggleCssProps(manager, add) {
  var element = manager.element;

  if (!element.style) {
    return;
  }

  var prop;
  each(manager.options.cssProps, function (value, name) {
    prop = prefixed(element.style, name);

    if (add) {
      manager.oldCssProps[prop] = element.style[prop];
      element.style[prop] = value;
    } else {
      element.style[prop] = manager.oldCssProps[prop] || "";
    }
  });

  if (!add) {
    manager.oldCssProps = {};
  }
}
/**
 * @private
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */


function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent("Event");
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}
/**
* @private
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */


var Manager = /*#__PURE__*/function () {
  function Manager(element, options) {
    var _this = this;

    this.options = assign$1$1({}, defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = _this.add(new item[0](item[1]));

      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @returns {Manager}
   */


  var _proto = Manager.prototype;

  _proto.set = function set(options) {
    assign$1$1(this.options, options); // Options that need a little more setup

    if (options.touchAction) {
      this.touchAction.update();
    }

    if (options.inputTarget) {
      // Clean up existing event listeners and reinitialize
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }

    return this;
  };
  /**
   * @private
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   * @param {Boolean} [force]
   */


  _proto.stop = function stop(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  };
  /**
   * @private
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    var session = this.session;

    if (session.stopped) {
      return;
    } // run the touch-action polyfill


    this.touchAction.preventDefaults(inputData);
    var recognizer;
    var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`

    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
    // or when we're in a new session

    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
      session.curRecognizer = null;
      curRecognizer = null;
    }

    var i = 0;

    while (i < recognizers.length) {
      recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
      //      this can be setup with the `recognizeWith()` method on the recognizer.

      if (session.stopped !== FORCED_STOP && ( // 1
      !curRecognizer || recognizer === curRecognizer || // 2
      recognizer.canRecognizeWith(curRecognizer))) {
        // 3
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer


      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
        session.curRecognizer = recognizer;
        curRecognizer = recognizer;
      }

      i++;
    }
  };
  /**
   * @private
   * get a recognizer by its event name.
   * @param {Recognizer|String} recognizer
   * @returns {Recognizer|Null}
   */


  _proto.get = function get(recognizer) {
    if (recognizer instanceof Recognizer) {
      return recognizer;
    }

    var recognizers = this.recognizers;

    for (var i = 0; i < recognizers.length; i++) {
      if (recognizers[i].options.event === recognizer) {
        return recognizers[i];
      }
    }

    return null;
  };
  /**
   * @private add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */


  _proto.add = function add(recognizer) {
    if (invokeArrayArg(recognizer, "add", this)) {
      return this;
    } // remove existing


    var existing = this.get(recognizer.options.event);

    if (existing) {
      this.remove(existing);
    }

    this.recognizers.push(recognizer);
    recognizer.manager = this;
    this.touchAction.update();
    return recognizer;
  };
  /**
   * @private
   * remove a recognizer by name or instance
   * @param {Recognizer|String} recognizer
   * @returns {Manager}
   */


  _proto.remove = function remove(recognizer) {
    if (invokeArrayArg(recognizer, "remove", this)) {
      return this;
    }

    var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

    if (recognizer) {
      var recognizers = this.recognizers;
      var index = inArray(recognizers, targetRecognizer);

      if (index !== -1) {
        recognizers.splice(index, 1);
        this.touchAction.update();
      }
    }

    return this;
  };
  /**
   * @private
   * bind event
   * @param {String} events
   * @param {Function} handler
   * @returns {EventEmitter} this
   */


  _proto.on = function on(events, handler) {
    if (events === undefined || handler === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    });
    return this;
  };
  /**
   * @private unbind event, leave emit blank to remove all handlers
   * @param {String} events
   * @param {Function} [handler]
   * @returns {EventEmitter} this
   */


  _proto.off = function off(events, handler) {
    if (events === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      if (!handler) {
        delete handlers[event];
      } else {
        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
      }
    });
    return this;
  };
  /**
   * @private emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */


  _proto.emit = function emit(event, data) {
    // we also want to trigger dom events
    if (this.options.domEvents) {
      triggerDomEvent(event, data);
    } // no handlers, so skip it all


    var handlers = this.handlers[event] && this.handlers[event].slice();

    if (!handlers || !handlers.length) {
      return;
    }

    data.type = event;

    data.preventDefault = function () {
      data.srcEvent.preventDefault();
    };

    var i = 0;

    while (i < handlers.length) {
      handlers[i](data);
      i++;
    }
  };
  /**
   * @private
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */


  _proto.destroy = function destroy() {
    this.element && toggleCssProps(this, false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  };

  return Manager;
}();

var SINGLE_TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Touch events input
 * @constructor
 * @extends Input
 */

var SingleTouchInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(SingleTouchInput, _Input);

  function SingleTouchInput() {
    var _this;

    var proto = SingleTouchInput.prototype;
    proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.started = false;
    return _this;
  }

  var _proto = SingleTouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

    if (type === INPUT_START) {
      this.started = true;
    }

    if (!this.started) {
      return;
    }

    var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
      this.started = false;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return SingleTouchInput;
}(Input);

function normalizeSingleTouches(ev, type) {
  var all = toArray$1(ev.touches);
  var changed = toArray$1(ev.changedTouches);

  if (type & (INPUT_END | INPUT_CANCEL)) {
    all = uniqueArray(all.concat(changed), 'identifier', true);
  }

  return [all, changed];
}
/**
 * @private
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */


function deprecate(method, name, message) {
  var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
  return function () {
    var e = new Error('get-stack-trace');
    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
    var log = window.console && (window.console.warn || window.console.log);

    if (log) {
      log.call(window.console, deprecationMessage, stack);
    }

    return method.apply(this, arguments);
  };
}
/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */


var extend$1 = deprecate(function (dest, src, merge) {
  var keys = Object.keys(src);
  var i = 0;

  while (i < keys.length) {
    if (!merge || merge && dest[keys[i]] === undefined) {
      dest[keys[i]] = src[keys[i]];
    }

    i++;
  }

  return dest;
}, 'extend', 'Use `assign`.');
/**
 * @private
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */

var merge = deprecate(function (dest, src) {
  return extend$1(dest, src, true);
}, 'merge', 'Use `assign`.');
/**
 * @private
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */

function inherit(child, base, properties) {
  var baseP = base.prototype;
  var childP;
  childP = child.prototype = Object.create(baseP);
  childP.constructor = child;
  childP._super = baseP;

  if (properties) {
    assign$1$1(childP, properties);
  }
}
/**
 * @private
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */


function bindFn(fn, context) {
  return function boundFn() {
    return fn.apply(context, arguments);
  };
}
/**
 * @private
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */


var Hammer$2 = /*#__PURE__*/function () {
  var Hammer =
  /**
    * @private
    * @const {string}
    */
  function Hammer(element, options) {
    if (options === void 0) {
      options = {};
    }

    return new Manager(element, _extends({
      recognizers: preset.concat()
    }, options));
  };

  Hammer.VERSION = "2.0.17-rc";
  Hammer.DIRECTION_ALL = DIRECTION_ALL;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
  Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
  Hammer.DIRECTION_UP = DIRECTION_UP;
  Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  Hammer.DIRECTION_NONE = DIRECTION_NONE;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.INPUT_START = INPUT_START;
  Hammer.INPUT_MOVE = INPUT_MOVE;
  Hammer.INPUT_END = INPUT_END;
  Hammer.INPUT_CANCEL = INPUT_CANCEL;
  Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
  Hammer.STATE_BEGAN = STATE_BEGAN;
  Hammer.STATE_CHANGED = STATE_CHANGED;
  Hammer.STATE_ENDED = STATE_ENDED;
  Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
  Hammer.STATE_CANCELLED = STATE_CANCELLED;
  Hammer.STATE_FAILED = STATE_FAILED;
  Hammer.Manager = Manager;
  Hammer.Input = Input;
  Hammer.TouchAction = TouchAction;
  Hammer.TouchInput = TouchInput;
  Hammer.MouseInput = MouseInput;
  Hammer.PointerEventInput = PointerEventInput;
  Hammer.TouchMouseInput = TouchMouseInput;
  Hammer.SingleTouchInput = SingleTouchInput;
  Hammer.Recognizer = Recognizer;
  Hammer.AttrRecognizer = AttrRecognizer;
  Hammer.Tap = TapRecognizer;
  Hammer.Pan = PanRecognizer;
  Hammer.Swipe = SwipeRecognizer;
  Hammer.Pinch = PinchRecognizer;
  Hammer.Rotate = RotateRecognizer;
  Hammer.Press = PressRecognizer;
  Hammer.on = addEventListeners;
  Hammer.off = removeEventListeners;
  Hammer.each = each;
  Hammer.merge = merge;
  Hammer.extend = extend$1;
  Hammer.bindFn = bindFn;
  Hammer.assign = assign$1$1;
  Hammer.inherit = inherit;
  Hammer.bindFn = bindFn;
  Hammer.prefixed = prefixed;
  Hammer.toArray = toArray$1;
  Hammer.inArray = inArray;
  Hammer.uniqueArray = uniqueArray;
  Hammer.splitStr = splitStr;
  Hammer.boolOrFn = boolOrFn;
  Hammer.hasParent = hasParent$1;
  Hammer.addEventListeners = addEventListeners;
  Hammer.removeEventListeners = removeEventListeners;
  Hammer.defaults = assign$1$1({}, defaults, {
    preset: preset
  });
  return Hammer;
}(); //  style loader but by script tag, not by the loader.
var RealHammer = Hammer$2;

/**
 * Setup a mock hammer.js object, for unit testing.
 *
 * Inspiration: https://github.com/uber/deck.gl/pull/658
 *
 * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
 */

function hammerMock() {
  var noop = function noop() {};

  return {
    on: noop,
    off: noop,
    destroy: noop,
    emit: noop,
    get: function get() {
      return {
        set: noop
      };
    }
  };
}

var Hammer$1 = typeof window !== "undefined" ? window.Hammer || RealHammer : function () {
  // hammer.js is only available in a browser, not in node.js. Replacing it with a mock object.
  return hammerMock();
};

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof symbol !== "undefined" && getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { var _context4; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = slice$2(_context4 = Object.prototype.toString.call(o)).call(_context4, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Turn an element into an clickToUse element.
 * When not active, the element has a transparent overlay. When the overlay is
 * clicked, the mode is changed to active.
 * When active, the element is displayed with a blue border around it, and
 * the interactive contents of the element can be used. When clicked outside
 * the element, the elements mode is changed to inactive.
 *
 * @param {Element} container
 * @class Activator
 */

function Activator$1(container) {
  var _this = this,
      _context;

  this._cleanupQueue = [];
  this.active = false;
  this._dom = {
    container: container,
    overlay: document.createElement("div")
  };

  this._dom.overlay.classList.add("vis-overlay");

  this._dom.container.appendChild(this._dom.overlay);

  this._cleanupQueue.push(function () {
    _this._dom.overlay.parentNode.removeChild(_this._dom.overlay);
  });

  var hammer = Hammer$1(this._dom.overlay);
  hammer.on("tap", bind(_context = this._onTapOverlay).call(_context, this));

  this._cleanupQueue.push(function () {
    hammer.destroy(); // FIXME: cleaning up hammer instances doesn't work (Timeline not removed
    // from memory)
  }); // block all touch events (except tap)


  var events = ["tap", "doubletap", "press", "pinch", "pan", "panstart", "panmove", "panend"];

  forEach$1(events).call(events, function (event) {
    hammer.on(event, function (event) {
      event.srcEvent.stopPropagation();
    });
  }); // attach a click event to the window, in order to deactivate when clicking outside the timeline


  if (document && document.body) {
    this._onClick = function (event) {
      if (!_hasParent(event.target, container)) {
        _this.deactivate();
      }
    };

    document.body.addEventListener("click", this._onClick);

    this._cleanupQueue.push(function () {
      document.body.removeEventListener("click", _this._onClick);
    });
  } // prepare escape key listener for deactivating when active


  this._escListener = function (event) {
    if ("key" in event ? event.key === "Escape" : event.keyCode === 27
    /* the keyCode is for IE11 */
    ) {
      _this.deactivate();
    }
  };
} // turn into an event emitter

Emitter(Activator$1.prototype); // The currently active activator

Activator$1.current = null;
/**
 * Destroy the activator. Cleans up all created DOM and event listeners
 */

Activator$1.prototype.destroy = function () {
  var _context2, _context3;

  this.deactivate();

  var _iterator = _createForOfIteratorHelper$1(reverse(_context2 = splice(_context3 = this._cleanupQueue).call(_context3, 0)).call(_context2)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var callback = _step.value;
      callback();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
/**
 * Activate the element
 * Overlay is hidden, element is decorated with a blue shadow border
 */


Activator$1.prototype.activate = function () {
  // we allow only one active activator at a time
  if (Activator$1.current) {
    Activator$1.current.deactivate();
  }

  Activator$1.current = this;
  this.active = true;
  this._dom.overlay.style.display = "none";

  this._dom.container.classList.add("vis-active");

  this.emit("change");
  this.emit("activate"); // ugly hack: bind ESC after emitting the events, as the Network rebinds all
  // keyboard events on a 'change' event

  document.body.addEventListener("keydown", this._escListener);
};
/**
 * Deactivate the element
 * Overlay is displayed on top of the element
 */


Activator$1.prototype.deactivate = function () {
  this.active = false;
  this._dom.overlay.style.display = "block";

  this._dom.container.classList.remove("vis-active");

  document.body.removeEventListener("keydown", this._escListener);
  this.emit("change");
  this.emit("deactivate");
};
/**
 * Handle a tap event: activate the container
 *
 * @param {Event}  event   The event
 * @private
 */


Activator$1.prototype._onTapOverlay = function (event) {
  // activate the container
  this.activate();
  event.srcEvent.stopPropagation();
};
/**
 * Test whether the element has the requested parent element somewhere in
 * its chain of parent nodes.
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @returns {boolean} Returns true when the parent is found somewhere in the
 *                    chain of parent nodes.
 * @private
 */


function _hasParent(element, parent) {
  while (element) {
    if (element === parent) {
      return true;
    }

    element = element.parentNode;
  }

  return false;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var defineProperty$6 = {exports: {}};

var $$g = _export;
var DESCRIPTORS$6 = descriptors;
var objectDefinePropertyModile = objectDefineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

$$g({
  target: 'Object',
  stat: true,
  forced: !DESCRIPTORS$6,
  sham: !DESCRIPTORS$6
}, {
  defineProperty: objectDefinePropertyModile.f
});

var path$a = path$l;
var Object$4 = path$a.Object;

var defineProperty$5 = defineProperty$6.exports = function defineProperty(it, key, desc) {
  return Object$4.defineProperty(it, key, desc);
};

if (Object$4.defineProperty.sham) defineProperty$5.sham = true;

var parent$g = defineProperty$6.exports;
var defineProperty$4 = parent$g;

var parent$f = defineProperty$4;
var defineProperty$3 = parent$f;

var defineProperty$2 = defineProperty$3;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$2(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var $$f = _export;
var getBuiltIn = getBuiltIn$6;
var fails$4 = fails$h;
var $stringify = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);

  if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
    return '\\u' + match.charCodeAt(0).toString(16);
  }

  return match;
};

var FORCED$2 = fails$4(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $$f({
    target: 'JSON',
    stat: true,
    forced: FORCED$2
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var result = $stringify.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}

var core = path$l; // eslint-disable-next-line es/no-json -- safe

if (!core.JSON) core.JSON = {
  stringify: JSON.stringify
}; // eslint-disable-next-line no-unused-vars -- required for `.length`

var stringify$2 = function stringify(it, replacer, space) {
  return core.JSON.stringify.apply(null, arguments);
};

var parent$e = stringify$2;
var stringify$1 = parent$e;

var stringify = stringify$1;

var DESCRIPTORS$5 = descriptors;
var fails$3 = fails$h;
var objectKeys$1 = objectKeys$4;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$2 = toObject$b;
var IndexedObject = indexedObject; // eslint-disable-next-line es/no-object-assign -- safe

var $assign = Object.assign; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

var defineProperty$1 = Object.defineProperty; // `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign

var objectAssign = !$assign || fails$3(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$5 && $assign({
    b: 1
  }, $assign(defineProperty$1({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$1(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line es/no-symbol -- safe

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$2(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;

  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys$1(S).concat(getOwnPropertySymbols(S)) : objectKeys$1(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$5 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : $assign;

var $$e = _export;
var assign$3 = objectAssign; // `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing

$$e({
  target: 'Object',
  stat: true,
  forced: Object.assign !== assign$3
}, {
  assign: assign$3
});

var path$9 = path$l;
var assign$2 = path$9.Object.assign;

var parent$d = assign$2;
var assign$1 = parent$d;

var assign = assign$1;

var $$d = _export;
var global$2 = global$f;
var userAgent = engineUserAgent;
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout
  /* , ...arguments */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
}; // ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


$$d({
  global: true,
  bind: true,
  forced: MSIE
}, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global$2.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global$2.setInterval)
});

var path$8 = path$l;
var setTimeout$2 = path$8.setTimeout;

var setTimeout$1 = setTimeout$2;

var toObject$1 = toObject$b;
var toAbsoluteIndex = toAbsoluteIndex$4;
var toLength = toLength$7; // `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill

var arrayFill = function fill(value
/* , start = 0, end = @length */
) {
  var O = toObject$1(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

  while (endPos > index) O[index++] = value;

  return O;
};

var $$c = _export;
var fill$4 = arrayFill;
// https://tc39.es/ecma262/#sec-array.prototype.fill

$$c({
  target: 'Array',
  proto: true
}, {
  fill: fill$4
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

var entryVirtual$5 = entryVirtual$d;
var fill$3 = entryVirtual$5('Array').fill;

var fill$2 = fill$3;
var ArrayPrototype$3 = Array.prototype;

var fill_1 = function (it) {
  var own = it.fill;
  return it === ArrayPrototype$3 || it instanceof Array && own === ArrayPrototype$3.fill ? fill$2 : own;
};

var parent$c = fill_1;
var fill$1 = parent$c;

var fill = fill$1;

var path$7 = path$l;
var getOwnPropertySymbols$2 = path$7.Object.getOwnPropertySymbols;

var parent$b = getOwnPropertySymbols$2;
var getOwnPropertySymbols$1 = parent$b;

var getOwnPropertySymbols = getOwnPropertySymbols$1;

var getOwnPropertyDescriptor$3 = {exports: {}};

var $$b = _export;
var fails$2 = fails$h;
var toIndexedObject$2 = toIndexedObject$a;
var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var DESCRIPTORS$4 = descriptors;
var FAILS_ON_PRIMITIVES$1 = fails$2(function () {
  nativeGetOwnPropertyDescriptor(1);
});
var FORCED$1 = !DESCRIPTORS$4 || FAILS_ON_PRIMITIVES$1; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

$$b({
  target: 'Object',
  stat: true,
  forced: FORCED$1,
  sham: !DESCRIPTORS$4
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject$2(it), key);
  }
});

var path$6 = path$l;
var Object$3 = path$6.Object;

var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor$3.exports = function getOwnPropertyDescriptor(it, key) {
  return Object$3.getOwnPropertyDescriptor(it, key);
};

if (Object$3.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor$2.sham = true;

var parent$a = getOwnPropertyDescriptor$3.exports;
var getOwnPropertyDescriptor$1 = parent$a;

var getOwnPropertyDescriptor = getOwnPropertyDescriptor$1;

var $$a = _export;
var DESCRIPTORS$3 = descriptors;
var ownKeys$1 = ownKeys$6;
var toIndexedObject$1 = toIndexedObject$a;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var createProperty = createProperty$5; // `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors

$$a({
  target: 'Object',
  stat: true,
  sham: !DESCRIPTORS$3
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject$1(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys$1(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

var path$5 = path$l;
var getOwnPropertyDescriptors$2 = path$5.Object.getOwnPropertyDescriptors;

var parent$9 = getOwnPropertyDescriptors$2;
var getOwnPropertyDescriptors$1 = parent$9;

var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

var defineProperties$4 = {exports: {}};

var $$9 = _export;
var DESCRIPTORS$2 = descriptors;
var defineProperties$3 = objectDefineProperties; // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties

$$9({
  target: 'Object',
  stat: true,
  forced: !DESCRIPTORS$2,
  sham: !DESCRIPTORS$2
}, {
  defineProperties: defineProperties$3
});

var path$4 = path$l;
var Object$2 = path$4.Object;

var defineProperties$2 = defineProperties$4.exports = function defineProperties(T, D) {
  return Object$2.defineProperties(T, D);
};

if (Object$2.defineProperties.sham) defineProperties$2.sham = true;

var parent$8 = defineProperties$4.exports;
var defineProperties$1 = parent$8;

var defineProperties = defineProperties$1;

var defineProperty = defineProperty$4;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$2(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var $$8 = _export;
var $includes = arrayIncludes$1.includes;
// https://tc39.es/ecma262/#sec-array.prototype.includes

$$8({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

var entryVirtual$4 = entryVirtual$d;
var includes$4 = entryVirtual$4('Array').includes;

var isObject$1 = isObject$d;
var classof = classofRaw$1;
var wellKnownSymbol$1 = wellKnownSymbol$i;
var MATCH$1 = wellKnownSymbol$1('match'); // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

var isRegExp = isRegexp;

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

var wellKnownSymbol = wellKnownSymbol$i;
var MATCH = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) {
      /* empty */
    }
  }

  return false;
};

var $$7 = _export;
var notARegExp = notARegexp;
var requireObjectCoercible$1 = requireObjectCoercible$5;
var toString$2 = toString$8;
var correctIsRegExpLogic = correctIsRegexpLogic; // `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes

$$7({
  target: 'String',
  proto: true,
  forced: !correctIsRegExpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~toString$2(requireObjectCoercible$1(this)).indexOf(toString$2(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var entryVirtual$3 = entryVirtual$d;
var includes$3 = entryVirtual$3('String').includes;

var arrayIncludes = includes$4;
var stringIncludes = includes$3;
var ArrayPrototype$2 = Array.prototype;
var StringPrototype$1 = String.prototype;

var includes$2 = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype$2 || it instanceof Array && own === ArrayPrototype$2.includes) return arrayIncludes;

  if (typeof it === 'string' || it === StringPrototype$1 || it instanceof String && own === StringPrototype$1.includes) {
    return stringIncludes;
  }

  return own;
};

var parent$7 = includes$2;
var includes$1 = parent$7;

var includes = includes$1;

var $$6 = _export;
var fails$1 = fails$h;
var toObject = toObject$b;
var nativeGetPrototypeOf = objectGetPrototypeOf;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
var FAILS_ON_PRIMITIVES = fails$1(function () {
  nativeGetPrototypeOf(1);
}); // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof

$$6({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !CORRECT_PROTOTYPE_GETTER
}, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});

var path$3 = path$l;
var getPrototypeOf$2 = path$3.Object.getPrototypeOf;

var parent$6 = getPrototypeOf$2;
var getPrototypeOf$1 = parent$6;

var getPrototypeOf = getPrototypeOf$1;

var $$5 = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$$5({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var entryVirtual$2 = entryVirtual$d;
var filter$3 = entryVirtual$2('Array').filter;

var filter$2 = filter$3;
var ArrayPrototype$1 = Array.prototype;

var filter_1 = function (it) {
  var own = it.filter;
  return it === ArrayPrototype$1 || it instanceof Array && own === ArrayPrototype$1.filter ? filter$2 : own;
};

var parent$5 = filter_1;
var filter$1 = parent$5;

var filter = filter$1;

var DESCRIPTORS$1 = descriptors;
var objectKeys = objectKeys$4;
var toIndexedObject = toIndexedObject$a;
var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

var createMethod$1 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS$1 || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod$1(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod$1(false)
};

var $$4 = _export;
var $values = objectToArray.values; // `Object.values` method
// https://tc39.es/ecma262/#sec-object.values

$$4({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

var path$2 = path$l;
var values$2 = path$2.Object.values;

var parent$4 = values$2;
var values$1 = parent$4;

var values = values$1;

var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var requireObjectCoercible = requireObjectCoercible$5;
var toString$1 = toString$8;
var whitespaces$2 = whitespaces$3;
var whitespace = '[' + whitespaces$2 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString$1(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

var global$1 = global$f;
var toString = toString$8;
var trim$4 = stringTrim.trim;
var whitespaces$1 = whitespaces$3;
var $parseInt = global$1.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces$1 + '08') !== 8 || $parseInt(whitespaces$1 + '0x16') !== 22; // `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix

var numberParseInt = FORCED ? function parseInt(string, radix) {
  var S = trim$4(toString(string));
  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
} : $parseInt;

var $$3 = _export;
var parseIntImplementation = numberParseInt; // `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix

$$3({
  global: true,
  forced: parseInt != parseIntImplementation
}, {
  parseInt: parseIntImplementation
});

var path$1 = path$l;
var _parseInt$2 = path$1.parseInt;

var parent$3 = _parseInt$2;
var _parseInt$1 = parent$3;

var _parseInt = _parseInt$1;

/* eslint-disable es/no-array-prototype-indexof -- required for testing */


var $$2 = _export;
var $indexOf = arrayIncludes$1.indexOf;
var arrayMethodIsStrict = arrayMethodIsStrict$2;
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf'); // `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof

$$2({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || !STRICT_METHOD
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var entryVirtual$1 = entryVirtual$d;
var indexOf$3 = entryVirtual$1('Array').indexOf;

var indexOf$2 = indexOf$3;
var ArrayPrototype = Array.prototype;

var indexOf_1 = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.indexOf ? indexOf$2 : own;
};

var parent$2 = indexOf_1;
var indexOf$1 = parent$2;

var indexOf = indexOf$1;

var fails = fails$h;
var whitespaces = whitespaces$3;
var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $$1 = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod = stringTrimForced; // `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim

$$1({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

var entryVirtual = entryVirtual$d;
var trim$3 = entryVirtual('String').trim;

var trim$2 = trim$3;
var StringPrototype = String.prototype;

var trim_1 = function (it) {
  var own = it.trim;
  return typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.trim ? trim$2 : own;
};

var parent$1 = trim_1;
var trim$1 = parent$1;

var trim = trim$1;

var $ = _export;
var DESCRIPTORS = descriptors;
var create$3 = objectCreate; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

$({
  target: 'Object',
  stat: true,
  sham: !DESCRIPTORS
}, {
  create: create$3
});

var path = path$l;
var Object$1 = path.Object;

var create$2 = function create(P, D) {
  return Object$1.create(P, D);
};

var parent = create$2;
var create$1 = parent;

var create = create$1;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof symbol !== "undefined" && getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context13; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = slice$2(_context13 = Object.prototype.toString.call(o)).call(_context13, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys$1 = keys(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) { symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor(object, sym).enumerable; }); } keys$1.push.apply(keys$1, symbols); } return keys$1; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context11; forEach$1(_context11 = ownKeys(Object(source), true)).call(_context11, function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { defineProperties(target, getOwnPropertyDescriptors(source)); } else { var _context12; forEach$1(_context12 = ownKeys(Object(source))).call(_context12, function (key) { defineProperty(target, key, getOwnPropertyDescriptor(source, key)); }); } } return target; }
// utility functions
// parse ASP.Net Date pattern,
// for example '/Date(1198908717056)/' or '/Date(1198908717056-0700)/'
// code from http://momentjs.com/
var ASPDateRegex = /^\/?Date\((-?\d+)/i; // Color REs

var fullHexRE = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
var shortHexRE = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
var rgbRE = /^rgb\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *\)$/i;
var rgbaRE = /^rgba\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *([01]|0?\.\d+) *\)$/i;
/**
 * Test whether given object is a number.
 *
 * @param value - Input value of unknown type.
 * @returns True if number, false otherwise.
 */

function isNumber(value) {
  return value instanceof Number || typeof value === "number";
}
/**
 * Remove everything in the DOM object.
 *
 * @param DOMobject - Node whose child nodes will be recursively deleted.
 */

function recursiveDOMDelete(DOMobject) {
  if (DOMobject) {
    while (DOMobject.hasChildNodes() === true) {
      var child = DOMobject.firstChild;

      if (child) {
        recursiveDOMDelete(child);
        DOMobject.removeChild(child);
      }
    }
  }
}
/**
 * Test whether given object is a string.
 *
 * @param value - Input value of unknown type.
 * @returns True if string, false otherwise.
 */

function isString(value) {
  return value instanceof String || typeof value === "string";
}
/**
 * Test whether given object is a object (not primitive or null).
 *
 * @param value - Input value of unknown type.
 * @returns True if not null object, false otherwise.
 */

function isObject(value) {
  return _typeof(value) === "object" && value !== null;
}
/**
 * Test whether given object is a Date, or a String containing a Date.
 *
 * @param value - Input value of unknown type.
 * @returns True if Date instance or string date representation, false otherwise.
 */

function isDate(value) {
  if (value instanceof Date) {
    return true;
  } else if (isString(value)) {
    // test whether this string contains a date
    var match = ASPDateRegex.exec(value);

    if (match) {
      return true;
    } else if (!isNaN(Date.parse(value))) {
      return true;
    }
  }

  return false;
}
/**
 * Copy property from b to a if property present in a.
 * If property in b explicitly set to null, delete it if `allowDeletion` set.
 *
 * Internal helper routine, should not be exported. Not added to `exports` for that reason.
 *
 * @param a - Target object.
 * @param b - Source object.
 * @param prop - Name of property to copy from b to a.
 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
 */

function copyOrDelete(a, b, prop, allowDeletion) {
  var doDeletion = false;

  if (allowDeletion === true) {
    doDeletion = b[prop] === null && a[prop] !== undefined;
  }

  if (doDeletion) {
    delete a[prop];
  } else {
    a[prop] = b[prop]; // Remember, this is a reference copy!
  }
}
/**
 * Fill an object with a possibly partially defined other object.
 *
 * Only copies values for the properties already present in a.
 * That means an object is not created on a property if only the b object has it.
 *
 * @param a - The object that will have it's properties updated.
 * @param b - The object with property updates.
 * @param allowDeletion - If true, delete properties in a that are explicitly set to null in b.
 */


function fillIfDefined(a, b) {
  var allowDeletion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // NOTE: iteration of properties of a
  // NOTE: prototype properties iterated over as well
  for (var prop in a) {
    if (b[prop] !== undefined) {
      if (b[prop] === null || _typeof(b[prop]) !== "object") {
        // Note: typeof null === 'object'
        copyOrDelete(a, b, prop, allowDeletion);
      } else {
        var aProp = a[prop];
        var bProp = b[prop];

        if (isObject(aProp) && isObject(bProp)) {
          fillIfDefined(aProp, bProp, allowDeletion);
        }
      }
    }
  }
}
/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a
 * target object. Returns the target object.
 *
 * @param target - The target object to copy to.
 * @param source - The source object from which to copy properties.
 * @returns The target object.
 */

var extend = assign;
/**
 * Extend object a with selected properties of object b or a series of objects.
 *
 * @remarks
 * Only properties with defined values are copied.
 * @param props - Properties to be copied to a.
 * @param a - The target.
 * @param others - The sources.
 * @returns Argument a.
 */

function selectiveExtend(props, a) {
  if (!isArray$1(props)) {
    throw new Error("Array with property names expected as first argument");
  }

  for (var _len = arguments.length, others = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    others[_key - 2] = arguments[_key];
  }

  for (var _i = 0, _others = others; _i < _others.length; _i++) {
    var other = _others[_i];

    for (var p = 0; p < props.length; p++) {
      var prop = props[p];

      if (other && Object.prototype.hasOwnProperty.call(other, prop)) {
        a[prop] = other[prop];
      }
    }
  }

  return a;
}
/**
 * Extend object a with selected properties of object b.
 * Only properties with defined values are copied.
 *
 * @remarks
 * Previous version of this routine implied that multiple source objects could
 * be used; however, the implementation was **wrong**. Since multiple (\>1)
 * sources weren't used anywhere in the `vis.js` code, this has been removed
 * @param props - Names of first-level properties to copy over.
 * @param a - Target object.
 * @param b - Source object.
 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
 * @returns Argument a.
 */

function selectiveDeepExtend(props, a, b) {
  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  // TODO: add support for Arrays to deepExtend
  if (isArray$1(b)) {
    throw new TypeError("Arrays are not supported by deepExtend");
  }

  for (var p = 0; p < props.length; p++) {
    var prop = props[p];

    if (Object.prototype.hasOwnProperty.call(b, prop)) {
      if (b[prop] && b[prop].constructor === Object) {
        if (a[prop] === undefined) {
          a[prop] = {};
        }

        if (a[prop].constructor === Object) {
          deepExtend(a[prop], b[prop], false, allowDeletion);
        } else {
          copyOrDelete(a, b, prop, allowDeletion);
        }
      } else if (isArray$1(b[prop])) {
        throw new TypeError("Arrays are not supported by deepExtend");
      } else {
        copyOrDelete(a, b, prop, allowDeletion);
      }
    }
  }

  return a;
}
/**
 * Extend object `a` with properties of object `b`, ignoring properties which
 * are explicitly specified to be excluded.
 *
 * @remarks
 * The properties of `b` are considered for copying. Properties which are
 * themselves objects are are also extended. Only properties with defined
 * values are copied.
 * @param propsToExclude - Names of properties which should *not* be copied.
 * @param a - Object to extend.
 * @param b - Object to take properties from for extension.
 * @param allowDeletion - If true, delete properties in a that are explicitly
 * set to null in b.
 * @returns Argument a.
 */

function selectiveNotDeepExtend(propsToExclude, a, b) {
  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  // TODO: add support for Arrays to deepExtend
  // NOTE: array properties have an else-below; apparently, there is a problem here.
  if (isArray$1(b)) {
    throw new TypeError("Arrays are not supported by deepExtend");
  }

  for (var prop in b) {
    if (!Object.prototype.hasOwnProperty.call(b, prop)) {
      continue;
    } // Handle local properties only


    if (includes(propsToExclude).call(propsToExclude, prop)) {
      continue;
    } // In exclusion list, skip


    if (b[prop] && b[prop].constructor === Object) {
      if (a[prop] === undefined) {
        a[prop] = {};
      }

      if (a[prop].constructor === Object) {
        deepExtend(a[prop], b[prop]); // NOTE: allowDeletion not propagated!
      } else {
        copyOrDelete(a, b, prop, allowDeletion);
      }
    } else if (isArray$1(b[prop])) {
      a[prop] = [];

      for (var i = 0; i < b[prop].length; i++) {
        a[prop].push(b[prop][i]);
      }
    } else {
      copyOrDelete(a, b, prop, allowDeletion);
    }
  }

  return a;
}
/**
 * Deep extend an object a with the properties of object b.
 *
 * @param a - Target object.
 * @param b - Source object.
 * @param protoExtend - If true, the prototype values will also be extended.
 * (That is the options objects that inherit from others will also get the
 * inherited options).
 * @param allowDeletion - If true, the values of fields that are null will be deleted.
 * @returns Argument a.
 */

function deepExtend(a, b) {
  var protoExtend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  for (var prop in b) {
    if (Object.prototype.hasOwnProperty.call(b, prop) || protoExtend === true) {
      if (_typeof(b[prop]) === "object" && b[prop] !== null && getPrototypeOf(b[prop]) === Object.prototype) {
        if (a[prop] === undefined) {
          a[prop] = deepExtend({}, b[prop], protoExtend); // NOTE: allowDeletion not propagated!
        } else if (_typeof(a[prop]) === "object" && a[prop] !== null && getPrototypeOf(a[prop]) === Object.prototype) {
          deepExtend(a[prop], b[prop], protoExtend); // NOTE: allowDeletion not propagated!
        } else {
          copyOrDelete(a, b, prop, allowDeletion);
        }
      } else if (isArray$1(b[prop])) {
        var _context;

        a[prop] = slice$2(_context = b[prop]).call(_context);
      } else {
        copyOrDelete(a, b, prop, allowDeletion);
      }
    }
  }

  return a;
}
/**
 * Test whether all elements in two arrays are equal.
 *
 * @param a - First array.
 * @param b - Second array.
 * @returns True if both arrays have the same length and same elements (1 = '1').
 */

function equalArray(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  for (var i = 0, len = a.length; i < len; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }

  return true;
}
/**
 * Get the type of an object, for example exports.getType([]) returns 'Array'.
 *
 * @param object - Input value of unknown type.
 * @returns Detected type.
 */

function getType(object) {
  var type = _typeof(object);

  if (type === "object") {
    if (object === null) {
      return "null";
    }

    if (object instanceof Boolean) {
      return "Boolean";
    }

    if (object instanceof Number) {
      return "Number";
    }

    if (object instanceof String) {
      return "String";
    }

    if (isArray$1(object)) {
      return "Array";
    }

    if (object instanceof Date) {
      return "Date";
    }

    return "Object";
  }

  if (type === "number") {
    return "Number";
  }

  if (type === "boolean") {
    return "Boolean";
  }

  if (type === "string") {
    return "String";
  }

  if (type === undefined) {
    return "undefined";
  }

  return type;
}
/**
 * Used to extend an array and copy it. This is used to propagate paths recursively.
 *
 * @param arr - First part.
 * @param newValue - The value to be aadded into the array.
 * @returns A new array with all items from arr and newValue (which is last).
 */

function copyAndExtendArray(arr, newValue) {
  var _context2;

  return concat(_context2 = []).call(_context2, _toConsumableArray(arr), [newValue]);
}
/**
 * Used to extend an array and copy it. This is used to propagate paths recursively.
 *
 * @param arr - The array to be copied.
 * @returns Shallow copy of arr.
 */

function copyArray(arr) {
  return slice$2(arr).call(arr);
}
/**
 * Retrieve the absolute left value of a DOM element.
 *
 * @param elem - A dom element, for example a div.
 * @returns The absolute left position of this element in the browser page.
 */

function getAbsoluteLeft(elem) {
  return elem.getBoundingClientRect().left;
}
/**
 * Retrieve the absolute right value of a DOM element.
 *
 * @param elem - A dom element, for example a div.
 * @returns The absolute right position of this element in the browser page.
 */

function getAbsoluteRight(elem) {
  return elem.getBoundingClientRect().right;
}
/**
 * Retrieve the absolute top value of a DOM element.
 *
 * @param elem - A dom element, for example a div.
 * @returns The absolute top position of this element in the browser page.
 */

function getAbsoluteTop(elem) {
  return elem.getBoundingClientRect().top;
}
/**
 * Add a className to the given elements style.
 *
 * @param elem - The element to which the classes will be added.
 * @param classNames - Space separated list of classes.
 */

function addClassName(elem, classNames) {
  var classes = elem.className.split(" ");
  var newClasses = classNames.split(" ");
  classes = concat(classes).call(classes, filter(newClasses).call(newClasses, function (className) {
    return !includes(classes).call(classes, className);
  }));
  elem.className = classes.join(" ");
}
/**
 * Remove a className from the given elements style.
 *
 * @param elem - The element from which the classes will be removed.
 * @param classNames - Space separated list of classes.
 */

function removeClassName(elem, classNames) {
  var classes = elem.className.split(" ");
  var oldClasses = classNames.split(" ");
  classes = filter(classes).call(classes, function (className) {
    return !includes(oldClasses).call(oldClasses, className);
  });
  elem.className = classes.join(" ");
}
/**
 * For each method for both arrays and objects.
 * In case of an array, the built-in Array.forEach() is applied (**No, it's not!**).
 * In case of an Object, the method loops over all properties of the object.
 *
 * @param object - An Object or Array to be iterated over.
 * @param callback - Array.forEach-like callback.
 */

function forEach(object, callback) {
  if (isArray$1(object)) {
    // array
    var len = object.length;

    for (var i = 0; i < len; i++) {
      callback(object[i], i, object);
    }
  } else {
    // object
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }
}
/**
 * Convert an object into an array: all objects properties are put into the array. The resulting array is unordered.
 *
 * @param o - Object that contains the properties and methods.
 * @returns An array of unordered values.
 */

var toArray = values;
/**
 * Update a property in an object.
 *
 * @param object - The object whose property will be updated.
 * @param key - Name of the property to be updated.
 * @param value - The new value to be assigned.
 * @returns Whether the value was updated (true) or already strictly the same in the original object (false).
 */

function updateProperty(object, key, value) {
  if (object[key] !== value) {
    object[key] = value;
    return true;
  } else {
    return false;
  }
}
/**
 * Throttle the given function to be only executed once per animation frame.
 *
 * @param fn - The original function.
 * @returns The throttled function.
 */

function throttle(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        fn();
      });
    }
  };
}
/**
 * Add and event listener. Works for all browsers.
 *
 * @param element - The element to bind the event listener to.
 * @param action - Same as Element.addEventListener(action, —, —).
 * @param listener - Same as Element.addEventListener(—, listener, —).
 * @param useCapture - Same as Element.addEventListener(—, —, useCapture).
 */

function addEventListener(element, action, listener, useCapture) {
  if (element.addEventListener) {
    var _context3;

    if (useCapture === undefined) {
      useCapture = false;
    }

    if (action === "mousewheel" && includes(_context3 = navigator.userAgent).call(_context3, "Firefox")) {
      action = "DOMMouseScroll"; // For Firefox
    }

    element.addEventListener(action, listener, useCapture);
  } else {
    // @TODO: IE types? Does anyone care?
    element.attachEvent("on" + action, listener); // IE browsers
  }
}
/**
 * Remove an event listener from an element.
 *
 * @param element - The element to bind the event listener to.
 * @param action - Same as Element.removeEventListener(action, —, —).
 * @param listener - Same as Element.removeEventListener(—, listener, —).
 * @param useCapture - Same as Element.removeEventListener(—, —, useCapture).
 */

function removeEventListener(element, action, listener, useCapture) {
  if (element.removeEventListener) {
    var _context4;

    // non-IE browsers
    if (useCapture === undefined) {
      useCapture = false;
    }

    if (action === "mousewheel" && includes(_context4 = navigator.userAgent).call(_context4, "Firefox")) {
      action = "DOMMouseScroll"; // For Firefox
    }

    element.removeEventListener(action, listener, useCapture);
  } else {
    // @TODO: IE types? Does anyone care?
    element.detachEvent("on" + action, listener); // IE browsers
  }
}
/**
 * Cancels the event's default action if it is cancelable, without stopping further propagation of the event.
 *
 * @param event - The event whose default action should be prevented.
 */

function preventDefault(event) {
  if (!event) {
    event = window.event;
  }

  if (!event) ; else if (event.preventDefault) {
    event.preventDefault(); // non-IE browsers
  } else {
    // @TODO: IE types? Does anyone care?
    event.returnValue = false; // IE browsers
  }
}
/**
 * Get HTML element which is the target of the event.
 *
 * @param event - The event.
 * @returns The element or null if not obtainable.
 */

function getTarget() {
  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
  // code from http://www.quirksmode.org/js/events_properties.html
  // @TODO: EventTarget can be almost anything, is it okay to return only Elements?
  var target = null;

  if (!event) ; else if (event.target) {
    target = event.target;
  } else if (event.srcElement) {
    target = event.srcElement;
  }

  if (!(target instanceof Element)) {
    return null;
  }

  if (target.nodeType != null && target.nodeType == 3) {
    // defeat Safari bug
    target = target.parentNode;

    if (!(target instanceof Element)) {
      return null;
    }
  }

  return target;
}
/**
 * Check if given element contains given parent somewhere in the DOM tree.
 *
 * @param element - The element to be tested.
 * @param parent - The ancestor (not necessarily parent) of the element.
 * @returns True if parent is an ancestor of the element, false otherwise.
 */

function hasParent(element, parent) {
  var elem = element;

  while (elem) {
    if (elem === parent) {
      return true;
    } else if (elem.parentNode) {
      elem = elem.parentNode;
    } else {
      return false;
    }
  }

  return false;
}
var option = {
  /**
   * Convert a value into a boolean.
   *
   * @param value - Value to be converted intoboolean, a function will be executed as `(() => unknown)`.
   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
   * @returns Corresponding boolean value, if none then the default value, if none then null.
   */
  asBoolean: function asBoolean(value, defaultValue) {
    if (typeof value == "function") {
      value = value();
    }

    if (value != null) {
      return value != false;
    }

    return defaultValue || null;
  },

  /**
   * Convert a value into a number.
   *
   * @param value - Value to be converted intonumber, a function will be executed as `(() => unknown)`.
   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
   * @returns Corresponding **boxed** number value, if none then the default value, if none then null.
   */
  asNumber: function asNumber(value, defaultValue) {
    if (typeof value == "function") {
      value = value();
    }

    if (value != null) {
      return Number(value) || defaultValue || null;
    }

    return defaultValue || null;
  },

  /**
   * Convert a value into a string.
   *
   * @param value - Value to be converted intostring, a function will be executed as `(() => unknown)`.
   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
   * @returns Corresponding **boxed** string value, if none then the default value, if none then null.
   */
  asString: function asString(value, defaultValue) {
    if (typeof value == "function") {
      value = value();
    }

    if (value != null) {
      return String(value);
    }

    return defaultValue || null;
  },

  /**
   * Convert a value into a size.
   *
   * @param value - Value to be converted intosize, a function will be executed as `(() => unknown)`.
   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
   * @returns Corresponding string value (number + 'px'), if none then the default value, if none then null.
   */
  asSize: function asSize(value, defaultValue) {
    if (typeof value == "function") {
      value = value();
    }

    if (isString(value)) {
      return value;
    } else if (isNumber(value)) {
      return value + "px";
    } else {
      return defaultValue || null;
    }
  },

  /**
   * Convert a value into a DOM Element.
   *
   * @param value - Value to be converted into DOM Element, a function will be executed as `(() => unknown)`.
   * @param defaultValue - If the value or the return value of the function == null then this will be returned.
   * @returns The DOM Element, if none then the default value, if none then null.
   */
  asElement: function asElement(value, defaultValue) {
    if (typeof value == "function") {
      value = value();
    }

    return value || defaultValue || null;
  }
};
/**
 * Convert hex color string into RGB color object.
 *
 * @remarks
 * {@link http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
 * @param hex - Hex color string (3 or 6 digits, with or without #).
 * @returns RGB color object.
 */

function hexToRGB(hex) {
  var result;

  switch (hex.length) {
    case 3:
    case 4:
      result = shortHexRE.exec(hex);
      return result ? {
        r: _parseInt(result[1] + result[1], 16),
        g: _parseInt(result[2] + result[2], 16),
        b: _parseInt(result[3] + result[3], 16)
      } : null;

    case 6:
    case 7:
      result = fullHexRE.exec(hex);
      return result ? {
        r: _parseInt(result[1], 16),
        g: _parseInt(result[2], 16),
        b: _parseInt(result[3], 16)
      } : null;

    default:
      return null;
  }
}
/**
 * This function takes string color in hex or RGB format and adds the opacity, RGBA is passed through unchanged.
 *
 * @param color - The color string (hex, RGB, RGBA).
 * @param opacity - The new opacity.
 * @returns RGBA string, for example 'rgba(255, 0, 127, 0.3)'.
 */

function overrideOpacity(color, opacity) {
  if (includes(color).call(color, "rgba")) {
    return color;
  } else if (includes(color).call(color, "rgb")) {
    var rgb = color.substr(indexOf(color).call(color, "(") + 1).replace(")", "").split(",");
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")";
  } else {
    var _rgb = hexToRGB(color);

    if (_rgb == null) {
      return color;
    } else {
      return "rgba(" + _rgb.r + "," + _rgb.g + "," + _rgb.b + "," + opacity + ")";
    }
  }
}
/**
 * Convert RGB \<0, 255\> into hex color string.
 *
 * @param red - Red channel.
 * @param green - Green channel.
 * @param blue - Blue channel.
 * @returns Hex color string (for example: '#0acdc0').
 */

function RGBToHex(red, green, blue) {
  var _context5;

  return "#" + slice$2(_context5 = ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16)).call(_context5, 1);
}
/**
 * Parse a color property into an object with border, background, and highlight colors.
 *
 * @param inputColor - Shorthand color string or input color object.
 * @param defaultColor - Full color object to fill in missing values in inputColor.
 * @returns Color object.
 */

function parseColor(inputColor, defaultColor) {
  if (isString(inputColor)) {
    var colorStr = inputColor;

    if (isValidRGB(colorStr)) {
      var _context6;

      var rgb = map(_context6 = colorStr.substr(4).substr(0, colorStr.length - 5).split(",")).call(_context6, function (value) {
        return _parseInt(value);
      });

      colorStr = RGBToHex(rgb[0], rgb[1], rgb[2]);
    }

    if (isValidHex(colorStr) === true) {
      var hsv = hexToHSV(colorStr);
      var lighterColorHSV = {
        h: hsv.h,
        s: hsv.s * 0.8,
        v: Math.min(1, hsv.v * 1.02)
      };
      var darkerColorHSV = {
        h: hsv.h,
        s: Math.min(1, hsv.s * 1.25),
        v: hsv.v * 0.8
      };
      var darkerColorHex = HSVToHex(darkerColorHSV.h, darkerColorHSV.s, darkerColorHSV.v);
      var lighterColorHex = HSVToHex(lighterColorHSV.h, lighterColorHSV.s, lighterColorHSV.v);
      return {
        background: colorStr,
        border: darkerColorHex,
        highlight: {
          background: lighterColorHex,
          border: darkerColorHex
        },
        hover: {
          background: lighterColorHex,
          border: darkerColorHex
        }
      };
    } else {
      return {
        background: colorStr,
        border: colorStr,
        highlight: {
          background: colorStr,
          border: colorStr
        },
        hover: {
          background: colorStr,
          border: colorStr
        }
      };
    }
  } else {
    if (defaultColor) {
      var color = {
        background: inputColor.background || defaultColor.background,
        border: inputColor.border || defaultColor.border,
        highlight: isString(inputColor.highlight) ? {
          border: inputColor.highlight,
          background: inputColor.highlight
        } : {
          background: inputColor.highlight && inputColor.highlight.background || defaultColor.highlight.background,
          border: inputColor.highlight && inputColor.highlight.border || defaultColor.highlight.border
        },
        hover: isString(inputColor.hover) ? {
          border: inputColor.hover,
          background: inputColor.hover
        } : {
          border: inputColor.hover && inputColor.hover.border || defaultColor.hover.border,
          background: inputColor.hover && inputColor.hover.background || defaultColor.hover.background
        }
      };
      return color;
    } else {
      var _color = {
        background: inputColor.background || undefined,
        border: inputColor.border || undefined,
        highlight: isString(inputColor.highlight) ? {
          border: inputColor.highlight,
          background: inputColor.highlight
        } : {
          background: inputColor.highlight && inputColor.highlight.background || undefined,
          border: inputColor.highlight && inputColor.highlight.border || undefined
        },
        hover: isString(inputColor.hover) ? {
          border: inputColor.hover,
          background: inputColor.hover
        } : {
          border: inputColor.hover && inputColor.hover.border || undefined,
          background: inputColor.hover && inputColor.hover.background || undefined
        }
      };
      return _color;
    }
  }
}
/**
 * Convert RGB \<0, 255\> into HSV object.
 *
 * @remarks
 * {@link http://www.javascripter.net/faq/rgb2hsv.htm}
 * @param red - Red channel.
 * @param green - Green channel.
 * @param blue - Blue channel.
 * @returns HSV color object.
 */

function RGBToHSV(red, green, blue) {
  red = red / 255;
  green = green / 255;
  blue = blue / 255;
  var minRGB = Math.min(red, Math.min(green, blue));
  var maxRGB = Math.max(red, Math.max(green, blue)); // Black-gray-white

  if (minRGB === maxRGB) {
    return {
      h: 0,
      s: 0,
      v: minRGB
    };
  } // Colors other than black-gray-white:


  var d = red === minRGB ? green - blue : blue === minRGB ? red - green : blue - red;
  var h = red === minRGB ? 3 : blue === minRGB ? 1 : 5;
  var hue = 60 * (h - d / (maxRGB - minRGB)) / 360;
  var saturation = (maxRGB - minRGB) / maxRGB;
  var value = maxRGB;
  return {
    h: hue,
    s: saturation,
    v: value
  };
}
var cssUtil = {
  // split a string with css styles into an object with key/values
  split: function split(cssText) {
    var _context7;

    var styles = {};

    forEach$1(_context7 = cssText.split(";")).call(_context7, function (style) {
      if (trim(style).call(style) != "") {
        var _context8, _context9;

        var parts = style.split(":");

        var key = trim(_context8 = parts[0]).call(_context8);

        var value = trim(_context9 = parts[1]).call(_context9);

        styles[key] = value;
      }
    });

    return styles;
  },
  // build a css text string from an object with key/values
  join: function join(styles) {
    var _context10;

    return map(_context10 = keys(styles)).call(_context10, function (key) {
      return key + ": " + styles[key];
    }).join("; ");
  }
};
/**
 * Append a string with css styles to an element.
 *
 * @param element - The element that will receive new styles.
 * @param cssText - The styles to be appended.
 */

function addCssText(element, cssText) {
  var currentStyles = cssUtil.split(element.style.cssText);
  var newStyles = cssUtil.split(cssText);

  var styles = _objectSpread(_objectSpread({}, currentStyles), newStyles);

  element.style.cssText = cssUtil.join(styles);
}
/**
 * Remove a string with css styles from an element.
 *
 * @param element - The element from which styles should be removed.
 * @param cssText - The styles to be removed.
 */

function removeCssText(element, cssText) {
  var styles = cssUtil.split(element.style.cssText);
  var removeStyles = cssUtil.split(cssText);

  for (var key in removeStyles) {
    if (Object.prototype.hasOwnProperty.call(removeStyles, key)) {
      delete styles[key];
    }
  }

  element.style.cssText = cssUtil.join(styles);
}
/**
 * Convert HSV \<0, 1\> into RGB color object.
 *
 * @remarks
 * {@link https://gist.github.com/mjijackson/5311256}
 * @param h - Hue.
 * @param s - Saturation.
 * @param v - Value.
 * @returns RGB color object.
 */

function HSVToRGB(h, s, v) {
  var r;
  var g;
  var b;
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;

    case 1:
      r = q, g = v, b = p;
      break;

    case 2:
      r = p, g = v, b = t;
      break;

    case 3:
      r = p, g = q, b = v;
      break;

    case 4:
      r = t, g = p, b = v;
      break;

    case 5:
      r = v, g = p, b = q;
      break;
  }

  return {
    r: Math.floor(r * 255),
    g: Math.floor(g * 255),
    b: Math.floor(b * 255)
  };
}
/**
 * Convert HSV \<0, 1\> into hex color string.
 *
 * @param h - Hue.
 * @param s - Saturation.
 * @param v - Value.
 * @returns Hex color string.
 */

function HSVToHex(h, s, v) {
  var rgb = HSVToRGB(h, s, v);
  return RGBToHex(rgb.r, rgb.g, rgb.b);
}
/**
 * Convert hex color string into HSV \<0, 1\>.
 *
 * @param hex - Hex color string.
 * @returns HSV color object.
 */

function hexToHSV(hex) {
  var rgb = hexToRGB(hex);

  if (!rgb) {
    throw new TypeError("'".concat(hex, "' is not a valid color."));
  }

  return RGBToHSV(rgb.r, rgb.g, rgb.b);
}
/**
 * Validate hex color string.
 *
 * @param hex - Unknown string that may contain a color.
 * @returns True if the string is valid, false otherwise.
 */

function isValidHex(hex) {
  var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
  return isOk;
}
/**
 * Validate RGB color string.
 *
 * @param rgb - Unknown string that may contain a color.
 * @returns True if the string is valid, false otherwise.
 */

function isValidRGB(rgb) {
  return rgbRE.test(rgb);
}
/**
 * Validate RGBA color string.
 *
 * @param rgba - Unknown string that may contain a color.
 * @returns True if the string is valid, false otherwise.
 */

function isValidRGBA(rgba) {
  return rgbaRE.test(rgba);
}
/**
 * This recursively redirects the prototype of JSON objects to the referenceObject.
 * This is used for default options.
 *
 * @param fields - Names of properties to be bridged.
 * @param referenceObject - The original object.
 * @returns A new object inheriting from the referenceObject.
 */

function selectiveBridgeObject(fields, referenceObject) {
  if (referenceObject !== null && _typeof(referenceObject) === "object") {
    // !!! typeof null === 'object'
    var objectTo = create(referenceObject);

    for (var i = 0; i < fields.length; i++) {
      if (Object.prototype.hasOwnProperty.call(referenceObject, fields[i])) {
        if (_typeof(referenceObject[fields[i]]) == "object") {
          objectTo[fields[i]] = bridgeObject(referenceObject[fields[i]]);
        }
      }
    }

    return objectTo;
  } else {
    return null;
  }
}
/**
 * This recursively redirects the prototype of JSON objects to the referenceObject.
 * This is used for default options.
 *
 * @param referenceObject - The original object.
 * @returns The Element if the referenceObject is an Element, or a new object inheriting from the referenceObject.
 */

function bridgeObject(referenceObject) {
  if (referenceObject === null || _typeof(referenceObject) !== "object") {
    return null;
  }

  if (referenceObject instanceof Element) {
    // Avoid bridging DOM objects
    return referenceObject;
  }

  var objectTo = create(referenceObject);

  for (var i in referenceObject) {
    if (Object.prototype.hasOwnProperty.call(referenceObject, i)) {
      if (_typeof(referenceObject[i]) == "object") {
        objectTo[i] = bridgeObject(referenceObject[i]);
      }
    }
  }

  return objectTo;
}
/**
 * This method provides a stable sort implementation, very fast for presorted data.
 *
 * @param a - The array to be sorted (in-place).
 * @param compare - An order comparator.
 * @returns The argument a.
 */

function insertSort(a, compare) {
  for (var i = 0; i < a.length; i++) {
    var k = a[i];
    var j = void 0;

    for (j = i; j > 0 && compare(k, a[j - 1]) < 0; j--) {
      a[j] = a[j - 1];
    }

    a[j] = k;
  }

  return a;
}
/**
 * This is used to set the options of subobjects in the options object.
 *
 * A requirement of these subobjects is that they have an 'enabled' element
 * which is optional for the user but mandatory for the program.
 *
 * The added value here of the merge is that option 'enabled' is set as required.
 *
 * @param mergeTarget - Either this.options or the options used for the groups.
 * @param options - Options.
 * @param option - Option key in the options argument.
 * @param globalOptions - Global options, passed in to determine value of option 'enabled'.
 */

function mergeOptions(mergeTarget, options, option) {
  var globalOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Local helpers
  var isPresent = function isPresent(obj) {
    return obj !== null && obj !== undefined;
  };

  var isObject = function isObject(obj) {
    return obj !== null && _typeof(obj) === "object";
  }; // https://stackoverflow.com/a/34491287/1223531


  var isEmpty = function isEmpty(obj) {
    for (var x in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, x)) {
        return false;
      }
    }

    return true;
  }; // Guards


  if (!isObject(mergeTarget)) {
    throw new Error("Parameter mergeTarget must be an object");
  }

  if (!isObject(options)) {
    throw new Error("Parameter options must be an object");
  }

  if (!isPresent(option)) {
    throw new Error("Parameter option must have a value");
  }

  if (!isObject(globalOptions)) {
    throw new Error("Parameter globalOptions must be an object");
  } //
  // Actual merge routine, separated from main logic
  // Only a single level of options is merged. Deeper levels are ref'd. This may actually be an issue.
  //


  var doMerge = function doMerge(target, options, option) {
    if (!isObject(target[option])) {
      target[option] = {};
    }

    var src = options[option];
    var dst = target[option];

    for (var prop in src) {
      if (Object.prototype.hasOwnProperty.call(src, prop)) {
        dst[prop] = src[prop];
      }
    }
  }; // Local initialization


  var srcOption = options[option];
  var globalPassed = isObject(globalOptions) && !isEmpty(globalOptions);
  var globalOption = globalPassed ? globalOptions[option] : undefined;
  var globalEnabled = globalOption ? globalOption.enabled : undefined; /////////////////////////////////////////
  // Main routine
  /////////////////////////////////////////

  if (srcOption === undefined) {
    return; // Nothing to do
  }

  if (typeof srcOption === "boolean") {
    if (!isObject(mergeTarget[option])) {
      mergeTarget[option] = {};
    }

    mergeTarget[option].enabled = srcOption;
    return;
  }

  if (srcOption === null && !isObject(mergeTarget[option])) {
    // If possible, explicit copy from globals
    if (isPresent(globalOption)) {
      mergeTarget[option] = create(globalOption);
    } else {
      return; // Nothing to do
    }
  }

  if (!isObject(srcOption)) {
    return;
  } //
  // Ensure that 'enabled' is properly set. It is required internally
  // Note that the value from options will always overwrite the existing value
  //


  var enabled = true; // default value

  if (srcOption.enabled !== undefined) {
    enabled = srcOption.enabled;
  } else {
    // Take from globals, if present
    if (globalEnabled !== undefined) {
      enabled = globalOption.enabled;
    }
  }

  doMerge(mergeTarget, options, option);
  mergeTarget[option].enabled = enabled;
}
/**
 * This function does a binary search for a visible item in a sorted list. If we find a visible item, the code that uses
 * this function will then iterate in both directions over this sorted list to find all visible items.
 *
 * @param orderedItems - Items ordered by start.
 * @param comparator - -1 is lower, 0 is equal, 1 is higher.
 * @param field - Property name on an item (That is item[field]).
 * @param field2 - Second property name on an item (That is item[field][field2]).
 * @returns Index of the found item or -1 if nothing was found.
 */

function binarySearchCustom(orderedItems, comparator, field, field2) {
  var maxIterations = 10000;
  var iteration = 0;
  var low = 0;
  var high = orderedItems.length - 1;

  while (low <= high && iteration < maxIterations) {
    var middle = Math.floor((low + high) / 2);
    var item = orderedItems[middle];
    var value = field2 === undefined ? item[field] : item[field][field2];
    var searchResult = comparator(value);

    if (searchResult == 0) {
      // jihaa, found a visible item!
      return middle;
    } else if (searchResult == -1) {
      // it is too small --> increase low
      low = middle + 1;
    } else {
      // it is too big --> decrease high
      high = middle - 1;
    }

    iteration++;
  }

  return -1;
}
/**
 * This function does a binary search for a specific value in a sorted array.
 * If it does not exist but is in between of two values, we return either the
 * one before or the one after, depending on user input If it is found, we
 * return the index, else -1.
 *
 * @param orderedItems - Sorted array.
 * @param target - The searched value.
 * @param field - Name of the property in items to be searched.
 * @param sidePreference - If the target is between two values, should the index of the before or the after be returned?
 * @param comparator - An optional comparator, returning -1, 0, 1 for \<, ===, \>.
 * @returns The index of found value or -1 if nothing was found.
 */

function binarySearchValue(orderedItems, target, field, sidePreference, comparator) {
  var maxIterations = 10000;
  var iteration = 0;
  var low = 0;
  var high = orderedItems.length - 1;
  var prevValue;
  var value;
  var nextValue;
  var middle;
  comparator = comparator != undefined ? comparator : function (a, b) {
    return a == b ? 0 : a < b ? -1 : 1;
  };

  while (low <= high && iteration < maxIterations) {
    // get a new guess
    middle = Math.floor(0.5 * (high + low));
    prevValue = orderedItems[Math.max(0, middle - 1)][field];
    value = orderedItems[middle][field];
    nextValue = orderedItems[Math.min(orderedItems.length - 1, middle + 1)][field];

    if (comparator(value, target) == 0) {
      // we found the target
      return middle;
    } else if (comparator(prevValue, target) < 0 && comparator(value, target) > 0) {
      // target is in between of the previous and the current
      return sidePreference == "before" ? Math.max(0, middle - 1) : middle;
    } else if (comparator(value, target) < 0 && comparator(nextValue, target) > 0) {
      // target is in between of the current and the next
      return sidePreference == "before" ? middle : Math.min(orderedItems.length - 1, middle + 1);
    } else {
      // didnt find the target, we need to change our boundaries.
      if (comparator(value, target) < 0) {
        // it is too small --> increase low
        low = middle + 1;
      } else {
        // it is too big --> decrease high
        high = middle - 1;
      }
    }

    iteration++;
  } // didnt find anything. Return -1.


  return -1;
}
/*
 * Easing Functions.
 * Only considering the t value for the range [0, 1] => [0, 1].
 *
 * Inspiration: from http://gizma.com/easing/
 * https://gist.github.com/gre/1650294
 */

var easingFunctions = {
  /**
   * Provides no easing and no acceleration.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  linear: function linear(t) {
    return t;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   * @returns Value at time t.
   */
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
/**
 * Experimentaly compute the width of the scrollbar for this browser.
 *
 * @returns The width in pixels.
 */

function getScrollBarWidth() {
  var inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  var outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);
  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  var w2 = inner.offsetWidth;

  if (w1 == w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);
  return w1 - w2;
} // @TODO: This doesn't work properly.
// It works only for single property objects,
// otherwise it combines all of the types in a union.
// export function topMost<K1 extends string, V1> (
//   pile: Record<K1, undefined | V1>[],
//   accessors: K1 | [K1]
// ): undefined | V1
// export function topMost<K1 extends string, K2 extends string, V1, V2> (
//   pile: Record<K1, undefined | V1 | Record<K2, undefined | V2>>[],
//   accessors: [K1, K2]
// ): undefined | V1 | V2
// export function topMost<K1 extends string, K2 extends string, K3 extends string, V1, V2, V3> (
//   pile: Record<K1, undefined | V1 | Record<K2, undefined | V2 | Record<K3, undefined | V3>>>[],
//   accessors: [K1, K2, K3]
// ): undefined | V1 | V2 | V3

/**
 * Get the top most property value from a pile of objects.
 *
 * @param pile - Array of objects, no required format.
 * @param accessors - Array of property names.
 * For example `object['foo']['bar']` → `['foo', 'bar']`.
 * @returns Value of the property with given accessors path from the first pile item where it's not undefined.
 */

function topMost(pile, accessors) {
  var candidate;

  if (!isArray$1(accessors)) {
    accessors = [accessors];
  }

  var _iterator = _createForOfIteratorHelper(pile),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var member = _step.value;

      if (member) {
        candidate = member[accessors[0]];

        for (var i = 1; i < accessors.length; i++) {
          if (candidate) {
            candidate = candidate[accessors[i]];
          }
        }

        if (typeof candidate !== "undefined") {
          break;
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return candidate;
}

var htmlColors = {
  black: "#000000",
  navy: "#000080",
  darkblue: "#00008B",
  mediumblue: "#0000CD",
  blue: "#0000FF",
  darkgreen: "#006400",
  green: "#008000",
  teal: "#008080",
  darkcyan: "#008B8B",
  deepskyblue: "#00BFFF",
  darkturquoise: "#00CED1",
  mediumspringgreen: "#00FA9A",
  lime: "#00FF00",
  springgreen: "#00FF7F",
  aqua: "#00FFFF",
  cyan: "#00FFFF",
  midnightblue: "#191970",
  dodgerblue: "#1E90FF",
  lightseagreen: "#20B2AA",
  forestgreen: "#228B22",
  seagreen: "#2E8B57",
  darkslategray: "#2F4F4F",
  limegreen: "#32CD32",
  mediumseagreen: "#3CB371",
  turquoise: "#40E0D0",
  royalblue: "#4169E1",
  steelblue: "#4682B4",
  darkslateblue: "#483D8B",
  mediumturquoise: "#48D1CC",
  indigo: "#4B0082",
  darkolivegreen: "#556B2F",
  cadetblue: "#5F9EA0",
  cornflowerblue: "#6495ED",
  mediumaquamarine: "#66CDAA",
  dimgray: "#696969",
  slateblue: "#6A5ACD",
  olivedrab: "#6B8E23",
  slategray: "#708090",
  lightslategray: "#778899",
  mediumslateblue: "#7B68EE",
  lawngreen: "#7CFC00",
  chartreuse: "#7FFF00",
  aquamarine: "#7FFFD4",
  maroon: "#800000",
  purple: "#800080",
  olive: "#808000",
  gray: "#808080",
  skyblue: "#87CEEB",
  lightskyblue: "#87CEFA",
  blueviolet: "#8A2BE2",
  darkred: "#8B0000",
  darkmagenta: "#8B008B",
  saddlebrown: "#8B4513",
  darkseagreen: "#8FBC8F",
  lightgreen: "#90EE90",
  mediumpurple: "#9370D8",
  darkviolet: "#9400D3",
  palegreen: "#98FB98",
  darkorchid: "#9932CC",
  yellowgreen: "#9ACD32",
  sienna: "#A0522D",
  brown: "#A52A2A",
  darkgray: "#A9A9A9",
  lightblue: "#ADD8E6",
  greenyellow: "#ADFF2F",
  paleturquoise: "#AFEEEE",
  lightsteelblue: "#B0C4DE",
  powderblue: "#B0E0E6",
  firebrick: "#B22222",
  darkgoldenrod: "#B8860B",
  mediumorchid: "#BA55D3",
  rosybrown: "#BC8F8F",
  darkkhaki: "#BDB76B",
  silver: "#C0C0C0",
  mediumvioletred: "#C71585",
  indianred: "#CD5C5C",
  peru: "#CD853F",
  chocolate: "#D2691E",
  tan: "#D2B48C",
  lightgrey: "#D3D3D3",
  palevioletred: "#D87093",
  thistle: "#D8BFD8",
  orchid: "#DA70D6",
  goldenrod: "#DAA520",
  crimson: "#DC143C",
  gainsboro: "#DCDCDC",
  plum: "#DDA0DD",
  burlywood: "#DEB887",
  lightcyan: "#E0FFFF",
  lavender: "#E6E6FA",
  darksalmon: "#E9967A",
  violet: "#EE82EE",
  palegoldenrod: "#EEE8AA",
  lightcoral: "#F08080",
  khaki: "#F0E68C",
  aliceblue: "#F0F8FF",
  honeydew: "#F0FFF0",
  azure: "#F0FFFF",
  sandybrown: "#F4A460",
  wheat: "#F5DEB3",
  beige: "#F5F5DC",
  whitesmoke: "#F5F5F5",
  mintcream: "#F5FFFA",
  ghostwhite: "#F8F8FF",
  salmon: "#FA8072",
  antiquewhite: "#FAEBD7",
  linen: "#FAF0E6",
  lightgoldenrodyellow: "#FAFAD2",
  oldlace: "#FDF5E6",
  red: "#FF0000",
  fuchsia: "#FF00FF",
  magenta: "#FF00FF",
  deeppink: "#FF1493",
  orangered: "#FF4500",
  tomato: "#FF6347",
  hotpink: "#FF69B4",
  coral: "#FF7F50",
  darkorange: "#FF8C00",
  lightsalmon: "#FFA07A",
  orange: "#FFA500",
  lightpink: "#FFB6C1",
  pink: "#FFC0CB",
  gold: "#FFD700",
  peachpuff: "#FFDAB9",
  navajowhite: "#FFDEAD",
  moccasin: "#FFE4B5",
  bisque: "#FFE4C4",
  mistyrose: "#FFE4E1",
  blanchedalmond: "#FFEBCD",
  papayawhip: "#FFEFD5",
  lavenderblush: "#FFF0F5",
  seashell: "#FFF5EE",
  cornsilk: "#FFF8DC",
  lemonchiffon: "#FFFACD",
  floralwhite: "#FFFAF0",
  snow: "#FFFAFA",
  yellow: "#FFFF00",
  lightyellow: "#FFFFE0",
  ivory: "#FFFFF0",
  white: "#FFFFFF"
};
/**
 * @param {number} [pixelRatio=1]
 */

var ColorPicker$1 = /*#__PURE__*/function () {
  /**
   * @param {number} [pixelRatio=1]
   */
  function ColorPicker() {
    var pixelRatio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    _classCallCheck(this, ColorPicker);

    this.pixelRatio = pixelRatio;
    this.generated = false;
    this.centerCoordinates = {
      x: 289 / 2,
      y: 289 / 2
    };
    this.r = 289 * 0.49;
    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 1.0
    };
    this.hueCircle = undefined;
    this.initialColor = {
      r: 255,
      g: 255,
      b: 255,
      a: 1.0
    };
    this.previousColor = undefined;
    this.applied = false; // bound by

    this.updateCallback = function () {};

    this.closeCallback = function () {}; // create all DOM elements


    this._create();
  }
  /**
   * this inserts the colorPicker into a div from the DOM
   *
   * @param {Element} container
   */


  _createClass(ColorPicker, [{
    key: "insertTo",
    value: function insertTo(container) {
      if (this.hammer !== undefined) {
        this.hammer.destroy();
        this.hammer = undefined;
      }

      this.container = container;
      this.container.appendChild(this.frame);

      this._bindHammer();

      this._setSize();
    }
    /**
     * the callback is executed on apply and save. Bind it to the application
     *
     * @param {Function} callback
     */

  }, {
    key: "setUpdateCallback",
    value: function setUpdateCallback(callback) {
      if (typeof callback === "function") {
        this.updateCallback = callback;
      } else {
        throw new Error("Function attempted to set as colorPicker update callback is not a function.");
      }
    }
    /**
     * the callback is executed on apply and save. Bind it to the application
     *
     * @param {Function} callback
     */

  }, {
    key: "setCloseCallback",
    value: function setCloseCallback(callback) {
      if (typeof callback === "function") {
        this.closeCallback = callback;
      } else {
        throw new Error("Function attempted to set as colorPicker closing callback is not a function.");
      }
    }
    /**
     *
     * @param {string} color
     * @returns {string}
     * @private
     */

  }, {
    key: "_isColorString",
    value: function _isColorString(color) {
      if (typeof color === "string") {
        return htmlColors[color];
      }
    }
    /**
     * Set the color of the colorPicker
     * Supported formats:
     * 'red'                   --> HTML color string
     * '#ffffff'               --> hex string
     * 'rgb(255,255,255)'      --> rgb string
     * 'rgba(255,255,255,1.0)' --> rgba string
     * {r:255,g:255,b:255}     --> rgb object
     * {r:255,g:255,b:255,a:1.0} --> rgba object
     *
     * @param {string | object} color
     * @param {boolean} [setInitial=true]
     */

  }, {
    key: "setColor",
    value: function setColor(color) {
      var setInitial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (color === "none") {
        return;
      }

      var rgba; // if a html color shorthand is used, convert to hex

      var htmlColor = this._isColorString(color);

      if (htmlColor !== undefined) {
        color = htmlColor;
      } // check format


      if (isString(color) === true) {
        if (isValidRGB(color) === true) {
          var rgbaArray = color.substr(4).substr(0, color.length - 5).split(",");
          rgba = {
            r: rgbaArray[0],
            g: rgbaArray[1],
            b: rgbaArray[2],
            a: 1.0
          };
        } else if (isValidRGBA(color) === true) {
          var _rgbaArray = color.substr(5).substr(0, color.length - 6).split(",");

          rgba = {
            r: _rgbaArray[0],
            g: _rgbaArray[1],
            b: _rgbaArray[2],
            a: _rgbaArray[3]
          };
        } else if (isValidHex(color) === true) {
          var rgbObj = hexToRGB(color);
          rgba = {
            r: rgbObj.r,
            g: rgbObj.g,
            b: rgbObj.b,
            a: 1.0
          };
        }
      } else {
        if (color instanceof Object) {
          if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
            var alpha = color.a !== undefined ? color.a : "1.0";
            rgba = {
              r: color.r,
              g: color.g,
              b: color.b,
              a: alpha
            };
          }
        }
      } // set color


      if (rgba === undefined) {
        throw new Error("Unknown color passed to the colorPicker. Supported are strings: rgb, hex, rgba. Object: rgb ({r:r,g:g,b:b,[a:a]}). Supplied: " + stringify(color));
      } else {
        this._setColor(rgba, setInitial);
      }
    }
    /**
     * this shows the color picker.
     * The hue circle is constructed once and stored.
     */

  }, {
    key: "show",
    value: function show() {
      if (this.closeCallback !== undefined) {
        this.closeCallback();
        this.closeCallback = undefined;
      }

      this.applied = false;
      this.frame.style.display = "block";

      this._generateHueCircle();
    } // ------------------------------------------ PRIVATE ----------------------------- //

    /**
     * Hide the picker. Is called by the cancel button.
     * Optional boolean to store the previous color for easy access later on.
     *
     * @param {boolean} [storePrevious=true]
     * @private
     */

  }, {
    key: "_hide",
    value: function _hide() {
      var _this = this;

      var storePrevious = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      // store the previous color for next time;
      if (storePrevious === true) {
        this.previousColor = assign({}, this.color);
      }

      if (this.applied === true) {
        this.updateCallback(this.initialColor);
      }

      this.frame.style.display = "none"; // call the closing callback, restoring the onclick method.
      // this is in a setTimeout because it will trigger the show again before the click is done.

      setTimeout$1(function () {
        if (_this.closeCallback !== undefined) {
          _this.closeCallback();

          _this.closeCallback = undefined;
        }
      }, 0);
    }
    /**
     * bound to the save button. Saves and hides.
     *
     * @private
     */

  }, {
    key: "_save",
    value: function _save() {
      this.updateCallback(this.color);
      this.applied = false;

      this._hide();
    }
    /**
     * Bound to apply button. Saves but does not close. Is undone by the cancel button.
     *
     * @private
     */

  }, {
    key: "_apply",
    value: function _apply() {
      this.applied = true;
      this.updateCallback(this.color);

      this._updatePicker(this.color);
    }
    /**
     * load the color from the previous session.
     *
     * @private
     */

  }, {
    key: "_loadLast",
    value: function _loadLast() {
      if (this.previousColor !== undefined) {
        this.setColor(this.previousColor, false);
      } else {
        alert("There is no last color to load...");
      }
    }
    /**
     * set the color, place the picker
     *
     * @param {object} rgba
     * @param {boolean} [setInitial=true]
     * @private
     */

  }, {
    key: "_setColor",
    value: function _setColor(rgba) {
      var setInitial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // store the initial color
      if (setInitial === true) {
        this.initialColor = assign({}, rgba);
      }

      this.color = rgba;
      var hsv = RGBToHSV(rgba.r, rgba.g, rgba.b);
      var angleConvert = 2 * Math.PI;
      var radius = this.r * hsv.s;
      var x = this.centerCoordinates.x + radius * Math.sin(angleConvert * hsv.h);
      var y = this.centerCoordinates.y + radius * Math.cos(angleConvert * hsv.h);
      this.colorPickerSelector.style.left = x - 0.5 * this.colorPickerSelector.clientWidth + "px";
      this.colorPickerSelector.style.top = y - 0.5 * this.colorPickerSelector.clientHeight + "px";

      this._updatePicker(rgba);
    }
    /**
     * bound to opacity control
     *
     * @param {number} value
     * @private
     */

  }, {
    key: "_setOpacity",
    value: function _setOpacity(value) {
      this.color.a = value / 100;

      this._updatePicker(this.color);
    }
    /**
     * bound to brightness control
     *
     * @param {number} value
     * @private
     */

  }, {
    key: "_setBrightness",
    value: function _setBrightness(value) {
      var hsv = RGBToHSV(this.color.r, this.color.g, this.color.b);
      hsv.v = value / 100;
      var rgba = HSVToRGB(hsv.h, hsv.s, hsv.v);
      rgba["a"] = this.color.a;
      this.color = rgba;

      this._updatePicker();
    }
    /**
     * update the color picker. A black circle overlays the hue circle to mimic the brightness decreasing.
     *
     * @param {object} rgba
     * @private
     */

  }, {
    key: "_updatePicker",
    value: function _updatePicker() {
      var rgba = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.color;
      var hsv = RGBToHSV(rgba.r, rgba.g, rgba.b);
      var ctx = this.colorPickerCanvas.getContext("2d");

      if (this.pixelRation === undefined) {
        this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
      }

      ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0); // clear the canvas

      var w = this.colorPickerCanvas.clientWidth;
      var h = this.colorPickerCanvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.putImageData(this.hueCircle, 0, 0);
      ctx.fillStyle = "rgba(0,0,0," + (1 - hsv.v) + ")";
      ctx.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r);

      fill(ctx).call(ctx);

      this.brightnessRange.value = 100 * hsv.v;
      this.opacityRange.value = 100 * rgba.a;
      this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")";
      this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    }
    /**
     * used by create to set the size of the canvas.
     *
     * @private
     */

  }, {
    key: "_setSize",
    value: function _setSize() {
      this.colorPickerCanvas.style.width = "100%";
      this.colorPickerCanvas.style.height = "100%";
      this.colorPickerCanvas.width = 289 * this.pixelRatio;
      this.colorPickerCanvas.height = 289 * this.pixelRatio;
    }
    /**
     * create all dom elements
     * TODO: cleanup, lots of similar dom elements
     *
     * @private
     */

  }, {
    key: "_create",
    value: function _create() {
      var _context, _context2, _context3, _context4;

      this.frame = document.createElement("div");
      this.frame.className = "vis-color-picker";
      this.colorPickerDiv = document.createElement("div");
      this.colorPickerSelector = document.createElement("div");
      this.colorPickerSelector.className = "vis-selector";
      this.colorPickerDiv.appendChild(this.colorPickerSelector);
      this.colorPickerCanvas = document.createElement("canvas");
      this.colorPickerDiv.appendChild(this.colorPickerCanvas);

      if (!this.colorPickerCanvas.getContext) {
        var noCanvas = document.createElement("DIV");
        noCanvas.style.color = "red";
        noCanvas.style.fontWeight = "bold";
        noCanvas.style.padding = "10px";
        noCanvas.innerText = "Error: your browser does not support HTML canvas";
        this.colorPickerCanvas.appendChild(noCanvas);
      } else {
        var ctx = this.colorPickerCanvas.getContext("2d");
        this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
        this.colorPickerCanvas.getContext("2d").setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      }

      this.colorPickerDiv.className = "vis-color";
      this.opacityDiv = document.createElement("div");
      this.opacityDiv.className = "vis-opacity";
      this.brightnessDiv = document.createElement("div");
      this.brightnessDiv.className = "vis-brightness";
      this.arrowDiv = document.createElement("div");
      this.arrowDiv.className = "vis-arrow";
      this.opacityRange = document.createElement("input");

      try {
        this.opacityRange.type = "range"; // Not supported on IE9

        this.opacityRange.min = "0";
        this.opacityRange.max = "100";
      } catch (err) {// TODO: Add some error handling.
      }

      this.opacityRange.value = "100";
      this.opacityRange.className = "vis-range";
      this.brightnessRange = document.createElement("input");

      try {
        this.brightnessRange.type = "range"; // Not supported on IE9

        this.brightnessRange.min = "0";
        this.brightnessRange.max = "100";
      } catch (err) {// TODO: Add some error handling.
      }

      this.brightnessRange.value = "100";
      this.brightnessRange.className = "vis-range";
      this.opacityDiv.appendChild(this.opacityRange);
      this.brightnessDiv.appendChild(this.brightnessRange);
      var me = this;

      this.opacityRange.onchange = function () {
        me._setOpacity(this.value);
      };

      this.opacityRange.oninput = function () {
        me._setOpacity(this.value);
      };

      this.brightnessRange.onchange = function () {
        me._setBrightness(this.value);
      };

      this.brightnessRange.oninput = function () {
        me._setBrightness(this.value);
      };

      this.brightnessLabel = document.createElement("div");
      this.brightnessLabel.className = "vis-label vis-brightness";
      this.brightnessLabel.innerText = "brightness:";
      this.opacityLabel = document.createElement("div");
      this.opacityLabel.className = "vis-label vis-opacity";
      this.opacityLabel.innerText = "opacity:";
      this.newColorDiv = document.createElement("div");
      this.newColorDiv.className = "vis-new-color";
      this.newColorDiv.innerText = "new";
      this.initialColorDiv = document.createElement("div");
      this.initialColorDiv.className = "vis-initial-color";
      this.initialColorDiv.innerText = "initial";
      this.cancelButton = document.createElement("div");
      this.cancelButton.className = "vis-button vis-cancel";
      this.cancelButton.innerText = "cancel";
      this.cancelButton.onclick = bind(_context = this._hide).call(_context, this, false);
      this.applyButton = document.createElement("div");
      this.applyButton.className = "vis-button vis-apply";
      this.applyButton.innerText = "apply";
      this.applyButton.onclick = bind(_context2 = this._apply).call(_context2, this);
      this.saveButton = document.createElement("div");
      this.saveButton.className = "vis-button vis-save";
      this.saveButton.innerText = "save";
      this.saveButton.onclick = bind(_context3 = this._save).call(_context3, this);
      this.loadButton = document.createElement("div");
      this.loadButton.className = "vis-button vis-load";
      this.loadButton.innerText = "load last";
      this.loadButton.onclick = bind(_context4 = this._loadLast).call(_context4, this);
      this.frame.appendChild(this.colorPickerDiv);
      this.frame.appendChild(this.arrowDiv);
      this.frame.appendChild(this.brightnessLabel);
      this.frame.appendChild(this.brightnessDiv);
      this.frame.appendChild(this.opacityLabel);
      this.frame.appendChild(this.opacityDiv);
      this.frame.appendChild(this.newColorDiv);
      this.frame.appendChild(this.initialColorDiv);
      this.frame.appendChild(this.cancelButton);
      this.frame.appendChild(this.applyButton);
      this.frame.appendChild(this.saveButton);
      this.frame.appendChild(this.loadButton);
    }
    /**
     * bind hammer to the color picker
     *
     * @private
     */

  }, {
    key: "_bindHammer",
    value: function _bindHammer() {
      var _this2 = this;

      this.drag = {};
      this.pinch = {};
      this.hammer = new Hammer$1(this.colorPickerCanvas);
      this.hammer.get("pinch").set({
        enable: true
      });
      this.hammer.on("hammer.input", function (event) {
        if (event.isFirst) {
          _this2._moveSelector(event);
        }
      });
      this.hammer.on("tap", function (event) {
        _this2._moveSelector(event);
      });
      this.hammer.on("panstart", function (event) {
        _this2._moveSelector(event);
      });
      this.hammer.on("panmove", function (event) {
        _this2._moveSelector(event);
      });
      this.hammer.on("panend", function (event) {
        _this2._moveSelector(event);
      });
    }
    /**
     * generate the hue circle. This is relatively heavy (200ms) and is done only once on the first time it is shown.
     *
     * @private
     */

  }, {
    key: "_generateHueCircle",
    value: function _generateHueCircle() {
      if (this.generated === false) {
        var ctx = this.colorPickerCanvas.getContext("2d");

        if (this.pixelRation === undefined) {
          this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
        }

        ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0); // clear the canvas

        var w = this.colorPickerCanvas.clientWidth;
        var h = this.colorPickerCanvas.clientHeight;
        ctx.clearRect(0, 0, w, h); // draw hue circle

        var x, y, hue, sat;
        this.centerCoordinates = {
          x: w * 0.5,
          y: h * 0.5
        };
        this.r = 0.49 * w;
        var angleConvert = 2 * Math.PI / 360;
        var hfac = 1 / 360;
        var sfac = 1 / this.r;
        var rgb;

        for (hue = 0; hue < 360; hue++) {
          for (sat = 0; sat < this.r; sat++) {
            x = this.centerCoordinates.x + sat * Math.sin(angleConvert * hue);
            y = this.centerCoordinates.y + sat * Math.cos(angleConvert * hue);
            rgb = HSVToRGB(hue * hfac, sat * sfac, 1);
            ctx.fillStyle = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            ctx.fillRect(x - 0.5, y - 0.5, 2, 2);
          }
        }

        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r);
        ctx.stroke();
        this.hueCircle = ctx.getImageData(0, 0, w, h);
      }

      this.generated = true;
    }
    /**
     * move the selector. This is called by hammer functions.
     *
     * @param {Event}  event   The event
     * @private
     */

  }, {
    key: "_moveSelector",
    value: function _moveSelector(event) {
      var rect = this.colorPickerDiv.getBoundingClientRect();
      var left = event.center.x - rect.left;
      var top = event.center.y - rect.top;
      var centerY = 0.5 * this.colorPickerDiv.clientHeight;
      var centerX = 0.5 * this.colorPickerDiv.clientWidth;
      var x = left - centerX;
      var y = top - centerY;
      var angle = Math.atan2(x, y);
      var radius = 0.98 * Math.min(Math.sqrt(x * x + y * y), centerX);
      var newTop = Math.cos(angle) * radius + centerY;
      var newLeft = Math.sin(angle) * radius + centerX;
      this.colorPickerSelector.style.top = newTop - 0.5 * this.colorPickerSelector.clientHeight + "px";
      this.colorPickerSelector.style.left = newLeft - 0.5 * this.colorPickerSelector.clientWidth + "px"; // set color

      var h = angle / (2 * Math.PI);
      h = h < 0 ? h + 1 : h;
      var s = radius / this.r;
      var hsv = RGBToHSV(this.color.r, this.color.g, this.color.b);
      hsv.h = h;
      hsv.s = s;
      var rgba = HSVToRGB(hsv.h, hsv.s, hsv.v);
      rgba["a"] = this.color.a;
      this.color = rgba; // update previews

      this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")";
      this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    }
  }]);

  return ColorPicker;
}();

/**
 * Wrap given text (last argument) in HTML elements (all preceding arguments).
 *
 * @param {...any} rest - List of tag names followed by inner text.
 * @returns An element or a text node.
 */

function wrapInTag() {
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  if (rest.length < 1) {
    throw new TypeError("Invalid arguments.");
  } else if (rest.length === 1) {
    return document.createTextNode(rest[0]);
  } else {
    var element = document.createElement(rest[0]);
    element.appendChild(wrapInTag.apply(void 0, _toConsumableArray(slice$2(rest).call(rest, 1))));
    return element;
  }
}
/**
 * The way this works is for all properties of this.possible options, you can supply the property name in any form to list the options.
 * Boolean options are recognised as Boolean
 * Number options should be written as array: [default value, min value, max value, stepsize]
 * Colors should be written as array: ['color', '#ffffff']
 * Strings with should be written as array: [option1, option2, option3, ..]
 *
 * The options are matched with their counterparts in each of the modules and the values used in the configuration are
 */


var Configurator$1 = /*#__PURE__*/function () {
  /**
   * @param {object} parentModule        | the location where parentModule.setOptions() can be called
   * @param {object} defaultContainer    | the default container of the module
   * @param {object} configureOptions    | the fully configured and predefined options set found in allOptions.js
   * @param {number} pixelRatio          | canvas pixel ratio
   * @param {Function} hideOption        | custom logic to dynamically hide options
   */
  function Configurator(parentModule, defaultContainer, configureOptions) {
    var pixelRatio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var hideOption = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {
      return false;
    };

    _classCallCheck(this, Configurator);

    this.parent = parentModule;
    this.changedOptions = [];
    this.container = defaultContainer;
    this.allowCreation = false;
    this.hideOption = hideOption;
    this.options = {};
    this.initialized = false;
    this.popupCounter = 0;
    this.defaultOptions = {
      enabled: false,
      filter: true,
      container: undefined,
      showButton: true
    };

    assign(this.options, this.defaultOptions);

    this.configureOptions = configureOptions;
    this.moduleOptions = {};
    this.domElements = [];
    this.popupDiv = {};
    this.popupLimit = 5;
    this.popupHistory = {};
    this.colorPicker = new ColorPicker$1(pixelRatio);
    this.wrapper = undefined;
  }
  /**
   * refresh all options.
   * Because all modules parse their options by themselves, we just use their options. We copy them here.
   *
   * @param {object} options
   */


  _createClass(Configurator, [{
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        // reset the popup history because the indices may have been changed.
        this.popupHistory = {};

        this._removePopup();

        var enabled = true;

        if (typeof options === "string") {
          this.options.filter = options;
        } else if (isArray$1(options)) {
          this.options.filter = options.join();
        } else if (_typeof(options) === "object") {
          if (options == null) {
            throw new TypeError("options cannot be null");
          }

          if (options.container !== undefined) {
            this.options.container = options.container;
          }

          if (filter(options) !== undefined) {
            this.options.filter = filter(options);
          }

          if (options.showButton !== undefined) {
            this.options.showButton = options.showButton;
          }

          if (options.enabled !== undefined) {
            enabled = options.enabled;
          }
        } else if (typeof options === "boolean") {
          this.options.filter = true;
          enabled = options;
        } else if (typeof options === "function") {
          this.options.filter = options;
          enabled = true;
        }

        if (filter(this.options) === false) {
          enabled = false;
        }

        this.options.enabled = enabled;
      }

      this._clean();
    }
    /**
     *
     * @param {object} moduleOptions
     */

  }, {
    key: "setModuleOptions",
    value: function setModuleOptions(moduleOptions) {
      this.moduleOptions = moduleOptions;

      if (this.options.enabled === true) {
        this._clean();

        if (this.options.container !== undefined) {
          this.container = this.options.container;
        }

        this._create();
      }
    }
    /**
     * Create all DOM elements
     *
     * @private
     */

  }, {
    key: "_create",
    value: function _create() {
      this._clean();

      this.changedOptions = [];

      var filter$1 = filter(this.options);

      var counter = 0;
      var show = false;

      for (var option in this.configureOptions) {
        if (Object.prototype.hasOwnProperty.call(this.configureOptions, option)) {
          this.allowCreation = false;
          show = false;

          if (typeof filter$1 === "function") {
            show = filter$1(option, []);
            show = show || this._handleObject(this.configureOptions[option], [option], true);
          } else if (filter$1 === true || indexOf(filter$1).call(filter$1, option) !== -1) {
            show = true;
          }

          if (show !== false) {
            this.allowCreation = true; // linebreak between categories

            if (counter > 0) {
              this._makeItem([]);
            } // a header for the category


            this._makeHeader(option); // get the sub options


            this._handleObject(this.configureOptions[option], [option]);
          }

          counter++;
        }
      }

      this._makeButton();

      this._push(); //~ this.colorPicker.insertTo(this.container);

    }
    /**
     * draw all DOM elements on the screen
     *
     * @private
     */

  }, {
    key: "_push",
    value: function _push() {
      this.wrapper = document.createElement("div");
      this.wrapper.className = "vis-configuration-wrapper";
      this.container.appendChild(this.wrapper);

      for (var i = 0; i < this.domElements.length; i++) {
        this.wrapper.appendChild(this.domElements[i]);
      }

      this._showPopupIfNeeded();
    }
    /**
     * delete all DOM elements
     *
     * @private
     */

  }, {
    key: "_clean",
    value: function _clean() {
      for (var i = 0; i < this.domElements.length; i++) {
        this.wrapper.removeChild(this.domElements[i]);
      }

      if (this.wrapper !== undefined) {
        this.container.removeChild(this.wrapper);
        this.wrapper = undefined;
      }

      this.domElements = [];

      this._removePopup();
    }
    /**
     * get the value from the actualOptions if it exists
     *
     * @param {Array} path    | where to look for the actual option
     * @returns {*}
     * @private
     */

  }, {
    key: "_getValue",
    value: function _getValue(path) {
      var base = this.moduleOptions;

      for (var i = 0; i < path.length; i++) {
        if (base[path[i]] !== undefined) {
          base = base[path[i]];
        } else {
          base = undefined;
          break;
        }
      }

      return base;
    }
    /**
     * all option elements are wrapped in an item
     *
     * @param {Array} path    | where to look for the actual option
     * @param {Array.<Element>} domElements
     * @returns {number}
     * @private
     */

  }, {
    key: "_makeItem",
    value: function _makeItem(path) {
      if (this.allowCreation === true) {
        var item = document.createElement("div");
        item.className = "vis-configuration vis-config-item vis-config-s" + path.length;

        for (var _len2 = arguments.length, domElements = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          domElements[_key2 - 1] = arguments[_key2];
        }

        forEach$1(domElements).call(domElements, function (element) {
          item.appendChild(element);
        });

        this.domElements.push(item);
        return this.domElements.length;
      }

      return 0;
    }
    /**
     * header for major subjects
     *
     * @param {string} name
     * @private
     */

  }, {
    key: "_makeHeader",
    value: function _makeHeader(name) {
      var div = document.createElement("div");
      div.className = "vis-configuration vis-config-header";
      div.innerText = name;

      this._makeItem([], div);
    }
    /**
     * make a label, if it is an object label, it gets different styling.
     *
     * @param {string} name
     * @param {Array} path    | where to look for the actual option
     * @param {string} objectLabel
     * @returns {HTMLElement}
     * @private
     */

  }, {
    key: "_makeLabel",
    value: function _makeLabel(name, path) {
      var objectLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var div = document.createElement("div");
      div.className = "vis-configuration vis-config-label vis-config-s" + path.length;

      if (objectLabel === true) {
        while (div.firstChild) {
          div.removeChild(div.firstChild);
        }

        div.appendChild(wrapInTag("i", "b", name));
      } else {
        div.innerText = name + ":";
      }

      return div;
    }
    /**
     * make a dropdown list for multiple possible string optoins
     *
     * @param {Array.<number>} arr
     * @param {number} value
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_makeDropdown",
    value: function _makeDropdown(arr, value, path) {
      var select = document.createElement("select");
      select.className = "vis-configuration vis-config-select";
      var selectedValue = 0;

      if (value !== undefined) {
        if (indexOf(arr).call(arr, value) !== -1) {
          selectedValue = indexOf(arr).call(arr, value);
        }
      }

      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.value = arr[i];

        if (i === selectedValue) {
          option.selected = "selected";
        }

        option.innerText = arr[i];
        select.appendChild(option);
      }

      var me = this;

      select.onchange = function () {
        me._update(this.value, path);
      };

      var label = this._makeLabel(path[path.length - 1], path);

      this._makeItem(path, label, select);
    }
    /**
     * make a range object for numeric options
     *
     * @param {Array.<number>} arr
     * @param {number} value
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_makeRange",
    value: function _makeRange(arr, value, path) {
      var defaultValue = arr[0];
      var min = arr[1];
      var max = arr[2];
      var step = arr[3];
      var range = document.createElement("input");
      range.className = "vis-configuration vis-config-range";

      try {
        range.type = "range"; // not supported on IE9

        range.min = min;
        range.max = max;
      } catch (err) {// TODO: Add some error handling.
      }

      range.step = step; // set up the popup settings in case they are needed.

      var popupString = "";
      var popupValue = 0;

      if (value !== undefined) {
        var factor = 1.2;

        if (value < 0 && value * factor < min) {
          range.min = Math.ceil(value * factor);
          popupValue = range.min;
          popupString = "range increased";
        } else if (value / factor < min) {
          range.min = Math.ceil(value / factor);
          popupValue = range.min;
          popupString = "range increased";
        }

        if (value * factor > max && max !== 1) {
          range.max = Math.ceil(value * factor);
          popupValue = range.max;
          popupString = "range increased";
        }

        range.value = value;
      } else {
        range.value = defaultValue;
      }

      var input = document.createElement("input");
      input.className = "vis-configuration vis-config-rangeinput";
      input.value = range.value;
      var me = this;

      range.onchange = function () {
        input.value = this.value;

        me._update(Number(this.value), path);
      };

      range.oninput = function () {
        input.value = this.value;
      };

      var label = this._makeLabel(path[path.length - 1], path);

      var itemIndex = this._makeItem(path, label, range, input); // if a popup is needed AND it has not been shown for this value, show it.


      if (popupString !== "" && this.popupHistory[itemIndex] !== popupValue) {
        this.popupHistory[itemIndex] = popupValue;

        this._setupPopup(popupString, itemIndex);
      }
    }
    /**
     * make a button object
     *
     * @private
     */

  }, {
    key: "_makeButton",
    value: function _makeButton() {
      var _this = this;

      if (this.options.showButton === true) {
        var generateButton = document.createElement("div");
        generateButton.className = "vis-configuration vis-config-button";
        generateButton.innerText = "generate options";

        generateButton.onclick = function () {
          _this._printOptions();
        };

        generateButton.onmouseover = function () {
          generateButton.className = "vis-configuration vis-config-button hover";
        };

        generateButton.onmouseout = function () {
          generateButton.className = "vis-configuration vis-config-button";
        };

        this.optionsContainer = document.createElement("div");
        this.optionsContainer.className = "vis-configuration vis-config-option-container";
        this.domElements.push(this.optionsContainer);
        this.domElements.push(generateButton);
      }
    }
    /**
     * prepare the popup
     *
     * @param {string} string
     * @param {number} index
     * @private
     */

  }, {
    key: "_setupPopup",
    value: function _setupPopup(string, index) {
      var _this2 = this;

      if (this.initialized === true && this.allowCreation === true && this.popupCounter < this.popupLimit) {
        var div = document.createElement("div");
        div.id = "vis-configuration-popup";
        div.className = "vis-configuration-popup";
        div.innerText = string;

        div.onclick = function () {
          _this2._removePopup();
        };

        this.popupCounter += 1;
        this.popupDiv = {
          html: div,
          index: index
        };
      }
    }
    /**
     * remove the popup from the dom
     *
     * @private
     */

  }, {
    key: "_removePopup",
    value: function _removePopup() {
      if (this.popupDiv.html !== undefined) {
        this.popupDiv.html.parentNode.removeChild(this.popupDiv.html);
        clearTimeout(this.popupDiv.hideTimeout);
        clearTimeout(this.popupDiv.deleteTimeout);
        this.popupDiv = {};
      }
    }
    /**
     * Show the popup if it is needed.
     *
     * @private
     */

  }, {
    key: "_showPopupIfNeeded",
    value: function _showPopupIfNeeded() {
      var _this3 = this;

      if (this.popupDiv.html !== undefined) {
        var correspondingElement = this.domElements[this.popupDiv.index];
        var rect = correspondingElement.getBoundingClientRect();
        this.popupDiv.html.style.left = rect.left + "px";
        this.popupDiv.html.style.top = rect.top - 30 + "px"; // 30 is the height;

        document.body.appendChild(this.popupDiv.html);
        this.popupDiv.hideTimeout = setTimeout$1(function () {
          _this3.popupDiv.html.style.opacity = 0;
        }, 1500);
        this.popupDiv.deleteTimeout = setTimeout$1(function () {
          _this3._removePopup();
        }, 1800);
      }
    }
    /**
     * make a checkbox for boolean options.
     *
     * @param {number} defaultValue
     * @param {number} value
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_makeCheckbox",
    value: function _makeCheckbox(defaultValue, value, path) {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "vis-configuration vis-config-checkbox";
      checkbox.checked = defaultValue;

      if (value !== undefined) {
        checkbox.checked = value;

        if (value !== defaultValue) {
          if (_typeof(defaultValue) === "object") {
            if (value !== defaultValue.enabled) {
              this.changedOptions.push({
                path: path,
                value: value
              });
            }
          } else {
            this.changedOptions.push({
              path: path,
              value: value
            });
          }
        }
      }

      var me = this;

      checkbox.onchange = function () {
        me._update(this.checked, path);
      };

      var label = this._makeLabel(path[path.length - 1], path);

      this._makeItem(path, label, checkbox);
    }
    /**
     * make a text input field for string options.
     *
     * @param {number} defaultValue
     * @param {number} value
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_makeTextInput",
    value: function _makeTextInput(defaultValue, value, path) {
      var checkbox = document.createElement("input");
      checkbox.type = "text";
      checkbox.className = "vis-configuration vis-config-text";
      checkbox.value = value;

      if (value !== defaultValue) {
        this.changedOptions.push({
          path: path,
          value: value
        });
      }

      var me = this;

      checkbox.onchange = function () {
        me._update(this.value, path);
      };

      var label = this._makeLabel(path[path.length - 1], path);

      this._makeItem(path, label, checkbox);
    }
    /**
     * make a color field with a color picker for color fields
     *
     * @param {Array.<number>} arr
     * @param {number} value
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_makeColorField",
    value: function _makeColorField(arr, value, path) {
      var _this4 = this;

      var defaultColor = arr[1];
      var div = document.createElement("div");
      value = value === undefined ? defaultColor : value;

      if (value !== "none") {
        div.className = "vis-configuration vis-config-colorBlock";
        div.style.backgroundColor = value;
      } else {
        div.className = "vis-configuration vis-config-colorBlock none";
      }

      value = value === undefined ? defaultColor : value;

      div.onclick = function () {
        _this4._showColorPicker(value, div, path);
      };

      var label = this._makeLabel(path[path.length - 1], path);

      this._makeItem(path, label, div);
    }
    /**
     * used by the color buttons to call the color picker.
     *
     * @param {number} value
     * @param {HTMLElement} div
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_showColorPicker",
    value: function _showColorPicker(value, div, path) {
      var _this5 = this;

      // clear the callback from this div
      div.onclick = function () {};

      this.colorPicker.insertTo(div);
      this.colorPicker.show();
      this.colorPicker.setColor(value);
      this.colorPicker.setUpdateCallback(function (color) {
        var colorString = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
        div.style.backgroundColor = colorString;

        _this5._update(colorString, path);
      }); // on close of the colorpicker, restore the callback.

      this.colorPicker.setCloseCallback(function () {
        div.onclick = function () {
          _this5._showColorPicker(value, div, path);
        };
      });
    }
    /**
     * parse an object and draw the correct items
     *
     * @param {object} obj
     * @param {Array} [path=[]]    | where to look for the actual option
     * @param {boolean} [checkOnly=false]
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_handleObject",
    value: function _handleObject(obj) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var checkOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var show = false;

      var filter$1 = filter(this.options);

      var visibleInSet = false;

      for (var subObj in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, subObj)) {
          show = true;
          var item = obj[subObj];
          var newPath = copyAndExtendArray(path, subObj);

          if (typeof filter$1 === "function") {
            show = filter$1(subObj, path); // if needed we must go deeper into the object.

            if (show === false) {
              if (!isArray$1(item) && typeof item !== "string" && typeof item !== "boolean" && item instanceof Object) {
                this.allowCreation = false;
                show = this._handleObject(item, newPath, true);
                this.allowCreation = checkOnly === false;
              }
            }
          }

          if (show !== false) {
            visibleInSet = true;

            var value = this._getValue(newPath);

            if (isArray$1(item)) {
              this._handleArray(item, value, newPath);
            } else if (typeof item === "string") {
              this._makeTextInput(item, value, newPath);
            } else if (typeof item === "boolean") {
              this._makeCheckbox(item, value, newPath);
            } else if (item instanceof Object) {
              // skip the options that are not enabled
              if (!this.hideOption(path, subObj, this.moduleOptions)) {
                // initially collapse options with an disabled enabled option.
                if (item.enabled !== undefined) {
                  var enabledPath = copyAndExtendArray(newPath, "enabled");

                  var enabledValue = this._getValue(enabledPath);

                  if (enabledValue === true) {
                    var label = this._makeLabel(subObj, newPath, true);

                    this._makeItem(newPath, label);

                    visibleInSet = this._handleObject(item, newPath) || visibleInSet;
                  } else {
                    this._makeCheckbox(item, enabledValue, newPath);
                  }
                } else {
                  var _label = this._makeLabel(subObj, newPath, true);

                  this._makeItem(newPath, _label);

                  visibleInSet = this._handleObject(item, newPath) || visibleInSet;
                }
              }
            } else {
              console.error("dont know how to handle", item, subObj, newPath);
            }
          }
        }
      }

      return visibleInSet;
    }
    /**
     * handle the array type of option
     *
     * @param {Array.<number>} arr
     * @param {number} value
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_handleArray",
    value: function _handleArray(arr, value, path) {
      if (typeof arr[0] === "string" && arr[0] === "color") {
        this._makeColorField(arr, value, path);

        if (arr[1] !== value) {
          this.changedOptions.push({
            path: path,
            value: value
          });
        }
      } else if (typeof arr[0] === "string") {
        this._makeDropdown(arr, value, path);

        if (arr[0] !== value) {
          this.changedOptions.push({
            path: path,
            value: value
          });
        }
      } else if (typeof arr[0] === "number") {
        this._makeRange(arr, value, path);

        if (arr[0] !== value) {
          this.changedOptions.push({
            path: path,
            value: Number(value)
          });
        }
      }
    }
    /**
     * called to update the network with the new settings.
     *
     * @param {number} value
     * @param {Array} path    | where to look for the actual option
     * @private
     */

  }, {
    key: "_update",
    value: function _update(value, path) {
      var options = this._constructOptions(value, path);

      if (this.parent.body && this.parent.body.emitter && this.parent.body.emitter.emit) {
        this.parent.body.emitter.emit("configChange", options);
      }

      this.initialized = true;
      this.parent.setOptions(options);
    }
    /**
     *
     * @param {string | boolean} value
     * @param {Array.<string>} path
     * @param {{}} optionsObj
     * @returns {{}}
     * @private
     */

  }, {
    key: "_constructOptions",
    value: function _constructOptions(value, path) {
      var optionsObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var pointer = optionsObj; // when dropdown boxes can be string or boolean, we typecast it into correct types

      value = value === "true" ? true : value;
      value = value === "false" ? false : value;

      for (var i = 0; i < path.length; i++) {
        if (path[i] !== "global") {
          if (pointer[path[i]] === undefined) {
            pointer[path[i]] = {};
          }

          if (i !== path.length - 1) {
            pointer = pointer[path[i]];
          } else {
            pointer[path[i]] = value;
          }
        }
      }

      return optionsObj;
    }
    /**
     * @private
     */

  }, {
    key: "_printOptions",
    value: function _printOptions() {
      var options = this.getOptions();

      while (this.optionsContainer.firstChild) {
        this.optionsContainer.removeChild(this.optionsContainer.firstChild);
      }

      this.optionsContainer.appendChild(wrapInTag("pre", "const options = " + stringify(options, null, 2)));
    }
    /**
     *
     * @returns {{}} options
     */

  }, {
    key: "getOptions",
    value: function getOptions() {
      var options = {};

      for (var i = 0; i < this.changedOptions.length; i++) {
        this._constructOptions(this.changedOptions[i].value, this.changedOptions[i].path, options);
      }

      return options;
    }
  }]);

  return Configurator;
}();

/**
 * Popup is a class to create a popup window with some text
 */
var Popup$1 = /*#__PURE__*/function () {
  /**
   * @param {Element} container       The container object.
   * @param {string}  overflowMethod  How the popup should act to overflowing ('flip' or 'cap')
   */
  function Popup(container, overflowMethod) {
    _classCallCheck(this, Popup);

    this.container = container;
    this.overflowMethod = overflowMethod || "cap";
    this.x = 0;
    this.y = 0;
    this.padding = 5;
    this.hidden = false; // create the frame

    this.frame = document.createElement("div");
    this.frame.className = "vis-tooltip";
    this.container.appendChild(this.frame);
  }
  /**
   * @param {number} x   Horizontal position of the popup window
   * @param {number} y   Vertical position of the popup window
   */


  _createClass(Popup, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = _parseInt(x);
      this.y = _parseInt(y);
    }
    /**
     * Set the content for the popup window. This can be HTML code or text.
     *
     * @param {string | Element} content
     */

  }, {
    key: "setText",
    value: function setText(content) {
      if (content instanceof Element) {
        while (this.frame.firstChild) {
          this.frame.removeChild(this.frame.firstChild);
        }

        this.frame.appendChild(content);
      } else {
        // String containing literal text, element has to be used for HTML due to
        // XSS risks associated with innerHTML (i.e. prevent XSS by accident).
        this.frame.innerText = content;
      }
    }
    /**
     * Show the popup window
     *
     * @param {boolean} [doShow]    Show or hide the window
     */

  }, {
    key: "show",
    value: function show(doShow) {
      if (doShow === undefined) {
        doShow = true;
      }

      if (doShow === true) {
        var height = this.frame.clientHeight;
        var width = this.frame.clientWidth;
        var maxHeight = this.frame.parentNode.clientHeight;
        var maxWidth = this.frame.parentNode.clientWidth;
        var left = 0,
            top = 0;

        if (this.overflowMethod == "flip") {
          var isLeft = false,
              isTop = true; // Where around the position it's located

          if (this.y - height < this.padding) {
            isTop = false;
          }

          if (this.x + width > maxWidth - this.padding) {
            isLeft = true;
          }

          if (isLeft) {
            left = this.x - width;
          } else {
            left = this.x;
          }

          if (isTop) {
            top = this.y - height;
          } else {
            top = this.y;
          }
        } else {
          top = this.y - height;

          if (top + height + this.padding > maxHeight) {
            top = maxHeight - height - this.padding;
          }

          if (top < this.padding) {
            top = this.padding;
          }

          left = this.x;

          if (left + width + this.padding > maxWidth) {
            left = maxWidth - width - this.padding;
          }

          if (left < this.padding) {
            left = this.padding;
          }
        }

        this.frame.style.left = left + "px";
        this.frame.style.top = top + "px";
        this.frame.style.visibility = "visible";
        this.hidden = false;
      } else {
        this.hide();
      }
    }
    /**
     * Hide the popup window
     */

  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
      this.frame.style.left = "0";
      this.frame.style.top = "0";
      this.frame.style.visibility = "hidden";
    }
    /**
     * Remove the popup window
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.frame.parentNode.removeChild(this.frame); // Remove element from DOM
    }
  }]);

  return Popup;
}();

var errorFound = false;
var allOptions;
var VALIDATOR_PRINT_STYLE$1 = "background: #FFeeee; color: #dd0000";
/**
 *  Used to validate options.
 */

var Validator$1 = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "validate",
    value:
    /**
     * Main function to be called
     *
     * @param {object} options
     * @param {object} referenceOptions
     * @param {object} subObject
     * @returns {boolean}
     * @static
     */
    function validate(options, referenceOptions, subObject) {
      errorFound = false;
      allOptions = referenceOptions;
      var usedOptions = referenceOptions;

      if (subObject !== undefined) {
        usedOptions = referenceOptions[subObject];
      }

      Validator.parse(options, usedOptions, []);
      return errorFound;
    }
    /**
     * Will traverse an object recursively and check every value
     *
     * @param {object} options
     * @param {object} referenceOptions
     * @param {Array} path    | where to look for the actual option
     * @static
     */

  }, {
    key: "parse",
    value: function parse(options, referenceOptions, path) {
      for (var option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option)) {
          Validator.check(option, options, referenceOptions, path);
        }
      }
    }
    /**
     * Check every value. If the value is an object, call the parse function on that object.
     *
     * @param {string} option
     * @param {object} options
     * @param {object} referenceOptions
     * @param {Array} path    | where to look for the actual option
     * @static
     */

  }, {
    key: "check",
    value: function check(option, options, referenceOptions, path) {
      if (referenceOptions[option] === undefined && referenceOptions.__any__ === undefined) {
        Validator.getSuggestion(option, referenceOptions, path);
        return;
      }

      var referenceOption = option;
      var is_object = true;

      if (referenceOptions[option] === undefined && referenceOptions.__any__ !== undefined) {
        // NOTE: This only triggers if the __any__ is in the top level of the options object.
        //       THAT'S A REALLY BAD PLACE TO ALLOW IT!!!!
        // TODO: Examine if needed, remove if possible
        // __any__ is a wildcard. Any value is accepted and will be further analysed by reference.
        referenceOption = "__any__"; // if the any-subgroup is not a predefined object in the configurator,
        // we do not look deeper into the object.

        is_object = Validator.getType(options[option]) === "object";
      }

      var refOptionObj = referenceOptions[referenceOption];

      if (is_object && refOptionObj.__type__ !== undefined) {
        refOptionObj = refOptionObj.__type__;
      }

      Validator.checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path);
    }
    /**
     *
     * @param {string}  option           | the option property
     * @param {object}  options          | The supplied options object
     * @param {object}  referenceOptions | The reference options containing all options and their allowed formats
     * @param {string}  referenceOption  | Usually this is the same as option, except when handling an __any__ tag.
     * @param {string}  refOptionObj     | This is the type object from the reference options
     * @param {Array}   path             | where in the object is the option
     * @static
     */

  }, {
    key: "checkFields",
    value: function checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path) {
      var log = function log(message) {
        console.error("%c" + message + Validator.printLocation(path, option), VALIDATOR_PRINT_STYLE$1);
      };

      var optionType = Validator.getType(options[option]);
      var refOptionType = refOptionObj[optionType];

      if (refOptionType !== undefined) {
        // if the type is correct, we check if it is supposed to be one of a few select values
        if (Validator.getType(refOptionType) === "array" && indexOf(refOptionType).call(refOptionType, options[option]) === -1) {
          log('Invalid option detected in "' + option + '".' + " Allowed values are:" + Validator.print(refOptionType) + ' not "' + options[option] + '". ');
          errorFound = true;
        } else if (optionType === "object" && referenceOption !== "__any__") {
          path = copyAndExtendArray(path, option);
          Validator.parse(options[option], referenceOptions[referenceOption], path);
        }
      } else if (refOptionObj["any"] === undefined) {
        // type of the field is incorrect and the field cannot be any
        log('Invalid type received for "' + option + '". Expected: ' + Validator.print(keys(refOptionObj)) + ". Received [" + optionType + '] "' + options[option] + '"');
        errorFound = true;
      }
    }
    /**
     *
     * @param {object | boolean | number | string | Array.<number> | Date | Node | Moment | undefined | null} object
     * @returns {string}
     * @static
     */

  }, {
    key: "getType",
    value: function getType(object) {
      var type = _typeof(object);

      if (type === "object") {
        if (object === null) {
          return "null";
        }

        if (object instanceof Boolean) {
          return "boolean";
        }

        if (object instanceof Number) {
          return "number";
        }

        if (object instanceof String) {
          return "string";
        }

        if (isArray$1(object)) {
          return "array";
        }

        if (object instanceof Date) {
          return "date";
        }

        if (object.nodeType !== undefined) {
          return "dom";
        }

        if (object._isAMomentObject === true) {
          return "moment";
        }

        return "object";
      } else if (type === "number") {
        return "number";
      } else if (type === "boolean") {
        return "boolean";
      } else if (type === "string") {
        return "string";
      } else if (type === undefined) {
        return "undefined";
      }

      return type;
    }
    /**
     * @param {string} option
     * @param {object} options
     * @param {Array.<string>} path
     * @static
     */

  }, {
    key: "getSuggestion",
    value: function getSuggestion(option, options, path) {
      var localSearch = Validator.findInOptions(option, options, path, false);
      var globalSearch = Validator.findInOptions(option, allOptions, [], true);
      var localSearchThreshold = 8;
      var globalSearchThreshold = 4;
      var msg;

      if (localSearch.indexMatch !== undefined) {
        msg = " in " + Validator.printLocation(localSearch.path, option, "") + 'Perhaps it was incomplete? Did you mean: "' + localSearch.indexMatch + '"?\n\n';
      } else if (globalSearch.distance <= globalSearchThreshold && localSearch.distance > globalSearch.distance) {
        msg = " in " + Validator.printLocation(localSearch.path, option, "") + "Perhaps it was misplaced? Matching option found at: " + Validator.printLocation(globalSearch.path, globalSearch.closestMatch, "");
      } else if (localSearch.distance <= localSearchThreshold) {
        msg = '. Did you mean "' + localSearch.closestMatch + '"?' + Validator.printLocation(localSearch.path, option);
      } else {
        msg = ". Did you mean one of these: " + Validator.print(keys(options)) + Validator.printLocation(path, option);
      }

      console.error('%cUnknown option detected: "' + option + '"' + msg, VALIDATOR_PRINT_STYLE$1);
      errorFound = true;
    }
    /**
     * traverse the options in search for a match.
     *
     * @param {string} option
     * @param {object} options
     * @param {Array} path    | where to look for the actual option
     * @param {boolean} [recursive=false]
     * @returns {{closestMatch: string, path: Array, distance: number}}
     * @static
     */

  }, {
    key: "findInOptions",
    value: function findInOptions(option, options, path) {
      var recursive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var min = 1e9;
      var closestMatch = "";
      var closestMatchPath = [];
      var lowerCaseOption = option.toLowerCase();
      var indexMatch = undefined;

      for (var op in options) {
        var distance = void 0;

        if (options[op].__type__ !== undefined && recursive === true) {
          var result = Validator.findInOptions(option, options[op], copyAndExtendArray(path, op));

          if (min > result.distance) {
            closestMatch = result.closestMatch;
            closestMatchPath = result.path;
            min = result.distance;
            indexMatch = result.indexMatch;
          }
        } else {
          var _context;

          if (indexOf(_context = op.toLowerCase()).call(_context, lowerCaseOption) !== -1) {
            indexMatch = op;
          }

          distance = Validator.levenshteinDistance(option, op);

          if (min > distance) {
            closestMatch = op;
            closestMatchPath = copyArray(path);
            min = distance;
          }
        }
      }

      return {
        closestMatch: closestMatch,
        path: closestMatchPath,
        distance: min,
        indexMatch: indexMatch
      };
    }
    /**
     * @param {Array.<string>} path
     * @param {object} option
     * @param {string} prefix
     * @returns {string}
     * @static
     */

  }, {
    key: "printLocation",
    value: function printLocation(path, option) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Problem value found at: \n";
      var str = "\n\n" + prefix + "options = {\n";

      for (var i = 0; i < path.length; i++) {
        for (var j = 0; j < i + 1; j++) {
          str += "  ";
        }

        str += path[i] + ": {\n";
      }

      for (var _j = 0; _j < path.length + 1; _j++) {
        str += "  ";
      }

      str += option + "\n";

      for (var _i = 0; _i < path.length + 1; _i++) {
        for (var _j2 = 0; _j2 < path.length - _i; _j2++) {
          str += "  ";
        }

        str += "}\n";
      }

      return str + "\n\n";
    }
    /**
     * @param {object} options
     * @returns {string}
     * @static
     */

  }, {
    key: "print",
    value: function print(options) {
      return stringify(options).replace(/(")|(\[)|(\])|(,"__type__")/g, "").replace(/(,)/g, ", ");
    }
    /**
     *  Compute the edit distance between the two given strings
     * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
     *
     * Copyright (c) 2011 Andrei Mackenzie
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     * @param {string} a
     * @param {string} b
     * @returns {Array.<Array.<number>>}}
     * @static
     */

  }, {
    key: "levenshteinDistance",
    value: function levenshteinDistance(a, b) {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;
      var matrix = []; // increment along the first column of each row

      var i;

      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      } // increment each column in the first row


      var j;

      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      } // Fill in the rest of the matrix


      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
            Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    }
  }]);

  return Validator;
}();

var Activator = Activator$1;
var ColorPicker = ColorPicker$1;
var Configurator = Configurator$1;
var Hammer = Hammer$1;
var Popup = Popup$1;
var VALIDATOR_PRINT_STYLE = VALIDATOR_PRINT_STYLE$1;
var Validator = Validator$1;

export { Activator, Alea, ColorPicker, Configurator, DELETE, HSVToHex, HSVToRGB, Hammer, Popup, RGBToHSV, RGBToHex, VALIDATOR_PRINT_STYLE, Validator, addClassName, addCssText, addEventListener, binarySearchCustom, binarySearchValue, bridgeObject, copyAndExtendArray, copyArray, deepExtend, deepObjectAssign, easingFunctions, equalArray, extend, fillIfDefined, forEach, getAbsoluteLeft, getAbsoluteRight, getAbsoluteTop, getScrollBarWidth, getTarget, getType, hasParent, hexToHSV, hexToRGB, insertSort, isDate, isNumber, isObject, isString, isValidHex, isValidRGB, isValidRGBA, mergeOptions, option, overrideOpacity, parseColor, preventDefault, pureDeepObjectAssign, recursiveDOMDelete, removeClassName, removeCssText, removeEventListener, selectiveBridgeObject, selectiveDeepExtend, selectiveExtend, selectiveNotDeepExtend, throttle, toArray, topMost, updateProperty };
//# sourceMappingURL=vis-util.js.map
