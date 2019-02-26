
/**
 * Load required plugin.
 */
require('jquery-countdown');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('Countdown');

  page.initCountdown = function() {

    $('[data-countdown]').each(function() {
      var tag     = $(this),
          format  = '',
          options = {
            textDay:    'Day',
            textHour:   'Hour',
            textMinute: 'Minute',
            textSecond: 'Second',
          };

      options = $.extend( options, page.getDataOptions(tag));


      format += '<div class="row gap-x-4">';
      format += '<div class="col"><h5>%D</h5><small>'+ options.textDay +'%!D</small></div>';
      format += '<div class="col"><h5>%H</h5><small>'+ options.textHour +'%!H</small></div>';
      format += '<div class="col"><h5>%M</h5><small>'+ options.textMinute +'%!M</small></div>';
      format += '<div class="col"><h5>%S</h5><small>'+ options.textSecond +'%!S</small></div>';
      format += '</div>';

      if ( tag.hasDataAttr('format') ) {
        format = tag.data('format');
      }

      tag.countdown( tag.data('countdown'), function(event) {
        $(this).html(event.strftime( format ));
      } )

    });

  }

}(jQuery);



