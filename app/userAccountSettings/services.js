'use strict';
/* Services */
services.service('userGigService', ['$timeout', "$http", "$q", "constants", // 'Base64', 
    function ($timeout, $http, $q, constants)//, Base64)
    {

        this.getUser = function (userId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getUser/' + userId,
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };

        this.postUser = function (user) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'postUser',
                data: user,
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };

    }]);