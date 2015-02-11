'use strict';

angular.module('userinfo', [])
	.controller('UserInfoCtrl', function($scope, Userinfos) {
			Userinfos.getUser().success(function(result) {
				$scope.user = result
			}).error(function(err) {
				// $scope.errors.push(err);
			});
		})
	.factory('Userinfos', function($http, LocalService) {
		var url = 'http://api.cheersee.dev';
		var uid = angular.fromJson(LocalService.get('user_id'))
		return {
			getUser: function() {
				return $http.get(url + '/users/' + uid.$oid);
			},
		};
	});