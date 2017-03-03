(function() {
    angular.module('knights')
        .factory('User', function($http, $window, $rootScope, eventsTracker, CacheFactory, $cookies) {
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
                    return $http.post('/user/auth', params).then(function (response) {
                        $http.post('/user/login_email_alert', params).then(function (email_response) {
                        }, function (email_response) {});

                        user = {name: email, authenticated: true};
                        eventsTracker.logEvent('loggedin');
                        that.setToken(response.data.token);
                        that.setEmail(email);
                        that.setUserConfig(response.data.config);
                        that.setUserName(response.data.user.username);
                        that.setHotelConfig(response.data.hotel_config);
                        that.setCurrencyIsoCode(response.data.currency_iso_code);
                        that.setPmsConfig(response.data.is_pms);
                        that.setHotelID(response.data.hotel_id);
                        that.setPricingToggle(response.data.config);
                        that.setHotelPmsID(response.data.hotel_pms_id);
                        $rootScope.$broadcast('userLoggedIn');
                    }, function(response) {
                        that.setToken('invalid');
                    });
                },
                logout: function() {
                    eventsTracker.logEvent('loggedout');
                    this.setToken();
                    this.setUserConfig();
                    CacheFactory.destroyAll();
                    $rootScope.$broadcast('userLoggedOut');
                },
                multiappLogin: function(token) {
                    var params = { token : token };
                    var that = this;
                    return $http.post('/user/multipleauth', params).then(function (response) {
                        $http.post('/user/login_email_alert', params).then(function (email_response) {
                        }, function (email_response) {});
                        var resp_email = response.data.email;
                        user = {name: resp_email, authenticated: true};
                        eventsTracker.logEvent('loggedin');
                        that.setToken(response.data.token);
                        that.setEmail(resp_email);
                        that.setUserConfig(response.data.config);
                        that.setUserName(response.data.user.username);
                        that.setHotelConfig(response.data.hotel_config);
                        that.setCurrencyIsoCode(response.data.currency_iso_code);
                        that.setPmsConfig(response.data.is_pms);
                        that.setHotelID(response.data.hotel_id);
                        that.setPricingToggle(response.data.config);
                        that.setHotelPmsID(response.data.hotel_pms_id);
                        $rootScope.$broadcast('userLoggedIn');
                    }, function(response) {
                        that.setToken('invalid');
                    });
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
})();

