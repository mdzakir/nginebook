angular.module('product.components', [])

.component("products", {
    templateUrl: "app/products/templates/products.component.html",
    controller: function(Product) {
        var self = this;
        Product.query()
            .$promise
            .then(function(products) {
                self.products = products;
            })

    },
    controllerAs: "vm"
})

.component("productDetail", {
    templateUrl: "app/products/templates/product-detail.component.html",
    bindings: {
        product: "<"
    },
    controller: function() {
        var self = this;

    }
})