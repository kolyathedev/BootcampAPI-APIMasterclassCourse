const express = require('express')
const router = express.Router()
const {
	getCamp,
	getCamps,
	createCamp,
	updateCamp,
	deleteCamp,
} = require('../controllers/camps')

// GET all bootcamps
router.route('/').get(getCamps).post(createCamp)
router.route('/:id').get(getCamp).put(updateCamp).delete(deleteCamp)

module.exports = router
