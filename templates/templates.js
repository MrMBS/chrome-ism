this["ism"] = this["ism"] || {};
this["ism"]["templates"] = this["ism"]["templates"] || {};

this["ism"]["templates"]["board"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", helper, options;
  buffer += "\r\n    <li class=\"switch-row\">"
    + escapeExpression((helper = helpers.renderSwitch || (depth0 && depth0.renderSwitch),options={hash:{},data:data},helper ? helper.call(depth0, depth0, (depth1 && depth1.collection), options) : helperMissing.call(depth0, "renderSwitch", depth0, (depth1 && depth1.collection), options)))
    + "</li>\r\n  ";
  return buffer;
  }

  buffer += "<ul class=\"switch-list ul-reset\">\r\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.switches), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</ul>";
  return buffer;
  });

this["ism"]["templates"]["login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\r\n  Whatchu tryin' to do, huh? You ain't logged in.\r\n  <button id=\"login-btn\">Login</button>\r\n</div>";
  });

this["ism"]["templates"]["switchrow"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row-flex ";
  if (helper = helpers.indicator) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.indicator); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n  <div class=\"switch-status\"></div>\r\n  <div class=\"truncate switch-name-block\">\r\n    <span class=\"switch-name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n  </div>\r\n  <div class=\"status-flipper\"><span class=\"glyphicon glyphicon-off\"></span></div>\r\n</div>";
  return buffer;
  });