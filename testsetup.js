var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: 'js/lib',
  paths: {
    app: '../app'
  }
});
exports.setup = function (deps,callback) {
  requirejs(deps,callback);
};