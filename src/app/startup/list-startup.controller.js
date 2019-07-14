(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('StartupsListController', StartupsListController);



  function StartupsListController($controller, CurrentUser, Authentication, $state, $location, StartupsService, $scope, $cookieStore, DataService) {
    var vm = this;
    angular.extend($controller('BaseController', {$scope: $scope}));

    //vm.startup = startup;
    vm.error = $location.search().err;
    vm.credentials = {};

    vm.user = CurrentUser.user;
    vm.signout = function () {
      Authentication.signout();
      $state.reload();
    };
	vm.key = {
		name: ''
	};

	vm.search = function (){
		$cookieStore.put("s", vm.key.name);
		return $state.go('search');
	};
    vm.signin = function() {
      vm.error = null;
      Authentication.signin(vm.credentials, function () {
          $state.reload();
      }, function (error) {
        //vm.error = error.message;
		//$state.go('home');
      });
    };
/* 	vm.listProfile = []; */
    DataService.myProfile(function (profile) {
      vm.profile = profile;
/* 	  for(var i = 0; i <= vm.profile.campaigns.length; i++){
		  if(vm.profile.campaigns[i]){
			  vm.listProfile.push(vm.profile.campaigns[i].startup);
		  }
		  return;
	  } */
    }, function (error) {
      $state.go('home');
    });
	
	
 $scope.order = function(x) {
    $scope.OrderBy = x;
  }

    vm.paginateOptions = {
      limit: 3,
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
}());
