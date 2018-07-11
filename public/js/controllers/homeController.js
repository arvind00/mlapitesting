angular.module('app')
    .controller('homeController', ['$scope', '$rootScope','fileServiceCustom', 'apiServiceCustom', function ($scope, $rootScope,fileServiceCustom, apiServiceCustom) {
        $rootScope.currentPath = 'home';
        $rootScope.current_page_icon = 'fas fa-home';
        $scope.progress = '';
        getFileList('/api/trainfilelist');
        getFileList('/api/testfilelist');
        $scope.predictorVariable = [];

        //function to upload file
        $scope.uploadFile = function (fileInputTargetId) {
            $scope.progress = '';
            var fileObj = document.getElementById(fileInputTargetId);
            if(fileObj.files.length >=1){
                var fieldname = 'file';
                var uploadUrl="";
                var getFileListUrl = '';
                if(fileInputTargetId == 'trainFile'){
                    uploadUrl = '/api/upload-file/train';
                    getFileListUrl = '/api/trainfilelist';
                }else if(fileInputTargetId == 'testFile'){
                    uploadUrl = '/api/upload-file/test';
                    getFileListUrl = '/api/testfilelist';
                }
                var uploadData = {'file': fileObj.files[0]};
                fileServiceCustom.uploadFile(uploadData, uploadUrl)
                .then(function(response){
                    console.log('success');
                    //populate files names as options in select file dropdown
                    getFileList(getFileListUrl);
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
        //function to get filelist
        function getFileList(getFileListUrl){
            apiServiceCustom.makeGenericGetAPICall(getFileListUrl)
            .then(function(response){
                if(getFileListUrl === '/api/trainfilelist'){
                    $scope.trainFileNames = response.data;
                }else{
                    $scope.testFileNames = response.data;
                }
            }, function(err){
                console.log(err);
            });
        }
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