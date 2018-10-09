var app = angular.module('myApp', ['ngMaterial']);

/*$location is a service which returns information about the location of a web page*/
// check if something happens
app.controller('myCtrl', function($scope) {
	$scope.rooms = [
		{"key": "livingroom", "name": "Wohnzimmer"},
		{"key": "kitchen", "name": "Küche"},
		{"key": "bedroom", "name": "Schlafzimmer"},
		{"key": "office", "name": "Büro"}
		];
});