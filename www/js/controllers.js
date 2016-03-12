angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

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
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })


    .controller('LoginCtrl', LoginCtrl)

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('CreditCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$window',
        function ($scope) {
            $scope.card = {
                id: "",
                number: "",
                expiry: "",
                cvv: ""
            };

            $scope.createCard = function () {
                var id = this.card.id;
                var number = this.card.number;
                var expiry = this.card.expiry;
                var cvv = this.card.cvv;

                var ref = new Firebase("https://realex.firebaseio.com");
                var cardRef = ref.child("cards");
                cardRef.push().set(
                    {
                        id: id,
                        number: number,
                        expiry: expiry,
                        cvv: cvv
                    }
                );
                $state.go('app.playlists');

            }
        }]);

function LoginCtrl(Auth, $state) {
    this.loginWithFacebook = function loginWithFacebook() {
        Auth.$authWithOAuthPopup('facebook')
            .then(function (authData) {
                console.log(authData);
                //console.log(authData.facebook.cachedUserProfile.first_name);
                //console.log(authData.facebook.cachedUserProfile.gender);
                //console.log(authData.facebook.cachedUserProfile.last_name);
                //console.log(authData.facebook.cachedUserProfile.id);
                //authData.facebook.profileImageURL;
                //name = object.getString("name");
                var ref = new Firebase("https://realex.firebaseio.com");
                var usersRef = ref.child("users");
                usersRef.push().set(
                    {
                        id: authData.facebook.profileImageURL,
                        first_name: authData.facebook.cachedUserProfile.first_name,
                        last_name: authData.facebook.cachedUserProfile.last_name
                    }
                );
                $state.go('app.playlists');
            });
    };
}
LoginCtrl.$inject = ['Auth', '$state'];