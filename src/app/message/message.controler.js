(function () {
    'use strict';

    angular
        .module('subscribeCampaign')
        .controller('MessageController', MessageController);

   MessageController.$inject = ['Authentication', '$controller', '$scope', '$stateParams', '$http', '$state', 'DataService', 'CurrentUser', 'StartupsService', '$cookieStore'];
 /** @ngInject */
    function MessageController(Authentication, $controller, $scope, $stateParams, $http, $state, DataService, CurrentUser, StartupsService, $cookieStore, chatMessages) {
        var vm = this;
        angular.extend($controller('BaseController', {$scope: $scope}));
		angular.extend($controller('chatCtrl', {$scope: $scope}));
        vm.user = CurrentUser.user;
/*         vm.messageItemClick = messageItemClick;
        // if (vm.user) {
        //     $state.go('home');
        // } */
			vm.key = {
		name: ''
	};

	vm.search = function (){
		$cookieStore.put("s", vm.key.name);
		return $state.go('search');
	};
	    vm.signout = function () {
      Authentication.signout();
      $state.reload();
    }
	    vm.signin = function() {
      vm.error = null;
      Authentication.signin(vm.credentials, function () {
          $state.reload();
      }, function (error) {
        vm.error = error.message;
      });
    };
      /*   DataService.myProfile(function (profile) {
            vm.profile = profile;
            var ref = FirebaseService.initFirebase().ref('subscriber/' + profile._id);
            vm.messages = $firebaseArray(ref);
        }, function (error) {
            alert(error.message);
        });

        function messageItemClick(message) {
            if (!message.read) {
                var ref = FirebaseService.initFirebase().ref('subscriber/' + vm.profile._id).child(message.$id);
                ref.update({
                    read: true
                });
                MessageService.getMessageById(message.messageId, function (messageData) {
                    messageData.read++;
                    MessageService.updateReadMessage(messageData, function () {
                    }, function (error) {
                        alert(error.message);
                    });
                }, function (error) {
                    alert(error.message);
                });
            }
            $state.go('messagesDetail', { message: message });
        }; */
		
		    vm.paginateOptions = {
      limit: 10,
      page: 1
    };

    vm.query = function() {
      var options = {
        paiginate: vm.paginateOptions
      };
      if ($scope.searchString) {
        options.fullsearch = $scope.searchString;
      }
      vm.startups = StartupsService.query(options, function (startups, header) {
        vm.total = header('X-Total-Count');
      });
    };


    }
})();
