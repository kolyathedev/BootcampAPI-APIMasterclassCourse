const Camps = require('../models/Camps.js')
const ErrorResponse = require('../utils/errorResponse.js')
// @desc    Show all camps
// @route   GET /api/v1/camps
// @access  Public
exports.getCamps = async (req, res, next) => {
	// res.json({ name: 'smawl mc smugly' })
	// res.sendStatus(400) If you just want to send back a status.
	// res.status(400).json({ success: false }) Send back a status and some json to then be handled by the client.
	// res.status(200).json({ success: true, data: { name: "ye old'e mcSmugly " } }) A typical successful response from the server.

	try {
		const camps = await Camps.find()
		res.status(200).json({
			success: true,
			count: camps.length,
			data: camps,
		})
	} catch (err) {
		next(err)
	}
}

// GET a single camp
exports.getCamp = async (req, res, next) => {
	try {
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
	} catch (err) {
		// res.status(400).json({ success: false, error: err })
		next(err)
	}
}

// POST a new Camp
exports.createCamp = async (req, res, next) => {
	try {
		const camp = await Camps.create(req.body)
		res.status(201).json({ success: true, data: camp })
	} catch (err) {
		res.status(400).json({ msg: err })
	}
}

// UPDATE a camp
exports.updateCamp = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(err)
	}
}

// DELETE a camp
exports.deleteCamp = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(err)
	}
}
