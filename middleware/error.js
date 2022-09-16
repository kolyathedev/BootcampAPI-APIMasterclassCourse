const ErrorResponse = require('../utils/errorResponse.js')

const errorHandler = (err, req, res, next) => {
	let error = { ...err }

	error.message = err.message

	// log to console for dev

	// Handle error for bad object ID
	if (err.name === 'CastError') {
		const message = `Camp not found with ID ${err.value}`
		error = new ErrorResponse(message, 404)
	}

	// Mongoose Duplicate Error
	if (err.code === 11000) {
		const message = 'Duplicate field value'
		error = new ErrorResponse(message, 400)
	}

	// Validation Errors - ie required fields not entered
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message)
		error = new ErrorResponse(message, 400)
	}

	res
		.status(error.statusCode || 500)
		.json({ success: false, error: error.message || 'Server Error' })
}

module.exports = errorHandler
