(function () {
  'use strict';

  angular
    .module('subscribeCampaign')
    .controller('searchController', searchController)
	.directive("tooltip", tooltip);
  searchController.$inject = ['SearchService', '$state', '$log', 'ApiConstants', 'CurrentUser', '$location', 'Authentication', '$scope', '$http', '$cookieStore', '$controller'];
function searchController(SearchService, $state, $log, ApiConstants, CurrentUser, $location, Authentication, $scope, $http, $cookieStore, $controller) {
    var vm = this;
    //vm.startup = startup;
angular.extend($controller('BaseController', {$scope: $scope}));
    vm.credentials = {};
    vm.user = CurrentUser.user;
	vm.key = {
		name: ''
	};
		var name = $cookieStore.get("s");
     $http.get(ApiConstants.baseUrl + '/api/app/startups?search=' + name)
	   .then(function(response){
        $scope.results = response.data;
      });
	vm.search = function (){
		var nameS = vm.key.name;
       return $http.get(ApiConstants.baseUrl + '/api/app/startups?search=' + nameS)
	   .then(function(response){
        $scope.results = response.data;
      });
	};
    vm.signout = function () {
      Authentication.signout();
      $state.reload();
    };

    vm.signin = function() {
      vm.error = null;
      Authentication.signin(vm.credentials, function () {
          $state.reload();
      }, function (error) {
        vm.error = error.message;
      });
    };
    vm.paginateOptions = {
      limit: 3,
      page: 1
    };


    vm.query = function() {
      var options = {
        paiginate: vm.paginateOptions
      };
      vm.searchings = SearchService.query(options, function (searchings, header) {
        vm.total = header('X-Total-Count');
      });
    };


  }
 function tooltip(){
  return{
    link: function(scope,ele,attr){
     	var $listItems = $('.filterShow li');

$('#sear').keydown(function(e)
{

    var key = e.keyCode,
        $selected = $listItems.filter('.active'),
        $current;

    if ( key != 40 && key != 38 && key != 13) return;

    $listItems.removeClass('active');

    if ( key == 40 ) // Down key
    {
        if ( ! $selected.length || $selected.is(':last-child') ) {
            $current = $listItems.eq(0);
        }
        else {
            $current = $selected.next();
        }
    }
    else if ( key == 38 ) // Up key
    {
        if ( ! $selected.length || $selected.is(':first-child') ) {
            $current = $listItems.last();
        }
        else {
            $current = $selected.prev();
        }
    }
	 else if(e.keyCode == 13 || e.which == 13) {
    $selected.text();
  }        
    $current.addClass('active');
});
    }
  }
};


})();
