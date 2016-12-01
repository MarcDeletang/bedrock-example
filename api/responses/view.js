module.exports = function(fileName, data) {
	var res = this
	var filePath = __dirname.substr(0, __dirname.lastIndexOf('/'))
	filePath = filePath.substr(0, filePath.lastIndexOf('/'))

	filePath = filePath + '/views/' + fileName
	return res.render(filePath, data)
}