var page = angular.module('pagerSt', []);

page.controller('paginationSt', ['$scope','StartupsService', '$http', 'ApiConstants', '$location' , function($scope, StartupsService, $http, ApiConstants, $location) {
    $scope.currentPageSt = -1;
    $scope.pageSizeSt = 5;
    $scope.dataSt = [];
	var part = $location.path();
		var stID = part.replace(/.*\//, '');
	
    $scope.numberOfPagesSt=function(){
        return Math.ceil($scope.dataSt.length/$scope.pageSizeSt);                
    }
	
	$http.get(ApiConstants.baseUrl + '/api/app/startups/' + stID + '/campaigns')
	   .then(function(response){
	$scope.pageSt = response.data;
	    for (var i=0; i<$scope.pageSt.campaignsList.length; i++) {
        $scope.dataSt.push("Item "+i);
    }
	
	   }).then(function(){
		   	    $scope.pageNumSt = Number(($scope.dataSt.length/$scope.pageSizeSt).toFixed(1));
    $scope.mSt = $scope.pageNumSt  - Math.floor($scope.pageNumSt);
    if($scope.mSt > 0){
    $scope.pSt = Number(($scope.pageNumSt + 1).toFixed(0)) + 1;
    }else{
		$scope.pSt = Number(($scope.pageNumSt).toFixed(0));
	}
	console.log($scope.pSt);
    $scope.getNumberSt = function(numSt) {
        return new Array(numSt);   
    }
		   
	   });

}
]);

page.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
		if (!input || !input.length) { return; } 
        return input.slice(start);
    }
});