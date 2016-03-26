"use strict";

MetronicApp.controller("UserDetailsController", ["$log", "$stateParams", "$state", "$window", "UserService", "LoginService", "RoleService", userDetailsController]);

function userDetailsController($log, $stateParams, $state, $window, userService, loginService, roleService) {
    $log.debug("Inside User Details controller", $stateParams.userId);

    var userDetailVM = this;

    //check if valid user session//
    userDetailVM.isLoggedIn = loginService.init();
    userDetailVM.userDetails = JSON.parse($window.sessionStorage["userDetails"]);
    $log.debug("UsersController: UserDetails: ", userDetailVM.userDetails);
    if (userDetailVM.isLoggedIn == null || userDetailVM.userDetails.roles.indexOf("Admin") <= -1) {
        $state.go("welcome");
    }
    userDetailVM.selectedUser = {};
    userDetailVM.AvailableRoles = [
        //{ id: "6f985ebe-6822-4221-8ba7-f404634700ee", name: "Admin" },
        //{ id: "e5c2c2b5-6cec-4181-aaea-f387df9bcc2d", name: "HOD" },
        //{ id: "1a33b967-03b9-4203-a649-b871818e9671", name: "Instructor" },
        //{ id: "969d2590-bba7-4a08-b5d6-818e0f01abe9", name: "Student" }
    ];
    userDetailVM.joinDate = "";
    userDetailVM.assignedRole = "6f985ebe-6822-4221-8ba7-f404634700ee";

    //get user details from user service//
    var userDetailsPromise = userService.getUserById($stateParams.userId);
    if (userDetailsPromise != null) {
        userDetailsPromise.then(function (data) {
            $log.debug("Getting User Data", data);
            userDetailVM.selectedUser = data;
            $log.debug("Parsing Joining Date", Date.parse(data.joinDate));
            userDetailVM.joinDate = Date.parse(data.joinDate);
            if (data.roles.length > 0) {
                getAllAvailableRoles(data.roles[0]);
                //userDetailVM.assignedRole = "6f985ebe-6822-4221-8ba7-f404634700ee";
            }
            
        }, function (err) {
            $log.error("Error while calling user details service", err);
        });
    }

    function getAllAvailableRoles(currentRole) {
        roleService.getAllRoles().then(function(allRoles) {
            userDetailVM.AvailableRoles = allRoles;
            for (var i = 0; i < allRoles.length; i++) {
                if (allRoles[i].name === currentRole) {
                    userDetailVM.assignedRole = allRoles[i].id;
                }
            }
        }, function(err) {
            $log.error("Error in retrieving all roles", err);
        });
    }
}