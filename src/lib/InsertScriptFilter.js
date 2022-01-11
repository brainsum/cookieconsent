import Filter from './Filter';

// ---------------------------------------------
// Filter for option 'dynamic-script'
// ---------------------------------------------
export default class InsertScriptFilter extends Filter {

  constructor() {
    super();
  }

  init() {
    this.overrideAppendChild();
    this.overrideInsertBefore();
  }

  overrideAppendChild() {
    Element.prototype.appendChild = function(elem) {
      if (arguments[0].tagName === 'SCRIPT') {
        if (window.CookieConsent.config.debug) {
          console.log('Trying to append:', arguments[0]);
        }
        for (let key in window.CookieConsent.config.services) {
          // Did user opt-in?
          if(window.CookieConsent.config.services[key].type === 'dynamic-script') {
            if(arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
              if(window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                window.CookieConsent.buffer.appendChild.push({'this': this, 'category': window.CookieConsent.config.services[key].category, arguments: arguments});

                if (window.CookieConsent.config.debug) {
                  console.log('Prevented append of:', arguments[0]);
                }

                return undefined;
              }
            }
          }
        }

        if (window.CookieConsent.config.debug) {
          console.log('Appending:', arguments[0]);
        }
      } 
  
      return Node.prototype.appendChild.apply(this, arguments);
    }
  }

  overrideInsertBefore() {
    Element.prototype.insertBefore = function(elem) {
      if(arguments[0].tagName === 'SCRIPT') {
        if (window.CookieConsent.config.debug) {
          console.log('Trying to insert:', arguments[0]);
        }
        for (let key in window.CookieConsent.config.services) {
          // Did user opt-in?
          if(window.CookieConsent.config.services[key].type === 'dynamic-script') {
            if(arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
              if(window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                window.CookieConsent.buffer.insertBefore.push({'this': this, 'category': window.CookieConsent.config.services[key].category, arguments: arguments});
                
                if (window.CookieConsent.config.debug) {
                  console.log('Prevented insert of:', arguments[0]);
                }
                
                return undefined;
              }
            }
          }
        }

        if (window.CookieConsent.config.debug) {
          console.log('Inserting:', arguments[0]);
        }
      }
  
      return Node.prototype.insertBefore.apply(this, arguments);
    }
  }
}