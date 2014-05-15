define(['backbone','underscore'], function (Backbone,_) {
  var search = {};
  _.extend(search,Backbone.Events);

  var $search = $('#search-field');

  var searchForString = function (text) {
    $search.removeClass('regex');
    var query = text.toLowerCase()
      .replace(/[^A-Za-z0-9]/g,'');

    if(~query.indexOf('konami')) window.whatDoesThisDo();
    search.trigger('input:text', query);
  };

  var searchForRegex = function (text) {
    $search.addClass('regex');
    var match = /^\/(.*)\/([gimy]*)$/.exec(text);
    if (match === null) 
      $search.removeClass('valid');
    else {
      $search.addClass('valid');
      var regex = new RegExp(match[1], match[2]);
      search.trigger('input:regex', regex);
    }
  };

  $search.on('keyup', function () {
    var searchText = $(this).val();
    if (searchText[0] === '/')
      searchForRegex(searchText);
    else
      searchForString(searchText);
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