<!DOCTYPE html>
<html ng-controller="bandPageController" ng-init="init()">
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/band-page.css">
    </head>
    <body>
        <div class="section" id="band-cover" style="background-image: url(images/concert.jpg)">
        <!--<div class="section" id="band-cover" ng-style="{{'background-image: url(localhost/licenta/'+band.cover+')'}}">-->
            <div class="band-social">
                <a href="facebook.com" class="band-social-icon">
                    <img src="images/facebook.png" alt="Facebook" />
                </a>
                <a href="twitter.com" class="band-social-icon">
                    <img src="images/twitter.png" alt="Twitter" />
                </a>
            </div>
            <div class="band-logo">
                <img src="images/logo-white.png" alt="band-name" />
            </div>
        </div>
        <div class="section" id="band-bio">
            <h2 class="section-title">Bio <?php echo 'test'; ?></h2>
            <span>
                {{band.bio}}
            </span>
        </div>
        <div class="section" id="band-gallery">
            <div class="carousel slide" id="myCarousel">
                <a ng-repeat="photo in band.gallery" ng-click="openLightboxModal($index)"><img ng-src={{photo.url}} class="img-thumbnail"></a>
            </div>
        </div>

        <div class="section" id='band-services'>
            <div class="col-md-4">
                <h2 class="section-title">Members</h2>
                <ul class=" clo-md-4 demo-list-item mdl-list">
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <i class="material-icons mdl-list__item-icon">person</i>
                            Bryan Cranston
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <i class="material-icons mdl-list__item-icon">person</i>
                            Aaron Paul
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <i class="material-icons mdl-list__item-icon">person</i>
                            Bob Odenkirk
                        </span>
                    </li>
                </ul>
            </div>
            <div class='col-md-4'>
                <h2 class="section-title">Tags</h2>
                <div>
                    <div class="md-chip" ng-repeat="tag in band.tags">{{tag.tag_title}}</div>
                </div>
            </div>
            <div class='col-md-4 price'>
                <h2 class="section-title">Starting Price</h2>
                <span>from <strong>{{band.price}}</strong><sub>$</sub></span>
            </div>
        </div>

        <div class="section" id="band-video-gallery">
            <div class="main-video col-md-9 col-xs-12 embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" ng-src="{{trustSrc(mainVideo)}}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="video-playlist col-md-3 col-xs-12">
                <div class="scrollbar">
                    <img ng-click="mainVideo = 'NFywVQzPMZ4'" src="http://img.youtube.com/vi/NFywVQzPMZ4/0.jpg" />
                    <img ng-click="mainVideo = 'qR871N8fN4I'" src="http://img.youtube.com/vi/qR871N8fN4I/0.jpg" />
                    <img ng-click="mainVideo = 'AnxxExemCJE'" src="http://img.youtube.com/vi/AnxxExemCJE/0.jpg" />
                    <img ng-click="mainVideo = 'AnxxExemCJE'" src="http://img.youtube.com/vi/AnxxExemCJE/0.jpg" />
                    <img ng-click="mainVideo = 'AnxxExemCJE'" src="http://img.youtube.com/vi/AnxxExemCJE/0.jpg" />
                </div>
            </div>
        </div>
        <div class="section" id="band-calendar">
            <div class="calendar col-md-6 col-xs-12">
                <header>
                    <h2 class="month"></h2>
                    <i class="btn-prev fa fa-angle-left"></i>
                    <i class="btn-next fa fa-angle-right"></i>
                </header>
                <table>
                    <thead class="event-days">
                        <tr></tr>
                    </thead>
                    <tbody class="event-calendar">
                        <tr class="1"></tr>
                        <tr class="2"></tr>
                        <tr class="3"></tr>
                        <tr class="4"></tr>
                        <tr class="5"></tr>
                    </tbody>
                </table>
            </div>
            <div class="book-now col-md-6 col-xs-12">
                <form id="book-form">
                    <md-input-container class="md-icon-float md-block">
                        <!-- Use floating label instead of placeholder -->
                        <label>Name</label>
                        <md-icon md-svg-src="images/face_black.svg" class="name"></md-icon>
                        <input ng-model="request.name" type="text">
                    </md-input-container>

                    <md-input-container md-no-float="" class="md-block">
                        <label>Phone number</label>
                        <md-icon md-svg-src="images/phone_black.svg"></md-icon>
                        <input ng-model="request.phone" type="text">
                    </md-input-container>

                    <md-input-container class="md-block">
                        <!-- Use floating placeholder instead of label -->
                        <md-icon md-svg-src="images/email_black.svg" class="email"></md-icon>
                        <input ng-model="request.email" type="email" placeholder="Email (required)" ng-required="true">
                    </md-input-container>

                    <md-datepicker class="col-md-6" id="event-datepicker" ng-model="request.eventDate" md-placeholder="Enter date">
                    </md-datepicker>

                    <md-input-container class="col-md-6 col-xs-12">
                        <label>Event Type</label>
                        <md-icon md-svg-src="images/tag_black.svg"></md-icon>
                        <md-select ng-model="request.eventType">
                            <md-option ng-repeat="eventType in eventTypes" value="{{eventType}}">
                                {{eventType}}
                            </md-option>
                        </md-select>
                    </md-input-container>
                    <md-input-container class="col-md-12 col-xs-12" id="book-map">
                        <label>Location</label>
                        <md-icon md-svg-src="images/location_on_black.svg"></md-icon>
                        <input id="location-picker-input" type="text" autocomplete="off"/>
                        <google-map-locator id="location-pick" class="google-map"
                                            location = "{{location}}"
                                            radius="10"
                                            on-location-initialize="onLocationInitialize(location)"
                                            on-location-change="onLocationChange(location)"
                                            on-map-loaded="onMapLoaded(map)">
                        </google-map-locator>
                    </md-input-container>
                    <a class="send-request" ng-click="sendRequest()">Send</a>
                </form>
            </div>
        </div>
        <div class="section" id='band-review'>
            <div class="total-review col-md-4 col-xs-12">
                <span>{{starRatingReadOnly}}/5</span>
                <div star-rating class="star-rating-total" read-only="true" rating="starRatingReadOnly" mouse-hover="mouseHoverReadOnly(param)" mouse-leave="mouseLeaveReadOnly(param)"></div>
            </div>
            <div class="col-md-8 col-xs-12">
                <div class="add-review">
                    <header ng-hide="active">
                        <h3 ng-class="{ author: isAuthor(comment.author.email) }">{{ user.name}}</h3>
                        <div class="feedback-rating">
                            <div star-rating rating="starRating3" click="click3(param)" mouse-hover="mouseHover3(param)" mouse-leave="mouseLeave3(param)"></div>
                        </div>
                        <md-input-container class="md-icon-float md-block">
                            <!-- Use floating label instead of placeholder -->
                            <label>Comment</label>
                            <md-icon md-svg-src="images/feedback_black.svg" class="comment"></md-icon>
                            <textarea ng-model="comment.content" md-maxlength="150" rows="5" md-select-on-focus=""></textarea>
                        </md-input-container>
                        <img class="user-review-image" ng-src="{{user.image?user.image:'images/avatar.jpg'}}"/>
                        <img class="post-review" ng-click="postComment()" src="images/send_black.svg" />
                    </header>
                </div>
                <div class="add-review-button" ng-click="active = !active" ng-class="{'expandcollapse-heading-collapsed': active, 'expandcollapse-heading-expanded': !active}">
                    <p>Add Review</p>
                    <i ng-if="active" class="material-icons">keyboard_arrow_down</i>
                    <i ng-if="!active" class="material-icons">close</i>
                </div>
            </div>
            <ul class="col-md-12">
                <li ng-repeat="comment in comments">
                    <header>
                        <h3 ng-class="{ author: isAuthor(comment.author.email) }">{{ comment.author.name}}</h3>
                        <!--                            <button ng-click="loveComment(comment.id)" ng-class="{ loved: comment.loved }" class="love">
                                                        <svg viewBox="0 0 100 100">
                                                        <use xlink:href="#icon_love"></use>
                                                        </svg>
                                                    </button>
                                                    <button ng-click="addReply(comment.author.name)" class="reply">
                                                        <svg viewBox="0 0 100 100">
                                                        <use xlink:href="#icon_reply"></use>
                                                        </svg>
                                                    </button>-->
                        <img class="user-review-image" ng-src="{{comment.author.image?comment.author.image:'images/avatar.jpg'}}"/>
                        <div class="star-rating">
                            <div star-rating read-only="true" rating="starRatingReadOnly" mouse-hover="mouseHoverReadOnly(param)" mouse-leave="mouseLeaveReadOnly(param)"></div>
                        </div>
                    </header>
                    <article ng-bind-html="parseContent(comment.comment)"></article>
                </li>
            </ul>

        </div>
    </body>
</html>
