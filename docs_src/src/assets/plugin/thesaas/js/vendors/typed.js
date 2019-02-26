
/**
 * Load required plugin.
 */
window.Typed = require('typed.js');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('Typed');

  page.initTyped = function() {
    $('[data-typing]').each(function(){
      var strings = $(this).data('typing').split(',');
      var options = {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 800,
        loop: true
      };

      options = $.extend( options, page.getDataOptions($(this)) );
      var typed = new Typed( $(this)[0], options );
    });
  }

}(jQuery);



