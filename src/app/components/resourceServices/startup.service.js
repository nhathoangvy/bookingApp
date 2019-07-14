(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .factory('StartupsService', StartupsService);

  StartupsService.$inject = ['$resource', 'ApiConstants'];

  function StartupsService($resource, ApiConstants) {
    var url = ApiConstants.baseUrl + '/api/app/startups/:startupId';
    return $resource(url, {
      startupId: '@_id'
    }, {});
  }
}());
