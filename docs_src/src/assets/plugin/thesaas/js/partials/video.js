
/**
 * All the video related methods.
 */

+function($){

  page.initVideo = function() {

    // Video-wrapper
    //
    $(document).on('click', '.video-wrapper .btn', function(){
      var wrapper = $(this).closest('.video-wrapper');
      wrapper.addClass('reveal');

      if ( wrapper.find('video').length )
        wrapper.find('video').get(0).play();

      if ( wrapper.find('iframe').length ) {
        var iframe = wrapper.find('iframe');
        var src = iframe.attr('src');

        if ( src.indexOf('?') > 0 )
          iframe.get(0).src += "&autoplay=1";
        else
          iframe.get(0).src += "?autoplay=1";
      }
    });


    // Object-fit polyfill
    //
    objectFitPolyfill( $('.bg-video') );

  }

}(jQuery);
