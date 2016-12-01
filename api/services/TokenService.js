var jwt = require('jsonwebtoken')

module.exports = {
	algorithm: 'ES256',
	issuer: 'abc',
	//algorithm: 'RS512',

	//Token types: accessToken || credentials
	//accessToken:
	//type: 0
	//idUser
	//credentials:
	//type: 1
	//idUser

	issueAccessToken: function (idUser) {
		var tokenSecret = Bedrock.config.token.getPrivkey()
		var payload = {
			type: 0,
			idUser: idUser
		}
		return jwt.sign(payload, tokenSecret, {
			expiresIn: Bedrock.config.token.durationAccessToken,
			issuer: TokenService.issuer,
			algorithm: TokenService.algorithm
		})
	},

	issueCredentials: function (idUser) {
		var tokenSecret = Bedrock.config.token.getPrivkey()
		var payload = {
			type: 1,
			idUser: idUser
		}
		return jwt.sign(payload, tokenSecret, {
			expiresIn: Bedrock.config.token.durationCredentials,
			issuer: TokenService.issuer,
			algorithm: TokenService.algorithm
		})
	},

	//throw an exception on fail
	verify: function (token) {
		var tokenSecret = Bedrock.config.token.getPubkey()

		return jwt.verify(token, tokenSecret, {
			issuer: TokenService.issuer,
			algorithm: TokenService.algorithm
		})
	}
}