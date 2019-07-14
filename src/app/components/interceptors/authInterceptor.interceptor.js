(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .factory('AuthInterceptor', AuthInterceptor);

  /** @ngInject */
  AuthInterceptor.$inject = ['$location', '$q', 'CurrentUser', '$localStorage', 'ApiConstants'];

  function AuthInterceptor($location, $q, CurrentUser, $localStorage, ApiConstants) {
    var interceptor = {
      request: function(config) {
        if (config.url.indexOf(ApiConstants.baseUrl) !== -1 && CurrentUser.user) {
          config.headers["early-parrot-token"] = CurrentUser.user.token;
        }
        return config;
      },
      responseError: function(rejection) {
        if (rejection.status === 403) {
          CurrentUser.user = null;
          delete $localStorage.user;
          $location.path("/");
        }
        return $q.reject(rejection);
      }
    };

    return interceptor;
  }
})();
