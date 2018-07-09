angular.module('app')
    .controller('homeController', ['$scope', '$rootScope','fileServiceCustom', 'apiServiceCustom', function ($scope, $rootScope,fileServiceCustom, apiServiceCustom) {
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
                    //hide the progress bar after sometime
                    $('.progress').fadeOut();
                }, function(err){
                    console.log('failed');
                }, function(progress){
                    console.log('uploading ' + Math.floor(progress) + '%');
                    $scope.progress = Math.floor(progress);
                });
            }
            
        }
        //end of function to upload file

        // function to run python program
        $scope.analyze = function(){
            var data = {
                trainFile: "trainfileapth.csv",
                testFile: "testfilepath.csv",
                req_param: "rq1, rq2, rq3",
                res_param: "rs1"
            }
            apiServiceCustom.runPython(data)
            .then(function(response){
                console.log(data);
            },function(err){
                console.log(err);
            });
        }
    }]);