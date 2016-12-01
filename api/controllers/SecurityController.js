module.exports = {

	//Policy: none
	async signup(req, res) {
		try {
			var email = req.body.email
			var password = req.body.password
			var firstName = req.body.firstName
			var lastName = req.body.lastName

			if (email == null)
				return ResponseService.errorParameter(res, 'email')
			if (password == null)
				return ResponseService.errorParameter(res, 'password')

			var user = await UserService.tryCreateUser({
				email: email,
				password: password,
				firstName: firstName,
				lastName: lastName
			})
			if (user == null)
				return ResponseService.customError(res, 'User already exists')
			return res.JSON({
				accessToken: TokenService.issueAccessToken(user.id),
				credentials: TokenService.issueCredentials(user.id),
				user: user
			})
		} catch (e) {
			Bedrock.log.error(this.getName(), e)
			return res.error(res, Bedrock.config.errorCodes.unknown)
		}
	},

	//Policy: none
	async signin(req, res) {
		var email = req.body.email
		var password = req.body.password

		if (email == null)
			return ResponseService.errorParameter(res, 'email')
		if (password == null)
			return ResponseService.errorParameter(res, 'password')
		try {
			var user = await SecurityService.logUser(email, password)
			if (user == null)
				return ResponseService.customError(res, 'Error during login')
			return res.JSON({
				accessToken: TokenService.issueAccessToken(user.id),
				credentials: TokenService.issueCredentials(user.id),
				user: user
			})
		} catch (e) {
			Bedrock.log.error(this.getName(), e)
			return res.error(res, Bedrock.config.errorCodes.unknown)
		}
	},

	//Policy: none
	async refresh(req, res) {
		var credentials = req.body.credentials
		if (credentials == null)
			return ResponseService.errorParameter(res, 'credentials')
		try {
			var token = TokenService.verify(credentials)
			var user = await User.findOne({
				id: token.idUser
			})
			return res.JSON({
				accessToken: TokenService.issueAccessToken(user.id),
				credentials: TokenService.issueCredentials(token.idUser),
				user: user
			})
		} catch (e) {
			Bedrock.log.error(this.getName(), e)
			return res.error(res, Bedrock.config.errorCodes.unknown)
		}
	}
}