var ihaochiApp = angular.module('ihaochiApp', []);

ihaochiApp.factory('homeDataService', ['$http', function ($http) {
    var service = {};

    service.data = {
        placesLived: []
    };
    
    service.fetchData = function () {
        return $http.get('/js/home.json').then(function (response) {
            return angular.extend(service.data, response.data);
        });
    }
    return service;
}]);

ihaochiApp.controller('HomeCtrl', ['$scope', 'homeDataService',
    function ($scope, placesLivedService) {
        $scope.pastResidences = [];
        $scope.currentResidence = {};

        placesLivedService.fetchData().then(function (data) {
            $scope.pastResidences = data.placesLived.filter(function (location) {
                return !location.current;
            });
            $scope.currentResidence = data.placesLived.filter(function (location) {
                return location.current;
            })[0];
        });
    }
]);

