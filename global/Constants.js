angular.module('MyBandApp.constants', []).factory('constants', [function() {
	var contants = {
            protocol: 'https://',
            server: '208.74.179.91',
            urlPart: 'api/v1/'
	};
        
	return contants;
}]).factory(
    'xcookies', 
    [
        function() 
        {
            //cookie factory
            return {
                //remove all saved cookies    
                deleteAllCookies: function() {
                    var cookies = document.cookie.split(";");
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i];
                        var eqPos = cookie.indexOf("=");
                        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    }                
                }
            };
        }
    ]
)
.factory('nodesName', [function() {
    var nodesName = [];
    var interfaceName = [];
    
    return {
        'nodesName': nodesName,
        'interfaceName': interfaceName
    }
}])
.factory('setName', ['nodesName', function(nodesName) {
        var name;
    return {
        setName: function(id, type) {
            if(type === 'node') {
                angular.forEach(nodesName.nodesName, function(item) {
                    if(id === item.id) {
                        name = item.name;
                    }
                })
            } else if(type === 'interf') {
                angular.forEach(nodesName.interfaceName, function(item) {
                    if(id === item.id) {
                        name = item.name;
                    }
                })
            }
            return name;
        }
    }
}])
    .factory('handleErrors', function($rootScope, $http, dateFilter) {
        return {
            errorlog: function(location, reason) {
                var date = dateFilter(new Date, 'yyyy-MM-dd h:mm:ss a');
                var reasons;
                if(reason.data === " " || reason.data === null) {
                    reasons = $rootScope.displayError(reason) + " - request-url: "+reason.config.url;
                } else if(!reason.data.errors) {
                    reasons = reason.data.message + " - request-url: "+reason.config.url;
                } else {
                    reasons = reason.data.errors.error[0]['error-message'] + " - request-url: "+reason.config.url;
                }
                var errors = {'date': date, 'location': location, 'reason': reasons};
                $http.post('app/global/logerror.php',errors);
            }
        }
});