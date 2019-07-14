(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('SubscribeIframeController', SubscribeIframeController);

  SubscribeIframeController.$inject = ['campaignResolve', 'DataService', '$log', '$location', '$window', 'Authentication'];

  /** @ngInject */
  function SubscribeIframeController(campaign, DataService, $log, $location, $window, Authentication) {
    var vm = this;
    vm.campaign = campaign;
    vm.subscribeInfo = {
      referral: $location.search().referral
    };
    vm.subscribe = subscribe;

    function subscribe() {
      vm.errorMessage = '';
      DataService.subscribe(vm.campaign.id, vm.subscribeInfo, function (userInfo) {
        Authentication.setUserProfile(userInfo);
        $window.top.location.href = vm.campaign.iframeRedirectUrl;
      }, function (error) {
        vm.errorMessage = error.message;
      })
    }
  }
})();
