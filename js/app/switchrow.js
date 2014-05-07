define(['backbone','app/search'], function (Backbone,search) {
  var row = (function () {
    var result = {};
    result.tagName = 'li';
    result.className = 'switch-row';
    result.events = {
      'click .status-flipper': 'toggleOverride',
    };

    result.toggleOverride = function () {
      var overridden = this.model.get('overridden');
      this.model.set('overridden',!overridden);
      this.collection.sync('update');
      $(this.el).find('.row-flex').toggleClass('overridden');
    };

    result.render = function () {
      var self = this;
      return ism.templates.switchrow(
        self.model.attributes);
    };

    result.initialize = function (options) {
      this.listenTo(search, 'input', function (query) {
        var name = this.model.attributes
          .name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
        if (!~name.indexOf(query))
          this.el.hide();
        else
          this.el.show();
      });
      this.delegateEvents();
    };

    return result;
  })();

  return Backbone.View.extend(row);
});