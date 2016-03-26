"use strict";

MetronicApp.factory("RoleService", [
    "$log", "$window", "LoginService", "Restangular", function ($log, $window, loginService, Restangular) {
        var userCredentials = loginService.init();

        return {
            getAllRoles: function() {
                if (userCredentials != null && userCredentials.token != null) {
                    return Restangular.all("api/roles").getList({}, { "authorization": "bearer " + userCredentials.token });
                }
            }
        }
    }
]);