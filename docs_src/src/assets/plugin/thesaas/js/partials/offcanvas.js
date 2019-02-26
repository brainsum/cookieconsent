
/**
 * All the popup related methods.
 */

+function($){

  page.initOffcanvas = function() {

    /**
     * Toggle
     */
    $(document).on('click', '[data-toggle="offcanvas"]', function() {
      var target     = $(this).data('target'),
          offcanvas  = $(target);

      if ( target !== undefined && offcanvas.length ) {
        if (offcanvas.hasClass('show')) {
          $('.backdrop-offcanvas').remove();
          offcanvas.removeClass('show');
        }
        else {
          offcanvas.before('<div class="backdrop backdrop-offcanvas"></div>');
          offcanvas.addClass('show');
          setTimeout(function() { offcanvas.find('input:text:visible:first').focus(); }, 300);
        }
      }
    });


    /**
     * Dismiss
     */
    $(document).on('click', '.offcanvas [data-dismiss], .backdrop-offcanvas', function() {
      $('.offcanvas.show').removeClass('show');
      $('.backdrop-offcanvas').remove();
    });


    /**
     * Esc key
     */
    $(document).on('keyup', function(e) {
      if ($('.offcanvas.show').length && e.keyCode == 27) { // esc keycode
        $('.offcanvas.show').removeClass('show');
        $('.backdrop-offcanvas').remove();
      }
    });
  }

}(jQuery);
