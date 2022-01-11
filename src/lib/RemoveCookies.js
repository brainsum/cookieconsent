import Utilities from "./Utilities";

export default class RemoveCookies {

  init() {
    this.removeUnwantedCookies();
  }

  removeUnwantedCookies() {
    let cookieList = [];
    let config = window.CookieConsent.config;

    document.cookie.split(';').map(function(a){
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
            } 
            else if (type === 'RegExp') {
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
