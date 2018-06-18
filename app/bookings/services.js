'use strict';
/* Services */
services.service('bookingService', ['$timeout', "$http", "$q", "constants", // 'Base64', 
    function ($timeout, $http, $q, constants)//, Base64)
    {
        this.sendRequest = function (request) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'sendRequest',
                data: request,
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.sendLine = function (line) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'sendLine',
                data: line,
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };

        this.getConversations = function (userId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getConversations/' + userId

            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.goToEvent = function (event, userId, userName, bool) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'goToEvent',
                data: {'event_id':event, 'user_id': userId, 'user_name':userName, 'isGoing':bool},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        
        this.userGoing = function (event, user) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'userGoing',
                data: {'event_id': event, 'user_id': user},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
    }
]);