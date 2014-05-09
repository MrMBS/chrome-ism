require.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app'
  },
  shim: {
    'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    'animo': {
      deps:['jquery']
    }
  }
});

require([
  'async',
  'app/config',
  'app/pagehandlers',
  'app/switchrow',
  'app/switchlist',
  'app/board',
  'app/urlparser',
  'app/switchsorters',
  'app/changehistory',
  'app/mousetrapbindings',
  'app/handlebarhelpers',
  'app/deploymentApi',
  ],
function (
  async,
  config,
  handlers,
  SwitchRow,
  SwitchList,
  Board,
  parseUrl,
  switchSorters,
  ChangeHistory,
  mousetraps,
  helpers,
  deployment) {
$(function () {
  var showLogin = function () {
    $('body').addClass('logged-out');
    $('body').removeClass('loading');
    $('a.login-btn').on('click', function (e) {
      chrome.tabs.create({url: config.deploymentUrl});
    });
  };

  var showLoading = function () {
    $('body').addClass('loading');
  };

  var getSwitchSettingsUrl = function (tabUrl) {
    var parsed = parseUrl(tabUrl);
    return parsed.protocol + '//' + 
      parsed.host + 
      config.switchSettingsPath;
  };

  var buildView = function (tab,deploymentData,switchSettings,projects) {
    var pageHandler = handlers.get(switchSettings,projects);
    var switchList = new SwitchList({
        pageHandler: pageHandler,
        switches: deploymentData.implementationSwitches,
        url:tab.url
      });
    var changeHistory = new ChangeHistory(switchList);
    switchSorters.get(switchSettings,projects,changeHistory,
      function (sorter) {
      switchList.sync('read', function () {
        var board = new Board({
          collection: switchList, 
          el:$('#switch-board')
        });
        board.render(sorter);
        $('body').addClass('logged-in');
        $('body').removeClass('loading');
      });
    });
  };

  var getCurrentTab = function (callback) {
    chrome.tabs.getSelected(function (tab) {
      callback(null,tab);
    });
  };

  mousetraps.init();
  helpers.init(Handlebars);

  deployment.init(function (err) {
    if (err) return showLogin();
    showLoading();
    var tasks = [
      deployment.getSwitchData,
      deployment.getProjectMappings,
      getCurrentTab
    ];
    async.parallel(tasks, function (err,results) {
      if (err === 401) return showLogin();
      else if (err) throw err;
      var switchData = results[0];
      var projects = results[1];
      var tab = results[2];
      $.post(getSwitchSettingsUrl(tab.url)).done(function(switchSettings){
        buildView(tab,switchData,switchSettings,projects);
      }).fail(function () {
        var switchSettings = {
          serverRole: 3,
          projectNames: []
        };
        var projects = [];
        buildView(tab,switchData,switchSettings,projects);
      });
    });
  });
});
});