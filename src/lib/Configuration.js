import loMerge from 'lodash/merge';
import PubSub from './PubSub';

export default class Configuration {
  
  constructor() {

    window.CookieConsent = window.CookieConsent || {};

    window.CookieConsent.buffer = {
      appendChild: [],
      insertBefore: []
    }

    // Wrapper filter function
    window.CookieConsent.wrapper = function() {};

    // Wrapper filter function
    window.CookieConsent.queue = new PubSub();

    // Settings injector for users
    window.CookieConsent.setConfiguration = this.setConfiguration.bind(this);

    window.CookieConsent.config = {
      active: true,
      cookieExists: false,
      modalMainTextMoreLink: null,
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
            modalMainText: 'Cookies are small piece of data sent from a website and stored on the user\'s computer by the user\'s web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user\'s browsing activity.',
            modalBtnSave: 'Beállítások mentése',
            modalBtnAcceptAll: 'Minden Süti elfogadása',
            modalAffectedSolutions: 'Mire lesz ez hatással:',
            learnMore: 'Tudj meg többet',
            on: 'Be',
            off: 'Ki',
          }
        }
      },
      categories: {
        // necessary: {
        //   needed: true,
        //   wanted: true,
        //   checked: true,
        //   language: {
        //     locale: {
        //       en: {
        //         name: 'Strictly Necessary Cookies',
        //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.',
        //       }
        //     }
        //   }
        // },
      },
      services: {
        // facebook: {
        //   category: 'various',
        //   type: 'dynamic-script', // dynamic-script, script-tag, wrapped, localcookie
        //   search: 'facebook',
        //   language: {
        //     locale: {
        //       en: {
        //         name: 'Facebook'
        //       }
        //     }
        //   }
        // }
      }
    }

  }

  setConfiguration(config) {
    // The user overrides the default config
    loMerge(window.CookieConsent.config, config);

    // The cookie overrides the default and user config
    this.cookieToConfig();

    // We tell the world we did this
    window.CookieConsent.queue.publish('configSet');
  }

  cookieToConfig() {
    document.cookie.split(';').filter((item) => {
      if (item.indexOf('cconsent')  >= 0) {
        window.CookieConsent.config.cookieExists = true;
        var cookieData = JSON.parse(item.split('=')[1]);
        for (let key in cookieData) {
          window.CookieConsent.config.categories[key].checked = window.CookieConsent.config.categories[key].wanted = (cookieData[key] === true) ? true : false;
        }
        return true;
      }
    });
    
    return false;
  }

}