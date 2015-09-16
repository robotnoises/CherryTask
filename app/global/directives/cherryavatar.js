(function (angular) {
  
  'use strict';
  
  angular.module('cherry')
  
  .directive('cherryAvatar', ['$parse', 'cherryAuth', 'AVATAR_PLACEHOLDER', function($parse, cherryAuth, avatarPlaceholder) {
  return function(scope, element, attrs) {
        
    var uid = $parse(attrs.id)(scope);
    var path = 'assets/images/avatars/';

    attrs.$set('src', path + avatarPlaceholder);
    
    // If uid is undefined, will fetch auth info for current user
    cherryAuth.get(uid).then(function (user) {
      if (user.avatar) {
        attrs.$set('src', path + user.avatar);  
      }
    }).catch(function (err) {
      // Todo log this
    })
    
  };
}]);
  
})(angular);