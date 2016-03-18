"use strict";

MetronicApp.factory("UserService", [
    "$log", "Restangular", "LoginService", function ($log, restangular, loginService) {
        return {
            getCurrentUser: function () {
                var userCredentials = loginService.init();
                if (userCredentials != null) {
                    restangular.setDefaultHttpFields({
                        "authorization": "bearer " + userCredentials.token
                    });
                    return restangular.one("api/accounts/user/getcurrentuserdetails").get({}, { "authorization": "bearer " + userCredentials.token });
                }
                return null;
            },
            getUserDetails: function (username) {
                $log.log("User Details: " + username);
            }
        }
    }
]);