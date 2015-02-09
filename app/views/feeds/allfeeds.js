'user strict';

angular.module('allfeeds', [])
	.controller('AllFeedsCtrl', function($scope, Feeds, LocalService) {
		Feeds.getAllFeeds().then(function(result) {
			$scope.feeds = result;
		})
	})