'user strict';

angular.module('allfeeds', [])
	.controller('AllFeedsCtrl', function($scope, Feeds, LocalService) {
		$scope.busy = false;
		$scope.feeds = [];
		var page = 0;
		$scope.$watchCollection('feeds', function(newValue, oldValue) {
	  		page = page + 1;
		});
		$scope.moreFeeds = function() {
			$scope.busy = true;
			Feeds.getAllFeeds(page).success(function(result) {
				$scope.feeds = $scope.feeds.concat(result.feeds);
				total_pages = result.meta.pagination.total_pages;
				if (page <= result.meta.pagination.total_pages) {
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
