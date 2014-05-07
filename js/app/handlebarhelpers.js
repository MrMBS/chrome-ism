define([], function () {
  var init = function (Handlebars) {

    Handlebars.registerHelper('renderSwitch', function (collection) {
      var html = this.render();
      return html;
    });
  };

  return {init:init};
});