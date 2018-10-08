import InsertScriptFilter from './InsertScriptFilter';
import ScriptTagFilter from './ScriptTagFilter';
import WrapperFilter from './WrapperFilter';
import LocalCookieFilter from './LocalCookieFilter';
import Interface from './Interface';
import Configuration from './Configuration';

export default class CookieConsent {

  init(configObject) {
    new Configuration(configObject);

    const insertScriptFilter = new InsertScriptFilter();
    const scriptTagFilter = new ScriptTagFilter();
    const wrapperFilter = new WrapperFilter();
    const localCookieFilter = new LocalCookieFilter();

    console.log('init filters')

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