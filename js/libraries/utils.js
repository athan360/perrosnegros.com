//Define a module for utils
angular.module('utilsModule', [])
//Add an autofocus util
.directive('ngAutofocus', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
})
.directive("fileInput", function(){
    return {
	    restrict: 'E',
	    template: '	<a class="btn btn-info Full">Añadir foto <span class="glyphicon glyphicon-camera"></span> / <span class="glyphicon glyphicon-picture"></span></a></div>',
        scope: {
            files: "=files",
            change: "&onChange"
        },
        link: function (scope, element, attributes) {
	        //Bind the change event
            element.bind("click", function(changeEvent){
            	//Create an input
            	var file = document.createElement('input');
            	//Set file type
            	file.setAttribute('type', 'file');
            	//Set file type
            	file.setAttribute('multiple', 'true');
            	//Set the event
            	file.onchange = function(event){
		        	//Set the appay function
		            scope.$apply(function () {
		            	//Select all the files
		                scope.files = event.target.files;
		                //Invoke the function
		                scope.change(scope.files);
		            });
            	};
            	//Click the input
            	file.click();
            });
        }
    };
})
.directive('sysFile', function(){
	//Return the directive
	return {
		restrict: 'EA',
		scope:{
			file: "&sysFile",
			multiple: "=sysMultiple"
		},
		link: function($scope, $elem, $attr){
			//Bind the change click
			$elem.bind('click', function($event){
				//Create an input
				var file = document.createElement('input');
				//Set file type
				file.setAttribute('type', 'file');
				//Validate multiple flag
				if($scope.multiple){
					//Set file quantity
					file.setAttribute('multiple', 'true');
				}
				//Set the change event
				file.onchange = function(event){
					//Invoke the function
					$scope.file({$file: event.target.files});
				}
				//Trigger the click
				file.click();
			});
		}
	}
})
.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };
            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
})
.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
})
//Define the file size filter
.filter('sysSizeFilter', function() {
	//Return the filter function
	return function(bytes) {
		//Validate the
		if(!bytes){
			return "0 bytes";
		}//Validate they're still bytes
		if(bytes < 1024){
			return bytes + ' bytes';
		}
		else if(bytes < 1024*1024){
			return (bytes/1024).toFixed(1) + ' Kb';
		}
		else{
			return (bytes/1024/1024).toFixed(1) + ' Mb';
		}
	}
})
//Defile the volume filter
.filter('volumeFilter', function() {
	//Return the filter function
	return function (volume) {
		//Add the volume string
		return volume + ' m³';
	};
})
.filter('quantityFilter', function() {
    //Return the filter function
    return function(quantity) {
        //Add the quantity string
        return quantity + ' kg';
    }
})
.filter('idleFilter', function() {
    //Return the filter function
    return function(idle) {
        //Add the idle string
        return idle + ' min';
    }
})
.filter('protectedFilter', function(){
	//Return the filter function
	return function(secret, show, smoke){
		//Validate the show value
		if(show){
			return secret;
		}
		else{
			return (smoke? smoke:'****');
		}
	}
})
/*Create time filter*/
.filter('timeFilter', function(){
	//Return the filter
	return function (seconds) {
		//Validate the seconds
		if(!seconds || !angular.isNumber(seconds)){
			//Return the advice
			return "Sin tiempo";
		}
		//Get the hours
		var hour = Math.floor(seconds/(60*60));
		//Get the Minutes
		var minute = Math.floor(seconds%(60*60)/60);
		//Set hour string
		var hourString = (hour?(hour + " hora" + (hour==1?'':'s')):'');
		//Set hour string
		var minuteString = (minute?(minute + " minuto" + (minute==1?'':'s')):'');
		//Validate the time
		if(seconds < 60){
			//Return the time
			return "Menos de un minuto";
		}
		else{
			//Return the time
			return hourString + ((hour && minute)? " y ":" ") + minuteString;
		}
	};
})
/*Create the Date Filter*/
.filter('dateFilter', function(){
	
	function setZeroes(number){
		//Compare an add the zeroes
		if(number < 10)
			return '0'+number;
		else
			return number;
	}
	
	function dateFormat(date, show, time){	
		//Define the days of the week
		var days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
		//Define the months of the year
		var months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
		//Make a date with the variable
		var custom = new Date(date*1000);		
		//Get today date
		var today = new Date();
		//Set only the custom date
		var customDate = new Date((new Date(custom)).setHours(0,0,0,0));
		//Set only the date
		var todayDate = new Date((new Date(today)).setHours(0,0,0,0));
		//Get the difference between dates
		var difference = Math.floor((todayDate.getTime()-customDate.getTime())/(1000*60*60));
		//Set the absolute value for the difference
		var compare = Math.abs(difference);
		//Set the hour and minutes
		var hour = show?('a las ' + setZeroes(custom.getHours()) + ':' + setZeroes(custom.getMinutes())):'';	
		//Evaluate compare variable
		if(time){
			format = hour;
		}
		else if(compare < 24){
			//Validate the difference
			format = 'hoy '+hour;
		}
		else if (24 <= compare && compare < 48){
			//Validate the time
			format = ((difference >= 0)?'ayer ':'mañana ') + hour;
		}
		else if(48 <= compare && compare < 168){
			//Return the day of the week
			format = 'el ' + ((difference < 0)?'próximo ':'pasado ') + days[custom.getDay()] + ' ' + hour;
		}
		else if(custom.getFullYear() == today.getFullYear()){
			//Return the date
			format = 'el ' + ((difference < 0)?'próximo ':'pasado ') + custom.getDate() + ' de ' + months[custom.getMonth()] + ' ' + hour;
		}
		else{
			//Return the data
			format = 'el ' + ((difference < 0)?'próximo ':'pasado ') + custom.getDate() + ' de ' + months[custom.getMonth()] + ' del ' + custom.getFullYear() + ' ' + hour;
		}
		//Return the format
		return format;
	}

	//Return the filter function
	return function(date, another, time, hour){
		//Define a default format
		var format = 'Fecha no disponible';
		//Validate the date value
		if(date){
			//Save the date in a format variable
			format = (time?'':'desde ') + dateFormat(date, hour);
		}
		//Check if there's another date
		if(another){
			//Check if the dates are the same
			format += ', hasta ' + dateFormat(another, hour, (dateFormat(date) == dateFormat(another)));
		}
		//turn the first letter to cap
		format = format.substr(0,1).toUpperCase()+format.substr(1);	
		//Return an advise
		return format;
	}
})
.directive('draggable', function($document, $window) {
	//Return the directive
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			var radius = 25;
			var minx = 0;
			var miny = 40;
			var maxx = $(window).width() - 2*radius;
			var maxy = $(window).height() - 2*radius;
			var startX = 0;
			var startY = 0;
			var x = (localStorage.getItem('x')?localStorage.getItem('x'):(minx+20));
			var y = (localStorage.getItem('y')?localStorage.getItem('y'):(miny+10));
			var win = angular.element($window);
			
			//Set the window event
			win.bind('resize', function(){
				//Get thge new window size
				maxx = $(window).width() - 2*radius;
				maxy = $(window).height() - 2*radius;
				//Validate x and y
				x = validateX(x);
			    y = validateY(y);
				//Refresh Position
				refreshPosition(x, y);
			});
			
			//Set the styles
			element.css({
				position: 'fixed',
				cursor: 'pointer',
				display: 'block'
			});
			//Set the position
			element.css({
				top: y + 'px',
				left:  x + 'px'
			});
			//Set the touch event
			element.on('touchstart', function(event){
				// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.touches[0].screenX - x;
				startY = event.touches[0].screenY - y;
				$document.on('touchmove', touchmove);
				$document.on('touchend', touchend);
				//Add active class
				element.addClass('active');
			});
			//Set the mouse events
			element.on('mousedown', function(event) {
				// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.screenX - x;
				startY = event.screenY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function refreshPosition(x,y){
				//Set the new Position
				element.css({
				    top: y + 'px',
				    left:  x + 'px'
				});
			}
			
		    function mousemove(event) {
			    x = validateX(event.screenX - startX);
			    y = validateY(event.screenY - startY);
			    refreshPosition(x, y);
			}
			
			function mouseup() {
				//Save the x, y Coordinates
				localStorage.setItem('x', x); 
				localStorage.setItem('y', y);
				//Remove the events
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
			
			function touchmove(event){
			    x = validateX(event.touches[0].screenX - startX);
			    y = validateY(event.touches[0].screenY - startY);
			    refreshPosition(x, y);
			}
			
			function touchend(){
				//Save the x, y Coordinates
				localStorage.setItem('x', x); 
				localStorage.setItem('y', y);
				//Add active class
				element.removeClass('active');
				//Remove the events
				$document.off('touchmove', touchmove);
				$document.off('touchend', touchend);
			}
			
			function validateX(x){
				//Validate the x value
				if(x < minx){
					x = minx;
				}
				if(x > maxx){
					x = maxx;
				}
				//Return the x
				return x;
			}

			function validateY(y){
				//Validate the x value
				if(y < miny){
					y = miny;
				}
				if(y > maxy){
					y = maxy;
				}
				//Return the x
				return y;
			}
		}
	}
})
.service('mobileService', function(){
	//Define the mobile check methods
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};
	//Return the interface
	return {
		//Return itIs Function
		itIs: function(){
			//Check if it's any of them
			return isMobile.any();
		}
	}
})
.directive('onLongPress', function($timeout) {
	//Define the Long Press Directive
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {
			$elm.bind('touchstart mousedown', function(evt) {
				// Locally scoped variable that will keep track of the long press
				$scope.longPress = true;

				// We'll set a timeout for 600 ms for a long press
				$timeout(function() {
					if ($scope.longPress) {
						// If the touchend event hasn't fired,
						//Prevent Default
						evt.preventDefault();
						//Stop propagation
						evt.stopPropagation();
						// apply the function given in on the element's on-long-press attribute
						$scope.$apply(function() {
							$scope.$eval($attrs.onLongPress)
						});
					}
				}, 600);
			});

			$elm.bind('touchend mouseup', function(evt) {
				// Prevent the onLongPress event from firing
				$scope.longPress = false;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchEnd)
					});
				}
			});
		}
	};
})

//Help function
function isEmpty(value) {
	return angular.isUndefined(value) || value === '' || value === null || value !== value;
}