(function (angular, _) {
  
  'use strict';
  
  angular.module('cherry.global')
  
  .factory('notificationService', ['$q', 'fbutil', '$firebaseArray', function ($q, fbutil, $firebaseArray) {
    
    // Todo: move this?
    var ref = fbutil.ref('users');
         
    // Public
    
    var notification = {};
    
    // Push a notification to a list of users
    var _push = function (notification, uids) {
      
      var d = $q.defer();
      var promises = [];
      
      function finish() {
        _(promises).forEach(function (userNotifications, index, array) {
          userNotifications.$loaded(function (snap) {
            snap.$add(notification);
          });
        });
      }
      
      if (Array.isArray(uids)) {
        _(uids).forEach(function (uid, index, array) {
          //
          var userNotifications = ref.child(uid).child('notifications');
          //
          promises.push($firebaseArray(userNotifications))
        });
      } else {
        d.reject(new TypeError('parameter uids is not an Array.'));
      }
      
      // Resolve when everything is settled
      $q.all(promises).then(finish);
      
      return d.promise;
      
    };
    
    notification.push = _push;
    
    return notification;
    
  }]);
  
})(angular, _);