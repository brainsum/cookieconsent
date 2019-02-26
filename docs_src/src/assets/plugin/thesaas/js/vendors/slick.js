
/**
 * Load required plugin.
 */
require('slick-carousel');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('Slick');

  page.initSlick = function() {

    $('[data-provide~="slider"]').each(function() {
      var tag = $(this),
          options = {
            speed: 1000,
            arrows: false,
            centerPadding: '0',
          };

      options = $.extend( options, page.getDataOptions(tag));

      if (options.slidesToShow !== undefined || options.centerMode !== undefined) {
        var scrollOn768 = 1;
        if (options.slidesToScroll !== undefined) {
          if (options.slidesToScroll > 1) {
            scrollOn768 = 2;
          }
        }

        options.responsive = [{
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: scrollOn768,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: '0px',
          }
        }];
      }

      tag.slick(options);
    });

  }

}(jQuery);



