import Utilities from "./Utilities";
import Filter from './Filter';

// ---------------------------------------------
// Filter for option 'script-tag'
// ---------------------------------------------
export default class ScriptTagFilter extends Filter {
  
  constructor() {
    super();
  }

  init() {
    this.filterTags();
  }

  filterTags() {
    Utilities.ready(() => {
      var blacklist = super.createBlacklist('script-tag');
      var scriptTags = document.querySelectorAll('script[type="text/plain"]');
      
      for (var scriptTag of scriptTags) {
        if (blacklist.indexOf(scriptTag.dataset.consent) < 0) {
          var newtag = document.createElement('script');
          var parentNode = scriptTag.parentNode;
          
          scriptTag.type = 'text/javascript';

          for(var attribute of scriptTag.attributes) {
            newtag.setAttribute(attribute.nodeName, attribute.nodeValue);
          }

          if (window.CookieConsent.config.debug) {
            console.log('Inserting script-tag:', scriptTag);
          }

          newtag.innerHTML = scriptTag.innerHTML;
          // insert new script block as type text/javascript
          parentNode.insertBefore(newtag,scriptTag);
          // remove the old one
          parentNode.removeChild(scriptTag);
        }
      }
    });
  }
}