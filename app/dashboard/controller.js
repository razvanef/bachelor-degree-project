'use strict';

controllers.controller('dashboardAppController', ['$rootScope', '$scope', '$location', '$uibModal', '$routeParams', '$cookieStore', '$q', 'userService', 'dashboardService',
    function ($rootScope, $scope, $location, $uibModal, $routeParams, $cookieStore, $q, userService, dashboardService) {

        if ($routeParams.page) {
            $scope.page = $routeParams.page;
        } else if ($routeParams.idconversation) {
            $scope.page = 'inbox / Conversation';
        } else {
            $scope.page = 'Dashboard';
        }
        ;


        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;

        $scope.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };

        $scope.navigateDashboard = function (page) {
            $location.path('/dashboard/' + page);
        };


        $scope.logOutOptions = function () {
            userService.removeCookie('token');
            $rootScope.user.isLogged = false;
            $rootScope.user.name = '';
            $location.path('/home');
        };

        $scope.openCreatePageModal = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/createPageModal/createPageModal.html',
                controller: 'createPageModalController',
                backdrop: 'static'
            });
        };

        $scope.getAllPages = function () {
            console.log($rootScope.user)
            dashboardService.getAllPages($rootScope.user.userId).then(
                    function (response) {
                        if (response.data.bands) {
                            $rootScope.band.id = response.data.bands[0].id;
                            $rootScope.band.url = response.data.bands[0].url;
                            $rootScope.band.name = response.data.bands[0].name;
                        }
                    },
                    function (reason) {
                        $scope.openCreatePageModal();
                    });
        };

        $scope.getAllPages();
    }]);