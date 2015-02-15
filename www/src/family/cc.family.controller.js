(function() {
  'use strict';

  angular
    .module('ccFamTree')
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
    vm.familyNewMember = {};
    vm.addNewFamilyMembersHeader = 'Add New Family Members';

    // public methods
    vm.promptUser = promptUser;
    vm.addFamily = addFamily;

    // initial call
    activate();

    // private methods
    function activate() {

      // force a fake login so we have a user
      ccAuthFcty.login();

      // user wants to get a specific family
      if ($state.params.familyId) {
        
        ccFamilyFcty.resource().get({ id: $state.params.familyId }).$promise.then(function(data) {
          vm.family = data;
          updateTitleAndHeader();

          // need to get all family members for selected family
          //families: ObjectId("54de04a156f8ee5978a0792a") }
          ccPersonFcty.resource().query({ families: $state.params.familyId }).$promise.then(function(data) {
            vm.family.members = data;
          });
          
        });
      }

      // get all the user's families
      ccFamilyFcty.resource().query().$promise.then(function(data) {
        vm.families = data;
      });
    }

    function promptUser() {
      if (!vm.family) {
        promptNewFamily();
      } else {
        promptNewFamilyMember();
      }
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

    function promptNewFamilyMember() {

      vm.loggedInUser = ccAuthFcty.currentUser();

      $scope.familyMemberPopup = {
        error: false,
        relationText: 'Relation to '+vm.loggedInUser.name_first
      };

      $ionicPopup.show({
          templateUrl: 'src/family/xp.family-member-popup.view.html',
          title: 'Add New Family Member',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            { text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.familyMemberPopup.name_first || !$scope.familyMemberPopup.name_last || !$scope.familyMemberPopup.relation) {
                  //don't allow the user to close unless enter first and last name
                  e.preventDefault();
                  $scope.familyMemberPopup.error = true;
                } else {
                  return $scope.familyMemberPopup;
                }
              }
            }
          ]
        })
        .then(function(result) {
          if (result) {
            console.log('The family member is', result);

            vm.familyNewMember = {
              families: [vm.family._id],
              name_first: lodash.capitalize(result.name_first.toLowerCase()),
              name_last: lodash.capitalize(result.name_last.toLowerCase()),
              relation: result.relation,
            };

            addFamilyMember();
          }
        });

    }

    function addFamily() {

      if (vm.familyNewName) {
        var familyName = lodash.capitalize(vm.familyNewName.toLowerCase());
        ccFamilyFcty.resource().save({ name:familyName }).$promise.then(function(data) {
          if (data && data._id) {
            vm.family = data;
            updateTitleAndHeader();
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

    function addFamilyMember() {

      if (vm.familyNewMember) {
        // need to determine which relation and then add the appropriate
        // data that matches the person model for the new member being create
        vm.familyNewMember = ccPersonFcty.setRelationOfRelativeToMember(vm.familyNewMember, vm.loggedInUser, vm.familyNewMember.relation, true);
        
        ccPersonFcty.resource().save(vm.familyNewMember).$promise.then(function(data) {
          if (data && data._id) {
            vm.familyNewMember = data;
            vm.family.members.push(data);
            
            // add alert saying it saved
            console.log('The relative was added successfully', data);

            // update the user to add the member as the correct relation
            vm.loggedInUser = ccPersonFcty.setRelationOfMemberToRelative(vm.loggedInUser, vm.familyNewMember, vm.familyNewMember.relation);

            ccPersonFcty.resource().update({ id:vm.loggedInUser._id }, vm.loggedInUser).$promise.then(function(data) {
              if (data && data._id) {
                vm.loggedInUser = data;
                // add alert saying it saved
                console.log('The family member relative was updated successfully', data);
              } else {
                // add alert saying it failed
                console.log('Unable to update the family member relative', data);
              }
            });

          } else {
            // add alert saying it failed
            console.log('Unable to save the relative', data);
          }
        });
      }

      return;
    }

    function updateTitleAndHeader() {
      vm.title = vm.family.name+' Family';
      vm.addNewFamilyMembersHeader = 'Add New Member to '+vm.title;
    }
  }
})();