import Filter from './Filter';

export default class WrapperFilter extends Filter {
  
  constructor() {
    super();
  }

  runFilter() {
    this.filterWrappers();
  }

  filterWrappers() {
    var blacklist = super.createBlacklist('wrapped');

    function wrapper(name='', callback) {
      if (blacklist.indexOf(name) < 0) {
        callback();
      }
    }

    window.CookieConsent.functions.wrapper = wrapper;
  }
}