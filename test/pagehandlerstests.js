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

  suite('.getFromUrl', function () {
    test('should get all the correct handlers', function () {
      clients = handlers.getFromUrl(
        'https://clients.mindbodyonline.com/somethingelse.asp');
      expect(clients).to.be.equal(handlers.clientsHandler);
      preview = handlers.getFromUrl(
        'https://preview.mindbodyonline.com/somethingelse.asp');
      expect(preview).to.be.equal(handlers.previewHandler);
      devHttps = handlers.getFromUrl(
        'https://dev-modernization.mbodev.me/bobblebop.asp');
      expect(devHttps).to.be.equal(handlers.devHandler);
      devHttp = handlers.getFromUrl(
        'http://dev-salon.mbodev.me/bobblebop.asp');
      expect(devHttp).to.be.equal(handlers.devHandler);
      devLocal = handlers.getFromUrl(
        'https://dev-local.mbodev.me/bobblebop.asp');
      expect(devLocal).to.be.equal(handlers.devLocalHandler);
      deployment = handlers.getFromUrl(
        'https://deployment.mindbodyonline.com/bobblebop.asp');
      expect(deployment).to.be.equal(handlers.clientsHandler);
    });
  });

  suite('.devHandler', function () {
    test('should correctly identify subdomains', function () {
      var modernization = 
      'https://dev-modernization.mbodev.me/something.asp';
      var salon = 'https://dev-salon.mbodev.me/something.asp';

      expect(handlers.devHandler({projectIds:[5]},modernization))
        .to.be.ok;
      expect(handlers.devHandler({projectIds:[5]},salon))
        .to.not.be.ok;
    });
    test('should be true if the switch is enabled on preview', function () {
      var modernization = 
      'https://dev-modernization.mbodev.me/something.asp';

      expect(handlers.devHandler({deploymentPhaseId:300},modernization))
        .to.be.ok;
      expect(handlers.devHandler({deploymentPhaseId:500},modernization))
        .to.be.ok;
    });
    test('should return false if the switch is not enabled on preview ' + 
      'and the subdomain does not find a match', function () {
        var modernization = 
        'https://dev-modernization.mbodev.me/something.asp';

        expect(handlers.devHandler({
          deploymentPhaseId:200, projectIds:[]
        }, modernization)).to.not.be.ok;
    });
  });
});