var weatherApp = angular.module('weatherApp', ["ngRoute", "ngResource"])

weatherApp.config(function($routeProvider) {
  $routeProvider.when('/', {
                        templateUrl: 'pages/home.htm',
                        controller: 'homeController'
                 })

                .when('/forecast', {
                        templateUrl:  'pages/forecast.htm',
                        controller: 'forecastController'
                })

                .when('/forecast/:days', {
                        templateUrl:  'pages/forecast.htm',
                        controller: 'forecastController'
                })
});

//SERVICES
weatherApp.service('cityService', function() {
  this.city = "Charleston";
});

//CONTROLLERS
weatherApp.controller('homeController',['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });

}]);

weatherApp.controller('forecastController',['$scope', '$resource', '$routeParams',
'cityService', function($scope, $resource, $routeParams, cityService) {
  $scope.city = cityService.city;

  $scope.days = $routeParams.days || 3

  $scope.$watch('newDays', function(){
    $scope.days = $scope.newDays
  });

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
                          { callback: 'JSON_CALLBACK' },
                          { get: { method: "JSONP" }}
                      );
  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days});

  $scope.convertToFarenheit = function(degrees) {
    return Math.round((1.8 * (degrees - 273)) + 32);
  }

  $scope.convertDate = function(date) {
    return new Date(date * 1000);
  }

}]);




