define(['underscore'], function (_) {
  var self = {};

  self.subdomainMapping = {
    'modernization': 5
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

  self.clientsHandler = function (impSwitch,url) {
    return impSwitch.deploymentPhaseId >= 
      deploymentPhases.enabledOnClients;
  };

  self.previewHandler = function (impSwitch,url) {

  };

  self.devLocalHandler = function (impSwitch,url) {

  };

  self.devHandler = function (impSwitch,url) {
    var subdomain = /dev-(\w+)\./i.exec(url)[1].toLowerCase();
    return impSwitch.deploymentPhaseId >= 
      deploymentPhases.codeDeployedToPreview ||
      -~impSwitch.projectIds.indexOf(self.subdomainMapping[subdomain]);
  };

  self.defaultHandler = self.clientsHandler;

  self.domainHandlers = [
    {regex: /clients\.mindbodyonline\.com/i, handler: self.clientsHandler},
    {regex: /preview\.mindbodyonline\.com/i, handler: self.previewHandler},
    {regex: /dev-local\.mbodev\.me/i, handler: self.devLocalHandler},
    {regex: /dev-\w+\.mbodev\.me/i, handler: self.devHandler}
  ];

  self.getFromUrl = function (url) {
    var match = _(self.domainHandlers).find(function (dHndlr) {
      return dHndlr.regex.test(url);
    });
    return (match && match.handler) || self.defaultHandler;
  };

  return self;
});