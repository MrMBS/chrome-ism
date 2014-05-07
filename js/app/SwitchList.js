define(['backbone', 
  'underscore',
  'app/impswitch', 
  'app/cookiemanager', 
  'app/errors'], 
function (Backbone, _, ImpSwitch, cookieManager, errors) {
  var switches = (function () {
    var result = {};
    result.model = ImpSwitch;

    result.refresh = function () {
      var self = this;
      var models = _(self.switches).map(function (impSwitch) {
        var enabled = self.pageHandler(impSwitch,self.url);
        var overridden = self.overrides.hasOwnProperty(impSwitch.name) &&
          (!self.overrides[impSwitch.name]) != (!enabled);
        return {
          id: impSwitch.id,
          name: impSwitch.name,
          enabled: enabled,
          overridden: overridden,
          description: impSwitch.description,
          phaseId: impSwitch.deploymentPhaseId,
          projects: impSwitch.projectIds
        };
      });
      self.reset(models);
    };

    var refreshOverrides = function () {
      var self = this;
      var changes = [];
      _(self.models).each(function (model) {
        if (model.attributes.overridden){
          self.overrides[model.attributes.name] = !model.attributes.enabled;
          changes.push(model.id);
        } else if (self.overrides.hasOwnProperty(model.attributes.name)){
          delete self.overrides[model.attributes.name];
          changes.push(model.id);
        }
      });
      self.trigger('update:overrides', changes);
    };

    result.process = function (switches) {
      if (!pageHandler)
        throw new Error(errors.boardNotConfigured);
      this.switches = switches;
      this.refresh();
    };

    result.sync = function (method) {
      var self = this;
      switch (method) {
        case 'read':
          cookieManager.getCookieSwitchMap(function (map) {
            self.overrides = map;
            self.refresh();
          });
          break;
        case 'update':
          refreshOverrides.apply(self);
          cookieManager.setCookieSwitchMap(this.overrides);
          break;
      }
    };

    result.initialize = function (options) {
      this.pageHandler = options.pageHandler;
      this.switches = options.switches;
      this.url = options.url;
    };

    return result;
  })();

  var Switches = Backbone.Collection.extend(switches);

  return Switches;
});