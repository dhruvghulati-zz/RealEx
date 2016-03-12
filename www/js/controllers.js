angular.module('starter.controllers', ['firebase','starter.services'])

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

    .controller('ProfileCtrl', function($state, md5, auth, profile){
        var profileCtrl = this;
        profileCtrl.profile = profile;
        profileCtrl.updateProfile = function(){
            profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
            profileCtrl.profile.$save();
        };
    })

    .controller('LoginCtrl', LoginCtrl,function(){
        $scope.token = token;
        localStorage.setItem("token", $scope.token);
        $scope.token = localStorage.getItem("token");
        if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
            //go ahead and authenticate them without getting a new token.}
        }
        localStorage.setItem("token", "");
    })

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
            $scope.createCard = function () {
                var id = this.card.id;
                var number = this.card.number;
                var expiry = this.card.expiry;
                var cvv = this.card.cvv;

                var ref = new Firebase("https://realex.firebaseio.com");
                var cardRef = ref.child("users");
                cardRef.push(
                    {
                        number: number,
                        expiry: expiry,
                        cvv: cvv
                    }
                );
                $state.go('app.creditcard');
            }
        ]);

function LoginCtrl(Auth, $state) {
    this.loginWithFacebook = function loginWithFacebook() {
        Auth.$authWithOAuthPopup('facebook')
            .then(function (authData) {
                console.log(authData);
                var ref = new Firebase("https://realex.firebaseio.com");
                var usersRef = ref.child("users");
                //console.log(usersRef.key());
                usersRef.key().set(authData.facebook.id);
                console.log(usersRef.key());
                usersRef.push([
                    {
                        image: authData.facebook.profileImageURL,
                        first_name: authData.facebook.cachedUserProfile.first_name,
                        last_name: authData.facebook.cachedUserProfile.last_name
                    }
                ]);

                $state.go('app.creditcard');
            });
    };
}
LoginCtrl.$inject = ['Auth', '$state'];