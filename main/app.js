'use strict';


// Declare app level module which depends on filters, and services
var MyBandApp = angular.module('MyBand', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngMaterial',
    'ngCookies',
    'ngSanitize',
    'ui.bootstrap',
    "ngMaterial",
    "materialCalendar",
    'material.svgAssetsCache',
    'MyBandApp.filters',
    'MyBandApp.services',
    'MyBandApp.directives',
    'MyBandApp.constants',
    'MyBandApp.controllers',
    'rzModule',
    'bootstrapLightbox',
    'angularFileUpload',
    'monospaced.qrcode'

]);

MyBandApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider
                .when('/explore', {templateUrl: 'app/explore/explore.html', controller: 'exploreController'})
                .when('/home', {templateUrl: 'app/landing-page/landingPage.html', controller: 'homeController'})
                .when('/dashboard', {templateUrl: 'app/dashboard/dashboard.html', controller: 'dashboardAppController'})
                .when('/dashboard/:page', {templateUrl: 'app/dashboard/dashboard.html', controller: 'dashboardAppController'})
                .when('/dashboard/inbox/conversation/:idconversation', {templateUrl: 'app/dashboard/dashboard.html', controller: 'dashboardAppController'})
                .when('/dashboard/createPage', {templateUrl: 'app/createPageModal/createPageModal.html', controller: 'createPageModalController'})
//                .when('/dashboard/events', {templateUrl: 'app/dashboardEvents/dashboardEvents.html', controller: 'eventsDashboardController'})
//                .when('/dashboard/reports', {templateUrl: 'app/dashboardReports/dashboardReports.html', controller: 'reportsDashboardController'})
                .when('/bookings', {templateUrl: 'app/bookings/bookings.html', controller: 'bookingsController'})
                .when('/:band', {templateUrl: 'app/band-page/band-page.html', controller: 'bandPageController'})
                .when('/event/:eventId', {templateUrl: 'app/event-page/event-page.html', controller: 'eventPageController'})
                .otherwise({
                    redirectTo: '/home'
                });

        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $httpProvider.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8;";
        $httpProvider.defaults.withCredentials = true;
    }])
        .config(function ($mdThemingProvider) {
            $mdThemingProvider
                    .theme("default")
                    .primaryPalette("cyan")
                    .accentPalette("light-green");

        })

        .run(['$rootScope', '$location', 'userService', '$route', '$timeout', function ($rootScope, $location, userService, $route, $timeout) {

                if (userService.getCookie('token')) {
                    userService.isLogged = true;
                    $rootScope.user = {};
                    $rootScope.user.isLogged = userService.isLogged;
                    $rootScope.user.name = userService.getUsername('token');
                    $rootScope.user.userId = userService.getUserId('token');
                    $rootScope.user.userType = userService.getUserType('token');
                } else {
                    $rootScope.user = {};
                    $rootScope.user.isLogged = false;
                    $rootScope.user.name = '';
                }
                
                $rootScope.band = {};

                // register listener to watch route changes
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    if ($location.path() === '/dashboard' && ($rootScope.user.isLogged === false || ($rootScope.user.isLogged === true && $rootScope.user.userType === 'gig'))) {
                        $location.path('/explore');
                    }
                    if (!userService.getCookie('token')) {
                        // no logged user, we should be going to #login
//                        if (next.templateUrl === "app/login/login.html") {
//                            // already going to #login, no redirect needed
//                        } else {
//                            // not going to #login, we should redirect now
//                            $location.path("/home");
//                        }
                    }
                });

                $rootScope.$on("$locationChangeStart", function (event, next, current) {
//                    userService.username = userService.getUsername();
//                    userService.ipAddress = userService.getIpAddress();
                    var substring = $location.path();
                    if (substring.indexOf("paths") > -1) {
                        substring = "/paths";
                    }
                    switch (substring)
                    {
                        case "/home":
                            {
                                $rootScope.$currentPage = "home";
                            }
                            break;
                        case "/explore":
                            {
                                $rootScope.$currentPage = "explore";
                            }
                            break;
                        case "/dashboard":
                            {
                                $rootScope.$currentPage = "dashboard";
                            }
                            break;
                        case "/createPage":
                            {
                                $rootScope.$currentPage = "createPage";
                            }
                            break;
//                        case "/newstaticpath":
//                            {
//                                $rootScope.$currentPage = "newstaticpath";
//                            }
//                            break;
//                        case "/scheduling":
//                            {
//                                $rootScope.$currentPage = "scheduling";
//                            }
//                            break;
                        default:
                            {
                                $rootScope.$currentPage = "home";
                            }
                            break;
                    }
                });

            }]);
var services = angular.module('MyBandApp.services', []);
