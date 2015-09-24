(function (angular) {
  
  'use strict';
  
  angular.module('cherry')
  
  .factory('imageService', ['$http', function ($http) {
    
    var _imageService = {};
    var tempUrl = 'https://api.dumpyourphoto.com/v1/photo';
    var tempKey = 'mrh1DrF5f4geIcd9kqpixuUXw2H6OnI0PWiHz4wR7HxfBii3VYczgUSl1RbY4eh37sNdfrNA9ObVd26DQYA6GhBE4qff3lGuskzb'; 
    
    function upload(fileData) {
      
      var options = {
        transformrequest: angular.identity,
        headers: { 
          'Content-Type': undefined,
          'Accept': 'application/json'
        }
      };

      var url = tempUrl + '?api_key=' + tempKey;
      
      var fd = new FormData();
      fd.append('files', fileData);
      
      return $http.post(url, fd, options);
    }
    
    _imageService.upload = upload;
    
    return _imageService;
    
  }])
  
})(angular);