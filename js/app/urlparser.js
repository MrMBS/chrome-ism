define([],function () {
  var parse = function (url) {
    var parser = document.createElement('a');
    parser.href = url;

    return parser;
  };
  return parse;
});