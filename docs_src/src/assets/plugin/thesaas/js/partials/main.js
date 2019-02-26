
/**
 * Load required plugins.
 */
window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js/dist/umd/popper');
require('bootstrap');
window.SmoothScroll = require('smoothscroll-for-websites');
require('objectFitPolyfill');


/**
 * Create window.page and init the application.
 */

+function($, window){

  var page = {
    name:       'TheSaaS',
    version:    '2.1.4',
    vendors:    [],

    // Cache popular elements
    body:       $('body'),
    navbar:     $('.navbar'),
    header:     $('.header'),
    footer:     $('.footer'),
  }

  page.defaults = {
    googleApiKey:       null,
    googleAnalyticsKey: null,
    reCaptchaSiteKey:   null,
    reCaptchaLanguage:  null,
    disableAOSonMobile: true,
    smoothScroll:       false,
  }

  /**
   * Call all the required initializers.
   */
  page.init = function() {

    // Vendors
    //
    page.initVendors();

    // Partials
    //
    page.initBind();
    page.initDrawer();
    page.initFont();
    page.initForm();
    page.initMailer();
    page.initModal();
    page.initNavbar();
    page.initOffcanvas();
    page.initPopup();
    page.initScroll();
    page.initSection();
    page.initSidebar();
    page.initVideo();


    // Anchor for headings
    //
    $('[data-provide="anchor"]').each(function() {
      var heading = $(this);
      heading.append('<a class="anchor" href="#'+ heading.attr('id') +'"></a>');
    });


  }


  /**
   * Initialize all of the loaded vendors.
   */
  page.initVendors = function() {
    page.vendors.forEach(function(vendor) {
      var fn = window.page[ "init"+ vendor ];
      if(typeof fn === 'function') {
        fn();
      }
    });
  }

  /**
   * Register loaded vendor to be initialized after DOM load.
   * It's case sensitive, since it calls "initVendorName" method.
   */
  page.registerVendor = function($name) {
    page.vendors.push($name);
  }

  window.page = page;
}(jQuery, window);


/**
 * Once the DOM is loaded, start the magic.
 */
$(function () {
  //page.init();
});


