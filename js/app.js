require.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app'
  },
  shim: {
    'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    }
  }
});

require(['app/config','app/pagehandlers', 'app/switchrow'],
function (config,handlers,SwitchRow) {
$(function () {

  Handlebars.registerHelper('indicator', function () {
    var classes = '';
    // temp: mock explicit enabling
    var random = Math.floor(Math.random() * 9) - 6;
    switch (random) {
      case 1:
        classes += 'exp-enabled';
        break;
      case 2:
        classes += 'exp-disabled';
        break;
    }
    if (this.enabled === null) return classes;
    return (classes += (this.enabled ? ' enabled' : ' disabled'));
  });

  Handlebars.registerHelper('renderSwitch', function (model,collection) {
    return new SwitchRow({model:model,collection:collection}).render();
  });

  var deploymentData = [];
  ism.switches = {
    byId: {},
    byName: {}
  };

  var getSwitchCookies = function (callback) {
    // body...
  };

  var getToken = function (callback) {
    var authTokenQuery = {
      url: config.deploymentUrl, 
      name:'access_token'
    };
    chrome.cookies.get(authTokenQuery, function (cookie) {
      callback(cookie && cookie.value);
    });
  };

  var parseSwitches = function (switches, callback) {
    chrome.tabs.getSelected(function (tab) {
      var mapper = handlers.getFromUrl(tab.url);
      _(switches).each(function (input) {
        var output = {
          name: input.name,
          id: input.id,
          enabled: mapper(input, tab.url),
          description: input.description
        };
        ism.switches.byName[input.name] = output;
        ism.switches.byId[input.id] = output;
      });
      callback();  
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

  var toggleSwitch = function () {
    var $row = $(this).closest('.switch-row');
    if ($row.hasClass('exp-enabled') || $row.hasClass('exp-disabled')){
      $row.removeClass('exp-enabled');
      $row.removeClass('exp-disabled');
    } else if ($row.hasClass('enabled')) {
      $row.addClass('exp-disabled');
    } else if ($row.hasClass('disabled')){
      $row.addClass('exp-enabled');
    }
  };

  var showSwitches = function (token) {
    $.ajax({
      url: 'https://deployment.mindbodyonline.com' + 
      '/api/implementationswitch',
      headers: {'Authorization': 'Bearer ' + token}
    }).done(function(data){
      deploymentData = data;
      parseSwitches(data.implementationSwitches, function () {
        var switchArray = _(ism.switches.byId).toArray();
        var html = ism.templates.board({
          switches: switchArray
        });
        $('.content').html(html);
        $('.status-flipper').on('click', toggleSwitch);
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
});
});