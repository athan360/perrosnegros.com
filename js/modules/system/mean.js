//wrap the module
(function(){
	//start mean module
	angular.module('meanModule',[])
	//defining mean directive
	.directive('meanDirective',function(){
		//return function
		return{
			restrict:'E',
			replace:true,
			templateUrl:'html/system/mean.html',
			controller:'meanController'
		};
	})
	//defining controller
	.controller('meanController', function($scope){
		$scope.title='Quiénes Somos';

	});

})();

//define the configuration
	/*.config(function($routeProvider){
		$routeProvider
		.state('tabs.login',{
			url:"/login",
			view:{'login-tab':{
				templateUrl:"html/system/login.html"
				}
			}
		})*/
		/*.state('tabs.home',{
			url:"/home",
			views:{
				'home-tab':{
					templateUrl:"html/system/mean.html",
					controller:'meanController'
				}
			}
		})
		$urlRouterProvider.otherwise("/tab/home");*/
	//})