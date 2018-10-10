// var app = angular.module('myApp', ['ngMaterial'], ['ngRoute']);
var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);

// get the URL parameters based on the route
app.config(function($routeProvider) {
  $routeProvider
  .when('/rooms/', {
    templateUrl : "templates/control.html",
    controller: 'myCtrl'
  })
  .when('/rooms/:selectedroom/', {
    templateUrl : "room.html",
    controller: 'roomCtrl'
  })
  .otherwise({
  	redirectTo: "rooms"
  });
});

app.controller('myCtrl', function($scope) {
	$scope.rooms = [
		{"key": "livingroom", "name": "Wohnzimmer", "divid": "icon_living_room"},
		{"key": "kitchen", "name": "Küche", "divid": "icon_kitchen"},
		{"key": "bedroom", "name": "Schlafzimmer", "divid": "icon_bed_room"},
		{"key": "office", "name": "Büro", "divid": "icon_office"}
		];
});

 app.controller('roomCtrl', function($scope, $rootScope, $routeParams, $location) {
    // $scope.selectedroom = $routeParams.room;
    $scope.selectedroom = "Ein Raum";
    console.log($routeParams);
    console.log($location.absUrl());
 });