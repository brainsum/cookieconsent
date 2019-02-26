
/**
 *
 */

+function($){

  page.initRecaptcha = function() {
    $('[data-provide~="recaptcha"]').each(function() {

      var options = {
        sitekey: page.defaults.reCaptchaSiteKey
      }

      options = $.extend(options, page.getDataOptions($(this)));

      if (options.enable) {
        options.callback = function() {
          $(options.enable).removeAttr('disabled');
        }

        options['expired-callback'] = function() {
          $(options.enable).attr('disabled', 'true');
        }

        $(this).closest('form').on('submit', function(e) {
          if ( $(this).find( options.enable ).attr('disabled') === 'true' ) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      }

      grecaptcha.render( $(this)[0], options);
    });
  }

  window.recaptchaLoadCallback = function() {
    page.initRecaptcha();
  }


}(jQuery);

