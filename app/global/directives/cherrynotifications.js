(function (angular, _) {
  
  'use strict';
  
  angular.module('cherry')
  
  .directive('cherryNotifications', ['fbutil', '$firebaseArray', 'cherryAuth', function (fbutil, $firebaseArray, cherryAuth) {
    
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="card-menu notifications arrow-up"><div ng-repeat="n in notifications"><div class="card-menu-item">{{n.what}}</div></div></div>',
      
      link: function (scope, el, attr) {
        
        scope.notifications = [];
        
        // Max # of notifications to be shown
        var limit = 100;
        
        // Firebase ref to Users
        var ref = fbutil.ref('users/');
        
        // Fetch current user
        cherryAuth.get().then(function (a) {
          
          // Get a list of their notifications
          var notifications = ref.child(a.uid).child('notifications').limitToLast(limit);
          scope.notifications = $firebaseArray(notifications);
          
        }).catch(function (err) {
          console.error(err);
        })
      }
    }
  }]);
  
})(angular, _)