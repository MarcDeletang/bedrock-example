module.exports = {
	postgres: {
		host: null, //localhost || ip
		user: null,
		database: null,
		password: null,
		port: null,
		max: 100, //Number clients max
		idleTimeoutMillis: 1000,
		keepAlive: true,
	}
}