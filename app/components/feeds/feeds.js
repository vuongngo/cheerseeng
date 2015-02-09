'use strict';

angular.module('feeds', [])
	.factory('Feeds', function($http) {
		var url = 'http://api.cheersee.dev'
		return {
			getAllFeeds: function() {
				return $http.get(url + '/feeds');
			},
			getUserFeeds: function() {
				return $http.get(url + '/feeds/' + user.id);
			},
			getRelatedFeeds: function() {
				return $http.get(url + '/feeds/' + user.id +'/' + contest.id);
			}
		};
	});