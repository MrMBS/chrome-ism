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

require(['app/config',
  'app/pagehandlers',
  'app/switchrow',
  'app/switchlist',
  'app/board',
  'app/urlparser',
  'app/switchsorters',
  'app/changehistory',
  'app/mousetrapbindings',
  ],
function (config,
  handlers,
  SwitchRow,
  SwitchList,
  Board,
  parseUrl,
  switchSorters,
  ChangeHistory,
  mousetraps) {
$(function () {

  Handlebars.registerHelper('indicator', function () {
    var classes = '';
    if (this.overridden) classes += 'overridden';
    if (this.enabled === null) return classes;
    return (classes += (this.enabled ? ' enabled' : ' disabled'));
  });

  Handlebars.registerHelper('renderSwitch', function (collection) {
    var self = this;
    _.delay(function () {
        new SwitchRow({
        model:self,
        collection:collection,
        id:'switch-row-' + self.id
      }).render();
    }, 0);
    return '';
  });

  var getToken = function (callback) {
    var authTokenQuery = {
      url: config.deploymentUrl, 
      name:'access_token'
    };
    chrome.cookies.get(authTokenQuery, function (cookie) {
      callback(cookie && cookie.value);
    });
  };

  var getAspNetSessionId = function (url,callback) {
    var sessionIdQuery = {
      url: url,
      name: 'ASP.NET_SessionId'
    };
    chrome.cookies.get(sessionIdQuery, function (cookie) {
      callback(cookie && cookie.value);
    });
  };

  var showLogin = function () {
    var html = ism.templates.login();
    $('.content').html(html);
    $('#login-btn').on('click', function () {
      chrome.tabs.create({
        url: config.deploymentUrl,
        active: true
      });
    });
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
      window.switchList = switchList;
      switchList.sync('read');
      var board = new Board({
        collection: switchList, 
        el:$('#switch-board')
      });
      window.board = board;
      board.render(sorter);
    });
  };

  var showSwitches = function (token) {
    $.ajax({
      url: 'https://deployment.mindbodyonline.com' + 
      '/api/implementationswitch',
      headers: {'Authorization': 'Bearer ' + token}
    }).done(function(deploymentData){
      $.ajax({
        url: 'https://deployment.mindbodyonline.com' + 
        '/api/project',
        headers: {'Authorization': 'Bearer ' + token}
      }).done(function(projects){
        chrome.tabs.getSelected(function (tab) {
          $.post(getSwitchSettingsUrl(tab.url)).done(function(switchSettings){
            buildView(tab,deploymentData,switchSettings,projects);
          }).fail(function () {
            var switchSettings = {
              serverRole: 3,
              projectNames: []
            };
            var projects = [];
            buildView(tab,deploymentData,switchSettings,projects);
          });
        });
      });
    });
  };

  getDeploymentData = function (token) {
    if (!token)
      showLogin();
    else
      showSwitches(token);
  };

  getToken(getDeploymentData);
  mousetraps.init();
});
});