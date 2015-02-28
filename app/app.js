'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'routes',
  'landingpage',
  'login',
  'logout',
  'authentication',
  'storageservice',
  'currentuser',
  'feeds',
  'allfeeds',
  'userfeeds',
  'relatedfeeds',
  'mm.foundation',
  'timer',
  'userinfo',
  'infinite-scroll',
  'contests',
  'markcontests',
  'allcontests',
  'participations',
  'allparticipations',
  'createcontest',
  'createparticipation',
  'marked',
  'angularFileUpload', 
  'ownerfeeds',
  'aws',
  'participation_commend',
  'contest_commend'
])
	.run(function($rootScope, $state, Auth) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if (!Auth.authorize(toState.data.access)) {
				event.preventDefault();

				$state.go('anon.login');
			}
		});
	});