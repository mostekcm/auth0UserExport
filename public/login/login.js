angular.module( 'auth0UserExport.login', [
  'auth0'
])
.controller( 'LoginCtrl', function LoginController( $scope, auth, $location, store ) {

  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $location.path("/");
    }, function(error) {
      alert(error.toString());
      console.log("There was an error logging in", error);
    });
  }

});
