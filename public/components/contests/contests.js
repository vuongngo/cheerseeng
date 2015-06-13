'user strict';

angular.module('contests', [])
	.factory('Contests', function($http) {
		var url = 'http://api.cheerseeapi.dev'
		return {
			getAllContests: function(page) {
				return $http.get(url + '/contests?page=' + page);
			},
			createContest: function(formData) {
				return $http.post(url + "/contests", formData);
			},
			updateContest: function(cid, formData) {
				return $http.put(url + "/contests/" + cid, formdata)
			},
		};
	});