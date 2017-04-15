//wrap the module
(function(){
	//start mean module
	angular.module('trainingModule',[])
	//defining mean directive
	.directive('trainingDirective',function(){
		//return function
		return{
			restrict:'E',
			replace:true,
			templateUrl:'html/users/inf_training.html',
			controller: 'userTrainingController'
		};
	})
	/*CONTROLLER*/
	.controller('userTrainingController', function($location,$scope,$window){
		//define back method
		$scope.back=function(){
			//go back history
			$window.history.back();
		}
		/*$scope.send=function(){
			$location.href="#/parents/";
		}*/
		//define sport method
		$scope.sport=[
			{id:1, name:'Novato'},
			{id:2, name:'Veterano'}
		];
		$scope.categories=[
			{id:1, name:'Rabbits Especial'},
			{id:2, name:'Rabbits'},
			{id:3, name:'Hornets'},
			{id:4, name:'Irons'},
			{id:5, name:'Falcons'},
			{id:6, name:'Tauros'},
			{id:7, name:'Ponys'}
		];
	});
})();