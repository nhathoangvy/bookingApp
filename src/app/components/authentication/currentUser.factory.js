(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .factory('CurrentUser', CurrentUser);

  /** @ngInject */
  function CurrentUser($localStorage) {
    var auth = {
      user: $localStorage.user
    };

    return auth;
  }
})();
