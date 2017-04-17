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
			templateUrl:'html/users/parents.html',
			controller: 'userPersonalController'
		};
	})
	/*CONTROLLER*/
	.controller('userPersonalController', function($location,$scope,$window,$anchorScroll){
		//define back method
		$scope.back=function(){
			//go back history
			$window.history.back();
		}
		//funcion para ir arriba 
		$scope.gotoTop = function() {
		$location.hash('Top');
		$anchorScroll();
		};
		/*$scope.go=function(){
			$location.href="#/parents/";
		}*/
		
		//funcion de reset
		$scope.reset = function(form) {
			$scope.user = {};
			if (form) {
				form.$setPristine();
				form.$setUntouched();
			}
        };
		$scope.reset();
	});
})();