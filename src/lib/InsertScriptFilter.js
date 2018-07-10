import Filter from './Filter';

export default class InsertScriptFilter extends Filter {

  constructor() {
    super();
  }

  runFilter() {
    this.overrideAppendChild();
    this.overrideInsertBefore();
  }

  overrideAppendChild() {

    Element.prototype.appendChild = function(elem) {
      if(arguments[0].tagName === 'SCRIPT') {
        console.log('Appending:', arguments);
        for (let key in window.CookieConsent.config.services) {
          // Did user opt-in?
          if(window.CookieConsent.config.services[key].type === 'dynamic-script') {
            if(arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
              if(window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                window.CookieConsent.buffer.appendChild.push({'this': this, 'category': window.CookieConsent.config.services[key].category, arguments: arguments});
                return undefined;
              }
            }
          }
        }
      } 
  
      return Node.prototype.appendChild.apply(this, arguments);
    }

  }

  overrideInsertBefore() {

    Element.prototype.insertBefore = function(elem) {
    
      if(arguments[0].tagName === 'SCRIPT') {
        console.log('Inserting:', arguments);
        for (let key in window.CookieConsent.config.services) {
          // Did user opt-in?
          if(window.CookieConsent.config.services[key].type === 'dynamic-script') {
            if(arguments[0].outerHTML.indexOf(window.CookieConsent.config.services[key].search) >= 0) {
              if(window.CookieConsent.config.categories[window.CookieConsent.config.services[key].category].wanted === false) {
                window.CookieConsent.buffer.insertBefore.push({'this': this, 'category': window.CookieConsent.config.services[key].category, arguments: arguments});
                return undefined;
              }
            }
          }
        }
      }
  
      return Node.prototype.insertBefore.apply(this, arguments);
    }
  }

}