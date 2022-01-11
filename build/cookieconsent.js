// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"qf4T":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"uHgd":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"BXiR":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"P9Ib":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"BXiR"}],"ss9A":[function(require,module,exports) {
var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"M7z6":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"eT53":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"M7z6"}],"vZ6E":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"M7z6","./_global":"qf4T"}],"o6Gq":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"P9Ib","./_fails":"BXiR","./_dom-create":"vZ6E"}],"y37I":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"M7z6"}],"nw8e":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"eT53","./_ie8-dom-define":"o6Gq","./_to-primitive":"y37I","./_descriptors":"P9Ib"}],"uJ6d":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"NXbe":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"nw8e","./_property-desc":"uJ6d","./_descriptors":"P9Ib"}],"U49f":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"H21C":[function(require,module,exports) {
module.exports = false;

},{}],"zGcK":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"ss9A","./_global":"qf4T","./_library":"H21C"}],"d5RU":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"zGcK"}],"PHot":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"qf4T","./_hide":"NXbe","./_has":"uHgd","./_uid":"U49f","./_function-to-string":"d5RU","./_core":"ss9A"}],"kYjc":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"E3Kh":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"kYjc"}],"izCb":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"qf4T","./_core":"ss9A","./_hide":"NXbe","./_redefine":"PHot","./_ctx":"E3Kh"}],"AoVy":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"U49f","./_is-object":"M7z6","./_has":"uHgd","./_object-dp":"nw8e","./_fails":"BXiR"}],"AIP1":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"zGcK","./_uid":"U49f","./_global":"qf4T"}],"rq3q":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"nw8e","./_has":"uHgd","./_wks":"AIP1"}],"AuE7":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"AIP1"}],"r4vV":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"qf4T","./_core":"ss9A","./_library":"H21C","./_wks-ext":"AuE7","./_object-dp":"nw8e"}],"Z5df":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"nGau":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"Z5df"}],"BjjL":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"g6sb":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"nGau","./_defined":"BjjL"}],"yjVO":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"dJBs":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"yjVO"}],"vfEH":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"yjVO"}],"Ca7J":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"g6sb","./_to-length":"dJBs","./_to-absolute-index":"vfEH"}],"NaGB":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"zGcK","./_uid":"U49f"}],"vL0Z":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"uHgd","./_to-iobject":"g6sb","./_array-includes":"Ca7J","./_shared-key":"NaGB"}],"bbv4":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"U9a7":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"vL0Z","./_enum-bug-keys":"bbv4"}],"EWMd":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"vjRp":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"jjwB":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"U9a7","./_object-gops":"EWMd","./_object-pie":"vjRp"}],"JTrm":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"Z5df"}],"MiMz":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"nw8e","./_an-object":"eT53","./_object-keys":"U9a7","./_descriptors":"P9Ib"}],"xjB1":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"qf4T"}],"sYaK":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"eT53","./_object-dps":"MiMz","./_enum-bug-keys":"bbv4","./_shared-key":"NaGB","./_dom-create":"vZ6E","./_html":"xjB1"}],"Vzm0":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"vL0Z","./_enum-bug-keys":"bbv4"}],"dvol":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"g6sb","./_object-gopn":"Vzm0"}],"uIjZ":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"vjRp","./_property-desc":"uJ6d","./_to-iobject":"g6sb","./_to-primitive":"y37I","./_has":"uHgd","./_ie8-dom-define":"o6Gq","./_descriptors":"P9Ib"}],"uVn9":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"qf4T","./_has":"uHgd","./_descriptors":"P9Ib","./_export":"izCb","./_redefine":"PHot","./_meta":"AoVy","./_fails":"BXiR","./_shared":"zGcK","./_set-to-string-tag":"rq3q","./_uid":"U49f","./_wks":"AIP1","./_wks-ext":"AuE7","./_wks-define":"r4vV","./_enum-keys":"jjwB","./_is-array":"JTrm","./_an-object":"eT53","./_is-object":"M7z6","./_to-iobject":"g6sb","./_to-primitive":"y37I","./_property-desc":"uJ6d","./_object-create":"sYaK","./_object-gopn-ext":"dvol","./_object-gopd":"uIjZ","./_object-dp":"nw8e","./_object-keys":"U9a7","./_object-gopn":"Vzm0","./_object-pie":"vjRp","./_object-gops":"EWMd","./_library":"H21C","./_hide":"NXbe"}],"GM7B":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"Z5df","./_wks":"AIP1"}],"zTK3":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"GM7B","./_wks":"AIP1","./_redefine":"PHot"}],"CtPZ":[function(require,module,exports) {
require('../modules/es6.symbol');
require('../modules/es6.object.to-string');
module.exports = require('../modules/_core').Symbol;

},{"../modules/es6.symbol":"uVn9","../modules/es6.object.to-string":"zTK3","../modules/_core":"ss9A"}],"x5yM":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"yjVO","./_defined":"BjjL"}],"JO4d":[function(require,module,exports) {
module.exports = {};

},{}],"ebgP":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"sYaK","./_property-desc":"uJ6d","./_set-to-string-tag":"rq3q","./_hide":"NXbe","./_wks":"AIP1"}],"rfVX":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"BjjL"}],"q6yw":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"uHgd","./_to-object":"rfVX","./_shared-key":"NaGB"}],"mH0U":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"H21C","./_export":"izCb","./_redefine":"PHot","./_hide":"NXbe","./_iterators":"JO4d","./_iter-create":"ebgP","./_set-to-string-tag":"rq3q","./_object-gpo":"q6yw","./_wks":"AIP1"}],"tbKg":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"x5yM","./_iter-define":"mH0U"}],"Z7eD":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"AIP1","./_hide":"NXbe"}],"x8b3":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"wVEN":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"Z7eD","./_iter-step":"x8b3","./_iterators":"JO4d","./_to-iobject":"g6sb","./_iter-define":"mH0U"}],"v6Aj":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"wVEN","./_object-keys":"U9a7","./_redefine":"PHot","./_global":"qf4T","./_hide":"NXbe","./_iterators":"JO4d","./_wks":"AIP1"}],"KQqW":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/es6.string.iterator":"tbKg","../../modules/web.dom.iterable":"v6Aj","../../modules/_wks-ext":"AuE7"}],"wJ6H":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Utilities = /*#__PURE__*/function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
    key: "ready",
    value: function ready(fn) {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }
  }, {
    key: "objectType",
    value: function objectType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1);
    }
  }, {
    key: "lightenDarkenColor",
    value: function lightenDarkenColor(col, amt) {
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);
      var r = (num >> 16) + amt;

      if (r > 255) {
        r = 255;
      } else if (r < 0) {
        r = 0;
      }

      var b = (num >> 8 & 0x00FF) + amt;

      if (b > 255) {
        b = 255;
      } else if (b < 0) {
        b = 0;
      }

      var g = (num & 0x0000FF) + amt;

      if (g > 255) {
        g = 255;
      } else if (g < 0) {
        g = 0;
      }

      return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
    }
  }, {
    key: "removeCookie",
    value: function removeCookie() {
      document.cookie = "cconsent=; expires=Thu, 01 Jan 1980 00:00:00 UTC; path=/;";
    } // Create an array of services from Cookieconsent global object
    // Filter based on category or leave empty is all is wanted

  }, {
    key: "listGlobalServices",
    value: function listGlobalServices(category) {
      var categories = []; // Global config objectnot set

      if (typeof window.CookieConsent === 'undefined') return categories; // Category is not specified or opposite

      if (typeof category === 'undefined') {
        for (var key in window.CookieConsent.config.services) {
          categories.push(key);
        }
      } else {
        for (var _key in window.CookieConsent.config.services) {
          if (window.CookieConsent.config.services[_key].category === category) categories.push(_key);
        }
      }

      return categories;
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(elem, event) {
      var event;

      if (typeof Event === 'function') {
        event = new Event(event);
      } else {
        event = document.createEvent('Event');
        event.initEvent(event, true, true);
      }

      elem.dispatchEvent(event);
    }
  }]);

  return Utilities;
}();

exports.default = Utilities;
},{}],"aJ5U":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("./Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Filter = /*#__PURE__*/function () {
  function Filter() {
    _classCallCheck(this, Filter);
  }

  _createClass(Filter, [{
    key: "createBlacklist",
    value: function createBlacklist(type) {
      var services = {};

      for (var service in window.CookieConsent.config.services) {
        if (window.CookieConsent.config.services[service].type === type) {
          if (window.CookieConsent.config.categories[window.CookieConsent.config.services[service].category].needed === false) {
            if (window.CookieConsent.config.categories[window.CookieConsent.config.services[service].category].wanted === false) {
              services[service] = window.CookieConsent.config.services[service];
            }
          }
        }
      }

      var blacklist = [];

      for (var service in services) {
        var type = _Utilities.default.objectType(services[service].search);

        if (type === 'String') {
          blacklist.push(services[service].search);
        } else if (type === 'Array') {
          for (var i = 0; i < services[service].search.length; i++) {
            blacklist.push(services[service].search[i]);
          }
        }
      }

      return blacklist;
    }
  }]);

  return Filter;
}();

exports.default = Filter;
},{"./Utilities":"wJ6H"}],"UWvR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Filter2 = _interopRequireDefault(require("./Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InsertScriptFilter = /*#__PURE__*/function (_Filter) {
  _inherits(InsertScriptFilter, _Filter);

  var _super = _createSuper(InsertScriptFilter);

  function InsertScriptFilter() {
    _classCallCheck(this, InsertScriptFilter);

    return _super.call(this);
  }

  _createClass(InsertScriptFilter, [{
    key: "init",
    value: function init() {
      this.overrideAppendChild();
      this.overrideInsertBefore();
    }
  }, {
    key: "overrideAppendChild",
    value: function overrideAppendChild() {
      Element.prototype.appendChild = function (elem) {
        if (arguments[0].tagName === 'SCRIPT') {
          if (window.CookieConsent.config.debug) {
            console.log('Appending:', arguments);
          }

          for (var key in window.CookieConsent.config.services) {
            // Did user opt-in?
            if (window.CookieConsent.config.services[key].type === 'dynamic-script') {
              if (arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
                if (window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                  window.CookieConsent.buffer.appendChild.push({
                    'this': this,
                    'category': window.CookieConsent.config.services[key].category,
                    arguments: arguments
                  });
                  return undefined;
                }
              }
            }
          }
        }

        return Node.prototype.appendChild.apply(this, arguments);
      };
    }
  }, {
    key: "overrideInsertBefore",
    value: function overrideInsertBefore() {
      Element.prototype.insertBefore = function (elem) {
        if (arguments[0].tagName === 'SCRIPT') {
          if (window.CookieConsent.config.debug) {
            console.log('Appending:', arguments);
          }

          for (var key in window.CookieConsent.config.services) {
            // Did user opt-in?
            if (window.CookieConsent.config.services[key].type === 'dynamic-script') {
              if (arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
                if (window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                  window.CookieConsent.buffer.insertBefore.push({
                    'this': this,
                    'category': window.CookieConsent.config.services[key].category,
                    arguments: arguments
                  });
                  return undefined;
                }
              }
            }
          }
        }

        return Node.prototype.insertBefore.apply(this, arguments);
      };
    }
  }]);

  return InsertScriptFilter;
}(_Filter2.default);

exports.default = InsertScriptFilter;
},{"./Filter":"aJ5U"}],"ob2e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("./Utilities"));

var _Filter2 = _interopRequireDefault(require("./Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ScriptTagFilter = /*#__PURE__*/function (_Filter) {
  _inherits(ScriptTagFilter, _Filter);

  var _super = _createSuper(ScriptTagFilter);

  function ScriptTagFilter() {
    _classCallCheck(this, ScriptTagFilter);

    return _super.call(this);
  }

  _createClass(ScriptTagFilter, [{
    key: "init",
    value: function init() {
      this.filterTags();
    }
  }, {
    key: "filterTags",
    value: function filterTags() {
      var _this = this;

      _Utilities.default.ready(function () {
        var blacklist = _get(_getPrototypeOf(ScriptTagFilter.prototype), "createBlacklist", _this).call(_this, 'script-tag');

        var scriptTags = document.querySelectorAll('script[type="text/plain"]');

        var _iterator = _createForOfIteratorHelper(scriptTags),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var scriptTag = _step.value;

            if (blacklist.indexOf(scriptTag.dataset.consent) < 0) {
              var newtag = document.createElement('script');
              var parentNode = scriptTag.parentNode;
              scriptTag.type = 'text/javascript';

              var _iterator2 = _createForOfIteratorHelper(scriptTag.attributes),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var attribute = _step2.value;
                  newtag.setAttribute(attribute.nodeName, attribute.nodeValue);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              newtag.innerHTML = scriptTag.innerHTML;
              parentNode.insertBefore(newtag, scriptTag);
              parentNode.removeChild(scriptTag);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }
  }]);

  return ScriptTagFilter;
}(_Filter2.default);

exports.default = ScriptTagFilter;
},{"./Utilities":"wJ6H","./Filter":"aJ5U"}],"KGlf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Filter2 = _interopRequireDefault(require("./Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WrapperFilter = /*#__PURE__*/function (_Filter) {
  _inherits(WrapperFilter, _Filter);

  var _super = _createSuper(WrapperFilter);

  function WrapperFilter() {
    _classCallCheck(this, WrapperFilter);

    return _super.call(this);
  }

  _createClass(WrapperFilter, [{
    key: "init",
    value: function init() {
      this.filterWrappers();
    }
  }, {
    key: "filterWrappers",
    value: function filterWrappers() {
      var blacklist = _get(_getPrototypeOf(WrapperFilter.prototype), "createBlacklist", this).call(this, 'wrapped');

      function wrapper() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var callback = arguments.length > 1 ? arguments[1] : undefined;

        if (blacklist.indexOf(name) < 0) {
          callback();
        }
      }

      window.CookieConsent.wrapper = wrapper;
    }
  }]);

  return WrapperFilter;
}(_Filter2.default);

exports.default = WrapperFilter;
},{"./Filter":"aJ5U"}],"EVrK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Filter2 = _interopRequireDefault(require("./Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LocalCookieFilter = /*#__PURE__*/function (_Filter) {
  _inherits(LocalCookieFilter, _Filter);

  var _super = _createSuper(LocalCookieFilter);

  function LocalCookieFilter() {
    _classCallCheck(this, LocalCookieFilter);

    return _super.call(this);
  }

  _createClass(LocalCookieFilter, [{
    key: "init",
    value: function init() {
      this.filterlocalCookies();
    }
  }, {
    key: "getCookieDescriptor",
    value: function getCookieDescriptor() {
      var cookieDescriptor;
      cookieDescriptor = Object.getOwnPropertyDescriptor(document, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

      if (!cookieDescriptor) {
        cookieDescriptor = {};
        cookieDescriptor.get = HTMLDocument.prototype.__lookupGetter__("cookie");
        cookieDescriptor.set = HTMLDocument.prototype.__lookupSetter__("cookie");
      }

      return cookieDescriptor;
    }
  }, {
    key: "filterlocalCookies",
    value: function filterlocalCookies() {
      // TODO - implement buffer
      var blacklist = _get(_getPrototypeOf(LocalCookieFilter.prototype), "createBlacklist", this).call(this, 'localcookie');

      var cookieDescriptor = this.getCookieDescriptor();
      Object.defineProperty(document, "cookie", {
        configurable: true,
        get: function get() {
          return cookieDescriptor.get.apply(document);
        },
        set: function set() {
          var cookieArguments = arguments;

          if (blacklist.length) {
            var cookieName = arguments[0].split('=')[0];
            Array.prototype.forEach.call(blacklist, function (blacklistItem) {
              if (cookieName.indexOf(blacklistItem) < 0) cookieDescriptor.set.apply(document, cookieArguments);
            });
          } else {
            cookieDescriptor.set.apply(document, cookieArguments);
          }
        }
      });
    }
  }]);

  return LocalCookieFilter;
}(_Filter2.default);

exports.default = LocalCookieFilter;
},{"./Filter":"aJ5U"}],"GuEK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmount = exports.text = exports.svg = exports.setStyle = exports.setChildren = exports.setAttr = exports.s = exports.router = exports.place = exports.mount = exports.listPool = exports.list = exports.html = exports.h = exports.el = exports.Router = exports.Place = exports.ListPool = exports.List = void 0;
var HASH = '#'.charCodeAt(0);
var DOT = '.'.charCodeAt(0);
var TAG_NAME = 0;
var ID = 1;
var CLASS_NAME = 2;

var parseQuery = function (query) {
  var tag = null;
  var id = null;
  var className = null;
  var mode = TAG_NAME;
  var offset = 0;

  for (var i = 0; i <= query.length; i++) {
    var char = query.charCodeAt(i);
    var isHash = char === HASH;
    var isDot = char === DOT;
    var isEnd = !char;

    if (isHash || isDot || isEnd) {
      if (mode === TAG_NAME) {
        if (i === 0) {
          tag = 'div';
        } else {
          tag = query.substring(offset, i);
        }
      } else if (mode === ID) {
        id = query.substring(offset, i);
      } else {
        if (className) {
          className += ' ' + query.substring(offset, i);
        } else {
          className = query.substring(offset, i);
        }
      }

      if (isHash) {
        mode = ID;
      } else if (isDot) {
        mode = CLASS_NAME;
      }

      offset = i + 1;
    }
  }

  return {
    tag: tag,
    id: id,
    className: className
  };
};

var createElement = function (query, ns) {
  var ref = parseQuery(query);
  var tag = ref.tag;
  var id = ref.id;
  var className = ref.className;
  var element = ns ? document.createElementNS(ns, tag) : document.createElement(tag);

  if (id) {
    element.id = id;
  }

  if (className) {
    if (ns) {
      element.setAttribute('class', className);
    } else {
      element.className = className;
    }
  }

  return element;
};

var unmount = function (parent, child) {
  var parentEl = getEl(parent);
  var childEl = getEl(child);

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  if (childEl.parentNode) {
    doUnmount(child, childEl, parentEl);
    parentEl.removeChild(childEl);
  }

  return child;
};

exports.unmount = unmount;

var doUnmount = function (child, childEl, parentEl) {
  var hooks = childEl.__redom_lifecycle;

  if (hooksAreEmpty(hooks)) {
    childEl.__redom_mounted = false;
    return;
  }

  var traverse = parentEl;

  if (childEl.__redom_mounted) {
    trigger(childEl, 'onunmount');
  }

  while (traverse) {
    var parentHooks = traverse.__redom_lifecycle || {};

    for (var hook in hooks) {
      if (parentHooks[hook]) {
        parentHooks[hook] -= hooks[hook];
      }
    }

    if (hooksAreEmpty(parentHooks)) {
      traverse.__redom_lifecycle = null;
    }

    traverse = traverse.parentNode;
  }
};

var hooksAreEmpty = function (hooks) {
  if (hooks == null) {
    return true;
  }

  for (var key in hooks) {
    if (hooks[key]) {
      return false;
    }
  }

  return true;
};

var hookNames = ['onmount', 'onremount', 'onunmount'];
var shadowRootAvailable = typeof window !== 'undefined' && 'ShadowRoot' in window;

var mount = function (parent, child, before, replace) {
  var parentEl = getEl(parent);
  var childEl = getEl(child);

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  if (child !== childEl) {
    childEl.__redom_view = child;
  }

  var wasMounted = childEl.__redom_mounted;
  var oldParent = childEl.parentNode;

  if (wasMounted && oldParent !== parentEl) {
    doUnmount(child, childEl, oldParent);
  }

  if (before != null) {
    if (replace) {
      parentEl.replaceChild(childEl, getEl(before));
    } else {
      parentEl.insertBefore(childEl, getEl(before));
    }
  } else {
    parentEl.appendChild(childEl);
  }

  doMount(child, childEl, parentEl, oldParent);
  return child;
};

exports.mount = mount;

var doMount = function (child, childEl, parentEl, oldParent) {
  var hooks = childEl.__redom_lifecycle || (childEl.__redom_lifecycle = {});
  var remount = parentEl === oldParent;
  var hooksFound = false;

  for (var i = 0, list = hookNames; i < list.length; i += 1) {
    var hookName = list[i];

    if (!remount) {
      // if already mounted, skip this phase
      if (child !== childEl) {
        // only Views can have lifecycle events
        if (hookName in child) {
          hooks[hookName] = (hooks[hookName] || 0) + 1;
        }
      }
    }

    if (hooks[hookName]) {
      hooksFound = true;
    }
  }

  if (!hooksFound) {
    childEl.__redom_mounted = true;
    return;
  }

  var traverse = parentEl;
  var triggered = false;

  if (remount || traverse && traverse.__redom_mounted) {
    trigger(childEl, remount ? 'onremount' : 'onmount');
    triggered = true;
  }

  while (traverse) {
    var parent = traverse.parentNode;
    var parentHooks = traverse.__redom_lifecycle || (traverse.__redom_lifecycle = {});

    for (var hook in hooks) {
      parentHooks[hook] = (parentHooks[hook] || 0) + hooks[hook];
    }

    if (triggered) {
      break;
    } else {
      if (traverse === document || shadowRootAvailable && traverse instanceof window.ShadowRoot || parent && parent.__redom_mounted) {
        trigger(traverse, remount ? 'onremount' : 'onmount');
        triggered = true;
      }

      traverse = parent;
    }
  }
};

var trigger = function (el, eventName) {
  if (eventName === 'onmount' || eventName === 'onremount') {
    el.__redom_mounted = true;
  } else if (eventName === 'onunmount') {
    el.__redom_mounted = false;
  }

  var hooks = el.__redom_lifecycle;

  if (!hooks) {
    return;
  }

  var view = el.__redom_view;
  var hookCount = 0;
  view && view[eventName] && view[eventName]();

  for (var hook in hooks) {
    if (hook) {
      hookCount++;
    }
  }

  if (hookCount) {
    var traverse = el.firstChild;

    while (traverse) {
      var next = traverse.nextSibling;
      trigger(traverse, eventName);
      traverse = next;
    }
  }
};

var setStyle = function (view, arg1, arg2) {
  var el = getEl(view);

  if (arg2 !== undefined) {
    el.style[arg1] = arg2;
  } else if (typeof arg1 === 'string') {
    el.setAttribute('style', arg1);
  } else {
    for (var key in arg1) {
      setStyle(el, key, arg1[key]);
    }
  }
};
/* global SVGElement */


exports.setStyle = setStyle;
var xlinkns = 'http://www.w3.org/1999/xlink';

var setAttr = function (view, arg1, arg2) {
  var el = getEl(view);
  var isSVG = el instanceof SVGElement;
  var isFunc = typeof arg2 === 'function';

  if (arg2 !== undefined) {
    if (arg1 === 'style') {
      setStyle(el, arg2);
    } else if (isSVG && isFunc) {
      el[arg1] = arg2;
    } else if (arg1 === 'dataset') {
      setData(el, arg2);
    } else if (!isSVG && (arg1 in el || isFunc)) {
      el[arg1] = arg2;
    } else {
      if (isSVG && arg1 === 'xlink') {
        setXlink(el, arg2);
        return;
      }

      el.setAttribute(arg1, arg2);
    }
  } else {
    for (var key in arg1) {
      setAttr(el, key, arg1[key]);
    }
  }
};

exports.setAttr = setAttr;

function setXlink(el, obj) {
  for (var key in obj) {
    el.setAttributeNS(xlinkns, key, obj[key]);
  }
}

function setData(el, obj) {
  for (var key in obj) {
    el.dataset[key] = obj[key];
  }
}

var text = function (str) {
  return document.createTextNode(str != null ? str : '');
};

exports.text = text;

var parseArguments = function (element, args) {
  for (var i = 0, list = args; i < list.length; i += 1) {
    var arg = list[i];

    if (arg !== 0 && !arg) {
      continue;
    }

    var type = typeof arg; // support middleware

    if (type === 'function') {
      arg(element);
    } else if (type === 'string' || type === 'number') {
      element.appendChild(text(arg));
    } else if (isNode(getEl(arg))) {
      mount(element, arg);
    } else if (arg.length) {
      parseArguments(element, arg);
    } else if (type === 'object') {
      setAttr(element, arg);
    }
  }
};

var ensureEl = function (parent) {
  return typeof parent === 'string' ? html(parent) : getEl(parent);
};

var getEl = function (parent) {
  return parent.nodeType && parent || !parent.el && parent || getEl(parent.el);
};

var isNode = function (a) {
  return a && a.nodeType;
};

var htmlCache = {};

var memoizeHTML = function (query) {
  return htmlCache[query] || (htmlCache[query] = createElement(query));
};

var html = function (query) {
  var args = [],
      len = arguments.length - 1;

  while (len-- > 0) args[len] = arguments[len + 1];

  var element;
  var type = typeof query;

  if (type === 'string') {
    element = memoizeHTML(query).cloneNode(false);
  } else if (isNode(query)) {
    element = query.cloneNode(false);
  } else if (type === 'function') {
    var Query = query;
    element = new (Function.prototype.bind.apply(Query, [null].concat(args)))();
  } else {
    throw new Error('At least one argument required');
  }

  parseArguments(getEl(element), args);
  return element;
};

exports.html = html;

html.extend = function (query) {
  var args = [],
      len = arguments.length - 1;

  while (len-- > 0) args[len] = arguments[len + 1];

  var clone = memoizeHTML(query);
  return html.bind.apply(html, [this, clone].concat(args));
};

var el = html;
exports.el = el;
var h = html;
exports.h = h;

var setChildren = function (parent) {
  var children = [],
      len = arguments.length - 1;

  while (len-- > 0) children[len] = arguments[len + 1];

  var parentEl = getEl(parent);
  var current = traverse(parent, children, parentEl.firstChild);

  while (current) {
    var next = current.nextSibling;
    unmount(parent, current);
    current = next;
  }
};

exports.setChildren = setChildren;

function traverse(parent, children, _current) {
  var current = _current;
  var childEls = new Array(children.length);

  for (var i = 0; i < children.length; i++) {
    childEls[i] = children[i] && getEl(children[i]);
  }

  for (var i$1 = 0; i$1 < children.length; i$1++) {
    var child = children[i$1];

    if (!child) {
      continue;
    }

    var childEl = childEls[i$1];

    if (childEl === current) {
      current = current.nextSibling;
      continue;
    }

    if (isNode(childEl)) {
      var next = current && current.nextSibling;
      var exists = child.__redom_index != null;
      var replace = exists && next === childEls[i$1 + 1];
      mount(parent, child, current, replace);

      if (replace) {
        current = next;
      }

      continue;
    }

    if (child.length != null) {
      current = traverse(parent, child, current);
    }
  }

  return current;
}

var propKey = function (key) {
  return function (item) {
    return item[key];
  };
};

var listPool = function (View, key, initData) {
  return new ListPool(View, key, initData);
};

exports.listPool = listPool;

var ListPool = function ListPool(View, key, initData) {
  this.View = View;
  this.initData = initData;
  this.oldLookup = {};
  this.lookup = {};
  this.oldViews = [];
  this.views = [];

  if (key != null) {
    this.key = typeof key === 'function' ? key : propKey(key);
  }
};

exports.ListPool = ListPool;

ListPool.prototype.update = function update(data, context) {
  var ref = this;
  var View = ref.View;
  var key = ref.key;
  var initData = ref.initData;
  var keySet = key != null;
  var oldLookup = this.lookup;
  var newLookup = {};
  var newViews = new Array(data.length);
  var oldViews = this.views;

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var view = void 0;

    if (keySet) {
      var id = key(item);
      view = oldLookup[id] || new View(initData, item, i, data);
      newLookup[id] = view;
      view.__redom_id = id;
    } else {
      view = oldViews[i] || new View(initData, item, i, data);
    }

    view.update && view.update(item, i, data, context);
    var el = getEl(view.el);
    el.__redom_view = view;
    newViews[i] = view;
  }

  this.oldViews = oldViews;
  this.views = newViews;
  this.oldLookup = oldLookup;
  this.lookup = newLookup;
};

var list = function (parent, View, key, initData) {
  return new List(parent, View, key, initData);
};

exports.list = list;

var List = function List(parent, View, key, initData) {
  this.__redom_list = true;
  this.View = View;
  this.initData = initData;
  this.views = [];
  this.pool = new ListPool(View, key, initData);
  this.el = ensureEl(parent);
  this.keySet = key != null;
};

exports.List = List;

List.prototype.update = function update(data, context) {
  if (data === void 0) data = [];
  var ref = this;
  var keySet = ref.keySet;
  var oldViews = this.views;
  this.pool.update(data, context);
  var ref$1 = this.pool;
  var views = ref$1.views;
  var lookup = ref$1.lookup;

  if (keySet) {
    for (var i = 0; i < oldViews.length; i++) {
      var oldView = oldViews[i];
      var id = oldView.__redom_id;

      if (lookup[id] == null) {
        oldView.__redom_index = null;
        unmount(this, oldView);
      }
    }
  }

  for (var i$1 = 0; i$1 < views.length; i$1++) {
    var view = views[i$1];
    view.__redom_index = i$1;
  }

  setChildren(this, views);

  if (keySet) {
    this.lookup = lookup;
  }

  this.views = views;
};

List.extend = function (parent, View, key, initData) {
  return List.bind(List, parent, View, key, initData);
};

list.extend = List.extend;
/* global Node */

var place = function (View, initData) {
  return new Place(View, initData);
};

exports.place = place;

var Place = function Place(View, initData) {
  this.el = text('');
  this.visible = false;
  this.view = null;
  this._placeholder = this.el;

  if (View instanceof Node) {
    this._el = View;
  } else {
    this._View = View;
  }

  this._initData = initData;
};

exports.Place = Place;

Place.prototype.update = function update(visible, data) {
  var placeholder = this._placeholder;
  var parentNode = this.el.parentNode;

  if (visible) {
    if (!this.visible) {
      if (this._el) {
        mount(parentNode, this._el, placeholder);
        unmount(parentNode, placeholder);
        this.el = this._el;
        this.visible = visible;
        return;
      }

      var View = this._View;
      var view = new View(this._initData);
      this.el = getEl(view);
      this.view = view;
      mount(parentNode, view, placeholder);
      unmount(parentNode, placeholder);
    }

    this.view && this.view.update && this.view.update(data);
  } else {
    if (this.visible) {
      if (this._el) {
        mount(parentNode, placeholder, this._el);
        unmount(parentNode, this._el);
        this.el = placeholder;
        this.visible = visible;
        return;
      }

      mount(parentNode, placeholder, this.view);
      unmount(parentNode, this.view);
      this.el = placeholder;
      this.view = null;
    }
  }

  this.visible = visible;
};

var router = function (parent, Views, initData) {
  return new Router(parent, Views, initData);
};

exports.router = router;

var Router = function Router(parent, Views, initData) {
  this.el = ensureEl(parent);
  this.Views = Views;
  this.initData = initData;
};

exports.Router = Router;

Router.prototype.update = function update(route, data) {
  if (route !== this.route) {
    var Views = this.Views;
    var View = Views[route];
    this.route = route;
    this.view = View && new View(this.initData, data);
    setChildren(this.el, [this.view]);
  }

  this.view && this.view.update && this.view.update(data, route);
};

var ns = 'http://www.w3.org/2000/svg';
var svgCache = {};

var memoizeSVG = function (query) {
  return svgCache[query] || (svgCache[query] = createElement(query, ns));
};

var svg = function (query) {
  var args = [],
      len = arguments.length - 1;

  while (len-- > 0) args[len] = arguments[len + 1];

  var element;
  var type = typeof query;

  if (type === 'string') {
    element = memoizeSVG(query).cloneNode(false);
  } else if (isNode(query)) {
    element = query.cloneNode(false);
  } else if (type === 'function') {
    var Query = query;
    element = new (Function.prototype.bind.apply(Query, [null].concat(args)))();
  } else {
    throw new Error('At least one argument required');
  }

  parseArguments(getEl(element), args);
  return element;
};

exports.svg = svg;

svg.extend = function (query) {
  var clone = memoizeSVG(query);
  return svg.bind(this, clone);
};

svg.ns = ns;
var s = svg;
exports.s = s;
},{}],"LWei":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Language = /*#__PURE__*/function () {
  function Language() {
    _classCallCheck(this, Language);
  }

  _createClass(Language, [{
    key: "setLocale",
    value: function setLocale(locale) {
      window.CookieConsent.config.language.current = locale;
    }
  }], [{
    key: "getTranslation",
    value: function getTranslation(object, locale, key) {
      var currentLocale;
      if (!object.hasOwnProperty('language')) return '[Missing language object]';
      if (!object.language.hasOwnProperty('locale')) return '[Missing locale object]';
      currentLocale = object.language.locale.hasOwnProperty(locale) ? locale : 'en';
      return object.language.locale[currentLocale].hasOwnProperty(key) ? object.language.locale[currentLocale][key] : '[Missing translation]';
    }
  }]);

  return Language;
}();

exports.default = Language;
},{}],"Qw25":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redom = require("redom");

var _Language = _interopRequireDefault(require("./Language"));

var _Utilities = _interopRequireDefault(require("./Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Interface = /*#__PURE__*/function () {
  function Interface() {
    _classCallCheck(this, Interface);

    this.elements = {};
  }

  _createClass(Interface, [{
    key: "buildStyle",
    value: function buildStyle() {
      return (0, _redom.el)('style', '#cconsent-bar, #cconsent-bar * { box-sizing:border-box }', '#cconsent-bar { background-color:' + window.CookieConsent.config.theme.barColor + '; color:' + window.CookieConsent.config.theme.barTextColor + '; padding:15px; text-align:right; font-family:sans-serif; font-size:14px; line-height:18px; position:fixed; bottom:0; left:0; width:100%; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}', '#cconsent-bar.ccb--hidden {transform: translateY(100%); display:block;}', '#cconsent-bar .ccb__wrapper { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}', '#cconsent-bar .ccb__left { align-self:center; text-align:left; margin: 15px 0;}', '#cconsent-bar .ccb__right { align-self:center; white-space: nowrap;}', '#cconsent-bar .ccb__right > div {display:inline-block; color:#FFF;}', '#cconsent-bar a { text-decoration:underline; color:' + window.CookieConsent.config.theme.barTextColor + '; }', '#cconsent-bar .cc-text { color:' + window.CookieConsent.config.theme.barTextColor + ' !important; }', '#cconsent-bar button { line-height:normal; font-size:14px; border:none; margin-left: 15px; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}', '#cconsent-bar a.ccb__edit { margin-right:15px }', '#cconsent-bar a:hover, #cconsent-bar button:hover { cursor:pointer; }', '#cconsent-modal { display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}', '@media (max-width: 600px) { #cconsent-modal { height: 100% } }', '#cconsent-modal h2, #cconsent-modal h3 {color:#333}', '#cconsent-modal.ccm--visible {display:flex}', '#cconsent-modal .ccm__content { max-width:600px; min-height:500px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; }', '@media (max-width: 600px) { #cconsent-modal .ccm__content { max-width:100vw; height:100%; max-height:initial; }}', '#cconsent-modal .ccm__content > .ccm__content__heading { border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__heading h2 { font-size:21px; font-weight:600; color:#333; margin:0 }', '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close {font-weight:600; color:#888; cursor:pointer; font-size:26px; position: absolute; right:15px; top: 15px;}', '#cconsent-modal h2, #cconsent-modal h3 {margin-top:0}', '#cconsent-modal .ccm__content > .ccm__content__body { background-color:#FFF;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup {margin:0; border-bottom: 1px solid #D8D8D8; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head::before { position:absolute; left:35px; font-size:1.4em; font-weight: 600; color:#E56385; content:"×"; display:inline-block; margin-right: 20px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.checked-5jhk .ccm__tab-head::before {font-size:1em; content:"✔"; color:#28A834}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge { transition: transform .3s ease-out; transform-origin: 16px 6px 0; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%)}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge > svg { pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head .ccm__tab-head__icon-wedge {transform:rotate(-180deg)}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {color:#333; padding:17px 35px 17px 56px; margin:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content {padding:25px 35px; margin:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head { transition: background-color .5s ease-out }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head:hover { background-color:#F9F9F9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {font-weight:600; cursor:pointer; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content {display:none;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head { background-color:#F9F9F9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {display:flex;}', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {flex-direction:column} }', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left { margin-bottom:20px; } }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-component {display:flex; margin-right:35px; align-items:center;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-component > div {font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch-group {width:40px; height:20px; margin:0 10px; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch {position: absolute; top:0; right:0; display: inline-block; width: 40px; height: 20px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input {display:none;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch .ccm__switch__slider  {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch .ccm__switch__slider:before  {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:checked + .ccm__switch__slider  {background-color: #28A834;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:focus + .ccm__switch__slider  {box-shadow: 0 0 1px #28A834;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__left .ccm__switch input:checked + .ccm__switch__slider:before  {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content h3 {font-size:18px; margin-bottom:10px; line-height:1;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content p {color:#444; margin-bottom:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list:not(:empty) {margin-top:30px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list .ccm__list__title {color:#333; font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list ul { margin:15px 0; padding-left:15px }', '#cconsent-modal .ccm__footer { padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }', '#cconsent-modal .ccm__footer button { line-height:normal; font-size:14px; transition: background-color .5s ease-out; background-color:' + window.CookieConsent.config.theme.modalMainButtonColor + '; color:' + window.CookieConsent.config.theme.modalMainButtonTextColor + '; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; }', '#cconsent-modal .ccm__footer button:not(:first-of-type) { margin-left:10px; }', '#cconsent-modal .ccm__footer button:hover { background-color:' + _Utilities.default.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20) + '; }' //'#cconsent-modal .ccm__footer button#ccm__footer__consent-modal-submit {  margin-right:10px; }'
      );
    }
  }, {
    key: "buildBar",
    value: function buildBar() {
      return (0, _redom.el)('div#cconsent-bar.ccb--hidden', (0, _redom.el)("div.ccb__wrapper", (0, _redom.el)('div.ccb__left', (0, _redom.el)('div.cc-text', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))), (0, _redom.el)('div.ccb__right', (0, _redom.el)('div.ccb__button', (0, _redom.el)('a.ccb__edit', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting')), window.CookieConsent.config.showRejectAllButton ? (0, _redom.el)('button.consent-reject', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnRejectAll')) : null, (0, _redom.el)('button.consent-give', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnAcceptAll'))))));
    }
  }, {
    key: "buildModal",
    value: function buildModal() {
      // Cookie names list middleware
      var listCookies = function listCookies(category) {
        var list = [];

        for (var service in window.CookieConsent.config.services) {
          window.CookieConsent.config.services[service].category === category && list.push(window.CookieConsent.config.services[service]);
        }

        if (list.length) {
          var listItems = [];

          for (var item in list) {
            listItems.push((0, _redom.el)('li', _Language.default.getTranslation(list[item], window.CookieConsent.config.language.current, 'name')));
          }

          return [(0, _redom.el)('div.ccm__list', (0, _redom.el)('span.ccm__list__title', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalAffectedSolutions')), (0, _redom.el)('ul', listItems))];
        }
      };

      function modalTabGroups() {
        var contentItems = [];
        var i = 0;

        for (var key in window.CookieConsent.config.categories) {
          contentItems.push((0, _redom.el)('dl.ccm__tabgroup' + '.' + key + (window.CookieConsent.config.categories[key].checked ? '.checked-5jhk' : ''), {
            'data-category': key
          }, (0, _redom.el)('dt.ccm__tab-head', _Language.default.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name'), (0, _redom.el)('a.ccm__tab-head__icon-wedge', (0, _redom.el)(document.createElementNS("http://www.w3.org/2000/svg", "svg"), {
            version: "1.2",
            preserveAspectRatio: "none",
            viewBox: "0 0 24 24",
            class: "icon-wedge-svg",
            "data-id": "e9b3c566e8c14cfea38af128759b91a3",
            style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"
          }, (0, _redom.el)(document.createElementNS("http://www.w3.org/2000/svg", "path"), {
            'xmlns:default': "http://www.w3.org/2000/svg",
            class: "icon-wedge-angle-down",
            d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z",
            style: "fill: rgb(51, 51, 51);"
          })))), (0, _redom.el)('dd.ccm__tab-content', (0, _redom.el)('div.ccm__tab-content__left', !window.CookieConsent.config.categories[key].needed && (0, _redom.el)('div.ccm__switch-component', (0, _redom.el)('div.status-off', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')), (0, _redom.el)('div.ccm__switch-group', (0, _redom.el)('label.ccm__switch', (0, _redom.el)('input.category-onoff', {
            type: 'checkbox',
            'data-category': key,
            'checked': window.CookieConsent.config.categories[key].checked
          }), (0, _redom.el)('span.ccm__switch__slider'))), (0, _redom.el)('div.status-on', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'on')))), (0, _redom.el)('div.right', (0, _redom.el)('h3', _Language.default.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')), (0, _redom.el)('p', _Language.default.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')), (0, _redom.el)('div.ccm__list', listCookies(key))))));
          i++;
        }

        return contentItems;
      }

      return (0, _redom.el)('div#cconsent-modal', (0, _redom.el)('div.ccm__content', (0, _redom.el)('div.ccm__content__heading', (0, _redom.el)('h2', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')), (0, _redom.el)('p', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'), window.CookieConsent.config.modalMainTextMoreLink ? (0, _redom.el)('a', {
        href: window.CookieConsent.config.modalMainTextMoreLink,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'learnMore')) : null), (0, _redom.el)('div.ccm__cheading__close', '×')), (0, _redom.el)('div.ccm__content__body', (0, _redom.el)('div.ccm__tabs', modalTabGroups())), (0, _redom.el)('div.ccm__footer', (0, _redom.el)('button#ccm__footer__consent-modal-submit', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')), window.CookieConsent.config.showRejectAllButton ? (0, _redom.el)('button.consent-reject', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnRejectAll')) : null, (0, _redom.el)('button.consent-give', _Language.default.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll')))));
    }
  }, {
    key: "modalRedrawIcons",
    value: function modalRedrawIcons() {
      var tabGroups = this.elements['modal'].querySelectorAll('.ccm__tabgroup');

      var _iterator = _createForOfIteratorHelper(tabGroups),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tabGroup = _step.value;

          if (window.CookieConsent.config.categories[tabGroup.dataset.category].checked) {
            if (!tabGroup.classList.contains('checked-5jhk')) {
              tabGroup.classList.add('checked-5jhk');
              tabGroup.querySelector('input.category-onoff').checked = true;
            }

            ;
          } else {
            if (tabGroup.classList.contains('checked-5jhk')) tabGroup.classList.remove('checked-5jhk');
            tabGroup.querySelector('input.category-onoff').checked = false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "render",
    value: function render(name, elem, callback) {
      if (typeof callback === 'undefined') callback = function callback() {};

      if (typeof this.elements[name] !== 'undefined') {
        this.elements[name].parentNode.replaceChild(elem, this.elements[name]);
        this.elements[name] = elem;
        callback(elem);
        return elem;
      } else {
        var insertedElem = (0, _redom.mount)(document.body, elem);

        if (insertedElem) {
          this.elements[name] = insertedElem;
        }

        callback(insertedElem);
        return insertedElem;
      }
    }
  }, {
    key: "buildInterface",
    value: function buildInterface(callback) {
      if (typeof callback === 'undefined') callback = function callback() {};
      var that = this;

      _Utilities.default.ready(function () {
        that.render('style', that.buildStyle());
        that.render('bar', that.buildBar(), function (bar) {
          // Show the bar after a while
          if (!window.CookieConsent.config.cookieExists) {
            setTimeout(function () {
              bar.classList.remove('ccb--hidden');
            }, window.CookieConsent.config.barTimeout);
          }
        });
        that.render('modal', that.buildModal());
        callback();
      });
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(elements) {
      var _this = this;

      // If you click Accept all cookies
      var buttonConsentGive = document.querySelectorAll('.consent-give');

      var _iterator2 = _createForOfIteratorHelper(buttonConsentGive),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var button = _step2.value;
          button.addEventListener('click', function () {
            // We set config to full consent
            for (var key in window.CookieConsent.config.categories) {
              window.CookieConsent.config.categories[key].wanted = window.CookieConsent.config.categories[key].checked = true;
            }

            _this.writeBufferToDOM();

            _this.buildCookie(function (cookie) {
              _this.setCookie(cookie);
            });

            _this.elements['bar'].classList.add('ccb--hidden');

            _this.elements['modal'].classList.remove('ccm--visible');

            _this.modalRedrawIcons();
          });
        } // If you click Decline all cookies

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var buttonConsentReject = document.querySelectorAll('.consent-reject');

      var _iterator3 = _createForOfIteratorHelper(buttonConsentReject),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _button = _step3.value;

          _button.addEventListener('click', function () {
            // We set config to full rejection
            for (var key in window.CookieConsent.config.categories) {
              if (!window.CookieConsent.config.categories[key].needed) {
                window.CookieConsent.config.categories[key].wanted = window.CookieConsent.config.categories[key].checked = false;
              }
            }

            _this.writeBufferToDOM();

            _this.buildCookie(function (cookie) {
              _this.setCookie(cookie);
            });

            _this.elements['bar'].classList.add('ccb--hidden');

            _this.elements['modal'].classList.remove('ccm--visible');

            _this.modalRedrawIcons();
          });
        } // If you click Cookie settings and open modal

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      Array.prototype.forEach.call(document.getElementsByClassName('ccb__edit'), function (edit) {
        edit.addEventListener('click', function () {
          _this.elements['modal'].classList.add('ccm--visible');
        });
      }); // If you click trough the tabs on Cookie settings
      // If you click on/off switch

      this.elements['modal'].querySelector('.ccm__tabs').addEventListener('click', function (event) {
        // If you click trough the tabs on Cookie settings
        if (event.target.classList.contains('ccm__tab-head') || event.target.classList.contains('ccm__tab-head__icon-wedge')) {
          var getDlParent = function getDlParent(eventTarget) {
            var parent = eventTarget.parentNode;

            if (parent.nodeName !== 'DL') {
              return getDlParent(parent);
            } else {
              return parent;
            }
          };

          var parentDl = getDlParent(event.target);

          if (parentDl.classList.contains('ccm__tabgroup--open')) {
            parentDl.classList.remove('ccm__tabgroup--open');
          } else {
            parentDl.classList.add('ccm__tabgroup--open');
          }
        } // If you click on/off switch


        if (event.target.classList.contains('category-onoff')) {
          window.CookieConsent.config.categories[event.target.dataset.category].wanted = window.CookieConsent.config.categories[event.target.dataset.category].checked = event.target.checked === true ? true : false;
          var dt = document.querySelector('.ccm__tabgroup.' + event.target.dataset.category);

          if (event.target.checked === false && dt.classList.contains('checked-5jhk')) {
            dt.classList.remove('checked-5jhk');
          } else {
            dt.classList.add('checked-5jhk');
          }
        }
      }); // If you click close on open modal

      this.elements['modal'].querySelector('.ccm__cheading__close').addEventListener('click', function (event) {
        _this.elements['modal'].classList.remove('ccm--visible');
      }); // If you click submit on cookie settings

      document.getElementById('ccm__footer__consent-modal-submit').addEventListener('click', function () {
        var switchElements = _this.elements['modal'].querySelectorAll('.ccm__switch input');

        Array.prototype.forEach.call(switchElements, function (switchElement) {
          window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
        });

        _this.buildCookie(function (cookie) {
          _this.setCookie(cookie, function () {
            _this.elements['modal'].classList.remove('ccm--visible');

            _this.elements['bar'].classList.add('ccb--hidden');
          });
        });

        _this.writeBufferToDOM();
      });
    }
  }, {
    key: "writeBufferToDOM",
    value: function writeBufferToDOM() {
      var _iterator4 = _createForOfIteratorHelper(window.CookieConsent.buffer.appendChild),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var action = _step4.value;

          if (window.CookieConsent.config.categories[action.category].wanted === true) {
            Node.prototype.appendChild.apply(action.this, action.arguments);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var _iterator5 = _createForOfIteratorHelper(window.CookieConsent.buffer.insertBefore),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _action = _step5.value;

          if (window.CookieConsent.config.categories[_action.category].wanted === true) {
            _action.arguments[1] = _action.arguments[0].parentNode === null ? _action.this.lastChild : _action.arguments[1];
            Node.prototype.insertBefore.apply(_action.this, _action.arguments);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "buildCookie",
    value: function buildCookie(callback) {
      var cookie = {
        version: window.CookieConsent.config.cookieVersion,
        categories: {},
        services: []
      };

      for (var key in window.CookieConsent.config.categories) {
        cookie.categories[key] = {
          wanted: window.CookieConsent.config.categories[key].wanted
        };
      }

      cookie.services = _Utilities.default.listGlobalServices();
      if (callback) callback(cookie);
      return cookie;
    }
  }, {
    key: "setCookie",
    value: function setCookie(cookie, callback) {
      var expires_in = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = "cconsent=".concat(JSON.stringify(cookie), "; expires=").concat(expires_in, "; path=/;");
      if (callback) callback();
    }
  }]);

  return Interface;
}();

exports.default = Interface;
},{"redom":"GuEK","./Language":"LWei","./Utilities":"wJ6H"}],"duLQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("./Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Configuration = /*#__PURE__*/function () {
  function Configuration(configObject) {
    _classCallCheck(this, Configuration);

    window.CookieConsent.buffer = {
      appendChild: [],
      insertBefore: []
    }; // Wrapper filter function

    window.CookieConsent.wrapper = function () {}; // Settings injector for users


    window.CookieConsent.setConfiguration = this.setConfiguration.bind(this);
    window.CookieConsent.config = {
      active: true,
      cookieExists: false,
      cookieVersion: 1,
      modalMainTextMoreLink: null,
      barTimeout: 1000,
      showRejectAllButton: true,
      debug: false,
      theme: {
        barColor: '#2C7CBF',
        barTextColor: '#FFF',
        barMainButtonColor: '#FFF',
        barMainButtonTextColor: '#2C7CBF',
        modalMainButtonColor: '#4285F4',
        modalMainButtonTextColor: '#FFF'
      },
      language: {
        current: 'en',
        locale: {
          en: {
            barMainText: 'This website uses cookies to ensure you get the best experience on our website.',
            barLinkSetting: 'Cookie Settings',
            barBtnAcceptAll: 'Accept all cookies',
            barBtnRejectAll: 'Reject all cookies',
            modalMainTitle: 'Cookie settings',
            modalMainText: 'Cookies are small piece of data sent from a website and stored on the user\'s computer by the user\'s web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user\'s browsing activity.',
            modalBtnSave: 'Save current settings',
            modalBtnAcceptAll: 'Accept all cookies and close',
            modalBtnRejectAll: 'Reject all cookies and close',
            modalAffectedSolutions: 'Affected solutions:',
            learnMore: 'Learn More',
            on: 'On',
            off: 'Off'
          },
          cs: {
            barMainText: 'Tato stránka pro svůj provoz využívá cookies.',
            barLinkSetting: 'Nastavení cookies',
            barBtnAcceptAll: 'Povolit všechny cookies',
            barBtnRejectAll: 'Odmítnout všechny cookies',
            modalMainTitle: 'Nastavení cookies',
            modalMainText: 'Cookies jsou malá data odeslaná z webové stránky a uložená v počítači uživatele webovým prohlížečem uživatele, když uživatel prochází. Váš prohlížeč ukládá každou zprávu do malého souboru, který se nazývá cookie. Když si ze serveru vyžádáte další stránku, váš prohlížeč odešle cookie zpět na server. Soubory cookie byly navrženy tak, aby byly spolehlivým mechanismem pro webové stránky, aby si pamatovaly informace nebo zaznamenávaly aktivitu uživatele při prohlížení.',
            modalBtnSave: 'Uložit nastavení',
            modalBtnAcceptAll: 'Povolit všechny cookies a zavřít',
            modalBtnRejectAll: 'Odmítnout všechny cookies a zavřít',
            modalAffectedSolutions: 'Nastavení cookies bude mít vliv na tyto služby:',
            learnMore: 'Více informací',
            on: 'Ano',
            off: 'Ne'
          },
          hu: {
            barMainText: 'Ez a weboldal Sütiket használ a jobb felhasználói élmény érdekében.',
            barLinkSetting: 'Süti beállítások',
            barBtnAcceptAll: 'Minden süti elfogadása',
            modalMainTitle: 'Süti beállítások',
            modalMainText: 'A HTTP-süti (általában egyszerűen süti, illetve angolul cookie) egy információcsomag, amelyet a szerver küld a webböngészőnek, majd a böngésző visszaküld a szervernek minden, a szerver felé irányított kérés alkalmával. Amikor egy weboldalt kérünk le a szervertől, akkor a böngésző elküldi a számára elérhető sütiket. A süti-ket úgy tervezték, hogy megbízható mechanizmust biztosítsanak a webhelyek számára az információk megőrzésére vagy a felhasználók böngészési tevékenységének rögzítésére.',
            modalBtnSave: 'Beállítások mentése',
            modalBtnAcceptAll: 'Minden Süti elfogadása',
            modalAffectedSolutions: 'Mire lesz ez hatással:',
            learnMore: 'Tudj meg többet',
            on: 'Be',
            off: 'Ki'
          }
        }
      },
      categories: {},
      services: {}
    };
    this.setConfiguration(configObject);
  }

  _createClass(Configuration, [{
    key: "setConfiguration",
    value: function setConfiguration(configObject) {
      // The user overrides the default config
      console.log(window.CookieConsent.config, configObject, _objectSpread(_objectSpread({}, window.CookieConsent.config), configObject));
      this.mergeDeep(window.CookieConsent.config, configObject); //loMerge(window.CookieConsent.config, configObject);
      // The cookie overrides the default and user config

      this.cookieToConfig(); // We tell the world we did this

      _Utilities.default.dispatchEvent(document, 'CCConfigSet');
    }
  }, {
    key: "cookieToConfig",
    value: function cookieToConfig() {
      function removeReload() {
        _Utilities.default.removeCookie();

        location.reload();
        return false;
      }

      document.cookie.split(';').filter(function (item) {
        if (item.indexOf('cconsent') >= 0) {
          var cookieData = JSON.parse(item.split('=')[1]); // We check cookie version. If older we need to renew cookie.

          if (typeof cookieData.version === 'undefined') {
            return removeReload();
          } else {
            if (cookieData.version !== window.CookieConsent.config.cookieVersion) {
              return removeReload();
            }
          } // We check if cookie data categories also exist in user config


          for (var key in cookieData.categories) {
            // The cookie contains category not present in user config so we invalidate cookie
            if (typeof window.CookieConsent.config.categories[key] === 'undefined') {
              return removeReload();
            }
          } // We check if cookie data services also exist in user config


          cookieData.services.forEach(function (service) {
            // The cookie contains service not present in user config so we invalidate cookie
            if (typeof window.CookieConsent.config.services[service] === 'undefined') {
              return removeReload();
            }
          }); // We we integrate cookie data into the global config object

          for (var _key in cookieData.categories) {
            window.CookieConsent.config.categories[_key].checked = window.CookieConsent.config.categories[_key].wanted = cookieData.categories[_key].wanted === true ? true : false;
          }

          window.CookieConsent.config.cookieExists = true;
          return true;
        }
      });
      return false;
    } // Simple object check.

  }, {
    key: "isObject",
    value: function isObject(item) {
      return item && _typeof(item) === 'object' && !Array.isArray(item);
    } //Deep merge two objects.

  }, {
    key: "mergeDeep",
    value: function mergeDeep(target) {
      for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        sources[_key2 - 1] = arguments[_key2];
      }

      if (!sources.length) return target;
      var source = sources.shift();

      if (this.isObject(target) && this.isObject(source)) {
        for (var key in source) {
          if (this.isObject(source[key])) {
            if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
            this.mergeDeep(target[key], source[key]);
          } else {
            Object.assign(target, _defineProperty({}, key, source[key]));
          }
        }
      }

      return this.mergeDeep.apply(this, [target].concat(sources));
    }
  }]);

  return Configuration;
}();

exports.default = Configuration;
},{"./Utilities":"wJ6H"}],"xR4A":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("./Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var RemoveCookies = /*#__PURE__*/function () {
  function RemoveCookies() {
    _classCallCheck(this, RemoveCookies);
  }

  _createClass(RemoveCookies, [{
    key: "init",
    value: function init() {
      this.removeUnwantedCookies();
    }
  }, {
    key: "removeUnwantedCookies",
    value: function removeUnwantedCookies() {
      var cookieList = [];
      var config = window.CookieConsent.config;
      document.cookie.split(';').map(function (a) {
        cookieList.push(a.split('=')[0].replace(/(^\s*)|(\s*&)/, ''));
      });

      for (var service in config.services) {
        if (_Utilities.default.objectType(config.services[service].cookies) === 'Array') {
          // Remove cookies if they are not wanted by user
          if (!config.categories[config.services[service].category].wanted) {
            for (var i in config.services[service].cookies) {
              var type = _Utilities.default.objectType(config.services[service].cookies[i].name);

              if (type === 'String') {
                if (cookieList.indexOf(config.services[service].cookies[i].name) > -1) {
                  this.removeCookie(config.services[service].cookies[i]);
                }
              } else if (type === 'RegExp') {
                // Searching cookie list for cookies matching specified RegExp
                var cookieDef = config.services[service].cookies[i];

                for (var c in cookieList) {
                  if (cookieList[c].match(cookieDef.name)) {
                    this.removeCookie({
                      name: cookieList[c],
                      domain: _Utilities.default.objectType(cookieDef.domain) === 'String' ? cookieDef.domain : null
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "removeCookie",
    value: function removeCookie(cookie) {
      // Removing cookies from domain and .domain
      var domain = _Utilities.default.objectType(cookie.domain) === 'String' ? "domain=".concat(cookie.domain, ";") : '';
      document.cookie = "".concat(cookie.name, "=; expires=Thu, 01 Jan 1980 00:00:00 UTC; ").concat(domain, " path=/;");
    }
  }]);

  return RemoveCookies;
}();

exports.default = RemoveCookies;
},{"./Utilities":"wJ6H"}],"ylkZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _InsertScriptFilter = _interopRequireDefault(require("./InsertScriptFilter"));

var _ScriptTagFilter = _interopRequireDefault(require("./ScriptTagFilter"));

var _WrapperFilter = _interopRequireDefault(require("./WrapperFilter"));

var _LocalCookieFilter = _interopRequireDefault(require("./LocalCookieFilter"));

var _Interface = _interopRequireDefault(require("./Interface"));

var _Configuration = _interopRequireDefault(require("./Configuration"));

var _RemoveCookies = _interopRequireDefault(require("./RemoveCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var CookieConsent = /*#__PURE__*/function () {
  function CookieConsent() {
    _classCallCheck(this, CookieConsent);
  }

  _createClass(CookieConsent, [{
    key: "init",
    value: function init(configObject) {
      new _Configuration.default(configObject);
      var removeCookies = new _RemoveCookies.default();
      var insertScriptFilter = new _InsertScriptFilter.default();
      var scriptTagFilter = new _ScriptTagFilter.default();
      var wrapperFilter = new _WrapperFilter.default();
      var localCookieFilter = new _LocalCookieFilter.default(); // remove cookies on init

      removeCookies.init();
      insertScriptFilter.init();
      scriptTagFilter.init();
      wrapperFilter.init();
      localCookieFilter.init();
      var UI = new _Interface.default();
      UI.buildInterface(function () {
        UI.addEventListeners();
      });
    }
  }]);

  return CookieConsent;
}();

exports.default = CookieConsent;
},{"./InsertScriptFilter":"UWvR","./ScriptTagFilter":"ob2e","./WrapperFilter":"KGlf","./LocalCookieFilter":"EVrK","./Interface":"Qw25","./Configuration":"duLQ","./RemoveCookies":"xR4A"}],"Focm":[function(require,module,exports) {
"use strict";

require("core-js/es6/symbol");

require("core-js/fn/symbol/iterator");

var _CookieConsent = _interopRequireDefault(require("./lib/CookieConsent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cookieConsent = new _CookieConsent.default();
window.CookieConsent = window.CookieConsent || {};
window.CookieConsent.init = cookieConsent.init;
},{"core-js/es6/symbol":"CtPZ","core-js/fn/symbol/iterator":"KQqW","./lib/CookieConsent":"ylkZ"}]},{},["Focm"], null)
//# sourceMappingURL=cookieconsent.js.map