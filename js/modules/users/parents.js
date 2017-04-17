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
	.controller('userparentsController', function($location,$scope,$window,$anchorScroll){
		//define back method
		$scope.back=function(){
			//go back history
			$window.history.back();
		}
		$scope.gotoTop = function() {
		// set the location.hash to the id of
		// the element you wish to scroll to.
		$location.hash('Top');

		// call $anchorScroll()
		$anchorScroll();
		};
		//define go method
		/*$scope.go=function(){
			$location.href="#/medico/";
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