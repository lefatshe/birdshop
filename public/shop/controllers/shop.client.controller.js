// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'shop' controller
angular.module('shop').controller('ShopController', ['$scope', 'Authentication', 'ngCart',
	function($scope, Authentication, ngCart) {
		ngCart.setTaxRate(7.5);
    	ngCart.setShipping(2.99);  
		// Expose the authentication service
		$scope.authentication = Authentication;
	}
]);
