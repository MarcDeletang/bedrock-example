var bcrypt = require('bcryptjs')

module.exports = {
	async logUser(email, password) {
		var user = await User.findOne({
			email: email
		})
		if (user == null)
			return null

		var hash = this.generateHash(user, password)
		if (hash != user.password)
			return null
		return user
	},

	generateHash(user, password) {
		var hash = bcrypt.hashSync(password, user.salt)
		return hash
	}
}