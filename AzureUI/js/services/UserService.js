"use strict";

MetronicApp.factory("UserService", ["$log", "Restangular", "LoginService", function ($log, Restangular, loginService) {
        var userCredentials = loginService.init();

        return {
            getCurrentUser: function () {
                //$log.debug("User credentials", userCredentials);
                if (userCredentials != null && userCredentials.token != null) {
                    return Restangular.one("api/accounts/user/getcurrentuserdetails").get({}, { "authorization": "bearer " + userCredentials.token });
                }
            },
            getUserById: function(userId) {
                if (userCredentials != null && userCredentials.token != null) {
                    return Restangular.one("api/accounts/user/", userId).get({}, { "authorization": "bearer " + userCredentials.token });
                }
            },
            getAllUsers: function () {
                //$log.debug("User credentials", userCredentials);
                if (userCredentials != null && userCredentials.token != null) {
                    return Restangular.all("api/accounts/users").getList({}, { "authorization": "bearer " + userCredentials.token });
                }
            }
        }
    }
]);