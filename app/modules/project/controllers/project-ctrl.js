(function (angular) {

  'use strict';

  var loc = 'projects/';

  angular.module('cherry.project')

  .controller('allProjectsController', ['$scope', '$routeParams', '$timeout', 'apiService',
    function ($scope, $routeParams, $timeout, api) {

      $scope.projectModel = {
        title: '',
        description: '',
        dateCreated: '',
        id: ''
      };
      
      $scope.emptyWorkspace = false;
      $scope.projects = {};
      
      api.list(loc, 10).then(function (projects) {
        $scope.projects = projects;

        projects.$loaded().then(function (p) {
          $scope.emptyWorkspace = (p.length === 0);
        });
      });

    }])

  .controller('projectController', ['$scope', '$routeParams', '$timeout', 'apiService',
    function ($scope, $routeParams, $timeout, api) {

      $scope.project = {};
      $scope.tasks = {};
      $scope.emptyWorkspace = false;
      
      function checkFbArrayLength(snap) {
        $scope.emptyWorkspace = (snap.length === 0);
      }
      
      // Project
      api.get(loc, $routeParams.id, function (project) {
        $scope.project = project;
      });

      // Tasks in this project
      api.listBy('tasks/', 'projectId', $routeParams.id, 10, function (tasks) {
        $scope.tasks = tasks;
        
        tasks.$loaded().then(checkFbArrayLength);        
        // tasks.$$updated().then(checkFbArrayLength);
      });

      // Models
      // $scope.task = {
      //   title: '',
      //   description: '',
      //   dateCreated: '',
      //   creator: '',
      //   assignee: '',
      //   stage: '',
      //   priority: '',
      //   estimation: '',
      //   elapsed: '',
      //   id: '',
      //   progress: 0,
      //   projectId: $routeParams.id
      // };

      // Scope methods
      // $scope.addTask = function () {
      //   $scope.tasks.$add($scope.task).then(function update (task) {
      //     var key = task.key();
      //     $timeout(function () {
      //       try {
      //         var idx = $scope.tasks.$indexFor(key);
      //         $scope.tasks[idx].id = key;
      //         $scope.tasks.$save(idx);  
      //       } catch (ex) {
      //         if (idx < 0) update(task);
      //       }
      //     },1);
      //   });
      // };
    }]);

})(angular);
