'use strict';

controllers.controller('inboxDashboardController', ['$scope', '$rootScope', '$location', 'dashboardService',
    function ($scope, $rootScope, $location, dashboardService) {
        var imagePath = 'images/60.jpeg';
//        $scope.messages = [{
//                id: 0,
//                readed: false,
//                face: imagePath,
//                what: 'Brunch this weekend?',
//                who: 'Min Li Chan',
//                when: '3:08PM',
//                notes: " I'll be in your neighborhood doing errands"
//            }, {
//                id: 1,
//                readed: true,
//                face: imagePath,
//                what: 'Brunch this weekend?',
//                who: 'Min Li Chan',
//                when: '3:08PM',
//                notes: " I'll be in your neighborhood doing errands, I'll be in your neighborhood doing errand I'll be in your neighborhood doing errandI'll be in your neighborhood doing errandI'll be in your neighborhood doing errand"
//            }, {
//                id: 2,
//                readed: false,
//                face: imagePath,
//                what: 'Brunch this weekend?',
//                who: 'Min Li Chan',
//                when: '3:08PM',
//                notes: " I'll be in your neighborhood doing errands"
//            }, {
//                id: 3,
//                readed: true,
//                face: imagePath,
//                what: 'Brunch this weekend?',
//                who: 'Min Li Chan',
//                when: '3:08PM',
//                notes: " I'll be in your neighborhood doing errands"
//            }, {
//                id: 4,
//                readed: true,
//                face: imagePath,
//                what: 'Brunch this weekend?',
//                who: 'Min Li Chan',
//                when: '3:08PM',
//                notes: " I'll be in your neighborhood doing errands"
//            }];

        $scope.readConversation = function (id) {
            if (angular.isNumber(parseInt(id,10))) {
                $location.path('dashboard/inbox/conversation/'+id);
            }
        };
        
        $scope.getConv = function (userId) {
            dashboardService.getConversations(userId).then(
                    function (response) {
                        $scope.groups = response.data.conv;
                        angular.forEach($scope.groups.conv, function (item, key) {
                            $scope.location[key] = {
                                latitude: $scope.groups[key].booking.latitude,
                                longitude: $scope.groups[key].booking.longitude
                            };
//                            angular.forEach(item.lines, function(line, i) {
//                                $scope.groups[key].lines[i].text = videoEmbed.convertMedia(line.text);
//                            });
                        });
//                        videoEmbed.invoke();
                    },
                    function (reason) {

                    });
        };
        
        
        $scope.getConv($rootScope.user.userId);
    }]);