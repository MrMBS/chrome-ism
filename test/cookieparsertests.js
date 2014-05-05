// for chai syntax:
/* jshint expr: true */
var expect = require('chai').expect;
suite('cookieManager', function () {
  var cookieManager;
  var config;

  var testState = {};

  setup(function (done) {
    require('../testsetup').setup(['app/cookiemanager', 'app/config'], 
      function (parser, conf) {
      cookieManager = parser;
      config = conf;
      done();
    });
  });

  var mockCookieApiGet = function (encoded, enabled) {
    var ignore = '%5B%22ignore%22%5D';
    var enabledValue = enabled ? encoded : ignore;
    var disabledValue = enabled ? ignore : encoded;
    chrome = chrome || {};
    chrome.cookies = chrome.cookies || {};
    chrome.cookies.getAll = function (query,callback) {
      if (query.url === config.settingsDevUrl){
        var cookies = [
          {name: config.enabledCookie, value: enabledValue},
          {name: config.disabledCookie, value: disabledValue}
        ];
        callback(cookies);
      }
      else
        callback(null);
    };  
  };

  var mockCookieApiSet = function () {
    chrome = chrome || {};
    chrome.cookies = chrome.cookies || {};
    chrome.cookies.set = function (details, callback) {
      if (details.url === config.settingsDevUrl &&
          details.domain === config.devDomain) {
        testState.cookies = testState.cookies || {};
        testState.cookies[details.name] = details.value;
        callback({
          name: details.name,
          value: details.value,
          domain: details.domain
        });
      } else if (details.url === config.deploymentUrl &&
          details.domain === config.deploymentDomain) {
        testState.depCookies = testState.depCookies || {};
        testState.depCookies[details.name] = details.value;
        callback({
          name: details.name,
          value: details.value,
          domain: details.domain
        });
      }
    };
  };

  suite('.getAccessToken', function () {
    test('should get an access token', function (done) {
      chrome = {};
      chrome.cookies = {};
      chrome.cookies.get = function (query,callback) {
        callback('qwertasdkwnelkjnw');
      };
      cookieManager.getAccessToken(function (token) {
        expect(token).to.not.be.empty;
        done();
      });
    });
  });

  suite('.getCookieSwitchMap', function () {
    test('should get single enabled cookie', function (done) {
      var switchName = 'testSwitchName';
      var encoded = '%5B%22testSwitchName%22%5D';
      mockCookieApiGet(encoded,true);
      cookieManager.getCookieSwitchMap(function (map) {
        expect(map[switchName]).to.be.true;
        done();
      });
    });

    test('should get single disabled cookie', function (done) {
      var switchName = 'testSwitchName';
      var encoded = '%5B%22testSwitchName%22%5D';
      mockCookieApiGet(encoded,false);
      cookieManager.getCookieSwitchMap(function (map) {
        expect(map[switchName]).to.be.false;
        done();
      });
    });


    test('should handle multiple switches', function (done) {
      var first = 'first';
      var second = 'second';
      var encoded = '%5B%22first%22%2C%22second%22%5D';
      mockCookieApiGet(encoded,true);
      cookieManager.getCookieSwitchMap(function (map) {
        expect(map[first]).to.be.true;
        expect(map[second]).to.be.true;
        done();
      });
    });
  });

  suite('.setCookieSwitchMap', function () {
    test('should set enabled cookie for single', function (done) {
      var switchName = 'testSwitchName';
      var encoded = '%5B%22testSwitchName%22%5D';
      var emptyEncoded = '%5b%5d';

      mockCookieApiSet();
      var map = {};
      map[switchName] = true;
      cookieManager.setCookieSwitchMap(map, function () {
        expect(testState.cookies.explicitlyEnabled).to.be.equal(encoded);
        expect(testState.depCookies.explicitlyEnabled).to.be.equal(encoded);
        done();
      });
    });

    test('should set disabled cookie for single', function (done) {
      var switchName = 'testSwitchName';
      var encoded = '%5B%22testSwitchName%22%5D';
      var emptyEncoded = '%5b%5d';

      mockCookieApiSet();
      var map = {};
      map[switchName] = false;
      cookieManager.setCookieSwitchMap(map, function () {
        expect(testState.cookies.explicitlyDisabled).to.be.equal(encoded);
        expect(testState.depCookies.explicitlyDisabled).to.be.equal(encoded);
        done();
      });
    });

    test('should handle multiple switches', function (done) {
      var first = 'first';
      var second = 'second';
      var encoded = '%5B%22first%22%2C%22second%22%5D';

      mockCookieApiSet();
      var map = {};
      map[first] = false;
      map[second] = false;
      cookieManager.setCookieSwitchMap(map, function () {
        expect(testState.cookies.explicitlyDisabled).to.be.equal(encoded);
        expect(testState.depCookies.explicitlyDisabled).to.be.equal(encoded);
        done();
      });
    });

    test('should handle empty switches', function (done) {
      var emptyEncoded = '%5B%5D';

      mockCookieApiSet();
      var map = {};
      cookieManager.setCookieSwitchMap(map, function () {
        expect(testState.cookies.explicitlyEnabled).to.be.equal(emptyEncoded);
        expect(testState.depCookies.explicitlyEnabled)
        .to.be.equal(emptyEncoded);
        done();
      });
    });
  });
});