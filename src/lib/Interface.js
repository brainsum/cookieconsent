import { el, mount } from 'redom';
import Language from './Language';
import Utilities from "./Utilities";

export default class Interface {

  constructor() {
    this.elements = {};
  }


  buildStyle() {
    return el('style',
      '#ccookie-bar-9e2f, #ccookie-bar-9e2f * { box-sizing:border-box }', 
      '#ccookie-bar-9e2f { background-color:' + window.CookieConsent.config.theme.barColor + '; color:' + window.CookieConsent.config.theme.barTextColor + '; padding:15px; text-align:right; font-family:sans-serif; font-size:14px; position:fixed; bottom:0; left:0; width:100%; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}', 
      '#ccookie-bar-9e2f.hidden-e9bd {transform: translateY(100%); display:block;}', 
      '#ccookie-bar-9e2f .wrapper-84d2 { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}',
      '#ccookie-bar-9e2f .left-e768 { align-self:center; text-align:left; margin: 15px 0;}',
      '#ccookie-bar-9e2f .right-7514 { align-self:center; white-space: nowrap;}',
      '#ccookie-bar-9e2f .right-7514 > div {display:inline-block; color:#FFF;}',
      '#ccookie-bar-9e2f a { text-decoration:underline; color:' + window.CookieConsent.config.theme.barTextColor + '; }',
      '#ccookie-bar-9e2f button { border:none;padding:10px 10px;color:' + window.CookieConsent.config.theme.barMainButtonTextColor + ';background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}',
      '#ccookie-bar-9e2f a.cconsent-edit { margin-right:15px }',
      '#ccookie-bar-9e2f a:hover, #ccookie-bar-9e2f button:hover {cursor:pointer;}',
      '#ccookie-modal-h345 {display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}',
      '@media (max-width: 600px) { #ccookie-modal-h345 { height: 100% } }',
      '#ccookie-modal-h345 h2, #ccookie-modal-h345 h3 {color:#333}',
      '#ccookie-modal-h345.visible-t67z {display:flex}',
      '#ccookie-modal-h345 .content-98v5 { max-width:600px; min-height:500px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; }',
      '@media (max-width: 600px) { #ccookie-modal-h345 .content-98v5 { max-width:100vw; height:100%; max-height:initial; }}',
      '#ccookie-modal-h345 .content-98v5 > .heading-o8i1 {border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative;}',
      '#ccookie-modal-h345 .content-98v5 > .heading-o8i1 h2 {color:#333; margin:0}',
      '#ccookie-modal-h345 .content-98v5 > .heading-o8i1 p {}',
      '#ccookie-modal-h345 .content-98v5 > .heading-o8i1 .close-u36t {font-weight:600; color:#888; cursor:pointer; font-size:26px; position: absolute; right:15px; top: 15px;}',
      '#ccookie-modal-h345 h2, #ccookie-modal-h345 h3 {margin-top:0}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n { background-color:#FFF;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op {margin:0; border-bottom: 1px solid #D8D8D8; }',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op .tab-head-ggt5::before { position:absolute; left:35px; font-size:1.4em; font-weight: 600; color:#E56385; content:"×"; display:inline-block; margin-right: 20px;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op.checked-5jhk .tab-head-ggt5::before {font-size:1em; content:"✔"; color:#28A834}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op .tab-head-ggt5 .icon-wedge-77xr { transition: transform .3s ease-out; transform-origin: 16px 6px 0; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%)}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op .tab-head-ggt5 .icon-wedge-77xr > svg { pointer-events: none; }',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op.open-7z69 .tab-head-ggt5 .icon-wedge-77xr {transform:rotate(-180deg)}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-head-ggt5 {color:#333; padding:17px 35px 17px 56px; margin:0}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f {padding:25px 35px; margin:0}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-head-ggt5 { transition: background-color .5s ease-out }',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-head-ggt5:hover { background-color:#F9F9F9 }',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-head-ggt5 {font-weight:600; cursor:pointer; position:relative;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op .tab-content-s56f {display:none;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op.open-7z69 .tab-head-ggt5 { background-color:#F9F9F9 }',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op.open-7z69 .tab-content-s56f {display:flex;}',
      '@media (max-width: 600px) { #ccookie-modal-h345 .content-98v5 > .body-p88n .tabgroup-87op.open-7z69 .tab-content-s56f {flex-direction:column} }',
      '@media (max-width: 600px) { #ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 { margin-bottom:20px; } }',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-component-43dr {display:flex; margin-right:35px; align-items:center;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-component-43dr > div {font-weight:600;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-group-8h1q {width:40px; height:20px; margin:0 10px; position:relative;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-9t6j {position: absolute; top:0; right:0; display: inline-block; width: 40px; height: 20px;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-9t6j input {display:none;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-9t6j .slider-v14a  {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-9t6j .slider-v14a:before  {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-9t6j input:checked + .slider-v14a  {background-color: #28A834;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-9t6j input:focus + .slider-v14a  {box-shadow: 0 0 1px #28A834;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .left-e768 .switch-9t6j input:checked + .slider-v14a:before  {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f h3 {font-size:18px; margin-bottom:10px; line-height:1;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f p {color:#444; margin-bottom:0}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .list-5fr4:not(:empty) {margin-top:30px;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .list-5fr4 .title-0ftr {color:#333; font-weight:600;}',
      '#ccookie-modal-h345 .content-98v5 > .body-p88n .tab-content-s56f .list-5fr4 ul {padding-left:15px}',
      '#ccookie-modal-h345 .footer-rrt8 {padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }',
      '#ccookie-modal-h345 .footer-rrt8 button { transition: background-color .5s ease-out; background-color:' + window.CookieConsent.config.theme.modalMainButtonColor + '; color:' + window.CookieConsent.config.theme.modalMainButtonTextColor + '; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; }',
      '#ccookie-modal-h345 .footer-rrt8 button:hover { background-color:' + Utilities.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20) + '; }',
      '#ccookie-modal-h345 .footer-rrt8 button#ccookie-modal-submit-6zhn {  margin-right:10px; }'
      );
  }

  buildBar() {
    return el('div#ccookie-bar-9e2f.hidden-e9bd',
        el(`div.wrapper-84d2`,
          el('div.left-e768',
            el('div.text', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))
          ),
          el('div.right-7514',
            el('div.button',
              el('a.cconsent-edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting')),
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

        return [el('div.list-5fr4', el('span.title-0ftr', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalAffectedSolutions')), el('ul', listItems))];
      }
    }
    
    function modalTabGroups() {

      let contentItems = [];

      let i = 0;
      for (let key in window.CookieConsent.config.categories) {

        contentItems.push(el('dl.tabgroup-87op' + '.' + key + ((window.CookieConsent.config.categories[key].checked) ? '.checked-5jhk' : ''), {'data-category':key},
                            el('dt.tab-head-ggt5', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name'),
                              el('a.icon-wedge-77xr', 
                                el(document.createElementNS("http://www.w3.org/2000/svg", "svg"), { version: "1.2", preserveAspectRatio: "none", viewBox: "0 0 24 24", class: "icon-wedge-svg", "data-id": "e9b3c566e8c14cfea38af128759b91a3", style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"},
                                  el(document.createElementNS("http://www.w3.org/2000/svg", "path"), { 'xmlns:default': "http://www.w3.org/2000/svg", id: "angle-down", d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z", style: "fill: rgb(51, 51, 51);" })
                                )
                              ),
                            ),
                            el('dd.tab-content-s56f',
                              el('div.left-e768', 
                                ( ! window.CookieConsent.config.categories[key].needed) && el('div.switch-component-43dr', el('div.status-off', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')),
                                el('div.switch-group-8h1q',
                                  el('label.switch-9t6j',
                                    el('input.category-onoff', {type:'checkbox', 'data-category': key, 'checked': window.CookieConsent.config.categories[key].checked}),
                                    el('span.slider-v14a')
                                  )
                                ),
                                el('div.status-on', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'on')))
                              ),
                              el('div.right-7514',
                                el('h3', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')),
                                el('p', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')),
                                el('div.list-5fr4',
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

    return el('div#ccookie-modal-h345',
      el('div.content-98v5',
        el('div.heading-o8i1',
          el('h2', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')),
          el('p',
            Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'),
            (window.CookieConsent.config.modalMainTextMoreLink) ? el('a', { href: window.CookieConsent.config.modalMainTextMoreLink, target: '_blank', rel: 'noopener noreferrer' }, Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')) : null
          ),
          el('div.close-u36t', '×')
        ),
        el('div.body-p88n',
          el('div.tabs',
            modalTabGroups()
          )
        ),
        el('div.footer-rrt8',
          el('button#ccookie-modal-submit-6zhn', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')),
          el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll'))
        )
      )
    );
  }

  modalRedrawIcons() {
    var tabGroups = this.elements['modal'].querySelectorAll('.tabgroup-87op');

    for(let tabGroup of tabGroups) {
      if(window.CookieConsent.config.categories[tabGroup.dataset.category].checked) {
        if( ! tabGroup.classList.contains('checked-5jhk')) {
          tabGroup.classList.add('checked-5jhk');
          tabGroup.querySelector('input.category-onoff').checked = true;
        };
      } else {
        if(tabGroup.classList.contains('checked-5jhk')) tabGroup.classList.remove('checked-5jhk');
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
            bar.classList.remove('hidden-e9bd');
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
  
        this.elements['bar'].classList.add('hidden-e9bd');
        this.elements['modal'].classList.remove('visible-t67z');

        this.modalRedrawIcons();
  
      });
    }


    // If you click Cookie settings and open modal
    Array.prototype.forEach.call(document.getElementsByClassName('cconsent-edit'), (edit) => {
      edit.addEventListener('click', () => {
        this.elements['modal'].classList.add('visible-t67z');
      });
    });

    // If you click trough the tabs on Cookie settings
    // If you click on/off switch
    this.elements['modal'].querySelector('.tabs').addEventListener('click', (event) => {

      // If you click trough the tabs on Cookie settings
      if (event.target.classList.contains('tab-head-ggt5') || event.target.classList.contains('icon-wedge')) {

        function getDlParent(eventTarget) {
          var parent = eventTarget.parentNode;
          if(parent.nodeName !== 'DL') {
            return getDlParent(parent);
          } else {
            return parent;
          }
        }
        
        var parentDl = getDlParent(event.target);
        
        if(parentDl.classList.contains('open-7z69')) {
          parentDl.classList.remove('open-7z69');
        } else {
          parentDl.classList.add('open-7z69');
        }
      }

      // If you click on/off switch
      if (event.target.classList.contains('category-onoff')) {
        window.CookieConsent.config.categories[event.target.dataset.category].wanted =
        window.CookieConsent.config.categories[event.target.dataset.category].checked = (event.target.checked === true) ? true : false;

        var dt = document.querySelector('.tabgroup-87op.' + event.target.dataset.category);
        if(event.target.checked === false && dt.classList.contains('checked-5jhk')) {
          dt.classList.remove('checked-5jhk');
        } else {
          dt.classList.add('checked-5jhk');
        }
      }
    });



    // If you click close on open modal
    this.elements['modal'].querySelector('.close-u36t').addEventListener('click', (event) => {
      this.elements['modal'].classList.remove('visible-t67z');
    });

    // If you click submit on cookie settings
    document.getElementById('ccookie-modal-submit-6zhn').addEventListener('click', () => {

      let switchElements = this.elements['modal'].querySelectorAll('.switch-9t6j input');

      Array.prototype.forEach.call(switchElements, (switchElement) => {
        window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
      });

      this.buildCookie((cookie) => {
        this.setCookie(cookie, () => {
          this.elements['modal'].classList.remove('visible-t67z');
          this.elements['bar'].classList.add('hidden-e9bd');
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
