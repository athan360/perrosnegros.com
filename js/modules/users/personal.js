//wrap the module
(function(){
	//start mean module
	angular.module('personalModule',[])
	//defining mean directive
	.directive('personalDirective',function(){
		//return function
		return{
			restrict:'E',
			replace:true,
			templateUrl:'html/users/medico.html',
			controller: 'userPersonalController'
		};
	})
	/*CONTROLLER*/
	.controller('userPersonalController', function($location,$scope,$window){
		//define back method
		$scope.back=function(){
			//go back history
			$window.history.back();
		}
		/*$scope.go=function(){
			$location.href="#/parents/";
		}*/
	});
})();