'use strict';

controllers.controller('conversationDashboardController', ['$scope', '$rootScope', '$location', '$filter', '$routeParams', 'dashboardService',
    function ($scope, $rootScope, $location, $filter, $routeParams, dashboardService) {
        var imagePath = 'images/60.jpeg';

        $scope.conversationId = $routeParams.idconversation;
console.log($rootScope.user.userId)
        $scope.conversation = {};

//        $scope.conversation = {
//            "from": "TravisCI",
//            "face": 'images/60.jpeg',
//            "date": 1400956671914,
//            "subject": "[Passed] conditionizr/conditionizr#1 (v0.1.0 - edd6500)",
//            "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies nibh eget magna gravida, aliquam interdum nisi fringilla. Suspendisse egestas ligula eget leo vestibulum condimentum. Pellentesque at rutrum quam. Donec convallis risus ut nisl rhoncus, eu luctus leo varius. Suspendisse posuere imperdiet commodo. Suspendisse potenti. Nulla consequat, lectus sed scelerisque sodales, nunc urna rutrum tortor, sed sagittis ipsum orci non velit. Nam rutrum ipsum cursus, egestas ligula non, lacinia elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut augue ultricies, volutpat massa ac, mollis velit. Praesent nec accumsan enim, eget vehicula est. Duis nec metus molestie, placerat eros sed, feugiat mi. Nullam interdum volutpat eros, fermentum fermentum nulla eleifend sit amet. Cras ut arcu neque.</p><p>Nullam posuere, erat non bibendum commodo, lacus elit scelerisque felis, id eleifend lorem nulla eget est. Vestibulum quis turpis enim. Nunc porttitor non leo at interdum. In non neque ut leo posuere lobortis. Ut eget neque leo. Suspendisse lobortis mauris eget rhoncus venenatis. Maecenas at ligula ut quam interdum laoreet. Nullam dictum, tortor id elementum eleifend, arcu sem placerat sem, in tincidunt risus augue ac diam. Phasellus tristique lectus tortor, a malesuada nulla aliquet vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec dictum est, at lobortis lacus. Pellentesque iaculis mi metus. Pellentesque pulvinar dui dolor, id pellentesque nibh lobortis at. Nunc ac varius tortor.</p><p>Donec interdum quam vel erat gravida, vitae pulvinar lorem commodo. Quisque rutrum, enim et sollicitudin lobortis, nunc nisl tincidunt nunc, vitae lacinia turpis nisl non mi. Morbi in mi lectus. Vivamus velit libero, ultricies vel lacinia elementum, eleifend in elit. Donec vestibulum scelerisque velit, id tempor nunc dignissim sed. Integer dictum vel sem vitae rhoncus. Cras sit amet diam gravida, lobortis sem at, mollis elit. Mauris viverra magna nisi, quis tempor augue iaculis nec.</p>",
//            "id": 10824581
//        };
//
//        $scope.messages = [
//            {who: 'me', time: '10:24 AM', date: '12/02/2016', text: 'Are we meeting today? Project has been already finished and I have results to show you.'},
//            {who: 'user', time: '12:24 AM', date: '12/02/2016', text: 'http://www.youtube.com/watch?v=mJirA9Hk8FY'},
//            {who: 'me', time: '14:24 AM', date: '13/02/2016', text: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?'},
//            {who: 'user', time: '16:04 AM', date: '14/02/2016', text: "Actually everything was fine. I'm very excited to show this to our team."},
//        ];


        $scope.reply = function (response) {
            var date = new Date();
            var line = {
                conversation_id: $scope.conversationId,
                sender: $rootScope.user.userId,
                text: response
            };
            dashboardService.sendLine(line).then(
                    function (response) {
                        $scope.response = null;
                    },
                    function (reason) {

                    });
            line.date = new Date();
            $scope.messages.push(line);
        };

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
        }


        $scope.getOneConversation = function (convId) {
            dashboardService.getOneConversation(convId).then(
                    function (response) {
                        $scope.conversation.from = response.data.user;
                        $scope.messages = response.data.lines;
                        $scope.booking = response.data.booking;
                        $scope.location = {
                            latitude: $scope.booking.latitude,
                            longitude: $scope.booking.longitude
                        };
                        console.log($scope.location)
                    },
                    function (reason) {

                    });
        };

        $scope.getOneConversation($scope.conversationId);



        setTimeout(function () {
            videoEmbed.invoke();
        }, 300);

    }]);