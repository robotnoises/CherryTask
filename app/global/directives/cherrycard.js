(function (angular) {

  'use strict';

  angular.module('cherry')

  .directive('cherryCard', function() {
    return {
      restrict: 'E',
	  replace: true,
	  scope: {
		card: '='  
	  },
      templateUrl: 'templates/directives/cherry-card.html',
      controller: ['$scope', '$location', '$timeout', '$q', '$routeParams', 'apiService', 'avatarService', 'AVATAR_PLACEHOLDER',
      function cherryCardController ($scope, $location, $timeout, $q, $routeParams, api, avatar, avatarPlaceholder) {
        
        $scope.show = function () {
          $location.path($scope.card.type + 's/' + $scope.card.id);
        };
        
        $scope.avatar = 'assets/images/avatars/' + avatarPlaceholder;
        
        // Todo watch?
        if ($scope.card.assignee) {
          avatar.get($scope.card.assignee).then(function(avatar) {
            $scope.avatar = avatar;
          })
          .catch(function (err) {
            // Todo log this
          });
        }
              
      }]
    };
  });

})(angular);