var page = angular.module('pager', []);

page.controller('pagination', ['$scope','StartupsService', '$http', 'ApiConstants' , function($scope, StartupsService, $http, ApiConstants) {
    $scope.currentPage = -1;
    $scope.pageSize = 9;
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);                
    }
	$http.get(ApiConstants.baseUrl + '/api/app/startups/')
	   .then(function(response){
	$scope.page = response.data;
	    for (var i=0; i<$scope.page.length; i++) {
        $scope.data.push("Item "+i);
    }
	
	   }).then(function(){
		   	    $scope.pageNum = Number(($scope.data.length/$scope.pageSize).toFixed(1));
    $scope.m = $scope.pageNum  - Math.floor($scope.pageNum);
    if($scope.m > 0){
    $scope.p = Number(($scope.pageNum + 1).toFixed(0)) + 1;
    }else{
		$scope.p = Number(($scope.pageNum).toFixed(0));
	}
    $scope.getNumber = function(num) {
        return new Array(num);   
    }
		   
	   });

}
]);

page.filter('startFrom', function() {
    return function($scope, start) {
        start = +start; //parse to int
        return $scope.slice(start);
    }
});