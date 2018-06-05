//import Polyglot from 'node-polyglot';
//var polyglot = new Polyglot();
import { el, setChildren, mount } from 'redom';


document.CookieConsent = document.CookieConsent || {};

document.CookieConsent.config = {
  language: 'en',
  categories: {
    necessary: {
      name: 'Strictly Necessary Cookies',
      active: true,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.'
    },
    functional: {
      name: 'Performance Cookies',
      active: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.'
    },
    social: {
      name: 'Social media',
      active: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.'
    },
    targeting: {
      name: 'Targeting Cookies',
      active: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.'
    },
  },
  services: {
    facebook: {
      cookieName: 'fr',
      name: 'Facebook',
      category: 'social',
      type: 'script-tag',
      search: 'fbevents.js'
    },
    twitter: {
      cookieName: 'tw',
      name: 'Twitter',
      category: 'social',
      type: 'script-tag',
      search: 'twitter.js'
    }
  }
}

document.CookieConsent.buffer = {
  appendChild: [],
  insertBefore: []
}

;(function () {
  
  var consent = false;
  var dasad;

  // Checking for the value in cookie named "consent"
  if (document.cookie.indexOf('consent=1') < 0 ) {
    consent = false;
  } else {
    consent = true;
  }

  var appendChild = Element.prototype.appendChild;
  var insertBefore = Element.prototype.insertBefore;

  
  Element.prototype.appendChild = function(elem) {
    
    console.log('Appending:', arguments);

    if ( ! consent) {
      if(arguments[0].tagName === 'SCRIPT') {
        console.log(arguments[0])
        document.CookieConsent.buffer.appendChild.push({'this': this, arguments: arguments});
        return undefined;
      }
    }

    return appendChild.apply(this, arguments);
  }
  
  Element.prototype.insertBefore = function(elem) {
    
    console.log('Inserting:', arguments);

    if ( ! consent) {
      if(arguments[0].tagName === 'SCRIPT') {
        for (let key in document.CookieConsent.config.services) {
          console.log(key)
          if(document.CookieConsent.config.services[key].type === 'script-tag') {
            if(arguments[0].outerHTML.indexOf(document.CookieConsent.config.services[key].search) >= 0) {
              document.CookieConsent.buffer.insertBefore.push({'this': this, arguments: arguments});
              return undefined;
            }
          }
        }
      } 
    }

    return insertBefore.apply(this, arguments);
  }



  buildInterface(function(){

    var cookieModal = document.getElementById('cookie-modal');

    // If you click Accept all cookies
    document.getElementById('consent-give').addEventListener('click', function () {

      consent = true;
      console.log('Cookie consent given!')

      document.cookie = 'consent=1; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/;';
      
      document.CookieConsent.buffer.appendChild.forEach(function(action, index){
        appendChild.apply(action.this, action.arguments);
      });

      document.CookieConsent.buffer.insertBefore.forEach(function(action){
        insertBefore.apply(action.this, action.arguments);
      });

    });

    // If you click Cookie settings
    document.getElementById('consent-edit').addEventListener('click', function () {
      cookieModal.classList.add('visible');
    });

    cookieModal.querySelector('.left').addEventListener('click', function(event){
      if (event.target.classList.contains('tab')) {
        if (event.target.dataset.tab) {
          let tabContents = cookieModal.querySelectorAll('[class^=tab-content]');
          let tabs = cookieModal.querySelectorAll('.tab');

          tabs.forEach((tab) => {
            tab.classList.remove('active');
          });

          tabContents.forEach((tabContent) => {
            tabContent.classList.remove('visible');
          });

          event.target.classList.add('active');
          cookieModal.querySelector(`[class=tab-content-${event.target.dataset.tab}]`).classList.add('visible');
        }
      }
    });

  });



  // document.addEventListener('readystatechange', function (event) {
  //   if (event.target.readyState === "complete") {
        

  //     document.getElementById('consent-revoke').addEventListener('click', function () {
  //       console.log('revoke');
  //       document.cookie = "consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  //     });
  //   }
  // });

})();



function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}



function buildInterface(callback) {

  ready(function() {
    var style = el('style',
    '#cookie-bar, #cookie-bar * {box-sizing:border-box}', 
    '#cookie-bar {background-color:#63B3E3; color:#FFF; padding:20px 15px; text-align:right; font-family:sans-serif; font-size:14px; position:fixed; bottom:0; left:0; width:100%; z-index:998;}', 
    '#cookie-bar>div {display:inline-block}',
    '#cookie-bar a {text-decoration:underline; margin-right:20px}',
    '#cookie-bar button {border:none;padding:10px 10px;color:#63B3E3;background-color:#FFF;}',
    '#cookie-bar a:hover, #cookie-bar button:hover {cursor:pointer;}',
    '#cookie-modal {display:none; width: 100vw; height: 100vh; position:absolute; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.3); z-index:999; align-items:center; justify-content:center;}',
    '#cookie-modal.visible {display:flex}',
    '#cookie-modal .content {max-width:600px; background-color:#FFF;}',
    '#cookie-modal .heading {text-align:center; border-bottom:1px solid #D8D8D8; padding:20px 0}',
    '#cookie-modal .heading h2 {margin:0}',
    '#cookie-modal h2, #cookie-modal h3 {margin-top:0}',
    '#cookie-modal .left, #cookie-modal .right {display:inline-block;vertical-align:top}',
    '#cookie-modal .left {width:30%}',
    '#cookie-modal .right {width:70%}',
    '#cookie-modal .tab {padding:10px; cursor:pointer; background-color:#EEE; border-bottom:1px solid #D8D8D8}',
    '#cookie-modal .tab:last-child {border-bottom:none}',
    '#cookie-modal .tab.active {background-color:#FFF;}',
    '#cookie-modal [class^=tab-content] {display:none; padding:10px 20px}',
    '#cookie-modal [class^=tab-content].visible {display:block}',
    );

    var bar =
    el('div#cookie-bar',
      [el('div.link', el('a#consent-edit', 'Cookie settings')),
      el('div.button', el('button#consent-give', 'Accept all cookies'))]);

    
    // Modal tab list middleware
    var modalTabList = function(elem) {
      let listItems = [];

      listItems.push(el('div.tab.active', 'Your Privacy', {'data-tab':'first'}));
      for (let key in document.CookieConsent.config.categories) {
        listItems.push(el('div.tab', document.CookieConsent.config.categories[key].name, {'data-tab': key})); 
      }
      listItems.push(el('div.tab', 'More Information', {'data-tab':'last'}));

      setChildren(elem, listItems);
    }

    // Modal tab content middleware
    var modalTabContentList = function(elem) {
      let contentItems = [];

      contentItems.push(el('div.tab-content-first.visible', [el('h3', 'Your Privacy'), el('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper. Nam eros sem, varius et vehicula sagittis, vulputate sed augue. Quisque id sem bibendum, convallis odio ac, egestas tellus. Duis rhoncus rutrum metus et maximus.')])); 
      for (let key in document.CookieConsent.config.categories) {
        contentItems.push(el('div.tab-content-' + key, [el('h3', document.CookieConsent.config.categories[key].name), el('p', document.CookieConsent.config.categories[key].text)])); 
      }
      contentItems.push(el('div.tab-content-last', [el('h3', 'More Information'), el('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper. Nam eros sem, varius et vehicula sagittis, vulputate sed augue. Quisque id sem bibendum, convallis odio ac, egestas tellus. Duis rhoncus rutrum metus et maximus.')])); 
      
      setChildren(elem, contentItems);
    }

    var modal =
    el('div#cookie-modal',
      el('div.content',
        [el('div.heading',
          el('h2', 'Cookie settings')),
        el('div.left', modalTabList),
        el('div.right', modalTabContentList)]));

    mount(document.body, bar);
    mount(document.body, modal);
    mount(document.body, style);

    callback();
  });

}



