'use strict';

controllers.controller('indexDashboardController', ['$rootScope', '$scope', '$sce', 'dashboardService', 'FileUploader', 'constants', 'createPageService',
    function ($rootScope, $scope, $sce, dashboardService, FileUploader, constants, createPageService) {

        $scope.band = {};
        $scope.band.tags = [];
        $scope.band.videos = [];
        $scope.band.members = [{name: null, role: null}];

        var uploader = $scope.uploader = new FileUploader({
            url: constants.urlPart + 'upload.php'
        });

        $scope.eventTypes = [
            "home party",
            "product launch",
            "wedding",
            "birthday",
            "concert",
            "club opening",
            "other"
        ];

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });


        $scope.getPage = function (band) {
            createPageService.getPage(band).then(
                    function (response) {
                        $scope.band = response.data;
                        if ($scope.band.cover) {
                            $scope.coverimg = $scope.band.cover;
                        }
                        if ($scope.band.logo) {
                            $scope.logoimg = $scope.band.logo;
                        }
                        if (!$scope.band.members) {
                            $scope.band.members = [{name: null, role: null}];
                        }
                        angular.forEach($scope.band.tags, function (item, key) {
                            $scope.band.tags[key] = item['tag_title'];
                        });
                        angular.forEach($scope.band.gallery, function (item, key) {
                            uploader.queue[key] = {};
                            uploader.queue[key].file = {};
                            uploader.queue[key].file.name = item.name;
                            uploader.queue[key].isSuccess = true;
                        });
                        if (!$scope.band.videos) {
                            $scope.band.videos = [];
                        } else {
                            $scope.selectVideo($scope.band.videos[0].url);
                        }
                        console.log($scope.band)
                    },
                    function (reason) {

                    });
        };

        $scope.getAllPages = function () {
            dashboardService.getAllPages($rootScope.user.userId).then(
                    function (response) {
                        if (response.data.bands) {
                            $rootScope.band.id = response.data.bands[0].id;
                            $rootScope.band.url = response.data.bands[0].url;
                            $rootScope.band.name = response.data.bands[0].name;
                            $scope.getPage($rootScope.band.url);
                        } else if (response.data.message === 'No page found') {
                            $scope.openCreatePageModal();
                        }
                    },
                    function (reason) {

                    });
        };

        $scope.addInGallery = function () {
            var photos = [];
            angular.forEach(uploader.queue, function (item) {
                photos.push(item.file.name);
            });
            dashboardService.addToGallery($scope.band.id, photos).then(
                    function (response) {

                    },
                    function (reason) {

                    });
        };

        $scope.deletePhoto = function (file, i) {
            dashboardService.deletePhoto($scope.band.id, file).then(
                    function (response) {
                        uploader.queue.splice(i, 1);
                    },
                    function (reason) {

                    });
        };


        $scope.appendMember = function () {
            $scope.band.members.push({name: null, role: null});
        };

        $scope.editBandPage = function () {
            console.log($scope.band);
            
            dashboardService.editPage($scope.band).then(
                    function (response) {
                        console.log(response.data)
                    },
                    function (resolve) {

                    });
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

        $scope.addVideo = function (url) {
            console.log(url)
            if (url) {
                dashboardService.addVideo($scope.band.id, url).then(
                        function (response) {
                            console.log(response)
                            $scope.band.videos.push({'url': url, 'id': $scope.band.videos.length});
                            console.log($scope.band.videos)
                        },
                        function (reason) {

                        });
            }
        };

        $scope.selectVideo = function (url) {
            $scope.selectedVideo = url;
        };

        $scope.trustSrc = function (src) {
            if (src) {
                var url = src.replace("watch?v=", "embed/");
                return $sce.trustAsResourceUrl(url);
            }
        };


        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

        if ($rootScope.band.url) {
            $scope.getPage($rootScope.band.url);
        } else {
            $scope.getAllPages();
        }
        ;


    }]);