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

		function dataURItoBlob(dataURI) {
		    // convert base64/URLEncoded data component to raw binary data held in a string
		    var byteString;
		    if (dataURI.split(',')[0].indexOf('base64') >= 0)
		        byteString = atob(dataURI.split(',')[1]);
		    else
		        byteString = unescape(dataURI.split(',')[1]);

		    // separate out the mime component
		    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		    // write the bytes of the string to a typed array
		    var ia = new Uint8Array(byteString.length);
		    for (var i = 0; i < byteString.length; i++) {
		        ia[i] = byteString.charCodeAt(i);
		    }

		    return new Blob([ia], {type:mimeString});
		}

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

					var canvas = document.createElement("canvas");
					var img = document.createElement("img");
					var reader = new FileReader();  
					reader.onload = function(e)
					    {
					        img.src = e.target.result;

					        var canvas = document.createElement("canvas");
					        //var canvas = $("<canvas>", {"id":"testing"})[0];
					        var ctx = canvas.getContext("2d");
					        ctx.drawImage(img, 0, 0);

					        var MAX_WIDTH = 100;
					        var MAX_HEIGHT = 100;
					        var width = img.width;
					        var height = img.height;

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

					        var dataurl = canvas.toDataURL("image/png");
							var blob = dataURItoBlob(dataurl);

							$upload.upload({
								url: 'http://cheerseeng.s3.amazonaws.com/',
								method: 'POST',
								transformRequest: function (data, headersGetter) {
		                               var headers = headersGetter();
		                                delete headers['Authorization'];
		                                return data;
		                            },
								fields: {
									key:  $scope.folder + '/avatar/' + file.name,
									AWSAccessKeyId: 'AKIAJ7U3RJ5DTBULBWFQ',
									acl: 'private',
									policy: $scope.policy,
									signature: $scope.signature,
									"Content-Type": file.type != '' ? file.type : 'application/octet-stream',
									filename: $scope.folder + '/avatar/' + file.name
								},
								file: blob
							}).progress(function (evt) {
								var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
								console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
							}).success(function (data, status, headers, config) {
								console.log(headers('Location'));
								$scope.user.profile.avatar = headers('Location');
								$scope.updateProfile();
							}).error(function (err) {
								console.log(err);
								window.URL.revokeObjectURL(img.src);
							});

					    }
					    // Load files into file reader
					reader.readAsDataURL(file);

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
