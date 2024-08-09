# Cookieconsent Script

A script that displays a cookie consent message as required by EU regulation (GDPR). The plugin displays a message on the user's first visit and they have the ability to consent to different categories of cookies and services.

See the demo: [Cookieconsent](https://brainsum.github.io/cookieconsent/)

## Default look

![Cookieconsent modal](cc_modal_75.png 'Cookieconsent modal')

## Features

- Four different blocking methods
- Multilingual
- Mobile ready

Currently it can block all the bad cookie monsters in 4 ways:

### Dynamic script tags

Some services insert dynamically created SCRIPT tags to the HEAD at page load. These can be intercepted and blocked.

### Script tag blocking

Some third party services require you to insert a SCRIPT tag into your HTML pages. These can be inactivated until the user allowes them.

### Script wrapping

Some services are not inserted in a SCRIPT tag and are obscured by layers of other code. Thats why this script creates a global wrapper function what you can use to wrap and block any JS code.

### Local cookies

Finally the local cookies set on your domain can be also filtered by overriding the bowsers COOKIE SET method.

## Usage

1. Download the file cookieconsent.zip from the [latest release](https://github.com/brainsum/cookieconsent/releases/latest) and unpack its content.

2. Include the script file into your HTML page **before everything else.**

```html
<script src="cookieconsent.js"></script>
```

3. Call the `init()` function with the configuration object.

See a working example in the docs folder.

### Configuration object

The script is being controlled mainly by a configuration object which is passed to the inital call. It acts as configuration and a global state object.

```javascript
<script>
  window.CookieConsent.init({
    // How long to wait until bar or initial modal comes up.
    UITimeout: 1000,
    // Show 'bar' or 'modal' initial layout
    mode: 'bar'
    // Show the 'reject all cookies' button. It's false by default.
    showRejectAllButton: false,
    // Look and feel.
    theme: {
      barColor: '#2C7CBF',
      barTextColor: '#FFF',
      barMainButtonColor: '#FFF',
      barMainButtonTextColor: '#2C7CBF',
      modalMainButtonColor: '#4285F4',
      modalMainButtonTextColor: '#FFF',
      focusColor: 'rgb(853 238 52 / 75%)'
    },

    // You can declare a 'customCSS' property to partially customize the default CSS instead of customizing specific properties described on the 'theme' object. The value of this property should be a template string as in the example. Bear in mind that this style will be injected in the document body.
    customCSS: `
      #cconsent-bar, #cconsent-bar * { box-sizing:border-box; }
      #cconsent-bar .visually-hide, #cconsent-modal .visually-hide { position: absolute !important; overflow: hidden !important; clip-path: rect(1px 1px 1px 1px) !important; width: 1px !important; height: 1px !important; }
      #cconsent-bar { background-color: red; color: black; padding:15px; text-align:right; font-family:inherit; font-size:14px; line-height:18px; position:fixed; bottom:0; inset-inline:0; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}
      #cconsent-bar.ccb--hidden {transform: translateY(100%); display:block; visible:hidden;}
    `,

    // Optionally, you have the chance to fully override the CSS as per your requirements. This options gives you full freedom but you'll have to declare CSS for the UI elements. The resulted style will be injected in the document head.
    fullCSSOverride: `
      #cconsent-bar, #cconsent-bar * { box-sizing:border-box }
      #cconsent-bar .visually-hide, #cconsent-modal .visually-hide { position: absolute !important; overflow: hidden !important; clip-path: rect(1px 1px 1px 1px) !important; width: 1px !important; height: 1px !important; }
      #cconsent-bar { background-color: #2b7abb; color: #fff; padding:15px; text-align:right; font-family:inherit; font-size:14px; line-height:18px; position:fixed; bottom:0; inset-inline:0; z-index:9998; transform: translateY(0); transition: transform .6s ease-in-out; transition-delay: .3s;}
      #cconsent-bar.ccb--hidden {transform: translateY(100%); display:block; visible:hidden;}
      #cconsent-bar .ccb__wrapper { display:flex; flex-wrap:wrap; justify-content:space-between; max-width:1800px; margin:0 auto;}
      #cconsent-bar .ccb__left { align-self:center; text-align:left; margin: 15px 0;}
      #cconsent-bar .ccb__right { align-self:center; white-space: nowrap;}
      #cconsent-bar .ccb__right > div {display:inline-block; color:#FFF;}
      #cconsent-bar button { line-height:normal; font-size:14px; border:0; padding:10px 10px; color: #2b7abb;}
      #cconsent-bar button.consent-give { line-height:normal; font-size:14px; border:none; padding:10px 10px; color: #2b7abb; background-color: #fff;}
      #cconsent-bar button.consent-decline { line-height:normal; font-size:14px; border:none; padding:10px 10px; color: #fff; background-color: #2b7abb; margin-right: 10px; border: 1px solid #fff}
      #cconsent-bar button.ccb__edit { appearance:none; margin-right:15px; border:0; padding:0; text-decoration:underline; color: #fff; background:none; }
      #cconsent-bar a:hover, #cconsent-bar button:hover { cursor:pointer; }
      #cconsent-bar button:focus-visible {box-shadow: 0 0 0 2px rgb(40 168 52 / 75%);}
      #cconsent-modal, #cconsent-init-modal { display:none; font-size:14px; line-height:18px; color:#666; width: 100vw; height: 100vh; position:fixed; left:0; top:0; right:0; bottom:0; font-family:sans-serif; font-size:14px; background-color:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center;}
      @media (max-width: 600px) { #cconsent-modal, #cconsent-init-modal { height: 100% } }
      #cconsent-modal button, #cconsent-init-modal button { border: 0 }
      #cconsent-modal strong, #cconsent-init-modal strong {color:#333; margin-top:0}
      #cconsent-modal.ccm--visible, #cconsent-init-modal.ccm--visible {display:flex}
      #cconsent-modal .ccm__content, #cconsent-init-modal .ccm__content { max-width:600px; max-height:600px; overflow-Y:auto; background-color:#EFEFEF; display:flex; flex-direction:column; justify-content:space-between; }
      @media (max-width: 600px) { #cconsent-modal .ccm__content, #cconsent-init-modal .ccm__content { max-width:100vw; height:100%; max-height:initial; }}
      #cconsent-modal .ccm__content > .ccm__content__heading, #cconsent-init-modal .ccm__content > .ccm__content__heading { border-bottom:1px solid #D8D8D8; padding:35px 35px 20px; background-color:#EFEFEF; position:relative; }
      #cconsent-modal .ccm__content > .ccm__content__heading strong, #cconsent-init-modal .ccm__content > .ccm__content__heading strong { font-size:21px; font-weight:600; color:#333; margin:0 }
      #cconsent-modal .ccm__content > .ccm__content__heading p, #cconsent-init-modal .ccm__content > .ccm__content__heading p { margin-top:1rem; margin-bottom:1rem; }
      #cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close, #cconsent-init-modal .ccm__content > .ccm__content__heading .ccm__cheading__close { appearance:none; padding:0; border:0; font-weight:600; color:#888; cursor:pointer; font-size:26px; position:absolute; right:15px; top:15px; width:26px; height:26px; background:none; text-align:center; }
      #cconsent-modal .ccm__content > .ccm__content__heading .ccm__cheading__close:focus-visible, #cconsent-init-modal .ccm__content > .ccm__content__heading .ccm__cheading__close:focus-visible { box-shadow: 0 0 0 0.25rem rgb(40 168 52 / 75%); }
      #cconsent-modal .ccm__content > .ccm__content__body { background-color:#FFF; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup { margin:0; border-bottom: 1px solid #D8D8D8; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head {color:#333; font-weight:600; cursor:pointer; position:relative; padding:0; margin:0; transition: background-color .5s ease-out; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head:hover { background-color:#F9F9F9 }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status { order: 1; position:absolute; left:35px; font-weight: 600; display:inline-block; margin-right: 20px; pointer-events: none; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--checked { font-size:1em; color:#28a834; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__status.ccm__tab-head__status--unchecked { font-size:1.4em; color:#e56385; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-head__text { order: 2; pointer-events: none; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge { transition: transform .3s ease-out; transform-origin: center; position:absolute;right:25px; top:50%; transform:rotate(0deg); transform:translateY(-50%); order: 3;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-head .ccm__tab-head__icon-wedge > svg { pointer-events: none; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head .ccm__tab-head__icon-wedge { transform:translateY(-50%) rotate(-180deg) }
      #cconsent-modal .ccm__tab-trigger { appearance: none; background: none; display: flex; flex-direction: row; width: 100%; padding:17px 35px 17px 56px; color:#333; font-weight:600; }
      #cconsent-modal .ccm__tab-trigger:focus-visible {box-shadow: 0 0 0 2px rgb(40 168 52 / 75%);}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content {padding:0; margin:0}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content { overflow: hidden; display: none; transition: all .5s ease-out; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup .ccm__tab-content__inner { display: flex; flex-direction: row; padding:25px 35px; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-head { background-color:#f9f9f9 }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content { max-height: 900px; display: block; }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose {order:1;}
      @media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tabgroup.ccm__tabgroup--open .ccm__tab-content {flex-direction:column} }
      @media (max-width: 600px) { #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose { margin-bottom:20px; } }
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-component {display:flex; margin-right:35px; align-items:center;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__status {font-weight:600;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group {background:none; width:40px; height:20px; margin:0 10px; position:relative;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius:10px; transition: .4s; pointer-events: none;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch__slider:before {position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; border-radius:50%; transition: .4s;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider {background-color: #28A834;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group:focus-visible {box-shadow: 0 0 0 2px rgb(40 168 52 / 75%);}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__choose .ccm__switch-group[aria-checked="true"] .ccm__switch__slider:before {-webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px);}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__tab-content__desc {order:2;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content strong {font-size:18px; margin-bottom:10px; line-height:1;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content p {color:#444; margin-bottom:0}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list:not(:empty) {margin-top:30px;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list .ccm__list__title {color:#333; font-weight:600;}
      #cconsent-modal .ccm__content > .ccm__content__body .ccm__tab-content .ccm__list ul { margin:15px 0; padding-left:15px }
      #cconsent-modal .ccm__footer, #cconsent-init-modal .ccm__footer { padding:35px; background-color:#EFEFEF; text-align:center; display: flex; align-items:center; justify-content:flex-end; }
      #cconsent-modal .ccm__footer button, #cconsent-init-modal .ccm__footer button { line-height:normal; font-size:14px; transition: background-color .5s ease-out; background-color: #1e6ef4; color: #fff; border:none; padding:13px; min-width:110px; border-radius: 2px; cursor:pointer; height: 100%; }
      #cconsent-modal .ccm__footer button:hover, #cconsent-init-modal .ccm__footer button:hover { background-color: #181616; }
      #cconsent-modal .ccm__footer button:focus-within, #cconsent-init-modal .ccm__footer button:focus-within { box-shadow: 0 0 0 0.25rem rgb(40 168 52 / 75%); }
      #cconsent-modal .ccm__footer button + button, #cconsent-init-modal .ccm__footer button + button { margin-left: 10px; }`,
    language: {
      // Current language.
      current: 'en',
      locale: {
        en: {
          barMainText: 'This website uses cookies to ensure you get the best experience on our website.',
          closeAriaLabel: 'close',
          barLinkSetting: 'Cookie Settings',
          barBtnAcceptAll: 'Accept all cookies',
          modalMainTitle: 'Cookie settings',
          // You can insert <a> tags within this prop to render links
          modalMainText: 'Cookies are small pieces of data sent from a website and stored on the user\'s computer by the user\'s web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user\'s browsing activity.',
          modalBtnSave: 'Save current settings',
          modalBtnAcceptAll: 'Accept all cookies and close',
          modalAffectedSolutions: 'Affected solutions:',
          learnMore: 'Learn More',
          on: 'On',
          off: 'Off',
          enabled: 'is enabled.',
          disabled: 'is disabled.',
          checked: 'checked',
          unchecked: 'unchecked',
        },
        hu: {
          barMainText: 'Ez a weboldal Sütiket használ a jobb felhasználói élmény érdekében.',
          closeAriaLabel: 'bezár',
          barLinkSetting: 'Süti beállítások',
          barBtnAcceptAll: 'Minden süti elfogadása',
          modalMainTitle: 'Süti beállítások',
          modalMainText: 'A HTTP-süti (általában egyszerűen süti, illetve angolul cookie) egy információcsomag, amelyet a szerver küld a webböngészőnek, majd a böngésző visszaküld a szervernek minden, a szerver felé irányított kérés alkalmával. Amikor egy weboldalt kérünk le a szervertől, akkor a böngésző elküldi a számára elérhető sütiket. A süti-ket úgy tervezték, hogy megbízható mechanizmust biztosítsanak a webhelyek számára az információk megőrzésére vagy a felhasználók böngészési tevékenységének rögzítésére.',
          modalBtnSave: 'Beállítások mentése',
          modalBtnAcceptAll: 'Minden Süti elfogadása',
          modalAffectedSolutions: 'Mire lesz ez hatással:',
          learnMore: 'Tudj meg többet',
          on: 'Be',
          off: 'Ki',
          enabled: 'bekapcsolva.',
          disabled: 'kikapcsolva.',
          checked: 'kipipálva',
          unchecked: 'nincs kipipálva',
        }
      }
    },
    // List all the categories you want to display.
    categories: {
      // Unique name.
      // This probably will be the default category.
      necessary: {
        // The cookies here are necessary and category can't be turned off.
        // Wanted config value will be ignored.
        needed: true,
        // The cookies in this category will be let trough.
        // This probably should be false if category not necessary.
        wanted: true,
        // If checkbox is on or off at first run.
        checked: true,
        // Language settings for categories.
        language: {
          locale: {
            en: {
              name: 'Strictly Necessary Cookies',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.',
            },
            hu: {
              name: 'Szükséges sütik',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.',
            }
          }
        }
      }
    },
    // List actual services here.
    services: {
      // Unique name.
      analytics: {
        // Existing category Unique name.
        // This example shows how to block Google Analytics.
        category: 'necessary',
        // Type of blocking to apply here.
        // This depends on the type of script we are trying to block.
        // Can be: dynamic-script, script-tag, wrapped, localcookie.
        type: 'dynamic-script',
        // Only needed if "type: dynamic-script".
        // The filter will look for this keyword in inserted scipt tags
        //  and block if match found.
        search: 'analytics',
        // List of known cookie names or regular expressions matching
        //  cookie names placed by this service.
        // These will be removed from current domain and .domain.
        cookies: [
          {
            // Known cookie name.
            name: '_gid',
            // Expected cookie domain.
            domain: `.${window.location.hostname}`
          },
          {
            // Regex matching cookie name.
            name: /^_ga/,
            domain: `.${window.location.hostname}`
          }
        ],
        language: {
          locale: {
            en: {
              name: 'Google Analytics'
            },
            hu: {
              name: 'Google Analytics'
            }
          }
        }
      }
    },
    //List consent properties according to Google Consent Mode v2, and their respecting controlling categories listed above.
    consentModeControls: {
      ad_storage: 'necessary',
      ad_user_data: 'necessary',
      ad_personalization: 'necessary'
      analytics_storage: 'necessary'
    },
    // whether consent mode updates will be handled by gtag or via custom GTM template. The value by default is null. Can have 'gtag' or 'gtm-template' values.
    consentModeHandler: 'gtm-template'
  });
  </script>
```

## Consent Mode v2

[Google consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode) v2 is supported. For it's implementation you need to add a consentModeControls object withing the configuration settings to list the consent types and what categories will control them just as described in the example. You will also need to add a `consentModeHandler: 'gtag'` option to the settings. Please, bear in mind that Google Tag Manager should be initialized with the default consent settings as per this example:

```javascript
  <!-- Google Tag Manager -->
      <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      const defaultSettings = {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      };
      const defaultRegionalSettings = {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        region: [
          'AT',
          'BE',
          'IS',
          'LI',
          'NO',
        ],
      };
      if (localStorage.getItem('consentMode') === null) {
        gtag('consent', 'default', defaultSettings);
        gtag('consent', 'default', defaultRegionalSettings);
      } else {
        gtag('consent', 'default', {
          ...defaultRegionalSettings,
          ...JSON.parse(localStorage.getItem('consentMode')),
        });
        gtag('consent', 'default', {
          ...defaultSettings,
          ...JSON.parse(localStorage.getItem('consentMode')),
        });
      }
      (function (w, d, s, l, i) {
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', '---GTM-ID---');
    </script>
  <!-- End Google Tag Manager -->
```

Whenever a consent option is modified by the user, an update is sent to Google Tag Manager setting the new consent configuration.
This example implements [regional consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced#region-specific-behavior). Adjust this snippet as needed.

## Sponsors

Contributed to diginomica by Brainsum, sponsored by ![diginomica](diginomica-24.png 'diginomica').
