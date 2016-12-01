module.exports = function (err, code) {
	var res = this
	var result = {}
	result.data = {}

	if (err == null) {
		result.err = {}
		Bedrock.log.warn('Error sent without message', err, code)
	} else {
		result.err = err
		if (err.message)
			result.err = err.message
	}
	if (code == null) {
		Bedrock.log.warn('Error sent without specific code', err)
		result.code = Bedrock.config.errorCodes.unknown
	} else {
		result.code = code
		return res.status(code).json(result)
	}
	return res.json(result)
}