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
 app.controller('adminCtrl', function($scope, $routeParams, $location, $http, $mdToast, $mdDialog) {
 	// get rooms
    $http.get('http://192.168.178.29:5000/getRooms').then(function(response) {
    	$scope.rooms = response.data;
    });

 	// get devices
    $http.get('http://192.168.178.29:5000/getDevices').then(function(response) {
    	$scope.devices = response.data;
    });

    $scope.deleteItem = "";
    // delete item
	$scope.showConfirm = function(ev) {
		// Appending dialog to document.body to cover sidenav in docs app
		var parentEl = angular.element(document.body);
		console.log(parentEl);
		var confirm = $mdDialog.confirm()
			.title('Soll das Element wirklich entfernt werden?')
			.textContent('Ein entferntes Element kann nicht wiederhergestellt werden.')
			.ariaLabel('Element entfernen')
			.targetEvent(ev)
			.ok('Entfernen')
			.cancel('Abbrechen');

		$mdDialog.show(confirm).then(function() {
			console.log('Element entfernt');
		}, function() {
			console.log('Abgebrochen');
		});
	};

 	$scope.form = {
 		// create an object to ensure, that values are up to date
 		deviceName: "",
 		deviceKey: "",
 		roomID: 0,
 		enabled: false
 	};
 	$scope.deviceInformation = {};
 	$scope.currentNavItem = 'devices';
 	$scope.showDevices = true;
 	$scope.showRooms = false;
 	$scope.showCities = false;

 	$scope.goto = function(page) {
 		if(page=="devices"){
 			// show devices
 			$scope.showDevices = true;
			$scope.showRooms = false;
			$scope.showCities = false;
 		} else if(page=="rooms") {
 			// show rooms
 			$scope.showDevices = false;
			$scope.showRooms = true;
			$scope.showCities = false;
 		} else {
 			// show cities
 			$scope.showDevices = false;
			$scope.showRooms = false;
			$scope.showCities = true;
 		};
 	};

 	$scope.addDevice = function() {
 		// ...
 		$scope.deviceInformation = JSON.stringify({"deviceName": $scope.form.deviceName, "deviceKey": $scope.form.deviceKey, "roomID": $scope.form.roomID, "enabled": $scope.form.enabled});
 		console.log($scope.deviceInformation);
 		$http.post('http://192.168.178.29:5000/addDevice', $scope.deviceInformation)
 			.then(
 				function(response){
 					// success callback
 					// clear values
					$scope.form.deviceName = "";
					$scope.form.deviceKey = "";
					$scope.form.roomID = 0;
					$scope.form.enabled = false;
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


