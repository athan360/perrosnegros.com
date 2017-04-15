//Wrap the module
(function(){
	//Declare the app module
	angular.module('app', [
		'ngMessages', 
		'ngRoute',
		'ngMaterial', 
		'ngAnimate', 
		'ngAria', 
		'ngSanitize',
		'utilsModule',
		'filtersModule',
		'dashboardModule',
		'errorModule',
		'loginModule',
		'meanModule',
		'personalModule',
		'parentsModule',
		'medicoModule',
		'trainingModule'
		])
	//Configurate the app
	.config(function($httpProvider, $routeProvider, $mdThemingProvider, $provide){
		/******************HTTP CONFIGURATION******************/
		//Config the http request
	  	$httpProvider.defaults.transformRequest = function(data){
			//Return undefined
			if (data === undefined) {
				return data;
			}
			//Return the object as text params
			return $.param(data);
		};
		//Set the content type as urlencoded
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		/******************NG-ROUTE CONFIGURATION******************/
		//Define the routes
		$routeProvider
		//Dashboard's module routes
		.when('/mean/',{
			template:'<mean-directive></mean-directive>'
		})
		.when('/dashboard/', {
			template: '<dashboard-directive></dashboard-directive>'
		})
		.when('error/permission/',{
			template: '<error-directive></error-directive>'
		})
		//**************USERS******************
		
		.when('/personal/',{
			template:'<personal-directive></personal-directive>'
		})
		.when('/parents/',{
			template:'<parents-directive></parents-directive>'
		})
		.when('/medico/',{
			template:'<medico-directive></medico-directive>'
		})
		.when('/training/',{
			template:'<training-directive></training-directive>'
		})
		.otherwise({
			template: '<dashboard-directive></dashboard-directive>'
		});
		
		/******************THEME CONFIGURATION******************/
		//Set the color theme
		$mdThemingProvider.theme('default').primaryPalette('green').accentPalette('red').warnPalette('orange');
	})
	//Define a fake Backend
	.run(function($httpBackend){
		// $httpBackend.whenPOST('php/api.php?command=getUserInfo').passThrough();
		// //Define a fake POST php/api.php?command=getAllClients
		// $httpBackend.whenPOST('php/api.php?command=getAllClients').passThrough();
		// //Define an /html fake response
		// $httpBackend.whenGET(/^html/).passThrough();
	})
})();