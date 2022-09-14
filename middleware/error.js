const ErrorResponse = require('../utils/errorResponse.js')

const errorHandler = (err, req, res, next) => {
	let error = { ...err }

	error.message = err.message

	// log to console for dev
	console.log(err.stack.red)

	// Handle error for bad object ID
	if (err.name === 'CastError') {
		const message = `Camp not found with ID ${err.value}`
		error = new ErrorResponse(message, 404)
	}

	res
		.status(error.statusCode || 500)
		.json({ success: false, error: error.message || 'Server Error' })
}

module.exports = errorHandler
