(function() {
  'use strict';

  angular
    .module('ccFamTree')
    .factory('ccAuthFcty', ccAuthFcty);

	ccAuthFcty.$inject = ['ccPersonFcty'];

  /* @ngInject */
  function ccAuthFcty(ccPersonFcty) {

  	var user;
    var userLoggedIn = false;

    // public methods
    var factory = {
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser
    };

    return factory;

    // private methods
    function login() {
      ccPersonFcty.resource().get({ id: '54de04a356f8ee5978a0792b' }).$promise.then(function(data) {
        user = data;
        userLoggedIn = true;
      });
    }

    function logout() {
      user = null
      userLoggedIn = false;
    }

    function isLoggedIn() {
      return userLoggedIn;
    }

    function currentUser() {
      return user;
    }
  }
})();

/*
app.factory( 'AuthService', function() {
  var currentUser;

  return {
    login: function() { ... },
    logout: function() { ... },
    isLoggedIn: function() { ... },
    currentUser: function() { return currentUser; }
    ...
  };
});

app.controller( 'MainCtrl', function( $scope, AuthService ) {
  $scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
    $scope.isLoggedIn = isLoggedIn;
    $scope.currentUser = AuthService.currentUser();
  });
});
*/
