(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('UserProfileController', UserProfileController);

  UserProfileController.$inject = ['Authentication', '$controller', 'DataService', 'CurrentUser', 'StartupsService', '$scope', '$state', '$cookieStore', '$http', 'ApiConstants', '$stateParams', 'updateProfile'];

  /** @ngInject */
  function UserProfileController(Authentication, $controller, DataService, CurrentUser, StartupsService, $scope, $state, $cookieStore, $http, ApiConstants, $stateParams, updateProfile ) {
    var vm = this;
    angular.extend($controller('BaseController', {$scope: $scope}));
    vm.user = CurrentUser.user;
	vm.key = {
		name: ''
	};

	vm.search = function (){
		$cookieStore.put("s", vm.key.name);
		return $state.go('search');
	};
	    vm.signout = function () {
      Authentication.signout();
      $state.reload();
    }
	    vm.signin = function() {
      vm.error = null;
      Authentication.signin(vm.credentials, function () {
          $state.reload();
      }, function (error) {
        //vm.error = error.message;
		$state.go('home');
      });
    };

	  $scope.update=function(){
        $scope.profile.$update(function(){
            $state.go('users.myProfile');
        });
    };
	    $scope.load=function(){
        $scope.profile = updateProfile.get({id:$stateParams.id});
    };

    $scope.load();
	
/*     $scope.update = function(){
        $scope.profile.$update(function(){
            $state.go('users.myProfile');
        });
    };
 $scope.load = function(){
        $scope.profile = updateProfile.get({id:$stateParams.id});
    };

    $scope.load(); */
/* 	     $scope.edit = function () {
            var data = $.param({
				avatar: $scope.avatar,
                title: $scope.title,
                tel: $scope.tel,
                skype: $scope.skype,
				local: $scope.local,
				timezone: $scope.timezone
            });

            $http.put(ApiConstants.baseUrl + '/api/subscribers/profile',JSON.stringify(data))
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
            })
            .error(function (data, status, header, config) {
             $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
	  	  }; */
    DataService.myProfile(function (profile) {
      vm.profile = profile;
    }, function (error) {
      alert(error.message);
    });
	 vm.paginateOptions = {
      limit: 10,
      page: 1
    };

    vm.query = function() {
      var options = {
        paiginate: vm.paginateOptions
      };
      if ($scope.searchString) {
        options.fullsearch = $scope.searchString;
      }
      vm.startups = StartupsService.query(options, function (startups, header) {
        vm.total = header('X-Total-Count');
      });
    };
  }
})();
