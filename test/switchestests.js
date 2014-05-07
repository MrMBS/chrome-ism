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
        callback.apply({},{
          name: details.name,
          value: details.value,
          domain: details.domain
        });
      } else if (details.url === config.deploymentUrl &&
          details.domain === config.deploymentDomain) {
        testState.depCookies = testState.depCookies || {};
        testState.depCookies[details.name] = details.value;
        callback.apply({},{
          name: details.name,
          value: details.value,
          domain: details.domain
        });
      }
    };
  };
});