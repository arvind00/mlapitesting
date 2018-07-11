var app = angular.module('app')
    .service('fileServiceCustom', ['$q','$http', function($q, $http){
        //for file upload
        this.uploadFile = function (data, uploadUrl) {
            console.log('upload service called');
            var formData = new FormData();
            Object.keys(data).forEach(function(key){formData.append(key, data[key]);});
            var defer = $q.defer();
            $http({
                method: 'POST',
                data: formData,
                url: uploadUrl,
                headers: {'Content-Type': undefined},
                uploadEventHandlers: { progress: function(e) {
                    defer.notify(e.loaded * 100 / e.total);
                }}
            }).then(defer.resolve.bind(defer), defer.reject.bind(defer));
            return defer.promise;
        }
        //end of file upload
    }]);