// for chai syntax:
/* jshint expr: true */
var expect = require('chai').expect;
describe('switchSorters', function () {
  var sorters;
  var config;
  var changeHistory;

  var testState = {};

  beforeEach(function (done) {
    require('../testsetup').setup(['app/switchsorters', 
      'app/config', 'app/changeHistory'], 
      function (sorts, conf, ChangeHistory) {
      sorters = sorts;
      config = conf;
      mockChromeStorage();
      var switchlist = {};
      _(switchlist).extend(Backbone.Events);
      changeHistory = new ChangeHistory(switchlist);
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

  describe('get', function () {
    it('should sort by project ids', function (done) {
      var settings = {
        projectNames:['Five','Two']
      };
      var projects = [
        {'id':5,'name':'Five'},
        {'id':2,'name':'Two'}
      ];
      var includedOne = 
        {attributes:{name:'IncludedOne', id:2, projects:[5]}};
      var includedTwo = 
        {attributes:{name:'InlucdedTwo', id:5, projects:[2]}};
      var switches = [
        {attributes:{name:'ExcludedOne', id:3, projects:[6]}},
        includedOne,
        {attributes:{name:'ExcludedTwo', id:4, projects:[4]}},
        includedTwo,
        {attributes:{name:'ExcludedThree', id:6, projects:[3]}}
      ];
      sorters.get(settings,projects,changeHistory,function (sorter) {
        sorter.sort(switches);
        expect(switches.slice(0,2)).to.include(includedOne);
        expect(switches.slice(0,2)).to.include(includedTwo);
        done();
      });
    });

    it('should sort alphabetically', function (done) {
      var settings = {
        projectNames:[]
      };
      var projects = [
      ];
      var includedOne = 
        {attributes:{name:'A First', id:3, projects:[6]}};
      var includedTwo = 
        {attributes:{name:'B Second', id:5, projects:[2]}};
      var switches = [
        includedOne,
        {attributes:{name:'Z Last', id:2, projects:[5]}},
        {attributes:{name:'G WhoCares', id:4, projects:[4]}},
        includedTwo,
        {attributes:{name:'F WhoCares', id:6, projects:[3]}}
      ];
      sorters.get(settings,projects,changeHistory,function (sorter) {
        sorter.sort(switches);
        expect(switches.slice(0,2)).to.include(includedOne);
        expect(switches.slice(0,2)).to.include(includedTwo);
        done();
      });
    });

    it('should sort by last activity', function (done) {
      var settings = {
        projectNames:[]
      };
      var projects = [
      ];
      var includedOne = 
        {attributes: {name:'IncludedOne', id:2, projects:[5]}};
      var includedTwo = 
        {attributes: {name:'InlucdedTwo', id:5, projects:[2]}};
      var switches = [
        {attributes: {name:'ExcludedOne', id:3, projects:[6]}},
        includedOne,
        {attributes: {name:'ExcludedTwo', id:4, projects:[4]}},
        includedTwo,
        {attributes: {name:'ExcludedThree', id:6, projects:[3]}}
      ];
      chrome.storage.sync.set({
        overrideHistory:{
          2: 77777777,
          5: 66666666
        }
      });
      sorters.get(settings,projects,changeHistory,function (sorter) {
        sorter.sort(switches);
        expect(switches[0]).to.be.equal(includedOne);
        expect(switches[1]).to.be.equal(includedTwo);
        done();
      });
    });
  });
});