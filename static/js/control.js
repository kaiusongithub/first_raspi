// var app = angular.module('myApp', ['ngMaterial'], ['ngRoute']);
var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);

// define global variables
app.run(function($rootScope) {
	$rootScope.rooms = [
		{"key": "livingroom", "name": "Wohnzimmer", "divid": "icon_living_room"},
		{"key": "kitchen", "name": "Küche", "divid": "icon_kitchen"},
		{"key": "bedroom", "name": "Schlafzimmer", "divid": "icon_bed_room"},
		{"key": "office", "name": "Büro", "divid": "icon_office"}
	];
});

// get the URL parameters based on the route
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/rooms', {
    controller: 'myCtrl',
	template: ''
  })
  .when('/rooms/:roomkey', {
    controller: 'roomCtrl',
	template: ''
    // templateUrl : "main.htm"
  })
  $locationProvider.html5Mode(true);
});

app.controller('myCtrl', function($scope) {
	
});

 app.controller('roomCtrl', function($scope, $routeParams, $location) {
 	$scope.selectedRoom = "";
 	$scope.roomKey = "";

 	$scope.devices = [
 		{"key": "livingroomTV", "name": "Fernseher", "room": "livingroom"},
 		{"key": "livingroomMainLight", "name": "Hauptlampe", "room": "livingroom"},
 		{"key": "livingroomSmallLight", "name": "Kleines Licht", "room": "livingroom"},
 		{"key": "kitchenOven", "name": "Backofen", "room": "kitchen"},
 		{"key": "kitchenRadio", "name": "Radio", "room": "kitchen"},
 		{"key": "bedroomMainLight", "name": "Hauptlampe", "room": "bedroom"},
 		{"key": "bedroomSmallLight", "name": "Leselampe", "room": "bedroom"},
 		{"key": "bedroomTV", "name": "Fernseher", "room": "bedroom"},
 		{"key": "officeMain", "name": "Hauptschalter", "room": "office"}
 	];

    $scope.$on('$routeChangeSuccess', function() {
    	console.log($routeParams);
    	$scope.roomKey = $routeParams.roomkey;

	 	angular.forEach($scope.rooms, function (value, key) {
			if(value.key == $scope.roomKey){
				$scope.selectedRoom = value.name;
			};
		});
    });
 });