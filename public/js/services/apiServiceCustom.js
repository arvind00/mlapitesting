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
        }
    }]);