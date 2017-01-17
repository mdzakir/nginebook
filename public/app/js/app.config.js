angular.module("app.config", [])

.value('apiEndPoint', "http://localhost:7070")
.value('settings', {})

.config(function(cartServiceProvider){
	/*console.log("Default Engine is : ", cartServiceProvider.engine);*/
	//cartServiceProvider.engine = "Session";
	cartServiceProvider.engine = "LocalStorage";
})

.run(function(settings){
	settings.MAX_CART_SIZE=100;
})

.config(function ($urlRouterProvider) {
	$urlRouterProvider
	.otherwise("/home");
});
