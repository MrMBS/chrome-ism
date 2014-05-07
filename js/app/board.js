define(['backbone','underscore'], function (Backbone,_) {
  var board = (function () {
    var result = {};
    result.tagName = 'div';

    result.render = function (sorter) {
      var self = this;
      _.delay(function () {
        var html = ism.templates.board({
          switches: sorter.sort(self.collection.models), 
          collection: self.collection
        });
        $(self.el).html(html);
      },0);
    };
    return result;
  })();

  return Backbone.View.extend(board);
});