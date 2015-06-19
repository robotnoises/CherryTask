/* global angular */

(function (angular) {

  'use strict';

  angular.module('myApp.global')

  .factory('breadcrumbService', ['$routeParams', '$timeout', 'apiService', function($routeParams, $timeout, api) {
    
    var pub = {};
    
    var breadcrumbs = {
      project: { showing: false, value: {} },
      task: { showing: false, value: {} }
    };
    
    var removeProject = function () {
      breadcrumbs.project.showing = false;
      breadcrumbs.project.value = {};
    };
    
    var removeTask = function () {
      breadcrumbs.task.showing = false;
      breadcrumbs.task.value = {};
    };
    
    var removeAll = function () {
      removeProject();
      removeTask();
    };
    
    var addProject = function (projectId) {
      var id = projectId || $routeParams.id;
      api.get('projects/', id, function (task) {
        breadcrumbs.project.showing = true;
        breadcrumbs.project.value = task;
      });
    };
    
    var addTask = function () {
      var id = $routeParams.id;
      api.get('tasks/', id, function (task) {
        if (!breadcrumbs.project.showing) {
          task.$loaded(function ($snapshot) {
            addProject($snapshot.projectId);  
          });
        }
        breadcrumbs.task.showing = true;
        breadcrumbs.task.value = task;
      });
    };
    
    var _add = function (type) {
      if (type === 'projects') {
        addProject();
        removeTask();
      } else if (type === 'tasks') {
        addTask();
      } else {
        removeAll();
      }
    };
    
    pub.add = _add;
    pub.breadcrumbs = breadcrumbs;
    
    return pub;
  }]);

})(angular);
