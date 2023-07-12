const db = uniCloud.database()
const cmd = db.command
module.exports = {
	_before: function () { 
		//获取传递的参数
		this.params = this.getParams()[0]
	},
	async get(){
		return await db.collection("xlb-mall-sku").get()
	},
	async add(){
		this.params.isChecked = false
		return await db.collection("xlb-mall-sku").add(this.params)
	},
	async addChild(id, obj){
		obj.isChecked = false
		return await db.collection("xlb-mall-sku").doc(id).update({
			children: cmd.push([obj])
		})
	}
}
