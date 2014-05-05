define(['backbone', 
  'underscore',
  'app/impswitch', 
  'app/cookiemanager', 
  'app/errors'], 
function (Backbone, _, ImpSwitch, cookieManager, errors) {
  var switches = (function () {
    var self = this;
    self.model = ImpSwitch;

    var refresh = function () {
      var models = _(self.switches).map(function (impSwitch) {
        var enabled = self.pageHandler(impSwitch);
        var overridden = !self.overrides[impSwitch.name] != !enabled;
        return new Model.ImpSwitch({
          id: impSwitch.id,
          name: impSwitch.name,
          enabled: enabled,
          overridden: overridden,
          description: impSwitch.description,
          phaseId: impSwitch.deploymentPhaseId,
          projects: impSwitch.projectIds
        });
      });
    };

    var refreshOverrides = function () {
      self.models.each(function (model) {
        if (model.overridden){
          self.overrides[model.name] = !model.enabled;
        } else if (self.overrides.hasOwnProperty(model.name)){
          delete self.overrides[model.name];
        }
      });
    };

    self.process = function (switches) {
      if (!pageHandler || !overrides)
        throw new Error(errors.boardNotConfigured);
      self.switches = switches;
      self.reset(models, {merge: true});
    };

    self.sync = function (method) {
      switch (method) {
        case 'read':
          cookieManager.getCookieSwitchMap(function (map) {
            self.overrides = map;
            refresh();
          });
          break;
        case 'update':
          refreshOverrides();
          cookieManager.setCookieSwitchMap(self.overrides);
          break;
      }
    };

    self.initialize = function (options) {
      self.pageHandler = options.pageHandler;
    };
  })();

  var Switches = Backbone.Collection.extend(switches);

  return new Switches();
});