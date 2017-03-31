angular.module("productApp", [
    "ui.router",
    "ui.bootstrap",
    "cart.module",
    "login.module",
    "app.config",
    "app.controllers",
    "base.module",
    "home.module",
    "bookings.module",
    "rooms.module",
    "rateplans.module",
    "inventory.module",
    "pricing.module",
    "deals.module",
    "angular-cache",
    "ngCookies",
    "promotions.module",
    "manual-booking.module",
    "product.module",
    "about.module",
    "ngResource",
    "upload-images.module"
])

.constant('DEBUG', true)

.run(function($rootScope) {
    $rootScope.appTitle = "Admin";
    $rootScope.title = "Admin";
})

.run(function(DEBUG) {})

.run(function($rootScope) {
        $rootScope.$on("pageTitleChanged", function($event, title) {
            $rootScope.pageTitle = title;
        })
    })
    .factory('User', function($http, $window, $rootScope, CacheFactory, $cookies, apiEndPoint) {
        var user = null;
        var store = $window.localStorage;
        var token_key = 'auth-token';
        var email = 'email';
        var user_config = 'user_config';
        var username = 'user_name';
        var currency_code = 'currency_code';
        var currency_iso_code = "currency_iso_code";
        var is_pms = 'is_pms';
        var ToggleConfig = 'active_rules_toggle';
        var ExpandCollapseRulesConfig = 'toggleRules_expand_collapse';
        var HotelID = 'hotelid';
        var HotelPmsID = 'hotel_pms_id';
        var RoomID = 'selected_room_id';
        var selectedRuleType = 'selected_rule_type';

        return {
            login: function(email, password) {
                var params = { email: email, password: password };
                var that = this;
                return $http.post(apiEndPoint + '/user/auth', params).then(function(response) {

                    user = { name: email, authenticated: true };
                    that.setToken(response.data.token);
                    that.setEmail(email);
                    //that.setHotelID(response.data.hotel_id);
                    $rootScope.$broadcast('userLoggedIn');
                }, function(response) {
                    that.setToken('invalid');
                });
            },
            logout: function() {
                this.setToken();
                this.setUserConfig();
                CacheFactory.destroyAll();
                $rootScope.$broadcast('userLoggedOut');
            },

            getEmail: function() {
                return store.getItem(email);
            },
            setEmail: function(email_id) {
                store.setItem(email, email_id);
            },
            getToken: function() {
                return store.getItem(token_key);
            },
            setToken: function(token) {
                if (token) {
                    store.setItem(token_key, token);
                } else {
                    user = { authenticated: false };
                    store.removeItem(token_key);
                    store.clear();
                }
            },
            getHotelID: function() {
                return JSON.parse(store.getItem(HotelID));
            },
            setHotelID: function(config) {
                store.setItem(HotelID, JSON.stringify(config));
            }
        };
    })
    .factory('AuthInterceptor', function($injector, $rootScope, $q) {
        return {
            request: function(config) {
                var User = $injector.get('User');
                var token = User.getToken();

                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'JWT ' + token;
                }
                return config;
            },
            responseError: function(rejection) {
                var User = $injector.get('User');
                if (rejection.status === 401 || rejection.status === 403) {
                    User.setToken();
                }
                return $q.reject(rejection);
            },
            response: function(response) {

                return response;
            }
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
