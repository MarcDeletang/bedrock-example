module.exports = function (req, res, next) {
	let rawToken = null

	if (req.headers && req.headers['accesstoken'] != null)
		rawToken = req.headers['accesstoken']
	if (req.query.accessToken != null)
		rawToken = req.query.accessToken
	if (req.body.accessToken)
		rawToken = req.body.accessToken
	if (rawToken == null)
		return ResponseService.errorToken(res, 'You are not permitted to perform this action. (no token supplied)')

	try {
		let token = TokenService.verify(rawToken)
		if (token.type != 0)
			return ResponseService.errorToken(res, 'You are not permitted to perform this action. (not an user token)')
		req.options.idUser = token.idUser
		req.options.accessToken = rawToken
		req.options.isUser = true
		return next()
	} catch (e) {
		if (e != undefined && e.name == 'TokenExpiredError') {
			return ResponseService.errorToken(res, 'You are not permitted to perform this action. (expired token), expiredAt:' + e.expiredAt)
		}
		return ResponseService.errorToken(res, 'You are not permitted to perform this action. (invalid token)')
	}
}