const db = uniCloud.database()
module.exports = {
	_before: function () { 

	},
	// 新增商品
	async add(params){ 
		// 处理价格
		// 保留小数点后两位、存入分 
		params.price = Number(params.price).toFixed(2)*100
		// 原价是非必填项 或许为空
		params.before_price = params.before_price ? Number(params.before_price).toFixed(2)*100 : null
		return await db.collection("xlb-mall-goods").add(params)
	},
	// 获取分类和分类下商品
	async getList(){
		let categoryList = await db.collection("xlb-mall-category").get()
		let goodsList = await db.collection("xlb-mall-goods").get()
		categoryList.data.forEach(item => {
			let proGroup = goodsList.data.filter(goods => {
				return goods.category_id == item._id
			})
			item.proGroup = proGroup
		})
		// 返回分类下有商品的分类数据
		let newArr = categoryList.data.filter(item => {
			return item.proGroup.length
		})
		return newArr
	},
	// 删除某个商品
	async remove(id){
		return await db.collection("xlb-mall-goods").doc(id).remove()
	},
	// 查询单个商品
	async getOne(id){
		let res = await db.collection("xlb-mall-goods").doc(id).get()
		// 返回价格为元
		res.data[0].price = res.data[0].price/100
		res.data[0].before_price = res.data[0].before_price ? res.data[0].before_price/100 : null
		return res
	},
	// 修改某个商品
	async update(params){
		let _params = {...params}
		let id = _params._id
		delete _params._id
		_params.price = Number(_params.price).toFixed(2)*100
		_params.before_price = _params.before_price ? Number(_params.before_price).toFixed(2)*100 : null
		await db.collection("xlb-mall-goods").doc(id).update(_params)
	}
}
