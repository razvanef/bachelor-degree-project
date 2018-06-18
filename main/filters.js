'use strict';

/* Filters */

angular.module('MyBandApp.filters', []).
        filter('interpolate', ['version', function (version) {
                return function (text) {
                    return String(text).replace(/\%VERSION\%/mg, version);
                };
            }])
        .filter('capitalize', function () {
            return function (input, all) {
                return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }) : '';
            }
        })

        .filter('myDateFormat', function myDateFormat($filter) {
            return function (text) {
                if (text) {
                    var tempdate = new Date(text.replace(/-/g, "/"));
                    return $filter('date')(tempdate, "dd MMM, yyyy");
                }
            };
        });
;


