/*
  INITIALIZE THAT WE HAVE JAVASCRIPT
*/
document.documentElement.className += ' js';

(function($) {

  /*
    Main menu
  */
  (function() {
    var $mainItems = $('#main-nav > ul > li');
    $mainItems.find('> a').mozMenu();
    $mainItems.find('.submenu').mozKeyboardNav();
  })();

  /*
    Search animation

    TODO:  What happens on mobile?
  */
  (function() {
    var $nav = $('#main-nav');
    var $navItems = $nav.find('ul > li:not(:last-child)');
    var $input = $nav.find('.search-wrap input');
    var placeholder = $input.attr('placeholder');

    var timeout;
    var createExpander = function(delay, isAdd) {
      return function() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function() {
          if(isAdd) {
            $nav.addClass('expand');
            $input.attr('placeholder', '');
          }
          else {
            $nav.removeClass('expand');
            $input.attr('placeholder', placeholder);
          }
        }, delay);
      }
    };

    $input.
      on('focus', createExpander(200, true)).
      on('blur', createExpander(600)).
      on('keypress change', function() {
        $input[($input.val() != '' ? 'add' : 'remove') + 'Class']('has-value');
      });
  })();


  /*
    Togglers within articles, TOC, accordion subnav, etc. for example
  */
  $('.toggleable').mozTogglers();

  /*
    Persona Login
  */
  $('.persona-login').click(function(e) {
    if(!$(this).hasClass('toggle')) {
      navigator.id.get(function(assertion) {
        if(!assertion) return;
        $('input[name="assertion"]').val(assertion.toString());
        $('form.browserid').first().submit();
      });
      return false;
    }
  });

})(jQuery);