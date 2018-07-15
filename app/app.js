'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.version',
  'ui.bootstrap'
]).
  constant('config', {
    baseUrl: 'https://api.github.com/',
  }).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when("/", {
        templateUrl: "view1/view1.html",
        controller: "View1Ctrl"
      })

    $routeProvider.otherwise({ redirectTo: '/view1' });
  }]);
