'use strict';

angular.module('contest_commend', [])
	.factory('ContestComments', function($http) {
		var url = "http://api.cheersee.dev"
		return {
			create: function(cid, formData) {
				return $http.post(url + "/clink_comments/" + cid + "/c_comments", formData)
			},
			get: function(cid, page) {
				return $http.get(url + "/clink_comments/" + cid + "/c_comments?page=" + page)
			}

		};
	})
	.directive('contestCommend', function() {
		return {
			scope: {
				cid: '=commendlink'
			},
			templateUrl: '/app/shared/partials/commend.html',
			controller: function($scope, ContestComments) {
				$scope.page = 1;
				ContestComments.get($scope.cid, $scope.page).success(function(result) {
					$scope.comments = result.comments;
				}).error(function(err) {
					console.log(err);
				});

				$scope.c_comment = {};
				$scope.submit = function() {
					$scope.c_comment.post = $scope.comment;
					var d = new Date();
					$scope.c_comment.created_at = Date.parse(d);
					ContestComments.create($scope.cid, $scope.c_comment).success(function(result) {
						console.log(result);
					}).error(function(err){
						console.log(err);
					});					
				}
			}
		};
	})