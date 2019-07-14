(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('GoogleApiController', GoogleApiController);

  GoogleApiController.$inject = ['$scope', '$compile', '$http', '$timeout', '$log', 'lodash', 'ApiConstants', '$state', 'Notification'];

  /** @ngInject */
  function GoogleApiController($scope, $compile, $http, $timeout, $log, _, ApiConstants, $state, Notification) {
    var vm = this;
    //angular.extend(vm, $controller('BaseController', {$scope: $scope}));

    var clientId = '238348182549-l0tnvro59shlpgq063out7vqbt8nseje.apps.googleusercontent.com';
    var apiKey = 'yh7QdIZwrHgHZbsTM4B2qOoc';
    var scopes = 'https://www.googleapis.com/auth/contacts.readonly';

    vm.init = function (campaignController) {
      vm.campaign = campaignController.campaign;
    }

    vm.selected = {};
    vm.selectAll = false;
    vm.invite = invite;

    vm.handleAuthorization = function (authorizationResult) {
      if (authorizationResult && !authorizationResult.error) {
        vm.isAuthorized = true;
        $http.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=500&v=3.0")
          .then(function (response) {
            //process the response here
            vm.contacts = []
            _.each(response.data.feed.entry, function (contact, index) {
              var email = contact.gd$email ? contact.gd$email[0].address : null;
              if (email) {
                vm.selected[email] = false;
                vm.contacts.push({
                  id: index,
                  email: email,
                  name: contact.gd$name ? contact.gd$name.gd$fullName.$t : ""
                });
              }
            });

            $timeout(function () {
              $('#google-contacts').DataTable();
            });
          }, function (response) {
            $log.error(response.data.message);
          });
      }
    }

    vm.authorize = function () {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
      }, vm.handleAuthorization);
    }

    vm.getContact = function () {
      gapi.client.setApiKey(apiKey);
      $timeout(vm.authorize);
    }

    $scope.$watch('google.selectAll', function (newVal) {
      _.each(vm.contacts, function (contact) {
        vm.selected[contact.email] = newVal;
      })
    });

    function invite() {
      var listEmail = [];
      _.each(vm.selected, function (value, key) {
        if (value) {
          listEmail.push(key);
        }
      });

      var url = ApiConstants.baseUrl + '/api/campaigns/' + vm.campaign._id + '/invite';
      $http.post(url, {
          emails: listEmail
        })
        .then(function () {
          Notification.success('Invite succeeded');
          $state.go('campaigns.thank');
        }, function (response) {
          $log.error(response.data);
        });
    }
  }
})();
