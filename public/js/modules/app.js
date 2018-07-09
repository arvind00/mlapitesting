angular.module('app', ['ngRoute'])
.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          templateUrl: '../../partials/home.html',
          controller: 'homeController'
        }).
        when('/reports', {
          templateUrl: '../../partials/reports.html',
          controller: 'reportsController'
        }).
        otherwise('/home');
    }
  ]);;