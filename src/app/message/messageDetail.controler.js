(function () {
    'use strict';

    angular
        .module('subscribeCampaign')
        .controller('MessageDetailController', MessageDetailController);

    MessageDetailController.$inject = ['$controller','$scope', '$stateParams', 'FirebaseService'];

    function MessageDetailController($controller, $scope, $stateParams, FirebaseService) {
        var vm = this;
        angular.extend(vm, $controller('BaseController', {$scope: $scope}));

        vm.message = $stateParams.message;
        vm.send = send;
        function send() {
            var date = Math.floor(Date.now() / 1000);
            var now = new Date().getTime();
            var ref = FirebaseService.initFirebase().ref('campaigns/inbox/' + vm.message.campaignId);
            var groupReceiver = {
                campaignId: vm.message.campaignId,
                campaignName: vm.message.campaignName,
                subscriber: vm.message.subscriber,
                email: vm.message.email,
                message: vm.messageReply,
                messageId: vm.message.messageId,
                date: date,
                time: now
            };
            ref.push().set(groupReceiver).then(function () {
                vm.messageReply = '';
                $scope.$apply();
            }, function (err) {
                // console.log(err);
                alert(err);
            });
        }
    }
})();
