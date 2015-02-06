'use strict';

angular.module('landingpage', [])

.controller('LandingpageCtrl', ['$scope', function($scope) {
}])

.directive('uniqueEmail', function($http) {
	var toId;
	return {
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			scope.$watch(attr.ngModel, function(value) {
				if(toId) clearTimeout(toId);
				toId = setTimeout(function(){
					$http.get('http://api.cheersee.dev/validations?user_email=' + value, {
    					headers: {'Accept': 'application/vnd.cheersee.v1'}
					}).success(function(data){
						if (data["isValid"] == true) {
                            ctrl.$setValidity('uniqueEmail', true);
                        } else if (data["isValid"] == false) {
                            ctrl.$setValidity('uniqueEmail', false);
                        }
					}).
					error(function(data){
						console.log("something wrong");
					});
				}, 200);
			})
		}

	}
})