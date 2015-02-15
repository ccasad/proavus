(function() {
  'use strict';

  angular
    .module('ccProavus')
    .controller('CcFamilyCtrl', CcFamilyCtrl);

  CcFamilyCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'lodash', 'ccAuthFcty', 'ccFamilyFcty', 'ccPersonFcty'];

  /* @ngInject */
  function CcFamilyCtrl($scope, $state, $ionicPopup, lodash, ccAuthFcty, ccFamilyFcty, ccPersonFcty) {
    /*jshint validthis: true */
    var vm = this;

    // properties
    vm.loggedInUser;
    vm.title = 'Family';
    vm.families = false;
    vm.family = false;
    vm.familyNewName = '';

    // public methods
    vm.promptNewFamily = promptNewFamily;

    // initial call
    activate();

    // private methods
    function activate() {

      // force a fake login so we have a user
      ccAuthFcty.login();

      // get all the user's families
      ccFamilyFcty.resource().query().$promise.then(function(data) {
        vm.families = data;
      });
    }

    function promptNewFamily() {
      $ionicPopup.prompt({
        title: 'Add New Family',
        inputType: 'text',
        inputPlaceholder: 'Family name'
      }).then(function(result) {
        console.log('The family name is', result);
        vm.familyNewName = result;
        addFamily();
      });      
    }

    function addFamily() {

      if (vm.familyNewName) {
        var familyName = lodash.capitalize(vm.familyNewName.toLowerCase());
        ccFamilyFcty.resource().save({ name:familyName }).$promise.then(function(data) {
          if (data && data._id) {
            vm.family = data;
            vm.title = vm.family.name+' Family';
            // add alert saying it saved
            console.log('The family was added successfully', data);
          } else {
            // add alert saying it failed
            console.log('Unable to save the new family', data);
          }
        });
      }

      return;
    }

  }
})();