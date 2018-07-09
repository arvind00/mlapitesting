angular.module('app')
.controller('reportsController', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.currentPath = 'reports';
    $rootScope.current_page_icon = 'fas fa-receipt';
}]);