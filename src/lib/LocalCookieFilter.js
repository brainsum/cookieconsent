import Filter from './Filter';

export default class LocalCookieFilter extends Filter {
  
  constructor() {
    super();
  }

  runFilter() {
    this.filterlocalCookies();
  }

  getCookieDescriptor() {
    var cookieDescriptor;
    
    cookieDescriptor = Object.getOwnPropertyDescriptor(document, 'cookie') ||
                       Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

    if (! cookieDescriptor) {
      cookieDescriptor = {};
      cookieDescriptor.get = document.__lookupGetter__("cookie");
      cookieDescriptor.set = document.__lookupSetter__("cookie");
    }

    return cookieDescriptor;
  }

  filterlocalCookies() {

    // TODO - implement buffer
    var blacklist = super.createBlacklist('localcookie');
    var cookieDescriptor = this.getCookieDescriptor();

    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: function () {
        return cookieDescriptor.get.apply(document);
      },
      set: function () {
        var cookieName = arguments[0].split('=')[0];
        if (blacklist.indexOf(cookieName) < 0) return cookieDescriptor.set.apply(document, arguments);
      }
    });
  }
}