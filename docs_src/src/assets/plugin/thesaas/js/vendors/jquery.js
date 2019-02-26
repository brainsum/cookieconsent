
/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('Jquery');

  page.initJquery = function() {

    /**
     * We will register the CSRF Token as a common header with jQuery so that
     * all outgoing HTTP requests automatically have it attached. This is just
     * a simple convenience so we don't have to attach every token manually.
     */

    var token = document.head.querySelector('meta[name="csrf-token"]');

    if (token) {
      $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': token.content }
      });
    }

  }

}(jQuery);




// Check if an element has a specific data attribute
//
jQuery.fn.hasDataAttr = function(name) {
  return $(this)[0].hasAttribute('data-'+ name);
};



// Get data attribute. If element doesn't have the attribute, return default value
//
jQuery.fn.dataAttr = function(name, def) {
  if ($(this)[0] == undefined) {
    return def;
  }
  return $(this)[0].getAttribute('data-'+ name) || def;
};



// Instance search
//
//$.expr[':'] -> $.expr.pseudos
jQuery.expr[':'].search = function(a, i, m) {
  return $(a).html().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};


// Return outerHTML (inclusing the element) code
//
jQuery.fn.outerHTML = function() {
  var html = '';
  this.each(function(){
    html += $(this).prop("outerHTML");
  })
  return html;
};


// Return HTML code of all the selected elements
//
jQuery.fn.fullHTML = function() {
  var html = '';
  $(this).each(function(){
    html += $(this).outerHTML();
  });
  return html;
};

// Scroll to end
//
jQuery.fn.scrollToEnd = function() {
  $(this).scrollTop( $(this).prop("scrollHeight") );
  return this;
};

