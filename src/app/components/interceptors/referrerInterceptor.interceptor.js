(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .factory('ReferrerInterceptor', ReferrerInterceptor);

  /** @ngInject */
  ReferrerInterceptor.$inject = ['$q', '$location', 'ApiConstants'];

  function ReferrerInterceptor($q, $location, ApiConstants) {
    var interceptor = {
      request: function(config) {
        if (config.url.indexOf(ApiConstants.baseUrl) !== -1) {
          config.headers['early-parrot-http-referrer'] = document.referrer;
          config.headers['early-parrot-refer-user'] = $location.search().referral;
        }
        return config;
      }
    };

    return interceptor;
  }
})();
