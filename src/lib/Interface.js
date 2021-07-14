import { el, mount } from 'redom';
import Language from './Language';
import Utilities from "./Utilities";

export default class Interface {

  constructor() {
    this.elements = {};
  }


  buildStyle() {
    return el('style',
      `:root {
        --barColor: ${window.CookieConsent.config.theme.barColor};
        --barTextColor: ${window.CookieConsent.config.theme.barTextColor};
        --barMainButtonTextColor: ${window.CookieConsent.config.theme.barMainButtonTextColor};
        --barMainButtonColor: ${window.CookieConsent.config.theme.barMainButtonColor};
        --modalMainButtonColor: ${window.CookieConsent.config.theme.modalMainButtonColor};
        --modalMainButtonTextColor: ${window.CookieConsent.config.theme.modalMainButtonTextColor};
        --modalMainButtonDarkenColor: ${Utilities.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20)};
      }`);
  }

  buildBar() {
    return el('div#cconsent-bar.ccb--hidden',
        el(`div.ccb__wrapper`,
          el('div.ccb__left',
            el('div.cc-text', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))
          ),
          el('div.ccb__right',
            el('div.ccb__button',
              el('a.ccb__edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting')),
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

        return [el('div.ccm__list', el('span.ccm__list__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalAffectedSolutions')), el('ul', listItems))];
      }
    }
    
    function modalTabGroups() {

      let contentItems = [];

      let i = 0;
      for (let key in window.CookieConsent.config.categories) {

        contentItems.push(el('dl.ccm__tabgroup' + '.' + key + ((window.CookieConsent.config.categories[key].checked) ? '.checked-5jhk' : ''), {'data-category':key},
                            el('dt.ccm__tab-head', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name'),
                              el('a.ccm__tab-head__icon-wedge', 
                                el(document.createElementNS("http://www.w3.org/2000/svg", "svg"), { version: "1.2", preserveAspectRatio: "none", viewBox: "0 0 24 24", class: "icon-wedge-svg", "data-id": "e9b3c566e8c14cfea38af128759b91a3", style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"},
                                  el(document.createElementNS("http://www.w3.org/2000/svg", "path"), { 'xmlns:default': "http://www.w3.org/2000/svg", class: "icon-wedge-angle-down", d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z", style: "fill: rgb(51, 51, 51);" })
                                )
                              ),
                            ),
                            el('dd.ccm__tab-content',
                              el('div.ccm__tab-content__left', 
                                ( ! window.CookieConsent.config.categories[key].needed) && el('div.ccm__switch-component', el('div.status-off', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')),
                                el('div.ccm__switch-group',
                                  el('label.ccm__switch',
                                    el('input.category-onoff', {type:'checkbox', 'data-category': key, 'checked': window.CookieConsent.config.categories[key].checked}),
                                    el('span.ccm__switch__slider')
                                  )
                                ),
                                el('div.status-on', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'on')))
                              ),
                              el('div.right',
                                el('h3', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')),
                                el('p', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')),
                                el('div.ccm__list',
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

    return el('div#cconsent-modal',
      el('div.ccm__content',
        el('div.ccm__content__heading',
          el('h2', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')),
          el('p',
            Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'),
            (window.CookieConsent.config.modalMainTextMoreLink) ? el('a', { href: window.CookieConsent.config.modalMainTextMoreLink, target: '_blank', rel: 'noopener noreferrer' }, Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'learnMore')) : null
          ),
          el('div.ccm__cheading__close', '×')
        ),
        el('div.ccm__content__body',
          el('div.ccm__tabs',
            modalTabGroups()
          )
        ),
        el('div.ccm__footer',
          el('button#ccm__footer__consent-modal-submit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')),
          el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll'))
        )
      )
    );
  }

  modalRedrawIcons() {
    var tabGroups = this.elements['modal'].querySelectorAll('.ccm__tabgroup');

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
            bar.classList.remove('ccb--hidden');
          }, window.CookieConsent.config.barTimeout);
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
  
        this.elements['bar'].classList.add('ccb--hidden');
        this.elements['modal'].classList.remove('ccm--visible');

        this.modalRedrawIcons();
  
      });
    }


    // If you click Cookie settings and open modal
    Array.prototype.forEach.call(document.getElementsByClassName('ccb__edit'), (edit) => {
      edit.addEventListener('click', () => {
        this.elements['modal'].classList.add('ccm--visible');
      });
    });

    // If you click trough the tabs on Cookie settings
    // If you click on/off switch
    this.elements['modal'].querySelector('.ccm__tabs').addEventListener('click', (event) => {

      // If you click trough the tabs on Cookie settings
      if (event.target.classList.contains('ccm__tab-head') || event.target.classList.contains('ccm__tab-head__icon-wedge')) {

        function getDlParent(eventTarget) {
          var parent = eventTarget.parentNode;
          if(parent.nodeName !== 'DL') {
            return getDlParent(parent);
          } else {
            return parent;
          }
        }
        
        var parentDl = getDlParent(event.target);
        
        if(parentDl.classList.contains('ccm__tabgroup--open')) {
          parentDl.classList.remove('ccm__tabgroup--open');
        } else {
          parentDl.classList.add('ccm__tabgroup--open');
        }
      }

      // If you click on/off switch
      if (event.target.classList.contains('category-onoff')) {
        window.CookieConsent.config.categories[event.target.dataset.category].wanted =
        window.CookieConsent.config.categories[event.target.dataset.category].checked = (event.target.checked === true) ? true : false;

        var dt = document.querySelector('.ccm__tabgroup.' + event.target.dataset.category);
        if(event.target.checked === false && dt.classList.contains('checked-5jhk')) {
          dt.classList.remove('checked-5jhk');
        } else {
          dt.classList.add('checked-5jhk');
        }
      }
    });



    // If you click close on open modal
    this.elements['modal'].querySelector('.ccm__cheading__close').addEventListener('click', (event) => {
      this.elements['modal'].classList.remove('ccm--visible');
    });

    // If you click submit on cookie settings
    document.getElementById('ccm__footer__consent-modal-submit').addEventListener('click', () => {

      let switchElements = this.elements['modal'].querySelectorAll('.ccm__switch input');

      Array.prototype.forEach.call(switchElements, (switchElement) => {
        window.CookieConsent.config.categories[switchElement.dataset.category].wanted = switchElement.checked;
      });

      this.buildCookie((cookie) => {
        this.setCookie(cookie, () => {
          this.elements['modal'].classList.remove('ccm--visible');
          this.elements['bar'].classList.add('ccb--hidden');
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
    let cookie = {
      version: window.CookieConsent.config.cookieVersion,
      categories: {},
      services: []
    };
    
    for(let key in window.CookieConsent.config.categories) {
      cookie.categories[key] = {
        wanted: window.CookieConsent.config.categories[key].wanted,
      };
    }

    cookie.services = Utilities.listGlobalServices();
  
    if (callback) callback(cookie);
    return cookie;
  }
  
  setCookie(cookie, callback) {
    const expires_in = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();

    document.cookie = `cconsent=${JSON.stringify(cookie)}; expires=${expires_in}; path=/;`;
    if (callback) callback();
  }
}
