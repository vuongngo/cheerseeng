'user strict';

angular.module('allfeeds', [])
	.controller('AllFeedsCtrl', function($scope, Feeds, LocalService, socket) {
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
		socket.on('feed-update', function (ev, data) {
			console.log(ev);
			for (i = 0; i < $scope.feeds.length; i ++) {
				if ($scope.feeds[i]._id.$oid == ev.cid) {
					if (ev.comment_count) {
						$scope.feeds[i].c_link_comment.count = ev.comment_count;
						} else { $scope.feeds[i].c_link_like.count = ev.like_count ;
						}
					}
				}
			});
	});
