function StorageEngine(storage){
	this.addToCart = function(product) {
		storage.setItem("product."+product.id, JSON.stringify(product));
	};
	this.removeFromCart = function(id) {
		storage.setItem("product."+id);
	};
	this.getProducts = function() {
		var products = [];
		for (var key in storage) {
			if(key.indexOf("product.") > -1) {
				products.push(JSON.parse(storage.getItem(key)));
			}
		}
		return products;
	}
}

angular.module("cart.services", [])

.provider("cartService", function(){
	
	this.engine = "Session";

	/*console.log("cartService default provider");*/

	
	this.$get = function(){
		
		var storageEngine = null;

		/*console.log("cartService $get");*/

		if(this.engine == "Session")
			storageEngine = new StorageEngine(window.sessionStorage);
		else if(this.engine == "LocalStorage")
			storageEngine = new StorageEngine(window.localStorage);
		
		return {
			addToCart : function(product){
				storageEngine.addToCart(product);
			},
			removeFromCart : function(id){
				storageEngine.removeFromCart(id);
			},
			getProducts : function(){
				return storageEngine.getProducts();
			},
		}
	}
})

function LocalStorageEngine(){
	var storage = new StorageEngine(window.localStorage);
}