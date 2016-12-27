angular.module("product.services", [])

.factory('Product', function ($resource, apiEndPoint){
	return $resource(apiEndPoint+"/api/products/:id");
})