import { el, mount } from 'redom';
import Language from './Language';
import Utilities from "./Utilities";

export default class Interface {

  constructor() {
    this.elements = {};
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
      '#cookie-bar a {text-decoration:underline; color:#FFF}',
      '#cookie-bar button {border:none;padding:10px 10px;color:#2C7CBF;background-color:#FFF;}',
      '#cookie-bar a.consent-edit { margin-right:15px }',
      '#cookie-bar a:hover, #cookie-bar button:hover {cursor:pointer;}',
      '#cookie-modal {display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}',
      '@media (max-width: 600px) { #cookie-modal { height: 100% } }',
      '#cookie-modal h2, #cookie-modal h3 {color:#333}',
      '#cookie-modal.visible {display:flex}',
      '#cookie-modal .content { max-width:600px; min-height:500px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; }',
      '@media (max-width: 600px) { #cookie-modal .content { max-width:100vw; height:100%; max-height:initial; }}',
      '#cookie-modal .content > .heading {border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative;}',
      '#cookie-modal .content > .heading h2 {color:#333; margin:0}',
      '#cookie-modal .content > .heading p {}',
      '#cookie-modal .content > .heading .close {font-weight:600; color:#888; cursor:pointer; font-size:26px; position: absolute; right:15px; top: 15px;}',
      '#cookie-modal h2, #cookie-modal h3 {margin-top:0}',
      '#cookie-modal .content > .body { background-color:#FFF;}',
      '#cookie-modal .content > .body .tabgroup {margin:0; border-bottom: 1px solid #D8D8D8; }',
      '#cookie-modal .content > .body .tabgroup .tab-head::before { position:absolute; left:35px; font-size:1.4em; font-weight: 600; color:#E56385; content:"×"; display:inline-block; margin-right: 20px;}',
      '#cookie-modal .content > .body .tabgroup.checked .tab-head::before {font-size:1em; content:"✔"; color:#28A834}',
      '#cookie-modal .content > .body .tabgroup .tab-head .icon-wedge { transition: transform .3s ease-out; transform-origin: 16px 6px 0; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%)}',
      '#cookie-modal .content > .body .tabgroup .tab-head .icon-wedge > svg { pointer-events: none; }',
      '#cookie-modal .content > .body .tabgroup.open .tab-head .icon-wedge {transform:rotate(-180deg)}',
      '#cookie-modal .content > .body .tab-head {color:#333; padding:17px 35px 17px 56px; margin:0}',
      '#cookie-modal .content > .body .tab-content {padding:25px 35px; margin:0}',
      '#cookie-modal .content > .body .tab-head { transition: background-color .5s ease-out }',
      '#cookie-modal .content > .body .tab-head:hover { background-color:#F9F9F9 }',
      '#cookie-modal .content > .body .tab-head {font-weight:600; cursor:pointer; position:relative;}',
      '#cookie-modal .content > .body .tabgroup .tab-content {display:none;}',
      '#cookie-modal .content > .body .tabgroup.open .tab-head { background-color:#F9F9F9 }',
      '#cookie-modal .content > .body .tabgroup.open .tab-content {display:flex;}',
      '@media (max-width: 600px) { #cookie-modal .content > .body .tabgroup.open .tab-content {flex-direction:column} }',
      '@media (max-width: 600px) { #cookie-modal .content > .body .tab-content .left { margin-bottom:20px; } }',
      '#cookie-modal .content > .body .tab-content .left .switch-component {display:flex; margin-right:35px; align-items:center;}',
      '#cookie-modal .content > .body .tab-content .left .switch-component > div {font-weight:600;}',
      '#cookie-modal .content > .body .tab-content .left .switch-group {width:40px; height:20px; margin:0 10px; position:relative;}',
      '#cookie-modal .content > .body .tab-content .left .switch {position: absolute; top:0; right:0; display: inline-block; width: 40px; height: 20px;}',
      '#cookie-modal .content > .body .tab-content .left .switch input {display:none;}',
      '#cookie-modal .content > .body .tab-content .left .switch .slider  {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s;}',
      '#cookie-modal .content > .body .tab-content .left .switch .slider:before  {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}',
      '#cookie-modal .content > .body .tab-content .left .switch input:checked + .slider  {background-color: #28A834;}',
      '#cookie-modal .content > .body .tab-content .left .switch input:focus + .slider  {box-shadow: 0 0 1px #28A834;}',
      '#cookie-modal .content > .body .tab-content .left .switch input:checked + .slider:before  {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}',
      '#cookie-modal .content > .body .tab-content h3 {font-size:18px; margin-bottom:10px; line-height:1;}',
      '#cookie-modal .content > .body .tab-content p {color:#444; margin-bottom:0}',
      '#cookie-modal .content > .body .tab-content .list:not(:empty) {margin-top:30px;}',
      '#cookie-modal .content > .body .tab-content .list .title {color:#333; font-weight:600;}',
      '#cookie-modal .content > .body .tab-content .list ul {padding-left:15px}',
      '#cookie-modal .footer {padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }',
      '#cookie-modal .footer button { transition: background-color .5s ease-out; background-color:#4285F4; color:#FFF; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; }',
      '#cookie-modal .footer button:hover { background-color: #346BC5; }',
      '#cookie-modal .footer button#cookie-modal-submit {  margin-right:10px; }',
      '#cookie-modal .footer button#cookie-modal-submit:hover { background-color: #346bC5 }'
      );
  }

  buildBar() {
    return el('div#cookie-bar.hidden',
        el('div.wrapper',
          el('div.left',
            el('div.text', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))
          ),
          el('div.right',
            el('div.button',
              el('a.consent-edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting')),
              el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnAcceptAll'))
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
          listItems.push(el('li', Language.getTranslation(list[item], window.CookieConsent.config.language.current, 'name')));
        }

        return [el('div.list', el('span.title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalAffectedSolutions')), el('ul', listItems))];
      }
    }
    
    function modalTabGroups() {

      let contentItems = [];

      let i = 0;
      for (let key in window.CookieConsent.config.categories) {

        contentItems.push(el('dl.tabgroup' + '.' + key + ((window.CookieConsent.config.categories[key].checked) ? '.checked' : ''), {'data-category':key},
                            el('dt.tab-head', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name'),
                              el('a.icon-wedge', 
                                el(document.createElementNS("http://www.w3.org/2000/svg", "svg"), { version: "1.2", preserveAspectRatio: "none", viewBox: "0 0 24 24", class: "icon-wedge-svg", "data-id": "e9b3c566e8c14cfea38af128759b91a3", style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"},
                                  el(document.createElementNS("http://www.w3.org/2000/svg", "path"), { 'xmlns:default': "http://www.w3.org/2000/svg", id: "angle-down", d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z", style: "fill: rgb(51, 51, 51);" })
                                )
                              ),
                            ),
                            el('dd.tab-content',
                              el('div.left', 
                                ( ! window.CookieConsent.config.categories[key].needed) && el('div.switch-component', el('div.status-off', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')),
                                el('div.switch-group',
                                  el('label.switch',
                                    el('input.category-onoff', {type:'checkbox', 'data-category': key, 'checked': window.CookieConsent.config.categories[key].checked}),
                                    el('span.slider')
                                  )
                                ),
                                el('div.status-on', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'on')))
                              ),
                              el('div.right',
                                el('h3', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')),
                                el('p', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')),
                                el('div.list',
                                  listCookies(key)
                                )
                              )
                            )
                          )
                        );

        i++;
      }

      return contentItems;
    }

    return el('div#cookie-modal',
      el('div.content',
        el('div.heading',
          el('h2', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')),
          el('p',
            Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'),
            (window.CookieConsent.config.modalMainTextMoreLink) ? el('a', { href: window.CookieConsent.config.modalMainTextMoreLink, target: '_blank', rel: 'noopener noreferrer' }, Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')) : null
          ),
          el('div.close', '×')
        ),
        el('div.body',
          el('div.tabs',
            modalTabGroups()
          )
        ),
        el('div.footer',
          el('button#cookie-modal-submit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')),
          el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll'))
        )
      )
    );
  }

  modalRedrawIcons() {
    var tabGroups = this.elements['modal'].querySelectorAll('.tabgroup');

    for(let tabGroup of tabGroups) {
      if(window.CookieConsent.config.categories[tabGroup.dataset.category].checked) {
        if( ! tabGroup.classList.contains('checked')) {
          tabGroup.classList.add('checked');
          tabGroup.querySelector('input.category-onoff').checked = true;
        };
      } else {
        if(tabGroup.classList.contains('checked')) tabGroup.classList.remove('checked');
        tabGroup.querySelector('input.category-onoff').checked = false;
      }
    }
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
    var buttonConsentGive = document.querySelectorAll('.consent-give');

    for(let button of buttonConsentGive) {
      button.addEventListener('click', () => {
  
        // We set config to full consent
        for(let key in window.CookieConsent.config.categories) {
          window.CookieConsent.config.categories[key].wanted =
          window.CookieConsent.config.categories[key].checked = true;
        }
        
        this.writeBufferToDOM();
  
        this.buildCookie((cookie) => {
          this.setCookie(cookie);
        });
  
        this.elements['bar'].classList.add('hidden');
        this.elements['modal'].classList.remove('visible');

        this.modalRedrawIcons();
  
      });
    }


    // If you click Cookie settings and open modal
    Array.prototype.forEach.call(document.getElementsByClassName('consent-edit'), (edit) => {
      edit.addEventListener('click', () => {
        this.elements['modal'].classList.add('visible');
      });
    });

    // If you click trough the tabs on Cookie settings
    // If you click on/off switch
    this.elements['modal'].querySelector('.tabs').addEventListener('click', (event) => {

      // If you click trough the tabs on Cookie settings
      if (event.target.classList.contains('tab-head') || event.target.classList.contains('icon-wedge')) {

        function getDlParent(eventTarget) {
          var parent = eventTarget.parentNode;
          if(parent.nodeName !== 'DL') {
            return getDlParent(parent);
          } else {
            return parent;
          }
        }
        
        var parentDl = getDlParent(event.target);
        
        if(parentDl.classList.contains('open')) {
          parentDl.classList.remove('open');
        } else {
          parentDl.classList.add('open');
        }
      }

      // If you click on/off switch
      if (event.target.classList.contains('category-onoff')) {
        window.CookieConsent.config.categories[event.target.dataset.category].wanted =
        window.CookieConsent.config.categories[event.target.dataset.category].checked = (event.target.checked === true) ? true : false;

        var dt = document.querySelector('.tabgroup.' + event.target.dataset.category);
        if(event.target.checked === false && dt.classList.contains('checked')) {
          dt.classList.remove('checked');
        } else {
          dt.classList.add('checked');
        }
      }
    });



    // If you click close on open modal
    this.elements['modal'].querySelector('.close').addEventListener('click', (event) => {
      this.elements['modal'].classList.remove('visible');
    });

    // If you click submit on cookie settings
    document.getElementById('cookie-modal-submit').addEventListener('click', () => {

      let switchElements = this.elements['modal'].querySelectorAll('.switch input');

      Array.prototype.forEach.call(switchElements, (switchElement) => {
        window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
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

    for(let action of window.CookieConsent.buffer.appendChild) {
      if (window.CookieConsent.config.categories[action.category].wanted === true) {
        Node.prototype.appendChild.apply(action.this, action.arguments);
      }
    }

    for(let action of window.CookieConsent.buffer.insertBefore) {
      if (window.CookieConsent.config.categories[action.category].wanted === true) {
        action.arguments[1] = (action.arguments[0].parentNode === null) ? action.this.lastChild : action.arguments[1];
        Node.prototype.insertBefore.apply(action.this, action.arguments);
      }
    }
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
