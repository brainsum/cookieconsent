import Utilities from "./Utilities";

export default class Configuration {

  constructor(configObject) {

    window.CookieConsent.buffer = {
      appendChild: [],
      insertBefore: []
    }

    // Wrapper filter function
    window.CookieConsent.wrapper = function () { };

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
        focusColor: 'rgb(40 168 52 / 75%)',
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
            unchecked: 'unchecked',
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
            unchecked: 'nincs kipipálva',
          }
        }
      },
      categories: {},
      consentModeControls: {},
      services: {}
    }

    this.setConfiguration(configObject);

  }

  setConfiguration(configObject) {
    // The user overrides the default config
    // console.log(window.CookieConsent.config, configObject, { ...window.CookieConsent.config, ...configObject });

    this.mergeDeep(window.CookieConsent.config, configObject)
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

    document.cookie.split(';').filter((item) => {

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
            return removeReload()
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
            window.CookieConsent.config.categories[key].checked = window.CookieConsent.config.categories[key].wanted = (cookieData.categories[key].wanted === true) ? true : false;
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
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  //Deep merge two objects.
  mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.mergeDeep(target, ...sources);
  }
}
