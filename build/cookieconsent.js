/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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



;// CONCATENATED MODULE: ./src/lib/Utilities.js

class Utilities {
  static ready(fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  static objectType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }
  static lightenDarkenColor(col, amt) {
    let usePound = false;

    // Handling HEX color format
    if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
      let num = parseInt(col, 16);
      let r = (num >> 16) + amt;
      let g = (num >> 8 & 0x00ff) + amt;
      let b = (num & 0x0000ff) + amt;
      r = Math.min(255, Math.max(0, r));
      g = Math.min(255, Math.max(0, g));
      b = Math.min(255, Math.max(0, b));
      return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }

    // Handling RGBA and RGB color format
    if (col.startsWith('rgb')) {
      let parts = col.match(/rgba?\((\d{1,3})\s*,?\s*(\d{1,3})\s*,?\s*(\d{1,3})(?:\s*\/\s*(\d+\.?\d*%?))?\)/i);
      if (parts) {
        let r = parseInt(parts[1]) + amt;
        let g = parseInt(parts[2]) + amt;
        let b = parseInt(parts[3]) + amt;
        let a = parts[4] ? parseFloat(parts[4]) : 1;
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        // Conditionally format output depending on alpha presence
        if (parts[4]) {
          return `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
          return `rgb(${r}, ${g}, ${b})`;
        }
      }
    }
    return col; // Return the original if format is not recognized
  }
  static removeCookie() {
    document.cookie = `cconsent=; expires=Thu, 01 Jan 1980 00:00:00 UTC; path=/;`;
    //remove localStorage consentMode obj
    localStorage.removeItem('consentMode');
    window.CookieConsent.config.cookieExists = false;
  }

  // Create an array of services from Cookieconsent global object
  // Filter based on category or leave empty is all is wanted
  static listGlobalServices(category) {
    let categories = [];

    // Global config objectnot set
    if (typeof window.CookieConsent === 'undefined') return categories;

    // Category is not specified or opposite
    if (typeof category === 'undefined') {
      for (let key in window.CookieConsent.config.services) {
        categories.push(key);
      }
    } else {
      for (let key in window.CookieConsent.config.services) {
        if (window.CookieConsent.config.services[key].category === category) categories.push(key);
      }
    }
    return categories;
  }
  static dispatchEvent(elem, event) {
    var event;
    if (typeof Event === 'function') {
      event = new Event(event);
    } else {
      event = document.createEvent('Event');
      event.initEvent(event, true, true);
    }
    elem.dispatchEvent(event);
  }

  // Parse HTML and creates paragraph with links
  static parseAndCreateParagraph(htmlString) {
    const paragraph = el('p');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    tempDiv.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        paragraph.appendChild(el('span', node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'a') {
        const href = node.getAttribute('href');
        const text = node.textContent;
        paragraph.appendChild(el('a', {
          href: href,
          target: '_blank',
          rel: 'noopener noreferrer'
        }, text));
      }
    });
    return paragraph;
  }

  // get regional consent type defaults from GTM template to set default UI on banner
  static updateCategoriesBasedOnConsent = data => {
    const {
      categories,
      consentModeControls
    } = window.CookieConsent.config;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const categoryKey = consentModeControls[key];
        if (categoryKey && categories[categoryKey]) {
          categories[categoryKey].checked = categories[categoryKey].wanted = data[key];
        }
      }
    }

    // Dispatch the custom event
    const event = new CustomEvent('updateCategories', {
      detail: {
        message: 'Categories updated',
        categories
      }
    });
    document.dispatchEvent(event);
  };
}
;// CONCATENATED MODULE: ./src/lib/Filter.js

class Filter {
  createBlacklist(type) {
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
        for (let i = 0; i < services[service].search.length; i++) {
          blacklist.push(services[service].search[i]);
        }
      }
    }
    return blacklist;
  }
}
;// CONCATENATED MODULE: ./src/lib/InsertScriptFilter.js

class InsertScriptFilter extends Filter {
  constructor() {
    super();
  }
  init() {
    this.overrideAppendChild();
    this.overrideInsertBefore();
  }
  overrideAppendChild() {
    Element.prototype.appendChild = function (elem) {
      if (arguments[0].tagName === 'SCRIPT') {
        //console.log('Appending:', arguments);
        for (let key in window.CookieConsent.config.services) {
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
  overrideInsertBefore() {
    Element.prototype.insertBefore = function (elem) {
      if (arguments[0].tagName === 'SCRIPT') {
        //console.log('Inserting:', arguments);
        for (let key in window.CookieConsent.config.services) {
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
}
;// CONCATENATED MODULE: ./src/lib/ScriptTagFilter.js


class ScriptTagFilter extends Filter {
  constructor() {
    super();
  }
  init() {
    this.filterTags();
  }
  filterTags() {
    Utilities.ready(() => {
      var blacklist = super.createBlacklist('script-tag');
      var scriptTags = document.querySelectorAll('script[type="text/plain"]');
      for (var scriptTag of scriptTags) {
        if (blacklist.indexOf(scriptTag.dataset.consent) < 0) {
          var newtag = document.createElement('script');
          var parentNode = scriptTag.parentNode;
          scriptTag.type = 'text/javascript';
          for (var attribute of scriptTag.attributes) {
            newtag.setAttribute(attribute.nodeName, attribute.nodeValue);
          }
          newtag.innerHTML = scriptTag.innerHTML;
          parentNode.insertBefore(newtag, scriptTag);
          parentNode.removeChild(scriptTag);
        }
      }
    });
  }
}
;// CONCATENATED MODULE: ./src/lib/WrapperFilter.js

class WrapperFilter extends Filter {
  constructor() {
    super();
  }
  init() {
    this.filterWrappers();
  }
  filterWrappers() {
    var blacklist = super.createBlacklist('wrapped');
    function wrapper() {
      let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      let callback = arguments.length > 1 ? arguments[1] : undefined;
      if (blacklist.indexOf(name) < 0) {
        callback();
      }
    }
    window.CookieConsent.wrapper = wrapper;
  }
}
;// CONCATENATED MODULE: ./src/lib/LocalCookieFilter.js

class LocalCookieFilter extends Filter {
  constructor() {
    super();
  }
  init() {
    this.filterlocalCookies();
  }
  getCookieDescriptor() {
    var cookieDescriptor;
    cookieDescriptor = Object.getOwnPropertyDescriptor(document, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
    if (!cookieDescriptor) {
      cookieDescriptor = {};
      cookieDescriptor.get = HTMLDocument.prototype.__lookupGetter__("cookie");
      cookieDescriptor.set = HTMLDocument.prototype.__lookupSetter__("cookie");
    }
    return cookieDescriptor;
  }
  filterlocalCookies() {
    // TODO - implement buffer
    var blacklist = super.createBlacklist('localcookie');
    var cookieDescriptor = this.getCookieDescriptor();
    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: function () {
        return cookieDescriptor.get.apply(document);
      },
      set: function () {
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
}
;// CONCATENATED MODULE: ./src/lib/Language.js
class Language {
  setLocale(locale) {
    window.CookieConsent.config.language.current = locale;
  }
  static getTranslation(object, locale, key) {
    var currentLocale;
    if (!object.hasOwnProperty('language')) return '[Missing language object]';
    if (!object.language.hasOwnProperty('locale')) return '[Missing locale object]';
    currentLocale = object.language.locale.hasOwnProperty(locale) ? locale : 'en';
    return object.language.locale[currentLocale].hasOwnProperty(key) ? object.language.locale[currentLocale][key] : '[Missing translation]';
  }
}
;// CONCATENATED MODULE: ./src/lib/Interface.js



class Interface {
  constructor() {
    this.elements = {};
    this.updateConsentModeFn = null;
  }
  buildStyle() {
    return el('style', '#cconsent-bar, #cconsent-bar * { box-sizing:border-box }', '#cconsent-bar .visually-hide, #cconsent-modal .visually-hide { position: absolute !important; overflow: hidden !important; clip-path: rect(1px 1px 1px 1px) !important; width: 1px !important; height: 1px !important; }', '#cconsent-bar { background-color:' + window.CookieConsent.config.theme.barColor + '; color:' + window.CookieConsent.config.theme.barTextColor + '; padding:15px; text-align:right; font-family:inherit; font-size:14px; line-height:18px; position:fixed; bottom:0; inset-inline:0; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}', '#cconsent-bar.ccb--hidden {transform: translateY(100%); display:block; visible:hidden;}', '#cconsent-bar .ccb__wrapper { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}', '#cconsent-bar .ccb__left { align-self:center; text-align:left; margin: 15px 0;}', '#cconsent-bar .ccb__right { align-self:center; white-space: nowrap;}', '#cconsent-bar .ccb__right > div {display:inline-block; color:#FFF;}', '#cconsent-bar button { line-height:normal; font-size:14px; border:0; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}', '#cconsent-bar button.consent-give { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}', '#cconsent-bar button.consent-decline { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; margin-right: 10px; border: 1px solid ' + window.CookieConsent.config.theme.barMainButtonColor + '}', '#cconsent-bar button.ccb__edit { appearance:none; margin-right:15px; border:0; padding:0; text-decoration:underline; color:' + window.CookieConsent.config.theme.barTextColor + '; background:none; }', '#cconsent-bar a:hover, #cconsent-bar button:hover { cursor:pointer; }', '#cconsent-bar button:focus-visible {box-shadow: 0 0 0 2px ' + window.CookieConsent.config.theme.focusColor + ';}', '#cconsent-modal, #cconsent-init-modal { display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}', '@media (max-width: 600px) { #cconsent-modal, #cconsent-init-modal { height: 100% } }', '#cconsent-modal button, #cconsent-init-modal button { border: 0 }', '#cconsent-modal strong, #cconsent-init-modal strong {color:#333; margin-top:0}', '#cconsent-modal.ccm--visible, #cconsent-init-modal.ccm--visible {display:flex}', '#cconsent-modal .ccm__content, #cconsent-init-modal .ccm__content { max-width:600px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; display:flex; flex-direction:column; justify-content:space-between; }', '@media (max-width: 600px) { #cconsent-modal .ccm__content, #cconsent-init-modal .ccm__content { max-width:100vw; height:100%; max-height:initial; }}', '#cconsent-modal .ccm__content > .ccm__content__heading, #cconsent-init-modal .ccm__content > .ccm__content__heading { border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative; }', '#cconsent-modal .ccm__content > .ccm__content__heading strong, #cconsent-init-modal .ccm__content > .ccm__content__heading strong { font-size:21px; font-weight:600; color:#333; margin:0 }', '#cconsent-modal .ccm__content > .ccm__content__heading p, #cconsent-init-modal .ccm__content > .ccm__content__heading p { margin-top:1rem; margin-bottom:1rem; }', '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close, #cconsent-init-modal .ccm__content > .ccm__content__heading .ccm__cheading__close { appearance:none; padding:0; border:0; font-weight:600; color:#888; cursor:pointer; font-size:26px; position:absolute; right:15px; top:15px; width:26px; height:26px; background:none; text-align:center; }', '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close:focus-visible, #cconsent-init-modal .ccm__content > .ccm__content__heading .ccm__cheading__close:focus-visible { box-shadow: 0 0 0 0.25rem ' + window.CookieConsent.config.theme.focusColor + '; }', '#cconsent-modal .ccm__content > .ccm__content__body { background-color:#FFF; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup { margin:0; border-bottom: 1px solid #D8D8D8; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {color:#333; font-weight:600; cursor:pointer; position:relative; padding:0; margin:0; transition: background-color .5s ease-out; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head:hover { background-color:#F9F9F9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status { order: 1; position:absolute; left:35px; font-weight: 600; display:inline-block; margin-right: 20px; pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--checked { font-size:1em; color:#28a834; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--unchecked { font-size:1.4em; color:#e56385; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__text { order: 2; pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge { transition: transform .3s ease-out; transform-origin: center; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%); order: 3;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge > svg { pointer-events: none; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head .ccm__tab-head__icon-wedge { transform:translateY(-50%) rotate(-180deg) }', '#cconsent-modal .ccm__tab-trigger { appearance: none; background: none; display: flex; flex-direction: row; width: 100%; padding:17px 35px 17px 56px; color:#333; font-weight:600; }', '#cconsent-modal .ccm__tab-trigger:focus-visible {box-shadow: 0 0 0 2px ' + window.CookieConsent.config.theme.focusColor + ';}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content {padding:0; margin:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content { overflow: hidden; display: none; transition: all .5s ease-out; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content__inner { display: flex; flex-direction: row; padding:25px 35px; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head { background-color:#f9f9f9 }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content { max-height: 900px; display: block; }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose {order:1;}', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {flex-direction:column} }', '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose { margin-bottom:20px; } }', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-component {display:flex; margin-right:35px; align-items:center;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__status {font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group {background:none; width:40px; height:20px; margin:0 10px; position:relative;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; transition: .4s; pointer-events: none;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider:before {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; transition: .4s;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider {background-color: #28A834;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group:focus-visible {box-shadow: 0 0 0 2px ' + window.CookieConsent.config.theme.focusColor + ';}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider:before {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__desc {order:2;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content strong {font-size:18px; margin-bottom:10px; line-height:1;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content p {color:#444; margin-bottom:0}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list:not(:empty) {margin-top:30px;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list .ccm__list__title {color:#333; font-weight:600;}', '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list ul { margin:15px 0; padding-left:15px }', '#cconsent-modal .ccm__footer, #cconsent-init-modal .ccm__footer { padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }', '#cconsent-modal .ccm__footer button, #cconsent-init-modal .ccm__footer button { line-height:normal; font-size:14px; transition: background-color .5s ease-out; background-color:' + window.CookieConsent.config.theme.modalMainButtonColor + '; color:' + window.CookieConsent.config.theme.modalMainButtonTextColor + '; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; height: 100%; }', '#cconsent-modal .ccm__footer button:hover, #cconsent-init-modal .ccm__footer button:hover { background-color:' + Utilities.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20) + '; }', '#cconsent-modal .ccm__footer button:focus-within, #cconsent-init-modal .ccm__footer button:focus-within { box-shadow: 0 0 0 0.25rem ' + window.CookieConsent.config.theme.focusColor + '; }', '#cconsent-modal .ccm__footer button + button, #cconsent-init-modal .ccm__footer button + button { margin-left: 10px; }');
  }
  injectCustomStyles(customCSS) {
    let fullOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(customCSS));
    if (fullOverride) {
      document.head.appendChild(style);
    } else {
      let defaultStyleTag = document.body.getElementsByTagName('style');
      if (defaultStyleTag.length) {
        defaultStyleTag[0].insertAdjacentElement('afterend', style);
      }
    }
  }
  buildBar() {
    return el('div#cconsent-bar.ccb--hidden', el(`div.ccb__wrapper`, el('div.ccb__left', el('div.cc-text', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))), el('div.ccb__right', el('div.ccb__button', el('button.ccb__edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting'), {
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
  buildModal() {
    // Cookie names list middleware
    var listCookies = function (category) {
      var list = [];
      for (let service in window.CookieConsent.config.services) {
        window.CookieConsent.config.services[service].category === category && list.push(window.CookieConsent.config.services[service]);
      }
      if (list.length) {
        var listItems = [];
        for (let item in list) {
          listItems.push(el('li', Language.getTranslation(list[item], window.CookieConsent.config.language.current, 'name')));
        }
        return [el('div.ccm__list', el('span.ccm__list__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalAffectedSolutions')), el('ul', listItems))];
      }
    };
    function modalTabGroups() {
      let contentItems = [];
      let i = 0;
      for (let key in window.CookieConsent.config.categories) {
        let tabId = Math.random().toString(16).slice(2);
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
        })), el('dd#ccm__tab-content--' + tabId + '.ccm__tab-content', el('div.ccm__tab-content__inner', el('div.ccm__tab-content__desc', el('strong#ccm__tab-content__title--' + tabId, Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name'), {
          'aria-label': `${Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')} - tab`
        }), el('p', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')), el('div.ccm__list', listCookies(key))), el('div.ccm__tab-content__choose', !window.CookieConsent.config.categories[key].needed && el('div.ccm__switch-component', el('span.ccm__switch__status.status-off', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')), el('button.ccm__switch-group', el('span.ccm__switch__text.visually-hide', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')), el('span.ccm__switch__slider'), {
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
    return el('dialog#cconsent-modal', el('div.ccm__content', el('div.ccm__content__heading', el('strong#ccm__content__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle'), {
      'aria-label': 'Cookie Consent options'
    }), Utilities.parseAndCreateParagraph(Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText')), el('button.ccm__cheading__close', '×', {
      'aria-label': Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'closeAriaLabel')
    })), el('div.ccm__content__body', el('div.ccm__tabs', modalTabGroups())), el('div.ccm__footer', el('button#ccm__footer__consent-modal-submit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')), window.CookieConsent.config.showRejectAllButton && el('button.consent-decline', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnRejectAll')), el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll')))), {
      'aria-labelledby': 'ccm__content__title',
      'aria-hidden': 'true'
    });
  }
  buildInitialModal() {
    return el('dialog#cconsent-init-modal', el('div.ccm__content', el('div.ccm__content__heading', el('strong#init__ccm__content__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle'), {
      'aria-label': 'Cookie Consent'
    }), Utilities.parseAndCreateParagraph(Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'))), el('div.ccm__footer', el('button.consent-decline', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'initModalBtnDisagree')), el('button.ccm__edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'initModalBtnOptions')), el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'initModalBtnAgree')))), {
      'aria-labelledby': 'init__ccm__content__title',
      'aria-hidden': 'true'
    });
  }
  modalRedrawIcons() {
    var tabGroups = this.elements['modal'].querySelectorAll('.ccm__tabgroup');
    for (let tabGroup of tabGroups) {
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
  }
  render(name, elem, callback) {
    if (typeof callback === 'undefined') callback = function () {};
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
  buildInterface(callback) {
    if (typeof callback === 'undefined') callback = function () {};
    var that = this;
    if (window.CookieConsent.config.consentModeHandler == 'gtm-template') {
      // method called from GTM Custom consent mode template to pass an updateConsent callback
      window.updateConsentModeSetterFn = cb => {
        this.updateConsentModeFn = cb;
      };

      // method called from GTM Custom consent mode template to pass an updateCategoriesBasedOnConsent callback to update UI
      window.updateCategoriesBasedOnConsentSetter = function (data) {
        Utilities.updateCategoriesBasedOnConsent(data);
      };
    } else if (window.CookieConsent.config.consentModeHandler == 'gtag') {
      this.updateConsentModeFn = function updateConsentMode(consentMode) {
        const isGTMEnabled = window.dataLayer || false;
        if (isGTMEnabled) {
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('consent', 'update', consentMode);
          localStorage.setItem('consentMode', JSON.stringify(consentMode));
        }
      };
    }
    Utilities.ready(function () {
      if (window.CookieConsent.config.noUI) {
        that.writeBufferToDOM();
        that.buildCookie(cookie => {
          that.setCookie(cookie);
        });
        callback();
        return;
      }
      if (window.CookieConsent.config.fullCSSOverride) {
        that.injectCustomStyles(window.CookieConsent.config.fullCSSOverride, true);
      } else {
        that.render('style', that.buildStyle());
        if (window.CookieConsent.config.customCSS) that.injectCustomStyles(window.CookieConsent.config.customCSS);
      }

      //show the bar only if layout mode is 'bar'
      if (window.CookieConsent.config.mode == 'bar') {
        that.render('bar', that.buildBar(), bar => {
          // Show the bar after a while
          if (!window.CookieConsent.config.cookieExists) {
            setTimeout(() => {
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
              buttonConsentDecline !== null && buttonConsentDecline.setAttribute('tabindex', '0');
              buttonConsentDecline !== null && buttonConsentDecline.setAttribute('aria-hidden', 'false');
            }, window.CookieConsent.config.UITimeout);
          }
        });
      }
      that.render('modal', that.buildModal());

      //show init modal if layout mode is 'modal'
      if (window.CookieConsent.config.mode == 'modal') {
        that.render('modalInit', that.buildInitialModal(), modal => {
          if (!window.CookieConsent.config.cookieExists) {
            setTimeout(() => {
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
  addEventListeners(elements) {
    // Set the default state for modal
    var modalOpen = false;
    var focusTarget = document.querySelector('body');

    // If you click Accept all cookies
    var buttonConsentGive = document.querySelectorAll('.consent-give');
    for (let button of buttonConsentGive) {
      button.addEventListener('click', () => {
        var buttonSettings = document.querySelector('.ccb__edit');
        var buttonConsentDecline = document.querySelector('.consent-decline');

        // We set config to full consent
        for (let key in window.CookieConsent.config.categories) {
          window.CookieConsent.config.categories[key].wanted = window.CookieConsent.config.categories[key].checked = true;
        }
        this.writeBufferToDOM();
        this.buildCookie(cookie => {
          this.setCookie(cookie);
        });
        this.elements['bar']?.classList.add('ccb--hidden');
        this.elements['bar']?.setAttribute('aria-hidden', 'true');
        this.elements['bar']?.setAttribute('tabindex', '-1');
        this.elements['modal'].classList.remove('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'true');
        this.elements['modal'].setAttribute('tabindex', '-1');
        this.elements['modalInit']?.classList.remove('ccm--visible');
        this.elements['modalInit']?.setAttribute('aria-hidden', 'true');
        this.elements['modalInit']?.setAttribute('tabindex', '-1');
        button.setAttribute('tabindex', '-1');
        button.setAttribute('aria-hidden', 'true');
        buttonSettings.setAttribute('tabindex', '-1');
        buttonSettings.setAttribute('aria-hidden', 'true');
        buttonConsentDecline !== null && buttonConsentDecline.setAttribute('tabindex', '-1');
        buttonConsentDecline !== null && buttonConsentDecline.setAttribute('aria-hidden', 'true');
        focusTarget.focus();
        modalOpen = false;
        this.modalRedrawIcons();
      });
    }

    // If you click Reject all cookies
    var buttonConsentDecline = document.querySelectorAll('.consent-decline');
    for (let button of buttonConsentDecline) {
      button.addEventListener('click', () => {
        var buttonSettings = document.querySelector('.ccb__edit');
        var buttonConsentGive = document.querySelector('.consent-give');

        // We set config to full consent only in is needed
        for (let key in window.CookieConsent.config.categories) {
          window.CookieConsent.config.categories[key].wanted = window.CookieConsent.config.categories[key].checked = window.CookieConsent.config.categories[key].needed;
        }
        this.writeBufferToDOM();
        this.buildCookie(cookie => {
          this.setCookie(cookie);
        });
        this.elements['bar']?.classList.add('ccb--hidden');
        this.elements['bar']?.setAttribute('aria-hidden', 'true');
        this.elements['bar']?.setAttribute('tabindex', '-1');
        this.elements['modal'].classList.remove('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'true');
        this.elements['modal'].setAttribute('tabindex', '-1');
        this.elements['modalInit']?.classList.remove('ccm--visible');
        this.elements['modalInit']?.setAttribute('aria-hidden', 'true');
        this.elements['modalInit']?.setAttribute('tabindex', '-1');
        button.setAttribute('tabindex', '-1');
        button.setAttribute('aria-hidden', 'true');
        buttonSettings.setAttribute('tabindex', '-1');
        buttonSettings.setAttribute('aria-hidden', 'true');
        buttonConsentGive.setAttribute('tabindex', '-1');
        buttonConsentGive.setAttribute('aria-hidden', 'true');
        focusTarget.focus();
        modalOpen = false;
        this.modalRedrawIcons();
      });
    }

    // If you click Cookie settings and open settings modal
    Array.prototype.forEach.call(document.querySelectorAll('.ccm__edit, .ccb__edit'), edit => {
      edit.addEventListener('click', () => {
        modalOpen = true;
        this.elements['modal'].classList.add('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'false');
        this.elements['modal'].setAttribute('tabindex', '0');
        this.elements['modal'].querySelector('.ccm__cheading__close').focus();
        this.elements['modalInit']?.classList.remove('ccm--visible');
        this.elements['modalInit']?.setAttribute('aria-hidden', 'true');
        this.elements['modalInit']?.setAttribute('tabindex', '-1');
      });
    });

    // If you click trough the tabs on Cookie settings
    // If you click on/off switch
    this.elements['modal'].querySelector('.ccm__tabs').addEventListener('click', event => {
      // If you click trough the tabs on Cookie settings
      if (event.target.classList.contains('ccm__tab-trigger') || event.target.classList.contains('ccm__tab-head__icon-wedge')) {
        function getDlParent(eventTarget) {
          var parent = eventTarget.parentNode;
          if (parent.nodeName !== 'DL') {
            return getDlParent(parent);
          } else {
            return parent;
          }
        }
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
    this.elements['modal'].querySelector('.ccm__cheading__close').addEventListener('click', event => {
      this.elements['modal'].classList.remove('ccm--visible');
      this.elements['modal'].setAttribute('aria-hidden', 'true');
      this.elements['modal'].setAttribute('tabindex', '-1');
      if (!window.CookieConsent.config.cookieExists) {
        this.elements['modalInit']?.classList.add('ccm--visible');
        this.elements['modalInit']?.setAttribute('aria-hidden', 'false');
        this.elements['modalInit']?.setAttribute('tabindex', '0');
      }
      modalOpen = false;
    });
    document.addEventListener('keydown', event => {
      if (modalOpen && (!event.keyCode || event.keyCode === 27)) {
        this.elements['modal'].classList.remove('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'true');
        this.elements['modal'].setAttribute('tabindex', '-1');
        if (!window.CookieConsent.config.cookieExists) {
          this.elements['modalInit']?.classList.add('ccm--visible');
          this.elements['modalInit']?.setAttribute('aria-hidden', 'false');
          this.elements['modalInit']?.setAttribute('tabindex', '0');
        }
        modalOpen = false;
      }
    });

    // If updateCategoriesBasedOnConsent is called from GTM to change default UI based on consent
    document.addEventListener('updateCategories', this.modalRedrawIcons.bind(this));

    // If you click submit on cookie settings
    document.getElementById('ccm__footer__consent-modal-submit').addEventListener('click', () => {
      let switchElements = this.elements['modal'].querySelectorAll('.ccm__switch input');
      Array.prototype.forEach.call(switchElements, switchElement => {
        window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
      });
      var buttonSettings = document.querySelector('.ccb__edit');
      var buttonConsentGive = document.querySelector('.consent-give');
      var buttonConsentDecline = document.querySelector('.consent-decline');
      this.buildCookie(cookie => {
        this.setCookie(cookie, () => {
          this.elements['modal'].classList.remove('ccm--visible');
          this.elements['modal'].setAttribute('aria-hidden', 'true');
          this.elements['modal'].setAttribute('tabindex', '-1');
          this.elements['modalInit']?.classList.remove('ccm--visible');
          this.elements['modalInit']?.setAttribute('aria-hidden', 'true');
          this.elements['modalInit']?.setAttribute('tabindex', '-1');
          this.elements['bar']?.classList.add('ccb--hidden');
          this.elements['bar']?.setAttribute('aria-hidden', 'true');
          this.elements['bar']?.setAttribute('tabindex', '-1');
          buttonSettings.setAttribute('tabindex', '-1');
          buttonSettings.setAttribute('aria-hidden', 'true');
          buttonConsentGive.setAttribute('tabindex', '-1');
          buttonConsentGive.setAttribute('aria-hidden', 'true');
          buttonConsentDecline !== null && buttonConsentDecline.setAttribute('tabindex', '-1');
          buttonConsentDecline !== null && buttonConsentDecline.setAttribute('aria-hidden', 'true');
          focusTarget.focus();
          modalOpen = false;
        });
      });
      this.writeBufferToDOM();
    });
  }
  writeBufferToDOM() {
    for (let action of window.CookieConsent.buffer.appendChild) {
      if (window.CookieConsent.config.categories[action.category].wanted === true) {
        Node.prototype.appendChild.apply(action.this, action.arguments);
      }
    }
    for (let action of window.CookieConsent.buffer.insertBefore) {
      if (window.CookieConsent.config.categories[action.category].wanted === true) {
        action.arguments[1] = action.arguments[0].parentNode === null ? action.this.lastChild : action.arguments[1];
        Node.prototype.insertBefore.apply(action.this, action.arguments);
      }
    }
  }
  buildCookie(callback) {
    let cookie = {
      version: window.CookieConsent.config.cookieVersion,
      categories: {},
      services: [],
      consentMode: {}
    };
    for (let key in window.CookieConsent.config.categories) {
      cookie.categories[key] = {
        wanted: window.CookieConsent.config.categories[key].wanted
      };
    }
    for (let key in window.CookieConsent.config.consentModeControls) {
      cookie.consentMode[key] = window.CookieConsent.config.categories[window.CookieConsent.config.consentModeControls[key]]?.wanted ? 'granted' : 'denied';
    }
    cookie.services = Utilities.listGlobalServices();
    if (this.updateConsentModeFn) this.updateConsentModeFn(cookie.consentMode);
    if (callback) callback(cookie);
    return cookie;
  }
  setCookie(cookie, callback) {
    const expires_in = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `cconsent=${JSON.stringify(cookie)}; expires=${expires_in}; path=/;`;
    window.CookieConsent.config.cookieExists = true;
    if (callback) callback();
  }
}
;// CONCATENATED MODULE: ./src/lib/Configuration.js

class Configuration {
  constructor(configObject) {
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
      customCSS: null,
      fullCSSOverride: null,
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
      consentModeHandler: null,
      services: {}
    };
    this.setConfiguration(configObject);
  }
  setConfiguration(configObject) {
    // The user overrides the default config
    // console.log(window.CookieConsent.config, configObject, { ...window.CookieConsent.config, ...configObject });

    this.mergeDeep(window.CookieConsent.config, configObject);
    //loMerge(window.CookieConsent.config, configObject);
    // The cookie overrides the default and user config
    this.cookieToConfig();

    // We tell the world we did this
    Utilities.dispatchEvent(document, 'CCConfigSet');
  }
  cookieToConfig() {
    function removeReload() {
      Utilities.removeCookie();
      location.reload();
      return false;
    }
    document.cookie.split(';').filter(item => {
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
        for (let key in cookieData.categories) {
          // The cookie contains category not present in user config so we invalidate cookie
          if (typeof window.CookieConsent.config.categories[key] === 'undefined') {
            return removeReload();
          }
        }

        // We check if cookie data consent mode controls also exist in user config
        for (let key in cookieData.consentMode) {
          if (typeof window.CookieConsent.config.consentModeControls[key] === 'undefined') {
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
          for (let key in cookieData.categories) {
            window.CookieConsent.config.categories[key].checked = window.CookieConsent.config.categories[key].wanted = cookieData.categories[key].wanted === true ? true : false;
          }
        }
        window.CookieConsent.config.cookieExists = true;
        return true;
      }
    });
    return false;
  }

  // Simple object check.
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  //Deep merge two objects.
  mergeDeep(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }
    if (!sources.length) return target;
    const source = sources.shift();
    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, {
            [key]: {}
          });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {
            [key]: source[key]
          });
        }
      }
    }
    return this.mergeDeep(target, ...sources);
  }
}
;// CONCATENATED MODULE: ./src/lib/RemoveCookies.js

class RemoveCookies {
  init() {
    this.removeUnwantedCookies();
  }
  removeUnwantedCookies() {
    let cookieList = [];
    let config = window.CookieConsent.config;
    document.cookie.split(';').map(function (a) {
      cookieList.push(a.split('=')[0].replace(/(^\s*)|(\s*&)/, ''));
    });
    for (let service in config.services) {
      if (Utilities.objectType(config.services[service].cookies) === 'Array') {
        // Remove cookies if they are not wanted by user
        if (!config.categories[config.services[service].category].wanted) {
          for (let i in config.services[service].cookies) {
            let type = Utilities.objectType(config.services[service].cookies[i].name);
            if (type === 'String') {
              if (cookieList.indexOf(config.services[service].cookies[i].name) > -1) {
                this.removeCookie(config.services[service].cookies[i]);
              }
            } else if (type === 'RegExp') {
              // Searching cookie list for cookies matching specified RegExp
              let cookieDef = config.services[service].cookies[i];
              for (let c in cookieList) {
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
  removeCookie(cookie) {
    // Removing cookies from domain and .domain
    let domain = Utilities.objectType(cookie.domain) === 'String' ? `domain=${cookie.domain};` : '';
    document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1980 00:00:00 UTC; ${domain} path=/;`;
  }
}
;// CONCATENATED MODULE: ./src/lib/CookieConsent.js







class CookieConsent {
  init(configObject) {
    new Configuration(configObject);
    const removeCookies = new RemoveCookies();
    const insertScriptFilter = new InsertScriptFilter();
    const scriptTagFilter = new ScriptTagFilter();
    const wrapperFilter = new WrapperFilter();
    const localCookieFilter = new LocalCookieFilter();
    removeCookies.init();
    insertScriptFilter.init();
    scriptTagFilter.init();
    wrapperFilter.init();
    localCookieFilter.init();
    const UI = new Interface();
    UI.buildInterface(() => {
      UI.addEventListeners();
    });
  }
}
;// CONCATENATED MODULE: ./src/index.js

const cookieConsent = new CookieConsent();
window.CookieConsent = window.CookieConsent || {};
window.CookieConsent.init = cookieConsent.init;
/******/ })()
;