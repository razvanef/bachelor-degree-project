'use strict';

controllers.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, eventId, dashboardService, latitude, longitude) {

    $scope.location = {};
    $scope.location = {latitude: parseFloat(latitude), longitude: parseFloat(longitude)};
    $scope.eventId = eventId;
    $scope.eventTypes = [
            "home party",
            "product launch",
            "wedding",
            "birthday",
            "concert",
            "club opening",
            "other"
        ];
        
    $scope.getEvent = function () {
        dashboardService.getOneEvent($scope.eventId).then(
                function (response) {
                    $scope.event = response.data;
                    $scope.event.event_date = new Date($scope.event.event_date);
                    $scope.event.price = parseInt($scope.event.price);
                },
                function (reason) {

                });
    };
        
    $scope.saveEvent = function () {
        $scope.event.latitude = $scope.location.latitude;
        $scope.event.longitude = $scope.location.longitude;
        dashboardService.saveEvent($scope.event).then(
                function (response) {
                    $scope.cancel();
                },
                function (reason) {

                });
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.getEvent();
});