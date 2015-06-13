'use strict';

angular.module('logout', [])

	.controller('LogoutCtrl', function($scope, $state, Auth) {
		Auth.logout();
		$state.go('anon.home');
	});