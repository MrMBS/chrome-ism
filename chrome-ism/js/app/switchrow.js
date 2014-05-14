define(['backbone','underscore','app/search'], function (Backbone,_,search) {
  var options = {
    events: {
      'click .status-flipper': 'toggleOverride',
      'info': 'showSwitchInfo'
    },

    toggleOverride: function () {
      if (!this.allowOverrides) return;
      var overridden = this.model.get('overridden');
      this.model.set('overridden',!overridden);
      this.collection.sync('update');
      var $flex = $(this.el).find('.row-flex');
      $flex.toggleClass('overridden');
    },

    showSwitchInfo: function () {
      var html = ism.templates.switchinfo(this.model.attributes);
      $('.overlay-content').html(html);
      $('.overlay').toggleClass('hide');
    },

    render: function ($container) {
      var self = this;
      self.$el.html(ism.templates.switchrow(
        self.model.attributes));
      if (self.allowOverrides) self.$el.find('.row-flex')
        .addClass('overridable');
      $container.append(self.$el);
    },

    initialize: function (options) {
      this.listenTo(search, 'input', function (query) {
        var name = this.model.attributes
          .name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
        if (!~name.indexOf(query))
          $(this.el).hide();
        else
          $(this.el).show();
      });
      this.allowOverrides = options.allowOverrides;
    }
  };

  return Backbone.View.extend(options);
});