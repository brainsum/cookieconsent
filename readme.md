# Cookieconsent Script

A script that displays a cookie consent message as required by EU regulation (GDPR). The plugin displays a message on the user's first visit and they have the ability to consent to different categories of cookies and services.

See the demo: [Cookieconsent](https://brainsum.github.io/cookieconsent/)

## Default look

![Cookieconsent modal](https://raw.githubusercontent.com/brainsum/cookieconsent/master/docs/cc_modal_75.png "Cookieconsent modal")

## Features

- IE11 compatible
- Four different blocking methods
- Multilingual

Currently it can block all the bad cookie monsters in 4 ways.

### Dynamic script tags

Some services insert dynamically created script tags to the HEAD at page load. These can be intercepted and blocked.

### Script tag blocking

Some third party services require you to insert a script tag into your HTML pages. These can be inactivated until the user allowes them.

### Script wrapping

Some services are not inserted in a SCRIPT tag and are obscured by layers of other code. Thats why this script creates a global wrapper function what you can use to wrap and blovk any JS code.

### Local cookies

Finally the local cookies set on your domain can be also filtered by overriding the bowsers COOKIE SET method.

## Usage

1. Download the file cookieconsent.zip from the [latest release](https://github.com/brainsum/cookieconsent/releases/latest), and unpack its content.

2. Include the script file into your HTML page **before everything else.**

```
<script src="cookieconsent.js"></script>
```

3. Call the init() function with the Configuration Object.

See a working example in the docs folder.

### Configuration object

The script is being controlled mainly by a configuration object which is passed to the inital call. It acts as configuration and a global state object.

```javascript
<script>
  window.CookieConsent.init({
    // Look and feel
    theme: {
      barColor: '#2C7CBF',
      barTextColor: '#FFF',
      barMainButtonColor: '#FFF',
      barMainButtonTextColor: '#2C7CBF',
      modalMainButtonColor: '#4285F4',
      modalMainButtonTextColor: '#FFF',
    },
    language: {
      // Current language
      current: 'en',
      locale: {
        en: {
          barMainText: 'This website uses cookies to ensure you get the best experience on our website.',
          barLinkSetting: 'Cookie Settings',
          barBtnAcceptAll: 'Accept all cookies',
          modalMainTitle: 'Cookie settings',
          modalMainText: 'Cookies are small piece of data sent from a website and stored on the user\'s computer by the user\'s web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user\'s browsing activity.',
          modalBtnSave: 'Save current settings',
          modalBtnAcceptAll: 'Accept all cookies and close',
          modalAffectedSolutions: 'Affected solutions:',
          learnMore: 'Learn More',
          on: 'On',
          off: 'Off',
        }
      }
    }
    // List all the categories you want to display
    categories: {
      // Unique name
      // This probably will be the default category
      necessary: {
        // The cookies here are necessary and category cant be turned off.
        // Wanted config value  will be ignored.
        needed: true,
        // The cookies in this category will be let trough.
        // This probably should be false if not necessary category
        wanted: true,
        // If the checkbox is on or off at first run.
        checked: true,
        // Language settings for categories
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
    // List actual services here
    services: {
      // Unique name
      analytics: {
        // Existing category Unique name
        // This example shows how to block Google Analytics
        category: 'necessary',
        // Type of blocking to apply here.
        // This depends on the type of script we are trying to block
        // Can be: dynamic-script, script-tag, wrapped, localcookie
        type: 'dynamic-script',
        // Only needed if "type: dynamic-script"
        // The filter will look for this keyword in inserted scipt tags
        // and block if match found
        search: 'analytics',
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
    }
  });
  </script>
```