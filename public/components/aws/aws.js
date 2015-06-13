'user strict';

angular.module('aws', [])
	.factory('Aws', function($http) {
		var url = 'http://api.cheerseeapi.dev/s3_access_token'
		return {
			s3Token: function() {
				return $http.get(url);
			},
		};
	});