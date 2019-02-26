
/**
 * Bind input changes to data attributes
 */

+function($){

  page.initBind = function() {

    // Set the inner text
    //
    $('[data-bind-radio]').each(function(){
      var e     = $(this),
          radio = e.data('bind-radio'),
          value = $('input[name="'+ radio +'"]:checked').val();
      e.text( e.dataAttr(value, e.text()) );

      $('input[name="'+ radio +'"]').on('change', function() {
        var value = $('input[name="'+ radio +'"]:checked').val();
        $('[data-bind-radio="'+ radio +'"]').each(function(){
          var e = $(this);
          e.text( e.dataAttr(value, e.text()) );
        });
      });
    });


    // Set href attribute
    //
    $('[data-bind-href]').each(function(){
      var e     = $(this),
          radio = e.data('bind-href'),
          value = $('input[name="'+ radio +'"]:checked').val();

      e.attr( 'href', e.dataAttr(value) );

      $('input[name="'+ radio +'"]').on('change', function() {
        var value = $('input[name="'+ radio +'"]:checked').val();
        $('[data-bind-href="'+ radio +'"]').each(function(){
          var e = $(this);
          e.attr( 'href', e.dataAttr(value) );
        });
      });
    });

  }

}(jQuery);

