'use strict';

angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {

    $stateProvider
    .state('anon', {
      url: '/',
      templateUrl: '/app/views/landingpage/landingpage.html',
      controller: 'SignupCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/app/views/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('user', {
      url: '/home',
      templateUrl: '/app/views/feed/homefeed.html',
    });
    $urlRouterProvider.otherwise("/");
  })