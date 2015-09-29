(function (angular) {
  
  'use strict';
  
  angular.module('cherry')
  
  .directive('cherryDropzone', function() {
    return {
      restrict: 'A',
      replace: false,
      template: '<div class="cherry-dragzone" nv-file-over over-class="cherry-dropzone-over" nv-file-drop uploader="fileUploader">' +
        '<div class="cherry-dropzone-progress" ng-style="{height: progress.formatted()}"></div>' + '</div>',
      
      controller: ['$scope', 'FileUploader', 'mediaService', 'apiService',
        function ($scope, FileUploader, mediaService, api) {

          $scope.progress = {
            value: 0,
            formatted: function () {
              return this.value.toString() + '%';
            }
          }
          
          $scope.fileUploader = new FileUploader();
          
          var taskId = $scope.task.id;
          var projectId = $scope.task.projectId;
          
          // Private
          
          var loc = 'tasks/' + $scope.task.id + '/media/';
          
          // This is all extremely temporary, should prob be abstracted into the media service
          function saveImage(imageData) {
            
            var data = {
              type: imageData.type,
              name: imageData.name,
              timestamp: new Date().getDate(),
              urls: {
                full: imageData.url,
                thumbnail: imageData.url // Todo
              }
            };
            
            api.create(loc, data, function () {
              // console.log('Image uploaded!');
            })
          }
          
          $scope.fileUploader.onAfterAddingFile = function (file) {
            
            // Wraps an managed upload from the AWS SDK
            mediaService.upload(file._file, projectId, taskId).then(function (response) {
              if (response.status === 200) {
                saveImage(response.data);
              } else {
                console.error('Upload failed: ', response);
              }
            })
            .catch(function (ex) {
              console.log(ex);
            });
          };
           
          // Todo: this is kinda dumb
          angular.element('.cherry-dropzone').bind('dragleave', function (e) {
            angular.element(e.target).removeClass('cherry-dropzone-over');
          });
         
        }
      ]
    };
  })
  
})(angular);