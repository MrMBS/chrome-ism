define(['app/config'], function (config) {
  var api = {
    init: function (callback) {
      var authTokenQuery = {
        url: config.deploymentUrl, 
        name:'access_token'
      };
      chrome.cookies.get(authTokenQuery, function (cookie) {
        if (!cookie || !cookie.value)
          callback(new Error('token not found'));
        else {
          api.token = cookie.value;
          callback(null);
        }
      });
    },
    getSwitchData: function (callback) {
      $.ajax({
        url: config.deploymentUrl + 
        '/api/implementationswitch',
        headers: {'Authorization': 'Bearer ' + api.token},
        success: function (data) {
          callback(null,data);
        },
        error: function (jqXhr,status,error) {
          callback(jqXhr.status,null);
        }
      });
    },
    getProjectMappings: function (callback) {
      $.ajax({
        url: config.deploymentUrl + 
        '/api/project',
        headers: {'Authorization': 'Bearer ' + api.token},
        success: function (data) {
          callback(null,data);
        },
        error: function (jqXhr,status,error) {
          callback(jqXhr.status,null);
        }
      });
    }
  };
  return api;
});