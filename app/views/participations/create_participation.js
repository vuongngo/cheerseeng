'use strict';

angular.module('createparticipation', [])
	.controller('CreateParticipationCtrl', function($scope, $state, Participations, LocalService, $stateParams) {
		$scope.create = function() {
			$scope.participation.contest_id = $stateParams.id;
			var d = new Date();
			var tod = new Date(d);
			$scope.participation.created_at = Date.parse(d);
			$scope.participation.updated_at = Date.parse(d);
			Participations.createParticipation($scope.participation).success(function(result) {
				$state.go('user.allparticipations');
			}).error(function(res){
				$scope.err = res.errors
			});
		}

	})