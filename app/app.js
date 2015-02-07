'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'routes',
  'landingpage',
  'login',
  'authentication',
  'storageservice',
  'currentuser',
  // 'accesslevels',
  'mm.foundation'
])
	.run(function($rootScope, $state, Auth) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if (!Auth.authorize(toState.data.access)) {
				event.preventDefault();

				$state.go('anon.login');
			}
		});
	});