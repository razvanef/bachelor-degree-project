'use strict';

controllers.controller('exploreController', ['$rootScope', "$scope", 'exploreService', '$log', '$q',
    function ($rootScope, $scope, exploreService, $log, $q) {
        $scope.cssClass = 'view2';

        $scope.filter = {};

        $scope.simulateQuery = false;
        $scope.isDisabled = false;

        // list of `state` value/display objects
        $scope.states = loadAll();
        $scope.querySearch = querySearch;
        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange = searchTextChange;

        $scope.newState = newState;
        
        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Romania, Alba, Arad, Arges, Bacau, Bihor, Bistrita Nasaud, Botosani, Braila, Brasov, Bucuresti, Buzau, Calarasi, Caras Severin, Cluj, Constanta, Covasna, Dambovita, Dolj, Galati, Giurgiu, Gorj, Harghita, Hunedoara, Ialomita, Iasi, Ilfov, Maramures, Mehedinti, Mures, Neamt, Olt, Prahova, Salaj, Satu Mare, Sibiu, Suceava, Teleorman, Timis, Tulcea, Valcea, Vaslui, Vrancea, ';

            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function newState(state) {
            alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }

        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            var results = query ? $scope.states.filter(createFilterFor(query)) : $scope.states,
                    deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }

        $scope.hoverRatingReadOnly = 0;

        $scope.mouseHover3 = function (param) {
            $scope.hoverRatingReadOnly = param;
        };

        $scope.mouseLeave3 = function (param) {
            $scope.hoverRatingReadOnly = param + '*';
        };

        $('.search-band-button label i').on('click', function () {
            $('.search-band-button').toggleClass('is-focused');
        });
        $(document).mouseup(function (e) {
            var container = $('.search-band-button');

            if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $('.search-band-button').removeClass('is-focused');
            }
        });

        $scope.active = true;

        $scope.selectedTab = 0;

        $scope.changeTab = function () {
            if ($scope.selectedTab === 2) {
                $scope.selectedTab = 0;
            } else {
                $scope.selectedTab++;
            }

        };


        //Range slider config
        $scope.rangeSlider = {
            minValue: 0,
            maxValue: 200,
            options: {
                floor: 0,
                ceil: 200,
                step: 1
            }
        };

        $scope.filterBands = function () {
            console.log($scope.filter);
            console.log($scope.rangeSlider.minValue);
            console.log($scope.rangeSlider.maxValue);
            var url = '';
            if ($scope.rangeSlider.minValue !== 0 || $scope.rangeSlider.maxValue !== 100) {
                $scope.filter.minPrice = $scope.rangeSlider.minValue;
                $scope.filter.maxPrice = $scope.rangeSlider.maxValue;
            }
            if ($scope.filter !== {}) {
                url = '?';
                var i = 0;
                angular.forEach($scope.filter, function (value, key) {
                    console.log(value, key);
                    if (i === 0) {
                        url = url + key + '=' + value;
                    } else {
                        url = url + '&' + key + '=' + value;
                    }
                    i++;
                });
            }
            exploreService.getBands(url).then(
                    function (response) {
                        $scope.bands = response.data;
                    }, function (reason) {

            });
        };


        $scope.filterBands();
    }]);