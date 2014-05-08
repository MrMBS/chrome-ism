define(['backbone','underscore', 'app/switchrow'], 
  function (Backbone,_,SwitchRow) {
  var board = (function () {
    var result = {};

    result.render = function (sorter) {
      var self = this;
      sorter.sort(self.collection.models);
      var html = ism.templates.board();
      self.$el.html(html);
      self.rows = _(self.collection.models)
        .map(function (model) {
        return new SwitchRow({
          model: model,
          collection: self.collection,
          id: 'switch-row-' + model.id,
          className: 'switch-row',
          tagName: 'li'
        });
      });
      _(self.rows).each(function (row) {
        row.render(self.$('.switch-list'));
      });
      $('#' + self.id).replaceWith(self.$el);
    };
    return result;
  })();

  return Backbone.View.extend(board);
});