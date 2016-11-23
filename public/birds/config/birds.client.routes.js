// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'articles' module routes
angular.module('birds').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/birds', {
			templateUrl: 'birds/views/list-birds.client.view.html'
		}).
		when('/birds/create', {
			templateUrl: 'birds/views/create-bird.client.view.html'
		}).
		when('/birds/:articleId', {
			templateUrl: 'birds/views/view-bird.client.view.html'
		}).
		when('/birds/:articleId/edit', {
			templateUrl: 'birds/views/edit-bird.client.view.html'
		});
	}
]); 