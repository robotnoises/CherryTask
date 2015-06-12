(function (angular) {

  'use strict';

  angular.module('myApp.task')

  .factory('taskService', ['$firebaseObject', 'fbutil', '$q', 'apiService',
    function($firebaseObject, fbutil, $q, api) {

      var _taskService = {};

      // Public methods

      var _get = function (key, callback) {
        var loc = 'tasks/';
        api.get(loc, key, function (task) {
          return callback(task);
        });
      };

      var _add = function (task, callback) {
        var loc = 'tasks/';
        task.dateCreated = new Date().getTime();
        api.create(loc, task, function (createdTask) {
          return callback(createdTask);
        });
      };

      var _update = function (task) {
        var loc = 'tasks/' + task.id;
        api.update(loc, task);
      };

      var _list = function (callback) {
        var loc = 'tasks/';
        api.list(loc, 10, function (tasks) {
          callback(tasks);
        });
      };

      // Expose public methods
      _taskService.add = _add;
      _taskService.get = _get;
      _taskService.update = _update;
      _taskService.list = _list;

      return _taskService;

    }]);

})(angular);
