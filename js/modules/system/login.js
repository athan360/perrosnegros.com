//Wap the module
(function(){
	//Start login module
	angular.module('loginModule', [])
	//Define the login directive
	.directive('loginDirective', function($http, $timeout, $mdToast, loginService){
		/******************DIRECTIVE******************/
		//Return the login directive
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'html/system/login.html',
			link: function($scope, $element, $attrs){},
			controller: function($scope){
				/******************SCOPE VARIABLES******************/
				//Define an empty login object
				$scope.login = {};
				/******************SCOPE METHODS******************/
				//Define Do Login Method
				$scope.doLogin = function(){
					//Call the Do Login service
					loginService.doLogin($scope.login.user, $scope.login.password)
					//Define the success function
					.then(function(response){
						console.log(response.user.name);
						//Notice the user the right login and refresh
						$mdToast.show($mdToast.simple().content('¡Bienvenido, '+response.user.name+'!').position("top right").hideDelay(1500));
						//Wait to the toast to close and reload the page
						$timeout(function(){
							//Refresh the page
							location.reload();
						},1000);
					}, function(){
						//notice the error
						$mdToast.show($mdToast.simple().content('Sus datos son incorrectos, por favor intente de nuevo.').position("top right").hideDelay(1500));
					});

				}
			}
		};
	})	
	//Define the loading directive
	.directive('loadingDirective', function($http, $compile, $route, $templateCache, loginService){
		/******************LOCAL VARIABLES******************/
		//Define a local advance progress
		var progress = {progress: 0, percent: 0};
		/******************LOCAL METHODS******************/
		//Recursively load the templates
		function loadTemplates(rest, callback, total){
			//Validate the size
			if(rest.length){
				//Increase the progress in one
				progress.progress += 1;
				//Calculate the percent
				progress.percent = (100*(progress.progress/total)).toFixed(0);
				//Get the last template
				var template = rest.pop();
				//Get the first 
				$http.get(template)
				//Get the template code
				.success(function(content){
					//Save it in the template cache
					$templateCache.put(template, content);
					//Go for the next
					loadTemplates(rest, callback, total);
				});
			}
			else{
				//Load the callback
				callback();
			}
		};
		/******************DIRECTIVE******************/
		//Return the directive
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'html/system/loading.html',
			link: function($scope, $element, $attrs){
				//Save the reference to the object
				$scope.session = {};
				//List of templates
				var templates = [
					'html/system/login.html',
					'html/system/dashboard.html',
					'html/system/error.html',
					'html/system/mean.html',
					'html/system/menu.html'

				];
				//Get all the files to the templateCache
				loadTemplates(templates, function(){
					//Check session
					loginService.checkLogin()
					//Success callback
					.then(function(data){
						//Set the template
						var template = '<personal-directive flex></personal-directive>';
						//If there's a session set the menu directive 
						if(data.log == 1){
							//Save the session object
							$scope.session = data;
							//Set the menu
							template = '<menu-directive flex layout="row"></menu-directive>';
						}
						//Clear the element
						$element.html('');
						//Load the template
						$element.append($compile(template)($scope));
						//Reload the route
						$route.reload();
					},function(){
						//Clear the element
						$element.html('');
						//Load the template
						$element.append($compile('<personal-directive flex></personal-directive>')($scope));
						//Reload the route
						$route.reload();
					});
					//End
				}, templates.length);
			},
			controller: function($scope){
				//Save the progress
				$scope.progress = progress;
			}
		};
	})
	//Define the login service
	.service('loginService', function($q, $http, $filter){
		/******************PROMISES******************/
		//Define an empty permissions object
		var permissions = {};		
		/******************METHODS******************/
		//Call the server for the login status
		function checkLogin(){
			//Define the $q defer
			var deferred	= $q.defer();
			//Go to the server and check the login
			$http.post('php/api.php?command=checkLogin',{})
			//Success the checkLogin
			.success(function(response){
				
				//Validate response
				if(response.status == 1){
					//Define the resolve function
					deferred.resolve(response.data);
				}
				else{
					//Define the reject function
					deferred.reject();
				}
			});
			//Return the deferred promise
			return deferred.promise;
		}
		//Get all the roles 
//		function getRoles(){
			//Define the $q defer
		/*	var deferred = $q.defer();
			//Get the roles from the server
			$http.post('php/api.php?command=getAllRoles', {})
			//Success from getting roles 
			.success(function(response){
				//Validate response
				if(response.status == 1){
					//Set the default position in the role
					response.data.map(function(role){
						//Find the role defualt position
						role.default = $filter('filter')(role.positions, {default: 1})[0];
					});
					//Define the resolve function
					deferred.resolve(response.data);
				}
				else{
					//Define the reject method
					deferred.reject();
				}
			});
			//Return the deferred promise
			return deferred.promise;*/
//		};
		//Do Login
		function doLogin(user, password){
			console.log(user, password);
			//Define the $q defer
			var deferred = $q.defer();
			//Get the roles from the server
			$http.post('php/api.php?command=doLogin', {user:user, password:password})
			//Success from getting roles 
			.success(function(response){
				//console.log(response);
				//Validate response
				if(response.status == 1){
					//Define the resolve function
					deferred.resolve(response.data);
				}
				else{
					//Define the reject method
					deferred.reject();
				}
			});
			//Return the deferred promise
			return deferred.promise
		};
		//Do Logout
		function doLogout(){
			//Define the $q defer
			var deferred = $q.defer();
			//Get the roles from the server
			$http.post('php/api.php?command=doLogout')
			//Success from getting roles 
			.success(function(response){
				//Validate response
				if(response.status == 1){
					//Define the resolve function
					deferred.resolve(response.data);
				}
				else{
					//Define the reject method
					deferred.reject();
				}
			});
			//Return the deferred promise
			return deferred.promise;
		}
		
		/******************INTERFACE******************/
		//Return the service's interface
		return {
			doLogin: function(user, password){
				//Return the promise
				return doLogin(user, password);
			},
			doLogout: function(){
				//Return the user logout
				return doLogout();
			},
			checkLogin: function(){
				//Return the promise
				return checkLogin();
			}
		};
	});
	//End	
})();