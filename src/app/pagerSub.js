var pages = angular.module('pagerSub', []);

pages.controller('paginationSub', ['$scope', 'StartupsService', '$http', 'ApiConstants' , function($scope, StartupsService, $http, ApiConstants) {
      $scope.currentPageA = -1;
    $scope.pageSizeA = 9;
    $scope.dataA = [];
    $scope.numberOfPagesA=function(){
        return Math.ceil($scope.dataA.length/$scope.pageSizeA);                
    }
		$http.get(ApiConstants.baseUrl + '/api/subscribers/profile')
	   .then(function(response){
	$scope.page = response.data;
	    for (var i=0; i<$scope.page.campaigns.length; i++) {
        $scope.dataA.push("Item "+i);
    }
	   }).then(function(){
		   	    $scope.pageNumA = Number(($scope.dataA.length/$scope.pageSizeA).toFixed(1));
    $scope.mA = $scope.pageNumA  - Math.floor($scope.pageNumA);
    if($scope.mA > 0){
    $scope.pA = Number(($scope.pageNumA + 1).toFixed(0)) + 1;
    }else{
		$scope.pA = Number(($scope.pageNumA).toFixed(0));
	}
    $scope.getNumberA = function(numm) {
        return new Array(numm);   
    }
		   
	   });
}
]);

pages.filter('startFr', function() {
    return function(input, start) {
        start = +start; //parse to int
		if (!input || !input.length) { return; } 
        return input.slice(start);
    }
});