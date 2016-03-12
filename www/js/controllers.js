angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.factory('ExhibitFactory', function($http) {

  function get(cb, id) {

    var arr = [ // TODO Image, Amount Sold
      { id: 1, name: 'Shells on a Sea of Green', artist: 'Sam Smith', price: '120.45', imagePath: '/img/shells.jpeg', description: 'This seminal work by new artist Sam Smith defines a generation of excess and decadance by famous artists like Van Gogh and Salvador Dali. Inspired by his mother\'s hair loss at a young age.' },
      { id: 2, name: 'A plaintiff among stars', artist: 'Sam Smith', price: '865.95', imagePath: '/img/star.jpg' },
      { id: 3, name: 'Cat got your tongue', artist: 'Jessica Bean Heinz', price: '465.95', imagePath: '/img/cat.jpg' }
    ];

    if (id !== undefined) {
      var g = arr.filter(function(e) { return e.id == id });
      arr = g;
    }

    // TODO This would return a real API response of users. Would be async, so need to .then(cb)
    cb(arr);
  }

  return {
    get: get
  };

})

.controller('ExhibitListCtrl', function($scope, ExhibitFactory) {

  ExhibitFactory.get(function(response) {
    $scope.exhibits = response;
    // TODO Any UI parameters we need to add?
  });

  $scope.love = function(exhibit) {
    exhibit.love = !exhibit.love || true;
  }

})

.controller('ExhibitCtrl', function($scope, ExhibitFactory, $stateParams) {

  ExhibitFactory.get(function(response) {
    $scope.exhibit = response[0];
    // TODO Any UI parameters we need to add?
  }, $stateParams.exhibitId);
  console.log($scope.exhibit);
  // ExhibitFactory.get(id)
  // $scope.exhibit = ExhibitFactory
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
