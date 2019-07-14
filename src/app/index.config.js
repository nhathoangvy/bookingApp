(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .config(config)
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
      $httpProvider.interceptors.push('ReferrerInterceptor');
    })
    .config(function ($localStorageProvider) {
      $localStorageProvider.setKeyPrefix('EarlyParrot-');
    })
    .config(function ($urlRouterProvider) {
      $urlRouterProvider.when('', '/');
    });

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
