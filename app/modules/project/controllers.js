(function (angular) {

  'use strict';

  var loc = 'projects/';

  angular.module('myApp.project')

  .controller('allProjectsController', ['$scope', '$routeParams', '$timeout', 'apiService',
    function ($scope, $routeParams, $timeout, api) {

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

        $scope.projects.$add(temp).then(function update (project) {
          var key = project.key();
          $timeout(function () {
            try {
              var idx = $scope.projects.$indexFor(key);
              $scope.projects[idx].id = key;
              $scope.projects.$save(idx);  
            } catch (ex) {
              if (idx < 0) update(project);
            }
          },1);
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
      };

      // Scope methods
      $scope.addTask = function () {
        $scope.tasks.$add($scope.task).then(function update (task) {
          var key = task.key();
          $timeout(function () {
            try {
              var idx = $scope.tasks.$indexFor(key);
              $scope.tasks[idx].id = key;
              $scope.tasks.$save(idx);  
            } catch (ex) {
              if (idx < 0) update(task);
            }
          },1);
        });
      };
    }]);

})(angular);
