'use strict';
/* Services */
services.service('exploreService', ['$timeout', "$http", "$q", "constants",
    function ($timeout, $http, $q, constants)
    {
        this.getBands = function (params) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getAllBands/' + params,
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
    }]);