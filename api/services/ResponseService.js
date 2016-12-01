module.exports = {
	errorToken(res, message) {
		return res.error(message, Bedrock.config.errorCodes.token)
	},

	errorParameter(res, parameter) {
		if (parameter)
			return res.error('Missing/Invalid parameter: ' + parameter, Bedrock.config.errorCodes.errorParameter)
		else
			return res.error('Error parameter', Bedrock.config.errorCodes.errorParameter)
	},

	customError(res, message, code) {
		if (code == null)
			code = Bedrock.config.errorCodes.custom
		return res.error(message, code)
	}

}