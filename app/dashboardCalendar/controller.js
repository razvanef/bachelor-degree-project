'use strict';

controllers.controller('calendarDashboardController', ['$scope', '$rootScope', '$uibModal', '$filter', '$compile', '$timeout', '$log', 'MaterialCalendarData', 'dashboardService',
    function ($scope, $rootScope, $uibModal, $filter, $compile, $timeout, $log, MaterialCalendarData, dashboardService) {

        $scope.day = moment();
        $scope.showEvents = [];
        $scope.events = [];

        $scope.select = function ($event, day) {
            var key = $scope.showEvents[$filter('date')(new Date(day.date['_d']), 'yyyy-MM-dd').toString()];
            if (angular.isUndefined(key)) {
                if ($(".fields")[0]) {
                    $('.fields').slideUp(300, function () {
                        $('.fields').remove();
                        if ($scope.selectedDay !== day) {
                            $scope.selectedDay = day;
                            $($event.target).parent().after('<div class="fields"><div class="left-button close"><i class="fa fa-times"></i></div><textarea id="save" name="field_save" placeholder="New Event" class="field"></textarea><div class="right button save"><i class="zmdi zmdi-plus"></i></div></div>');
                            $('.fields').hide().slideDown(300);
                        }
                    });
                } else {
                    if ($scope.selectedDay !== day) {
                        $scope.selectedDay = day;
                        $($event.currentTarget).parent().after('<div class="fields"><div class="left-button close"><i class="fa fa-times"></i></div><textarea id="save" name="field_save" placeholder="New Event" class="field"></textarea><div class="right button save"><i class="zmdi zmdi-plus"></i></div></div>');
                        $('.fields').hide().slideDown(300);
                    }
                }
            } else {
                var event = $scope.events[key];
                if ($(".fields")[0]) {
                    $('.fields').slideUp(300, function () {
                        $('.fields').remove();
                        if ($scope.selectedDay !== day) {
                            $scope.selectedDay = day;
                            var element = '<div class="fields"><div class="left-button close"><i class="fa fa-times"></i></div>' + event["event_type"] + ' - ' + event["user_name"] + ' - <i ng-click="openEditModal(' + event["id"] + ')" class="fa fa-pencil-square-o" aria-hidden="true"></i><a href="#/event/' + event["id"] + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a></div>';
                            var temp = $compile(element)($scope);
                            $($event.target).parent().after(temp);
                            $('.fields').hide().slideDown(300);
                        }
                    });
                } else {
                    if ($scope.selectedDay !== day) {
                        $scope.selectedDay = day;
                        var element = '<div class="fields"><div class="left-button close"><i class="fa fa-times"></i></div>' + event["event_type"] + ' - ' + event["user_name"] + ' - <i ng-click="openEditModal(' + event["id"] + ',' + event["latitude"] + ',' + event["longitude"] + ')" class="fa fa-pencil-square-o" aria-hidden="true"></i><a href="#/event/' + event["id"] + '" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a></div>';
                        var temp = $compile(element)($scope);
                            $($event.target).parent().after(temp);
                        $('.fields').hide().slideDown(300);
                    }
                }
            }
        };
        
        $scope.openEditModal = function (eventId, latitude, longitude) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/createEditEventModal/createEditEventModal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    eventId: function () {
                        return eventId;
                    },
                    latitude: function () {
                        return latitude;
                    },
                    longitude: function () {
                        return longitude;
                    }
                }
            });
        };

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
                        angular.forEach(response.data, function (value, key) {
                            if (value.status === "1") {
                                $scope.events[key] = value;
                                $scope.events[key]['event_date'] = new Date(value['event_date']);
                            }
                        });
                        console.log($scope.events)
                    },
                    function (reason) {

                    });
        };

        $scope.countEvents = function (day) {
            var ok = false;
            angular.forEach($scope.events, function (value, key) {
                if ($filter('date')(new Date(value['event_date']), 'yyyy-MM-dd') === $filter('date')(new Date(day['_d']), 'yyyy-MM-dd')) {
                    $scope.showEvents[$filter('date')(new Date(day['_d']), 'yyyy-MM-dd').toString()] = key;
                    ok = true;
                };
            });
            if (ok) {
                return 1;
            } else {
                return '';
            }
        };


        if ($rootScope.band) {
            $scope.getAllPages();
        } else {
            $scope.getEvents();
        }
    }]);