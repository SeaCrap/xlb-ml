const db = uniCloud.database()
const selfUtils = require("self-tuils")

module.exports = {
	_before: async function () { 
		this.userInfo = await selfUtils.getUserInfo(this)
	},
	async add(data){
		
		if(!this.userInfo.uid) return this.userInfo
		
		data.user_id = this.userInfo.uid
		data.time = Date.now()
		// 当前用户当前的地址状态如果默认 其他地址状态为 false
		if(data.selected){
			await db.collection("xlb-mall-address").where({
				user_id: this.userInfo.uid
			}).update({
				selected: false
			})
		}
		// 添加
		return await db.collection("xlb-mall-address").add(data)
	},
	async getList(){
		if(!this.userInfo.uid) return this.userInfo
		return await db.collection("xlb-mall-address").where({
			user_id: this.userInfo.uid
		}).orderBy("selected","desc").orderBy("time","desc").get()
	},
	async updateAddress(id){
		if(!this.userInfo.uid) return this.userInfo
		await db.collection("xlb-mall-address").where({
			user_id: this.userInfo.uid
		}).update({
			selected: false
		})
		return await db.collection("xlb-mall-address").doc(id).update({
			selected: true
		})
	}
}
