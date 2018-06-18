'use strict';

controllers.controller('bandPageController', ['$rootScope', "$scope", '$filter', '$sce', '$routeParams', 'createPageService', 'bookingService', '$mdToast', 'dashboardService', 'Lightbox',
    function ($rootScope, $scope, $filter, $sce, $routeParams, createPageService, bookingService, $mdToast, dashboardService, Lightbox) {

//        $('[rel="lightbox"]').lightbox();

        $scope.bandUrl = $routeParams.band;
        $scope.band.gallery = [{url: 'images/avatar.jpg'}];
        $scope.request = {};
        $scope.ctrl = {};
        $scope.request.name = $rootScope.user.name;
        $scope.request.eventDate = null;

        $scope.trustSrc = function (src) {
            if (src) {
                var url = src.replace("watch?v=", "embed/");
                return $sce.trustAsResourceUrl(url);
            }
        };

        $scope.videoImg = function (src) {
            if (src) {
                var url = src.replace("www.youtube.com/watch?v=", "img.youtube.com/vi/");
                return $sce.trustAsResourceUrl(url.concat('/0.jpg'));
            }
        };

        $scope.events = [];

        $scope.getPage = function (band) {
            createPageService.getPage(band).then(
                    function (response) {
                        console.log(response.data)
                        $scope.band = response.data;
                        $(".video-playlist").css({'height': ($(".embed-responsive-item").height() + 'px')});
                        if ($scope.band.videos) {
                            $scope.mainVideo = $scope.band.videos[0].url;
                        }
                        $scope.starRatingReadOnly = parseInt($scope.band.rating);
                        $scope.myStyle = {'background-image': 'url(' + $scope.band.cover + ')'};
                        $scope.getEvents();
                    },
                    function (reason) {

                    });
        };


        $scope.eventTypes = [
            "home party",
            "product launch",
            "wedding",
            "birthday",
            "concert",
            "club opening",
            "other"
        ];

        $(window).load(function () {
            $('.myCarousel').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true
            });

        });
        $(window).resize(function () {
            $(".video-playlist").css({'height': ($(".embed-responsive-item").height() + 'px')});
        });


        $scope.openLightboxModal = function (index) {
            Lightbox.openModal($scope.band.gallery, index);
        };


        $('.carousel .item').each(function () {
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            if (next.next().length > 0) {
                next.next().children(':first-child').clone().appendTo($(this));
            } else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
        });

        $scope.startCalendar = function () {
            var mon = 'Mon';
            var tue = 'Tue';
            var wed = 'Wed';
            var thur = 'Thur';
            var fri = 'Fri';
            var sat = 'Sat';
            var sund = 'Sun';

            /**
             * Get current date
             */
            var d = new Date();
            var strDate = yearNumber + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var yearNumber = (new Date).getFullYear();
            /**
             * Get current month and set as '.current-month' in title
             */
            var monthNumber = d.getMonth() + 1;

            function GetMonthName(monthNumber) {
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return months[monthNumber - 1];
            }

            setMonth(monthNumber, mon, tue, wed, thur, fri, sat, sund);

            function setMonth(monthNumber, mon, tue, wed, thur, fri, sat, sund) {
                $('.month').text(GetMonthName(monthNumber) + ' ' + yearNumber);
                $('.month').attr('data-month', monthNumber);
                printDateNumber(monthNumber, mon, tue, wed, thur, fri, sat, sund);
            }

            $('.btn-next').on('click', function (e) {
                var monthNumber = $('.month').attr('data-month');
                if (monthNumber > 11) {
                    $('.month').attr('data-month', '0');
                    var monthNumber = $('.month').attr('data-month');
                    yearNumber = yearNumber + 1;
                    setMonth(parseInt(monthNumber) + 1, mon, tue, wed, thur, fri, sat, sund);
                } else {
                    setMonth(parseInt(monthNumber) + 1, mon, tue, wed, thur, fri, sat, sund);
                }
                ;
            });

            $('.btn-prev').on('click', function (e) {
                var monthNumber = $('.month').attr('data-month');
                if (monthNumber < 2) {
                    $('.month').attr('data-month', '13');
                    var monthNumber = $('.month').attr('data-month');
                    yearNumber = yearNumber - 1;
                    setMonth(parseInt(monthNumber) - 1, mon, tue, wed, thur, fri, sat, sund);
                } else {
                    setMonth(parseInt(monthNumber) - 1, mon, tue, wed, thur, fri, sat, sund);
                }
                ;
            });

            /**
             * Get all dates for current month
             */

            function printDateNumber(monthNumber, mon, tue, wed, thur, fri, sat, sund) {

                $($('tbody.event-calendar tr')).each(function (index) {
                    $(this).empty();
                });

                $($('thead.event-days tr')).each(function (index) {
                    $(this).empty();
                });

                function getDaysInMonth(month, year) {
                    // Since no month has fewer than 28 days
                    var date = new Date(year, month, 1);
                    var days = [];
                    while (date.getMonth() === month) {
                        days.push(new Date(date));
                        date.setDate(date.getDate() + 1);
                    }
                    return days;
                }

                var i = 0;

                setDaysInOrder(mon, tue, wed, thur, fri, sat, sund);

                function setDaysInOrder(mon, tue, wed, thur, fri, sat, sund) {
                    var monthDay = getDaysInMonth(monthNumber - 1, yearNumber)[0].toString().substring(0, 3);
                    if (monthDay === 'Mon') {
                        $('thead.event-days tr').append('<td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td>');
                    } else if (monthDay === 'Tue') {
                        $('thead.event-days tr').append('<td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td>');
                    } else if (monthDay === 'Wed') {
                        $('thead.event-days tr').append('<td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td>');
                    } else if (monthDay === 'Thu') {
                        $('thead.event-days tr').append('<td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td>');
                    } else if (monthDay === 'Fri') {
                        $('thead.event-days tr').append('<td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td>');
                    } else if (monthDay === 'Sat') {
                        $('thead.event-days tr').append('<td>' + sat + '</td><td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td>');
                    } else if (monthDay === 'Sun') {
                        $('thead.event-days tr').append('<td>' + sund + '</td><td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td>');
                    }
                }
                ;
                $(getDaysInMonth(monthNumber - 1, yearNumber)).each(function (index) {
                    var index = index + 1;
                    if (index < 8) {
                        $('tbody.event-calendar tr.1').append('<td ng-click="sss()" date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                    } else if (index < 15) {
                        $('tbody.event-calendar tr.2').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                    } else if (index < 22) {
                        $('tbody.event-calendar tr.3').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                    } else if (index < 29) {
                        $('tbody.event-calendar tr.4').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                    } else if (index < 32) {
                        $('tbody.event-calendar tr.5').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '</td>');
                    }
                    i++;
                });
                var date = new Date();
                var month = date.getMonth() + 1;
                var thisyear = new Date().getFullYear();
                setCurrentDay(month, thisyear);
                setEvent();
            }

            /**
             * Get current day and set as '.current-day'
             */
            function setCurrentDay(month, year) {
                var viewMonth = $('.month').attr('data-month');
                var eventYear = $('.event-days').attr('date-year');
                if (parseInt(year) === yearNumber) {
                    if (parseInt(month) === parseInt(viewMonth)) {
                        $('tbody.event-calendar td[date-day="' + d.getDate() + '"]').addClass('current-day');
                    }
                }
            }
            ;

            /**
             * Add class '.active' on calendar date
             */
            $('tbody td').on('click', function (e) {
                if ($(this).hasClass('event')) {
                    $('tbody.event-calendar td').removeClass('active');
                    $(this).addClass('active');
                } else {
                    $('tbody.event-calendar td').removeClass('active');
                }
                ;
            });

            /**
             * Add '.event' class to all days that has an event
             */
            function setEvent() {
                angular.forEach($scope.events, function (value) {
                    console.log(value)
                    var eventMonth = value['eventMonth'];
                    var eventDay = value['eventDay'];
                    var eventYear = value['eventYear'];
                    var eventClass = 'event';
                    if (parseInt(eventYear) === yearNumber) {
                        $('tbody.event-calendar tr td[date-month="' + eventMonth + '"][date-day="' + eventDay + '"]').addClass(eventClass);
                    }
                });
            }
            ;

            /**
             * Get current day on click in calendar
             * and find day-event to display
             */
            $('tbody.event-calendar').delegate('td', 'click', function (e) {
                $('tbody.event-calendar td').removeClass('selected-day');
                $(this).addClass('selected-day');
                $('#event-datepicker .md-datepicker-input').datepicker('setDate', '01/26/2014');
                $scope.request.eventDate = new Date();
                $scope.request.eventDate.setYear($(this).attr('date-year'));
                $scope.request.eventDate.setMonth($(this).attr('date-month'));
                $scope.request.eventDate.setDate($(this).attr('date-day'));
                $('#event-datepicker .md-datepicker-input').trigger("focus");
            });

            /**
             * Close day-event
             */
            $('.close').on('click', function (e) {
                $(this).parent().slideUp('fast');
            });

        };

//        $scope.location = {latitude: 12.8139068, longitude: 77.6516683};
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            });
        }

        $scope.parseContent = function (content) {
            return $sce.trustAsHtml(content);
        };

        $scope.active = true;

        $scope.starRatingReadOnly = 0;
        $scope.hoverRatingReadOnly = 0;
        $scope.starRating3 = 0;

        $scope.mouseHover3 = function (param) {
            $scope.hoverRatingReadOnly = param;
        };

        $scope.mouseLeave3 = function (param) {
            $scope.hoverRatingReadOnly = param + '*';
        };

        $scope.postComment = function () {
            $scope.comment.rating = $scope.starRating3;
            $scope.comment.userId = $rootScope.user.userId;
            $scope.comment.bandUrl = $scope.bandUrl;
            if ($scope.starRating3 > 0) {
                createPageService.postComment($scope.comment).then(
                        function (response) {
                            console.log(response);
                            $scope.comments.push({
                                id: $scope.comments.length,
                                author: {
                                    id: $rootScope.user.userId,
                                    name: $rootScope.user.name,
                                    email: $rootScope.user.email,
                                    image: $rootScope.user.image
                                },
                                content: $scope.comment.content,
                                date: response.data.date
                            });
                        },
                        function (reason) {

                        });
            }
        };

        $scope.getComments = function () {
            createPageService.getComments($scope.bandUrl).then(
                    function (response) {
                        console.log(response.data);
                        $scope.comments = response.data;
                    },
                    function (reason) {

                    });
        };


        $scope.sendRequest = function () {
            $scope.request.userId = $rootScope.user.userId;
            $scope.request.location = $scope.location;
            $scope.request.bandUrl = $scope.bandUrl;
            bookingService.sendRequest($scope.request).then(
                    function (response) {
                        $scope.showActionToast(response.data.message);
                    },
                    function (reason) {
                        $scope.showActionToast(reason.data.message);
                    });
        };

        $scope.showActionToast = function (content) {
            var toast = $mdToast.simple()
                    .textContent(content)
                    .action('OK')
                    .highlightAction(false);

            $mdToast.show(toast).then(function (response) {
                if (response === 'ok') {
                    //alert('You clicked \'OK\'.');
                }
            });
        };

        $scope.getEvents = function () {
            dashboardService.getAllEvents($scope.band.id).then(
                    function (response) {
                        if (response.data[0]!==null) {
                            angular.forEach(response.data, function (value, key) {
                                if (value.status === "1") {
                                    $scope.events[key] = {};
                                    $scope.events[key]['eventYear'] = $filter('date')(new Date(value['event_date']), 'yyyy');
                                    $scope.events[key]['eventMonth'] = $filter('date')(new Date(value['event_date']), 'M');
                                    $scope.events[key]['eventDay'] = $filter('date')(new Date(value['event_date']), 'd');
                                }
                            });
                        };
                        $scope.startCalendar();
                        console.log($scope.events)
                    },
                    function (reason) {

                    });
        };

        $scope.getPage($scope.bandUrl);
        $scope.getComments();

    }]);