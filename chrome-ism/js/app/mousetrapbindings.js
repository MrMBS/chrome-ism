define(['mousetrap','app/search','animo'], function (Mousetrap, search) {

  var copyToClipboard =  function(text) {
    var $placeholder = $("<textarea/>");
    $placeholder.text(text);
    $("body").append($placeholder);
    $placeholder.select();
    document.execCommand("copy", true);
    $placeholder.remove();
  };

  var init = function () {
    Mousetrap.bind(['command+c', 'ctrl+c'], function (e) {
      var $focus = $('.row-flex:focus');
      var name = $focus.find('.switch-name').text();
      copyToClipboard(name);
      $focus.focus();
      $focus.find('.switch-name')
        .animo({animation:'row-highlighter', duration:0.5});
    });

    Mousetrap.bind(['command+f', 'ctrl+f'], function (e) {
      e.preventDefault();
      search.focus();
      search.select();
    });

    Mousetrap.bind(['down'], function (e) {
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

    Mousetrap.bind(['up'], function (e) {
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

    Mousetrap.bind(['right'], function (e) {
      e.preventDefault();
      var $row = $('.row-flex:focus');
      if (!$row.hasClass('overridden'))
        $row.find('.status-flipper').trigger('click');
    });

    Mousetrap.bind(['left'], function (e) {
      e.preventDefault();
      var $row = $('.row-flex:focus');
      if ($row.hasClass('overridden'))
        $row.find('.status-flipper').trigger('click');
    });

    Mousetrap.bind('enter', function (e) {
      $('.row-flex:focus').find('.status-flipper').trigger('click');
    });
  };
  return {init:init};
});