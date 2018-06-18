'use strict';

controllers.controller('createPageModalController',
        ['$rootScope', "$scope", '$location', '$uibModal', '$uibModalInstance', 'createPageService',
            function ($rootScope, $scope, $location, $uibModal, $uibModalInstance, createPageService)
            {
                $scope.band = {};
                $scope.coverimg = '';
                $scope.logoimg = '';
                $scope.band.logofileName = '';
                $scope.band.tags = [];
                $scope.band.members = [{name: null, role: null}];
                var i = 0;

                $scope.ok = function () {
                    $uibModalInstance.close($scope.selected.item);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };



                $scope.openUploader = function () {
                    console.log(34)
                    $('#cover-upload-input').click();
                };

                $scope.openUploaderLogo = function () {
                    console.log(22)
                    $('#logo-upload-input').click();
                };
                $scope.imageFileName = '';




                // Lists of Tags
                $scope.bandTags = [];

                $scope.appendMember = function () {
                    $scope.band.members.push({name: null, role: null});
                };


                $scope.createPage = function () {
                    $scope.band.userId = $rootScope.user.userId;
                    console.log($scope.band);
                    createPageService.createPage($scope.band).then(
                            function (response) {
                                console.log(response);
                                console.log(response.data);
                                $location.path('dashboard');
                            },
                            function (reason) {
                                console.log(reason);
                                console.log(reason.data);
                            });
                };

                $scope.$watch('band.cover', function () {
                    var reader = new FileReader();
                    if ($scope.band.cover) {
                        reader.onload = function (event) {
                            $scope.$apply($scope.coverimg = event.target.result);
                        };
                        reader.readAsDataURL($scope.band.cover);
                    }
                });
                $scope.$watch('band.logo', function () {
                    var reader = new FileReader();
                    if ($scope.band.logo) {
                        reader.onload = function (event) {
                            $scope.$apply($scope.logoimg = event.target.result);
                            console.log($scope.band.cover)
                        };
                        reader.readAsDataURL($scope.band.logo);
                    }
                });

                $scope.addfile = function (a, newfile) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        console.log(event.target.result);
                    };
                    reader.readAsDataURL(newfile);
                };
            }]);