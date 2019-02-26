
/**
 * All the modal related methods.
 */

+function($){

  page.initModal = function() {
    var body = page.body;

    /**
     * Autoshow
     */
    $('.modal[data-autoshow]').each(function(){
      var modal = $(this),
          delay = parseInt( modal.dataAttr('autoshow') );
      setTimeout( function() { modal.modal('show') }, delay);
    });


     /**
      * Exit
      */
    $('.modal[data-exitshow]').each(function(){
      var modal  = $(this),
          delay  = parseInt( modal.dataAttr('delay', 0) ),
          target = modal.dataAttr('exitshow');

      if ( $(target).length ) {
        $(document).one('mouseleave', target, function() {
          setTimeout( function() { modal.modal('show') }, delay);
        });
      }

    });

  }

}(jQuery);
