'use strict',

angular.module('createcontest', [])
	.controller('CreateContestCtrl', function($scope, $upload, Contests, LocalService, $state, Aws) {

		$scope.$watch('files', function() {
			$scope.upload($scope.files);
		});
		$scope.$watch('timespan', function() {
			var d = new Date();
			var tod = new Date(d);
			var ti = $scope.timespan;
			tod.setDate(d.getDate() + parseInt(ti));
			$scope.created_at = Date.parse(d);
			$scope.updated_at = Date.parse(d);
			$scope.ended_at  = Date.parse(tod);
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

		$scope.policy = function() {
			Aws.s3Token().success(function(result) {
				$scope.policy = result.policy;
				$scope.signature = result.signature;
				$scope.folder = result.folder;
			}).error(function(err) {
				console.log(err);
			});
		};
		$scope.pics = [];

		$scope.upload = function(files) {
			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					var reader = new FileReader();
					reader.onload = function(e)
						{	
							var img = document.createElement("img");
							img.src = e.target.result;
							var canvas = document.createElement("canvas");
							var ctx = canvas.getContext("2d");
							ctx.drawImage(img, 0, 0);

							var MAX_WIDTH = 600;
							var MAX_HEIGHT = 600;
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

							var dataurl = canvas.toDataURL("image/jpeg", 0.7);
							var blob = dataURItoBlob(dataurl);
							$upload.upload({
							url: 'http://cheerseeng.s3.amazonaws.com/',
							method: 'POST',
							transformRequest: function (data, headersGetter) {
								var headers = headersGetter();
								delete headers['Authorization'];
								return data;
							},
							sendObjectsAsJsonBlob: true,
							fields: {
								key: $scope.folder + '/contests/' + Math.random().toString(36).substring(7),
								AWSAccessKeyId: 'AKIAJ7U3RJ5DTBULBWFQ',
								acl: 'private',
								policy: $scope.policy,
								signature: $scope.signature,
								"Content-Type": file.type != '' ? file.type : 'application/octet-stream',
								filename: $scope.folder + '/contests/' + Math.random().toString(36).substring(7)
							},
							file: blob
							}).progress(function (evt) {
								var progressPercentage = parseInt(100.0 * evt.loaded /evt.total);
								console.log('progress: ' + progressPercentage + '%');
							}).success(function (data, status, headers, config) {
								$scope.pics = $scope.pics.concat(headers('Location'));
								console.log($scope.pics);
							}).error(function (err) {
								console.log(err);
							});
						};
					reader.readAsDataURL(file);
				}
			}
		};
		$scope.create = function() {
			$scope.contest.pic = $scope.pics;
			$scope.contest.created_at = $scope.created_at;
			$scope.contest.updated_at = $scope.updated_at;
			$scope.contest.ended_at = $scope.ended_at;			
			Contests.createContest($scope.contest).success(function(result) {
				$state.go('user.allcontests');
			}).error(function(res){
				$scope.err = res.errors
			});
		};
	});
