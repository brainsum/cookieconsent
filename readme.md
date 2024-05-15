# Cookieconsent Script

A script that displays a cookie consent message as required by EU regulation (GDPR). The plugin displays a message on the user's first visit and they have the ability to consent to different categories of cookies and services.

See the demo: [Cookieconsent](https://brainsum.github.io/cookieconsent/)

## Default look

![Cookieconsent modal](cc_modal_75.png 'Cookieconsent modal')

## Features

- IE11 compatible
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
    // More link URL on bar.
    modalMainTextMoreLink: null,
    // How long to wait until bar or initial modal comes up.
    UITimeout: 1000,
    // Show 'bar' or 'modal' initial layout
    mode: 'bar'
    // Look and feel.
    theme: {
      barColor: '#2C7CBF',
      barTextColor: '#FFF',
      barMainButtonColor: '#FFF',
      barMainButtonTextColor: '#2C7CBF',
      modalMainButtonColor: '#4285F4',
      modalMainButtonTextColor: '#FFF',
    },
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
  });
  </script>
```

## Consent Mode v2

[Google consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode) v2 is supported. For it's implementation you need to add a consentModeControls object withing the configuration settings to list the consent types and what categories will control them just as described in the example. Please, bear in mind that Google Tag Manager should be initialized with the default consent settings as per this example:

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
