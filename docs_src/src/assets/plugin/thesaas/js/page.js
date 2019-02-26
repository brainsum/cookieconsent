
/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
|
| The start point of the project. Include jQuery, Bootstrap and required
| plugins and define page object. This file is required.
|
*/
require('./loaders/core.js');

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
require('./vendors/aos.js');            // 14 kb
require('./vendors/constellation.js');  // 03 kb
require('./vendors/countdown.js');      // 05 kb
require('./vendors/countup.js');        // 13 kb
require('./vendors/granim.js');         // 15 kb
require('./vendors/jarallax.js');       // 23 kb
require('./vendors/lity.js');           // 07 kb
require('./vendors/photoswipe.js');     // 45 kb
require('./vendors/shuffle.js');        // 25 kb
require('./vendors/slick.js');          // 43 kb
require('./vendors/typed.js');          // 11 kb


/*
|--------------------------------------------------------------------------
| Partials
|--------------------------------------------------------------------------
|
| Split the application code to several files. This file is required.
|
*/
require('./loaders/partials.js');
