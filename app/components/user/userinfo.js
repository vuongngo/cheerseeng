'use strict';

angular.module('userinfo', [])
	.controller('UserInfoCtrl', function($scope, Userinfos, Auth, $state, mySocket) {
			$scope.Date = new Date();
			$scope.notification = [];
			Userinfos.getUser().success(function(result) {
				$scope.owner = result
			}).error(function(err) {
				// $scope.errors.push(err);
			});
			$scope.$on('socket:user-notification/$scope.owner._id.$oid', function (ev, data) {
				$scope.notification = $scope.notification.concat(data);
			})
		})
	.factory('Userinfos', function($http, LocalService) {
		var url = 'http://api.cheersee.dev';
		var uid = angular.fromJson(LocalService.get('user_id'))
		return {
			getUser: function() {
				return $http.get(url + '/users/' + uid);
			},
			updateUser: function(pid, formData) {
				return $http.put(url + '/profiles/' + pid, formData);
			},
		};
	});