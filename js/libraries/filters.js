/*
Module: Filters
Objective:
Define a module for save all the general use filters that are going to be needed in the develop of this project
*/
//Wrap the module
(function(){
	//Defie the module
	angular.module('filtersModule', [])
	/******************DIRECTIVES******************/
	//Jumps Filter - Change all the linejumps for <br/> to ensure all of them are 
	.filter('jumpsFilter', function($sce){
		//Return the filter
		return function(text){
			//Sanitize text
			text = (text? text:"");
			//Replace
			text = text.replace(/\n/g,'<br/>');
			//Return the sanitize text
			return $sce.trustAsHtml(text);
		}
	})
	.directive('sysScroll', function($timeout, $parse){
		//Define the checkScroll function
		function checkScroll(node, method){
			//Define a zero total container element
			var total = 0;
			//Get through all the element's children nodes 
			for(var i=0; i<node.children.length; i++){
				//Validate if it's an offset Parent Node
				if(node.children[i].offsetParent){
					//Sum their 
					total += node.children[i].offsetHeight;
				}
			}
			//Calculate the scroll percent
			var percent = (100*(node.scrollTop+node.offsetHeight)/total);
			//Call the event if applies
			if(percent > 80){
				//Call the function
				method({$percent: percent});
			}
		};
		//Return the directive
		return {
			restrict :'AE',
			scope: {myScroll: '&sysScroll'},
			link: function($scope, $elem, $attr){
				//Evaluate the function
				var method = $parse($scope.myScroll);
				//Check the scroll at the beginning
				checkScroll($elem[0], method);
				//Set it as a scroll event listener
				$elem.on('scroll',function($event){
					//Check the sroll position
					checkScroll($event.target, method);
				});
			}
		};
	});
})();