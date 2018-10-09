var app = angular.module('myApp', ['ngMaterial']);

/*$location is a service which returns information about the location of a web page*/
// check if something happens
app.controller('myCtrl', function($scope) {
	$scope.rooms = [
		{"key": "livingroom", "name": "Wohnzimmer", "divid": "icon_living_room"},
		{"key": "kitchen", "name": "Küche", "divid": "icon_kitchen"},
		{"key": "bedroom", "name": "Schlafzimmer", "divid": "icon_bed_room"},
		{"key": "office", "name": "Büro", "divid": "icon_office"}
		];
});