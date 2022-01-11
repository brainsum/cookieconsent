import Filter from './Filter';

// ---------------------------------------------
// Filter for option 'wrapped'
// ---------------------------------------------
export default class WrapperFilter extends Filter {
  
  constructor() {
    super();
  }

  init() {
    this.filterWrappers();
  }

  filterWrappers() {
    var blacklist = super.createBlacklist('wrapped');

    function wrapper(name='', callback) {
      if (blacklist.indexOf(name) < 0) {
        callback();
      }
    }

    window.CookieConsent.wrapper = wrapper;
  }
}