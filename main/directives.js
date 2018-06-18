'use strict';

/* Directives */

var directives = angular.module('MyBandApp.directives', [])
        .directive('starRating', function () {
            return {
                scope: {
                    rating: '=',
                    maxRating: '@',
                    readOnly: '@',
                    click: "&",
                    mouseHover: "&",
                    mouseLeave: "&"
                },
                restrict: 'EA',
                template:
                        "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"images/star-empty-lg.png\" || \"images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
                compile: function (element, attrs) {
                    if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                        attrs.maxRating = '5';
                    }
                    ;
                },
                controller: function ($scope, $element, $attrs) {
                    $scope.maxRatings = [];

                    for (var i = 1; i <= $scope.maxRating; i++) {
                        $scope.maxRatings.push({});
                    }
                    ;

                    $scope._rating = $scope.rating;

                    $scope.isolatedClick = function (param) {
                        if ($scope.readOnly == 'true')
                            return;

                        $scope.rating = $scope._rating = param;
                        $scope.hoverValue = 0;
                        $scope.click({
                            param: param
                        });
                    };

                    $scope.isolatedMouseHover = function (param) {
                        if ($scope.readOnly == 'true')
                            return;

                        $scope._rating = 0;
                        $scope.hoverValue = param;
                        $scope.mouseHover({
                            param: param
                        });
                    };

                    $scope.isolatedMouseLeave = function (param) {
                        if ($scope.readOnly == 'true')
                            return;

                        $scope._rating = $scope.rating;
                        $scope.hoverValue = 0;
                        $scope.mouseLeave({
                            param: param
                        });
                    };
                }
            };
        })

        .directive("calendar", function () {
            return {
                restrict: "E",
                templateUrl: "app/dashboardCalendar/calendarTemplate.html",
                scope: {
                    selected: "="
                },
                link: function (scope) {
                    scope.selected = _removeTime(scope.selected || moment());
                    scope.month = scope.selected.clone();

                    var start = scope.selected.clone();
                    start.date(1);
                    _removeTime(start.day(0));

                    _buildMonth(scope, start, scope.month);

                    scope.select = function (day) {
                        scope.selected = day.date;
                    };

                    scope.next = function () {
                        var next = scope.month.clone();
                        _removeTime(next.month(next.month() + 1).date(1));
                        scope.month.month(scope.month.month() + 1);
                        _buildMonth(scope, next, scope.month);
                    };

                    scope.previous = function () {
                        var previous = scope.month.clone();
                        _removeTime(previous.month(previous.month() - 1).date(1));
                        scope.month.month(scope.month.month() - 1);
                        _buildMonth(scope, previous, scope.month);
                    };
                }
            };

            function _removeTime(date) {
                return date.day(0).hour(0).minute(0).second(0).millisecond(0);
            }

            function _buildMonth(scope, start, month) {
                scope.weeks = [];
                var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
                while (!done) {
                    scope.weeks.push({days: _buildWeek(date.clone(), month)});
                    date.add(1, "w");
                    done = count++ > 2 && monthIndex !== date.month();
                    monthIndex = date.month();
                }
                console.log(scope.weeks);
            }

            function _buildWeek(date, month) {
                var days = [];
                for (var i = 0; i < 7; i++) {
                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isToday: date.isSame(new Date(), "day"),
                        date: date
                    });
                    date = date.clone();
                    date.add(1, "d");
                }
                return days;
            }
        })

        .directive("googleMapLocator", function ($window) {
            return {
                restrict: "E",
                replace: true,
                template: "<div data-tap-disabled='true'></div>",
                scope: {
                    location: "@",
                    radius: "@",
                    options: "@",
                    onLocationInitialize: "&",
                    onLocationChange: "&",
                    onMapLoaded: "&"
                },
                link: function (scope, element, attrs) {
                    var callbackName = 'InitMapCb';
                    // callback when google maps is loaded
                    $window[callbackName] = function () {
                        initPicker();
                    };

                    if (!$window.google || !$window.google.maps) {
                        loadGMaps();
                    } else {
                        initPicker();
                    }

                    function loadGMaps() {
                        var script = $window.document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&callback=InitMapCb';
                        $window.document.body.appendChild(script);
                    }

                    function onChanged(location) {
                        scope.onLocationChange({
                            location: location
                        });
                    }

                    function onInitialized(location) {
                        scope.onLocationInitialize({
                            location: location
                        });
                    }

                    function onMapLoaded(map) {
                        scope.onMapLoaded({
                            map: map
                        });
                    }

                    function initPicker() {
                        if (!scope.location) {
                            initPicker
                            getLocation();
                        } else {
                            scope.location = JSON.parse(scope.location);
                            initLocationPicker();
                        }
                    }

                    function getLocation() {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(showPosition);
                        } else {
                            console.log("====Geolocation is not supported by this browser====");
                            // TODO: find a way to get lat, long of the user
                            showPosition({
                                coords: {
                                    latitude: 12.8139068,
                                    longitude: 77.65166829999998
                                }
                            });
                        }
                    }

                    function showPosition(position) {
                        scope.location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        initLocationPicker();
                    }

                    function initLocationPicker() {
                        if (!scope.options) {
                            scope.options = {
                                autocomplete: true,
                                inputName: false
                            };
                        } else {
                            scope.options = JSON.parse(scope.options);
                        }

                        $(element).locationpicker({
                            location: scope.location,
                            radius: scope.radius,
                            onchanged: function (currentLocation, radius, isMarkerDropped) {
                                var location = $(this).locationpicker('map').location;
                                onChanged(location);
                            },
                            inputBinding: {
                                locationNameInput: $(scope.options['inputName'])
                            },
                            enableAutocomplete: scope.options['autocomplete'],
                            oninitialized: function (component) {
                                var location = $(component).locationpicker('map').location;
                                onInitialized(location);
                                var mapContext = $(element).locationpicker('map');
                                onMapLoaded(mapContext.map);
                            }
                        });
                    }

                }
            };
        })
        .directive('fileDropzone', function () {
            return {
                restrict: "A",
                scope: {
                    file: '=',
                    fileName: '='
                },
                link: function (scope, elem) {
                    elem.bind('dragover', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });
                    elem.bind('dragenter', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        scope.$apply(function () {
                            scope.divClass = 'on-drag-enter';
                        });
                    });
                    elem.bind('dragleave', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        scope.$apply(function () {
                            scope.divClass = '';
                        });
                    });
                    elem.bind('drop', function (evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        var files = evt.dataTransfer.files;
                        for (var i = 0, f; f = files[i]; i++) {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(f);

                            reader.onload = (function (theFile) {
                                return function (e) {
                                    var newFile = {name: theFile.name,
                                        type: theFile.type,
                                        size: theFile.size,
                                        lastModifiedDate: theFile.lastModifiedDate
                                    };
                                };
                            })(f);
                            scope.$apply(scope.file = f);
                            scope.fileName = f.name;
                            return false;
                        }
                    });
                }
            };
        })
        .directive("fileread", ['$parse', function ($parse) {
                return {
                    restric: 'A',
                    link: function (scope, element, attributes) {
                        var model = $parse(attributes.fileread);
                        var modelSetter = model.assign;
                        element.bind("change", function () {
                            scope.$apply(function () {
                                modelSetter(scope, element[0].files[0]);
                            })
                        });
                    }
                }
            }])
.directive('chart', function () {
    return {
        restrict:'E',
        template:'<div></div>',
        transclude:true,
        replace:true,
        scope: '=',
        link:function (scope, element, attrs) {
            var opt = {
                chart:{
                    renderTo:element[0],
                    type:'line',
                    marginRight:130,
                    marginBottom:40
                },
                title:{
                    text:attrs.title,
                    x:-20 //center
                },
                subtitle:{
                    text:attrs.subtitle,
                    x:-20
                },
                xAxis:{
                    //categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    tickInterval:1,
                    title:{
                        text:attrs.xname
                    }
                },
                plotOptions:{
                    lineWidth:0.5
                },
                yAxis:{
                    title:{
                        text:attrs.yname
                    },
                    tickInterval:(attrs.yinterval)?new Number(attrs.yinterval):null,
                    max:attrs.ymax,
                    min: attrs.ymin
//                    ,
//                    plotLines:[
//                        {
//                            value:0,
//                            width:1,
//                            color:'#808080'
//                        }
//                    ]
                },
                tooltip:{
                    formatter:scope[attrs.formatter]||function () {
                        return '<b>' + this.y + '</b>'
                    }
                },
                legend:{
                    layout:'vertical',
                    align:'right',
                    verticalAlign:'top',
                    x:-10,
                    y:100,
                    borderWidth:0
                },
                series:[
                    {
                        name:'Tokyo',
                        data:[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }
                ]
            }


            //Update when charts data changes
            scope.$watch(function (scope) {
                return JSON.stringify({
                    xAxis:{
                        categories:scope[attrs.xdata]
                        },
                    series:scope[attrs.ydata]
                });
            }, function (news) {
                news = JSON.parse(news)
                if (!news.series)return;
                angular.extend(opt,news)
                



                var chart = new Highcharts.Chart(opt);
            });
        }
    }

})
        ;