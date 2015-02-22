'use strict';

angular.module('allparticipations', [])
	.controller('AllParticipationsCtrl', function($scope, Participations, LocalService) {
		$scope.busy = false;
		$scope.participations = [];
		var page = 0;
		$scope.$watchCollection('participations', function(newValue, oldValue) {
			page = page + 1;
		});
		$scope.moreParticipations = function() {
			$scope.busy = true;
			Participations.getAllParticipations(page).success(function(result) {
				$scope.participations = $scope.participations.concat(result.participations);
				if (page < result.meta.pagination.total_pages) {
					$scope.busy = false;} else {
						$scope.busy = true;
					}
				}).error(function(res) {
				if(res.errors === 'Not authenticated') {
					LocalService.unset('auth_token');
				};
			});
		};
	})