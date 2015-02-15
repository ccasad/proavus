(function() {
  'use strict';

  angular
    .module('ccProavus')
    .controller('CcMemberCtrl', CcMemberCtrl);

  CcMemberCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'lodash', 'ccAuthFcty', 'ccFamilyFcty', 'ccPersonFcty'];

  /* @ngInject */
  function CcMemberCtrl() {
    /*jshint validthis: true */
    var vm = this;

    activate();

    function activate() {

    }
  }
})();