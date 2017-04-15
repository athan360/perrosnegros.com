//wrap the module
(function(){
	//start mean module
	angular.module('parentsModule',[])
	//defining mean directive
	.directive('parentsDirective',function(){
		//return function
		return{
			restrict:'E',
			replace:true,
			templateUrl:'html/users/parents.html',
			controller: 'userparentsController'
		};
	})
	/*CONTROLLER*/
	.controller('userparentsController', function($location,$scope,$window){
		//define back method
		$scope.back=function(){
			//go back history
			$window.history.back();
		}
		//define go method
		/*$scope.go=function(){
			$location.href="#/medico/";
		}*/
	});
})();