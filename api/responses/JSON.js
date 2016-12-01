module.exports = function(data){
	var res = this
	var result = {}

	if (data != null)
		result.data = data
	else
		result.data = {}
	return res.json(result)
}