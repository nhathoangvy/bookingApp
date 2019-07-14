// Campaigns service used to communicate Campaigns REST endpoints
(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .service('DataService', DataService);

  DataService.$inject = ['$resource', 'ApiConstants', '$state', '$http'];

  function DataService($resource, ApiConstants, $state, $http) {
    this.myProfile = function (successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/subscribers/profile';
      return $http.get(url).then(function (response) {
        successCallback(response.data);
      }, function (response) {
        errorCallback(response.data);
      });
    };
	
    this.newVisitEvent = function (campaignId, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/campaigns/' + campaignId + '/visit-event';
      return $http.post(url).then(function (response) {
        successCallback(response.data);
      }, function (response) {
        errorCallback(response.data);
      });
    };

    this.subscribe = function (campaign, data, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/campaigns/' + campaign + '/subscribe';
      $http.post(url, data)
        .then(function (response) {
          successCallback(response.data);
        }, function (response) {
          errorCallback(response.data);
        });
    }
  }
}());
