define(['app/overlay'], function (overlay) {
  var commands = [
    {keys: 'i', description: 'Display switch info'},
    {keys: 'ctrl+i', description: 'Open the extension'},
    {keys: 'ctrl+f', description: 'Search for a switch by name'},
    {keys: 'up/down', description: 'Navigate switch list'},
    {keys: 'right/left', description: 'Toggle switch on/off'},
    {keys: '?', description: 'Show/hide command reference'}
  ];

  return {
    toggle: function () {
      if (overlay.visible())
        this.hide();
      else
        this.show();
    },
    show: function () {
      var html = ism.templates.commandreference(commands);
      overlay.show(html);
    },
    hide: function () {
      overlay.hide();
    }
  };
});