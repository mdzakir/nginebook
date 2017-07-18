angular.module("rules.config", [])
.config(function ($stateProvider) {
	$stateProvider
	.state("base.rules", {
		url : "/rules",
		templateUrl : "app/rules/templates/rules.html",
		resolve: {
			hotelId: function(AppContext) {
                return AppContext.getHotelId();
            },
			viewRooms : function(ManageRules, hotelId){
				return ManageRules.getRooms(hotelId);
			},
            viewRules : function(ManageRules, hotelId){
                return ManageRules.getRules(hotelId);
            },
			getRuleForEdit : function($stateParams, ManageRules, hotelId) {
                if ($stateParams.roomId) {
                    return ManageRules.getRule(hotelId, $stateParams.roomId);
                }
                return {};
            },
		},
		controller : "RulesController"
	})
    .state('base.create-rule', {
        url: '/create-rule/:id',
        templateUrl: 'app/rules/templates/create-rule.html',
        resolve: {
            hotelId: function(AppContext) {
                return AppContext.getHotelId();
            },
            viewRooms : function(ManageRules, hotelId){
                return ManageRules.getRooms(hotelId);
            },
            rule: function ($stateParams, ManageRules, hotelId) {
                if ($stateParams.id) {
                    return ManageRules.getRule(hotelId, $stateParams.id);
                }
                return {};
            }
        },
        controller: 'CreateRuleController'
    });
})
.factory('ManageRules', function ($http, $q, apiEndPoint) {
    return {
        getRooms : function(hotelId){
            var deferred = $q.defer();
            var viewrooms = deferred.promise;
            $http.get(apiEndPoint + '/room/view?hotel_id='+hotelId+'&status=1').then(function(response) {
                var viewrooms = response.data;
                deferred.resolve(viewrooms);
            }, function(error) {
                viewrooms = null;
                deferred.reject(error);
            });
            return viewrooms;
        },
        getRules : function(hotelId){
            var deferred = $q.defer();
            var viewrooms = deferred.promise;
            $http.get(apiEndPoint + '/rule/view?hotel_id='+hotelId+'&status=1').then(function(response) {
                var viewrooms = response.data;
                deferred.resolve(viewrooms);
            }, function(error) {
                viewrooms = null;
                deferred.reject(error);
            });
            return viewrooms;
        },
        getRule: function(hotelId, roomId) {
            var deferred = $q.defer();
            var room = deferred.promise;
            $http.get(apiEndPoint + '/rule/view', {
                    params: {
                        hotel_id: hotelId,
                        room_id: roomId,
                        status: 1

                    }
                })
                .then(function(response) {
                    var room = response.data;
                    deferred.resolve(room);
                }, function(error) {
                    room = null;
                    deferred.reject(error);
                });
            return room;
        },
        save: function (params, isAdd, callback) {
            var post_url = isAdd ? apiEndPoint + '/rule/create/' : apiEndPoint + '/rule/edit/' ;
            $http.post(post_url, angular.toJson(params, true))
                .then(function () {
                    callback();
                });
        },
        deleteRule: function (params, callback) {
            var post_url = apiEndPoint + '/rule/updateStatus?hotel_id='+hotelId+'&room_id='+params.room_id+'&status=3';
            $http.get(post_url)
                .then(function () {
                    callback();
                });
        }
    };
})