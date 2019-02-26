
/**
 * All the navbar related methods.
 */

+function($){

  page.initNavbar = function() {

    /**
     * Toggle navbar
     */
    $(document).on('click', '.navbar-toggler', function() {
      page.navbarToggle();
    });


    /**
     * Tapping on the backdrop will close the navbar
     */
    $(document).on('click', '.backdrop-navbar', function() {
      page.navbarClose();
    });


    /**
     * Toggle menu open on small screen devices
     */
    $(document).on('click', '.navbar-open .nav-navbar > .nav-item > .nav-link', function() {
      $(this).closest('.nav-item').siblings('.nav-item').find('> .nav:visible').slideUp(333, 'linear');
      $(this).next('.nav').slideToggle(333, 'linear');
    });

  }


  page.navbarToggle = function() {
    var body   = page.body,
        navbar = page.navbar;

    body.toggleClass('navbar-open');
    if (body.hasClass('navbar-open')) {
      navbar.prepend('<div class="backdrop backdrop-navbar"></div>');
    }
  }

  page.navbarClose = function() {
    page.body.removeClass('navbar-open');
    $('.backdrop-navbar').remove();
  }

}(jQuery);
