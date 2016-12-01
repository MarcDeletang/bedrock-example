var fs = require('fs')

module.exports = {
	isInitPub : false,
	isInitPriv : false,
	rawPub : '',
	rawPriv : '',
	rawPubAPI: '',
	rawPrivAPI: '',
	durationAccessToken: '7d',
	durationCredentials: '100d',

	getPubkey: function(){
		if (this.isInitPub == false){
			this.isInitPub = true
			this.rawPub = fs.readFileSync('./public.cert', { encoding: 'utf8' })
		}
		return this.rawPub
	},

	getPrivkey: function(){
		if (this.isInitPriv == false){
			this.isInitPriv = true
			this.rawPriv = fs.readFileSync('./private.pem', { encoding: 'utf8' })
		}
		return this.rawPriv
	}
}
