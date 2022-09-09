const express = require('express')
const dotenv = require('dotenv')
const camps = require('./routes/camps')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Initialise our express app
const app = express()

// Mount the routers on to the URL
app.use('/api/v1/camps', camps)

// Set our ports for the server to listen on
const PORT = process.env.PORT || 5000

// Set our express server to listen to the port
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
