'user strict';

angular.module('contests', [])
	.factory('Contests', function($http) {
		var url = 'http://api.cheersee.dev'
		return {
			getAllContests: function(page) {
				return $http.get(url + '/contests?page=' + page);
			}
		};
	});