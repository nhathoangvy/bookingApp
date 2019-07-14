     var app = angular.module('chatapp', ['firebase']); 
app.controller('chatCtrl', ['$scope', '$firebase',
    function($scope, $firebase) {
        $scope.chatMessage = "";
        var ref = new Firebase("https://abcd-e5304.firebaseio.com/");
        var sync = $firebase(ref);
        $scope.chatMessages = sync.$asArray();
        $scope.sendChat = function() {
            var chatMessage = {
                message: $scope.chatMes
            };
            $scope.chatMessages.$add(chatMessage);
            $scope.chatMes = "";
        }
    }
]);