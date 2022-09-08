const express = require('express')
const dotenv = require('dotenv')

// load env vars
dotenv.config({ path: 'config/config.env' })

// initialise our express app
const app = express()

// set our ports for the server to listen on
const PORT = process.env.PORT || 5000

// set our express server to listen to the port
app.listen(
	PORT,
	console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
