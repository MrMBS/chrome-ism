define(['Backbone','underscore'], function (Backbone,_) {
  var ChangeHistory = function (switchList) {
    var self = this;
    _.extend(self,Backbone.Events);
    self.listenTo(switchList, 'update:overrides', function (updates) {
      chrome.storage.sync.get('overrideHistory', function (items) {
        items.overrideHistory = items.overrideHistory || {};
        _(updates).each(function (update) {
          items.overrideHistory[update] = Date.now();
        });
        chrome.storage.sync.set(items);
      });
    });

    self.getRecent = function (count, callback) {
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
  };

  return ChangeHistory;
});