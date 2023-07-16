const selfUtils = require("self-uils")
const db = uniCloud.database()
module.exports = {
	_before: async function () {
		this.userInfo = await selfUtils.getUserInfo(this)
		if(!this.userInfo.uid) throw this.userInfo
	},
	async createOrder(data){
		data.user_id = this.userInfo.uid
		data.order_no = getOrderNum()
		await db.collection("xlb-mall-order").add(data)
		return data.order_no
	}
}

function getOrderNum(){
	return Date.now() + "_" + String(Math.random()).substring(3,9)	
}