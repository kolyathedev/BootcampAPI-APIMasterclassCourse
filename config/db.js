const mongoose = require('mongoose')

const connectDB = async () => {
	const connect = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})

	console.log(`MondoDB connected: ${connect.connection.host}`.trap.bold)
}

module.exports = connectDB
