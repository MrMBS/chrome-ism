define(['mousetrap',
  'app/search',
  'app/overlay',
  'app/commandreference',
  'animo'], 
  function (Mousetrap, search, overlay, commandReference) {
  var copyToClipboard =  function(text) {
    var $placeholder = $("<textarea/>");
    $placeholder.text(text);
    $("body").append($placeholder);
    $placeholder.select();
    document.execCommand("copy", true);
    $placeholder.remove();
  };

  var loggedOut = function () {
    return $('body').hasClass('logged-out');
  };

  var searchHasFocus = function () {
    return $('#search-field').is(':focus');
  };

  var init = function () {
    Mousetrap.bind(['command+c', 'ctrl+c'], function (e) {
      if (overlay.visible()) return;
      var $focus = $('.row-flex:focus');
      var name = $focus.find('.switch-name').text();
      copyToClipboard(name);
      $focus.focus();
      $focus.find('.switch-name')
        .animo({animation:'row-highlighter', duration:0.5});
    });

    Mousetrap.bind(['?','/'], function (e) {
      if (searchHasFocus()) return;
      commandReference.toggle();
    });

    Mousetrap.bind(['command+f', 'ctrl+f'], function (e) {
      if (overlay.visible()) return;
      e.preventDefault();
      search.focus();
      search.select();
    });

    Mousetrap.bind('i', function (e) {
      if (overlay.visible()) 
        overlay.hide();
      else
        $('.row-flex:focus').closest('.switch-row').trigger('info');
    });

    Mousetrap.bind(['down', 'j', 'tab'], function (e, key) {
      if (key === 'j' && searchHasFocus() || loggedOut()) return;
      e.preventDefault();
      if (overlay.visible()) return;
      var $focus = $('.row-flex:visible:focus');
      if ($focus.length){
        $focus.closest('.switch-row')
          .nextAll(':visible').first()
          .find('.row-flex')
          .focus(); 
      } else {
        $('.row-flex:visible').first().focus();
      }
    });

    Mousetrap.bind(['up', 'k'], function (e, key) {
      if (key === 'k' && searchHasFocus()) return;
      e.preventDefault();
      if (overlay.visible()) return;
      var $prev = $('.row-flex:visible:focus')
        .closest('.switch-row')
        .prevAll(':visible')
        .first();
      if ($prev.length){
        $prev.find('.row-flex')
        .focus();
      } else {
        search.focus();
      }
    });

    Mousetrap.bind(['right', 'l'], function (e, key) {
      if (key === 'l' && searchHasFocus()) return;
      if (overlay.visible()) return;
      e.preventDefault();
      var $row = $('.row-flex:focus');
      if (!$row.hasClass('overridden'))
        $row.find('.status-flipper').trigger('click');
    });

    Mousetrap.bind(['left', 'h'], function (e, key) {
      if (key === 'h' && searchHasFocus()) return;
      if (overlay.visible()) return;
      e.preventDefault();
      var $row = $('.row-flex:focus');
      if ($row.hasClass('overridden'))
        $row.find('.status-flipper').trigger('click');
    });

    Mousetrap.bind('enter', function (e) {
      if (overlay.visible()) return;
      $('.row-flex:focus').find('.status-flipper').trigger('click');
    });
  };
  return {init:init};
});