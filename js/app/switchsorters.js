define(['underscore'], function (_) {
  var result = {};

  var getProjectIds = function (settings,projects) {var projectsMap = {};
    _(projects).each(function (project) {
      projectsMap[project.name] = project.id;
    });
    return _(settings.projectNames).map(function (name) {
      return projectsMap[name];
    });
  };

  var projectCount = function (impSwitch, projectIds) {
    return _(impSwitch.projects)
      .intersection(projectIds).length;
  };

  result.get = function (settings,projects,history,callback) {
    var projectIds = getProjectIds(settings,projects);

    history.getRecent(8, function (recent) {
      var sort = function (switchModels) {
        return switchModels.sort(function (left,right) {
          left = left.attributes;
          right = right.attributes;
          var result =  
            (right.overridden - left.overridden) ||
            ((recent[right.id] || 0) - (recent[left.id] || 0)) ||
            (projectCount(right,projectIds) - projectCount(left,projectIds)) ||
            ((right.name > left.name) ? -1 : ((left.name > right.name) ? 1 :
            0));
          return result;
        });
      };
      callback({sort:sort});
    });
  };

  return result;
});