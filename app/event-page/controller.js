'use strict';

controllers.controller('eventPageController', ['$rootScope', '$scope', '$location', '$routeParams', 'dashboardService', 'bookingService', '$window',
    function ($rootScope, $scope, $location, $routeParams, dashboardService, bookingService, $window) {
        $scope.eventId = $routeParams.eventId;
        $scope.url = '#' + $location.url();
        $scope.isGoing = false;

        $scope.getEvent = function () {
            dashboardService.getOneEvent($scope.eventId).then(
                    function (response) {
                        $scope.event = response.data;
                        console.log($scope.event)
                        $scope.event.price = parseInt($scope.event.price);
                        $('#somecomponent').locationpicker({
                            location: {latitude: $scope.event.latitude, longitude: $scope.event.longitude},
                            radius: 300
                        });
                        if ($rootScope.user.isLogged) {
                            bookingService.userGoing($scope.event.id, $rootScope.user.userId).then(
                                    function (response) {
                                        if (response.data) {
                                            $scope.isGoing = true;
                                        }
                                    },
                                    function (reason) {
                                        $scope.openCreatePageModal();
                                    });
                        }
                    },
                    function (reason) {

                    });
        };

        $scope.getAllPages = function () {
            dashboardService.getAllPages($rootScope.user.userId).then(
                    function (response) {
                        console.log(response.data)
                        $scope.band = response.data.bands[0];
                    },
                    function (reason) {
                        $scope.openCreatePageModal();
                    });
        };

        $('.card__share > a').on('click', function (e) {
            e.preventDefault() // prevent default action - hash doesn't appear in url
            $(this).parent().find('div').toggleClass('card__social--active');
            $(this).toggleClass('share-expanded');
        });

        $scope.goToEvent = function () {
            console.log(!$scope.isGoing)
            bookingService.goToEvent($scope.event.id, $rootScope.user.userId, $rootScope.user.name, !$scope.isGoing).then(
                    function (response) {
                        $scope.isGoing = !$scope.isGoing;
                    },
                    function (reason) {

                    });
        };
        
        $scope.generateReport = function() {
            $window.open('http://localhost/licenta/api/v1/guestsreport.php', '_blank');
        };

        $scope.getEvent();
        $scope.getAllPages()
    }]);