# Cookieconsent Script

A lightweight Javascritp plugin that displays a cookie consent message as required by EU regulation. The plugin displays a message on the user's first visit and they have the ability to consent to different categories of cookies and services.

## Features and configuration

Currently it can block 4 type of cookie monsters.

### Dynamic script tags

Some services insert dynamically created script tags to the HEAD at page load. This script can block these.

They're getting blocked by the config value

```
type: 'dynamic-script'
```

And the script then watches for the search keyword:

```
search: 'fbevents.js'
```

### Script tag blocking

Some services had to be inserted as SCRIPT tag into the source and cant be blocked by only from the front-end since they set  cookies with their initial connection.

They're getting blocked by the config value

```
type: 'script-tag'
```

Then the SCRIPT tag needs to be modified like this:

Before:

```
<script src="azalead service" type="application/javascript"></script>
```

After:

```
<script src="azalead service" type="text/plain" data-consent="azalead"></script>
```

And the config **service name** has to have the same name as the "data-consent-value" so the service and the tag can be linked.

```
azalead: {
  cookieName: 'aza',
  name: 'Azalead',
  category: 'social',
  type: 'script-tag',
  search: 'azalead'
}
```
### Script wrapping

Some services are not inserted in a SCRIPT tag and are obscured by layers of other code. Thats why this plugin creates a global wrapper function what you can use anywhere in your code and will be controlled by the consent.

They're getting blocked by the config value

```
type: 'wrapped'
```

Then the SCRIPT you want to controll needs to be wrapped like this:

```
<script>
  CookieConsent.functions.wrapper('wrapped', function() {
    console.warn('I\'m a script which was wrapped.');
  });
</script>
```

And the config **service name** has to have the same name as the "data-consent-value" so the service and the tag can be linked.

```
wrapped: {
  cookieName: 'aza',
  name: 'Wrapped cookie',
  category: 'social',
  type: 'script-tag',
  search: 'wrapped'
}
```

### Local cookies

Finally the local cookies set on your domain can be also filtered by overriding the bowsers document.cookie.set method.

They're getting blocked by the config value

```
type: 'localcookie'
```

Then you need to set the config search value according to the local cookie names:

```
localcookie: {
  cookieName: 'aza',
  name: 'Local cookies',
  category: 'social',
  type: 'local',
  search: ['localcookie'] or 'localcookie'
}
```

The cookie name 'localcookie' will be blocked from being set.


## Usage

The script is currently under development and needs to be built before usage:

```
* git clone
* npm run dev
```

To build a production ready version of the script:

```
* git clone
* npm run build
```

Then include the plugin into your page as the **first script** in the head tag.


### Configuration object

The plugin is being controlled mainly by a configuration object in src/index.js file. It acts as configuration and a state object.

The cookies are classified as categories and services.

```
window.CookieConsent.config = {
  cookieExists: false,
  language: 'en',
  categories: {
    necessary: {
      name: 'Strictly Necessary Cookies',
      needed: true,
      wanted: true,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.'
    },
    social: {
      name: 'Social media',
      needed: false,
      wanted: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.'
    }
  },
  services: {
    facebook: {
      cookieName: 'fr',
      name: 'Facebook',
      category: 'social',
      type: 'dynamic-script',
      search: 'fbevents.js'
    }
    azalead: {
      cookieName: 'tw',
      name: 'Azalead',
      category: 'social',
      type: 'script-tag',
      search: 'azalead'
    }
    wrapped: {
      cookieName: 'tw',
      name: 'Linkedin',
      category: 'social',
      type: 'wrapped',
      search: 'wrapped'
    },
    localCookie: {
      cookieName: 'localsetcookie',
      name: 'Local Test Cookie',
      category: 'social',
      type: 'localcookie',
      search: ['localcookie']
    }
  }
}
```