import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import CookieConsent from './lib/CookieConsent';


window.CookieConsent.buffer = {
  appendChild: [],
  insertBefore: []
}

window.CookieConsent.functions = {}


new CookieConsent().init();
