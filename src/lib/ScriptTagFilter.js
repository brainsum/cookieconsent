import Utilities from "./Utilities";
import Filter from './Filter';

export default class ScriptTagFilter extends Filter {
  
  constructor() {
    super();
  }

  runFilter() {
    this.filterTags();
  }

  filterTags() {
    Utilities.ready(() => {
      var blacklist = super.createBlacklist('script-tag');
      var scriptTags = document.querySelectorAll('script[type="text/plain"]');
      
      for (var scriptTag of scriptTags) {
        if (blacklist.indexOf(scriptTag.dataset.consent) < 0) {
          var newtag = scriptTag.cloneNode();
          newtag.type = 'application/javascript';
          var parentNode = scriptTag.parentNode;
          parentNode.insertBefore(newtag,scriptTag);
          parentNode.removeChild(scriptTag);
        }
      }
    });
  }
}