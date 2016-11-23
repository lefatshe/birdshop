// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Bird = mongoose.model('Bird');

// Create a new error handling controller method
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create a new controller method that creates new birds
exports.create = function(req, res) {
	// Create a new bird object
	var bird = new Bird(req.body);

	// Set the bird's 'creator' property
	bird.creator = req.user;

	// Try saving the bird
	bird.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the bird 
			res.json(bird);
		}
	});
};

// Create a new controller method that retrieves a list of birds
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of birds
	Bird.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, birds) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the bird 
			res.json(birds);
		}
	});
};

// Create a new controller method that returns an existing bird
exports.read = function(req, res) {
	res.json(req.bird);
};

// Create a new controller method that updates an existing bird
exports.update = function(req, res) {
	// Get the bird from the 'request' object
	var bird = req.bird;

	// Update the bird fields
	bird.title = req.body.title;
	bird.subtitle = req.body.subtitle;
	bird.content = req.body.content;
	bird.price = req.body.price;
	bird.preprice = req.body.preprice;
	bird.img = req.body.img;

	// Try saving the updated bird
	bird.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the bird 
			res.json(bird);
		}
	});
};

// Create a new controller method that delete an existing bird
exports.delete = function(req, res) {
	// Get the bird from the 'request' object
	var bird = req.bird;

	// Use the model 'remove' method to delete the bird
	bird.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the bird 
			res.json(bird);
		}
	});
};

// Create a new controller middleware that retrieves a single existing bird
exports.articleByID = function(req, res, next, id) {
	// Use the model 'findById' method to find a single bird 
	Bird.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, bird) {
		if (err) return next(err);
		if (!bird) return next(new Error('Failed to load bird ' + id));

		// If an bird is found use the 'request' object to pass it to the next middleware
		req.bird = bird;

		// Call the next middleware
		next();
	});
};

// Create a new controller middleware that is used to authorize an bird operation 
exports.hasAuthorization = function(req, res, next) {
	// If the current user is not the creator of the bird send the appropriate error message
	if (req.bird.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	// Call the next middleware
	next();
};