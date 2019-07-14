(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('SocialshareController', SocialshareController);

  SocialshareController.$inject = ['Authentication', 'CurrentUser', 'CampaignsService', '$state', '$scope', '$http', 'ApiConstants', '$controller', '$location', '$cookieStore', 'StartupsService', 'Socialshare'];

  function SocialshareController(Authentication, CurrentUser, CampaignsService, $state, $scope, $http, ApiConstants, $controller, $location, $cookieStore, StartupsService, Socialshare) {
    var vm = this;
vm.user = CurrentUser.user;
   angular.extend($controller('BaseController', {$scope: $scope}));

    var shareUrl, shareMessage;
	  var part = $location.path();
		var campID = part.replace(/.*\//, '');
		
/*     vm.init = function (campaignController) {
      vm.campaign = campaignController.campaign;
      shareUrl = $state.href('campaigns.subscribe', {
        referral: CurrentUser.user ? CurrentUser.user.username : null,
        campaignId: campID
      }, {
        absolute: true
      });
      shareMessage = vm.campaign.shareMessage
    } */

   $http.get(ApiConstants.baseUrl + '/api/app/campaigns/' + campID + '/total-subscribers')
	   .then(function(response){
        $scope.camps = response.data;
      }); 
	  $http.get(ApiConstants.baseUrl + '/api/app/campaigns/' + campID)
	   .then(function(response){
        $scope.cams = response.data;
		document.title = $scope.cams.name;
      }); 
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
   vm.query = function() {
      var options = {
        paiginate: vm.paginateOptions
      };
      if ($scope.searchString) {
        options.fullsearch = $scope.searchString;
      }
      vm.camps = CampaignsService.query(options, function (startups, header) {
        vm.total = header('X-Total-Count');
      });
    };
  //  vm.isMobileDevice = deviceDetector.isMobile();

    vm.share = function (socialNetwork) {
      Socialshare.share({
        'provider': socialNetwork,
        'attrs': {
          'socialshareUrl': shareUrl,
          'socialshareText': shareMessage
        }
      });
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
  };
  
})();
