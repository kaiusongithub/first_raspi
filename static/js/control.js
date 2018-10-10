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

app.controller('myCtrl', function($scope, $mdSidenav, $http) {
	$scope.toggleLeft = buildToggler('left');
	console.log('SideNav');

	function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };

    // get current weather data
    $http.get("http://api.openweathermap.org/data/2.5/weather?zip=49413,de&APPID=4a97ae0f4ff2538a214cf773a5351ff4")
    .then(function(response) {
        $scope.currentWeather = response.data;
        console.log($scope.currentWeather)
    });

  //   $scope.currentWeather = {
  //   	"coord":{"lon":-122.09,"lat":37.39},
		// "sys":{"type":3,"id":168940,"message":0.0297,"country":"US","sunrise":1427723751,"sunset":1427768967},
		// "weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}],
		// "base":"stations",
		// "main":{"temp":285.68,"humidity":74,"pressure":1016.8,"temp_min":284.82,"temp_max":286.48},
		// "wind":{"speed":0.96,"deg":285.001},
		// "clouds":{"all":0},
		// "dt":1427700245,
		// "id":0,
		// "name":"Mountain View",
		// "cod":200};

	$scope.currentTemperature = $scope.currentWeather['main']['temp'];
});

 app.controller('roomCtrl', function($scope, $routeParams, $location) {
 	$scope.selectedRoom = "";
 	$scope.roomKey = "";

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