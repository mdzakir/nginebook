angular.module("product.controllers", [
	"product.module"
])
.controller('ProductListController', function ($scope, $http, Product, cartService) {
	Product.query(function(products){
		$scope.products = products;
	});
    
    $scope.addToCart = function(product){
		console.log("NAME : " +product.name)
    	cartService.addToCart(product);
    }
})
.controller('ProductViewController', ["$state", "$scope", "$http", "$stateParams", "Product", function ($state, $scope, $http, $stateParams, Product) {
	Product.get({id:$stateParams.id}, function(product){
		$scope.product = product;
	});

	$scope.goToProductList = function(){
    	$state.go("products.list");
    }

    $scope.editProduct = function(id){
    	$state.go("products.edit", {"id" : id});
    }

}])

.controller('ProductEditController', ["$state", "$scope", "$http", "$stateParams", "Product", function ($state, $scope, $http, $stateParams, Product) {
	
	if($stateParams.id){
		Product.get({id:$stateParams.id}, function(product){
			$scope.product = product;
		});
	}else{
		$scope.product = new Product();
	}


	$scope.productNameChanged = function(){
		
	};

	$scope.saveProduct = function(id){
    	
		$scope.product.$save(function(productSaved){
			console.log("Product Saved!!!");
		})

    };

}])