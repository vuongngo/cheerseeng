'user strict';

angular.module('userfeeds', ['userinfo'])
	.controller('UserFeedsCtrl', function($scope, Feeds, Userinfos, LocalService, $stateParams) {
		$scope.busy = false;
		$scope.edit = {'age': true, 'interest': true, 'location': true}
		$scope.feeds = [];
		var page = 0;
		$scope.$watchCollection('feeds', function(newValue, oldValue) {
	  		page = page + 1;
		});
		$scope.moreFeeds = function() {
			$scope.busy = true;
			Feeds.getUserFeeds($stateParams.id ,page).success(function(result) {
				$scope.feeds = $scope.feeds.concat(result.feeds);
				$scope.user = result.user;
				total_pages = result.meta.pagination.total_pages;
				if (page < result.meta.pagination.total_pages) {
					$scope.busy = false;} else {
					$scope.busy = true;
					}
			}).error(function(res) {
				$scope.errors = res;
			});
		};
	});
