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
        /*url: '/tab',*/
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
        abstract: true,
        views: {
          'tab-family': {
            template: '<ion-nav-view></ion-nav-view>'
          }
        }
      })
      .state('tab.family.list', {
        url: '',
        templateUrl: 'src/family/cc.family.view.html',
        controller: 'CcFamilyCtrl as vm'
      })
      .state('tab.family.detail', {
        url: '/:familyId',
        templateUrl: 'src/family/cc.family-detail.view.html',
        controller: 'CcFamilyDetailCtrl as vm'
      })

      .state('tab.family.member', {
        url: '/member/:memberId',
        templateUrl: 'src/member/cc.member.view.html',
        controller: 'CcMemberCtrl as vm'
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

