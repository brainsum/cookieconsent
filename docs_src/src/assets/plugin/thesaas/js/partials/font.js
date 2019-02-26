
/**
 *
 */

+function($){

  page.initFont = function() {

    var fonts = [];

    $('[data-font]').each(function(){
      var tag  = $(this),
          font = tag.data('font')
          part = font.split(':');

      fonts.push(font);
      tag.css({'font-family': part[0], 'font-weight': part[1]});
    });

    if (fonts.length > 0) {
      $("head").append("<link href='https://fonts.googleapis.com/css?family=" + fonts.join('|') + "' rel='stylesheet'>");
    }

  }

}(jQuery);

