"use strict";

MetronicApp.controller("LoginController", [
    "$log", "$window", "$modalInstance", "$state", "LoginService", function ($log, $window, $modalInstance, $state, loginService) {
        var login = this;

        login.date = new Date();
        login.username = "";
        login.password = "";
        login.rememberSession = false;

        //$log.log("Inside login controller");

        login.doLogin = function () {
            loginService.loginUser(login.username, login.password).then(function (data) {
                $log.log("Data returned", data);

                var userData = {
                    "token": data.access_token,
                    //"expiry": login.date.setSeconds(data.expires_in),
                    "expiry": login.date.setSeconds(login.date.getSeconds() + data.expires_in),
                    "username": login.username
                };

                if (login.rememberSession === true) {
                    $window.localStorage["user"] = JSON.stringify(userData);
                } else {
                    $window.sessionStorage["user"] = JSON.stringify(userData);
                }

                $modalInstance.close();
                //$window.location.reload();
                //$state.reload();
                //$state.go("users");

            }, function (err) {
                $log.error("Error occurred, while logging in user", err);
                if (err.status) {
                    alert("Failed to login. Please check your username and/or password.");
                } else {
                    alert("Failed to login. Please try again later.");
                }
            });
            
        };
    }
]);