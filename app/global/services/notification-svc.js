(function (angular, _) {
  
  'use strict';
  
  angular.module('cherry.global')
  
  .factory('notificationService', ['$q', 'fbutil', '$firebaseArray', 'cherryAuth', 
  
  function ($q, fbutil, $firebaseArray, cherryAuth) {
    
    var ref = fbutil.ref('users');
         
    // Public
    
    var notification = {};
    
    // Push a notification to a list of users
    var _pushTo = function (uids, notification) {
      
      // Todo: filter-out the user who did the action (notification.whos)
      
      var d = $q.defer();
      var promises = [];
      
      function finish() {
        d.resolve();
      }
      
      if (Array.isArray(uids)) {
        
        _.forEach(uids, function (uid) {
          
          // Create a ref for each user
          var userNotifications = ref.child(uid).child('notifications');
          var promise = userNotifications.push(notification);
          
          // Push that promise onto the array of promises
          promises.push(promise);
        });
        
      } else {
        d.reject(new TypeError('parameter uids is not an Array.'));
      }
      
      // Resolve when everything is settled
      $q.all(promises).then(finish);
      
      return d.promise;
    };
    
    // Format a Notification object
    var _create = function (what, where) {
      
      var d = $q.defer();
      
      // Model for a notification
      var notification = {
        who: '',                    // Who is responsible for the action
        what: what,                 // What kind of notification is this?
        where: where,               // Where did this originate?
        when: new Date().getTime()  // When did this get pushed?
      }
      
      // Get current user
      cherryAuth.get().then(function (a) {
        // Add the current user
        notification.who = a.uid;   
        // Resolve
        d.resolve(notification);
      }).catch(function (err) {
        // Todo: log this
        d.reject(err);
      });
      
      return d.promise;
    };
    
    notification.pushTo = _pushTo;
    notification.create = _create;
    
    return notification;
    
  }]);
  
})(angular, _);