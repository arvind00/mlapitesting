var app = angular.module('app')
    .service('apiServiceCustom', ['$q','$http', function($q, $http){
        // for calling python program
        this.runPython = function(data){
            console.log('calling python program');
            var defer = $q.defer();
            $http({
                method: 'POST',
                data: data,
                url: '/api/analyze',
            }).then(defer.resolve.bind(defer), defer.reject.bind(defer));
            return defer.promise;
        };
        this.makeGenericGetAPICall=function(requestUrl, dataPassed){
            console.log('in makeGenericAPICall Method');
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: requestUrl,
                data: dataPassed || ''
            }).then(defer.resolve.bind(defer), defer.reject.bind(defer));
            return defer.promise;
        };
        this.getHeader=function(requestUrl, dataPassed){
            console.log('in getHeader API Method');
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: requestUrl,
                data: dataPassed || ''
            }).then(defer.resolve.bind(defer), defer.reject.bind(defer));
            return defer.promise;
        };

    }]);