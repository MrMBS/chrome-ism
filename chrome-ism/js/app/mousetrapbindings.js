define(['mousetrap','app/search','animo'], function (Mousetrap, search) {

  var copyToClipboard =  function(text) {
    var $placeholder = $("<textarea/>");
    $placeholder.text(text);
    $("body").append($placeholder);
    $placeholder.select();
    document.execCommand("copy", true);
    $placeholder.remove();
  };

  var overylayShown = function () {
    return !$('.overlay').hasClass('hide');
  };

  var init = function () {
    Mousetrap.bind(['command+c', 'ctrl+c'], function (e) {
      if (overylayShown()) return;
      var $focus = $('.row-flex:focus');
      var name = $focus.find('.switch-name').text();
      copyToClipboard(name);
      $focus.focus();
      $focus.find('.switch-name')
        .animo({animation:'row-highlighter', duration:0.5});
    });

    Mousetrap.bind(['command+f', 'ctrl+f'], function (e) {
      if (overylayShown()) return;
      e.preventDefault();
      search.focus();
      search.select();
    });

    Mousetrap.bind('i', function (e) {
      $('.row-flex:focus').closest('.switch-row').trigger('info');
    });

    Mousetrap.bind(['down', 'j'], function (e) {
      if (overylayShown()) return;
      e.preventDefault();
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

    Mousetrap.bind(['up', 'k'], function (e) {
      if (overylayShown()) return;
      e.preventDefault();
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

    Mousetrap.bind(['right', 'l'], function (e) {
      if (overylayShown()) return;
      e.preventDefault();
      var $row = $('.row-flex:focus');
      if (!$row.hasClass('overridden'))
        $row.find('.status-flipper').trigger('click');
    });

    Mousetrap.bind(['left', 'h'], function (e) {
      if (overylayShown()) return;
      e.preventDefault();
      var $row = $('.row-flex:focus');
      if ($row.hasClass('overridden'))
        $row.find('.status-flipper').trigger('click');
    });

    Mousetrap.bind('enter', function (e) {
      if (overylayShown()) return;
      $('.row-flex:focus').find('.status-flipper').trigger('click');
    });
  };
  return {init:init};
});