// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Define a new 'BirdSchema'
var BirdSchema = new Schema({

	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	subtitle: {
		type: String,
		default: '',
		trim: true,
		required: 'Sub Title cannot be blank'
	},
	price: {
		type: String,
		default: '',
		required: 'Price cannot be blank'
	},
	preprice: {
		type: String,
		default: '',
		required: 'Previous Price cannot be blank'
	},
	img: {
		type: String,
		default: 'lib/images/default.png',
		trim: true,
		required: 'Image cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

// Create the 'Bird' model out of the 'BirdSchema'
mongoose.model('Bird', BirdSchema);