(function() {
  'use strict';

  angular
    .module('ccProavus')
    .controller('CcMemberCtrl', CcMemberCtrl);

  CcMemberCtrl.$inject = ['$state', 'ccAuthFcty', 'ccPersonFcty'];

  /* @ngInject */
  function CcMemberCtrl($state, ccAuthFcty, ccPersonFcty) {
    /*jshint validthis: true */
    var vm = this;

    activate();

    function activate() {

    }
  }
})();