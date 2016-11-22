// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'shop' controller
angular.module('shop').controller('ShopController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Expose the authentication service
		$scope.authentication = Authentication;
	}
]);
