var app = angular.module('myApp', ['ngMaterial']);

/*$location is a service which returns information about the location of a web page*/
// check if something happens
app.controller('myCtrl', function($scope) {
	$scope.rooms = [
		{"key": "living", "name": "Wohnzimmer", "id": "icon_living_room"},
		{"key": "kitchen", "name": "Küche", "id": "icon_kitchen"},
		{"key": "bed", "name": "Schlafzimmer", "id": "icon_bed_room"},
		{"key": "office", "name": "Büro", "id": "icon_office"}
	];
});