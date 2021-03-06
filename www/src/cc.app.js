(function() {
  'use strict';

  angular
    .module('ccProavus', ['ionic', 'ngResource', 'ngMessages', 'ngLodash'])
    .run(runBlock);

  runBlock.$inject = ['$rootScope', '$ionicPlatform'];

  function runBlock($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

  }

})();

