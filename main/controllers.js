'use strict';

var controllers = angular.module('MyBandApp.controllers', [])
        .controller('AppController', ['$rootScope', '$scope', '$location', 'userService', '$q', '$mdDialog', '$mdMedia',
            function ($rootScope, $scope, $location, userService, $q, $mdDialog, $mdMedia) {
                $scope.logOutOptions = function () {
                    userService.removeCookie('token');
                    $rootScope.user.isLogged = false;
                    $rootScope.user.name = '';
                    $rootScope.user.userType = '';
                    $location.path('/home');
                };

                $scope.userInfoModal = function (ev) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                    $mdDialog.show({
                        controller: UserInfoController,
                        templateUrl: 'app/userAccountSettings/userAccountSettings.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: useFullScreen
                    })
                            .then(function (answer) {
                                $scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                $scope.status = 'You cancelled the dialog.';
                            });



                    $scope.$watch(function () {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function (wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });

                };
            }]);
        