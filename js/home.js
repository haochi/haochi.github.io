var ihaochiApp = angular.module('ihaochiApp', []);

ihaochiApp.factory('homeDataService', ['$http', function ($http) {
    var service = {};
    service.data = {
        placesLived: [],
        countriesVisited: []
    };
    
    service.fetchData = function (callback) {
        $http.get('/js/home.json').then(function (response) {
            angular.extend(service.data, response.data);
            callback();
        });
        
        return service.data;
    }
    return service;
}]);

ihaochiApp.controller('HomeCtrl', ['$scope', '$http', 'homeDataService',
    function ($scope, $http, placesLivedService) {
        var worldGeometry, countriesVisited, countriesVisitedInfoWindow;

        $scope.data = placesLivedService.fetchData(function () {
            countriesVisited = $scope.data.countriesVisited.map(function (countryCode) {
                return "'" + countryCode + "'";
            });

            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 0, lng: 0 },
                zoom: 1
            });

            worldGeometry = new google.maps.FusionTablesLayer({
                query: {
                    select: 'geometry',
                    from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
                    where: "ISO_2DIGIT IN (" + countriesVisited.join(',') + ")"
                },
                styles: [
                    {
                        polygonOptions: {
                            fillColor: "#ED4337",
                            strokeColor: "#ED4337"
                        },
                        polylineOptions: {
                            strokeColor: "#ED4337"
                        }
                    }
                ],
                suppressInfoWindows: true
            });

            countriesVisitedInfoWindow = new google.maps.InfoWindow({
                content: 'Countries visted!'
            });
            

            $scope.showOnMap($scope.currentResidence());
        });


        $scope.currentResidence = function () {
            return $scope.data.placesLived.filter(function (location) {
                return location.current;
            })[0];
        };

        $scope.showOnMap = function (location) {
            worldGeometry.setMap(null);
            countriesVisitedInfoWindow.setMap(null);
            map.setCenter(location.latlng);
            map.setZoom(location.zoom);
        }

        $scope.showCountriesVisited = function () {
            var countriesVisitedCenter = {lat: 33, lng: -3 };
            worldGeometry.setMap(map);
            countriesVisitedInfoWindow.setMap(map);
            countriesVisitedInfoWindow.setPosition(countriesVisitedCenter);
            map.setCenter(countriesVisitedCenter)
            map.setZoom(2);
        }
    }
]);

