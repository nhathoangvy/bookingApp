(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .run(stateChanges);

  /** @ngInject */
  function stateChanges($rootScope, $state, $location, CurrentUser, $localStorage) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (!fromState.data || !fromState.data.ignoreState) {
        $state.previous = {
          state: fromState,
          params: fromParams,
          href: $state.href(fromState, fromParams)
        };
      }
    });

    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.autoSignin && $location.search().accessToken) {
        var userInfo = { token: $location.search().accessToken };
        CurrentUser.user = userInfo;
        $localStorage.user = userInfo
      }
      if (next.authorized && !CurrentUser.user) {
        event.preventDefault();
        $state.go('auth.signin');
      }
    });
  }
})();
