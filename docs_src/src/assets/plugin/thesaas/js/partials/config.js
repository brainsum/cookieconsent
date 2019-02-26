
/**
 * Config the application behaviour.
 */

+function($){

  page.config = function(options) {

    // Return config value
    if ( typeof options === 'string' ) {
      return page.defaults[options];
    }

    // Save configs
    $.extend(true, page.defaults, options);

    // Make necessary changes
    //
    if ( ! page.defaults.smoothScroll ) {
      SmoothScroll.destroy();
    }

    // Google map
    //
    if ( $('[data-provide~="map"]').length && window["google.maps.Map"] === undefined ) {
      $.getScript("https://maps.googleapis.com/maps/api/js?key="+ page.defaults.googleApiKey +"&callback=page.initMap");
    }

    // Google Analytics
    //
    if ( page.defaults.googleAnalyticsId ) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', page.defaults.googleAnalyticsId, 'auto');
      ga('send', 'pageview');
    }


    // Google reCAPTCHA
    //
    if ( $('[data-provide~="recaptcha"]').length && window["grecaptcha"] === undefined ) {
      var url = "https://www.google.com/recaptcha/api.js?onload=recaptchaLoadCallback";
      if ( page.defaults.reCaptchaLanguage != '' ) {
        url += '&hl=' + page.defaults.reCaptchaLanguage;
      }
      $.getScript(url);
    }

    // DOM is loaded, let's init the page.
    //
    page.init();

  }

}(jQuery);



