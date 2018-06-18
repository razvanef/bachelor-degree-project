'use strict';

controllers.controller('reportsDashboardController', ['$scope', '$rootScope', '$location', 'dashboardService', '$uibModal',
    function ($scope, $rootScope, $location, dashboardService, $uibModal) {

        $scope.reports = {};

        var dataYear = {"xData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "yData": [{
                    "name": "visits",
                    "data": [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }]};

        var moneyYear = {"xData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "yData": [{
                    "name": "money",
                    "data": [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }]};

        var dataMonth = {"xData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "yData": [{
                    "name": "visits",
                    "data": [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }]};

//        var dataYear = {};
        dataYear.xData = Array.apply(null, {length: 12}).map(function () {
            return 'N/A';
        });
        dataYear.yData[0].data = Array.apply(null, {length: 12}).map(function () {
            return 0;
        });

        moneyYear.xData = Array.apply(null, {length: 12}).map(function () {
            return 'N/A';
        });
        moneyYear.yData[0].data = Array.apply(null, {length: 12}).map(function () {
            return 0;
        });

//        var dataMonth = {};
        dataMonth.xData = Array.apply(null, {length: 30}).map(function () {
            return 'N/A';
        });
        dataMonth.yData[0].data = Array.apply(null, {length: 30}).map(function () {
            return 0;
        });

        $scope.lineChartYDataYear = dataYear.yData;
        $scope.lineChartXDataYear = dataYear.xData;

        $scope.lineChartYMoneyYear = moneyYear.yData;
        $scope.lineChartXMoneyYear = moneyYear.xData;

        $scope.lineChartYDataMonth = dataMonth.yData;
        $scope.lineChartXDataMonth = dataMonth.xData;


        $scope.getAllPages = function () {
            dashboardService.getAllPages($rootScope.user.userId).then(
                    function (response) {
                        $rootScope.band.id = response.data.bands[0].id;
                        $rootScope.band.name = response.data.bands[0].name;
                        $rootScope.band.url = response.data.bands[0].url;
                        $scope.getReports();
                    },
                    function (reason) {
                        $scope.openCreatePageModal();
                    });
        };

        $scope.getReports = function () {
            dashboardService.getReports($rootScope.band.id).then(
                    function (response) {
                        $scope.reports = response.data;
                        console.log($scope.reports);
                        if ($scope.reports.money) {
                            for (var i = $scope.reports.money.length - 1; i >= 0; i--) {
                                moneyYear.xData[11 - i] = $scope.reports.money[i].month;
                                moneyYear.yData[0].data[11 - i] = parseInt($scope.reports.money[i].sum);
                            }
                        }
                        if ($scope.reports.year) {
                            for (var i = $scope.reports.year.length - 1; i >= 0; i--) {
                                dataYear.xData[11 - i] = $scope.reports.year[i].month;
                                dataYear.yData[0].data[11 - i] = parseInt($scope.reports.year[i].visits);
                            }
                        }
                        if ($scope.reports.month) {
                            for (var i = $scope.reports.month.length - 1; i >= 0; i--) {
                                dataMonth.xData[29 - i] = $scope.reports.month[i].day;
                                dataMonth.yData[0].data[29 - i] = parseInt($scope.reports.month[i].visits);
                            }
                        }
                    },
                    function (reason) {

                    });
        };

        if ($rootScope.band) {
            $scope.getAllPages();
        } else {
            $scope.getReports();
        }
    }]);