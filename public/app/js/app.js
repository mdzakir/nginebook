angular.module("productApp", [
    "ui.router",
    "ui.bootstrap",
    "ui.select",
    "chart.js",
    "cart.module",
    "login.module",
    "app.config",
    "app.controllers",
    "base.module",
    "home.module",
    "manual-bookings.module",
    "online-bookings.module",
    "rules.module",
    "rooms.module",
    "rateplans.module",
    "inventory.module",
    "pricing.module",
    "deals.module",
    "angular-cache",
    "ngCookies",
    "promotions.module",
    "taxes.module",
    "addOns.module",
    "contract.module",
    "activity.module",
    "create-manual-booking.module",
    "product.module",
    "about.module",
    "ngResource",
    "upload-images.module",
    "ngFileUpload"
])

.constant('DEBUG', true)

.run(function($rootScope) {
    $rootScope.appTitle = "Admin";
    $rootScope.title = "Admin";
})

.run(function(DEBUG) {})
.constant('startState', 'base.home')
.config(function($urlRouterProvider, startState) {
    $urlRouterProvider.otherwise(function($injector) {
        var state = $injector.get('$state');
        state.go(startState);
    });
})
.run(function($rootScope, $state, startState) {
    $rootScope.$on('userLoggedIn', function() {
        $state.go(startState);
    });
    $rootScope.$on('userLoggedOut', function() {
        $state.go('login');
    });
    $rootScope.$on('authenticationRequired', function() {
        $state.go('login');
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error);
    });
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        // if(loggedIn) {
        //     $state.go('app.dashboard');
        // }
        $rootScope.$on('userLoggedIn', function() {
            $state.go(startState);
        });
        // if (toState.module === 'base' && !$cookies.Session) {
        //     // If logged out and transitioning to a logged in page:
        //     e.preventDefault();
        //     $state.go('login');
        // } else if (toState.module === 'login' && $cookies.Session) {
        //     // If logged in and transitioning to a logged out page:
        //     e.preventDefault();
        //     $state.go(toState);
        // };
    });
})


.run(function($rootScope) {
        $rootScope.$on("pageTitleChanged", function($event, title) {
            $rootScope.pageTitle = title;
        })
    })
    .factory('User', function($http, $window, $rootScope, $cookies, apiEndPoint) {
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

                    debugger;
                    user = { name: email, authenticated: true };
                    that.setToken(response.data.token);
                    that.setEmail(email);
                    that.setUserConfig(response.config.data);
                    that.setUserName(response.config.data.email);

                    //that.setHotelConfig(response.data.hotel_config);
                    that.setHotelID(response.data.hotel_id);
                    $rootScope.$broadcast('userLoggedIn');
                }, function(response) {
                    that.setToken('invalid');
                });
            },
            logout: function() {
                this.setToken();
                this.setUserConfig();
                $rootScope.$broadcast('userLoggedOut');
            },

            getEmail: function() {
                return store.getItem(email);
            },
            setEmail: function(email_id) {
                store.setItem(email, email_id);
            },
            setHotelConfig: function(config) {
                store.setItem(currency_code, JSON.stringify(config));
            },
            getUserName: function() {
                return JSON.parse(store.getItem(username));
            },
            setUserName: function(config) {
                store.setItem(username, JSON.stringify(config));
            },
            getUserConfig: function() {
                return JSON.parse(store.getItem(user_config));
            },
            setUserConfig: function(config) {
                store.setItem(user_config, JSON.stringify(config));
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
                    if (rejection.config.url != "/user/multipleauth") {
                        $rootScope.$broadcast('authenticationRequired');
                    }
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
