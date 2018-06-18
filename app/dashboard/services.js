'use strict';
/* Services */
services.service('dashboardService', ['$timeout', "$http", "$q", "constants", // 'Base64', 
    function ($timeout, $http, $q, constants)//, Base64)
    {
        this.getAllPages = function (userId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getAllPages/' + userId

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
                url: constants.urlPart + 'sendLineBand',
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

        this.getConversations = function (bandId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getConversationsBand/' + bandId

            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };

        this.getOneConversation = function (convId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getOneConversation/' + convId

            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.getAllEvents = function(bandId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getAllEvents/' + bandId

            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.getOneEvent = function(eventId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getOneEvents/' + eventId

            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.saveEvent = function (event) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'editEvent',
                data: event,
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        
        this.acceptBooking = function(eventId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'acceptBooking/' + eventId

            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.getReports = function(bandId) {
            var defer = $q.defer();
            return $http({
                method: 'GET',
                url: constants.urlPart + 'getReports/' + bandId

            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.addToGallery = function (id, photos) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'addToGallery',
                data: {'id': id, 'photos': photos},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.deletePhoto = function (id, photos) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'removeFromGallery',
                data: {'id': id, 'name': photos},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.addVideo = function (id, url) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'addVideo',
                data: {'id': id, 'url': url},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };
        
        this.editPage = function (band) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'editPage',
                data: band,
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