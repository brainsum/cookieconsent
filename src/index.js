import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import CookieConsent from './lib/CookieConsent';

const cookieConsent = new CookieConsent();

window.CookieConsent = window.CookieConsent || {};
window.CookieConsent.init = cookieConsent.init;

