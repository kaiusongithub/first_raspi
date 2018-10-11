// var app = angular.module('myApp', ['ngMaterial'], ['ngRoute']);
var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);

// define global variables
app.run(function($rootScope) {
	// $rootScope.rooms = [
	// 	{"key": "livingroom", "name": "Wohnzimmer", "divid": "icon_living_room"},
	// 	{"key": "kitchen", "name": "Küche", "divid": "icon_kitchen"},
	// 	{"key": "bedroom", "name": "Schlafzimmer", "divid": "icon_bed_room"},
	// 	{"key": "office", "name": "Büro", "divid": "icon_office"}
	// ];
	$rootScope.rooms = [];
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

app.controller('myCtrl', function($scope, $mdSidenav, $http) {
	$scope.toggleLeft = buildToggler('left');
	console.log('SideNav');

	function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };

    // get rooms
    $http.get('http://192.168.178.29:5000/getRooms').then(function(response) {
    	$scope.rooms = response.data;
    });

    // update weather based on selected country
    $scope.userCity = '49413';

    $scope.updateWeather = function() {
    	    if($scope.userCity == '83201'){
		    	$scope.userCountry = "us";
		    } else {
		    	$scope.userCountry = "de";
		    };
    	$http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + $scope.userCity + "," + $scope.userCountry + "&APPID=4a97ae0f4ff2538a214cf773a5351ff4&units=metric")
    	.then(function(response) {
	        $scope.currentWeather = response.data;
			// $scope.currentTemperature = ($scope.currentWeather['main']['temp'] - 32) * (5 / 9);
			// (296 °F − 32) × 5/9 = 146,667 °C
			$scope.currentTemperature = $scope.currentWeather['main']['temp'];
			$scope.currentCity = $scope.currentWeather['name'];
			$scope.currentCondition = $scope.currentWeather['weather'][0]['description'];
			// 2xx > thunderstorm
			// 3xx > drizzle
			// 5xx > rain
			// 6xx > snow
			// 7xx > atmosphere
			// 800 > clear
			// 80x > clouds
			// sunny
			if($scope.currentCondition == 'clear sky'){
				$scope.iconId = 'sunny_icon';
			// cloudy
			} else if($scope.currentCondition == 'few clouds' || $scope.currentCondition == 'broken clouds'){
				$scope.iconId = 'cloudy_icon';
			// cloud
			} else if($scope.currentCondition == 'scattered clouds' || $scope.currentCondition == 'mist'){
				$scope.iconId = 'cloud_icon';
			// rainy
			} else if($scope.currentCondition == 'shower rain' || $scope.currentCondition == 'rain' || $scope.currentCondition == 'thunderstorm'){
				$scope.iconId = 'rain_icon';
			// snowy
			} else if($scope.currentCondition == 'snow'){
				$scope.iconId = 'snow_icon';
			} else {
				$scope.iconId = 'sunny_icon';
			};
	        console.log($scope.currentWeather);
	        console.log($scope.currentCondition);
	    });
    };
});

 app.controller('roomCtrl', function($scope, $routeParams, $location, $http) {
 	$scope.selectedRoom = "";
 	$scope.roomKey = "";

    // get rooms
    $http.get('http://192.168.178.29:5000/getRooms').then(function(response) {
    	$scope.rooms = response.data;
    });

 	$scope.devices = [
 		{"key": "livingroomTV", "name": "Fernseher", "room": "livingroom", "enabled": true},
 		{"key": "livingroomMainLight", "name": "Hauptlampe", "room": "livingroom", "enabled": false},
 		{"key": "livingroomSmallLight", "name": "Kleines Licht", "room": "livingroom", "enabled": true},
 		{"key": "kitchenOven", "name": "Backofen", "room": "kitchen", "enabled": true},
 		{"key": "kitchenRadio", "name": "Radio", "room": "kitchen", "enabled": false},
 		{"key": "bedroomMainLight", "name": "Hauptlampe", "room": "bedroom", "enabled": true},
 		{"key": "bedroomSmallLight", "name": "Leselampe", "room": "bedroom", "enabled": true},
 		{"key": "bedroomTV", "name": "Fernseher", "room": "bedroom", "enabled": false},
 		{"key": "officeMain", "name": "Hauptschalter", "room": "office", "enabled": true}
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

 // admin controller
 app.controller('adminCtrl', function($scope, $routeParams, $location, $http, $mdToast) {
 	$scope.deviceName = "";
 	$scope.deviceKey = "";
 	$scope.roomID = 0;
 	$scope.enabled = false;
 	$scope.deviceInformation = {};
 	$scope.currentNavItem = 'devices';

 	$scope.goto = function(page) {};

 	$scope.addDevice = function() {
 		// ...
 		$scope.deviceInformation = JSON.stringify({"deviceName": $scope.deviceName, "deviceKey": $scope.deviceKey, "roomID": $scope.roomID, "enabled": $scope.enabled});
 		console.log($scope.deviceInformation);
 		$http.post('http://192.168.178.29:5000/addDevice', $scope.deviceInformation)
 			.then(
 				function(response){
 					// success callback
 					// clear values
					$scope.deviceName = "";
					$scope.deviceKey = "";
					$scope.roomID = 0;
					$scope.enabled = false;
					$scope.deviceInformation = {};

					// show success toast
					$mdToast.show(
						$mdToast.simple()
							.textContent('device added!')
							.position('bottom right')
							.hideDelay(3000)
					);
 				},
 				function(response){
 					// failure callback
 				}
 			);
 	};
 });


