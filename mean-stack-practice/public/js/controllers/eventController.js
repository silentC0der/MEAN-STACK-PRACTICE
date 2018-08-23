var app = angular.module('myApp', [])
app.controller('myCtrl', function ($scope, $http) {
    $scope.eventList = "";

    $scope.addEvent = () => {
        let eventObject = {};
        eventObject.eventName = $scope.eventName;
        eventObject.orginationName = $scope.orginationName;
        eventObject.location = $scope.eventName;
        $http({
            url: 'http://localhost:3000/event',
            method: 'POST',
            data: eventObject
        }).then(function (httpResponse) {
            console.log(httpResponse);
            $scope.myMovieDetails = httpResponse.data;
        });
    }

    $scope.getEvent = () => {
        $http({
            url: 'http://localhost:3000/event',
            method: 'GET'
        }).then(function (httpResponse) {
            $scope.eventList = httpResponse.data;
        });
    }
});