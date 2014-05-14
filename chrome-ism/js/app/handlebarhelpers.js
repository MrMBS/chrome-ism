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

    Handlebars.registerHelper('phaseName', function (phaseId) {
      var phaseNames = {
        100: 'In Development',
        200: 'Ready for Preview',
        300: 'Deployed to Preview',
        400: 'Ready for Clients',
        500: 'Deployed to Clients',
        600: 'Ready to Enable on Clients',
        700: 'Enabled on Clients',
        800: 'Ready for Cleanup',
        900: 'Cleaned Up'
      };

      return phaseNames[phaseId];
    });
  };

  return {init:init};
});