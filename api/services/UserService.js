module.exports = {

	async tryCreateUser(rawUser) {
		try {
			var user = await User.findOne({
				email: rawUser.email
			})
			if (user != null)
				return null
			var user = await User.create(rawUser)
			return user
		} catch (e) {
			Bedrock.log.error('tryCreateUser', e)
			throw e
		}
	},

}