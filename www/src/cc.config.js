(function() {
  'use strict';

  angular
    .module('ccProavus')
    .config(configuration);

  configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configuration($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'src/layout/cc.tabs.view.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.status', {
        url: '/status',
        views: {
          'tab-status': {
            templateUrl: 'src/status/cc.status.view.html',
            controller: 'CcStatusCtrl as vm'
          }
        }
      })

      .state('tab.search', {
        url: '/search',
        views: {
          'tab-search': {
            templateUrl: 'src/search/cc.search.view.html',
            controller: 'CcSearchCtrl as vm'
          }
        }
      })

      .state('tab.family', {
        url: '/family',
        views: {
          'tab-family': {
            templateUrl: 'src/family/cc.family.view.html',
            controller: 'CcFamilyCtrl as vm'
          }
        }
      })
      .state('tab.family.detail', {
        url: '/:familyId',
        views: {
          'tab-family-detail': {
            templateUrl: 'src/family/cc.family-detail.view.html',
            controller: 'CcFamilyDetailCtrl as vm'
          }
        }
      })

      .state('tab.member', {
        url: '/member/:memberId',
        views: {
          'tab-member': {
            templateUrl: 'src/member/cc.member.view.html',
            controller: 'CcMemberCtrl as vm'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'src/account/cc.account.view.html',
            controller: 'CcAccountCtrl as vm'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/status');

  }

})();

