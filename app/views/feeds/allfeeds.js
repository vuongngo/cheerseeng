'user strict';

angular.module('allfeeds', [])
	.controller('AllFeedsCtrl', function($scope, Feeds, LocalService) {
		Feeds.getAllFeeds().success(function(result) {
			$scope.feeds = result.feeds;
			// $scope.meta = result.meta;
		}).error(function(res) {
			if(res.errors === 'Not authenticated') {
			LocalService.unset('auth_token');
		};
		});
	});