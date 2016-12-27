angular.module("home.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("home", {
		url : "/home",
		controller : "HomeController",
		templateUrl : "app/home/templates/home.html"
	})
	.state("home-resolve", {
		url: "/home-resolve",
		resolve: {
			brands : function getBrands($http, apiEndPoint){
				return $http.get(apiEndPoint + "/api/brands")
				.then(function(response){
					return response.data;
				})
			},

			states : function getStates($http, apiEndPoint){
				return $http.get(apiEndPoint + "/api/states")
				.then(function(response){
					return response.data;
				})
			},

			cities : function getCities($http, apiEndPoint){
				return $http.get(apiEndPoint + "/api/cities")
				.then(function(response){
					return response.data;
				})
			},

			products : function getProducts(Product){
				return Product.query().$promise;
			}
		},
		templateUrl: "app/home/templates/home.html",
		controller: function($scope, brands, states, cities, products){
			$scope.products = products;
			$scope.brands 	= brands;
			$scope.states 	= states;
			$scope.cities 	= cities;
		}
	})
})