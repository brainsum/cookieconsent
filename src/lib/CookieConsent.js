import InsertScriptFilter from './InsertScriptFilter';
import ScriptTagFilter from './ScriptTagFilter';
import WrapperFilter from './WrapperFilter';
import LocalCookieFilter from './LocalCookieFilter';
import Interface from './Interface';
import Configuration from './Configuration';
import RemoveCookies from './RemoveCookies';

export default class CookieConsent {

  init(configObject) {
    new Configuration(configObject);

    const removeCookies = new RemoveCookies();
    const insertScriptFilter = new InsertScriptFilter();
    const scriptTagFilter = new ScriptTagFilter();
    const wrapperFilter = new WrapperFilter();
    const localCookieFilter = new LocalCookieFilter();

    removeCookies.init();
    insertScriptFilter.init();
    scriptTagFilter.init();
    wrapperFilter.init();
    localCookieFilter.init();

    const UI = new Interface();

    UI.buildInterface(() => {
      UI.addEventListeners();
    });
  }

}