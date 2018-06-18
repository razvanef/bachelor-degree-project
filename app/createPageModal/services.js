'use strict';
/* Services */
services.service('createPageService', ['$timeout', "$http", "$q", "constants",// 'Base64', 
    function($timeout, $http, $q, constants)//, Base64)
    {
        
        this.createPage = function(bandInfo) {
            var defer = $q.defer();
            var fd = new FormData();
            angular.forEach(bandInfo, function (value, key) {
                    fd.append(key, value);
                });
            return $http({
                method: 'POST',
                withCredentials: false,
                url: constants.urlPart + 'createPage',
                data: fd,
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function(data, status, headers, config) {
                defer.reject(data);
            });
        };
        
        this.getPage = function(band) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getPage/' + band,
            })
            .success(function(data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function(data, status, headers, config) {
                defer.reject(data);
            });
        };

        this.postComment = function (comment) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'postComment',
                data: comment,
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.getComments = function (bandId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getComments/'+bandId,
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
    }]);