import { el, setChildren, mount } from 'redom';
import CookieConsent from './lib/CookieConsent';


window.CookieConsent.buffer = {
  appendChild: [],
  insertBefore: []
}

window.CookieConsent.functions = {}


new CookieConsent().init();
