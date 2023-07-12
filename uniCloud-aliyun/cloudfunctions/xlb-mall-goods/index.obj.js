const db = uniCloud.database()
module.exports = {
	_before: function () { 

	},
	async add(params){
		// 处理价格
		// price 传过来的是字符串转为 Number， toFixed 会变成字符串 * 100 又转为 Number
		params.price = Number(params.price).toFixed(2)*100
		// 原价是非必填项 或许为空
		params.before_price = params.before_price ? Number(params.before_price).toFixed(2)*100 : null
		return await db.collection("xlb-mall-goods").add(params)
	}
}
