(function(){
	angular.module('errorModule',[])
	.directive('errorDirective', function(){
		return{
			restrcit:'E',
			replace:true,
			templateUrl:'html/system/error.html',
			controller:'errorController'
		};
	})
	.controller('errorController', function($scope, $window){
		$scope.back=function(){
			window.history.back();
		}
	})
})();