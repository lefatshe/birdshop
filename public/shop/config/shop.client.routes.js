// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('shop').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'shop/views/shop.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]); 
