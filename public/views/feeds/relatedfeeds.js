'user strict';

angular.module('relatedfeeds', [])
	.controller('RelatedFeedsCtrl', function($scope, Feeds, LocalService, $stateParams) {
		$scope.busy = false;
		$scope.participations = [];
		var page = 0;
		$scope.$watchCollection('participations', function(newValue, oldValue) {
	  		page = page + 1;
		});
		$scope.moreParticipations = function() {
			$scope.busy = true;
			Feeds.getRelatedFeeds($stateParams.id ,page).success(function(result) {
				$scope.contest = result.contest[0];
				$scope.participations = $scope.participations.concat(result.participations);
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
