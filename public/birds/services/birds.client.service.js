// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'birds' service
angular.module('birds').factory('Birds', ['$resource', function($resource) {
	// Use the '$resource' service to return an article '$resource' object
    return $resource('api/birds/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);