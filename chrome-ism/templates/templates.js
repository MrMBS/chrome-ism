this["ism"] = this["ism"] || {};
this["ism"]["templates"] = this["ism"]["templates"] || {};

this["ism"]["templates"]["board"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\r\n<ul class=\"switch-list ul-reset\">\r\n</ul>";
  });

this["ism"]["templates"]["commandreference"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <tr class=\"command\">\r\n      <td class=\"command-keys\">";
  if (helper = helpers.keys) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.keys); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n      <td class=\"command-description\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n    </tr>\r\n  ";
  return buffer;
  }

  buffer += "<div class=\"command-reference\">\r\n  <h3>Command Reference</h3>\r\n  <hr/>\r\n  <table class=\"command-table\">\r\n  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </table>\r\n</div>";
  return buffer;
  });

this["ism"]["templates"]["switchinfo"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"switch-info\">\r\n  <div class=\"truncate\">\r\n    <h3 class=\"switch-info-name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n  </div>\r\n  <hr/>\r\n  <div class=\"switch-info-phase\">\r\n    <span class=\"phase-name phase-color-";
  if (helper = helpers.phaseId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.phaseId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression((helper = helpers.phaseName || (depth0 && depth0.phaseName),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.phaseId), options) : helperMissing.call(depth0, "phaseName", (depth0 && depth0.phaseId), options)))
    + "</span>\r\n  </div>\r\n  <p class=\"switch-info-description\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n</div>";
  return buffer;
  });

this["ism"]["templates"]["switchrow"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"row-flex ";
  if (helper = helpers.indicator) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.indicator); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" tabindex=\"1\">\r\n  <div class=\"switch-status\"></div>\r\n  <div class=\"truncate switch-name-block\">\r\n    <span class=\"switch-name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n  </div>\r\n  <div class=\"status-flipper\"><span class=\"glyphicon glyphicon-off\"></span></div>\r\n</a>\r\n";
  return buffer;
  });