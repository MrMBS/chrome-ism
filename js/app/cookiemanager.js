define(['app/config','underscore', 'async'], function (config,_,async) {
  var self = {};
  var switchMap = {};

  var tryParse = function (cookie) {
    if (!cookie || !cookie.value) return [];
    try{
      return JSON.parse(decodeURIComponent(cookie.value));
    }
    catch (e){
      console.error('Parser error:', e);
      return [];
    }
  };

  self.getCookieSwitchMap = function (callback) {
    var query = {
      url: config.settingsDevUrl
    };

    chrome.cookies.getAll(query, function (cookies) {
      var cookieSet = {};
      _(cookies).each(function (cookie) {
        if (cookie.name === config.enabledCookie)
          cookieSet.enabled = cookie;
        else if (cookie.name === config.disabledCookie)
          cookieSet.disabled = cookie;
        // break if we've found both
        return !(cookieSet.enabled && cookieSet.disabled);
      });
      var enabled = tryParse(cookieSet.enabled);
      var disabled = tryParse(cookieSet.disabled);

      var map = {};
      _(enabled).each(function (switchName) {
        map[switchName] = true;
      });
      _(disabled).each(function (switchName) {
        map[switchName] = false;
      });
      callback && callback(map);
    });
  };

  var makeSetCall = function (details){
    var result =  function (cb) {
      chrome.cookies.set(details, function (cookie) {
        if (cookie === null)
          throw new Error(errors.nullCookieSet);
        cb();
      });
    };
    return result;
  };

  var buildSetDetails = function (switches,enabled,mbodev) {
    var url = mbodev ? config.settingsDevUrl : config.deploymentUrl;
    var domain = mbodev ? config.devDomain : undefined;
    var name = enabled ? 'explicitlyEnabled' : 'explicitlyDisabled';
    var value = encodeURIComponent(JSON.stringify(switches));
    return {url: url, domain: domain, name: name, value: value};
  };

  self.setCookieSwitchMap = function (map,callback) {
    var enabled = [];
    var disabled = [];
    _(map).each(function (on, name) {
      on && enabled.push(name);
      on || disabled.push(name);
    });
    var enabledOpts = buildSetDetails(enabled,true,true);
    var enabledDeploymentOpts = buildSetDetails(enabled,true,false);
    var disabledOpts = buildSetDetails(disabled,false,true);
    var disabledDeploymentOpts = buildSetDetails(disabled,false,false);
    async.parallel([
      makeSetCall(enabledOpts),
      makeSetCall(disabledOpts),
      makeSetCall(enabledDeploymentOpts),
      makeSetCall(disabledDeploymentOpts),
      ], 
      function (err,results) {
        if (err) throw err;
        callback && callback();
      });
  };

  self.getAccessToken = function (callback) {
    var query = {
      url: config.deploymentUrl,
      name: config.accessTokenCookie
    };
    chrome.cookies.get(query,function (token) {
      callback(token);
    });
  };

  return self;
});