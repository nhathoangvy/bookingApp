(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('AuthenticationController', AuthenticationController);

  /** @ngInject */
  AuthenticationController.$inject = ['$controller', '$scope', '$state', '$http', '$location', 'Authentication', 'ApiConstants', 'CurrentUser', 'StartupsService', '$cookieStore'];

  function AuthenticationController($controller, $scope, $state, $http, $location, Authentication, ApiConstants, CurrentUser, StartupsService, $cookieStore) {
    var vm = this;

    angular.extend($controller('BaseController', {$scope: $scope}));

    // Get an eventual error defined in the URL query string:
    vm.error = $location.search().err;
    vm.credentials = {};
    vm.user = CurrentUser.user;
    // If user is signed in then redirect back home
    if (CurrentUser.user) {
      $state.go('home');
    }
vm.key = {
		name: ''
	};

	vm.search = function (){
		$cookieStore.put("s", vm.key.name);
		return $state.go('search');
	};
    vm.signup = function() {
      vm.error = null;
      Authentication.signup(vm.credentials, function () {
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }, function (error) {
        vm.error = error.message;
      });
    };

    vm.signin = function() {
      vm.error = null;
      Authentication.signin(vm.credentials, function () {
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }, function (error) {
        vm.error = error.message;
      });
    };
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
  };
  
})();
