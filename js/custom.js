/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});





// SLIDER



var Nav = (function() {
  
  var
    nav         = $('.nav'),
    burger  = $('.burger'),
    page        = $('.page'),
    section = $('.section'),
    link        = nav.find('.nav__link'),
    navH        = nav.innerHeight(),
    isOpen  = true,
    hasT        = false;
  
  var toggleNav = function() {
    nav.toggleClass('nav--active');
    burger.toggleClass('burger--close');
    shiftPage();
  };
  
  var shiftPage = function() {
    if (!isOpen) {
      page.css({
        'transform': 'translateY(' + navH + 'px)',
        '-webkit-transform': 'translateY(' + navH + 'px)'
      });
      isOpen = true;
    } else {
      page.css({
        'transform': 'none',
        '-webkit-transform': 'none'
      });
      isOpen = false;
    }
  };
  
  var switchPage = function(e) {
    var self = $(this);
    var i = self.parents('.nav__item').index();
    var s = section.eq(i);
    var a = $('section.section--active');
    var t = $(e.target);
    
    if (!hasT) {
      if (i == a.index()) {
        return false;
      }
      a
      .addClass('section--hidden')
      .removeClass('section--active');

      s.addClass('section--active');

      hasT = true;

      a.on('transitionend webkitTransitionend', function() {
        $(this).removeClass('section--hidden');
        hasT = false;
        a.off('transitionend webkitTransitionend');
      });
    }

    return false;
  };
  
  var keyNav = function(e) {
    var a = $('section.section--active');
    var aNext = a.next();
    var aPrev = a.prev();
    var i = a.index();
    
    
    if (!hasT) {
      if (e.keyCode === 37) {
      
        if (aPrev.length === 0) {
          aPrev = section.last();
        }

        hasT = true;

        aPrev.addClass('section--active');
        a
          .addClass('section--hidden')
          .removeClass('section--active');

        a.on('transitionend webkitTransitionend', function() {
          a.removeClass('section--hidden');
          hasT = false;
          a.off('transitionend webkitTransitionend');
        });

      } else if (e.keyCode === 39) {

        if (aNext.length === 0) {
          aNext = section.eq(0)
        } 


        aNext.addClass('section--active');
        a
          .addClass('section--hidden')
          .removeClass('section--active');

        hasT = true;

        aNext.on('transitionend webkitTransitionend', function() {
          a.removeClass('section--hidden');
          hasT = false;
          aNext.off('transitionend webkitTransitionend');
        });

      } else {
        return
      }
    }  
  };
    
  var bindActions = function() {
    burger.on('click', toggleNav);
    link.on('click', switchPage);
    $(document).on('ready', function() {
       page.css({
        'transform': 'translateY(' + navH + 'px)',
         '-webkit-transform': 'translateY(' + navH + 'px)'
      });
    });
    $('body').on('keydown', keyNav);
  };
  
  var init = function() {
    bindActions();
  };
  
  return {
    init: init
  };
  
}());

Nav.init();














// IF I WANT TO IMPLEMENT A COMTACT FORM




$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "./mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});










