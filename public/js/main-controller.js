/**
 * Created by mostekcm on 03/12/15.
 */
angular.module( 'auth0UserExport.main', [
        'auth0'
    ])
    .controller( 'MainCtrl', function MainController( $scope, auth, $http, $location, store ) {

        $scope.auth = auth;

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path('/login');
        }
    });
