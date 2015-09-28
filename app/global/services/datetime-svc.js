(function (angular) {
  
  'use strict';
  
  angular.module('cherry.global')
  
  .factory('datetimeService' ,function () {
    
    var pub = {};
    
    // Private
    
    var padZero = function (num) {
      return ('0' + num).slice(-2);
    };
  
    var getHourObj = function (hour) {
      if (hour > 12) {
        return {
          hour: hour - 12,
          period: 'pm'
        };
      } else {
        return {
          hour: hour,
          period: 'am'
        };
      }
    };
    
    // Public
    
    var _toReadable = function (ticks) {
      
      var dateObj = new Date(ticks);
      var hourObj = getHourObj(dateObj.getHours());

      return padZero(dateObj.getMonth() + 1) + '/' +
        padZero(dateObj.getDate()) + '/' +
        dateObj.getFullYear() + ' ' +
        hourObj.hour + ':' +
        padZero(dateObj.getMinutes()) +
        hourObj.period;
    };
    
    pub.toReadable = _toReadable;
    
    return pub;
    
  });
  
})(angular);