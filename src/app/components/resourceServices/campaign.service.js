// Campaigns service used to communicate Campaigns REST endpoints
(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .factory('CampaignsService', CampaignsService);

  CampaignsService.$inject = ['$resource', 'ApiConstants'];

  function CampaignsService($resource, ApiConstants) {
    var url = ApiConstants.baseUrl + '/api/campaigns/:campaignId';
    return $resource(url, {
      campaignId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getNumberOfReferrals: {
        method: 'GET',
        url: url + '/referrals'
      }
    });
  }
}());
