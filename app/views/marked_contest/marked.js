'use strict',

angular.module('marked', [])
	.controller('MarkedCtrl', function($scope) {
		$scope.marked_contests = $scope.owner.marked_contests
	});
