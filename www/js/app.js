// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngMaterial', 'starter.services', 'firebase', 'ngCordova'])
    .constant('FirebaseUrl', 'https://realex.firebaseio.com/')
    .service('rootRef', ['FirebaseUrl', Firebase])

    .run(function ($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading, $cordovaBeacon) {
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

            $rootScope.events = []

            $cordovaBeacon.isBluetoothEnabled().then(function(bool) {

                $rootScope.bluetooth = bool;

                $rootScope.region = $cordovaBeacon.createBeaconRegion('Pablo', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D')

                $cordovaBeacon.startRangingBeaconsInRegion($rootScope.region);

                    var obj = [
                        {maj: 1718, min: 64714, exhibit: 1 },
                        {maj: 14211, min: 42703, exhibit: 2 }
                    ];

                    $rootScope.stats = {
                        events: 0,
                        beaconEvents: 0,
                        validEvents: 0,
                        invalidEvents: 0,
                        counter: {
                            didRangeBeaconsInRegion: 0,

                        }
                    };


                $rootScope.$on('$cordovaBeacon:didRangeBeaconsInRegion', function(event, pluginResult) {
                    // $rootScope.events.push("We had an event!");
                    $rootScope.stats.events++;
                    $rootScope.stats.counter[pluginResult]++;

                    pluginResult.beacons.forEach(function(b) {
                        $rootScope.stats.beaconEvents++;
                        var valid = obj.filter(function(d) { 
                            console.log(JSON.stringify({dmaj: d.maj, dmin: d.min, emaj: b.major, emin: b.minor})); 
                            return d.maj == b.major && d.min == b.minor;
                        });
                        if (valid.length) {
                            $rootScope.stats.validEvents++;
                            console.log()
                            $rootScope.$broadcast('exhibitInRange', {beacon: b, exhibit: valid[0]});
                            $rootScope.events.push(b);
                        } else {
                            $rootScope.stats.invalidEvents++;
                        }
                    });

                    // $rootScope.events.push({event: event, pluginResult: pluginResult})
                })

            })

        });
    })

    .run(function($http, $cordovaPush, $rootScope) {

        $rootScope.$on('exhibitInRange', function(e, d) {
            console.log('We heard there was an interesting exhibit around! Exhibit ' + d.exhibit.exhibit);
        });

        // alert('Hello');


      var androidConfig = {
        "senderID": "Send a notif", // TODO This doesn't work....
      };

      document.addEventListener("deviceready", function(){
        $cordovaPush.register(androidConfig).then(function(result) {
          // Success
        }, function(err) {
          // Error
        })

        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
          switch(notification.event) {
            case 'registered':
              if (notification.regid.length > 0 ) {
                alert('registration ID = ' + notification.regid);
              }
              break;

            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
              break;

            case 'error':
              alert('GCM error = ' + notification.msg);
              break;

            default:
              alert('An unknown GCM event has occurred');
              break;
          }
        });


        // // WARNING: dangerous to unregister (results in loss of tokenID)
        // $cordovaPush.unregister(options).then(function(result) {
        //   // Success!
        // }, function(err) {
        //   // Error
        // })


      }, false);


    })

    .run(function($http, $cordovaBeacon, $rootScope) {

        $rootScope.bluetooth = false;
        // alert('The cake walked into a badger.');

        document.addEventListener("deviceready", function(){

            $rootScope.bluetooth = "Blah";

            // alert('The cake walked into a badger.');

            $cordovaBeacon.enableBluetooth().then(function(bool) {
                console.log(bool);

            });

            $cordovaBeacon.isBluetoothEnabled().then(function(bool) {

                $rootScope.bluetooth = "bool";
            })

        }, true);

    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', { url: '/app', abstract: true, templateUrl: 'templates/menu.html', controller: 'AppCtrl' })
            .state('app.login', { url: '/login', views: { 'menuContent': { templateUrl: 'templates/veriduLogin.html' } } })
            .state('app.realex', { url: '/realex', views: { 'menuContent': { templateUrl: 'templates/realex.html' } } })
            .state('app.search', { url: '/search', views: { 'menuContent': { templateUrl: 'templates/search.html' } } })
            // .state('app.browse', { url: '/browse', views: { 'menuContent': { templateUrl: 'templates/browse.html' } } })
            .state('app.playlists', {url: '/playlists',views: {'menuContent': {templateUrl: 'templates/playlists.html',controller: 'PlaylistsCtrl'}}})
            .state('app.fblogin', { url: '/fblogin', views: { 'menuContent': { templateUrl: 'templates/fblogin.html', controller: 'LoginCtrl as ctrl' } } })
            .state('app.creditcard', {          url: '/creditcard',         views: {       'menuContent': {      templateUrl: 'templates/creditcard.html',            controller: 'CreditCtrl'           }      }          })
            .state('app.single', { url: '/playlists/:playlistId', views: { 'menuContent': { templateUrl: 'templates/playlist.html', controller: 'PlaylistCtrl' } } })
            .state('app.exhibits', { url: '/exhibits', views: { menuContent: { templateUrl: 'templates/exhibits.html', controller: 'ExhibitListCtrl' } }})
            .state('app.exhibit', { url: '/exhibits/:exhibitId', views: { menuContent: {templateUrl: 'templates/exhibit.html', controller: 'ExhibitCtrl'}}})
            .state('app.about', { url: '/about', views: { menuContent: {templateUrl: 'templates/about.html', controller: 'AboutCtrl'}}})

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/exhibits');
    });
