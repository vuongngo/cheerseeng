'use strict';

angular.module('routes', ['ui.router', 'accesslevels'])
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {

    $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.home', {
        url: '/',
        templateUrl: '/app/views/landingpage/landingpage.html',
        controller: 'SignupCtrl'
      })
      .state('anon.login', {
        url: '/login',
        templateUrl: '/app/views/login/login.html',
        controller: 'LoginCtrl'
      });

    $stateProvider
      .state('user', {
        abstract: true,
        templateUrl: '/app/shared/partials/topbar.html',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.allfeeds', {
        url: '/feeds',
        controller: 'AllFeedsCtrl',
        templateUrl: '/app/views/feeds/allfeeds.html',
      })
      .state('user.userfeeds', {
        url: '/:id',
        controller: 'UserFeedsCtrl',
        templateUrl: '/app/views/feeds/allfeeds.html',
      })
      .state('user.relatedfeeds', {
        url: '/feed/:id',
        controller: 'RelatedFeedsCtrl',
        templateUrl: '/app/views/feeds/relatedfeeds.html',
      });

    $urlRouterProvider.otherwise("/");
  });