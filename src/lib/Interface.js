import { el, mount } from 'redom';
import Utilities from "./Utilities";

export default class Interface {

  constructor() {
    this.elements = {}
  }


  buildStyle() {
    return el('style',
      '#cookie-bar, #cookie-bar * {box-sizing:border-box}', 
      '#cookie-bar {background-color:#2C7CBF; color:#FFF; padding:15px; text-align:right; font-family:sans-serif; font-size:14px; position:fixed; bottom:0; left:0; width:100%; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}', 
      '#cookie-bar.hidden {transform: translateY(100%); display:block;}', 
      '#cookie-bar .wrapper {display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}',
      '#cookie-bar .left {align-self:center; text-align:left; margin: 15px 0;}',
      '#cookie-bar .right {align-self:center; white-space: nowrap;}',
      '#cookie-bar .right > div {display:inline-block; color:#FFF;}',
      '#cookie-bar .right .button {margin-left: 20px}',
      '#cookie-bar a {text-decoration:underline; color:#FFF}',
      '#cookie-bar button {border:none;padding:10px 10px;color:#2C7CBF;background-color:#FFF;}',
      '#cookie-bar a:hover, #cookie-bar button:hover {cursor:pointer;}',
      '#cookie-modal {display:none; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}',
      '#cookie-modal.visible {display:flex}',
      '#cookie-modal .content {width:500px; background-color:#FFF;}',
      '#cookie-modal .heading {text-align:center; border-bottom:1px solid #D8D8D8; padding:20px 0; position:relative;}',
      '#cookie-modal .heading h2 {margin:0}',
      '#cookie-modal .heading .close {font-weight:600; color:#888; cursor:pointer; font-size:26px; position: absolute; right:15px; top: 50%; transform: translateY(-50%)}',
      '#cookie-modal h2, #cookie-modal h3 {margin-top:0}',
      '#cookie-modal .content > .body {display:flex;}',
      '#cookie-modal .content > .body > .left {width:30%; background-color: #EEE;}',
      '#cookie-modal .content > .body > .right {width:70%; min-height: 200px;}',
      '#cookie-modal .content > .body > .left .tab {padding:10px; cursor:pointer; background-color:#EEE; border-bottom:1px solid #D8D8D8}',
      '#cookie-modal .content > .body > .left .tab.active {background-color:#FFF;}',
      '#cookie-modal [class^=tab-content] {display:none; padding:15px 20px}',
      '#cookie-modal [class^=tab-content].visible {display:block}',
      '#cookie-modal [class^=tab-content] > .head {position: relative}',
      '#cookie-modal [class^=tab-content] > .head h3 {padding-right: 75px}',
      '#cookie-modal [class^=tab-content] > .head .status {position: absolute; top: 2px; right: 45px;}',
      '#cookie-modal [class^=tab-content] > .head .switch {position: absolute; top:0; right:0; display: inline-block; width: 40px; height: 20px;}',
      '#cookie-modal [class^=tab-content] > .head .switch input {display:none;}',
      '#cookie-modal [class^=tab-content] > .head .switch .slider  {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s;}',
      '#cookie-modal [class^=tab-content] > .head .switch .slider:before  {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}',
      '#cookie-modal [class^=tab-content] > .head .switch input:checked + .slider  {background-color: #2196F3;}',
      '#cookie-modal [class^=tab-content] > .head .switch input:focus + .slider  {box-shadow: 0 0 1px #2196F3;}',
      '#cookie-modal [class^=tab-content] > .head .switch input:checked + .slider:before  {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}',
      '#cookie-modal [class^=tab-content] .list ul {padding: 0 0 0 16px}',
      '#cookie-modal [class^=tab-content] > .body {color: #888}',
      '#cookie-modal .footer {border-top:1px solid #D8D8D8; padding:10px; display:flex; justify-content:space-between;}',
      '#cookie-modal .footer .left a {line-height:3.3em; font-size:0.7em; color:#000; text-decoration:underline;}',
      '#cookie-modal .footer .right button {border:none; background-color:#2C7CBF; color:#FFF; padding:10px; cursor:pointer}',
      );
  }

  buildBar() {
    return el('div#cookie-bar.hidden',
        el('div.wrapper',
          el('div.left',
            el('div.text', 'This website uses cookies to ensure you get the best experience on our website.')
          ),
          el('div.right',
            el('div.link',
              el('a#consent-edit.consent-edit', 'Cookie settings')
            ),
            el('div.button',
              el('button#consent-give', 'Accept all cookies')
            )
          )
        ),
      );
  }

  buildModal() {
    // Cookie names list middleware
    var listCookies = function(category) {
      var list = [];

      for(let service in window.CookieConsent.config.services) {
        (window.CookieConsent.config.services[service].category === category) && list.push(window.CookieConsent.config.services[service]);
      }
      
      if(list.length) {
        
        var listItems = [];
        
        for(let item in list) {
          var type = Utilities.objectType(list[item].name);

          if(type === 'String') {
            listItems.push(el('li', list[item].name));
          } else if (type === 'Array') {
            for(let name in list[item].name) {
              listItems.push(el('li', list[item].name[name]));
            }
          }
        }

        return [el('ul', listItems)];
      }
    }
    
    // Modal tab list middleware
    var modalTabList = function(elem) {
      let listItems = [];

      function firstIsActive(i) {
        return (i === 0) ? ' active' : '';
      }

      let i = 0;
      for (let key in window.CookieConsent.config.categories) {
        listItems.push(el('div.tab' + firstIsActive(i), window.CookieConsent.config.categories[key].name, {'data-tab': key}));
        i++;
      }

      // Adding last static informational tab
      for (let index in window.CookieConsent.config.settings.postTabs) {
        let tab = window.CookieConsent.config.settings.postTabs[index];
        listItems.push(el('div.tab', tab.tabTitle, {'data-tab':'post' + index}));
      }

      return listItems;
    }

    // Addition tabs after the services
    var postTabs = function(field) {

    }

    // Modal tab content middleware
    var modalTabContentList = function(elem) {
      let content = window.CookieConsent.config.categories;
      let contentItems = [];

      function firstIsVisible(i) {
        return (i === 0) ? ' visible' : '';
      }

      

      let i = 0;
      for (let key in window.CookieConsent.config.categories) {
        contentItems.push(el('div.tab-content-' + key + firstIsVisible(i), {'data-category':key},
                            el('div.head',
                              el('h3', window.CookieConsent.config.categories[key].name),
                              ( ! window.CookieConsent.config.categories[key].needed) && el('div.switch-group',
                                el('span.status', (window.CookieConsent.config.categories[key].wanted === false) ? 'OFF' : 'ON' ),
                                el('label.switch',
                                  el('input.category-onoff', {type:'checkbox', 'data-category': key, 'checked': window.CookieConsent.config.categories[key].wanted}), el('span.slider'))),
                              ),
                              el('div.body',
                                [el('p', window.CookieConsent.config.categories[key].text)]),
                              el('div.list',
                                listCookies(key)))); 
        i++;
      }

      // Adding last static informational content
      for (let index in window.CookieConsent.config.settings.postTabs) {
        let tab = window.CookieConsent.config.settings.postTabs[index];
        contentItems.push(el('div.tab-content-post' + index, {'data-category':'post' + index},
                            el('div.head',
                              el('h3', tab.contentTitle)
                            ),
                            el('div.body',
                              el('p', tab.content)
                            )
                          )); 
      }
      
      return contentItems;
    }

    return el('div#cookie-modal',
      el('div.content',
        el('div.heading',
          el('h2', 'Cookie settings'),
          el('div.close', '×')
        ),
        el('div.body',
          el('div.left', modalTabList()),
          el('div.right', modalTabContentList())
        ),
        el('div.footer',
          el('div.left'),
          el('div.right',
            el('button#cookie-modal-submit', 'Save settings')))));
  }

  render(name, elem, callback) {
    if (typeof callback === 'undefined') callback = function(){};
    if (typeof this.elements[name] !== 'undefined') {
      this.elements[name].parentNode.replaceChild(elem, this.elements[name]);
      this.elements[name] = elem;
      callback(elem);
      return elem;
    } else {
      var insertedElem = mount(document.body, elem);
      if (insertedElem) {
        this.elements[name] = insertedElem;
      }
      callback(insertedElem);
      return insertedElem;
    }

  }

  buildInterface(callback) {

    if (typeof callback === 'undefined') callback = function(){};
    var that = this;

    Utilities.ready(function() {

      that.render('style', that.buildStyle());

      that.render('bar', that.buildBar(), (bar) => {

        // Show the bar after a while
        if ( ! window.CookieConsent.config.cookieExists) {
          setTimeout(() => {
            bar.classList.remove('hidden');
          }, 3000);
        }
      });

      that.render('modal', that.buildModal());

      callback();
    });
  }

  addEventListeners(elements) {

    // If you click Accept all cookies
    document.getElementById('consent-give').addEventListener('click', () => {

      // We set config to full consent
      for(let key in window.CookieConsent.config.categories) {
        window.CookieConsent.config.categories[key].wanted = true;
      }
      
      this.writeBufferToDOM();

      this.buildCookie((cookie) => {
        this.setCookie(cookie);
      });

      this.elements['bar'].classList.add('hidden');

    });

    // If you click Cookie settings and open modal
    Array.prototype.forEach.call(document.getElementsByClassName('consent-edit'), (edit) => {
      edit.addEventListener('click', () => {
        this.elements['modal'].classList.add('visible');
      });
    });

    // If you click trough the tabs on Cookie settings
    this.elements['modal'].querySelector('.left').addEventListener('click', (event) => {
      if (event.target.classList.contains('tab')) {
        if (event.target.dataset.tab) {
          let tabContents = this.elements['modal'].querySelectorAll('[class^=tab-content]');
          let tabs = this.elements['modal'].querySelectorAll('.tab');

          Array.prototype.forEach.call(tabs, (tab) => {
            tab.classList.remove('active');
          });

          Array.prototype.forEach.call(tabContents, (tabContent) => {
            tabContent.classList.remove('visible');
          });

          event.target.classList.add('active');
          this.elements['modal'].querySelector(`[class=tab-content-${event.target.dataset.tab}]`).classList.add('visible');
        }
      }
    });

    // If you click trough the tabs on Cookie settings
    this.elements['modal'].querySelector('.close').addEventListener('click', (event) => {
      this.elements['modal'].classList.remove('visible');
    });

    // If you switch on and off categories
    this.elements['modal'].querySelector('.right').addEventListener('click', (event) => {
      if (event.target.classList.contains('category-onoff')) {
        let status = event.target.parentNode.previousSibling;
        if (event.target.checked === false) {
          window.CookieConsent.config.categories[event.target.dataset.category].wanted = false;
          status.textContent = 'OFF'
        } else if (event.target.checked === true) {
          status.textContent = 'ON'
          window.CookieConsent.config.categories[event.target.dataset.category].wanted = true;
        }
      }
    });

    // If you click submit on cookie settings
    document.getElementById('cookie-modal-submit').addEventListener('click', () => {

      let switchElements = this.elements['modal'].querySelectorAll('.switch input');

      Array.prototype.forEach.call(switchElements, (switchElement) => {
        window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElements.checked;
      });

      this.buildCookie((cookie) => {
        this.setCookie(cookie, () => {
          this.elements['modal'].classList.remove('visible');
          this.elements['bar'].classList.add('hidden');
        });
      });

      this.writeBufferToDOM();

    });
  }

  writeBufferToDOM() {

    window.CookieConsent.buffer.appendChild.forEach(function(action, index) {
      if (window.CookieConsent.config.categories[action.category].wanted === true) {
        Node.prototype.appendChild.apply(action.this, action.arguments);
      }
    });
  
    window.CookieConsent.buffer.insertBefore.forEach(function(action) {
      if (window.CookieConsent.config.categories[action.category].wanted === true) {
        Node.prototype.insertBefore.apply(action.this, action.arguments);
      }
    });
  }

  buildCookie(callback) {
    let cookie = {};
    
    for(let key in window.CookieConsent.config.categories) {
      cookie[key] = window.CookieConsent.config.categories[key].wanted;
    }
  
    if (callback) callback(cookie);
    return cookie;
  }
  
  setCookie(cookie, callback) {
    document.cookie = `cconsent=${JSON.stringify(cookie)}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/;`;
    if (callback) callback();
  }
  
  removeCookie(cookie) {
    document.cookie = `cconsent=; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/;`;
  }

}