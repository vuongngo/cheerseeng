'use strict';

angular.module('participation_commend', [])
	.factory('ParticipationComments', function($http) {
		var url = "http://api.cheersee.dev"
		return {
			create: function(pid, formData) {
				return $http.post(url + "/plink_comments/" + pid + "/p_comments", formData)
			},
			get: function(pid, page) {
				return $http.get(url + "/plink_comments/" + pid + "/p_comments?page=" + page)
			}
		};
	})
	.directive('participationCommend', function() {
		return {
			scope: {
				pid: '=commendlink'
			},
			templateUrl: '/app/shared/partials/commend.html',
			controller: function($scope, ParticipationComments) {
				$scope.p_comment = {};
				$scope.submit = function() {
					$scope.p_comment.post = $scope.comment;
					var d = new Date();
					$scope.p_comment.created_at = Date.parse(d);
					ParticipationComments.create($scope.pid, $scope.p_comment).success(function(result) {
						console.log(result);
					}).error(function(err){
						console.log(err);
					});					
				}
			} 
		}
	})