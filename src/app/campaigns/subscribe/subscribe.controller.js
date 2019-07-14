(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('SubscribeController', SubscribeController);

  SubscribeController.$inject = ['$controller','campaignResolve', 'DataService', '$state', '$log', 'ApiConstants', '$location', 'Authentication', 'Notification', '$scope', '$http', 'StartupsService'];

  /** @ngInject */
  function SubscribeController($controller, campaign, DataService, $state, $log, ApiConstants, $location, Authentication, Notification, $scope, $http, startup, StartupsService) {
    var vm = this;
   angular.extend(vm, $controller('BaseController', {$scope: $scope}));
    
    vm.campaign = campaign;
	vm.startup = startup;
    vm.subscribeInfo = {
      referral: $location.search().referral
    };
    vm.subscribe = subscribe;
	
	     $http.get(ApiConstants.baseUrl + '/api/app/startups/' + vm.startup._id + '/campaigns')
	   .then(function(response){
        $scope.camps = response.data;
      });
	
    function subscribe() {
      vm.errorMessage = '';
      DataService.subscribe(vm.campaign.id, vm.subscribeInfo, function (response) {
        Authentication.setUserProfile(response.user);
        Notification.warning(response.message);
        $state.go('campaigns.socialShare');
      }, function (error) {
        vm.errorMessage = error.message;
      })
    }
  }
})();
