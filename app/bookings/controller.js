controllers.controller('bookingsController', ['$rootScope', "$scope", 'bookingService', function ($rootScope, $scope, bookingService) {

        $scope.conversationLine = {};
        $scope.location = [];

//        $scope.groups = [
//            {
//                title: 'Dynamic Group Header - 1',
//                content: 'Dynamic Group Body - 1',
//                image: 'images/avatar.jpg',
//                messages: [
//                    {who: 'me', time: '10:24 AM', date: '12/02/2016', text: 'Are we meeting today? Project has been already finished and I have results to show you.'},
//                    {who: 'user', time: '12:24 AM', date: '12/02/2016', text: 'http://www.youtube.com/watch?v=mJirA9Hk8FY'},
//                    {who: 'me', time: '14:24 AM', date: '13/02/2016', text: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?'},
//                    {who: 'user', time: '16:04 AM', date: '14/02/2016', text: "Actually everything was fine. I'm very excited to show this to our team."},
//                ]
//            },
//            {
//                title: 'Dynamic Group Header - 2',
//                content: 'Dynamic Group Body - 2',
//                image: 'images/avatar.jpg',
//                messages: [
//                    {who: 'me', time: '10:24 AM', date: '12/02/2016', text: 'Are we meeting today? Project has been already finished and I have results to show you.'},
//                    {who: 'user', time: '12:24 AM', date: '12/02/2016', text: 'http://www.youtube.com/watch?v=mJirA9Hk8FY'},
//                    {who: 'me', time: '14:24 AM', date: '13/02/2016', text: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?'},
//                    {who: 'user', time: '16:04 AM', date: '14/02/2016', text: "Actually everything was fine. I'm very excited to show this to our team."},
//                ]
//            }
//        ];
//
//        $scope.reply = function (response) {
//            var date = new Date();
//            $scope.messages.push({
//                who: 'me',
//                time: $filter('date')(new Date(), 'hh:mm a'),
//                date: $filter('date')(new Date(), 'EEE MMM yyyy'),
//                text: response
//            });
//        }

        var videoEmbed = {
            invoke: function () {
                $('.message').html(function (i, html) {
                    return videoEmbed.convertMedia(html);
                });

            },
            convertMedia: function (html) {
                var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
                var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
//        var pattern4 = /(?:http?s?:\/\/)?(?:www\.)?(?:soundcloud\.com)\/(?:watch\?v=)?(.+)/g;
                var pattern3 = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;

                if (pattern1.test(html)) {
                    var replacement = '<iframe width="420" height="345" src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

                    var html = html.replace(pattern1, replacement);
                }


                if (pattern2.test(html)) {
                    var replacement = '<iframe width="420" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';
                    var html = html.replace(pattern2, replacement);
                }


                if (pattern3.test(html)) {
                    var replacement = '<a href="$1" target="_blank"><img class="sml" src="$1" /></a><br />';
                    var html = html.replace(pattern3, replacement);
                }
                return html;
            }
        };

        $scope.getConv = function (userId) {
            bookingService.getConversations(userId).then(
                    function (response) {
                        $scope.groups = response.data.conv;
                        console.log($scope.groups)
                        angular.forEach($scope.groups, function (item, key) {
                            $scope.location[key] = {
                                latitude: $scope.groups[key].booking.latitude,
                                longitude: $scope.groups[key].booking.longitude
                            };
//                            angular.forEach(item.lines, function(line, i) {
//                                $scope.groups[key].lines[i].text = videoEmbed.convertMedia(line.text);
//                            });
                        });
                        console.log($scope.location[0])
                        videoEmbed.invoke();
                    },
                    function (reason) {

                    });
        };


        $scope.sendLine = function (index, response) {
            $scope.conversationLine.conversation_id = $scope.groups[index].booking['conversation_id'];
            $scope.conversationLine.sender = $rootScope.user.userId;
            $scope.conversationLine.text = response;
            console.log($scope.groups[index].lines);
            if(!$scope.groups[index].lines) {
                $scope.groups[index].lines = [];
                $scope.groups[index].lines.push({
                    conversation_id: $scope.conversationLine.conversation_id,
                    date: new Date(),
                    id: 0,
                    sender: $scope.conversationLine.sender,
                    text: response
                });
            } else {
                $scope.groups[index].lines.push({
                    conversation_id: $scope.conversationLine.conversation_id,
                    date: new Date(),
                    id: $scope.groups[index].lines[$scope.groups[index].lines.length - 1].id + 1,
                    sender: $scope.conversationLine.sender,
                    text: response
                });
            }
            videoEmbed.invoke();

            bookingService.sendLine($scope.conversationLine).then(
                    function (response) {
                        $scope.response = null;
                    },
                    function (reason) {

                    });
        };

        $scope.getConv($rootScope.user.userId);
    }]);