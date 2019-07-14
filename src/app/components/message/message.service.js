// Campaigns service used to communicate Campaigns REST endpoints
(function () {
    'use strict';

    angular
        .module('subscribeCampaign')
        .service('MessageService', MessageService);

    MessageService.$inject = ['$http', 'ApiConstants'];

    function MessageService($http, ApiConstants) {
        this.updateReadMessage = function (message, successCallback, errorCallback) {
            var url = ApiConstants.baseUrl + '/api/messages/' + message._id;
            $http.put(url, message)
                .then(function (response) {
                    if (successCallback) {
                        successCallback(response.data);
                    }
                }, function (response) {
                    if (errorCallback) {
                        errorCallback(response.data);
                    }
                });
        };
        this.getMessageById = function (id, successCallback, errorCallback) {
            var url = ApiConstants.baseUrl + '/api/messages/' + id;
            $http.get(url)
                .then(function (response) {
                    if (successCallback) {
                        successCallback(response.data);
                    }
                }, function (response) {
                    if (errorCallback) {
                        errorCallback(response.data);
                    }
                });
        }
    }
}());