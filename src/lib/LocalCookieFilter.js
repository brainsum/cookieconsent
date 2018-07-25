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
      cookieDescriptor.get = HTMLDocument.prototype.__lookupGetter__("cookie");
      cookieDescriptor.set = HTMLDocument.prototype.__lookupSetter__("cookie");

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
        var cookieArguments = arguments;

        if(blacklist.length) {
          var cookieName = arguments[0].split('=')[0];
          Array.prototype.forEach.call(blacklist, function(blacklistItem){
            if (cookieName.indexOf(blacklistItem) < 0) cookieDescriptor.set.apply(document, cookieArguments);
          });
        } else {
          cookieDescriptor.set.apply(document, cookieArguments);
        }
      }
    });
  }
}