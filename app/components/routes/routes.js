'use strict';

angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('signup', {
      url: '/',
      templateUrl: '/app/views/landingpage/landingpage.html',
      controller: 'LandingpageCtrl'
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
  })