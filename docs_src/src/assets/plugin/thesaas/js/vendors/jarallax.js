
/**
 * Load required plugin.
 */
require('jarallax/dist/jarallax.min');
require('jarallax/dist/jarallax-video.min');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('Jarallax');

  page.initJarallax = function() {

    // Parallax image
    //
    $('[data-parallax]').each(function() {
      var tag = $(this);
      var options = {
        imgSrc: tag.data('parallax'),
        speed: 0.3,
      };

      if ( tag.hasClass('header') ) {
        options.speed = 0.6;
      }

      options = $.extend( options, page.getDataOptions(tag));

      tag.jarallax( options );

    });


    // Video backgrounds
    //
    $('[data-video]').each(function() {
      var tag = $(this);
      var options = {
        videoSrc: tag.data('video'),
        speed: 1,
      };

      if ( options.videoSrc.indexOf('mp4:') > -1 ) {
        options.speed = 0.5;
      }

      options = $.extend( options, page.getDataOptions(tag));

      tag.jarallax( options );

    });

  }

}(jQuery);



