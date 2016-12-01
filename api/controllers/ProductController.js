module.exports = {
	async create(req, res) {
		try {
			var payload = {
				name: req.body.name,
				price: req.body.price,
				description: req.body.description,
			}
			var product = await Product.create(payload)
			return res.JSON(product)
		} catch (e) {
			Bedrock.log.error(this.getName(), e)
			return res.error(res, Bedrock.config.errorCodes.unknown)
		}
	},

	async addToCart(req, res) {
		try {

		} catch (e) {
			Bedrock.log.error(this.getName(), e)
			return res.error(res, Bedrock.config.errorCodes.unknown)
		}
	}

}