// Quotator : A simplistic testimonial rotator
// ======================================================================
// @credit  : Created and shared by Dennis Gaebel (@gryghostvisuals)
// @support : No dependencies required. IE10+ (querySelectorAll, classList)

var quotator = (function() {
  return {
    init: function(selector, state, speed) {
      var quotes      = document.querySelectorAll(selector),
          state       = replaceString(state),
          cycle_speed = speed;

      if(quotes.length !== 'undefined') {
        quotes[0].classList.add(state);

        setInterval(function() {
          cycle(quotes, state);
        }, cycle_speed);
      }

      function replaceString(txt) {
        return txt.toString().replace('.', '');
      }

      function cycle(selector, state) {
        var state   = '.' + state,
            current = document.querySelectorAll(state),
            next    = current[0].nextElementSibling;

        state = replaceString(state);

        if(!next) {
          current[0].classList.remove(state);
          selector[0].classList.add(state);
        } else {
          current[0].classList.remove(state);
          next.classList.add(state);
        }
      }
    }
  };
})();

quotator.init('.quote', '.js-current', 3500);


//--------------- a pen by georgemarts


// variables
var $header_top = $('.header-top');
var $nav = $('nav');



// toggle menu 
$header_top.find('a').on('click', function() {
  $(this).parent().toggleClass('open-menu');
});


// hide menu when clicking outside the menu
$("html").click(function(e) {
   if(!$(e.target).closest('header').length) {
        $header_top.removeClass('open-menu');
    }
});



// hide menu when clicking on the menu items or the logo
$('h1, #menu li a').click(function(){
  $header_top.removeClass('open-menu');
});


// fullpage customization
$('#fullpage').fullpage({
  //sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
  //sectionsColor: ['#B8AE9C', '#adb4c6', '#e5e2bc', '#b5cbcc', '#B8B89F'],
  sectionsColor: ['#B8AE9C', '#c7d4e5', '#B8AE9C', '#c7d4e5', '#B8AE9C'],
  
 
  sectionSelector: '.vertical-scrolling',
  slideSelector: '.horizontal-scrolling',
  navigation: true,
  slidesNavigation: true,
  controlArrows: false,
  anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
  menu: '#menu',

  afterLoad: function(anchorLink, index) {
    $header_top.css('background', 'rgba(0, 47, 77, .3)');
    $nav.css('background', 'rgba(0, 47, 77, .25)');
    if (index == 5) {
        $('#fp-nav').hide();
        $.fn.fullpage.moveTo(5, 0);
      }
  },

  onLeave: function(index, nextIndex, direction) {    

   if(index == 5) {
      $('#fp-nav').show();
    }
  },

  afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
    if(anchorLink == 'fifthSection' && slideIndex == 1) {
      $.fn.fullpage.setAllowScrolling(false, 'up');
      $header_top.css('background', 'transparent');
      $nav.css('background', 'transparent');
      $(this).css('background', '#374140');
      $(this).find('h2').css('color', 'white');
      $(this).find('h3').css('color', 'white');
      $(this).find('p').css(
        {
          'color': '#DC3522',
          'opacity': 1,
          'transform': 'translateY(0)'
        }
      );
    }
  },

  onSlideLeave: function( anchorLink, index, slideIndex, direction) {
    if(anchorLink == 'fifthSection' && slideIndex == 1) {
      $.fn.fullpage.setAllowScrolling(true, 'up');
      $header_top.css('background', 'rgba(0, 47, 77, .3)');
      $nav.css('background', 'rgba(0, 47, 77, .25)');
    }
  } 

});