
/**
 * All methods related to the page scroll and link click.
 */

+function($){

  var body = page.body,
      footer = page.footer,
      hasHeader = page.header.length,
      navbarHeight = page.navbar.outerHeight(),
      headerHeight = page.header.innerHeight(),
      scrollOffsetTop = 0,
      prevOffsetTop = 0;

  page.initScroll = function() {


    if ( $('[data-navbar="fixed"], [data-navbar="sticky"], [data-navbar="smart"]').length ) {
      scrollOffsetTop = navbarHeight;
    }

    $(document).on( 'click', "a[href='#']", function() {
      return false;
    });


    // Back to top
    //
    $(document).on('click', '.scroll-top', function() {
      smoothlyScrollTo(0);
      return false;
    });


    // Smooth scroll for anchors
    //
    $(document).on( 'click', "a[href^='#']", function() {
      if ( $(this).attr('href').length < 2 ) {
        return;
      }

      if ( $(this)[0].hasAttribute('data-toggle') ) {
        return;
      }

      var target = $( $(this).attr('href') );
      if ( target.length ) {
        var targetTop = target.offset().top,
            windowTop = $(window).scrollTop();

        // We don't need offsetTop for scroll down with smart navbar
        //
        if ( targetTop > windowTop && $('.navbar[data-navbar="smart"]').length ) {
          smoothlyScrollTo( targetTop );
        }
        else {
          smoothlyScrollTo( targetTop - scrollOffsetTop );
        }

        if (body.hasClass('navbar-open')) {
          page.navbarClose();
        }
        return false;
      }
    });


    // Smoothscroll to anchor in page load
    //
    var hash = location.hash.replace('#','');
    if ( hash != '' ) {
      var el = $("#"+hash);
      if (el.length > 0) {
        smoothlyScrollTo( el.offset().top - scrollOffsetTop );
      }
    }


    // Actions which are related to the page scroll position
    windowScrollActions();

    $(window).on('scroll', function() {
      windowScrollActions()
    });



    // In page navigation
    //
    if ( $('.nav-page').length ) {

      var tooltip_pos = 'left',
          tooltip_offset = '0, 12';

      if ( $('.nav-page.nav-page-left').length ) {
        tooltip_pos = 'right';
        tooltip_offset = '0, 12';
      }

      var spy_offset = parseInt( $('.nav-page').dataAttr('spy-offset', 200) );

      // Enable tooltip
      $('.nav-page .nav-link').tooltip({
        container: 'body',
        placement: tooltip_pos,
        offset: tooltip_offset,
        trigger: 'hover'
      });


      // Enable Scroll Spy
      $('body').scrollspy({
        target: '.nav-page',
        offset: spy_offset
      });

    }


    // Sticky sidebar width
    //
    $('.sidebar-sticky').each(function() {
      var tag = $(this),
          width = tag.closest('div').width();
      tag.css('width', width);

      if (body.width() / width < 1.8) {
        tag.addClass('is-mobile-wide');
      }
    });

  }


  var windowScrollActions = function() {
    var window_top = $(window).scrollTop();

    // .body-scrolled
    //
    if (window_top > 1) {
      body.addClass('body-scrolled');
    }
    else {
      body.removeClass('body-scrolled');
    }

    // .navbar-scrolled
    //

    if (window_top > navbarHeight) {
      body.addClass('navbar-scrolled');
    }
    else {
      body.removeClass('navbar-scrolled');
    }


    // .header-scrolled
    //
    if (window_top > headerHeight - navbarHeight - 1) {
      body.addClass('header-scrolled');
    }
    else {
      body.removeClass('header-scrolled');
    }

    // Sticky elements
    //
    $('[data-sticky="true"]').each(function() {
      var tag = $(this),
          top = tag.offset().top;

      if ( ! tag.hasDataAttr('original-top') ) {
        tag.attr('data-original-top', top);
      }

      var stick_start = tag.dataAttr('original-top'),
          stick_end   = footer.offset().top - tag.outerHeight();

      if (window_top > stick_start) {// && window_top <= stick_end) {
        tag.addClass('stick');
      }
      else {
        tag.removeClass('stick');
      }
    });

    // Smart navbar
    //
    $('[data-navbar="smart"]').each(function() {
      var tag = $(this);

      //toggleFixClass(tag);
      if (window_top < prevOffsetTop) {
        toggleStickClass(tag);
      }
      else {
        tag.removeClass('stick');
      }
    });

    // Sticky navbar
    //
    $('[data-navbar="sticky"]').each(function() {
      var tag = $(this);
      toggleStickClass(tag);
    });

    // Fixed navbar
    //
    $('[data-navbar="fixed"]').each(function() {
      var tag = $(this);
      if (body.hasClass('body-scrolled')) {
        tag.addClass('stick');
      }
      else {
        tag.removeClass('stick');
      }
    });

    // Sticky sidebar
    //
    $('.sidebar-sticky').each(function() {
      var tag = $(this);
      toggleStickClass(tag);
    });

    // Fadeout effect
    //
    $('.header.fadeout').css('opacity', (1-window_top-200 / window.innerHeight) );


    prevOffsetTop = window_top;
  }


  var smoothlyScrollTo = function(pos) {
    $('html, body').animate({scrollTop: pos}, 600);
  }


  var toggleFixClass = function(tag) {
    if (body.hasClass('navbar-scrolled')) {
      tag.addClass('fix');
    }
    else {
      tag.removeClass('fix');
    }
  }

  var toggleStickClass = function(tag) {
    var requiredClass = 'navbar-scrolled';
    if ( hasHeader ) {
      requiredClass = 'header-scrolled';
    }

    if (body.hasClass(requiredClass)) {
      tag.addClass('stick');
    }
    else {
      tag.removeClass('stick');
    }
  }

}(jQuery);
