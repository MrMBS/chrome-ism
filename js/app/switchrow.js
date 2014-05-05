define([], function () {
  var row = (function () {
    var self = this;
    self.tagName = 'li';
    self.className = 'switch-row';
    self.events = {
      'click .status-flipper': 'toggleOverride',
    };
    self.toggleOverride = function () {
      var overridden = self.model.get('overridden');
      self.model.set('overridden',!overridden);
      self.collection.sync('update');
    };

    self.render = function () {
      this.$el.html(ism.templates.switchrow(this.model.attributes));
    };
    return self;
  })();

  return Backbone.View.extend(row);
});