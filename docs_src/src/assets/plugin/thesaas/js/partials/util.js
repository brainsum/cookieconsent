
/**
 * Utility functions to be used in the whole application.
 */

+function($){

  // Convert data-attributes options to Javascript object
  //
  page.getDataOptions = function(el, castList) {
    var options = {};

    $.each( $(el).data(), function(key, value){

      key = page.dataToOption(key);

      // Escape data-provide
      if ( key == 'provide' ) {
        return;
      }

      if ( castList != undefined ) {
        var type = castList[key];
        switch (type) {
          case 'bool':
            value = Boolean(value);
            break;

          case 'num':
            value = Number(value);
            break;

          case 'array':
            value = value.split(',');
            break;

          default:

        }
      }

      options[key] = value;
    });

    return options;
  }


  // Get target of an action from element.
  //
  // It can be 'data-target' or 'href' attribute.
  // We support 'next' and 'prev' values to target next or previous element. In this case, we return jQuery element.
  //
  page.getTarget = function(e) {
    var target;
    if ( e.hasDataAttr('target') ) {
      target = e.data('target');
    }
    else {
      target = e.attr('href');
    }

    if ( target == 'next' ) {
      target = $(e).next();
    }
    else if ( target == 'prev' ) {
      target = $(e).prev();
    }

    if ( target == undefined ) {
      return false;
    }

    return target;
  };





  // Get URL of an action from element.
  //
  // It can be 'data-url' or 'href' attribute.
  //
  page.getURL = function(e) {
    var url;
    if ( e.hasDataAttr('url') ) {
      url = e.data('url');
    }
    else {
      url = e.attr('href');
    }

    return url;
  };



  // Convert fooBarBaz to foo-bar-baz
  //
  page.optionToData = function(name) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase();
  }


  // Convert foo-bar-baz to fooBarBaz
  //
  page.dataToOption = function(name) {
    return name.replace(/-([a-z])/g, function(x){return x[1].toUpperCase();});
  }



}(jQuery);

