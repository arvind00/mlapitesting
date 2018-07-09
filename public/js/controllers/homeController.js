angular.module('app')
    .controller('homeController', ['$scope', '$rootScope','fileServiceCustom', function ($scope, $rootScope,fileServiceCustom) {
        $rootScope.currentPath = 'home';
        $rootScope.current_page_icon = 'fas fa-home';
        $scope.progress = '';

        //function to upload file
        $scope.uploadFile = function (fileInputTargetId) {
            $scope.progress = '';
            var fileObj = document.getElementById(fileInputTargetId);
            if(fileObj.files.length >=1){
                var uploadData = {'file': fileObj.files[0]};
                fileServiceCustom.uploadFile(uploadData)
                .then(function(response){
                    console.log('success');
                }, function(err){
                    console.log('failed');
                }, function(progress){
                    console.log('uploading ' + Math.floor(progress) + '%');
                    $scope.progress = Math.floor(progress);
                });
            }
            
        }
        //end of function to upload file
    }]);