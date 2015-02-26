'user strict';

angular.module('ownerfeeds', ['userinfo', 'angularFileUpload'])
	.controller('OwnerFeedsCtrl', function($scope, $upload, Feeds, Userinfos, LocalService, $stateParams, Aws) {
		$scope.busy = false;
		$scope.edit = {'age': true, 'interest': true, 'location': true, 'avatar': true}
		$scope.feeds = [];
		var page = 0;
		$scope.$watchCollection('feeds', function(newValue, oldValue) {
	  		page = page + 1;
		});
		$scope.$watch('files', function() {
			$scope.upload($scope.files);
		});

		$scope.changeAvatar = function() {
			$scope.edit.avatar = false;
			Aws.s3Token().success(function(result) {
				$scope.policy = result.policy;
				$scope.signature = result.signature;
				$scope.folder = result.folder;
			}).error(function(err) {
			  console.log(err);
			});
		};
		$scope.upload = function (files) {
			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					console.log(file);



					var img = document.createElement("img");
					var canvas = document.createElement("canvas");
					img.onload = function() {
						var  width = this.width;
						var  height = this.height;
						var MAX_WIDTH = 100;
						var MAX_HEIGHT = 100;
						if (width > height) {
						  if (width > MAX_WIDTH) {
						    height *= MAX_WIDTH / width;
						    width = MAX_WIDTH;
						  }
						} else {
						  if (height > MAX_HEIGHT) {
						    width *= MAX_HEIGHT / height;
						    height = MAX_HEIGHT;
						  }
						}
						canvas.width = width;
						canvas.height = height;
						var ctx = canvas.getContext("2d");
						ctx.drawImage(img, 0, 0, width, height);
						}
					img.src = window.URL.createObjectURL(file);


					var dataUrl = canvas.toDataURL("image/png");
					var avatar = dataURLToBlob(dataUrl);
					console.log(avatar);
					$scope.user.profile.avatar = avatar;

				// 	$upload.upload({
				// 		url: 'http://cheerseeng.s3.amazonaws.com/',
				// 		method: 'POST',
				// 		transformRequest: function (data, headersGetter) {
    //                            var headers = headersGetter();
    //                             delete headers['Authorization'];
    //                             return data;
    //                         },
				// 		fields: {
				// 			key:  $scope.folder + '/avatar/' + file.name,
				// 			AWSAccessKeyId: 'AKIAJ7U3RJ5DTBULBWFQ',
				// 			acl: 'private',
				// 			policy: $scope.policy,
				// 			signature: $scope.signature,
				// 			"Content-Type": file.type != '' ? file.type : 'application/octet-stream',
				// 			filename: $scope.folder + '/avatar/' + file.name
				// 		},
				// 		sendObjectsAsJsonBlob: true,
				// 		file: file,
				// 		data: avatar
				// 	}).progress(function (evt) {
				// 		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				// 		console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
				// 	}).success(function (data, status, headers, config) {
				// 		console.log(headers('Location'));
				// 		$scope.user.profile.avatar = headers('Location');
				// 		$scope.updateProfile();
				// 		window.URL.revokeObjectURL(img.src);
				// 	}).error(function (err) {
				// 		console.log(err);
				// 		window.URL.revokeObjectURL(img.src);
					// });
				}
			}
		};
		$scope.moreFeeds = function() {
			$scope.busy = true;
			Feeds.getUserFeeds($stateParams.id ,page).success(function(result) {
				$scope.feeds = $scope.feeds.concat(result.feeds);
				$scope.user = result.user;
				total_pages = result.meta.pagination.total_pages;
				if (page < result.meta.pagination.total_pages) {
					$scope.busy = false;} else {
					$scope.busy = true;
					}
			}).error(function(res) {
				$scope.errors = res;
			});
		};
		$scope.updateProfile = function() {
			Userinfos.updateUser($scope.user.profile._id.$oid, $scope.user.profile).success(function(result) {
				$scope.profile = result;
				$scope.edit.age = true;
				$scope.edit.interest = true;
				$scope.edit.location = true;
				$scope.edit.avatar = true;
			}).error(function(res) {
				$scope.errors = res;
			})
		};
	});
