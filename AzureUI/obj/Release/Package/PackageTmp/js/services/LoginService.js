"use strict";

MetronicApp.factory("LoginService", ["$log", "$window", "Restangular", function ($log, $window, Restangular) {
    //
    return {
        loginUser: function(username, password) {
            var loginPostData = "username=" + username + "&password=" + password + "&grant_type=password";
            return Restangular.service("oauth/token").post(loginPostData);
        },
        init: function () {
            console.log("Calling Login service API");
            if ($window.sessionStorage["user"]) {
                return JSON.parse($window.sessionStorage["user"]);
            } else {
                if ($window.localStorage["user"]) {
                    return JSON.parse($window.localStorage["user"]);
                } else {
                    return null;
                }
                
            }
        }
    };
}]);