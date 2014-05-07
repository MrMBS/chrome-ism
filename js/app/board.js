define(['backbone','underscore', 'app/switchrow'], function (Backbone,_,SwitchRow) {
  var board = (function () {
    var result = {};
    result.tagName = 'div';

    result.render = function (sorter) {
      var self = this;
      sorter.sort(self.collection.models);
      var html = ism.templates.board({
        switches: _(self.collection.models).map(function (model) {
          return new SwitchRow({
            model: model,
            collection: self.collection,
            id: 'switch-row-' + model.id,
            className: 'switch-row'
          });
        }), 
        collection: self.collection
      });
      return html;
    };
    return result;
  })();

  return Backbone.View.extend(board);
});