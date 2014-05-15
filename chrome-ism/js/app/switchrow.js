define(['backbone','underscore','app/search', 'app/overlay'], 
  function (Backbone,_,search,overlay) {
  var options = {
    events: {
      'click .status-flipper': 'toggleOverride',
      'dblclick': 'showSwitchInfo',
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
      getSelection().empty();
      var html = ism.templates.switchinfo(this.model.attributes);
      overlay.show(html);
    },

    render: function ($container) {
      var self = this;
      self.$el.html(ism.templates.switchrow(
        self.model.attributes));
      if (self.allowOverrides) self.$el.find('.row-flex')
        .addClass('overridable');
      $container.append(self.$el);
    },

    filterByText: function (query) {
      var name = this.model.attributes
        .name.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
      if (~name.indexOf(query))
        $(this.el).show();
      else
        $(this.el).hide();
    },

    filterByRegex: function (regex) {
      if (regex.test(this.model.attributes.name) ||
        regex.test(this.model.attributes.description))
        $(this.el).show();
      else
        $(this.el).hide();
    },

    initialize: function (options) {
      this.listenTo(search, 'input:text', this.filterByText);
      this.listenTo(search, 'input:regex', this.filterByRegex);
      this.allowOverrides = options.allowOverrides;
    }
  };

  return Backbone.View.extend(options);
});