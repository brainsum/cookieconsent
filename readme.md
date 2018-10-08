# Cookieconsent Script

A lightweight Javascript plugin that displays a cookie consent message as required by EU regulation (GDPR). The plugin displays a message on the user's first visit and they have the ability to consent to different categories of cookies and services.

## Features

Currently it can block all the bad cookie monsters in 4 ways.

### Dynamic script tags

Some services insert dynamically created script tags to the HEAD at page load. These can be intercepted and blocked.

### Script tag blocking

Some third party services require you to insert a script tag into your HTML pages. These can be inactivated until the user allowes them.

### Script wrapping

Some services are not inserted in a SCRIPT tag and are obscured by layers of other code. Thats why this plugin creates a global wrapper function what you can use to wrap and blovk any JS code.

### Local cookies

Finally the local cookies set on your domain can be also filtered by overriding the bowsers COOKIE SET method.

## Usage

Include the script **before everything else.**

```
<script src="cookieconsent.js"></script>
```

### Configuration object

The plugin is being controlled mainly by a configuration object which is passed to the inital call. It acts as configuration and a global state object.

```javascript
<script>
  window.CookieConsent.init({
    language: {
      // The current language
      current: 'en'
    },
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