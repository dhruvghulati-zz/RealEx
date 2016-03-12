/**
 * Created by dhruv on 11/03/2016.
 */
angular.module('starter.services', [])

    .factory('Auth', Auth)

    .factory('Users', function ($firebaseArray, $firebaseObject, FirebaseUrl) {

        var FirebaseUrl = "https://realex.firebaseio.com";
        var usersRef = new Firebase(FirebaseUrl+'users');
        var users = $firebaseArray(usersRef);

        var Users = {
            getProfile: function(uid){
                return $firebaseObject(usersRef.child(uid));
            },
            getDisplayName: function(uid){
                return users.$getRecord(uid).displayName;
            },
            all: users
        };

        return Users;
    });

function Auth(rootRef, $firebaseAuth) {
    return $firebaseAuth(rootRef);
}
Auth.$inject = ['rootRef', '$firebaseAuth'];

