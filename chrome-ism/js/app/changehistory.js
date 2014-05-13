define(['Backbone','underscore'], function (Backbone,_) {
  var ChangeHistory = function (switchList) {
    var history = {};
    _.extend(history,Backbone.Events);
    history.listenTo(switchList, 'update:overrides', function (updates) {
      chrome.storage.sync.get('overrideHistory', function (items) {
        items.overrideHistory = items.overrideHistory || {};
        _(updates).each(function (update) {
          items.overrideHistory[update] = Date.now();
        });
        chrome.storage.sync.set(items);
      });
    });

    history.getRecent = function (count, callback) {
      chrome.storage.sync.get('overrideHistory', function (items) {
        var mapped = _(items.overrideHistory || [])
          .map(function (val, key) {
            return [key,val];
          });
        var sorted = _(mapped).sortBy(function (item) {
          return -item[1];
        });
        callback(_(sorted.slice(0,count)).object());
      });
    };
    return history;
  };

  return ChangeHistory;
});