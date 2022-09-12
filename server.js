const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env' })

connectDB()

const camps = require('./routes/camps')

// Initialise our express app
const app = express()

// Testing MiddleWare
// so what we can do is create functions to be calledin the req/res cycle which can edit the req/res objects
//... we can edit the req res objects and all their properties/display them etc as needed
// const logger = (req, res, next) => {
// 	req.urAWizardHarry = 'ur a fuckin wizard Harry'
// 	console.log('ur a wizard')
// 	// make sure you call next to move onto next piece of MiddleWare
// 	next()
// }
// app.use(logger)

// Dev Logging MiddleWare
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Mount the routers on to the URL
app.use('/api/v1/camps', camps)

// Set our ports for the server to listen on
const PORT = process.env.PORT || 5000

// Set our express server to listen to the port
const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.trap)
)

// Handle unhandled promist rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red.underline)
	// Close Server and exit process
	server.close(() => {
		process.exit(1)
	})
})
