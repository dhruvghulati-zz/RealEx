/**
 * Created by dhruv on 11/03/2016.
 */
angular.module('starter.services', [])

    .factory('Auth', Auth);

function Auth(rootRef, $firebaseAuth) {
    return $firebaseAuth(rootRef);
}
Auth.$inject = ['rootRef', '$firebaseAuth'];

