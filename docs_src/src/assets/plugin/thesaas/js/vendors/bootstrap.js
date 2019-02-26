
/**
 * Initialize some of the core Bootstrap components.
 */

+function($){
  page.registerVendor('Bootstrap');

  page.initBootstrap = function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();


    // Custom control check
    //
    // Since BS4-beta-3, custom-controls needs id and for attributes.
    // We bypass this requirement.
    //
    $(document).on('click', '.custom-checkbox', function() {
      var input = $(this).children('.custom-control-input').not(':disabled');
      input.prop('checked', ! input.prop('checked')).trigger( "change" );
    });

    $(document).on('click', '.custom-radio', function() {
      var input = $(this).children('.custom-control-input').not(':disabled');
      input.prop('checked', true).trigger( "change" );
    });


  }

}(jQuery);

