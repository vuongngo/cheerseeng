'user strict';

angular.module('participations', [])
	.factory('Participations', function($http) {
		var url = 'http://api.cheersee.dev'
		return {
			getAllParticipations: function(page) {
				return $http.get(url + "/participations?page=" + page);
			}
		};
	});