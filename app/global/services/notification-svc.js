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
            
      if (Array.isArray(uids)) {
        
        _.forEach(uids, function (uid) {
          
          // Create a ref for each user
          var userNotifications = ref.child(uid).child('notifications').push();
          var promise = userNotifications.setWithPriority(notification, -notification.priority);
          
          // Push that promise onto the array of promises
          promises.push(promise);
        });
        
      } else {
        d.reject(new TypeError('parameter uids is not an Array.'));
      }
      
      // Resolve when everything is settled
      $q.all(promises).then(function () {
        d.resolve();
      });
      
      return d.promise;
    };
    
    // Notification object factory
    var _create = function (what, where) {
      
      var d = $q.defer();
      var now = new Date().getTime();
      
      // Model for a notification
      var notification = {
        data: {
          who: '',        // Who is responsible for the action
          what: what,     // What kind of notification is this?
          where: where,   // Where did this originate?
          when: now       // When did this get pushed?
        },
        read: false,      // Unread by default
        priority: now     // Sort queries
      }
      
      // Get current user
      cherryAuth.get().then(function (a) {
        
        // Add the current user
        notification.data.who = a.uid;
           
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