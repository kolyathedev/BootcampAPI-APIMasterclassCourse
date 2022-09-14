const mongoose = require('mongoose')

const CampSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please ensure name added!'],
		unique: true,
		trim: true,
		maxLength: [50, 'No more than 50 characters'],
	},
	slug: String,
	description: {
		type: String,
		required: [true, 'Please ensure description added!'],

		maxLength: [500, 'No more than 500 characters'],
	},
	website: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'Please ensure a valid URL with HTTP or HTTPS',
		],
	},
	phone: {
		type: String,
		maxLength: [20, 'Phone number cannot be longer than 20 chars'],
	},
	email: {
		type: String,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please ensure that email is a valid email',
		],
	},
	address: {
		type: String,
		required: [true, 'Please add a location'],
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
		},
		coordinates: {
			type: [Number],

			index: '2dsphere',
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		postcode: String,
		country: String,
	},
	belts: {
		// Array of strings, what belts the camp is available for
		type: [String],
		required: true,
		// enum just means which values are the only ones available
		enum: ['White', 'Blue', 'Purple', 'Brown', 'Black'],
	},
	averageRating: {
		type: Number,
		min: [1, 'Rating must be at least 1'],
		max: [10, 'Rating can not be more than 100'],
	},
	averageCost: Number,
	photo: {
		type: String,
		default: 'no-photo.jpg',
	},
	accomodation: {
		type: Boolean,
		default: false,
	},
	blackbeltInstructor: {
		type: Boolean,
		default: true,
	},
	social: {
		instagram: String,
		facebook: String,
		twitter: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Camps', CampSchema)
