'use strict';
/* Services */
services.service('loginService', ['$timeout', "$http", "$q", "constants", // 'Base64', 
    function ($timeout, $http, $q, constants)//, Base64)
    {
        // login service
        this.login = function (loginInformation) {
            var defer = $q.defer();
            //set url for request
            var url = constants.protocol + constants.server + ':' + constants.port + '/restproxy/login';


//            $http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; //you probably don't need this line.  This lets me connect to my server on a different domain
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(loginInformation.username + ':' + loginInformation.password);

            //send login request
            return $http({
                method: 'POST',
                url: constants.urlPart + 'login',
                data: loginInformation,
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function (data, status, headers, config) {
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject(data);
                    });
        };

        this.signup = function (signUpInformations) {
            var defer = $q.defer();
            return $http({
                method: 'POST',
                url: constants.urlPart + 'signUp',
                data: signUpInformations
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