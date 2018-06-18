'use strict';

controllers.controller('eventsDashboardController', ['$scope', '$rootScope', '$location', 'dashboardService', '$uibModal',
    function ($scope, $rootScope, $location, dashboardService, $uibModal) {
        var imagePath = 'images/60.jpeg';

        $scope.getAllPages = function () {
            dashboardService.getAllPages($rootScope.user.userId).then(
                    function (response) {
                        $rootScope.band.id = response.data.bands[0].id;
                        $rootScope.band.name = response.data.bands[0].name;
                        $rootScope.band.url = response.data.bands[0].url;
                        $scope.getEvents();
                    },
                    function (reason) {
                        $scope.openCreatePageModal();
                    });
        };

        $scope.getEvents = function () {
            dashboardService.getAllEvents($rootScope.band.id).then(
                    function (response) {
                        console.log(response.data)
                        if (response.data.status !== 'error') {
                            $scope.events = response.data;
                        }
                    },
                    function (reason) {

                    });
        };

        $scope.open = function (latitude, longitude) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/dashboardEvents/locationModal.html',
                controller: 'ModalLocationCtrl',
                resolve: {
                    latitude: function () {
                        return latitude;
                    },
                    longitude: function () {
                        return longitude;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        if ($rootScope.band) {
            $scope.getAllPages();
        } else {
            $scope.getEvents();
        }

        $scope.addToCalendar = function (id) {
            dashboardService.acceptBooking(id).then(
                    function (response) {
                        $scope.getEvents();
                    },
                    function (reason) {

                    });
        };

    }])

        .controller('ModalLocationCtrl', function ($scope, $uibModalInstance, latitude, longitude) {

            $scope.location = {};
            $scope.location.latitude = parseFloat(latitude);
            $scope.location.longitude = parseFloat(longitude);

            $scope.load = function () {
                $('#somecomponent').locationpicker({
                    location: {latitude: $scope.location.latitude, longitude: $scope.location.longitude},
                    radius: 300
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
;