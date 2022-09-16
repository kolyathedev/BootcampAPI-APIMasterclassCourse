const Camps = require('../models/Camps.js')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse.js')
// @desc    Show all camps
// @route   GET /api/v1/camps
// @access  Public

exports.getCamps = asyncHandler(async (req, res, next) => {
	// res.json({ name: 'smawl mc smugly' })
	// res.sendStatus(400) If you just want to send back a status.
	// res.status(400).json({ success: false }) Send back a status and some json to then be handled by the client.
	// res.status(200).json({ success: true, data: { name: "ye old'e mcSmugly " } }) A typical successful response from the server.

	const camps = await Camps.find()
	res.status(200).json({
		success: true,
		count: camps.length,
		data: camps,
	})
})

// GET a single camp
exports.getCamp = asyncHandler(async (req, res, next) => {
	const camp = await Camps.findById(req.params.id)
	if (!camp) {
		return next(
			new ErrorResponse(
				`Camp not found with ID of ${req.params.id}, non catch`,
				404
			)
		)
	}
	res.status(200).json({ success: true, camp })
})

// POST a new Camp
exports.createCamp = asyncHandler(async (req, res, next) => {
	const camp = await Camps.create(req.body)
	res.status(201).json({ success: true, data: camp })
})

// UPDATE a camp
exports.updateCamp = asyncHandler(async (req, res, next) => {
	const campToUpdate = await Camps.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	})

	if (!campToUpdate) {
		return next(
			new ErrorResponse(
				`Camp not found with ID of ${req.params.id}, non catch`,
				404
			)
		)
	}

	res.status(200).json({
		success: true,
		msg: `Camp ${req.params.id} Updated!`,
		data: campToUpdate,
	})
})

// DELETE a camp
exports.deleteCamp = asyncHandler(async (req, res, next) => {
	const deleteCamp = await Camps.findByIdAndDelete(req.params.id)

	if (!deleteCamp) {
		return next(
			new ErrorResponse(
				`Camp not found with ID of ${req.params.id}, non catch`,
				404
			)
		)
	}
	res.status(200).json({ success: true, data: {}, msg: 'Camp Deleted' })
})
