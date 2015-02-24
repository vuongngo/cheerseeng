'use strict';

angular.module('logout', [])

	.controller('LogoutCtrl', function($scope, $state, Auth) {
		$scope.errors = [];
		Auth.logout().success(function(result) {
			$state.go('anon.home');
		}).error(function(err) {
		});
	});