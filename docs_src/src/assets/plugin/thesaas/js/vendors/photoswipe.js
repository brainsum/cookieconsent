
/**
 * Load required plugin.
 */
require('jquery.photoswipe/dist/jquery.photoswipe-global.js');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('PhotoSwipe');

  page.initPhotoSwipe = function() {
    $('[data-provide="photoswipe"]').each(function() {
      var tag = $(this),
          selector = tag.dataAttr('photoswipe-selector', '.gallery-item');

      $(tag).photoSwipe(selector);
    });
  }

}(jQuery);


