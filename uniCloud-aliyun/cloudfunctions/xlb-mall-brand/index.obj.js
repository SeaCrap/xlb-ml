const db = uniCloud.database()
module.exports = {
	_before: function () {
		//获取传递的参数
		this.params = this.getParams()[0]
	},
	async get(){
		return await db.collection("xlb-mall-brand").get()
	},
	async add(){
		return await db.collection("xlb-mall-brand").add(this.params)
	},
	async update(){
		// 传过来的参数包括 _id ，不能修改 _id，使用深拷贝删除 _id 就是修改更新
		let params = {...this.params}
		delete params._id
		return await db.collection("xlb-mall-brand").doc(this.params._id).update(params)
	}
}
