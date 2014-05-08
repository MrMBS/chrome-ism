define([], function () {
  var init = function (Handlebars) {

    Handlebars.registerHelper('renderSwitch', function (collection) {
      var html = this.render();
      return html;
    });
    
    Handlebars.registerHelper('indicator', function () {
      var classes = '';
      if (this.overridden) classes += 'overridden';
      if (this.enabled === null) return classes;
      return (classes += (this.enabled ? ' enabled' : ' disabled'));
    });
  };

  return {init:init};
});