const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

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

// Create Camp Slug
CampSchema.pre('save', function (next) {
	console.log('slugify run', this.name)
	this.slug = slugify(this.name, { lower: true })
	next()
})

// Geocoder and create location field
CampSchema.pre('save', async function (next) {
	const loc = await geocoder.geocode(this.address)
	this.location = {
		type: 'Point',
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
		city: loc[0].city,
		state: loc[0].stateCode,
		zipcode: loc[0].zipcode,
		postcode: loc[0].postcode,
		country: loc[0].country,
	}

	this.address = undefined
	next()
})

module.exports = mongoose.model('Camps', CampSchema)
