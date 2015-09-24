(function (angular, AWS) {
  
  'use strict';
  
  angular.module('cherry')
  
  .factory('mediaService', ['$q', 'fbutil', '$firebaseObject', 'cherryAuth', 'apiService', 'S3_BUCKET', function ($q, fbutil, $firebaseObject, cherryAuth, api, bucket) {
    
    // Private
    
    function getS3Creds() {
      var ref = fbutil.ref('creds/s3');
      return $firebaseObject(ref);
    }
    
    function format(file, uniqueFolder) {
      var prefix = "https://s3.amazonaws.com/cherrytask/media/images/" + uniqueFolder;
      var response = { status: 200, data: file };
      
      response.data.url = prefix + file.name;
      
      return response;
    }
        
    // Public
    
    var _imageService = {};
    
    function upload(fileData, projectId, taskId) {
      
      var d = $q.defer();
      var $creds = getS3Creds();
      var uniqueFolder = projectId + '/' + taskId + '/';
      
      $creds.$loaded(function (c) {
        
        var awsCreds = new AWS.Credentials(c.access_key, c.secret_key, null);
      
        var s3 = new AWS.S3({
          apiVersion: '2006-03-01', // Todo constant
          credentials: awsCreds
        });
        
        var params = {
          Bucket: bucket,
          Key: 'media/images/' + uniqueFolder + fileData.name,
          ContentType: fileData.type,
          Body: fileData,
          ACL: 'public-read'
        };
        
        s3.putObject(params, function (err, data) {
          if (err) {
            console.error(err);
            d.reject(err);
          } else {
            d.resolve(format(fileData, uniqueFolder));
          }
        });
        
      });
      
      return d.promise;
      
      // var options = {
      //   transformrequest: angular.identity,
      //   headers: { 
      //     'Content-Type': undefined,
      //     'Accept': 'application/json'
      //   }
      // };

      // var url = tempUrl + '?api_key=' + tempKey;
      
      // var fd = new FormData();
      // fd.append('files', fileData);
      
      // return $http.post(url, fd, options);
    }
    
    _imageService.upload = upload;
    
    return _imageService;
    
  }])
  
})(angular, AWS);