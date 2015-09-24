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
              console.log('Image uploaded!');
            })
          }
          
          // Todo: once I use a better service 
          
          // $scope.fileUploader = new FileUploader({
          //   url: url,
          //   alias: 'files',
          //   headers: {
          //     'Content-Type': undefined,
          //     'Accept': 'application/json'
          //   }
          // });
          
          $scope.fileUploader.onAfterAddingFile = function (file) {
            // console.log(file);

            // var fd = new FormData();
            // fd.append('files', file._file);
            
            // file.formData.push(fd);
            // file.upload();
            
            // Todo: This is probably temporary
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
          
          // $scope.fileUploader.onErrorItem = function(fileItem, response, status, headers) {
          //   console.info('onErrorItem', fileItem, response, status, headers);
          // };
          
          // $scope.fileUploader.onProgressAll = function (progress) {
          //   $scope.progress.value = progress || 0;
          // };
          
          // $scope.fileUploader.onProgressItem = function (fileItem, progress) {
          //   console.info('onProgressItem', fileItem, progress);
          // };
          
          // $scope.fileUploader.onSuccessItem = function (fileItem, response, status, headers) {
          //   console.info('onSuccessItem', fileItem, response, status, headers);
          // };
          
          $scope.fileUploader.onCompleteAll = function () {
            console.log('done');
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