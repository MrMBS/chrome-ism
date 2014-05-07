// for chai syntax:
/* jshint expr: true */
var expect = require('chai').expect;
suite('ChangeHistory', function () {
  var ChangeHistory;
  var config;
  var Backbone;
  var _;
  chrome = {};
  var testState = {};

  setup(function (done) {
    require('../testsetup').setup(['app/changehistory', 
      'app/config', 'Backbone', 'underscore'], 
      function (chHist, conf, bb, under) {
      ChangeHistory = chHist;
      config = conf;
      Backbone = bb;
      _ = under;
      done();
    });
  });

  var mockChromeStorage = function () {
    chrome = chrome || {};
    chrome.storage = chrome.storage || {};
    chrome.storage.sync = chrome.storage.sync || {};
    chrome.storage.sync.set = function (items,callback) {
      _.delay(function () {
        _.extend(testState,items);
        callback && callback();
      },0);
    };
    chrome.storage.sync.get = function (keys,callback) {
      _.delay(function () {
        if (keys === null)
          callback(testState);
        else {
          var keyValues = _([].concat(keys)).map(function (key) {
            return [key,testState[key]];
          });
          callback(_(keyValues).object());
        }
      },0);
    };
  };

  suite('switchlist->update:overrides', function () {
    test('should log the update in chrome storage', function (done) {
      mockChromeStorage();
      var switchlist = {};
      _(switchlist).extend(Backbone.Events);
      var changeHistory = new ChangeHistory(switchlist);
      switchlist.trigger('update:overrides', [5,2]);
      _.delay(function () {
        chrome.storage.sync.get('overrideHistory', function (items) {
          expect(items.overrideHistory[5]).to.be.a('number');
          expect(items.overrideHistory[2]).to.be.a('number');
          expect(items.overrideHistory[4]).to.be.undefined;
          done();
        });
      },0);
    });
  });

  suite('#getRecent', function () {
    test('should get the last n changes', function (done) {
      mockChromeStorage();
      var switchlist = {};
      _(switchlist).extend(Backbone.Events);
      var changeHistory = new ChangeHistory(switchlist);
      var items = {
        overrideHistory: {
          6: 111111111,
          5: 333333333,
          3: 222222222,
          1: 444444444
        }
      };
      chrome.storage.sync.set(items, function () {
        var recent = changeHistory.getRecent(2, function (items) {
          expect(items[1]).to.be.ok;
          expect(items[5]).to.be.ok;
          expect(items[6]).to.not.be.ok;
          expect(items[3]).to.not.be.ok;
          done();
        });
      });
    });
  });
});