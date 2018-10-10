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
    
 	$scope.urlArray = $location.absUrl().split('/');
 	$scope.intRoom = $scope.urlArray.length - 1;
 	$scope.selectedKey = $scope.urlArray[$scope.intRoom];
 	$scope.selectedRoom = "";

 	angular.forEach($scope.rooms, function (value, key) {
		if(value.key == $scope.selectedKey){
			$scope.selectedRoom = value.name;
		};
	});

    console.log($routeParams);
    console.log($location.absUrl().split('/')[4]);
    console.log($location.absUrl().split('/').length);
 });