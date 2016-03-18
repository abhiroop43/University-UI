/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "restangular"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);


//MetronicApp.config(['$controllerProvider', function($controllerProvider) {
//  // this option might be handy for migrating old apps, but please don't use it
//  // in new ones!
//  $controllerProvider.allowGlobals();
//}]);


/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout3',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header

        //code for login modal popup//
        $scope.open = function (size) {
            var modalInstance = $modal.open(
            {
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                size: size
                //resolve:
                //{
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });
            modalInstance.result.then(function () {
                $log.info('Inside modal promise');
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //end code for login modal popup//
    });
}]);

///* Setup Layout Part - Sidebar */
//MetronicApp.controller('SidebarController', ['$scope', function($scope) {
//    $scope.$on('$includeContentLoaded', function() {
//        Layout.initSidebar(); // init sidebar
//    });
//}]);

///* Setup Layout Part - Quick Sidebar */
//MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
//    $scope.$on('$includeContentLoaded', function() {
//       setTimeout(function(){
//            QuickSidebar.init(); // init quick sidebar        
//        }, 2000)
//    });
//}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);

///* Setup Layout Part - Theme Panel */
//MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
//    $scope.$on('$includeContentLoaded', function() {
//        Demo.init(); // init theme panel
//    });
//}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.date = new Date();
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('welcome', {
            url: '/',
            templateUrl: 'views/welcome.html',
            data: { pageTitle: 'New Request', pageSubTitle: 'Create a new request' },
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        });


}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);