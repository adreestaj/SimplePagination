eshopApp.component('homePlanChannelsComponent', {
	templateUrl : '/b2c/eshopApp/components/viewProducts/viewHomePlans/channels.view.jsp',
	bindings : {
		
	},
	controller : function($state,$scope,viewProductsService,deviceConfigurationService,googleAnalyticService,$location,$filter){
		var ctrl = this;
		
		$scope.init =function(){
			$scope.seeAll = false;
			$scope.startPage = 0;
			$scope.showMoveLeft = false;
			$scope.showMoveRight = false;
			$scope.reverse = false;
			
		};
		
		ctrl.$onInit = function(){
			$scope.init();
			var channels = $location.search()['productId'];
			ctrl.getChannels();
			ctrl.lang = $location.search()['locale'];
			if(ctrl.lang == null || ctrl.lang == 'EN'){
				ctrl.heroBanner = "/dx_etisalat_ae_stg/en/generic/buyget/buy-get-hero-banner.jsp";
				
			}else if(ctrl.lang == 'AR'){
				ctrl.heroBanner = "/dx_etisalat_ae_stg/en/generic/buyget/buy-get-hero-banner.jsp";
			}
		}
		 $scope.CMSImporantToKnow="/dx_etisalat_ae_stg/en/generic/buyget/buyget_product_overview.jsp",
		 $scope.CMSBenefiteContent="/dx_etisalat_ae_stg/en/generic/buyget/buyget_product_benefits.jsp",
	
		 ctrl.getChannels=function(){
			
			viewProductsService.getChannels().then(function (channelResult) {
				ctrl.channels=channelResult.data;
				$scope.pages = $scope.calculateNumberOfPages(ctrl.channels.length);
				if($scope.pages>4){
					$scope.showMoveRight = true;
				}
				$scope.getFilteredChannels(1);
			}).catch(function (error) {
				$rootScope.showLoader = false;
				console.log("can not getChannels ,error: ", error);
			});
		}
		
		 $scope.calculateNumberOfPages = function (arraySize){
		    	var numberOfPages = Math.floor(arraySize/9);
		    	var remainder = arraySize % 9;
		    	if(remainder>0){
		    		numberOfPages = numberOfPages + 1;
		    	}
		    	return numberOfPages;
		    	
		    };
		    $scope.getFilteredChannels = function (pageNumber){
		    	$scope.channelsSearchValue = "";
		    	$scope.selectedPage = pageNumber;
		    	var start = (pageNumber-1)*9;
		    		var end = pageNumber*9;
		    	ctrl.filteredChannels =  ctrl.channels.filter((channel,index) => (index > start && index <=end));
		    		    	
		    };
		    $scope.onClickSeeAll = function (){
		    	
		    	ctrl.filteredChannels =  ctrl.channels;
		    	$scope.seeAll = true;
		    		    	
		    };
		    $scope.onClickSeeLess = function(){
		    	$scope.seeAll = false;
		    	 $scope.getFilteredChannels($scope.selectedPage);
		    };
		    $scope.onClickLeftArrow = function(){
		    	$scope.startPage = $scope.startPage-1;
		    	if($scope.startPage>=1){
		    		$scope.showMoveLeft = true;
		    	}else{
		    		$scope.showMoveLeft = false;
		    	}
		    	if(($scope.startPage+4)<$scope.pages){
		    		$scope.showMoveRight = true;
		    	}else{
		    		$scope.showMoveRight = false;
		    	}
		    }
		    $scope.onClickRightArrow = function(){
		    	$scope.startPage = $scope.startPage+1;
		    	if($scope.startPage>=1){
		    		$scope.showMoveLeft = true;
		    	}else{
		    		$scope.showMoveLeft = false;
		    	}
		    	if(($scope.startPage+4)<$scope.pages){
		    		$scope.showMoveRight = true;
		    	}else{
		    		$scope.showMoveRight = false;
		    	}
		    }
		    $scope.$watch('channelsSearchValue', function (newValue, oldValue) {
	           
		    	if(newValue===""){
		    		 $scope.getFilteredChannels($scope.selectedPage);
		    		 return;
		    	}

		    	ctrl.filteredChannels = $filter('filter')(ctrl.channels, {'channelName':newValue});
	        });
		 
		    
		    
		 
	}
	
});
 