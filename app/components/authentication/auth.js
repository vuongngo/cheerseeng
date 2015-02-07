'use strict';

angular.module('authentication', [])
	.factory('Auth', function($http, LocalService, AccessLevels) {
		function checkTokenStatus(token) {
			$http.get('/auth/token_status?token' + token);
		}

		var token = LocalService.get('auth_token');

		if(token) {
			token = angular.fromJson(LocalService.get('auth_token')).token;
			checkTokenStatus(token);
		}

		return {
			authorize: function(access) {
				if(access === AccessLevels.user) {
					return this.isAuthenticated();
				} else {
					return true;
				}
			},
			isAuthenticated: function() {
				return LocalService.get('auth_token');
			},
			login: function(credentials) {
				var login = $http.post('/sessions', credentials);
				login.success(function(result) {
					LocalService.get('auth_token', JSON.stringify(result));
				});
				return login;
			},
			logout: function() {
				LocalService.unset('auth_token');
			},
			register: function(formData) {
				LocalService.unset('auth_token');
				var register = $http.post('/users', formData);
				register.success(function(result) {
					localService.set('auth_token', JSON.stringify(result));
				});
				return register;
			}
		};
	})

	.factory('AuthInterceptor', function($q, $injector) {
		var LocalService = $injector.get('LocalService');

		return {
			request: function(config) {
				var token;
				if(localService.get('auth_token')) {
					token = angular.fromJson(localService.get('auth_token')).token;
				}
				if (token) {
					config.headers.Authorization = 'Bearer' + token;
				}
				return config;
			},
			responseError: function(response) {
				if(response.status === 401 || response.status === 403) {
					LocalService.unset('auth_token');
					$injector.get('state').go('anon.login');
				}
				return $q.inject(response);
			}
		};
	})
	
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	});