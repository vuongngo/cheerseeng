'user strict';

angular.module('participations', [])
	.factory('Participations', function($http) {
		var url = 'http://api.cheerseeapi.dev'
		return {
			getAllParticipations: function(page) {
				return $http.get(url + "/participations?page=" + page);
			},
			createParticipation: function(formData) {
				return $http.post(url + "/participations", formData)
			}
		};
	});