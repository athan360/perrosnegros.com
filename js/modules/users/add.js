(function(){
	angular.module('addUsersModule',[
	])
	//DIRECTIVES
	.directive('usersAddDirective', function(){
		return{
			restrict:'E',
			replace:true,
			templateUrl:'html/users/add.html',
			controller:'usersAddController'
		};
	})
	//CONTROLERS
	.controler('usersAddController', function($location, $rootScope, $scope, $route, $routeParams, $filter, $window, $mdDialog, $mdToast, usersService, systemPermissionServ-ice ){
	//validate add permission
	systemPermissionService.validatePermissions($rootScope.session.user.id,$rootScope.module.id,2,$rootScope.session.area.id, true)

	})
})