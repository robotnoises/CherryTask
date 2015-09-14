(function (angular) {
  
  'use strict';
  
  angular.module('cherry')
  
  .factory('activityService', ['$q', 'cherryAuth', 'datetimeService', function ($q, cherryAuth, datetime) {
    
    var pub = {};
    
    // Public
    
    var _make = function (text, activityType, value) {
      
      var d = $q.defer();
      
      if (text) {
        
        var aType = parseInt(activityType, 10);
        var val = value || 0;

        cherryAuth.get().then(function (auth) {
              
          var timeStamp = new Date().getTime();
          var timeStamp_readable = datetime.toReadable(timeStamp);
              
          d.resolve({
            user: '@' + auth.name,  // Todo: need to record the uid and not the name, since names are aliases and can change
            text: text,
            type: aType, 
            value: val,
            time_stamp: timeStamp,
            date: timeStamp_readable
          });
          
        });
      } else {
        d.reject('Error: You must supply some text for the activity.');
      }
      
      return d.promise;
    };
    
    pub.make = _make;
    
    return pub;
    
  }]);
  
})(angular);