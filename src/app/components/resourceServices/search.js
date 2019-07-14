(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .factory('SearchService', SearchService);

  SearchService.$inject = ['$resource', 'ApiConstants'];

  function SearchService($resource, ApiConstants) {
    var url = ApiConstants.baseUrl + '/api/app/startups';
    return $resource(url, {
      SearchId: '@_id'
    }, {});
  }
}());
