// var app = angular.module('myApp', ['ngMaterial'], ['ngRoute']);
var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);

// get the URL parameters based on the route
app.config(function($routeProvider) {
  $routeProvider
  .when('/control/room/:selectedroom', {
    templateUrl : "room.html",
    controller: 'roomCtrl'
  });
});

app.controller('myCtrl', function($scope, $route, $routeParams) {
	$scope.rooms = [
		{"key": "livingroom", "name": "Wohnzimmer", "divid": "icon_living_room"},
		{"key": "kitchen", "name": "Küche", "divid": "icon_kitchen"},
		{"key": "bedroom", "name": "Schlafzimmer", "divid": "icon_bed_room"},
		{"key": "office", "name": "Büro", "divid": "icon_office"}
		];

	// getting the selected room from the URL
	$scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.selectedroom = "random";
});

 app.controller('roomCtrl', function($scope, $routeParams) {
    $scope.selectedroom = $routeParams.room;
 });