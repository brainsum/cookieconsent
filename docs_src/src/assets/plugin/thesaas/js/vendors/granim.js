
/**
 * Load required plugin.
 */
window.Granim = require('granim');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('Granim');

  page.initGranim = function() {
    $('[data-granim]').each(function(){
      var tag       = $(this),
          granim    = tag.data('granim').split(','),
          gradients = [],
          opacity   = [1,1];

      var len = granim.length;
      if ( len > 0 ) {
        if ( granim[0].indexOf('-') > -1 ) {
          for (var i = 0; i < len; i++) {
            gradients[i] = granim[i].split('-');
          }

          for (var i = 0; i < gradients[0].length; i++) {
            opacity[i] = 1;
          }
        }
        else {
          for (var i = 0; i < len/2; i++) {
            gradients[i] = [granim[i*2], granim[i*2+1]];
          }
        }
      }

      var options = {
        element: tag[0],
        name: 'granim',
        direction: tag.dataAttr('direction', 'left-right'),
        isPausedWhenNotInView: true,
        opacity: opacity,
        states : {
          "default-state": {
            gradients: gradients,
            transitionSpeed: 5000,
            loop: true
          }
         }
      };

      if (tag.hasDataAttr('opacity')) {
        options.opacity = tag.data('opacity').split(',');
      }

      if (tag.hasDataAttr('image')) {
        options.image = {
          source: tag.dataAttr('image', ''),
          position: ['center', 'center'],
          stretchMode: ['stretch-if-bigger', 'stretch-if-bigger'],
          blendingMode: 'multiply',
        }
      }

      var granimInstance = new Granim(options);

    });
  }

}(jQuery);



