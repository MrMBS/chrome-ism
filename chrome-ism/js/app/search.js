define(['backbone','underscore'], function (Backbone,_) {
  var search = {};
  _.extend(search,Backbone.Events);

  var $search = $('#search-field');

  $search.on('keyup', function () {
    var query = $(this).val().toLowerCase()
      .replace(/[^A-Za-z0-9]/g,'');

    if(~query.indexOf('konami')) window.whatDoesThisDo();
    search.trigger('input', query);
  });

  search.expand = function () {
    $('.header-bar').addClass('expand');
  };

  search.focus = function () {
    search.expand();
    $search.focus();
  };

  search.select = function () {
    $search.select();
  };

  $search.on('focusout', function () {
    if (!$(this).val().length)
      $('.header-bar').removeClass('expand');
  });

  return search;
});