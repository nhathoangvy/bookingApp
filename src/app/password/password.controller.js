(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('PasswordController', PasswordController);

  //PasswordController.$inject = ['$controller','$scope', '$stateParams', '$http', '$state', 'StartupsService', 'CurrentUser', 'Authentication', '$cookieStore'];
  /** @ngInject */
  function PasswordController(Authentication, $controller, $scope, $stateParams, $http, $state, CurrentUser, StartupsService, $cookieStore) {
    var vm = this;
    angular.extend($controller('BaseController', {$scope: $scope}));
vm.user = CurrentUser.user;
    vm.user = CurrentUser.user;
vm.key = {
		name: ''
	};

	vm.search = function (){
		$cookieStore.put("s", vm.key.name);
		return $state.go('search');
	};
    if (vm.user) {
      $state.go('home');
    }
    vm.user = CurrentUser.user;
    // Submit forgotten password account id
    vm.askForPasswordReset = function () {
      vm.success = vm.error = null;

      Authentication.requestPasswordReset(vm.credentials, function (response) {
        vm.credentials = null;
        vm.success = response.message;
      }, function (error) {
        vm.credentials = null;
        vm.error = error.message;
      });
    };

    // Change user password
    vm.resetUserPassword = function () {
      vm.success = vm.error = null;

      Authentication.resetPassword($stateParams.token, vm.passwordDetails, function () {
        vm.passwordDetails = null;
        $state.go('password.reset.success');
      }, function (error) {
        vm.passwordDetails = null;
        vm.error = error.message;
      });
    };

    // Change user password
    vm.confirmSubscribe = function () {
      vm.success = vm.error = null;

      Authentication.confirmSubscribe($stateParams.token, vm.passwordDetails, function () {
        vm.passwordDetails = null;
        $state.go('password.reset.success');
      }, function (error) {
        vm.passwordDetails = null;
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
  }
})();
