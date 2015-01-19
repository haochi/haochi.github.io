var ihaochiApp = angular.module('ihaochiApp', []);

ihaochiApp.factory('placesLivedService', ['$http', function ($http) {
    var service = {};
    service.data = [];
    
    service.getLocations = function (callback) {
        $http.get('/js/locations.json').then(function (response) {
            service.data.splice.apply(service.data, [0, 0].concat(response.data.data));
            callback(service.data);
        });
        
        return service.data;
    }
    return service;
}]);

ihaochiApp.controller('HomeCtrl', ['$scope', '$http', 'placesLivedService',
    function ($scope, $http, placesLivedService) {
        $scope.locations = placesLivedService.getLocations(function () {
            $scope.showOnMap($scope.current());
        });

        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 },
            zoom: 1
        });

        $scope.current = function () {
            return $scope.locations.filter(function (location) {
                return location.current;
            })[0];
        };

        $scope.showOnMap = function (location) {
            $scope.map.setCenter(location.latlng);
            $scope.map.setZoom(location.zoom);
        }
    }
]);

