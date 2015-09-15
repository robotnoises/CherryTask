(function (angular) {
  
  'use strict';
  
  angular.module('cherry')
  
  .factory('avatarService', ['$q', 'cherryAuth', 'AVATAR_PLACEHOLDER', function ($q, cherryAuth, avatarPlaceholder) {
    
    var pub = {};
    
    // Constants
    
    var imagesDir = 'assets/images/avatars/';
    
    var _get = function (uid) {
      
      var d = $q.defer();
      
      if (uid) {
        
       cherryAuth.get(uid).then(function (user) {
         var avatar = user.avatar || avatarPlaceholder;
         return d.resolve(imagesDir + avatar);
       })
       .catch(function (err) {
         d.reject(err);
       })

      } else {
        d.reject('uid is undefined.');
      }
      
      return d.promise;
    }
    
    pub.get = _get;
    
    return pub;
    
  }]);
  
})(angular);