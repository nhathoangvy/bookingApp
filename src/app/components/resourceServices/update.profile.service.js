	(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .service('updateProfile', updateProfile);
	 updateProfile.$inject = ['$resource', 'ApiConstants'];
	function updateProfile ($resource, ApiConstants){
	return $resource(ApiConstants.baseUrl + '/api/subscribers/profile',{},{
        update: {
            method: 'PUT'
        }
    });
	}
	
	}());