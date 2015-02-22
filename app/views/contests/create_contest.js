'use strict',

angular.module('createcontest', [])
	.controller('CreateContestCtrl', function($scope, Contests, LocalService, $state) {
		$scope.create = function() {
			var d = new Date();
			var tod = new Date(d);
			tod.setDate(d.getDate() + $scope.contest.timespan);
			$scope.contest.created_at = Date.parse(d);
			$scope.contest.updated_at = Date.parse(d);
			$scope.contest.ended_at  = Date.parse(tod);
			Contests.createContest($scope.contest).success(function(result) {
				$state.go('user.allcontests');
			}).error(function(res){
				$scope.err = res.errors
			});
		};
	});
