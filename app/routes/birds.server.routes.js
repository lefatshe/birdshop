// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
	birds = require('../../app/controllers/birds.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'birds' base routes 
	app.route('/api/birds')
	   .get(birds.list)
	   .post(users.requiresLogin, birds.create);
	
	// Set up the 'birds' parameterized routes
	app.route('/api/birds/:articleId')
	   .get(birds.read)
	   .put(users.requiresLogin, birds.hasAuthorization, birds.update)
	   .delete(users.requiresLogin, birds.hasAuthorization, birds.delete);

	// Set up the 'articleId' parameter middleware   
	app.param('articleId', birds.articleByID);
};