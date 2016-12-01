module.exports = {

	async create(req, res) {
		try {
			var payload = {
				totalPrice: req.body.totalPrice,
				coupon: req.body.coupon,
				isPaid: req.body.isPaid,
				user: req.options.idUser
			}
			var cart = await Cart.create(payload)
			return res.JSON(cart)
		} catch (e) {
			Bedrock.log.error(this.getName(), e)
			return res.error(res, Bedrock.config.errorCodes.unknown)
		}
	}
}