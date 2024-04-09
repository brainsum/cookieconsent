/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/lib/Utilities.js
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
      //remove localStorage consentMode obj
      localStorage.removeItem('consentMode');
    }

    // Create an array of services from Cookieconsent global object
    // Filter based on category or leave empty is all is wanted
  }, {
    key: "listGlobalServices",
    value: function listGlobalServices(category) {
      var categories = [];

      // Global config objectnot set
      if (typeof window.CookieConsent === 'undefined') return categories;

      // Category is not specified or opposite
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

;// CONCATENATED MODULE: ./src/lib/Filter.js
function Filter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Filter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Filter_createClass(Constructor, protoProps, staticProps) { if (protoProps) Filter_defineProperties(Constructor.prototype, protoProps); if (staticProps) Filter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Filter = /*#__PURE__*/function () {
  function Filter() {
    Filter_classCallCheck(this, Filter);
  }
  Filter_createClass(Filter, [{
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
        var type = Utilities.objectType(services[service].search);
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

;// CONCATENATED MODULE: ./src/lib/InsertScriptFilter.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function InsertScriptFilter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function InsertScriptFilter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function InsertScriptFilter_createClass(Constructor, protoProps, staticProps) { if (protoProps) InsertScriptFilter_defineProperties(Constructor.prototype, protoProps); if (staticProps) InsertScriptFilter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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
    InsertScriptFilter_classCallCheck(this, InsertScriptFilter);
    return _super.call(this);
  }
  InsertScriptFilter_createClass(InsertScriptFilter, [{
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
          //console.log('Appending:', arguments);
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
          //console.log('Inserting:', arguments);
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
}(Filter);

;// CONCATENATED MODULE: ./src/lib/ScriptTagFilter.js
function ScriptTagFilter_typeof(obj) { "@babel/helpers - typeof"; return ScriptTagFilter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, ScriptTagFilter_typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ScriptTagFilter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ScriptTagFilter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function ScriptTagFilter_createClass(Constructor, protoProps, staticProps) { if (protoProps) ScriptTagFilter_defineProperties(Constructor.prototype, protoProps); if (staticProps) ScriptTagFilter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = ScriptTagFilter_getPrototypeOf(object); if (object === null) break; } return object; }
function ScriptTagFilter_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) ScriptTagFilter_setPrototypeOf(subClass, superClass); }
function ScriptTagFilter_setPrototypeOf(o, p) { ScriptTagFilter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ScriptTagFilter_setPrototypeOf(o, p); }
function ScriptTagFilter_createSuper(Derived) { var hasNativeReflectConstruct = ScriptTagFilter_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = ScriptTagFilter_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = ScriptTagFilter_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ScriptTagFilter_possibleConstructorReturn(this, result); }; }
function ScriptTagFilter_possibleConstructorReturn(self, call) { if (call && (ScriptTagFilter_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return ScriptTagFilter_assertThisInitialized(self); }
function ScriptTagFilter_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function ScriptTagFilter_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ScriptTagFilter_getPrototypeOf(o) { ScriptTagFilter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ScriptTagFilter_getPrototypeOf(o); }


var ScriptTagFilter = /*#__PURE__*/function (_Filter) {
  ScriptTagFilter_inherits(ScriptTagFilter, _Filter);
  var _super = ScriptTagFilter_createSuper(ScriptTagFilter);
  function ScriptTagFilter() {
    ScriptTagFilter_classCallCheck(this, ScriptTagFilter);
    return _super.call(this);
  }
  ScriptTagFilter_createClass(ScriptTagFilter, [{
    key: "init",
    value: function init() {
      this.filterTags();
    }
  }, {
    key: "filterTags",
    value: function filterTags() {
      var _this = this;
      Utilities.ready(function () {
        var blacklist = _get(ScriptTagFilter_getPrototypeOf(ScriptTagFilter.prototype), "createBlacklist", _this).call(_this, 'script-tag');
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
}(Filter);

;// CONCATENATED MODULE: ./src/lib/WrapperFilter.js
function WrapperFilter_typeof(obj) { "@babel/helpers - typeof"; return WrapperFilter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, WrapperFilter_typeof(obj); }
function WrapperFilter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function WrapperFilter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function WrapperFilter_createClass(Constructor, protoProps, staticProps) { if (protoProps) WrapperFilter_defineProperties(Constructor.prototype, protoProps); if (staticProps) WrapperFilter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function WrapperFilter_get() { if (typeof Reflect !== "undefined" && Reflect.get) { WrapperFilter_get = Reflect.get; } else { WrapperFilter_get = function _get(target, property, receiver) { var base = WrapperFilter_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return WrapperFilter_get.apply(this, arguments); }
function WrapperFilter_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = WrapperFilter_getPrototypeOf(object); if (object === null) break; } return object; }
function WrapperFilter_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) WrapperFilter_setPrototypeOf(subClass, superClass); }
function WrapperFilter_setPrototypeOf(o, p) { WrapperFilter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return WrapperFilter_setPrototypeOf(o, p); }
function WrapperFilter_createSuper(Derived) { var hasNativeReflectConstruct = WrapperFilter_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = WrapperFilter_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = WrapperFilter_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return WrapperFilter_possibleConstructorReturn(this, result); }; }
function WrapperFilter_possibleConstructorReturn(self, call) { if (call && (WrapperFilter_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return WrapperFilter_assertThisInitialized(self); }
function WrapperFilter_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function WrapperFilter_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function WrapperFilter_getPrototypeOf(o) { WrapperFilter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return WrapperFilter_getPrototypeOf(o); }

var WrapperFilter = /*#__PURE__*/function (_Filter) {
  WrapperFilter_inherits(WrapperFilter, _Filter);
  var _super = WrapperFilter_createSuper(WrapperFilter);
  function WrapperFilter() {
    WrapperFilter_classCallCheck(this, WrapperFilter);
    return _super.call(this);
  }
  WrapperFilter_createClass(WrapperFilter, [{
    key: "init",
    value: function init() {
      this.filterWrappers();
    }
  }, {
    key: "filterWrappers",
    value: function filterWrappers() {
      var blacklist = WrapperFilter_get(WrapperFilter_getPrototypeOf(WrapperFilter.prototype), "createBlacklist", this).call(this, 'wrapped');
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
}(Filter);

;// CONCATENATED MODULE: ./src/lib/LocalCookieFilter.js
function LocalCookieFilter_typeof(obj) { "@babel/helpers - typeof"; return LocalCookieFilter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, LocalCookieFilter_typeof(obj); }
function LocalCookieFilter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function LocalCookieFilter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function LocalCookieFilter_createClass(Constructor, protoProps, staticProps) { if (protoProps) LocalCookieFilter_defineProperties(Constructor.prototype, protoProps); if (staticProps) LocalCookieFilter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function LocalCookieFilter_get() { if (typeof Reflect !== "undefined" && Reflect.get) { LocalCookieFilter_get = Reflect.get; } else { LocalCookieFilter_get = function _get(target, property, receiver) { var base = LocalCookieFilter_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return LocalCookieFilter_get.apply(this, arguments); }
function LocalCookieFilter_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = LocalCookieFilter_getPrototypeOf(object); if (object === null) break; } return object; }
function LocalCookieFilter_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) LocalCookieFilter_setPrototypeOf(subClass, superClass); }
function LocalCookieFilter_setPrototypeOf(o, p) { LocalCookieFilter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return LocalCookieFilter_setPrototypeOf(o, p); }
function LocalCookieFilter_createSuper(Derived) { var hasNativeReflectConstruct = LocalCookieFilter_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = LocalCookieFilter_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = LocalCookieFilter_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return LocalCookieFilter_possibleConstructorReturn(this, result); }; }
function LocalCookieFilter_possibleConstructorReturn(self, call) { if (call && (LocalCookieFilter_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return LocalCookieFilter_assertThisInitialized(self); }
function LocalCookieFilter_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function LocalCookieFilter_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function LocalCookieFilter_getPrototypeOf(o) { LocalCookieFilter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return LocalCookieFilter_getPrototypeOf(o); }

var LocalCookieFilter = /*#__PURE__*/function (_Filter) {
  LocalCookieFilter_inherits(LocalCookieFilter, _Filter);
  var _super = LocalCookieFilter_createSuper(LocalCookieFilter);
  function LocalCookieFilter() {
    LocalCookieFilter_classCallCheck(this, LocalCookieFilter);
    return _super.call(this);
  }
  LocalCookieFilter_createClass(LocalCookieFilter, [{
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
      var blacklist = LocalCookieFilter_get(LocalCookieFilter_getPrototypeOf(LocalCookieFilter.prototype), "createBlacklist", this).call(this, 'localcookie');
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
}(Filter);

;// CONCATENATED MODULE: ./node_modules/redom/dist/redom.es.js
function parseQuery (query) {
  var chunks = query.split(/([#.])/);
  var tagName = '';
  var id = '';
  var classNames = [];

  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i];
    if (chunk === '#') {
      id = chunks[++i];
    } else if (chunk === '.') {
      classNames.push(chunks[++i]);
    } else if (chunk.length) {
      tagName = chunk;
    }
  }

  return {
    tag: tagName || 'div',
    id: id,
    className: classNames.join(' ')
  };
}

function createElement (query, ns) {
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
}

function unmount (parent, child) {
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
}

function doUnmount (child, childEl, parentEl) {
  var hooks = childEl.__redom_lifecycle;

  if (hooksAreEmpty(hooks)) {
    childEl.__redom_lifecycle = {};
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
}

function hooksAreEmpty (hooks) {
  if (hooks == null) {
    return true;
  }
  for (var key in hooks) {
    if (hooks[key]) {
      return false;
    }
  }
  return true;
}

/* global Node, ShadowRoot */

var hookNames = ['onmount', 'onremount', 'onunmount'];
var shadowRootAvailable = typeof window !== 'undefined' && 'ShadowRoot' in window;

function mount (parent, child, before, replace) {
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

  if (wasMounted && (oldParent !== parentEl)) {
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
}

function trigger (el, eventName) {
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
}

function doMount (child, childEl, parentEl, oldParent) {
  var hooks = childEl.__redom_lifecycle || (childEl.__redom_lifecycle = {});
  var remount = (parentEl === oldParent);
  var hooksFound = false;

  for (var i = 0, list = hookNames; i < list.length; i += 1) {
    var hookName = list[i];

    if (!remount) { // if already mounted, skip this phase
      if (child !== childEl) { // only Views can have lifecycle events
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
    childEl.__redom_lifecycle = {};
    return;
  }

  var traverse = parentEl;
  var triggered = false;

  if (remount || (traverse && traverse.__redom_mounted)) {
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
      if (traverse.nodeType === Node.DOCUMENT_NODE ||
        (shadowRootAvailable && (traverse instanceof ShadowRoot)) ||
        (parent && parent.__redom_mounted)
      ) {
        trigger(traverse, remount ? 'onremount' : 'onmount');
        triggered = true;
      }
      traverse = parent;
    }
  }
}

function setStyle (view, arg1, arg2) {
  var el = getEl(view);

  if (typeof arg1 === 'object') {
    for (var key in arg1) {
      setStyleValue(el, key, arg1[key]);
    }
  } else {
    setStyleValue(el, arg1, arg2);
  }
}

function setStyleValue (el, key, value) {
  if (value == null) {
    el.style[key] = '';
  } else {
    el.style[key] = value;
  }
}

/* global SVGElement */

var xlinkns = 'http://www.w3.org/1999/xlink';

function setAttr (view, arg1, arg2) {
  setAttrInternal(view, arg1, arg2);
}

function setAttrInternal (view, arg1, arg2, initial) {
  var el = getEl(view);

  var isObj = typeof arg1 === 'object';

  if (isObj) {
    for (var key in arg1) {
      setAttrInternal(el, key, arg1[key], initial);
    }
  } else {
    var isSVG = el instanceof SVGElement;
    var isFunc = typeof arg2 === 'function';

    if (arg1 === 'style' && typeof arg2 === 'object') {
      setStyle(el, arg2);
    } else if (isSVG && isFunc) {
      el[arg1] = arg2;
    } else if (arg1 === 'dataset') {
      setData(el, arg2);
    } else if (!isSVG && (arg1 in el || isFunc) && (arg1 !== 'list')) {
      el[arg1] = arg2;
    } else {
      if (isSVG && (arg1 === 'xlink')) {
        setXlink(el, arg2);
        return;
      }
      if (initial && arg1 === 'class') {
        arg2 = el.className + ' ' + arg2;
      }
      if (arg2 == null) {
        el.removeAttribute(arg1);
      } else {
        el.setAttribute(arg1, arg2);
      }
    }
  }
}

function setXlink (el, arg1, arg2) {
  if (typeof arg1 === 'object') {
    for (var key in arg1) {
      setXlink(el, key, arg1[key]);
    }
  } else {
    if (arg2 != null) {
      el.setAttributeNS(xlinkns, arg1, arg2);
    } else {
      el.removeAttributeNS(xlinkns, arg1, arg2);
    }
  }
}

function setData (el, arg1, arg2) {
  if (typeof arg1 === 'object') {
    for (var key in arg1) {
      setData(el, key, arg1[key]);
    }
  } else {
    if (arg2 != null) {
      el.dataset[arg1] = arg2;
    } else {
      delete el.dataset[arg1];
    }
  }
}

function redom_es_text (str) {
  return document.createTextNode((str != null) ? str : '');
}

function parseArgumentsInternal (element, args, initial) {
  for (var i = 0, list = args; i < list.length; i += 1) {
    var arg = list[i];

    if (arg !== 0 && !arg) {
      continue;
    }

    var type = typeof arg;

    if (type === 'function') {
      arg(element);
    } else if (type === 'string' || type === 'number') {
      element.appendChild(redom_es_text(arg));
    } else if (isNode(getEl(arg))) {
      mount(element, arg);
    } else if (arg.length) {
      parseArgumentsInternal(element, arg, initial);
    } else if (type === 'object') {
      setAttrInternal(element, arg, null, initial);
    }
  }
}

function ensureEl (parent) {
  return typeof parent === 'string' ? html(parent) : getEl(parent);
}

function getEl (parent) {
  return (parent.nodeType && parent) || (!parent.el && parent) || getEl(parent.el);
}

function isNode (arg) {
  return arg && arg.nodeType;
}

var htmlCache = {};

function html (query) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var element;

  var type = typeof query;

  if (type === 'string') {
    element = memoizeHTML(query).cloneNode(false);
  } else if (isNode(query)) {
    element = query.cloneNode(false);
  } else if (type === 'function') {
    var Query = query;
    element = new (Function.prototype.bind.apply( Query, [ null ].concat( args) ));
  } else {
    throw new Error('At least one argument required');
  }

  parseArgumentsInternal(getEl(element), args, true);

  return element;
}

var el = html;
var h = (/* unused pure expression or super */ null && (html));

html.extend = function extendHtml (query) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var clone = memoizeHTML(query);

  return html.bind.apply(html, [ this, clone ].concat( args ));
};

function memoizeHTML (query) {
  return htmlCache[query] || (htmlCache[query] = createElement(query));
}

function setChildren (parent) {
  var children = [], len = arguments.length - 1;
  while ( len-- > 0 ) children[ len ] = arguments[ len + 1 ];

  var parentEl = getEl(parent);
  var current = traverse(parent, children, parentEl.firstChild);

  while (current) {
    var next = current.nextSibling;

    unmount(parent, current);

    current = next;
  }
}

function traverse (parent, children, _current) {
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

function listPool (View, key, initData) {
  return new ListPool(View, key, initData);
}

var ListPool = function ListPool (View, key, initData) {
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

ListPool.prototype.update = function update (data, context) {
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
    var view = (void 0);

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

function propKey (key) {
  return function (item) {
    return item[key];
  };
}

function list (parent, View, key, initData) {
  return new List(parent, View, key, initData);
}

var List = function List (parent, View, key, initData) {
  this.View = View;
  this.initData = initData;
  this.views = [];
  this.pool = new ListPool(View, key, initData);
  this.el = ensureEl(parent);
  this.keySet = key != null;
};

List.prototype.update = function update (data, context) {
    if ( data === void 0 ) data = [];

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

List.extend = function extendList (parent, View, key, initData) {
  return List.bind(List, parent, View, key, initData);
};

list.extend = List.extend;

/* global Node */

function place (View, initData) {
  return new Place(View, initData);
}

var Place = function Place (View, initData) {
  this.el = redom_es_text('');
  this.visible = false;
  this.view = null;
  this._placeholder = this.el;

  if (View instanceof Node) {
    this._el = View;
  } else if (View.el instanceof Node) {
    this._el = View;
    this.view = View;
  } else {
    this._View = View;
  }

  this._initData = initData;
};

Place.prototype.update = function update (visible, data) {
  var placeholder = this._placeholder;
  var parentNode = this.el.parentNode;

  if (visible) {
    if (!this.visible) {
      if (this._el) {
        mount(parentNode, this._el, placeholder);
        unmount(parentNode, placeholder);

        this.el = getEl(this._el);
        this.visible = visible;
      } else {
        var View = this._View;
        var view = new View(this._initData);

        this.el = getEl(view);
        this.view = view;

        mount(parentNode, view, placeholder);
        unmount(parentNode, placeholder);
      }
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

/* global Node */

function router (parent, Views, initData) {
  return new Router(parent, Views, initData);
}

var Router = function Router (parent, Views, initData) {
  this.el = ensureEl(parent);
  this.Views = Views;
  this.initData = initData;
};

Router.prototype.update = function update (route, data) {
  if (route !== this.route) {
    var Views = this.Views;
    var View = Views[route];

    this.route = route;

    if (View && (View instanceof Node || View.el instanceof Node)) {
      this.view = View;
    } else {
      this.view = View && new View(this.initData, data);
    }

    setChildren(this.el, [this.view]);
  }
  this.view && this.view.update && this.view.update(data, route);
};

var ns = 'http://www.w3.org/2000/svg';

var svgCache = {};

function svg (query) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var element;

  var type = typeof query;

  if (type === 'string') {
    element = memoizeSVG(query).cloneNode(false);
  } else if (isNode(query)) {
    element = query.cloneNode(false);
  } else if (type === 'function') {
    var Query = query;
    element = new (Function.prototype.bind.apply( Query, [ null ].concat( args) ));
  } else {
    throw new Error('At least one argument required');
  }

  parseArgumentsInternal(getEl(element), args, true);

  return element;
}

var s = (/* unused pure expression or super */ null && (svg));

svg.extend = function extendSvg (query) {
  var clone = memoizeSVG(query);

  return svg.bind(this, clone);
};

svg.ns = ns;

function memoizeSVG (query) {
  return svgCache[query] || (svgCache[query] = createElement(query, ns));
}



;// CONCATENATED MODULE: ./src/lib/Language.js
function Language_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Language_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Language_createClass(Constructor, protoProps, staticProps) { if (protoProps) Language_defineProperties(Constructor.prototype, protoProps); if (staticProps) Language_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Language = /*#__PURE__*/function () {
  function Language() {
    Language_classCallCheck(this, Language);
  }
  Language_createClass(Language, [{
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

;// CONCATENATED MODULE: ./src/lib/Interface.js
function Interface_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Interface_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function Interface_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Interface_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Interface_arrayLikeToArray(o, minLen); }
function Interface_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function Interface_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Interface_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Interface_createClass(Constructor, protoProps, staticProps) { if (protoProps) Interface_defineProperties(Constructor.prototype, protoProps); if (staticProps) Interface_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Interface = /*#__PURE__*/function () {
  function Interface() {
    Interface_classCallCheck(this, Interface);
    this.elements = {};
  }
  Interface_createClass(Interface, [{
    key: "buildStyle",
    value: function buildStyle() {
      return el('style', '#cconsent-bar, #cconsent-bar * { box-sizing:border-box }', '#cconsent-bar .visually-hide, #cconsent-modal .visually-hide { position: absolute !important; overflow: hidden !important; clip: rect(1px 1px 1px 1px) !important; clip: rect(1px, 1px, 1px, 1px) !important;width: 1px !important; height: 1px !important; }', '#cconsent-bar { background-color:' + window.CookieConsent.config.theme.barColor + '; color:' + window.CookieConsent.config.theme.barTextColor + '; padding:15px; text-align:right; font-family:sans-serif; font-size:14px; line-height:18px; position:fixed; bottom:0; left:0; width:100%; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}', '#cconsent-bar.ccb--hidden {transform: translateY(100%); display:block; visible:hidden;}', '#cconsent-bar .ccb__wrapper { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}', '#cconsent-bar .ccb__left { align-self:center; text-align:left; margin: 15px 0;}', '#cconsent-bar .ccb__right { align-self:center; white-space: nowrap;}', '#cconsent-bar .ccb__right > div {display:inline-block; color:#FFF;}', '#cconsent-bar button { line-height:normal; font-size:14px; border:0; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}', '#cconsent-bar button.consent-give { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}', '#cconsent-bar button.consent-decline { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; margin-right: 10px; border: 1px solid ' + window.CookieConsent.config.theme.barMainButtonColor + '}', '#cconsent-bar button.ccb__edit { -moz-appearance:none; -webkit-appearance:none; appearance:none; margin-right:15px; border:0; padding:0; text-decoration:underline; color:' + window.CookieConsent.config.theme.barTextColor + '; background:none; }', '#cconsent-bar a:hover, #cconsent-bar button:hover { cursor:pointer; }', '#cconsent-modal { display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}', '@media (max-width: 600px) { #cconsent-modal { height: 100% } }', '#cconsent-modal button { border: 0 }', '#cconsent-modal h2, #cconsent-modal h3 {color:#333}', '#cconsent-modal.ccm--visible {display:flex}', '#cconsent-modal .ccm__content { max-width:600px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; display:flex; flex-direction:column; justify-content:space-between; }', '@media (max-width: 600px) { #cconsent-modal .ccm__content { max-width:100vw; height:100%; max-height:initial; }}', '#cconsent-modal .ccm__content > .ccm__content__heading { border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative; }', '#cconsent-modal .ccm__content > .ccm__content__heading h2 { font-size:21px; font-weight:600; color:#333; margin:0 }', '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close { -moz-appearance:none; -webkit-appearance:none; appearance:none; padding:0; border:0; font-weight:600; color:#888; cursor:pointer; font-size:26px; position:absolute; right:15px; top:15px; width:26px; height:26px; background:none; text-align:center; }', '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close:focus-visible { box-shadow: 0 0 0 0.25rem ' + window.CookieConsent.config.theme.focusColor + '; }', '#cconsent-modal h2, #cconsent-modal h3 { margin-top:0 }', '#cconsent-modal .ccm__content > .ccm__content__body { background-color:#FFF; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup { margin:0; border-bottom: 1px solid #D8D8D8; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {color:#333; font-weight:600; cursor:pointer; position:relative; padding:0; margin:0; transition: background-color .5s ease-out; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head:hover { background-color:#F9F9F9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status { order: 1; position:absolute; left:35px; font-weight: 600; display:inline-block; margin-right: 20px; pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--checked { font-size:1em; color:#28a834; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--unchecked { font-size:1.4em; color:#e56385; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__text { order: 2; pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge { transition: transform .3s ease-out; transform-origin: center; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%); order: 3;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge > svg { pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head .ccm__tab-head__icon-wedge { transform:translateY(-50%) rotate(-180deg) }', '#cconsent-modal .ccm__tab-trigger { appearance: none; background: none; display: flex; flex-direction: row; width: 100%; padding:17px 35px 17px 56px; color:#333; font-weight:600; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content {padding:0; margin:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content { max-height: 0; overflow: hidden; opacity: 0; transition: all .5s ease-out; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content__inner { display: flex; flex-direction: row; padding:25px 35px; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head { background-color:#f9f9f9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content { max-height: 900px; opacity: 1; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose {order:1;}', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {flex-direction:column} }', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose { margin-bottom:20px; } }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-component {display:flex; margin-right:35px; align-items:center;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__status {font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group {background:none; width:40px; height:20px; margin:0 10px; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s; pointer-events: none;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider:before {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider {background-color: #28A834;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group:focus-visible {box-shadow: 0 0 0 2px' + window.CookieConsent.config.theme.focusColor + ';}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider:before {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__desc {order:2;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content h3 {font-size:18px; margin-bottom:10px; line-height:1;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content p {color:#444; margin-bottom:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list:not(:empty) {margin-top:30px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list .ccm__list__title {color:#333; font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list ul { margin:15px 0; padding-left:15px }', '#cconsent-modal .ccm__footer { padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }', '#cconsent-modal .ccm__footer button { line-height:normal; font-size:14px; transition: background-color .5s ease-out; background-color:' + window.CookieConsent.config.theme.modalMainButtonColor + '; color:' + window.CookieConsent.config.theme.modalMainButtonTextColor + '; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; }', '#cconsent-modal .ccm__footer button:hover { background-color:' + Utilities.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20) + '; }', '#cconsent-modal .ccm__footer button + button { margin-left: 10px; }');
    }
  }, {
    key: "buildBar",
    value: function buildBar() {
      return el('div#cconsent-bar.ccb--hidden', el("div.ccb__wrapper", el('div.ccb__left', el('div.cc-text', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))), el('div.ccb__right', el('div.ccb__button', el('button.ccb__edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting'), {
        'aria-hidden': 'true',
        tabindex: '-1'
      }), window.CookieConsent.config.showRejectAllButton && el('button.consent-decline', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnRejectAll'), {
        'aria-hidden': 'true',
        tabindex: '-1'
      }), el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnAcceptAll'), {
        'aria-hidden': 'true',
        tabindex: '-1'
      })))), {
        role: 'region',
        'aria-label': Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'cookieBarLabel'),
        'aria-hidden': 'true',
        tabindex: '-1'
      });
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
            listItems.push(el('li', Language.getTranslation(list[item], window.CookieConsent.config.language.current, 'name')));
          }
          return [el('div.ccm__list', el('span.ccm__list__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalAffectedSolutions')), el('ul', listItems))];
        }
      };
      function modalTabGroups() {
        var contentItems = [];
        var i = 0;
        for (var key in window.CookieConsent.config.categories) {
          var tabId = Math.random().toString(16).slice(2);
          contentItems.push(el('dl.ccm__tabgroup' + '.' + key + (window.CookieConsent.config.categories[key].checked ? '.checked-5jhk' : ''), {
            'data-category': key
          }, el('dt.ccm__tab-head', el('button#ccm__tab-trigger--' + tabId + '.ccm__tab-trigger', el('span.ccm__tab-head__text', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')), el('span.ccm__tab-head__status' + (window.CookieConsent.config.categories[key].checked ? '.ccm__tab-head__status--checked' : '.ccm__tab-head__status--unchecked'), window.CookieConsent.config.categories[key].checked ? '✔' : '×', {
            'aria-label': window.CookieConsent.config.categories[key].checked ? Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'checked') : Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'unchecked')
          }), el('span.ccm__tab-head__icon-wedge', el(document.createElementNS("http://www.w3.org/2000/svg", "svg"), {
            version: "1.2",
            preserveAspectRatio: "none",
            viewBox: "0 0 24 24",
            class: "icon-wedge-svg",
            "data-id": "e9b3c566e8c14cfea38af128759b91a3",
            style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"
          }, el(document.createElementNS("http://www.w3.org/2000/svg", "path"), {
            'xmlns:default': "http://www.w3.org/2000/svg",
            class: "icon-wedge-angle-down",
            d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z",
            style: "fill: rgb(51, 51, 51);"
          }))), {
            'aria-expanded': 'false',
            'aria-controls': 'ccm__tab-content--' + tabId
          })), el('dd#ccm__tab-content--' + tabId + '.ccm__tab-content', el('div.ccm__tab-content__inner', el('div.ccm__tab-content__desc', el('h3#ccm__tab-content__title--' + tabId, Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')), el('p', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')), el('div.ccm__list', listCookies(key))), el('div.ccm__tab-content__choose', !window.CookieConsent.config.categories[key].needed && el('div.ccm__switch-component', el('span.ccm__switch__status.status-off', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')), el('button.ccm__switch-group', el('span.ccm__switch__text.visually-hide', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')), el('span.ccm__switch__slider'), {
            'role': 'switch',
            'data-category': key,
            'aria-checked': window.CookieConsent.config.categories[key].checked,
            'aria-label': Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')
          }), el('span.ccm__switch__status.status-on', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'on'))))), {
            'role': 'region',
            'aria-labelledby': 'ccm__tab-trigger--' + tabId,
            'aria-hidden': 'true'
          })));
          i++;
        }
        return contentItems;
      }
      return el('dialog#cconsent-modal', el('div.ccm__content', el('div.ccm__content__heading', el('h2#ccm__content__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')), el('p', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'), window.CookieConsent.config.modalMainTextMoreLink ? el('a', {
        href: window.CookieConsent.config.modalMainTextMoreLink,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'learnMore')) : null), el('button.ccm__cheading__close', '×', {
        'aria-label': Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'closeAriaLabel')
      })), el('div.ccm__content__body', el('div.ccm__tabs', modalTabGroups())), el('div.ccm__footer', el('button#ccm__footer__consent-modal-submit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')), window.CookieConsent.config.showRejectAllButton && el('button.consent-decline', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnRejectAll')), el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll')))), {
        'aria-labelledby': 'ccm__content__title',
        'aria-hidden': 'true'
      });
    }
  }, {
    key: "buildInitialModal",
    value: function buildInitialModal() {
      return el('dialog#cconsent-modal', el('div.ccm__content', el('div.ccm__content__heading', el('h2#ccm__content__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')), el('p', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'), window.CookieConsent.config.modalMainTextMoreLink ? el('a', {
        href: window.CookieConsent.config.modalMainTextMoreLink,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'learnMore')) : null)), el('div.ccm__footer', el('button.consent-decline', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'initModalBtnDisagree')), el('button.ccm__edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'initModalBtnOptions')), el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'initModalBtnAgree')))), {
        'aria-labelledby': 'ccm__content__title',
        'aria-hidden': 'true'
      });
    }
  }, {
    key: "modalRedrawIcons",
    value: function modalRedrawIcons() {
      var tabGroups = this.elements['modal'].querySelectorAll('.ccm__tabgroup');
      var _iterator = Interface_createForOfIteratorHelper(tabGroups),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tabGroup = _step.value;
          var lightSwitch = tabGroup.querySelector('button.ccm__switch-group');
          var tabStatus = tabGroup.querySelector('.ccm__tab-head__status');
          if (window.CookieConsent.config.categories[tabGroup.dataset.category].checked) {
            if (!tabGroup.classList.contains('checked-5jhk')) {
              tabGroup.classList.add('checked-5jhk');
              lightSwitch.setAttribute('aria-checked', 'true');
              tabStatus.classList.remove('ccm__tab-head__status--unchecked');
              tabStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'checked'));
              tabStatus.textContent = '✔';
              tabStatus.classList.add('ccm__tab-head__status--checked');
            }
            ;
          } else {
            if (tabGroup.classList.contains('checked-5jhk')) tabGroup.classList.remove('checked-5jhk');
            lightSwitch.setAttribute('aria-checked', 'false');
            tabStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'unchecked'));
            tabStatus.textContent = '×';
            tabStatus.classList.add('ccm__tab-head__status--unchecked');
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
        var insertedElem = mount(document.body, elem, document.body.firstChild);
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
      Utilities.ready(function () {
        if (window.CookieConsent.config.noUI) {
          that.writeBufferToDOM();
          that.buildCookie(function (cookie) {
            that.setCookie(cookie);
          });
          callback();
          return;
        }
        that.render('style', that.buildStyle());

        //show the bar only if layout mode is 'bar'
        if (window.CookieConsent.config.mode == 'bar') {
          that.render('bar', that.buildBar(), function (bar) {
            // Show the bar after a while
            if (!window.CookieConsent.config.cookieExists) {
              setTimeout(function () {
                var _ref, _ref2;
                var buttonSettings = bar.querySelector('.ccb__edit');
                var buttonConsentGive = bar.querySelector('.consent-give');
                var buttonConsentDecline = bar.querySelector('.consent-decline');
                bar.classList.remove('ccb--hidden');
                bar.setAttribute('aria-hidden', 'false');
                bar.setAttribute('tabindex', '0');
                buttonSettings.setAttribute('tabindex', '0');
                buttonSettings.setAttribute('aria-hidden', 'false');
                buttonConsentGive.setAttribute('tabindex', '0');
                buttonConsentGive.setAttribute('aria-hidden', 'false');
                (_ref = buttonConsentDecline !== null) !== null && _ref !== void 0 ? _ref : buttonConsentDecline.setAttribute('tabindex', '0');
                (_ref2 = buttonConsentDecline !== null) !== null && _ref2 !== void 0 ? _ref2 : buttonConsentDecline.setAttribute('aria-hidden', 'false');
              }, window.CookieConsent.config.UITimeout);
            }
          });
        }
        that.render('modal', that.buildModal());

        //show init modal if layout mode is 'modal'
        if (window.CookieConsent.config.mode == 'modal') {
          that.render('modalInit', that.buildInitialModal(), function (modal) {
            if (!window.CookieConsent.config.cookieExists) {
              setTimeout(function () {
                modal.classList.add('ccm--visible');
                modal.setAttribute('aria-hidden', 'false');
                modal.setAttribute('tabindex', '0');
                modal.querySelector('.ccm__footer').style.justifyContent = 'center';
              }, window.CookieConsent.config.UITimeout);
            }
          });
        }
        callback();
      });
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(elements) {
      var _this = this;
      // Set the default state for modal
      var modalOpen = false;
      var focusTarget = document.querySelector('body');

      // If you click Accept all cookies
      var buttonConsentGive = document.querySelectorAll('.consent-give');
      var _iterator2 = Interface_createForOfIteratorHelper(buttonConsentGive),
        _step2;
      try {
        var _loop = function _loop() {
          var button = _step2.value;
          button.addEventListener('click', function () {
            var _this$elements$bar4, _this$elements$bar5, _this$elements$bar6, _this$elements$modalI13, _this$elements$modalI14, _this$elements$modalI15, _ref5, _ref6;
            var buttonSettings = document.querySelector('.ccb__edit');
            var buttonConsentDecline = document.querySelector('.consent-decline');

            // We set config to full consent
            for (var key in window.CookieConsent.config.categories) {
              window.CookieConsent.config.categories[key].wanted = window.CookieConsent.config.categories[key].checked = true;
            }
            _this.writeBufferToDOM();
            _this.buildCookie(function (cookie) {
              _this.setCookie(cookie);
            });
            (_this$elements$bar4 = _this.elements['bar']) === null || _this$elements$bar4 === void 0 ? void 0 : _this$elements$bar4.classList.add('ccb--hidden');
            (_this$elements$bar5 = _this.elements['bar']) === null || _this$elements$bar5 === void 0 ? void 0 : _this$elements$bar5.setAttribute('aria-hidden', 'true');
            (_this$elements$bar6 = _this.elements['bar']) === null || _this$elements$bar6 === void 0 ? void 0 : _this$elements$bar6.setAttribute('tabindex', '-1');
            _this.elements['modal'].classList.remove('ccm--visible');
            _this.elements['modal'].setAttribute('aria-hidden', 'true');
            _this.elements['modal'].setAttribute('tabindex', '-1');
            (_this$elements$modalI13 = _this.elements['modalInit']) === null || _this$elements$modalI13 === void 0 ? void 0 : _this$elements$modalI13.classList.remove('ccm--visible');
            (_this$elements$modalI14 = _this.elements['modalInit']) === null || _this$elements$modalI14 === void 0 ? void 0 : _this$elements$modalI14.setAttribute('aria-hidden', 'true');
            (_this$elements$modalI15 = _this.elements['modalInit']) === null || _this$elements$modalI15 === void 0 ? void 0 : _this$elements$modalI15.setAttribute('tabindex', '-1');
            button.setAttribute('tabindex', '-1');
            button.setAttribute('aria-hidden', 'true');
            buttonSettings.setAttribute('tabindex', '-1');
            buttonSettings.setAttribute('aria-hidden', 'true');
            (_ref5 = buttonConsentDecline !== null) !== null && _ref5 !== void 0 ? _ref5 : buttonConsentDecline.setAttribute('tabindex', '-1');
            (_ref6 = buttonConsentDecline !== null) !== null && _ref6 !== void 0 ? _ref6 : buttonConsentDecline.setAttribute('aria-hidden', 'true');
            focusTarget.focus();
            modalOpen = false;
            _this.modalRedrawIcons();
          });
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }

        // If you click Reject all cookies
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var buttonConsentDecline = document.querySelectorAll('.consent-decline');
      var _iterator3 = Interface_createForOfIteratorHelper(buttonConsentDecline),
        _step3;
      try {
        var _loop2 = function _loop2() {
          var button = _step3.value;
          button.addEventListener('click', function () {
            var _this$elements$bar7, _this$elements$bar8, _this$elements$bar9, _this$elements$modalI16, _this$elements$modalI17, _this$elements$modalI18;
            var buttonSettings = document.querySelector('.ccb__edit');
            var buttonConsentGive = document.querySelector('.consent-give');

            // We set config to full consent only in is needed
            for (var key in window.CookieConsent.config.categories) {
              window.CookieConsent.config.categories[key].wanted = window.CookieConsent.config.categories[key].checked = window.CookieConsent.config.categories[key].needed;
            }
            _this.writeBufferToDOM();
            _this.buildCookie(function (cookie) {
              _this.setCookie(cookie);
            });
            (_this$elements$bar7 = _this.elements['bar']) === null || _this$elements$bar7 === void 0 ? void 0 : _this$elements$bar7.classList.add('ccb--hidden');
            (_this$elements$bar8 = _this.elements['bar']) === null || _this$elements$bar8 === void 0 ? void 0 : _this$elements$bar8.setAttribute('aria-hidden', 'true');
            (_this$elements$bar9 = _this.elements['bar']) === null || _this$elements$bar9 === void 0 ? void 0 : _this$elements$bar9.setAttribute('tabindex', '-1');
            _this.elements['modal'].classList.remove('ccm--visible');
            _this.elements['modal'].setAttribute('aria-hidden', 'true');
            _this.elements['modal'].setAttribute('tabindex', '-1');
            (_this$elements$modalI16 = _this.elements['modalInit']) === null || _this$elements$modalI16 === void 0 ? void 0 : _this$elements$modalI16.classList.remove('ccm--visible');
            (_this$elements$modalI17 = _this.elements['modalInit']) === null || _this$elements$modalI17 === void 0 ? void 0 : _this$elements$modalI17.setAttribute('aria-hidden', 'true');
            (_this$elements$modalI18 = _this.elements['modalInit']) === null || _this$elements$modalI18 === void 0 ? void 0 : _this$elements$modalI18.setAttribute('tabindex', '-1');
            button.setAttribute('tabindex', '-1');
            button.setAttribute('aria-hidden', 'true');
            buttonSettings.setAttribute('tabindex', '-1');
            buttonSettings.setAttribute('aria-hidden', 'true');
            buttonConsentGive.setAttribute('tabindex', '-1');
            buttonConsentGive.setAttribute('aria-hidden', 'true');
            focusTarget.focus();
            modalOpen = false;
            _this.modalRedrawIcons();
          });
        };
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          _loop2();
        }

        // If you click Cookie settings and open settings modal
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      Array.prototype.forEach.call(document.querySelectorAll('.ccm__edit, .ccb__edit'), function (edit) {
        edit.addEventListener('click', function () {
          var _this$elements$modalI, _this$elements$modalI2, _this$elements$modalI3;
          modalOpen = true;
          _this.elements['modal'].classList.add('ccm--visible');
          _this.elements['modal'].setAttribute('aria-hidden', 'false');
          _this.elements['modal'].setAttribute('tabindex', '0');
          _this.elements['modal'].querySelector('.ccm__cheading__close').focus();
          (_this$elements$modalI = _this.elements['modalInit']) === null || _this$elements$modalI === void 0 ? void 0 : _this$elements$modalI.classList.remove('ccm--visible');
          (_this$elements$modalI2 = _this.elements['modalInit']) === null || _this$elements$modalI2 === void 0 ? void 0 : _this$elements$modalI2.setAttribute('aria-hidden', 'true');
          (_this$elements$modalI3 = _this.elements['modalInit']) === null || _this$elements$modalI3 === void 0 ? void 0 : _this$elements$modalI3.setAttribute('tabindex', '-1');
        });
      });

      // If you click trough the tabs on Cookie settings
      // If you click on/off switch
      this.elements['modal'].querySelector('.ccm__tabs').addEventListener('click', function (event) {
        // If you click trough the tabs on Cookie settings
        if (event.target.classList.contains('ccm__tab-trigger') || event.target.classList.contains('ccm__tab-head__icon-wedge')) {
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
            event.target.setAttribute('aria-expanded', 'false');
            parentDl.querySelector('.ccm__tab-content').setAttribute('aria-hidden', 'true');
          } else {
            parentDl.classList.add('ccm__tabgroup--open');
            event.target.setAttribute('aria-expanded', 'true');
            parentDl.querySelector('.ccm__tab-content').setAttribute('aria-hidden', 'false');
          }
        }

        // If you click on/off switch
        if (event.target.classList.contains('ccm__switch-group')) {
          var status = event.target.getAttribute('aria-checked');
          var label = event.target.textContent.trim();
          var dl = document.querySelector('.ccm__tabgroup.' + event.target.dataset.category);
          var dlStatus = document.querySelector('.ccm__tabgroup.' + event.target.dataset.category + ' .ccm__tab-head__status');
          window.CookieConsent.config.categories[event.target.dataset.category].wanted = window.CookieConsent.config.categories[event.target.dataset.category].checked = status === 'true' ? false : true;
          event.target.setAttribute('aria-checked', status !== 'true');
          dl.classList.remove('checked-5jhk');
          dlStatus.classList.remove('ccm__tab-head__status--checked');
          dlStatus.classList.remove('ccm__tab-head__status--unchecked');
          if (status !== 'true') {
            event.target.setAttribute('aria-label', label + ' ' + Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'enabled'));
            dl.classList.add('checked-5jhk');
            dlStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'checked'));
            dlStatus.textContent = '✔';
            dlStatus.classList.add('ccm__tab-head__status--checked');
          } else {
            event.target.setAttribute('aria-label', label + ' ' + Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'disabled'));
            dl.classList.remove('checked-5jhk');
            dlStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'unchecked'));
            dlStatus.textContent = '×';
            dlStatus.classList.add('ccm__tab-head__status--unchecked');
          }
        }
      });

      // If you click close on open modal
      this.elements['modal'].querySelector('.ccm__cheading__close').addEventListener('click', function (event) {
        var _this$elements$modalI4, _this$elements$modalI5, _this$elements$modalI6;
        _this.elements['modal'].classList.remove('ccm--visible');
        _this.elements['modal'].setAttribute('aria-hidden', 'true');
        _this.elements['modal'].setAttribute('tabindex', '-1');
        (_this$elements$modalI4 = _this.elements['modalInit']) === null || _this$elements$modalI4 === void 0 ? void 0 : _this$elements$modalI4.classList.add('ccm--visible');
        (_this$elements$modalI5 = _this.elements['modalInit']) === null || _this$elements$modalI5 === void 0 ? void 0 : _this$elements$modalI5.setAttribute('aria-hidden', 'false');
        (_this$elements$modalI6 = _this.elements['modalInit']) === null || _this$elements$modalI6 === void 0 ? void 0 : _this$elements$modalI6.setAttribute('tabindex', '0');
        modalOpen = false;
      });
      document.addEventListener('keydown', function (event) {
        if (modalOpen && (!event.keyCode || event.keyCode === 27)) {
          var _this$elements$modalI7, _this$elements$modalI8, _this$elements$modalI9;
          _this.elements['modal'].classList.remove('ccm--visible');
          _this.elements['modal'].setAttribute('aria-hidden', 'true');
          _this.elements['modal'].setAttribute('tabindex', '-1');
          (_this$elements$modalI7 = _this.elements['modalInit']) === null || _this$elements$modalI7 === void 0 ? void 0 : _this$elements$modalI7.classList.add('ccm--visible');
          (_this$elements$modalI8 = _this.elements['modalInit']) === null || _this$elements$modalI8 === void 0 ? void 0 : _this$elements$modalI8.setAttribute('aria-hidden', 'false');
          (_this$elements$modalI9 = _this.elements['modalInit']) === null || _this$elements$modalI9 === void 0 ? void 0 : _this$elements$modalI9.setAttribute('tabindex', '0');
          modalOpen = false;
        }
      });

      // If you click submit on cookie settings
      document.getElementById('ccm__footer__consent-modal-submit').addEventListener('click', function () {
        var switchElements = _this.elements['modal'].querySelectorAll('.ccm__switch input');
        Array.prototype.forEach.call(switchElements, function (switchElement) {
          window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
        });
        var buttonSettings = document.querySelector('.ccb__edit');
        var buttonConsentGive = document.querySelector('.consent-give');
        var buttonConsentDecline = document.querySelector('.consent-decline');
        _this.buildCookie(function (cookie) {
          _this.setCookie(cookie, function () {
            var _this$elements$modalI10, _this$elements$modalI11, _this$elements$modalI12, _this$elements$bar, _this$elements$bar2, _this$elements$bar3, _ref3, _ref4;
            _this.elements['modal'].classList.remove('ccm--visible');
            _this.elements['modal'].setAttribute('aria-hidden', 'true');
            _this.elements['modal'].setAttribute('tabindex', '-1');
            (_this$elements$modalI10 = _this.elements['modalInit']) === null || _this$elements$modalI10 === void 0 ? void 0 : _this$elements$modalI10.classList.remove('ccm--visible');
            (_this$elements$modalI11 = _this.elements['modalInit']) === null || _this$elements$modalI11 === void 0 ? void 0 : _this$elements$modalI11.setAttribute('aria-hidden', 'true');
            (_this$elements$modalI12 = _this.elements['modalInit']) === null || _this$elements$modalI12 === void 0 ? void 0 : _this$elements$modalI12.setAttribute('tabindex', '-1');
            (_this$elements$bar = _this.elements['bar']) === null || _this$elements$bar === void 0 ? void 0 : _this$elements$bar.classList.add('ccb--hidden');
            (_this$elements$bar2 = _this.elements['bar']) === null || _this$elements$bar2 === void 0 ? void 0 : _this$elements$bar2.setAttribute('aria-hidden', 'true');
            (_this$elements$bar3 = _this.elements['bar']) === null || _this$elements$bar3 === void 0 ? void 0 : _this$elements$bar3.setAttribute('tabindex', '-1');
            buttonSettings.setAttribute('tabindex', '-1');
            buttonSettings.setAttribute('aria-hidden', 'true');
            buttonConsentGive.setAttribute('tabindex', '-1');
            buttonConsentGive.setAttribute('aria-hidden', 'true');
            (_ref3 = buttonConsentDecline !== null) !== null && _ref3 !== void 0 ? _ref3 : buttonConsentDecline.setAttribute('tabindex', '-1');
            (_ref4 = buttonConsentDecline !== null) !== null && _ref4 !== void 0 ? _ref4 : buttonConsentDecline.setAttribute('aria-hidden', 'true');
            focusTarget.focus();
            modalOpen = false;
          });
        });
        _this.writeBufferToDOM();
      });
    }
  }, {
    key: "writeBufferToDOM",
    value: function writeBufferToDOM() {
      var _iterator4 = Interface_createForOfIteratorHelper(window.CookieConsent.buffer.appendChild),
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
      var _iterator5 = Interface_createForOfIteratorHelper(window.CookieConsent.buffer.insertBefore),
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
    key: "updateConsentMode",
    value: function updateConsentMode(cookie) {
      var isGTMEnabled = window.dataLayer || false;
      if (isGTMEnabled) {
        var gtag = function gtag() {
          dataLayer.push(arguments);
        };
        gtag('consent', 'update', cookie.consentMode);
        localStorage.setItem('consentMode', JSON.stringify(cookie.consentMode));
      }
    }
  }, {
    key: "buildCookie",
    value: function buildCookie(callback) {
      var cookie = {
        version: window.CookieConsent.config.cookieVersion,
        categories: {},
        services: [],
        consentMode: {}
      };
      for (var key in window.CookieConsent.config.categories) {
        cookie.categories[key] = {
          wanted: window.CookieConsent.config.categories[key].wanted
        };
      }
      for (var _key in window.CookieConsent.config.consentModeControls) {
        var _window$CookieConsent;
        cookie.consentMode[_key] = (_window$CookieConsent = window.CookieConsent.config.categories[window.CookieConsent.config.consentModeControls[_key]]) !== null && _window$CookieConsent !== void 0 && _window$CookieConsent.wanted ? 'granted' : 'denied';
      }
      cookie.services = Utilities.listGlobalServices();
      this.updateConsentMode(cookie);
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

;// CONCATENATED MODULE: ./src/lib/Configuration.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Configuration_typeof(obj) { "@babel/helpers - typeof"; return Configuration_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Configuration_typeof(obj); }
function Configuration_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Configuration_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Configuration_createClass(Constructor, protoProps, staticProps) { if (protoProps) Configuration_defineProperties(Constructor.prototype, protoProps); if (staticProps) Configuration_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Configuration = /*#__PURE__*/function () {
  function Configuration(configObject) {
    Configuration_classCallCheck(this, Configuration);
    window.CookieConsent.buffer = {
      appendChild: [],
      insertBefore: []
    };

    // Wrapper filter function
    window.CookieConsent.wrapper = function () {};

    // Settings injector for users
    window.CookieConsent.setConfiguration = this.setConfiguration.bind(this);
    window.CookieConsent.config = {
      active: true,
      cookieExists: false,
      cookieVersion: 1,
      mode: 'bar',
      modalMainTextMoreLink: null,
      showRejectAllButton: false,
      UITimeout: 1000,
      noUI: false,
      theme: {
        barColor: '#2b7abb',
        barTextColor: '#fff',
        barMainButtonColor: '#fff',
        barMainButtonTextColor: '#2b7abb',
        modalMainButtonColor: '#1e6ef4',
        modalMainButtonTextColor: '#fff',
        focusColor: 'rgb(40 168 52 / 75%)'
      },
      language: {
        current: 'en',
        locale: {
          en: {
            cookieBarLabel: 'Cookie consent',
            barMainText: 'This website uses cookies to ensure you get the best experience on our website.',
            closeAriaLabel: 'close',
            barLinkSetting: 'Cookie Settings',
            barBtnAcceptAll: 'Accept all cookies',
            barBtnRejectAll: 'Reject all cookies',
            modalMainTitle: 'Cookie settings',
            modalMainText: 'Cookies are small piece of data sent from a website and stored on the user\'s computer by the user\'s web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user\'s browsing activity.',
            modalBtnSave: 'Save current settings',
            modalBtnAcceptAll: 'Accept all cookies and close',
            modalBtnRejectAll: 'Reject all cookies and close',
            initModalBtnAgree: 'I agree',
            initModalBtnDisagree: 'I do not agree',
            initModalBtnOptions: 'Manage options',
            modalAffectedSolutions: 'Affected solutions:',
            learnMore: 'Learn More',
            on: 'On',
            off: 'Off',
            enabled: 'is enabled.',
            disabled: 'is disabled.',
            checked: 'checked',
            unchecked: 'unchecked'
          },
          hu: {
            cookieBarLabel: 'Hozzájárulás sütik engedélyzéséhez',
            barMainText: 'Ez a weboldal Sütiket használ a jobb felhasználói élmény érdekében.',
            closeAriaLabel: 'bezár',
            barLinkSetting: 'Süti beállítások',
            barBtnAcceptAll: 'Minden süti elfogadása',
            barBtnRejectAll: 'Minden süti elutasítása',
            modalMainTitle: 'Süti beállítások',
            modalMainText: 'A HTTP-süti (általában egyszerűen süti, illetve angolul cookie) egy információcsomag, amelyet a szerver küld a webböngészőnek, majd a böngésző visszaküld a szervernek minden, a szerver felé irányított kérés alkalmával. Amikor egy weboldalt kérünk le a szervertől, akkor a böngésző elküldi a számára elérhető sütiket. A süti-ket úgy tervezték, hogy megbízható mechanizmust biztosítsanak a webhelyek számára az információk megőrzésére vagy a felhasználók böngészési tevékenységének rögzítésére.',
            modalBtnSave: 'Beállítások mentése',
            modalBtnAcceptAll: 'Minden Süti elfogadása',
            modalBtnRejectAll: 'Minden süti elutasítása',
            initModalBtnAgree: 'Egyetértek',
            initModalBtnDisagree: 'Nem értek egyet',
            initModalBtnOptions: 'Beállítások kezelése',
            modalAffectedSolutions: 'Mire lesz ez hatással:',
            learnMore: 'Tudj meg többet',
            on: 'Be',
            off: 'Ki',
            enabled: 'bekapcsolva.',
            disabled: 'kikapcsolva.',
            checked: 'kipipálva',
            unchecked: 'nincs kipipálva'
          }
        }
      },
      categories: {},
      consentModeControls: {},
      services: {}
    };
    this.setConfiguration(configObject);
  }
  Configuration_createClass(Configuration, [{
    key: "setConfiguration",
    value: function setConfiguration(configObject) {
      // The user overrides the default config
      // console.log(window.CookieConsent.config, configObject, { ...window.CookieConsent.config, ...configObject });

      this.mergeDeep(window.CookieConsent.config, configObject);
      //loMerge(window.CookieConsent.config, configObject);
      // The cookie overrides the default and user config
      this.cookieToConfig();

      // We tell the world we did this
      Utilities.dispatchEvent(document, 'CCConfigSet');
    }
  }, {
    key: "cookieToConfig",
    value: function cookieToConfig() {
      function removeReload() {
        Utilities.removeCookie();
        location.reload();
        return false;
      }
      document.cookie.split(';').filter(function (item) {
        if (item.indexOf('cconsent') >= 0) {
          var cookieData = JSON.parse(item.split('=')[1]);

          // We check cookie version. If older we need to renew cookie.
          if (typeof cookieData.version === 'undefined') {
            return removeReload();
          } else {
            if (cookieData.version !== window.CookieConsent.config.cookieVersion) {
              return removeReload();
            }
          }

          // We check if cookie data categories also exist in user config
          for (var key in cookieData.categories) {
            // The cookie contains category not present in user config so we invalidate cookie
            if (typeof window.CookieConsent.config.categories[key] === 'undefined') {
              return removeReload();
            }
          }

          // We check if cookie data consent mode controls also exist in user config
          for (var _key in cookieData.consentMode) {
            if (typeof window.CookieConsent.config.consentModeControls[_key] === 'undefined') {
              return removeReload();
            }
          }

          // We check if cookie data services also exist in user config
          cookieData.services.forEach(function (service) {
            // The cookie contains service not present in user config so we invalidate cookie
            if (typeof window.CookieConsent.config.services[service] === 'undefined') {
              return removeReload();
            }
          });

          // If we don't have UI we ignore the saved cookie configuration.
          if (!window.CookieConsent.config.noUI) {
            // We integrate cookie data into the global config object
            for (var _key2 in cookieData.categories) {
              window.CookieConsent.config.categories[_key2].checked = window.CookieConsent.config.categories[_key2].wanted = cookieData.categories[_key2].wanted === true ? true : false;
            }
          }
          window.CookieConsent.config.cookieExists = true;
          return true;
        }
      });
      return false;
    }

    // Simple object check.
  }, {
    key: "isObject",
    value: function isObject(item) {
      return item && Configuration_typeof(item) === 'object' && !Array.isArray(item);
    }

    //Deep merge two objects.
  }, {
    key: "mergeDeep",
    value: function mergeDeep(target) {
      for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key3 = 1; _key3 < _len; _key3++) {
        sources[_key3 - 1] = arguments[_key3];
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

;// CONCATENATED MODULE: ./src/lib/RemoveCookies.js
function RemoveCookies_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function RemoveCookies_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function RemoveCookies_createClass(Constructor, protoProps, staticProps) { if (protoProps) RemoveCookies_defineProperties(Constructor.prototype, protoProps); if (staticProps) RemoveCookies_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var RemoveCookies = /*#__PURE__*/function () {
  function RemoveCookies() {
    RemoveCookies_classCallCheck(this, RemoveCookies);
  }
  RemoveCookies_createClass(RemoveCookies, [{
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
        if (Utilities.objectType(config.services[service].cookies) === 'Array') {
          // Remove cookies if they are not wanted by user
          if (!config.categories[config.services[service].category].wanted) {
            for (var i in config.services[service].cookies) {
              var type = Utilities.objectType(config.services[service].cookies[i].name);
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
                      domain: Utilities.objectType(cookieDef.domain) === 'String' ? cookieDef.domain : null
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
      var domain = Utilities.objectType(cookie.domain) === 'String' ? "domain=".concat(cookie.domain, ";") : '';
      document.cookie = "".concat(cookie.name, "=; expires=Thu, 01 Jan 1980 00:00:00 UTC; ").concat(domain, " path=/;");
    }
  }]);
  return RemoveCookies;
}();

;// CONCATENATED MODULE: ./src/lib/CookieConsent.js
function CookieConsent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function CookieConsent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function CookieConsent_createClass(Constructor, protoProps, staticProps) { if (protoProps) CookieConsent_defineProperties(Constructor.prototype, protoProps); if (staticProps) CookieConsent_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }







var CookieConsent = /*#__PURE__*/function () {
  function CookieConsent() {
    CookieConsent_classCallCheck(this, CookieConsent);
  }
  CookieConsent_createClass(CookieConsent, [{
    key: "init",
    value: function init(configObject) {
      new Configuration(configObject);
      var removeCookies = new RemoveCookies();
      var insertScriptFilter = new InsertScriptFilter();
      var scriptTagFilter = new ScriptTagFilter();
      var wrapperFilter = new WrapperFilter();
      var localCookieFilter = new LocalCookieFilter();
      removeCookies.init();
      insertScriptFilter.init();
      scriptTagFilter.init();
      wrapperFilter.init();
      localCookieFilter.init();
      var UI = new Interface();
      UI.buildInterface(function () {
        UI.addEventListeners();
      });
    }
  }]);
  return CookieConsent;
}();

;// CONCATENATED MODULE: ./src/index.js

var cookieConsent = new CookieConsent();
window.CookieConsent = window.CookieConsent || {};
window.CookieConsent.init = cookieConsent.init;
/******/ })()
;