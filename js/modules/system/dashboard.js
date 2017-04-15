//Wrap the conten
(function(){
	//Declare the menu module
	angular.module('dashboardModule', [])
	/******************DIRECTIVES******************/
	//Declare the directive
	.directive('dashboardDirective', function(){
		//Return the directive
		return {
			restrict: 'E',
			templateUrl: 'html/system/dashboard.html',
			link: function($scope, $element, $attr){},
			controller: function($scope){
				
			}
		};
	});
})();