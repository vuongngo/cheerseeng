'user strict';

angular.module('markcontests', [])
	.factory('MarkContests', function($http) {
		var url = 'http://api.cheerseeapi.dev'
		return {
			markContest: function(id) {
				return $http.post(url + "/marked_contests?cid=" + id);
			},
		};
	});