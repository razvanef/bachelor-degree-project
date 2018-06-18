'use strict';

controllers.controller('homeController', ['$rootScope', "$scope", '$timeout', '$location', 'loginService', 'userService', '$mdToast',
    function ($rootScope, $scope, $timeout, $location, loginService, userService, $mdToast) {
        $scope.cssClass = 'view1';
        $scope.login = {};
        $scope.newAccount = {};
        $scope.actionAccount = 'sing-up';

        var baseHeight = $(window).height() - 33;
        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > baseHeight) {
                $('.go_to_explore').addClass('fixed');
                $('.right-menu').addClass('fixed');
                $('.go_to_explore').removeClass('bouncing');
                $(".go_to_explore img").attr("src", "images/explore-black.svg");
            } else {
                $('.go_to_explore').removeClass('fixed');
                $('.right-menu').removeClass('fixed');
                $('.go_to_explore').addClass('bouncing');
                $(".go_to_explore img").attr("src", "images/explore-white.svg");
            }
        });

        $scope.showActionToast = function (content) {
            var toast = $mdToast.simple()
                    .textContent(content)
                    .action('OK')
                    .highlightAction(false);

            $mdToast.show(toast).then(function (response) {
                if (response === 'ok') {
                    //alert('You clicked \'OK\'.');
                }
            });
        };

        $scope.account = function (type) {
            $scope.closeModal();
            $scope.actionAccount = type;
            $timeout(function () {
                $scope.openModal($scope.modalType);
            }, 300);
        };
        $scope.openModal = function (type) {
            $('.who-are-you-modal').removeClass('hidde-modal');
            $('.who-are-you').addClass('hidden');
            $scope.modalType = type;
        };
        $scope.closeModal = function () {
            $('.who-are-you-modal').addClass('hidde-modal');
            $('.who-are-you').removeClass('hidden');
            $('.open').addClass('active');
        };

        $scope.logInFunction = function (loginForm, accountType) {
            $scope.submitted = true;

            $scope.invalidCredentials = false;

            if (!loginForm.$invalid)
            {
                $scope.loginLoading = true;
                $scope.login.type_account = accountType;
                console.log($scope.login)
                // call the login service
                loginService.login($scope.login).then(
                        function (response) {
                            //save user credentials
                            userService.saveCredentials(response.data);

                            //save user username
                            userService.userId = response.data.id;
                            userService.username = response.data.name;
                            userService.userType = response.data.type_account;
                            userService.saveUserId();
                            userService.saveUsername();
                            userService.saveUserType();
                            $rootScope.user.isLogged = userService.isLogged;
                            $rootScope.user.userId = userService.getUserId('token');
                            $rootScope.user.name = userService.getUsername('token');
                            $rootScope.user.userType = userService.getUserType('token');

                            $scope.showActionToast(response.data.message);

                            //send data to server
                            if ($rootScope.user.userType === 'gig') {
                                $location.path('explore');
                            } else if ($rootScope.user.userType === 'artist') {
                                $location.path('dashboard');
                            }

//
                        }, function (reason) {
//                            $scope.loginLoading = false;
//                            $scope.errorLogin = true;
//                            var loginErrorMessage = $rootScope.displayError(reason, 'Login');
//                            
//                            if(loginErrorMessage === 'Request Failed!') {
//                                loginErrorMessage = 'Log in failed! Please check your username, password!';
//                            }
//                            
//                            //get paths error
//                            $scope.errorLoginMessage = loginErrorMessage;
//
//                            //display error
//                            $rootScope.displayError(reason);
//                            handleErrors.errorlog($location.path().toString(), reason);
                });
            }
        };

        $scope.createAccount = function (accountType) {
            $scope.newAccount.type_account = accountType;
            loginService.signup($scope.newAccount).then(
                    function (response) {
                        $scope.showActionToast(response.data.message);
                        $location.path('home');
                    },
                    function (reason) {

                    });
        };
    }]);