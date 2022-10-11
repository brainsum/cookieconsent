import { el, mount } from 'redom';
import Language from './Language';
import Utilities from "./Utilities";

export default class Interface {

  constructor() {
    this.elements = {};
  }


  buildStyle() {
    return el('style',
      '#cconsent-bar, #cconsent-bar * { box-sizing:border-box }',
      '#cconsent-bar .visually-hide, #cconsent-modal .visually-hide { position: absolute !important; overflow: hidden !important; clip: rect(1px 1px 1px 1px) !important; clip: rect(1px, 1px, 1px, 1px) !important;width: 1px !important; height: 1px !important; }',
      '#cconsent-bar { background-color:' + window.CookieConsent.config.theme.barColor + '; color:' + window.CookieConsent.config.theme.barTextColor + '; padding:15px; text-align:right; font-family:sans-serif; font-size:14px; line-height:18px; position:fixed; bottom:0; left:0; width:100%; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}',
      '#cconsent-bar.ccb--hidden {transform: translateY(100%); display:block;}',
      '#cconsent-bar .ccb__wrapper { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}',
      '#cconsent-bar .ccb__left { align-self:center; text-align:left; margin: 15px 0;}',
      '#cconsent-bar .ccb__right { align-self:center; white-space: nowrap;}',
      '#cconsent-bar .ccb__right > div {display:inline-block; color:#FFF;}',
      '#cconsent-bar button { line-height:normal; font-size:14px; border:0; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}',
      '#cconsent-bar button.consent-give { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonColor + ';}',
      '#cconsent-bar button.consent-decline { line-height:normal; font-size:14px; border:none; padding:10px 10px; color:' + window.CookieConsent.config.theme.barMainButtonColor + '; background-color:' + window.CookieConsent.config.theme.barMainButtonTextColor + '; margin-right: 10px; border: 1px solid ' + window.CookieConsent.config.theme.barMainButtonColor + '}',
      '#cconsent-bar button.ccb__edit { -moz-appearance:none; -webkit-appearance:none; appearance:none; margin-right:15px; border:0; padding:0; text-decoration:underline; color:' + window.CookieConsent.config.theme.barTextColor + '; background:none; }',
      '#cconsent-bar a:hover, #cconsent-bar button:hover { cursor:pointer; }',
      '#cconsent-modal { display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}',
      '@media (max-width: 600px) { #cconsent-modal { height: 100% } }',
      '#cconsent-modal button { border: 0 }',
      '#cconsent-modal h2, #cconsent-modal h3 {color:#333}',
      '#cconsent-modal.ccm--visible {display:flex}',
      '#cconsent-modal .ccm__content { max-width:600px; min-height:500px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; }',
      '@media (max-width: 600px) { #cconsent-modal .ccm__content { max-width:100vw; height:100%; max-height:initial; }}',
      '#cconsent-modal .ccm__content > .ccm__content__heading { border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative; }',
      '#cconsent-modal .ccm__content > .ccm__content__heading h2 { font-size:21px; font-weight:600; color:#333; margin:0 }',
      '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close { -moz-appearance:none; -webkit-appearance:none; appearance:none; padding:0; border:0; font-weight:600; color:#888; cursor:pointer; font-size:26px; position:absolute; right:15px; top:15px; width:26px; height:26px; background:none; text-align:center; }',
      '#cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close:focus { box-shadow: 0 0 0 0.25rem ' + window.CookieConsent.config.theme.focusColor + '; }',
      '#cconsent-modal h2, #cconsent-modal h3 { margin-top:0 }',
      '#cconsent-modal .ccm__content > .ccm__content__body { background-color:#FFF; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup { margin:0; border-bottom: 1px solid #D8D8D8; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {color:#333; font-weight:600; cursor:pointer; position:relative; padding:0; margin:0; transition: background-color .5s ease-out; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head:hover { background-color:#F9F9F9 }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status { order: 1; position:absolute; left:35px; font-weight: 600; display:inline-block; margin-right: 20px; pointer-events: none; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--checked { font-size:1em; color:#28a834; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--unchecked { font-size:1.4em; color:#e56385; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__text { order: 2; pointer-events: none; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge { transition: transform .3s ease-out; transform-origin: center; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%); order: 3;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge > svg { pointer-events: none; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head .ccm__tab-head__icon-wedge { transform:translateY(-50%) rotate(-180deg) }',
      '#cconsent-modal .ccm__tab-trigger { appearance: none; background: none; display: flex; flex-direction: row; width: 100%; padding:17px 35px 17px 56px; color:#333; font-weight:600; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content {padding:0; margin:0}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content { max-height: 0; overflow: hidden; opacity: 0; transition: all .5s ease-out; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content__inner { display: flex; flex-direction: row; padding:25px 35px; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head { background-color:#f9f9f9 }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content { max-height: 900px; opacity: 1; }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose {order:1;}',
      '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {flex-direction:column} }',
      '@media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose { margin-bottom:20px; } }',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-component {display:flex; margin-right:35px; align-items:center;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__status {font-weight:600;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group {background:none; width:40px; height:20px; margin:0 10px; position:relative;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; -webkit-transition: .4s; transition: .4s; pointer-events: none;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider:before {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; -webkit-transition: .4s; transition: .4s;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider {background-color: #28A834;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group:focus {box-shadow: 0 0 0 2px' + window.CookieConsent.config.theme.focusColor + ';}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider:before {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__desc {order:2;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content h3 {font-size:18px; margin-bottom:10px; line-height:1;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content p {color:#444; margin-bottom:0}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list:not(:empty) {margin-top:30px;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list .ccm__list__title {color:#333; font-weight:600;}',
      '#cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list ul { margin:15px 0; padding-left:15px }',
      '#cconsent-modal .ccm__footer { padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }',
      '#cconsent-modal .ccm__footer button { line-height:normal; font-size:14px; transition: background-color .5s ease-out; background-color:' + window.CookieConsent.config.theme.modalMainButtonColor + '; color:' + window.CookieConsent.config.theme.modalMainButtonTextColor + '; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; }',
      '#cconsent-modal .ccm__footer button:hover { background-color:' + Utilities.lightenDarkenColor(window.CookieConsent.config.theme.modalMainButtonColor, -20) + '; }',
      '#cconsent-modal .ccm__footer button + button { margin-left: 10px; }'
      );
  }

  buildBar() {
    return el('div#cconsent-bar.ccb--hidden',
        el(`div.ccb__wrapper`,
          el('div.ccb__left',
            el('div.cc-text', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barMainText'))
          ),
          el('div.ccb__right',
            el('div.ccb__button',
              el('button.ccb__edit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barLinkSetting')),
              window.CookieConsent.config.showRejectAllButton && el('button.consent-decline', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnRejectAll')),
              el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'barBtnAcceptAll'))
            )
          )
        ),
      { role: 'region', 'aria-label': Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'cookieBarLabel'), 'aria-hidden': 'true', tabindex: '-1' });
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
        let tabId = Math.random().toString(16).slice(2);

        contentItems.push(
          el('dl.ccm__tabgroup' + '.' + key + ((window.CookieConsent.config.categories[key].checked) ? '.checked-5jhk' : ''), {'data-category':key},
            el('dt.ccm__tab-head',
              el('button#ccm__tab-trigger--' + tabId + '.ccm__tab-trigger',
                el('span.ccm__tab-head__text', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')),
                el('span.ccm__tab-head__status' + ((window.CookieConsent.config.categories[key].checked) ? '.ccm__tab-head__status--checked' : '.ccm__tab-head__status--unchecked'), ((window.CookieConsent.config.categories[key].checked) ? '✔' : '×'), { 'aria-label': ((window.CookieConsent.config.categories[key].checked) ? Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'checked') : Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'unchecked')) }),
                el('span.ccm__tab-head__icon-wedge',
                  el(document.createElementNS("http://www.w3.org/2000/svg", "svg"), { version: "1.2", preserveAspectRatio: "none", viewBox: "0 0 24 24", class: "icon-wedge-svg", "data-id": "e9b3c566e8c14cfea38af128759b91a3", style: "opacity: 1; mix-blend-mode: normal; fill: rgb(51, 51, 51); width: 32px; height: 32px;"},
                    el(document.createElementNS("http://www.w3.org/2000/svg", "path"), { 'xmlns:default': "http://www.w3.org/2000/svg", class: "icon-wedge-angle-down", d: "M17.2,9.84c0-0.09-0.04-0.18-0.1-0.24l-0.52-0.52c-0.13-0.13-0.33-0.14-0.47-0.01c0,0-0.01,0.01-0.01,0.01  l-4.1,4.1l-4.09-4.1C7.78,8.94,7.57,8.94,7.44,9.06c0,0-0.01,0.01-0.01,0.01L6.91,9.6c-0.13,0.13-0.14,0.33-0.01,0.47  c0,0,0.01,0.01,0.01,0.01l4.85,4.85c0.13,0.13,0.33,0.14,0.47,0.01c0,0,0.01-0.01,0.01-0.01l4.85-4.85c0.06-0.06,0.1-0.15,0.1-0.24  l0,0H17.2z", style: "fill: rgb(51, 51, 51);" }
                    ),
                  ),
                ), { 'aria-expanded': 'false', 'aria-controls': 'ccm__tab-content--' + tabId }
              ),
            ),
            el('dd#ccm__tab-content--' + tabId + '.ccm__tab-content',
              el('div.ccm__tab-content__inner',
                el('div.ccm__tab-content__desc',
                  el('h3#ccm__tab-content__title--' + tabId, Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')),
                  el('p', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'description')),
                  el('div.ccm__list',
                    listCookies(key)
                  )
                ),
                el('div.ccm__tab-content__choose',
                  (!window.CookieConsent.config.categories[key].needed) && el('div.ccm__switch-component', el('span.ccm__switch__status.status-off', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'off')),
                    el('button.ccm__switch-group',
                      el('span.ccm__switch__text.visually-hide', Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name')),
                      el('span.ccm__switch__slider'),
                      { 'role': 'switch', 'data-category': key, 'aria-checked': window.CookieConsent.config.categories[key].checked, 'aria-label': Language.getTranslation(window.CookieConsent.config.categories[key], window.CookieConsent.config.language.current, 'name') }
                    ),
                    el('span.ccm__switch__status.status-on', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'on')))
                ),
              ), { 'role': 'region', 'aria-labelledby': 'ccm__tab-trigger--' + tabId, 'aria-hidden': 'true' },
            ),
          ),
        );

        i++;
      }

      return contentItems;
    }

    return el('dialog#cconsent-modal',
      el('div.ccm__content',
        el('div.ccm__content__heading',
          el('h2#ccm__content__title', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainTitle')),
          el('p',
            Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalMainText'),
            (window.CookieConsent.config.modalMainTextMoreLink) ? el('a', { href: window.CookieConsent.config.modalMainTextMoreLink, target: '_blank', rel: 'noopener noreferrer' }, Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'learnMore')) : null
          ),
          el('button.ccm__cheading__close', '×', { 'aria-label': Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'closeAriaLabel') })
        ),
        el('div.ccm__content__body',
          el('div.ccm__tabs',
            modalTabGroups()
          )
        ),
        el('div.ccm__footer',
          el('button#ccm__footer__consent-modal-submit', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnSave')),
          window.CookieConsent.config.showRejectAllButton && el('button.consent-decline', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnRejectAll')),
          el('button.consent-give', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'modalBtnAcceptAll'))
        )
      ), { 'aria-labelledby': 'ccm__content__title', 'aria-hidden': 'true' }
    );
  }

  modalRedrawIcons() {
    var tabGroups = this.elements['modal'].querySelectorAll('.ccm__tabgroup');

    for(let tabGroup of tabGroups) {
      var lightSwitch = tabGroup.querySelector('button.ccm__switch-group');
      var tabStatus = tabGroup.querySelector('.ccm__tab-head__status');

      if(window.CookieConsent.config.categories[tabGroup.dataset.category].checked) {
        if( ! tabGroup.classList.contains('checked-5jhk')) {
          tabGroup.classList.add('checked-5jhk');
          lightSwitch.setAttribute('aria-checked', 'true');
          tabStatus.classList.remove('ccm__tab-head__status--unchecked');
          tabStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'checked'));
          tabStatus.textContent = '✔';
          tabStatus.classList.add('ccm__tab-head__status--checked');
        };
      } else {
        if(tabGroup.classList.contains('checked-5jhk')) tabGroup.classList.remove('checked-5jhk');
        lightSwitch.setAttribute('aria-checked', 'false');
        tabStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'unchecked'));
        tabStatus.textContent = '×';
        tabStatus.classList.add('ccm__tab-head__status--unchecked');
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
      var insertedElem = mount(document.body, elem, document.body.firstChild);
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
            bar.setAttribute('aria-hidden', 'false');
            bar.setAttribute('tabindex', '0');
          }, window.CookieConsent.config.barTimeout);
        }
      });

      that.render('modal', that.buildModal());

      callback();
    });
  }

  addEventListeners(elements) {

    // Set the default state for modal
    var modalOpen = false;

    var focusTarget = document.querySelector('#cconsent-bar').nextElementSibling.nextElementSibling;

    // If you click Accept all cookies
    var buttonConsentGive = document.querySelectorAll('.consent-give');

    for (let button of buttonConsentGive) {
      button.addEventListener('click', () => {

        // We set config to full consent
        for (let key in window.CookieConsent.config.categories) {
          window.CookieConsent.config.categories[key].wanted =
          window.CookieConsent.config.categories[key].checked = true;
        }

        this.writeBufferToDOM();

        this.buildCookie((cookie) => {
          this.setCookie(cookie);
        });

        this.elements['bar'].classList.add('ccb--hidden');
        this.elements['bar'].setAttribute('aria-hidden', 'true');
        this.elements['bar'].setAttribute('tabindex', '-1');
        this.elements['modal'].classList.remove('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'true');
        this.elements['modal'].setAttribute('tabindex', '-1');
        focusTarget.focus();
        modalOpen = false;

        this.modalRedrawIcons();

      });
    }

    // If you click Reject all cookies
    var buttonConsentDecline = document.querySelectorAll('.consent-decline');

    for(let button of buttonConsentDecline) {
      button.addEventListener('click', () => {

        // We set config to full consent only in is needed
        for(let key in window.CookieConsent.config.categories) {
            window.CookieConsent.config.categories[key].wanted =
            window.CookieConsent.config.categories[key].checked = window.CookieConsent.config.categories[key].needed;
        }

        this.writeBufferToDOM();

        this.buildCookie((cookie) => {
          this.setCookie(cookie);
        });

        this.elements['bar'].classList.add('ccb--hidden');
        this.elements['bar'].setAttribute('aria-hidden', 'true');
        this.elements['bar'].setAttribute('tabindex', '-1');
        this.elements['modal'].classList.remove('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'true');
        this.elements['modal'].setAttribute('tabindex', '-1');
        focusTarget.focus();
        modalOpen = false;

        this.modalRedrawIcons();

      });
    }


    // If you click Cookie settings and open modal
    Array.prototype.forEach.call(document.getElementsByClassName('ccb__edit'), (edit) => {
      edit.addEventListener('click', () => {
        modalOpen = true;
        this.elements['modal'].classList.add('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'false');
        this.elements['modal'].setAttribute('tabindex', '0');
        this.elements['modal'].querySelector('.ccm__content').focus();
      });
    });

    // If you click trough the tabs on Cookie settings
    // If you click on/off switch
    this.elements['modal'].querySelector('.ccm__tabs').addEventListener('click', (event) => {
      // If you click trough the tabs on Cookie settings
      if (event.target.classList.contains('ccm__tab-trigger') || event.target.classList.contains('ccm__tab-head__icon-wedge')) {

        function getDlParent(eventTarget) {
          var parent = eventTarget.parentNode;
          if (parent.nodeName !== 'DL') {
            return getDlParent(parent);
          } else {
            return parent;
          }
        }

        var parentDl = getDlParent(event.target);

        if (parentDl.classList.contains('ccm__tabgroup--open')) {
          parentDl.classList.remove('ccm__tabgroup--open');
          event.target.setAttribute('aria-expanded', 'false');
          parentDl.querySelector('.ccm__tab-content').setAttribute('aria-hidden', 'true');
        } else {
          parentDl.classList.add('ccm__tabgroup--open');
          event.target.setAttribute('aria-expanded', 'true');
          parentDl.querySelector('.ccm__tab-content').setAttribute('aria-hidden', 'false');
        }
      }

      // If you click on/off switch
      if (event.target.classList.contains('ccm__switch-group')) {
        var status = event.target.getAttribute('aria-checked');
        var label = event.target.textContent.trim();
        var dl = document.querySelector('.ccm__tabgroup.' + event.target.dataset.category);
        var dlStatus = document.querySelector('.ccm__tabgroup.' + event.target.dataset.category + ' .ccm__tab-head__status');

        window.CookieConsent.config.categories[event.target.dataset.category].wanted =
        window.CookieConsent.config.categories[event.target.dataset.category].checked = (status === 'true') ? false : true;
        event.target.setAttribute('aria-checked', status !== 'true');

        dl.classList.remove('checked-5jhk');
        dlStatus.classList.remove('ccm__tab-head__status--checked');
        dlStatus.classList.remove('ccm__tab-head__status--unchecked');

        if (status !== 'true') {
          event.target.setAttribute('aria-label', label + ' ' + Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'enabled'));
          dl.classList.add('checked-5jhk');
          dlStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'checked'));
          dlStatus.textContent = '✔';
          dlStatus.classList.add('ccm__tab-head__status--checked');
        } else {
          event.target.setAttribute('aria-label', label + ' ' + Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'disabled'));
          dl.classList.remove('checked-5jhk');
          dlStatus.setAttribute('aria-label', Language.getTranslation(window.CookieConsent.config, window.CookieConsent.config.language.current, 'unchecked'));
          dlStatus.textContent = '×';
          dlStatus.classList.add('ccm__tab-head__status--unchecked');
        }
      }
    });



    // If you click close on open modal
    this.elements['modal'].querySelector('.ccm__cheading__close').addEventListener('click', (event) => {
      this.elements['modal'].classList.remove('ccm--visible');
      this.elements['modal'].setAttribute('aria-hidden', 'true');
      this.elements['modal'].setAttribute('tabindex', '-1');
      modalOpen = false;
    });

    document.addEventListener('keydown', (event) => {
      if (modalOpen && (!event.keyCode || event.keyCode === 27)) {
        this.elements['modal'].classList.remove('ccm--visible');
        this.elements['modal'].setAttribute('aria-hidden', 'true');
        this.elements['modal'].setAttribute('tabindex', '-1');
        modalOpen = false;
      }
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
          this.elements['modal'].setAttribute('aria-hidden', 'true');
          this.elements['bar'].classList.add('ccb--hidden');
          this.elements['bar'].setAttribute('aria-hidden', 'true');
          this.elements['bar'].setAttribute('tabindex', '-1');
          this.elements['modal'].setAttribute('tabindex', '-1');
          focusTarget.focus();
          modalOpen = false;
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
