'user strict';

angular.module('allcontests', [])
	.controller('AllContestsCtrl', function($scope, Contests, LocalService, MarkContests) {
		$scope.busy = false;
		$scope.contests = [];
		var page = 0;
		$scope.$watchCollection('contests', function(newValue, oldValue) {
			page = page + 1;
		});
		$scope.markContest = function(id) {
			MarkContests.markContest(id).success(function(result) {
				$scope.marked_contest = result;
			}).error(function(res) {

			});

		};
		$scope.moreContests = function() {
			$scope.busy = true;
			Contests.getAllContests(page).success(function(result) {
				$scope.contests = $scope.contests.concat(result.contests);
				total_pages = result.meta.pagination.total_pages;
				if (page < result.meta.pagination.total_pages) {
					$scope.busy = false;} else {
						$scope.busy = true;
					}
				}).error(function(res) {
				if(res.errors === 'Not authenticated') {
					LocalService.unset('auth_token');
				};
			});
		};
	});