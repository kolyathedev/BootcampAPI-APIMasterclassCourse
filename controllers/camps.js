// @desc    Show all camps
// @route   GET /api/v1/camps
// @access  Public
exports.getCamps = (req, res, next) => {
	// res.json({ name: 'smawl mc smugly' })
	// res.sendStatus(400) If you just want to send back a status.
	// res.status(400).json({ success: false }) Send back a status and some json to then be handled by the client.
	// res.status(200).json({ success: true, data: { name: "ye old'e mcSmugly " } }) A typical successful response from the server.
	res.status(200).json({ success: true, msg: 'Show all camps' })
}

// GET a single camp
exports.getCamp = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Show info for camp ${req.params.id}` })
}

// POST a new Camp
exports.createCamp = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'New camp added' })
}

// UPDATE a camp
exports.updateCamp = (req, res, next) => {
	const { id } = req.params
	res.status(200).json({ success: true, msg: `Updating camp id: ${id}` })
}

// DELETE a camp
exports.deleteCamp = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Delete camp with id: ${req.params.id}` })
}
