services.factory('userService', [function() {
        var userInformations = {
            isLogged: false,
            userIdCookie: 'userId',
            usernameCookie: 'username',
            userTypeCookie: 'userType'
        };



        userInformations.saveCredentials = function(data) {
            userInformations.token = data.access_token;
            userInformations.isLogged = true;

            if (navigator.cookieEnabled)
            {
                userInformations.setCookie('token', data.access_token, 1);
            }
            else
            {
                localStorage.setItem('token', data.access_token);
            }

        };

        userInformations.setCookie = function(cname, cvalue, exdays) {
            var expires;
            if (exdays >= 0){
                //go on    
            } else {
                //set default day
                exdays = 5;
            }

            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = "expires=" + d.toUTCString();

            document.cookie = cname + "=" + cvalue + "; " + expires + ";";
        };


        userInformations.getCookie = function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1);
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }

            return "";
        }

        userInformations.removeCookie = function(cname) {
            // Delete a cookie by setting the date of expiry to yesterday
            var date = new Date();
            date.setDate(date.getDate() - 1);
            document.cookie = escape(cname) + '=;expires=' + date;
        }

        userInformations.saveUserId = function() {
            console.log(userInformations.userId)
            userInformations.setCookie(userInformations.userIdCookie, userInformations.userId);
        }

        userInformations.getUserId = function() {
            return userInformations.getCookie(userInformations.userIdCookie);
        }
        
        userInformations.saveUsername = function() {
            console.log(userInformations.username)
            userInformations.setCookie(userInformations.usernameCookie, userInformations.username);
        }

        userInformations.getUsername = function() {
            return userInformations.getCookie(userInformations.usernameCookie);
        }

        userInformations.saveUserType = function() {
            console.log(userInformations.userType)
            userInformations.setCookie(userInformations.userTypeCookie, userInformations.userType);
        }

        userInformations.getUserType = function() {
            return userInformations.getCookie(userInformations.userTypeCookie);
        }
        
        return userInformations;
    }]);