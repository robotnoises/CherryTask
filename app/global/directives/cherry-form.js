(function (angular) {

  'use strict';

  angular.module('myApp')

  .directive('cherryForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/cherry-form.html',
      controller: ['$scope', '$location', '$timeout', '$q', '$routeParams', 'apiService',
      function cherryFormController ($scope, $location, $timeout, $q, $routeParams, api) {
        
        var getFormType = function (uri) {
          var $deferred = $q.defer();
          if (uri == '') {
            $deferred.resolve({ key: 'project', apiLoc: 'projects/' });
          } else if (uri == 'projects' ) {
            $deferred.resolve({ key: 'task', apiLoc: 'tasks/', projectId: $routeParams.id });
          } else {
            $deferred.reject();
          }
          return $deferred.promise;
        };
        
        var init = function () {
          var uri = $location.$$path.split('/').filter(function(s){ return s !== ''; })[0];
          var $promise = getFormType(uri || '');
          
          $promise.then(function (formData) {
            $timeout(function () {
              $scope.form.type = $scope.formType = formData.key;
              $scope.formData = formData;
            },0);
          });
        };
        
        var matchesFormType = function (formTypeData) {
          if (Array.isArray(formTypeData)) {
            for (var i = 0, len = formTypeData.length; i < len; i++) {
              if (formTypeData[i] == $scope.formType) {
                return true;
              }
            }
            return false;
          } else {
            return formTypeData == $scope.formType;
          }
        };
        
        var reset = function (timeout) {
                    
          $scope.cherryForm.$setPristine();
          $scope.cherryForm.$setUntouched();
          
          // Form inputs TODO: there's gotta be a better way than this..
          $scope.cherryForm.title.$touched = false;
          $scope.cherryForm.description.$touched = false;
          
          $timeout(function () {            
            toggleSubmitOverlay();
            $scope.form = {};
            // Todo: bind a click to submit?
            angular.element('.modal-close').click();
          }, timeout || 0);
        };
        
        var toggleSubmitOverlay = function () {
          var $overlay = angular.element('.submit-overlay');
          if ($overlay.hasClass('show')) {
            $overlay.removeClass('show');
          } else {
            $overlay.addClass('show');
          }
        };
        
        $scope.form = {};
        
        $scope.$on('$routeChangeSuccess', function (e) {
          init();
        });
        
        $scope.calc = function (value, unit) {
          return value + unit;
        };
        
        $scope.matchesFormType = matchesFormType;
        
        $scope.submit = function () {
          api.create($scope.formData.apiLoc, $scope.form, function (snapshot) {
            var obj = angular.copy(snapshot.val());
            obj.id = snapshot.key();
            if (matchesFormType('task')) {
              // Todo: this is bad
              obj.projectId = $scope.formData.projectId;
              obj.progress = 0;
              obj.mood = 50;
            }
            api.update($scope.formData.apiLoc + snapshot.key(), obj, obj.id);
            toggleSubmitOverlay();
            reset(1000);
          });
        };
        
        init();
        
      }]
    };
  });

})(angular);
