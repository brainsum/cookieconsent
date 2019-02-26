
/**
 * Send a form details to the sendmail.php file.
 */

+function($){

  page.initMailer = function() {

    var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $('[data-form="mailer"]').each(function(){

      var form      = $(this),
          email     = form.find('[name="email"]'),
          message   = form.find('[name="message"]'),
          onSuccess = form.dataAttr('on-success', null),
          onError   = form.dataAttr('on-error', null);

      form.on('submit', function(){

        form.children('.alert-danger').remove();



        form.find('[required]').each(function() {
          if ( $(this).val().length < 1 ) {
            $(this).addClass('is-invalid');
            return false;
          }
          else {
            $(this).removeClass('is-invalid');
          }
        });

        form.find('[type="email"]').each(function() {
          if ( ! validEmail.test( $(this).val() ) ) {
            $(this).addClass('is-invalid');
            return false;
          }
          else {
            $(this).removeClass('is-invalid');
          }
        });



        if ( email.length ) {
          if ( email.val().length < 1 || ! validEmail.test( email.val() ) ) {
            email.addClass('is-invalid');
            return false;
          }
        }


        if ( message.length ) {
          if ( message.val().length < 1 ) {
            message.addClass('is-invalid');
            return false;
          }
        }

        $.ajax({
          type: "POST",
          url: form.attr('action'),
          data: form.serializeArray(),
        })
        .done( function( data ) {
          var response = $.parseJSON( data );
          if ( 'success' == response.status ) {
            form.find('.alert-success').fadeIn(1000);
            form.find(':input').val('');
            if ( onSuccess !== null ) {
              window[onSuccess]();
            }
          }
          else {
            form.prepend('<div class="alert alert-danger">'+ response.message +'</div>');
            console.log( response.reason );
            if ( onError !== null ) {
              window[onError](response.reason);
            }
          }
        });

        return false;
      });


      form.find('[required], [type="email"]').each(function() {
        $(this).on('focus', function() {
          $(this).removeClass('is-invalid');
        });
      });


      email.on('focus', function() {
        $(this).removeClass('is-invalid');
      });

      message.on('focus', function() {
        $(this).removeClass('is-invalid');
      });

    });

  }

}(jQuery);

