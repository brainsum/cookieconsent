import Utilities from "./Utilities";
import loMerge from 'lodash/merge';

export default class Configuration {
  
  constructor(configObject) {

    window.CookieConsent.buffer = {
      appendChild: [],
      insertBefore: []
    }

    // Wrapper filter function
    window.CookieConsent.wrapper = function() {};

    // Settings injector for users
    window.CookieConsent.setConfiguration = this.setConfiguration.bind(this);

    window.CookieConsent.config = {
      active: true,
      cookieExists: false,
      modalMainTextMoreLink: null,
      theme: {
        barColor: '#2C7CBF',
        barTextColor: '#FFF',
        barMainButtonColor: '#FFF',
        barMainButtonTextColor: '#2C7CBF',
        modalMainButtonColor: '#4285F4',
        modalMainButtonTextColor: '#FFF',
      },
      language: {
        current: 'en',
        locale: {
          en: {
            barMainText: 'This website uses cookies to ensure you get the best experience on our website.',
            barLinkSetting: 'Cookie Settings',
            barBtnAcceptAll: 'Accept all cookies',
            modalMainTitle: 'Cookie settings',
            modalMainText: 'Cookies are small piece of data sent from a website and stored on the user\'s computer by the user\'s web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user\'s browsing activity.',
            modalBtnSave: 'Save current settings',
            modalBtnAcceptAll: 'Accept all cookies and close',
            modalAffectedSolutions: 'Affected solutions:',
            learnMore: 'Learn More',
            on: 'On',
            off: 'Off',
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
            off: 'Ki',
          }
        }
      },
      categories: {},
      services: {}
    }

    this.setConfiguration(configObject);

  }

  setConfiguration(configObject) {
    // The user overrides the default config
    loMerge(window.CookieConsent.config, configObject);

    // The cookie overrides the default and user config
    this.cookieToConfig();

    // We tell the world we did this
    document.dispatchEvent(new Event('CCConfigSet'));
  }

  cookieToConfig() {
    document.cookie.split(';').filter((item) => {
      if (item.indexOf('cconsent')  >= 0) {
        var cookieData = JSON.parse(item.split('=')[1]);

        // We check if cookie data categories also exist in user config
        for (let key in cookieData.categories) {

          // The cookie contains category not present in user config so we invalidate cookie
          if(typeof window.CookieConsent.config.categories[key] === 'undefined') {
            Utilities.removeCookie();
            document.location.reload();
            return false;
          }
        }

        // We check if cookie data services also exist in user config
        cookieData.services.forEach(function(service){

          // The cookie contains service not present in user config so we invalidate cookie
          if(typeof window.CookieConsent.config.services[service] === 'undefined') {
            Utilities.removeCookie();
            document.location.reload();
            return false;
          } 
        });

        // We we integrate cookie data into the global config object
        for (let key in cookieData.categories) {
          window.CookieConsent.config.categories[key].checked = window.CookieConsent.config.categories[key].wanted = (cookieData.categories[key].wanted === true) ? true : false;
        }

        window.CookieConsent.config.cookieExists = true;
        return true;
      }
    });
    
    return false;
  }

}
