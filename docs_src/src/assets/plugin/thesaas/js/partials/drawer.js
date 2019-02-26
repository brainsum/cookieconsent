
/**
 *
 */

+function($){

  page.initDrawer = function() {

    $(document).on( 'click', '.drawer-toggler, .drawer-close, .backdrop-drawer', function() {
      $('body').toggleClass( 'drawer-open' );
    });

  }

}(jQuery);

