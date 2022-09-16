const NodeGeocoder = require('node-geocoder')

const options = {
	provider: process.env.GEOCODER_PROVIDER,
	apiKey: 'WX-mcj_W4SklZG72iEeLN8l8PROaJCc6jSONSfd9Y4E',
	httpAdapter: 'https',
	formatter: null,
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder
