(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('ReferralController', ReferralController);

  ReferralController.$inject = ['referralResolve'];

  /** @ngInject */
  function ReferralController($controller, referrals) {
    var vm = this;

    angular.extend(vm, $controller('BaseController', {$scope: $scope}));

    vm.referrals = referrals.numOfReferrals;
  }
})();
