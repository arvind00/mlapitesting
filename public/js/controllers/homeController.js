angular.module('app')
    .controller('homeController', ['$scope', '$rootScope','fileServiceCustom', 'apiServiceCustom', function ($scope, $rootScope,fileServiceCustom, apiServiceCustom) {
        $rootScope.currentPath = 'home';
        $rootScope.current_page_icon = 'fas fa-home';
        $scope.progress = '';
        getFileList('/api/trainfilelist');
        getFileList('/api/testfilelist');
        $scope.currentTrainFile = '';
        $scope.trainFileHeaderArr = [];
        $scope.predictorVariable = [];
        $scope.finalOutputHeader = [];
        $scope.finalOutputBody = [];

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

        // functiojn to update current train file name - triggered from change event in train file select
        $scope.updateCurrentTrainFile = function(obj){
            // console.log(obj);
            $scope.currentTrainFile = obj.selectedTrainFileName;
        }

        $scope.processSampleOutput = function(textToProcess){
            //var textToProcess = $scope.sampleOutput;
            textToProcess = textToProcess.trim();
            var lines = textToProcess.split('\n');
            for(let i = 0; i<lines.length; i++){
              let line = lines[i];
              if(line.length > 0){
                let dataLine = line.replace(/  +/g,',')
                console.log(dataLine);
                if(i>0){         
                  $scope.finalOutputBody.push(dataLine.split(','));
                }else{
                  $scope.finalOutputHeader=dataLine.split(',');
                }        
              }
            }
            console.log($scope.finalOutputHeader);
            console.log($scope.finalOutputBody);
            
        };
        

        // function to run python program
        $scope.analyze = function(trainFileName, testFileName){ 
            // reset result
            $scope.finalOutputHeader = [];
            $scope.finalOutputBody = [];
            //continue only if trainFile and testFile are selected
            // if($scope.selectedTrainFileName & $scope.selectedTestFileName){
            //     console.log('both files selected');
            // }else{
            //     console.log('Files not selected');
            //     return;
            // }
            var data = {
                trainFile: $scope.currentTrainFile,
                testFile: testFileName,
                req_param: "rq1, rq2, rq3",
                res_param: "rs1"
            }
            apiServiceCustom.runPython(data)
            .then(function(response){
                //console.log(response.data);
                $scope.processSampleOutput(response.data);
            },function(err){
                console.log(err);
            });
        }// end of analyze

        //function to read csv header
        $scope.loadHeaders = function(sFileName){
            var getHeaderUrl = 'api/getheader';
            var dataToPass = {filename: sFileName};
            apiServiceCustom.getHeader(getHeaderUrl, dataToPass)
            .then(function(response){
                // console.log(response.data);
                $scope.trainFileHeaderArr = response.data;
            }, function(err){
                console.log(err);
            });
        }
    }]);