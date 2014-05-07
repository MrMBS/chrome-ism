define(['underscore','app/errors'], function (_,errors) {
  var self = {};

  self.projectNameMapping = {
    'Modernization': 5
  };

  deploymentPhases = {
    inDevelopment:                  100,
    readyForCodeDeployToPreview:    200,
    codeDeployedToPreview:          300,
    readyForCodeDeployToClients:    400,
    codeDeployedToClients:          500,
    readyToEnableOnClients:         600,
    enabledOnClients:               700,
    readyForCleanup:                800,
    cleanedUp:                      900,
    removedFromSettingsApi:         1000
  };
  
  var buildClientsHandler = function (settings,projects) {
    return function (impSwitch) {
      return impSwitch.deploymentPhaseId >= 
        deploymentPhases.enabledOnClients;
    };
  };

  var buildPreviewHandler = function (settings,projects) {
    return function (impSwitch) {
      return impSwitch.deploymentPhaseId >= 
        deploymentPhases.codeDeployedToClients;
    };
  };

  var buildDevHandler = function (settings,projects) {
    var projectsMap = {};
    _(projects).each(function (project) {
      projectsMap[project.name] = project.id;
    });
    var projectIds = _(settings.projectNames).map(function (name) {
      return projectsMap[name];
    });
    return function (impSwitch) {
      return impSwitch.deploymentPhaseId >= 
        deploymentPhases.codeDeployedToPreview ||
        _(impSwitch.projectIds).intersection(projectIds).length;
    };
  };

  self.get = function (settings,projects) {
    switch(settings.serverRole){
      case 1:
        return buildDevHandler(settings,projects);
      case 2:
        return buildPreviewHandler(settings,projects);
      case 3:
        return buildClientsHandler(settings,projects);
    }
    throw new Error(errors.invalidServerRole);
  };

  return self;
});