
/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
|
| The start point of the project. Include jQuery, Bootstrap and required
| plugins and define page object. This file is required.
|
*/
require('../../plugin/thesaas/js/loaders/core.js');

/*
|--------------------------------------------------------------------------
| Vendors
|--------------------------------------------------------------------------
|
| Load some plugins and define initializer methods. If you don't need any
| of the following plugins, simply comment the line.
|
| The minified size of each module has stated for your reference. So you'd
| know how much KB you can save by removing a vendor.
|
*/
require('../../plugin/thesaas/js/vendors/aos.js');            // 14 kb
require('../../plugin/thesaas/js/vendors/constellation.js');  // 03 kb
require('../../plugin/thesaas/js/vendors/countdown.js');      // 05 kb
require('../../plugin/thesaas/js/vendors/countup.js');        // 13 kb
require('../../plugin/thesaas/js/vendors/granim.js');         // 15 kb
require('../../plugin/thesaas/js/vendors/jarallax.js');       // 23 kb
require('../../plugin/thesaas/js/vendors/lity.js');           // 07 kb
require('../../plugin/thesaas/js/vendors/photoswipe.js');     // 45 kb
require('../../plugin/thesaas/js/vendors/shuffle.js');        // 25 kb
require('../../plugin/thesaas/js/vendors/slick.js');          // 43 kb
require('../../plugin/thesaas/js/vendors/typed.js');          // 11 kb


/*
|--------------------------------------------------------------------------
| Partials
|--------------------------------------------------------------------------
|
| Split the application code to several files. This file is required.
|
*/
require('../../plugin/thesaas/js/loaders/partials.js');


/*
|--------------------------------------------------------------------------
| Configure
|--------------------------------------------------------------------------
|
| Modify some variables to personalize your project. This file is required.
|
*/
require('./config.js');


/*
|--------------------------------------------------------------------------
| Custom script
|--------------------------------------------------------------------------
|
| Write your custom JavaScrip code. Feel free to split your code to several
| files and import the other files here or inside script.js.
|
*/
require('./script.js');
