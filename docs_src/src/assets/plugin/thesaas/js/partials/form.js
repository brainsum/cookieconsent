
/**
 * All the form related methods.
 */

+function($){

  page.initForm = function() {


    /**
     * Add/remove .focus to .input-group
     */
    $(document).on('focusin', '.input-group', function() {
      $(this).addClass('focus');
    });

    $(document).on('focusout', '.input-group', function() {
      $(this).removeClass('focus');
    });


    // Switch
    //
    $(document).on('click', '.switch', function() {
      var input = $(this).children('.switch-input').not(':disabled');
      input.prop('checked', ! input.prop('checked')).trigger("change");
    });


    // Upload
    //
    $(document).on('click', '.file-browser', function() {
      var browser = $(this);
      var file = browser.closest('.file-group').find('[type="file"]');
      if ( browser.hasClass('form-control') ) {
        setTimeout(function(){
          file.trigger('click');
        },300);
      }
      else {
        file.trigger('click');
      }
    });

    // Event to change file name after file selection
    $(document).on('change', '.file-group [type="file"]', function(){
      var input = $(this);
      var filename = input.val().split('\\').pop();
      input.closest('.file-group').find('.file-value').val(filename).text(filename).focus();
    });


  }

}(jQuery);
