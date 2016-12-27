angular.module("product.config", [])
.config(function ($stateProvider) {
    $stateProvider
    .state("products", {
        url: "/products",
        templateUrl: "app/products/templates/product-home.html"
    })
    .state("products.list", {
        url:"/list",
        views: {
            "": {
                controller: "ProductListController",
                templateUrl: "app/products/templates/product-list.html"
            },
            "help": {
                template: "<h5>Help Section</h5>"
            }
        }
    })

    .state("products.view", {
    	url:"/view/:id",
    	controller:"ProductViewController",
    	templateUrl:"app/products/templates/product-view.html"
    })

    .state("products.edit", {
        url:"/edit/:id",
        views: {
            "": {
                controller: "ProductEditController",
                templateUrl: "app/products/templates/product-edit.html"
            },
            "help": {
                template: "<h5>Help Section for Edit Page</h5>"
            }
        }
    })

    .state("products.create", {
        url:"/create",
        controller:"ProductEditController",
        templateUrl:"app/products/templates/product-edit.html"
    })

    .state("products.components", {
        url:"/components",
        template: "<products></products>"
    })
})