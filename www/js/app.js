// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngMaterial', 'starter.services', 'firebase'])
    .constant('FirebaseUrl', 'https://realex.firebaseio.com/')
    .service('rootRef', ['FirebaseUrl', Firebase])

    .run(function ($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/veriduLogin.html'
                    }
                }
            })

            .state('app.realex', {
                url: '/realex',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/realex.html'
                    }
                }
            })

            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl as profileCtrl'
                    }
                },
                resolve: {
                    auth: function($state, Users, Auth){
                        return Auth.$requireAuth().catch(function(){
                            $state.go('home');
                        });
                    },
                    profile: function(Users, Auth){
                        return Auth.$requireAuth().then(function(auth){
                            return Users.getProfile(auth.uid).$loaded();
                        });
                    }
                }
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })
            // .state('app.browse', { url: '/browse', views: { 'menuContent': { templateUrl: 'templates/browse.html' } } })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.fblogin', {
                url: '/fblogin',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/fblogin.html',
                        controller: 'LoginCtrl as ctrl'
                    }
                }
            })

            .state('app.creditcard', {
                url: '/creditcard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/creditcard.html',
                        controller: 'CreditCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.exhibits', { url: '/exhibits', views: { menuContent: { templateUrl: 'templates/exhibits.html', controller: 'ExhibitListCtrl' } }})
            .state('app.exhibit', { url: '/exhibits/:exhibitId', views: { menuContent: {templateUrl: 'templates/exhibit.html', controller: 'ExhibitCtrl'}}})
            .state('app.about', { url: '/about', views: { menuContent: {templateUrl: 'templates/about.html', controller: 'AboutCtrl'}}})

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/exhibits');
    });
