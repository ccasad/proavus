(function() {
  'use strict';

  angular
    .module('ccFamTree')
    .controller('CcStatusCtrl', CcStatusCtrl);

  CcStatusCtrl.$inject = ['ccPersonFcty', 'ccFamilyFcty'];

  /* @ngInject */
  function CcStatusCtrl(ccPersonFcty, ccFamilyFcty) {
    /*jshint validthis: true */
    var vm = this;

    activate();

    function activate() {
      ccPersonFcty.query().$promise.then(function(data) {
        var persons = data;
      });
      ccFamilyFcty.query().$promise.then(function(data) {
        vm.families = data;
      });
    }
  }
})();