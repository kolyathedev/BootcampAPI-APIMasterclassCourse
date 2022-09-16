const mongoose = require('mongoose')

const connectDB = async () => {
	const connect = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})

	console.log(`MondoDB connected: ${connect.connection.host}`.cyan.bold)
}

module.exports = connectDB
