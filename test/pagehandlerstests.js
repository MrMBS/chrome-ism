// for chai syntax:
/* jshint expr: true */
var expect = require('chai').expect;
suite('handlers', function () {
  var handlers;
  setup(function (done) {
    require('../testsetup').setup(['app/pagehandlers'], function (hndlrs) {
      handlers = hndlrs;
      done();
    });
  });

  suite('.get -> mbodev handler', function () {
    test('should correctly map the project name', function () {
      var settings = {
        serverRole:1,
        projectNames:['Five']
      };
      var projects = [
        {'id':5,'name':'Five'},
        {'id':6,'name':'Six'}
      ];
      var handler = handlers.get(settings,projects);
      var first = handler({deploymentPhaseId: 100, projectIds:[5]});
      var second = handler({deploymentPhaseId: 100, projectIds:[6]});
      expect(first).to.be.ok;
      expect(second).to.not.be.ok;
    });
  });

  suite('.get -> preview handler', function () {
    test('should correctly filter off deploymentPhaseId', function () {
      var settings = {
        serverRole:2,
      };
      var handler = handlers.get(settings);
      var first = handler({deploymentPhaseId: 500});
      var second = handler({deploymentPhaseId: 400});
      expect(first).to.be.ok;
      expect(second).to.not.be.ok;
    });
  });

  suite('.get -> clients handler', function () {
    test('should correctly filter off deploymentPhaseId', function () {
      var settings = {
        serverRole:3,
      };
      var handler = handlers.get(settings);
      var first = handler({deploymentPhaseId: 700});
      var second = handler({deploymentPhaseId: 600});
      expect(first).to.be.ok;
      expect(second).to.not.be.ok;
    });
  });
});