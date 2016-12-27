angular.module("product.directives", [])

// <input ng-model="year" year-validator />
.directive('yearValidator', [function () {
	return {
		restrict: 'A',
		require: "ngModel",
		link: function (scope, iElement, iAttrs, ngModel) {
			console.log("YEAR VALIDATOR LINK");
			ngModel.$validators.validYear = function(modelValue, viewValue){

				console.log("VALIDATE YEAR");

				var value = modelValue || viewValue;

				try {
					var year = parseInt(value);
					if(year >= 2010 && year <= 2016){
						console.log("true");
						return true;
					}
				} catch(e) {
					return false;
				}

				return false;
			}
		}
	};
}])

.directive('productWidget', [function () {
	return {
		restrict: 'AE',
		scope: {
			"product":"=productInfo",
			"addProductToCart":"&addToCart"
		},
		templateUrl: "app/products/templates/product-widget.html",
		link: function (scope, iElement, iAttrs) {
			iElement.bind("mouseenter", function(){
				console.log('mouse enter');
				iElement.removeClass("widget-normal");
				iElement.addClass("widget-highlight");
			});

			iElement.bind("mouseleave", function(){
				console.log('mouse leave');
				iElement.removeClass("widget-highlight");
				iElement.addClass("widget-normal");
			});
		}
	};
}]);