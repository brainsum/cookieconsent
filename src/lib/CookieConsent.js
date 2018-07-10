import InsertScriptFilter from './InsertScriptFilter';
import ScriptTagFilter from './ScriptTagFilter';
import WrapperFilter from './WrapperFilter';
import LocalCookieFilter from './LocalCookieFilter';
import Interface from './Interface';
import Utilities from './Utilities';

export default class CookieConsent {

  constructor() {
    // If consent cookie exists, were parsing its content to config
    Utilities.cookieToConfig();
  }
  
  init() {
    var insertScriptFilter = new InsertScriptFilter();
    var scriptTagFilter = new ScriptTagFilter();
    var wrapperFilter = new WrapperFilter();
    var localCookieFilter = new LocalCookieFilter();

    insertScriptFilter.runFilter();
    scriptTagFilter.runFilter();
    wrapperFilter.runFilter();
    localCookieFilter.runFilter();


    var UI = new Interface();

    UI.buildInterface(() => {
      UI.addEventListeners();
    });


  }

}