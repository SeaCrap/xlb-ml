const db = uniCloud.database()
const selfUtils = require("self-uils")

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
	},
	async getOne(addressId){
		if(!this.userInfo.uid) return this.userInfo
		return await db.collection("xlb-mall-address").doc(addressId).get()
	},
	async updateOne(data){
		if(!this.userInfo.uid) return this.userInfo
		
		data.user_id = this.userInfo.uid
		data.time = Date.now()
		
		if(data.selected){
			await db.collection("xlb-mall-address").where({
				user_id: this.userInfo.uid
			}).update({selected: false})
		}
		// data 传过来有 id 不能修改
		let _data = {...data}
		let id = _data._id
		delete _data._id
		return await db.collection("xlb-mall-address").doc(id).update(_data)
	},
	async getDefaultAddress(){
		if(!this.userInfo.uid) return this.userInfo
		return await db.collection("xlb-mall-address").where({
			user_id: this.userInfo.uid,
			selected: true
		}).get()
	}
}