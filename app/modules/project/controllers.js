(function (angular) {

  'use strict';

  var loc = 'projects/';

  angular.module('myApp.project')

  .controller('allProjectsController', ['$scope', '$routeParams', 'apiService',
    function ($scope, $routeParams, api) {

      $scope.projectModel = {
        title: '',
        description: '',
        dateCreated: '',
        id: ''
      };

      api.list(loc, 10, function (projects) {
        $scope.projects = projects;
      });

      var _addProject = function () {
        var temp = {
          title: 'Random Title ' + Math.floor(Math.random() * 1000) + 1,
          description: 'Random description ' + Math.floor(Math.random() * 100000000) + 1,
          dateCreated: new Date().getTime()
        };

        api.create(loc, temp, function (project) {
          var p = project.val();
          p.id = project.key();
          var projectLoc = loc + p.id;
          api.update(projectLoc, p, p.id);
        });
      };

      $scope.addProject = _addProject;

    }])

  .controller('projectController', ['$scope', '$routeParams', '$timeout', 'apiService',
    function ($scope, $routeParams, $timeout, api) {

      $scope.project = {};
      $scope.tasks = {};

      // Project
      api.get(loc, $routeParams.id, function (project) {
        $scope.project = project;
      });

      // Tasks in this project
      api.listBy('tasks/', 'projectId', $routeParams.id, 10, function (tasksInProject) {
        $scope.tasks = tasksInProject;
      });

      // Models
      $scope.task = {
        title: '',
        description: '',
        dateCreated: '',
        creator: '',
        assignee: '',
        stage: '',
        priority: '',
        estimation: '',
        elapsed: '',
        id: '',
        projectId: $routeParams.id
        // tags: [],
        // watchers: [],
        // attachments: [],
        // messages:
      };

      // Scope methods
      $scope.addTask = function () {
        api.create('tasks/', $scope.task, function (task) {
          var t = task.val();
          t.id = task.key();
          var taskLoc = 'tasks/' + t.id;
          api.update(taskLoc, t, $routeParams.id);
        });
      };
    }]);

})(angular);
