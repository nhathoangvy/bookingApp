(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('contactController', contactController);

  /** @ngInject */
  function contactController($controller, CurrentUser, Authentication, $state, $location, StartupsService, $scope, $cookieStore) {
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
    };

    vm.signin = function() {
      vm.error = null;
      Authentication.signin(vm.credentials, function () {
          $state.reload();
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
