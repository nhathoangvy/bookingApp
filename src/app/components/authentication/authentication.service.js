(function() {
  'use strict';

  angular
    .module('subscribeCampaign')
    .service('Authentication', Authentication);

  /** @ngInject */
  Authentication.$inject = ['ApiConstants', '$localStorage', '$http', 'CurrentUser'];

  function Authentication(ApiConstants, $localStorage, $http, CurrentUser) {
    this.signout = function () {
      delete $localStorage.user;
      CurrentUser.user = null;
    };

    this.signin = function (credentials, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/subscribers/signin';
      $http.post(url, credentials)
        .then(function (response) {
          $localStorage.user = response.data;
          CurrentUser.user = response.data;
          if (successCallback) {
            successCallback(response.data);
          }
        }, function (response) {
          if (errorCallback) {
            errorCallback(response.data);
          }
        });
    };
/*   this.update = function (credentials, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/subscribers/profile';
      $http.put(url, credentials)
        .then(function (response) {
          CurrentUser.user = response.data;
          if (successCallback) {
            successCallback(response.data);
          }
        }, function (response) {
          if (errorCallback) {
            errorCallback(response.data);
          }
        })
    } */
    this.signup = function (credentials, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/subscribers/signup';
      $http.post(url, credentials)
        .then(function (response) {
          $localStorage.user = response.data;
          CurrentUser.user = response.data;
          if (successCallback) {
            successCallback(response.data);
          }
        }, function (response) {
          if (errorCallback) {
            errorCallback(response.data);
          }
        })
    }

    this.requestPasswordReset = function (credentials, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/subscribers/forgot';
      $http.post(url, credentials)
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

    this.resetPassword = function (token, passwordDetails, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/subscribers/reset/' + token;
      $http.post(url, passwordDetails)
        .then(function (response) {
          $localStorage.user = response.data;
          CurrentUser.user = response.data;
          if (successCallback) {
            successCallback(response.data);
          }
        }, function (response) {
          if (errorCallback) {
            errorCallback(response.data);
          }
        });
    }

    this.confirmSubscribe = function (resetToken, passwordDetails, successCallback, errorCallback) {
      var url = ApiConstants.baseUrl + '/api/subscribers/confirm-subscribe';
      passwordDetails.resetToken = resetToken;
      $http.post(url, passwordDetails)
        .then(function (response) {
          $localStorage.user = response.data;
          CurrentUser.user = response.data;
          if (successCallback) {
            successCallback(response.data);
          }
        }, function (response) {
          if (errorCallback) {
            errorCallback(response.data);
          }
        });
    }

    this.setUserProfile = function (user) {
      $localStorage.user = user;
      CurrentUser.user = user;
    }
  }
})();
