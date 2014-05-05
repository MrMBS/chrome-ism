define(['app/switches'], function (switches) {
  var row = (function () {
    var self = this;
    self.tagName = 'div';
    self.events = {};

    self.render = function () {
      this.$el.html(ism.templates.board({
        switches:switches.models, 
        collection: self
      }));
    };
    return self;
  })();

  return Backbone.View.extend(row);
});