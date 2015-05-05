weatherApp.controller('homeController',['$scope', '$location','$resource',
'cityService', function($scope, $location, $resource, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });

  $scope.submit = function() {
    $location.path("/forecast");
  };

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
