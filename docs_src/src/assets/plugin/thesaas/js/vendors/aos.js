
/**
 * Load required plugin.
 */
window.AOS = require('aos');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('AOS');

  page.initAOS = function() {
    var options = {
      offset: 220,
      duration: 1500,
    }

    if ( page.defaults.disableAOSonMobile ) {
      options.disable = 'mobile';
    }

    AOS.init(options);
  }

}(jQuery);


