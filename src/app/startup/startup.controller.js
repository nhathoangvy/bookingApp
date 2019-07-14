(function () {
  'use strict';

  // Startups controller
  angular
    .module('subscribeCampaign')
    .controller('StartupsController', StartupsController);

  StartupsController.$inject = ['Authentication', '$controller','startupResolve', 'CurrentUser', '$location', 'StartupsService', '$scope', '$state', '$cookieStore', '$http', 'ApiConstants'];

  function StartupsController(Authentication, $controller, startup, CurrentUser, $location, StartupsService, $scope, $state, $cookieStore, $http, ApiConstants) {
    var vm = this;
    angular.extend($controller('BaseController', {$scope: $scope}));
	
    vm.error = $location.search().err;
    vm.credentials = {};

    vm.user = CurrentUser.user;
    vm.startup = startup;
	vm.key = {
		name: ''
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
	vm.search = function (){
		$cookieStore.put("s", vm.key.name);
		return $state.go('search');
	};

	var arrC = [];
	     $http.get(ApiConstants.baseUrl + '/api/app/startups/' + vm.startup._id + '/campaigns')
	   .then(function(response){
        $scope.camps = response.data;
		var ar = response.data;
		for(var i = 0; i <= ar.campaignsList.length; i++){
			if(ar.campaignsList[i].id){
				arrC.push(ar.campaignsList[i].id);
			}
			return;
		}
}).then(function(){
	for(var j = 0; j <= arrC.length; j++){
		if(arrC[j]){
			var campID = arrC[j];
		}
	}
			 $http.get(ApiConstants.baseUrl + '/api/app/campaigns/' + campID)
	   .then(function(response){
        $scope.cams = response.data;
		});
		});
      $http.get(ApiConstants.baseUrl + '/api/app/startups/' + vm.startup._id)
	   .then(function(response){
	$scope.page = response.data;
	document.title = $scope.page.name;
	   });
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
