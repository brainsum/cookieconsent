export default class Utilities {

  static ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  static objectType(obj){
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  static cookieToConfig() {
    document.cookie.split(';').filter((item) => {
      if (item.indexOf('cconsent')  >= 0) {
        window.CookieConsent.config.cookieExists = true;
        var cookieData = JSON.parse(item.split('=')[1]);
        for (let key in cookieData) {
          window.CookieConsent.config.categories[key].wanted = cookieData[key];
        }
        return true;
      }
    });
    
    return false;
  }

}