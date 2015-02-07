'use strict';

angular.module('login', ['validation.match'])

	.controller('LoginCtrl', function($scope, $state, Auth) {
		$scope.errors = [];

		$scope.login = function() {
			if($scope.loginForm.$valid) {
				$scope.errors = [];
				Auth.login($scope.user).success(function(result) {
					$state.go('feeds');
				}).error(function(err) {
					$scope.errors.push(err);
				});
			}
		};
	});
